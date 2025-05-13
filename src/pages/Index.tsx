
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Milk } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Milk className="h-6 w-6 text-farm-green" />
            <span className="font-semibold text-xl">Farm Milk Monitor</span>
          </div>
          <Button onClick={() => navigate("/login")}>Entrar</Button>
        </div>
      </header>
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Gestão completa para sua produção de leite
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Monitore a produção, vendas e finanças da sua fazenda leiteira com um sistema completo e fácil de usar.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-farm-green hover:bg-farm-lightGreen"
                  onClick={() => navigate("/login")}
                >
                  Começar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="font-medium">Produção</h3>
                    <p className="text-2xl font-bold text-farm-green">100%</p>
                    <p className="text-sm text-gray-500">Monitoramento</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="font-medium">Vendas</h3>
                    <p className="text-2xl font-bold text-farm-blue">Eficiente</p>
                    <p className="text-sm text-gray-500">Gestão completa</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h3 className="font-medium">Relatórios</h3>
                    <p className="text-2xl font-bold text-farm-yellow">Detalhados</p>
                    <p className="text-sm text-gray-500">Visualizações claras</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h3 className="font-medium">Análises</h3>
                    <p className="text-2xl font-bold text-purple-500">Precisas</p>
                    <p className="text-sm text-gray-500">Dados confiáveis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-10">Principais Funcionalidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Milk className="h-6 w-6 text-farm-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Controle de Produção</h3>
                <p className="text-gray-600">
                  Registre e acompanhe toda a produção de leite diária, com métricas e análises detalhadas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-farm-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Gestão de Vendas</h3>
                <p className="text-gray-600">
                  Controle completo das vendas, com registro de compradores, valores e quantidades.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Relatórios Financeiros</h3>
                <p className="text-gray-600">
                  Visualize receitas, despesas e lucro com gráficos intuitivos para melhor tomada de decisão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Milk className="h-5 w-5 text-white" />
                <span className="font-semibold">Farm Milk Monitor</span>
              </div>
              <p className="text-sm text-gray-400">
                © 2023 Farm Milk Monitor. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
