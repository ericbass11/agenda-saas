
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, Database, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function BackupExportacao() {
  const [tipoExportacao, setTipoExportacao] = useState("completo");
  const [formatoExportacao, setFormatoExportacao] = useState("excel");
  
  const { toast } = useToast();

  const handleExportar = () => {
    toast({
      title: "Exportação iniciada",
      description: `Exportando dados em formato ${formatoExportacao}. Você receberá o arquivo em breve.`
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup criado",
      description: "Backup completo dos dados foi criado com sucesso."
    });
  };

  const handleImportar = () => {
    toast({
      title: "Importação iniciada",
      description: "Selecione o arquivo para importar os dados."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup e Exportação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Exportação de Dados */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <Label className="text-base font-medium">Exportar Dados</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Exportação</Label>
              <Select value={tipoExportacao} onValueChange={setTipoExportacao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completo">Dados Completos</SelectItem>
                  <SelectItem value="agendamentos">Apenas Agendamentos</SelectItem>
                  <SelectItem value="clientes">Apenas Clientes</SelectItem>
                  <SelectItem value="servicos">Apenas Serviços</SelectItem>
                  <SelectItem value="profissionais">Apenas Profissionais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Formato</Label>
              <Select value={formatoExportacao} onValueChange={setFormatoExportacao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleExportar} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <Label className="text-base font-medium">Backup Completo</Label>
            </div>
            
            <p className="text-sm text-gray-600">
              Crie um backup completo de todos os dados do sistema, incluindo configurações.
            </p>
            
            <Button onClick={handleBackup} className="w-full" variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Criar Backup Completo
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-purple-600" />
              <Label className="text-base font-medium">Importar Dados</Label>
            </div>
            
            <p className="text-sm text-gray-600">
              Importe dados de um backup anterior ou arquivo externo.
            </p>
            
            <Button onClick={handleImportar} className="w-full" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar Dados
            </Button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-sm text-yellow-800">
            <strong>Aviso:</strong> Recomendamos fazer backups regulares dos seus dados. 
            A importação de dados substitui as informações existentes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
