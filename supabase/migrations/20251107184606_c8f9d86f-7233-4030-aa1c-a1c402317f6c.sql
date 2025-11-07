-- Corrigir search_path nas funções de segurança

-- Recriar função update_updated_at_column com search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recriar função check_horario_disponivel com search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recriar função get_horarios_disponiveis com search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;