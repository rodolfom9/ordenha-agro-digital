
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SalesForm from "@/components/sales/SalesForm";
import SalesList from "@/components/sales/SalesList";
import RevenueChart from "@/components/charts/RevenueChart";
import { Sale } from "@/types";
import { mockSales, mockSalesChartData } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSales(mockSales);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddSale = (sale: Sale) => {
    setSales((prev) => [sale, ...prev]);
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
                  <SalesList sales={sales} />
                )}
              </CardContent>
            </Card>

            <RevenueChart 
              title="Receitas Recentes"
              subtitle="Receita diária dos últimos 5 dias"
              data={mockSalesChartData}
              type="bar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
