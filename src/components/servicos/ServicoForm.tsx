
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useServicoForm, ServicoData, ServicoFormData } from "@/hooks/useServicoForm";
import { ServicoFormFields } from "./ServicoFormFields";

interface ServicoFormProps {
  servico?: ServicoData;
  onSave: (data: ServicoFormData) => void;
  onCancel: () => void;
}

export function ServicoForm({ servico, onSave, onCancel }: ServicoFormProps) {
  const { form } = useServicoForm(servico);
  const isEditing = !!servico;

  const onSubmit = (values: ServicoFormData) => {
    onSave(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ServicoFormFields control={form.control} />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEditing ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
