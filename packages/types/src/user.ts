export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  STOCK_MANAGER = 'STOCK_MANAGER',
  CUSTOMER = 'CUSTOMER',
}

export enum AdminPermission {
  PRODUCT_READ = 'product.read',
  PRODUCT_CREATE = 'product.create',
  PRODUCT_UPDATE = 'product.update',
  PRODUCT_DELETE = 'product.delete',
  INVENTORY_READ = 'inventory.read',
  INVENTORY_UPDATE = 'inventory.update',
  ORDER_READ = 'order.read',
  ORDER_UPDATE = 'order.update',
  CUSTOMER_READ = 'customer.read',
  SETTINGS_UPDATE = 'settings.update',
  TEAM_MANAGE = 'team.manage',
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  permissions?: AdminPermission[];
  createdAt: string;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
}
