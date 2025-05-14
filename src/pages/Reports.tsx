import { useState } from "react";
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
            data={[]}
            type="line"
          />
          <RevenueChart
            title="Produção vs Vendas"
            subtitle="Comparação entre produção e vendas"
            data={[]}
            type="area"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart
            title="Distribuição de Despesas"
            subtitle="Despesas por categoria"
            data={categoryExpenses}
            type="pie"
          />
          <RevenueChart
            title="Receitas vs Despesas"
            subtitle="Comparação entre receitas e despesas"
            data={[]}
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
                  R$ 12.500,00
                </p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Despesas Totais</h3>
                <p className="text-2xl font-semibold text-red-500">
                  R$ 5.320,00
                </p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Lucro Líquido</h3>
                <p className="text-2xl font-semibold text-farm-green">
                  R$ 7.180,00
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
