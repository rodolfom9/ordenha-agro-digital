
export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
}

export interface MilkProduction {
  id: string;
  date: string;
  quantity: number; // in liters
  cowCount: number;
  quality: 'A' | 'B' | 'C';
  notes?: string;
}

export interface Sale {
  id: string;
  date: string;
  quantity: number;
  pricePerLiter: number;
  totalAmount: number;
  buyer: string;
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: 'feed' | 'medication' | 'equipment' | 'labor' | 'other';
  description: string;
}

export interface DashboardStats {
  totalProduction: number;
  averageDailyProduction: number;
  totalSales: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
