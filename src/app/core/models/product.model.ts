export type ProductType = 'bid' | 'donation' | 'resell';

export interface Product {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  price: number;
  currentBid?: number;
  imageUrl: string;
  endTime?: Date;
  seller: {
    id: string;
    name: string;
  };
  category: string;
  condition: string;
  location: string;
  createdAt: Date;
}