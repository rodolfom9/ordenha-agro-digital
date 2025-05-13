
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductionForm from "@/components/milk/ProductionForm";
import ProductionList from "@/components/milk/ProductionList";
import { MilkProduction } from "@/types";
import { mockProductions } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Production = () => {
  const [productions, setProductions] = useState<MilkProduction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProductions(mockProductions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddProduction = (production: MilkProduction) => {
    setProductions((prev) => [production, ...prev]);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Produção de Leite</h1>
        <p className="text-muted-foreground mb-6">
          Gerencie os registros de produção diária de leite
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductionForm onAddProduction={handleAddProduction} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Produção</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p>Carregando registros...</p>
                  </div>
                ) : (
                  <ProductionList productions={productions} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Production;
