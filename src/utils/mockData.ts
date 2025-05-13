
import { User, MilkProduction, Sale, Expense, DashboardStats } from "../types";

export const mockUser: User = {
  id: "1",
  username: "admin",
  name: "Administrador",
  role: "admin",
};

export const mockProductions: MilkProduction[] = [
  {
    id: "p1",
    date: "2023-05-01",
    quantity: 120,
    cowCount: 25,
    quality: "A",
    notes: "Boa produção hoje"
  },
  {
    id: "p2",
    date: "2023-05-02",
    quantity: 115,
    cowCount: 24,
    quality: "A",
    notes: "Um pouco menos devido ao clima"
  },
  {
    id: "p3",
    date: "2023-05-03",
    quantity: 125,
    cowCount: 25,
    quality: "A",
  },
  {
    id: "p4",
    date: "2023-05-04",
    quantity: 110,
    cowCount: 23,
    quality: "B",
    notes: "Qualidade afetada pela chuva"
  },
  {
    id: "p5",
    date: "2023-05-05",
    quantity: 118,
    cowCount: 25,
    quality: "A",
  },
];

export const mockSales: Sale[] = [
  {
    id: "s1",
    date: "2023-05-01",
    quantity: 100,
    pricePerLiter: 2.50,
    totalAmount: 250,
    buyer: "Laticínios Boa Vista",
  },
  {
    id: "s2",
    date: "2023-05-03",
    quantity: 200,
    pricePerLiter: 2.45,
    totalAmount: 490,
    buyer: "Mercado Central",
  },
  {
    id: "s3",
    date: "2023-05-05",
    quantity: 150,
    pricePerLiter: 2.55,
    totalAmount: 382.50,
    buyer: "Laticínios Boa Vista",
    notes: "Entrega adicional"
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "e1",
    date: "2023-05-02",
    amount: 300,
    category: "feed",
    description: "Ração para o gado",
  },
  {
    id: "e2",
    date: "2023-05-03",
    amount: 150,
    category: "medication",
    description: "Vacinas",
  },
  {
    id: "e3",
    date: "2023-05-04",
    amount: 200,
    category: "labor",
    description: "Pagamento funcionário temporário",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalProduction: 588,
  averageDailyProduction: 117.6,
  totalSales: 450,
  totalRevenue: 1122.50,
  totalExpenses: 650,
  netProfit: 472.50,
};

export const mockProductionChartData = [
  { label: "01/05", value: 120 },
  { label: "02/05", value: 115 },
  { label: "03/05", value: 125 },
  { label: "04/05", value: 110 },
  { label: "05/05", value: 118 },
];

export const mockSalesChartData = [
  { label: "01/05", value: 250 },
  { label: "02/05", value: 0 },
  { label: "03/05", value: 490 },
  { label: "04/05", value: 0 },
  { label: "05/05", value: 382.50 },
];

export const mockExpensesChartData = [
  { label: "01/05", value: 0 },
  { label: "02/05", value: 300 },
  { label: "03/05", value: 150 },
  { label: "04/05", value: 200 },
  { label: "05/05", value: 0 },
];

// Function to simulate login authentication
export const mockLogin = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        resolve(mockUser);
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 800);
  });
};
