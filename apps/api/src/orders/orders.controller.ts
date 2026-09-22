import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { OrderStatus } from '@prisma/client';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Sipariş Oluştur (Kapıda Ödeme & Misafir/Üye)' })
  async createOrder(@Request() req: any, @Body() body: any) {
    const customerId = req.user?.id;
    return this.ordersService.createOrder(customerId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('my-orders')
  @ApiOperation({ summary: 'Müşterinin Kendi Siparişlerini Listele' })
  async getMyOrders(@Request() req: any) {
    return this.ordersService.findCustomerOrders(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Sipariş Detayı' })
  async getOrderById(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.findById(id, req.user.role === 'CUSTOMER' ? req.user.id : undefined);
  }

  // Admin Endpoints
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('admin/all')
  @ApiOperation({ summary: '[Admin] Tüm Siparişleri Listele' })
  async getAllAdmin(@Query('status') status?: OrderStatus) {
    return this.ordersService.findAllAdmin(status);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('admin/:id/status')
  @ApiOperation({ summary: '[Admin] Sipariş Durumunu Güncelle' })
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }
}
