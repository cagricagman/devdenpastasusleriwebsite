export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  parentName?: string;
  seoTitle?: string;
  seoDescription?: string;
  productCount?: number;
}

export interface ProductImageDto {
  id: string;
  url: string;
  storageKey: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  inStock: boolean;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  categoryName?: string;
  images: ProductImageDto[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryMovementDto {
  id: string;
  productId: string;
  productName: string;
  quantityChange: number;
  previousQuantity: number;
  newQuantity: number;
  type: 'ADD' | 'REMOVE' | 'ADJUSTMENT' | 'SALE' | 'RETURN';
  reason?: string;
  createdBy: string;
  createdAt: string;
}
