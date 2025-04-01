export interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  preferences?: string[];
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface TiffinItem {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  likes: number;
  tags: string[];
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  available: boolean;
  preparationTime: string;
  deliveryTime: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePhoto?: string;
  rating: number;
  totalOrders: number;
  isVerified: boolean;
  tiffinItems: TiffinItem[];
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  tiffinId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  quantity: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'cash' | 'card' | 'upi';
} 