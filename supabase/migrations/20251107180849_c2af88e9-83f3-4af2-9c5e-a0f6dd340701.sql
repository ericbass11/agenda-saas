-- Criar tabela de estabelecimentos
CREATE TABLE public.estabelecimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco TEXT,
  logo_url TEXT,
  fotos TEXT[],
  horario_funcionamento JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de profissionais
CREATE TABLE public.profissionais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID NOT NULL REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  biografia TEXT,
  foto_url TEXT,
  horarios_trabalho JSONB DEFAULT '{}',
  dias_folga TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de categorias de serviços
CREATE TABLE public.categorias_servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID NOT NULL REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de serviços
CREATE TABLE public.servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID NOT NULL REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  categoria_id UUID REFERENCES public.categorias_servicos(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  duracao_minutos INTEGER NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de profissionais_servicos (relação muitos-para-muitos)
CREATE TABLE public.profissional_servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profissional_id UUID NOT NULL REFERENCES public.profissionais(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES public.servicos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(profissional_id, servico_id)
);

-- Criar tabela de clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID NOT NULL REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  data_nascimento DATE,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de agendamentos
CREATE TABLE public.agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID NOT NULL REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  profissional_id UUID NOT NULL REFERENCES public.profissionais(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES public.servicos(id) ON DELETE CASCADE,
  data_agendamento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  status TEXT DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'cancelado', 'concluido', 'pendente')),
  valor DECIMAL(10,2),
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.estabelecimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissional_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;

-- Policies para estabelecimentos
CREATE POLICY "Usuários podem ver seus próprios estabelecimentos" ON public.estabelecimentos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar seus próprios estabelecimentos" ON public.estabelecimentos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar seus próprios estabelecimentos" ON public.estabelecimentos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar seus próprios estabelecimentos" ON public.estabelecimentos FOR DELETE USING (auth.uid() = user_id);

-- Policies para profissionais
CREATE POLICY "Donos podem ver profissionais" ON public.profissionais FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = profissionais.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem criar profissionais" ON public.profissionais FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem atualizar profissionais" ON public.profissionais FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = profissionais.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem deletar profissionais" ON public.profissionais FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = profissionais.estabelecimento_id AND user_id = auth.uid())
);

-- Policies para categorias
CREATE POLICY "Donos podem ver categorias" ON public.categorias_servicos FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = categorias_servicos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem criar categorias" ON public.categorias_servicos FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem atualizar categorias" ON public.categorias_servicos FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = categorias_servicos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem deletar categorias" ON public.categorias_servicos FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = categorias_servicos.estabelecimento_id AND user_id = auth.uid())
);

-- Policies para serviços
CREATE POLICY "Donos podem ver serviços" ON public.servicos FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = servicos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem criar serviços" ON public.servicos FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem atualizar serviços" ON public.servicos FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = servicos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem deletar serviços" ON public.servicos FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = servicos.estabelecimento_id AND user_id = auth.uid())
);

-- Policies para profissional_servicos
CREATE POLICY "Donos podem ver profissional_servicos" ON public.profissional_servicos FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profissionais p
    JOIN public.estabelecimentos e ON p.estabelecimento_id = e.id
    WHERE p.id = profissional_servicos.profissional_id AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Donos podem criar profissional_servicos" ON public.profissional_servicos FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profissionais p
    JOIN public.estabelecimentos e ON p.estabelecimento_id = e.id
    WHERE p.id = profissional_id AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Donos podem deletar profissional_servicos" ON public.profissional_servicos FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profissionais p
    JOIN public.estabelecimentos e ON p.estabelecimento_id = e.id
    WHERE p.id = profissional_servicos.profissional_id AND e.user_id = auth.uid()
  )
);

-- Policies para clientes
CREATE POLICY "Donos podem ver clientes" ON public.clientes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = clientes.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem criar clientes" ON public.clientes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem atualizar clientes" ON public.clientes FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = clientes.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem deletar clientes" ON public.clientes FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = clientes.estabelecimento_id AND user_id = auth.uid())
);

-- Policies para agendamentos
CREATE POLICY "Donos podem ver agendamentos" ON public.agendamentos FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = agendamentos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem criar agendamentos" ON public.agendamentos FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem atualizar agendamentos" ON public.agendamentos FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = agendamentos.estabelecimento_id AND user_id = auth.uid())
);
CREATE POLICY "Donos podem deletar agendamentos" ON public.agendamentos FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.estabelecimentos WHERE id = agendamentos.estabelecimento_id AND user_id = auth.uid())
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_estabelecimentos_updated_at BEFORE UPDATE ON public.estabelecimentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profissionais_updated_at BEFORE UPDATE ON public.profissionais FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_servicos_updated_at BEFORE UPDATE ON public.servicos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agendamentos_updated_at BEFORE UPDATE ON public.agendamentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função para verificar horário disponível
CREATE OR REPLACE FUNCTION public.check_horario_disponivel(
  p_profissional_id UUID,
  p_data_agendamento DATE,
  p_hora_inicio TIME,
  p_hora_fim TIME,
  p_agendamento_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  conflito_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO conflito_count
  FROM public.agendamentos
  WHERE profissional_id = p_profissional_id
    AND data_agendamento = p_data_agendamento
    AND status != 'cancelado'
    AND (p_agendamento_id IS NULL OR id != p_agendamento_id)
    AND (
      (hora_inicio < p_hora_fim AND hora_fim > p_hora_inicio)
    );
  
  RETURN conflito_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter horários disponíveis
CREATE OR REPLACE FUNCTION public.get_horarios_disponiveis(
  p_profissional_id UUID,
  p_data_agendamento DATE,
  p_duracao_minutos INTEGER
)
RETURNS TABLE(hora_inicio TIME, hora_fim TIME) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.hora::TIME as hora_inicio,
    (t.hora + (p_duracao_minutos || ' minutes')::INTERVAL)::TIME as hora_fim
  FROM generate_series(
    '08:00'::TIME,
    '18:00'::TIME,
    '30 minutes'::INTERVAL
  ) AS t(hora)
  WHERE public.check_horario_disponivel(
    p_profissional_id,
    p_data_agendamento,
    t.hora::TIME,
    (t.hora + (p_duracao_minutos || ' minutes')::INTERVAL)::TIME
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;