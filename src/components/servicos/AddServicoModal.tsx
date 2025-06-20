
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";
import { useState } from "react";
import { ServicoForm } from "./ServicoForm";
import { ServicoData, ServicoFormData } from "@/hooks/useServicoForm";

interface AddServicoModalProps {
  servico?: ServicoData;
  onSave: (data: ServicoFormData) => void;
}

export function AddServicoModal({ servico, onSave }: AddServicoModalProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!servico;

  const handleSave = (data: ServicoFormData) => {
    onSave(data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Serviço" : "Adicionar Novo Serviço"}
          </DialogTitle>
        </DialogHeader>
        <ServicoForm 
          servico={servico}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
