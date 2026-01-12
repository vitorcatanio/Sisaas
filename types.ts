
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  FINANCE = 'FINANCE',
  LOGISTICS = 'LOGISTICS'
}

export enum SubscriptionPlan {
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  plan: SubscriptionPlan;
  trialEndsAt: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  unit: string;
}

export interface Client {
  id: string;
  name: string;
  cnpj_cpf: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  clientId: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'QUOTE' | 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

export interface LogisticsRecord {
  id: string;
  orderId: string;
  driverName: string;
  vehiclePlate: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
  photoUrl?: string;
  deliveredAt?: string;
}

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface NFe {
  id: string;
  orderId: string;
  accessKey: string;
  number: string;
  serie: string;
  status: 'DRAFT' | 'AUTHORIZED' | 'CANCELLED';
  xmlUrl: string;
}
