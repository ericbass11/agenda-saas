
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { useState } from "react";
import { useCategorias } from "@/hooks/useCategorias";

export function CategoriasManager() {
  const { categorias, addCategoria, updateCategoria, deleteCategoria } = useCategorias();
  const [novaCategoria, setNovaCategoria] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNome, setEditingNome] = useState("");

  const handleAddCategoria = () => {
    if (novaCategoria.trim()) {
      addCategoria(novaCategoria.trim());
      setNovaCategoria("");
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
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingNome("");
  };

  const handleDeleteCategoria = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      deleteCategoria(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias de Serviços</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Adicionar nova categoria */}
        <div className="flex gap-2">
          <Input
            placeholder="Nome da nova categoria"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategoria()}
          />
          <Button onClick={handleAddCategoria} disabled={!novaCategoria.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {/* Lista de categorias */}
        <div className="space-y-2">
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
                      onClick={() => handleDeleteCategoria(categoria.id)}
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
      </CardContent>
    </Card>
  );
}
