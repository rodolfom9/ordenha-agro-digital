import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sale } from "@/types";
import { supabase } from "@/lib/supabase";

interface SalesFormProps {
  onAddSale: (sale: Sale) => void;
}

const SalesForm = ({ onAddSale }: SalesFormProps) => {
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerLiter, setPricePerLiter] = useState("");
  const [buyer, setBuyer] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const calculateTotal = () => {
    if (quantity && pricePerLiter) {
      return (Number(quantity) * Number(pricePerLiter)).toFixed(2);
    }
    return "0.00";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !quantity || !pricePerLiter || !buyer) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const totalAmount = Number(quantity) * Number(pricePerLiter);
    const { data, error } = await supabase.from("sales").insert({
      date,
      quantity: Number(quantity),
      price_per_liter: Number(pricePerLiter),
      total_amount: totalAmount,
      buyer,
      notes: notes || null,
    }).select().single();
    
    if (error) {
      toast({
        title: "Erro ao registrar venda",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    if (data) {
      onAddSale({
        id: data.id,
        date: data.date,
        quantity: data.quantity,
        pricePerLiter: data.price_per_liter,
        totalAmount: data.total_amount,
        buyer: data.buyer,
        notes: data.notes,
      });
      toast({
        title: "Sucesso",
        description: "Venda registrada com sucesso",
      });
      setDate("");
      setQuantity("");
      setPricePerLiter("");
      setBuyer("");
      setNotes("");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="text-xl font-semibold mb-4">Registrar Nova Venda</h2>
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
            <Label htmlFor="buyer">Comprador</Label>
            <Input
              id="buyer"
              placeholder="Nome do comprador"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="pricePerLiter">Preço por Litro (R$)</Label>
            <Input
              id="pricePerLiter"
              type="number"
              min="0"
              step="0.01"
              value={pricePerLiter}
              onChange={(e) => setPricePerLiter(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Valor Total</Label>
          <Input
            value={`R$ ${calculateTotal()}`}
            readOnly
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            placeholder="Observações opcionais sobre a venda"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registrando..." : "Registrar Venda"}
        </Button>
      </div>
    </form>
  );
};

export default SalesForm;
