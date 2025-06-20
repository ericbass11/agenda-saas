
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus, Check, X, Settings } from "lucide-react";
import { useState } from "react";
import { useCategorias } from "@/hooks/useCategorias";
import { useToast } from "@/hooks/use-toast";

export function CategoriasModal() {
  const { categorias, addCategoria, updateCategoria, deleteCategoria } = useCategorias();
  const [novaCategoria, setNovaCategoria] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNome, setEditingNome] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCategoria = () => {
    if (novaCategoria.trim()) {
      addCategoria(novaCategoria.trim());
      setNovaCategoria("");
      toast({
        title: "Categoria adicionada",
        description: `A categoria "${novaCategoria.trim()}" foi criada com sucesso.`
      });
    }
  };

  const startEditing = (id: number, nome: string) => {
    setEditingId(id);
    setEditingNome(nome);
  };

  const confirmEdit = () => {
    if (editingId && editingNome.trim()) {
      updateCategoria(editingId, editingNome.trim());
      setEditingId(null);
      setEditingNome("");
      toast({
        title: "Categoria atualizada",
        description: "A categoria foi atualizada com sucesso."
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingNome("");
  };

  const handleDeleteCategoria = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {
      deleteCategoria(id);
      toast({
        title: "Categoria excluída",
        description: `A categoria "${nome}" foi removida com sucesso.`
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          Gerenciar Categorias
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerenciar Categorias de Serviços</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Adicionar nova categoria */}
          <div className="flex gap-2">
            <Input
              placeholder="Nome da nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategoria()}
            />
            <Button onClick={handleAddCategoria} disabled={!novaCategoria.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Lista de categorias */}
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="flex items-center justify-between p-3 border rounded-lg">
                {editingId === categoria.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editingNome}
                      onChange={(e) => setEditingNome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && confirmEdit()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={confirmEdit} disabled={!editingNome.trim()}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium">{categoria.nome}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(categoria.id, categoria.nome)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCategoria(categoria.id, categoria.nome)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-500 text-center">
            Total: {categorias.length} categoria{categorias.length !== 1 ? 's' : ''}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
