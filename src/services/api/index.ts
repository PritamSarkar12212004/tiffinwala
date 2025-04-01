import axios from 'axios';
import { TiffinItem, User, Vendor, Order } from '@/src/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  signIn: (email: string, password: string) =>
    api.post('/auth/signin', { email, password }),
  signUp: (userData: Partial<User>) =>
    api.post('/auth/signup', userData),
  signOut: () => api.post('/auth/signout'),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get<User>('/user/profile'),
  updateProfile: (userData: Partial<User>) =>
    api.put<User>('/user/profile', userData),
  updatePreferences: (preferences: string[]) =>
    api.put<User>('/user/preferences', { preferences }),
  updateLocation: (location: User['location']) =>
    api.put<User>('/user/location', { location }),
};

// Tiffin APIs
export const tiffinAPI = {
  getTiffins: (params?: { search?: string; tags?: string[] }) =>
    api.get<TiffinItem[]>('/tiffins', { params }),
  getTiffinById: (id: string) =>
    api.get<TiffinItem>(`/tiffins/${id}`),
  getVendorTiffins: (vendorId: string) =>
    api.get<TiffinItem[]>(`/vendors/${vendorId}/tiffins`),
};

// Vendor APIs
export const vendorAPI = {
  getVendors: (params?: { search?: string; rating?: number }) =>
    api.get<Vendor[]>('/vendors', { params }),
  getVendorById: (id: string) =>
    api.get<Vendor>(`/vendors/${id}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData: Partial<Order>) =>
    api.post<Order>('/orders', orderData),
  getOrders: () => api.get<Order[]>('/orders'),
  getOrderById: (id: string) =>
    api.get<Order>(`/orders/${id}`),
  updateOrderStatus: (id: string, status: Order['status']) =>
    api.put<Order>(`/orders/${id}/status`, { status }),
};

// Review APIs
export const reviewAPI = {
  createReview: (tiffinId: string, reviewData: {
    rating: number;
    comment: string;
  }) => api.post(`/tiffins/${tiffinId}/reviews`, reviewData),
  getReviews: (tiffinId: string) =>
    api.get(`/tiffins/${tiffinId}/reviews`),
}; 