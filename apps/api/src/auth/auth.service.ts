import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) return null;

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const permissions = await this.prisma.rolePermission.findMany({
      where: { role: user.role },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: permissions.map((p: { permission: string }) => p.permission),
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        permissions: permissions.map((p: { permission: string }) => p.permission),
        createdAt: user.createdAt.toISOString(),
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async registerCustomer(dto: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Bu e-posta adresi ile zaten kayıtlı bir hesap bulunmaktadır.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: Role.CUSTOMER,
        isEmailVerified: true,
      },
    });

    return this.login(user);
  }
}
