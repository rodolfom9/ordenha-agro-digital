
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

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseList;
