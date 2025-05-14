import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sale } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface SalesListProps {
  sales: Sale[];
  onDelete: (id: string) => void;
}

const SalesList = ({ sales, onDelete }: SalesListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <TableHead>Ações</TableHead>
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
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDeleteId(sale.id);
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
            <p className="mb-4">Tem certeza que deseja excluir esta venda?</p>
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

export default SalesList;
