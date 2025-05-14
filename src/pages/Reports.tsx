import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import RevenueChart from "@/components/charts/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

// Create some additional data for reports
const categoryExpenses = [
  { label: "Alimentação", value: 500 },
  { label: "Medicamentos", value: 150 },
  { label: "Equipamentos", value: 200 },
  { label: "Mão de obra", value: 300 },
  { label: "Outros", value: 100 },
];

const monthlyProduction = [
  { label: "Jan", value: 3000 },
  { label: "Fev", value: 2800 },
  { label: "Mar", value: 3200 },
  { label: "Abr", value: 3100 },
  { label: "Mai", value: 3300 },
  { label: "Jun", value: 3400 },
];

const Reports = () => {
  const [timeFrame, setTimeFrame] = useState("month");
  const [loading, setLoading] = useState(true);
  const [prodByMonth, setProdByMonth] = useState<any[]>([]);
  const [prodVsSales, setProdVsSales] = useState<any[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<any[]>([]);
  const [financeChart, setFinanceChart] = useState<any[]>([]);
  const [summary, setSummary] = useState({ receita: 0, despesas: 0, lucro: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Buscar produção
      const { data: productions } = await supabase.from("production").select("date, quantity");
      // Buscar vendas
      const { data: sales } = await supabase.from("sales").select("date, value");
      // Buscar despesas
      const { data: expenses } = await supabase.from("expenses").select("date, value, description");

      // Produção mensal
      const prodMonth: Record<string, number> = {};
      productions?.forEach((p) => {
        const month = p.date?.slice(0, 7); // yyyy-mm
        prodMonth[month] = (prodMonth[month] || 0) + (p.quantity || 0);
      });
      setProdByMonth(Object.entries(prodMonth).map(([label, value]) => ({ label, value })));

      // Produção vs Vendas por mês
      const salesMonth: Record<string, number> = {};
      sales?.forEach((s) => {
        const month = s.date?.slice(0, 7);
        const value = Number(s.value) || 0;
        salesMonth[month] = (salesMonth[month] || 0) + value;
      });
      const allMonths = Array.from(new Set([...Object.keys(prodMonth), ...Object.keys(salesMonth)])).sort();
      setProdVsSales(allMonths.map((month) => ({
        label: month,
        producao: prodMonth[month] || 0,
        vendas: salesMonth[month] || 0,
      })));

      // Despesas por categoria (usando description como categoria)
      const expCat: Record<string, number> = {};
      expenses?.forEach((e) => {
        const cat = e.description || "Outros";
        const value = Number(e.value) || 0;
        expCat[cat] = (expCat[cat] || 0) + value;
      });
      setExpensesByCategory(Object.entries(expCat).map(([label, value]) => ({ label, value })));

      // Receitas vs Despesas por mês
      const expensesMonth: Record<string, number> = {};
      expenses?.forEach((e) => {
        const month = e.date?.slice(0, 7);
        const value = Number(e.value) || 0;
        expensesMonth[month] = (expensesMonth[month] || 0) + value;
      });
      setFinanceChart(allMonths.map((month) => ({
        label: month,
        receitas: salesMonth[month] || 0,
        despesas: expensesMonth[month] || 0,
      })));

      // Resumo financeiro (últimos 30 dias)
      const now = new Date();
      const last30 = (d: string) => {
        const dt = new Date(d);
        return (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) <= 30;
      };
      const receita = sales?.filter((s) => last30(s.date)).reduce((acc, s) => acc + (Number(s.value) || 0), 0) || 0;
      const despesas = expenses?.filter((e) => last30(e.date)).reduce((acc, e) => acc + (Number(e.value) || 0), 0) || 0;
      setSummary({ receita, despesas, lucro: receita - despesas });
      setLoading(false);
    };
    fetchData();
  }, [timeFrame]);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Relatórios</h1>
        <p className="text-muted-foreground mb-6">
          Visualize os dados e métricas da sua produção leiteira
        </p>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeFrame">Período</Label>
                  <Select
                    value={timeFrame}
                    onValueChange={setTimeFrame}
                  >
                    <SelectTrigger id="timeFrame">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Semana</SelectItem>
                      <SelectItem value="month">Mês</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart
            title="Produção Mensal"
            subtitle="Total de leite produzido por mês"
            data={prodByMonth}
            type="line"
          />
          <RevenueChart
            title="Produção vs Vendas"
            subtitle="Comparação entre produção e vendas"
            data={prodVsSales}
            type="area"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart
            title="Distribuição de Despesas"
            subtitle="Despesas por categoria"
            data={expensesByCategory}
            type="pie"
          />
          <RevenueChart
            title="Receitas vs Despesas"
            subtitle="Comparação entre receitas e despesas"
            data={financeChart}
            type="bar"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Receita Total</h3>
                <p className="text-2xl font-semibold text-farm-blue">
                  R$ {summary.receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Despesas Totais</h3>
                <p className="text-2xl font-semibold text-red-500">
                  R$ {summary.despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Lucro Líquido</h3>
                <p className="text-2xl font-semibold text-farm-green">
                  R$ {summary.lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
