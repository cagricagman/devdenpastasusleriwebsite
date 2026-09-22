export enum PaymentMethodType {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
}

export interface PaymentMethodDto {
  id: string;
  code: PaymentMethodType;
  title: string;
  description: string;
  isActive: boolean;
  extraFee?: number;
}
