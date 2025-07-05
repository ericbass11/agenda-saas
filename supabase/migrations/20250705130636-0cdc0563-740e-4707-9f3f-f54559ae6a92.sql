-- Criar tabela de estabelecimentos
CREATE TABLE public.estabelecimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco TEXT,
  logo_url TEXT,
  fotos TEXT[],
  horario_funcionamento JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de categorias de serviços
CREATE TABLE public.categorias_servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de profissionais
CREATE TABLE public.profissionais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  biografia TEXT,
  foto_url TEXT,
  horarios_trabalho JSONB, -- Estrutura: {"segunda": {"inicio": "09:00", "fim": "18:00"}, ...}
  dias_folga TEXT[], -- ["domingo", "segunda"]
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de serviços
CREATE TABLE public.servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  categoria_id UUID REFERENCES public.categorias_servicos(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  duracao_minutos INTEGER NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de relacionamento profissional-serviços
CREATE TABLE public.profissional_servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profissional_id UUID REFERENCES public.profissionais(id) ON DELETE CASCADE,
  servico_id UUID REFERENCES public.servicos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(profissional_id, servico_id)
);

-- Criar tabela de clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  data_nascimento DATE,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(estabelecimento_id, telefone)
);

-- Criar tabela de agendamentos
CREATE TABLE public.agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES public.profissionais(id) ON DELETE CASCADE,
  servico_id UUID REFERENCES public.servicos(id) ON DELETE CASCADE,
  data_agendamento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  status TEXT DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'cancelado', 'concluido', 'faltou')),
  observacoes TEXT,
  valor DECIMAL(10,2),
  lembrete_enviado BOOLEAN DEFAULT false,
  confirmacao_enviada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de configurações do estabelecimento
CREATE TABLE public.configuracoes_estabelecimento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estabelecimento_id UUID REFERENCES public.estabelecimentos(id) ON DELETE CASCADE,
  antecedencia_minima_horas INTEGER DEFAULT 2,
  antecedencia_maxima_dias INTEGER DEFAULT 30,
  buffer_entre_agendamentos_minutos INTEGER DEFAULT 15,
  permitir_agendamento_domingo BOOLEAN DEFAULT false,
  permitir_agendamento_feriados BOOLEAN DEFAULT false,
  lembrete_horas_antes INTEGER DEFAULT 24,
  whatsapp_token TEXT,
  whatsapp_phone_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(estabelecimento_id)
);

-- Enable Row Level Security
ALTER TABLE public.estabelecimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissional_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes_estabelecimento ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for estabelecimentos
CREATE POLICY "Users can view their own estabelecimento" 
ON public.estabelecimentos 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own estabelecimento" 
ON public.estabelecimentos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own estabelecimento" 
ON public.estabelecimentos 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create security definer function to get user's estabelecimento_id
CREATE OR REPLACE FUNCTION public.get_user_estabelecimento_id()
RETURNS UUID AS $$
  SELECT id FROM public.estabelecimentos WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create RLS policies for categorias_servicos
CREATE POLICY "Users can manage their estabelecimento categorias" 
ON public.categorias_servicos 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Create RLS policies for profissionais
CREATE POLICY "Users can manage their estabelecimento profissionais" 
ON public.profissionais 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Create RLS policies for servicos
CREATE POLICY "Users can manage their estabelecimento servicos" 
ON public.servicos 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Create RLS policies for profissional_servicos
CREATE POLICY "Users can manage their estabelecimento profissional_servicos" 
ON public.profissional_servicos 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profissionais p 
    WHERE p.id = profissional_servicos.profissional_id 
    AND p.estabelecimento_id = public.get_user_estabelecimento_id()
  )
);

