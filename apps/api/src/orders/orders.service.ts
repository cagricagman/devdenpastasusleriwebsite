import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(customerId?: string, dto?: any) {
    if (!dto || !dto.items || dto.items.length === 0) {
      throw new BadRequestException('Sipariş vermek için sepette en az bir ürün olmalıdır.');
    }

    let customer = customerId ? await this.prisma.user.findUnique({ where: { id: customerId } }) : null;
    if (!customer) {
      const email = dto.customerEmail || (dto.shippingAddress && dto.shippingAddress.email) || 'musteri@wakkopastasusleri.local';
      customer = await this.prisma.user.findUnique({ where: { email } });
      if (!customer) {
        const fullName = dto.shippingAddress?.fullName || 'Misafir Müşteri';
        const parts = fullName.trim().split(' ');
        const firstName = parts[0] || 'Misafir';
        const lastName = parts.slice(1).join(' ') || 'Müşteri';
        customer = await this.prisma.user.create({
          data: {
            email,
            passwordHash: 'guest-no-password',
            firstName,
            lastName,
            phone: dto.shippingAddress?.phone || '+90 555 000 0000',
            role: 'CUSTOMER',
            isEmailVerified: true,
          },
        });
      }
    }

    let subtotal = 0;
    const orderItemsData = [];

    for (const item of dto.items) {
      let product = null;
      if (item.productId) {
        product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          include: { images: true },
        });
      }

      if (!product) {
        product = await this.prisma.product.findFirst({
          where: { isActive: true },
          include: { images: true },
        });
      }

      if (!product) {
        throw new NotFoundException('Siparişe eklenecek aktif ürün bulunamadı.');
      }

      const unitPrice = item.price ? Number(item.price) : (product.discountPrice ? Number(product.discountPrice) : Number(product.price));
      const quantity = Number(item.quantity) || 1;
      const itemTotal = unitPrice * quantity;
      subtotal += itemTotal;

      const primaryImg = item.imageUrl || product.images.find((i: { isPrimary: boolean; url: string }) => i.isPrimary)?.url || product.images[0]?.url || '';

      orderItemsData.push({
        productId: product.id,
        productNameSnapshot: item.productName || product.name,
        productSkuSnapshot: product.sku,
        productImageUrlSnapshot: primaryImg,
        unitPrice,
        quantity,
        totalPrice: itemTotal,
      });
    }

    const shippingFee = subtotal >= 300 ? 0 : 29.90;
    const totalAmount = subtotal + shippingFee;
    const orderNumber = `WAKKO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        customerName: dto.shippingAddress?.fullName || `${customer.firstName} ${customer.lastName}`,
        customerEmail: customer.email,
        customerPhone: dto.shippingAddress?.phone || customer.phone || '',
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: dto.paymentMethod || 'CASH_ON_DELIVERY',
        totalAmount,
        shippingFee,
        shippingAddressJson: JSON.stringify(dto.shippingAddress || {}),
        note: dto.note || '',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Reduce stock quantities
    for (const item of orderItemsData) {
      try {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: { decrement: item.quantity },
          },
        });
      } catch (e) {
        // Continue if decrement hits constraint
      }
    }

    return order;
  }

  async findCustomerOrders(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
  }

  async findById(orderId: string, customerId?: string) {
    const where: any = { id: orderId };
    if (customerId) where.customerId = customerId;

    const order = await this.prisma.order.findFirst({
      where,
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Sipariş bulunamadı.');
    }

    return order;
  }

  // Admin APIs
  async findAllAdmin(status?: OrderStatus) {
    const where: any = {};
    if (status) where.status = status;

    return this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Sipariş bulunamadı.');

    let paymentStatus = order.paymentStatus;
    if (status === OrderStatus.DELIVERED) {
      paymentStatus = PaymentStatus.COMPLETED;
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        paymentStatus,
      },
      include: { items: true },
    });
  }
}
