
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

interface ProductionListProps {
  productions: MilkProduction[];
}

const ProductionList = ({ productions }: ProductionListProps) => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductionList;