-- Create RLS policies for clientes
CREATE POLICY "Users can manage their estabelecimento clientes" 
ON public.clientes 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Public policy for clientes to create themselves during booking
CREATE POLICY "Anyone can create cliente during booking" 
ON public.clientes 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for agendamentos
CREATE POLICY "Users can manage their estabelecimento agendamentos" 
ON public.agendamentos 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Public policy for agendamentos creation during booking
CREATE POLICY "Anyone can create agendamento during booking" 
ON public.agendamentos 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for configuracoes_estabelecimento
CREATE POLICY "Users can manage their estabelecimento configuracoes" 
ON public.configuracoes_estabelecimento 
FOR ALL 
USING (estabelecimento_id = public.get_user_estabelecimento_id());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_estabelecimentos_updated_at
BEFORE UPDATE ON public.estabelecimentos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categorias_servicos_updated_at
BEFORE UPDATE ON public.categorias_servicos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profissionais_updated_at
BEFORE UPDATE ON public.profissionais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_servicos_updated_at
BEFORE UPDATE ON public.servicos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at
BEFORE UPDATE ON public.clientes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agendamentos_updated_at
BEFORE UPDATE ON public.agendamentos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_configuracoes_estabelecimento_updated_at
BEFORE UPDATE ON public.configuracoes_estabelecimento
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_estabelecimentos_user_id ON public.estabelecimentos(user_id);
CREATE INDEX idx_profissionais_estabelecimento_id ON public.profissionais(estabelecimento_id);
CREATE INDEX idx_servicos_estabelecimento_id ON public.servicos(estabelecimento_id);
CREATE INDEX idx_clientes_estabelecimento_id ON public.clientes(estabelecimento_id);
CREATE INDEX idx_agendamentos_estabelecimento_id ON public.agendamentos(estabelecimento_id);
CREATE INDEX idx_agendamentos_data ON public.agendamentos(estabelecimento_id, data_agendamento);
CREATE INDEX idx_agendamentos_profissional_data ON public.agendamentos(profissional_id, data_agendamento);

-- Function to check horario availability
CREATE OR REPLACE FUNCTION public.check_horario_disponivel(
  _estabelecimento_id UUID,
  _profissional_id UUID,
  _data_agendamento DATE,
  _hora_inicio TIME,
  _hora_fim TIME,
  _agendamento_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if there's any conflicting appointment
  RETURN NOT EXISTS (
    SELECT 1 FROM public.agendamentos a
    WHERE a.estabelecimento_id = _estabelecimento_id
    AND a.profissional_id = _profissional_id
    AND a.data_agendamento = _data_agendamento
    AND a.status != 'cancelado'
    AND (_agendamento_id IS NULL OR a.id != _agendamento_id)
    AND (
      (a.hora_inicio <= _hora_inicio AND a.hora_fim > _hora_inicio) OR
      (a.hora_inicio < _hora_fim AND a.hora_fim >= _hora_fim) OR
      (_hora_inicio <= a.hora_inicio AND _hora_fim > a.hora_inicio)
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get available time slots
CREATE OR REPLACE FUNCTION public.get_horarios_disponiveis(
  _estabelecimento_id UUID,
  _profissional_id UUID,
  _data_agendamento DATE,
  _duracao_minutos INTEGER
)
RETURNS TABLE(hora_inicio TIME, hora_fim TIME) AS $$
DECLARE
  horario_trabalho JSONB;
  dia_semana TEXT;
  inicio_trabalho TIME;
  fim_trabalho TIME;
  slot_inicio TIME;
  slot_fim TIME;
  intervalo INTERVAL;
BEGIN
  -- Get day of week in Portuguese
  dia_semana := CASE EXTRACT(DOW FROM _data_agendamento)
    WHEN 0 THEN 'domingo'
    WHEN 1 THEN 'segunda'
    WHEN 2 THEN 'terca'
    WHEN 3 THEN 'quarta'
    WHEN 4 THEN 'quinta'
    WHEN 5 THEN 'sexta'
    WHEN 6 THEN 'sabado'
  END;

  -- Get professional's work schedule
  SELECT p.horarios_trabalho INTO horario_trabalho
  FROM public.profissionais p
  WHERE p.id = _profissional_id AND p.estabelecimento_id = _estabelecimento_id;

  -- Check if professional works on this day
  IF horario_trabalho IS NULL OR horario_trabalho->dia_semana IS NULL THEN
    RETURN;
  END IF;

  -- Get work hours for the day
  inicio_trabalho := (horario_trabalho->dia_semana->>'inicio')::TIME;
  fim_trabalho := (horario_trabalho->dia_semana->>'fim')::TIME;
  
  -- Create interval for duration
  intervalo := (_duracao_minutos || ' minutes')::INTERVAL;
  
  -- Generate time slots
  slot_inicio := inicio_trabalho;
  
  WHILE slot_inicio + intervalo <= fim_trabalho LOOP
    slot_fim := slot_inicio + intervalo;
    
    -- Check if slot is available
    IF public.check_horario_disponivel(_estabelecimento_id, _profissional_id, _data_agendamento, slot_inicio, slot_fim) THEN
      hora_inicio := slot_inicio;
      hora_fim := slot_fim;
      RETURN NEXT;
    END IF;
    
    -- Move to next 30-minute slot
    slot_inicio := slot_inicio + INTERVAL '30 minutes';
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;