import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductionForm from "@/components/milk/ProductionForm";
import ProductionList from "@/components/milk/ProductionList";
import { MilkProduction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Production = () => {
  const [productions, setProductions] = useState<MilkProduction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("production").select("*").order("date", { ascending: false });
      if (error) {
        toast({
          title: "Erro ao carregar produções",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setProductions(data || []);
      }
      setIsLoading(false);
    };
    fetchProductions();
  }, [toast]);

  const handleAddProduction = (production: MilkProduction) => {
    setProductions((prev) => [production, ...prev]);
  };

  const handleDeleteProduction = async (id: string) => {
    const { error } = await supabase.from("production").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setProductions((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Produção excluída",
      description: "Registro removido com sucesso.",
    });
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
                  <ProductionList productions={productions} onDelete={handleDeleteProduction} />
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
