
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense } from "@/types";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<
    "feed" | "medication" | "equipment" | "labor" | "other" | ""
  >("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !amount || !category || !description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newExpense: Expense = {
        id: `e${Date.now()}`,
        date,
        amount: Number(amount),
        category: category as "feed" | "medication" | "equipment" | "labor" | "other",
        description,
      };

      onAddExpense(newExpense);

      toast({
        title: "Sucesso",
        description: "Despesa registrada com sucesso",
      });

      // Reset form
      setDate("");
      setAmount("");
      setCategory("");
      setDescription("");
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="text-xl font-semibold mb-4">Registrar Nova Despesa</h2>
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
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={category}
            onValueChange={(value) =>
              setCategory(
                value as "feed" | "medication" | "equipment" | "labor" | "other"
              )
            }
            disabled={isLoading}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feed">Alimentação</SelectItem>
              <SelectItem value="medication">Medicamentos</SelectItem>
              <SelectItem value="equipment">Equipamentos</SelectItem>
              <SelectItem value="labor">Mão de obra</SelectItem>
              <SelectItem value="other">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            placeholder="Descreva a despesa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registrando..." : "Registrar Despesa"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
