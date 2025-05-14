import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ExpenseForm from "@/components/finance/ExpenseForm";
import ExpenseList from "@/components/finance/ExpenseList";
import RevenueChart from "@/components/charts/RevenueChart";
import { Expense } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("expenses").select("*").order("date", { ascending: false });
      if (error) {
        toast({
          title: "Erro ao carregar despesas",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setExpenses(data || []);
      }
      setIsLoading(false);
    };
    fetchExpenses();
  }, [toast]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    toast({
      title: "Despesa excluída",
      description: "Registro removido com sucesso.",
    });
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
                  <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
                )}
              </CardContent>
            </Card>

            <RevenueChart 
              title="Despesas Recentes"
              subtitle="Despesas diárias dos últimos 5 dias"
              data={[]}
              type="bar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
