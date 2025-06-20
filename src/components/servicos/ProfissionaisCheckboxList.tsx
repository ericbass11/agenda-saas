
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ServicoFormData } from "@/hooks/useServicoForm";

interface ProfissionaisCheckboxListProps {
  control: Control<ServicoFormData>;
  profissionaisDisponiveis: string[];
}

export function ProfissionaisCheckboxList({ control, profissionaisDisponiveis }: ProfissionaisCheckboxListProps) {
  return (
    <FormField
      control={control}
      name="profissionais"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profissionais Habilitados</FormLabel>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {profissionaisDisponiveis.map((prof) => (
              <div key={prof} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={prof}
                  checked={field.value.includes(prof)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([...field.value, prof]);
                    } else {
                      field.onChange(field.value.filter((p) => p !== prof));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <label htmlFor={prof} className="text-sm font-medium">
                  {prof}
                </label>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
