import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Expense } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList = ({ expenses, onDelete }: ExpenseListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  const getCategoryLabel = (
    category: "feed" | "medication" | "equipment" | "labor" | "other"
  ) => {
    switch (category) {
      case "feed":
        return "Alimentação";
      case "medication":
        return "Medicamentos";
      case "equipment":
        return "Equipamentos";
      case "labor":
        return "Mão de obra";
      case "other":
        return "Outros";
    }
  };

  const getCategoryBadge = (
    category: "feed" | "medication" | "equipment" | "labor" | "other"
  ) => {
    switch (category) {
      case "feed":
        return <Badge className="bg-orange-500">{getCategoryLabel(category)}</Badge>;
      case "medication":
        return <Badge className="bg-blue-500">{getCategoryLabel(category)}</Badge>;
      case "equipment":
        return <Badge className="bg-purple-500">{getCategoryLabel(category)}</Badge>;
      case "labor":
        return <Badge className="bg-green-500">{getCategoryLabel(category)}</Badge>;
      case "other":
        return <Badge className="bg-gray-500">{getCategoryLabel(category)}</Badge>;
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma despesa registrada.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{formatDate(expense.date)}</TableCell>
              <TableCell>{getCategoryBadge(expense.category)}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(expense.amount)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDeleteId(expense.id);
                    setShowConfirm(true);
                  }}
                  title="Excluir"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Confirmar exclusão</h2>
            <p className="mb-4">Tem certeza que deseja excluir esta despesa?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteId) onDelete(deleteId);
                  setShowConfirm(false);
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
