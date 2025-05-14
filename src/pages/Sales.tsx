import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SalesForm from "@/components/sales/SalesForm";
import SalesList from "@/components/sales/SalesList";
import RevenueChart from "@/components/charts/RevenueChart";
import { Sale } from "@/types";
import { mockSales, mockSalesChartData } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("sales").select("*").order("date", { ascending: false });
      if (error) {
        toast({
          title: "Erro ao carregar vendas",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setSales(data || []);
      }
      setIsLoading(false);
    };
    fetchSales();
  }, [toast]);

  const handleAddSale = (sale: Sale) => {
    setSales((prev) => [sale, ...prev]);
  };

  const handleDeleteSale = async (id: string) => {
    const { error } = await supabase.from("sales").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setSales((prev) => prev.filter((s) => s.id !== id));
    toast({
      title: "Venda excluída",
      description: "Registro removido com sucesso.",
    });
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Vendas</h1>
        <p className="text-muted-foreground mb-6">
          Gerencie os registros de vendas de leite
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SalesForm onAddSale={handleAddSale} />
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p>Carregando registros...</p>
                  </div>
                ) : (
                  <SalesList sales={sales} onDelete={handleDeleteSale} />
                )}
              </CardContent>
            </Card>

            <RevenueChart 
              title="Receitas Recentes"
              subtitle="Receita diária dos últimos 5 dias"
              data={[]}
              type="bar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
