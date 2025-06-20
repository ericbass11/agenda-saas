
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ServicoFormData } from "@/hooks/useServicoForm";
import { ProfissionaisCheckboxList } from "./ProfissionaisCheckboxList";

interface ServicoFormFieldsProps {
  control: Control<ServicoFormData>;
}

const categorias = [
  "Cabelo",
  "Unhas",
  "Barba",
  "Tratamentos Faciais",
  "Massagens",
  "Depilação",
  "Sobrancelhas",
  "Outros"
];

const profissionaisDisponiveis = [
  "Maria Silva",
  "João Santos",
  "Ana Costa",
  "Pedro Lima",
  "Carla Ferreira"
];

export function ServicoFormFields({ control }: ServicoFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Serviço</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Corte Feminino" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoria"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="duracao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duração</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 60 min" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: R$ 80,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <ProfissionaisCheckboxList 
        control={control} 
        profissionaisDisponiveis={profissionaisDisponiveis} 
      />

      <FormField
        control={control}
        name="descricao"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição (Opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Descrição do serviço..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
