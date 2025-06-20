
import { ReactNode } from "react";

interface ClienteLayoutProps {
  children: ReactNode;
}

export const ClienteLayout = ({ children }: ClienteLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Agendamento Online</h1>
            <p className="text-sm text-gray-600">Agende seu horário de forma rápida e fácil</p>
          </div>
        </div>
      </header>
      
      <main className="max-w-md mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-8">
        <div className="max-w-md mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by Agendamento Fácil
          </p>
        </div>
      </footer>
    </div>
  );
};
