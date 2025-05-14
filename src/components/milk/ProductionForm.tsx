import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MilkProduction } from "@/types";
import { supabase } from "@/lib/supabase";

interface ProductionFormProps {
  onAddProduction: (production: MilkProduction) => void;
}

const ProductionForm = ({ onAddProduction }: ProductionFormProps) => {
  const [date, setDate] = useState(() => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  const [quantity, setQuantity] = useState("");
  const [cowCount, setCowCount] = useState("");
  const [quality, setQuality] = useState<"A" | "B" | "C" | "">("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !quantity || !cowCount || !quality) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const { data, error } = await supabase.from("production").insert({
      date,
      quantity: Number(quantity),
      cow_count: Number(cowCount),
      quality,
      notes: notes || null,
    }).select().single();
    
    if (error) {
      toast({
        title: "Erro ao registrar produção",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    if (data) {
      // Ajustar para o formato esperado pelo sistema
      onAddProduction({
        id: data.id,
        date: data.date,
        quantity: data.quantity,
        cowCount: data.cow_count,
        quality: data.quality,
        notes: data.notes,
      });
      toast({
        title: "Sucesso",
        description: "Produção registrada com sucesso",
      });
      setDate("");
      setQuantity("");
      setCowCount("");
      setQuality("");
      setNotes("");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="text-xl font-semibold mb-4">Registrar Nova Produção</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade (litros)</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cowCount">Número de Vacas</Label>
            <Input
              id="cowCount"
              type="number"
              min="1"
              value={cowCount}
              onChange={(e) => setCowCount(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quality">Qualidade</Label>
            <Select 
              value={quality} 
              onValueChange={(value) => setQuality(value as "A" | "B" | "C")}
              disabled={isLoading}
            >
              <SelectTrigger id="quality">
                <SelectValue placeholder="Selecione a qualidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A - Excelente</SelectItem>
                <SelectItem value="B">B - Boa</SelectItem>
                <SelectItem value="C">C - Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            placeholder="Observações opcionais sobre a produção"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registrando..." : "Registrar Produção"}
        </Button>
      </div>
    </form>
  );
};

export default ProductionForm;
