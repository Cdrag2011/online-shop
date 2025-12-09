// src/types/order.ts

export type OrderStatus = "pending" | "paid" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BillingData {
  adresa: string;
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  tip: "persoana" | "firma";
  firma?: string;
  cui?: string;
  codFiscal?: string;
}

export interface Order {
  paymentMethod: any;
  id: string;
  userId?: string | null;
  items: OrderItem[];
  total: number;
  createdAt: string; // ISO string
  status: OrderStatus;
  billing: BillingData;
}
