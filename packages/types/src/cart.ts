import { ProductDto } from './product';

export interface CartItemDto {
  id: string;
  product: ProductDto;
  quantity: number;
  totalPrice: number;
}

export interface CartDto {
  id: string;
  items: CartItemDto[];
  subtotal: number;
  shippingTotal: number;
  grandTotal: number;
  itemCount: number;
}
