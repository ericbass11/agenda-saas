
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriasModal } from "@/components/configuracoes/CategoriasModal";
import { InformacoesEstabelecimento } from "@/components/configuracoes/InformacoesEstabelecimento";
import { HorariosFuncionamento } from "@/components/configuracoes/HorariosFuncionamento";
import { NotificacoesWhatsApp } from "@/components/configuracoes/NotificacoesWhatsApp";
import { ConfiguracoesAgendamento } from "@/components/configuracoes/ConfiguracoesAgendamento";
import { BackupExportacao } from "@/components/configuracoes/BackupExportacao";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu salão</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Categorias de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Gerencie as categorias de serviços do seu estabelecimento.
            </p>
            <CategoriasModal />
          </CardContent>
        </Card>
        
        <InformacoesEstabelecimento />
        <HorariosFuncionamento />
        <NotificacoesWhatsApp />
        <ConfiguracoesAgendamento />
        <BackupExportacao />
      </div>
    </div>
  );
}
