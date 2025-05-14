import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Milk, 
  TrendingUp, 
  ShoppingCart, 
  CreditCard, 
  DollarSign 
} from "lucide-react";
import { 
  mockDashboardStats, 
  mockProductionChartData, 
  mockSalesChartData, 
  mockExpensesChartData 
} from "@/utils/mockData";
import { DashboardStats } from "@/types";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend 
} from "recharts";
import { supabase } from "@/lib/supabase";

const combinedChartData = mockProductionChartData.map((item, index) => ({
  name: item.label,
  producao: item.value,
  vendas: mockSalesChartData[index]?.value || 0,
  despesas: mockExpensesChartData[index]?.value || 0
}));

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productionChart, setProductionChart] = useState<any[]>([]);
  const [financeChart, setFinanceChart] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Buscar produções dos últimos 30 dias
      const { data: productions, error: prodError } = await supabase
        .from("production")
        .select("date, quantity")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
      // Buscar vendas dos últimos 30 dias
      const { data: sales, error: salesError } = await supabase
        .from("sales")
        .select("date, quantity, total_amount")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
      // Buscar despesas dos últimos 30 dias
      const { data: expenses, error: expError } = await supabase
        .from("expenses")
        .select("date, amount")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));

      if (prodError || salesError || expError) {
        setIsLoading(false);
        return;
      }

      // Cálculos dos cards
      const totalProduction = productions?.reduce((acc, p) => acc + (p.quantity || 0), 0) || 0;
      const averageDailyProduction = productions && productions.length > 0 ? (totalProduction / 30) : 0;
      const totalSales = sales?.reduce((acc, s) => acc + (s.quantity || 0), 0) || 0;
      const totalRevenue = sales?.reduce((acc, s) => acc + (s.total_amount || 0), 0) || 0;
      const totalExpenses = expenses?.reduce((acc, e) => acc + (e.amount || 0), 0) || 0;
      const netProfit = totalRevenue - totalExpenses;

      setStats({
        totalProduction,
        averageDailyProduction,
        totalSales,
        totalRevenue,
        totalExpenses,
        netProfit,
      });

      // Gráfico de produção diária
      const prodByDate: Record<string, number> = {};
      productions?.forEach((p) => {
        prodByDate[p.date] = (prodByDate[p.date] || 0) + (p.quantity || 0);
      });
      const prodChart = Object.entries(prodByDate).map(([date, value]) => ({ label: date, value }));
      setProductionChart(prodChart);

      // Gráfico de receitas vs despesas por data
      const salesByDate: Record<string, number> = {};
      sales?.forEach((s) => {
        salesByDate[s.date] = (salesByDate[s.date] || 0) + (s.total_amount || 0);
      });
      const expensesByDate: Record<string, number> = {};
      expenses?.forEach((e) => {
        expensesByDate[e.date] = (expensesByDate[e.date] || 0) + (e.amount || 0);
      });
      const allDates = Array.from(new Set([
        ...Object.keys(salesByDate),
        ...Object.keys(expensesByDate),
      ])).sort();
      const financeChartData = allDates.map((date) => ({
        name: date,
        vendas: salesByDate[date] || 0,
        despesas: expensesByDate[date] || 0,
      }));
      setFinanceChart(financeChartData);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p>Nenhuma informação disponível.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Acompanhe os principais indicadores da sua produção de leite
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Produção Total"
          value={`${stats.totalProduction} L`}
          description="Últimos 30 dias"
          icon={<Milk className="h-5 w-5 text-farm-green" />}
        />
        <StatCard
          title="Média Diária"
          value={`${stats.averageDailyProduction.toFixed(2)} L`}
          description="Últimos 30 dias"
          icon={<TrendingUp className="h-5 w-5 text-farm-blue" />}
        />
        <StatCard
          title="Total de Vendas"
          value={`${stats.totalSales} L`}
          description="Vendidos últimos 30 dias"
          icon={<ShoppingCart className="h-5 w-5 text-farm-blue" />}
        />
        <StatCard
          title="Receita Total"
          value={`R$ ${stats.totalRevenue.toFixed(2)}`}
          description="Últimos 30 dias"
          icon={<DollarSign className="h-5 w-5 text-farm-green" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produção Diária (Litros)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productionChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2E7D32"
                    name="Produção (L)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financeChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="vendas"
                    name="Receitas"
                    fill="#1976D2"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="despesas"
                    name="Despesas"
                    fill="#F44336"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Receita Total</h3>
                <p className="text-2xl font-semibold text-farm-blue">
                  R$ {stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Despesas Totais</h3>
                <p className="text-2xl font-semibold text-red-500">
                  R$ {stats.totalExpenses.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Lucro Líquido</h3>
                <p className="text-2xl font-semibold text-farm-green">
                  R$ {stats.netProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
