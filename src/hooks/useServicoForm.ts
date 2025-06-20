
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  duracao: z.string().min(1, "Duração é obrigatória"),
  preco: z.string().min(1, "Preço é obrigatório"),
  profissionais: z.array(z.string()).min(1, "Selecione pelo menos um profissional"),
  descricao: z.string().optional(),
});

export type ServicoFormData = z.infer<typeof formSchema>;

export interface ServicoData {
  id: number;
  nome: string;
  categoria: string;
  duracao: string;
  preco: string;
  profissionais: string[];
  descricao?: string;
}

export function useServicoForm(servico?: ServicoData) {
  const form = useForm<ServicoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: servico?.nome || "",
      categoria: servico?.categoria || "",
      duracao: servico?.duracao || "",
      preco: servico?.preco || "",
      profissionais: servico?.profissionais || [],
      descricao: servico?.descricao || "",
    },
  });

  return { form, formSchema };
}
