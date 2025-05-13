
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ExpenseForm from "@/components/finance/ExpenseForm";
import ExpenseList from "@/components/finance/ExpenseList";
import RevenueChart from "@/components/charts/RevenueChart";
import { Expense } from "@/types";
import { mockExpenses, mockExpensesChartData } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExpenses(mockExpenses);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Despesas</h1>
        <p className="text-muted-foreground mb-6">
          Gerencie os registros de despesas da fazenda
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Histórico de Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p>Carregando registros...</p>
                  </div>
                ) : (
                  <ExpenseList expenses={expenses} />
                )}
              </CardContent>
            </Card>

            <RevenueChart 
              title="Despesas Recentes"
              subtitle="Despesas diárias dos últimos 5 dias"
              data={mockExpensesChartData}
              type="bar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
