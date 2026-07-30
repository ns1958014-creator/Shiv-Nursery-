export type CategoryType =
  | 'Fruit Plants'
  | 'Flower Plants'
  | 'Decorative Plants'
  | 'Indoor Plants'
  | 'Outdoor Plants'
  | 'Seasonal Plants'
  | 'Shade Plants'
  | 'Garden Accessories';

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: CategoryType;
  description: string;
  price: number; // in INR ₹
  originalPrice?: number;
  inStock: boolean;
  imageUrl: string;
  additionalImages?: string[];
  sunlight: 'Full Sun' | 'Partial Sun' | 'Indirect Bright' | 'Low Light';
  waterNeeded: 'Low' | 'Moderate' | 'Frequent';
  growthRate: 'Slow' | 'Moderate' | 'Fast';
  height: string;
  featured: boolean;
  isPopular?: boolean;
  careTips: string[];
  bestFor: string;
}

export interface Category {
  id: string;
  title: CategoryType;
  description: string;
  imageUrl: string;
  count: number;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'nursery' | 'fruit' | 'flower' | 'decorative' | 'indoor' | 'seasonal' | 'customers' | 'landscapes';
  categoryLabel: string;
  imageUrl: string;
  caption: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  verified: boolean;
  avatarUrl?: string;
  plantPurchased?: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface InquiryItem {
  plant: Plant;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryType: 'express' | 'pickup' | 'farm_truck';
  notes?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export type OrderStatus = 'confirmed' | 'packing' | 'dispatched' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  plantId: string;
  plantName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  couponCode?: string;
  estimatedDelivery: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  plantCategory: string;
  message: string;
}
