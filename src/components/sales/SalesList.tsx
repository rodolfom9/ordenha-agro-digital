
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sale } from "@/types";

interface SalesListProps {
  sales: Sale[];
}

const SalesList = ({ sales }: SalesListProps) => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  if (sales.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma venda registrada.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Comprador</TableHead>
            <TableHead>Quantidade (L)</TableHead>
            <TableHead>Preço/Litro</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Observações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{formatDate(sale.date)}</TableCell>
              <TableCell>{sale.buyer}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{formatCurrency(sale.pricePerLiter)}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(sale.totalAmount)}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {sale.notes || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesList;
