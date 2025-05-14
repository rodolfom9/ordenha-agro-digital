import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MilkProduction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ProductionListProps {
  productions: MilkProduction[];
  onDelete: (id: string) => void;
}

const ProductionList = ({ productions, onDelete }: ProductionListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const getQualityBadge = (quality: "A" | "B" | "C") => {
    switch (quality) {
      case "A":
        return <Badge className="bg-green-500">A - Excelente</Badge>;
      case "B":
        return <Badge className="bg-yellow-500">B - Boa</Badge>;
      case "C":
        return <Badge className="bg-red-500">C - Regular</Badge>;
    }
  };

  if (productions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma produção registrada.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Quantidade (L)</TableHead>
            <TableHead>Nº de Vacas</TableHead>
            <TableHead>Média por Vaca</TableHead>
            <TableHead>Qualidade</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productions.map((production) => (
            <TableRow key={production.id}>
              <TableCell>{formatDate(production.date)}</TableCell>
              <TableCell>{production.quantity}</TableCell>
              <TableCell>{production.cowCount}</TableCell>
              <TableCell>
                {(production.quantity / production.cowCount).toFixed(2)}
              </TableCell>
              <TableCell>{getQualityBadge(production.quality)}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {production.notes || "-"}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDeleteId(production.id);
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
            <p className="mb-4">Tem certeza que deseja excluir este registro de produção?</p>
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

export default ProductionList;
