
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Milk } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Checkbox } from "@/components/ui/checkbox";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos");
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Tentando login com:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Erro de login:", error.message);
        localStorage.removeItem("isAuthenticated");
        setErrorMessage(error.message || "Usuário ou senha inválidos");
        throw error;
      }
      
      const user = data.user;
      if (!user) {
        localStorage.removeItem("isAuthenticated");
        setErrorMessage("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
      }
      
      localStorage.setItem("isAuthenticated", "true");
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${user.email}!`,
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      localStorage.removeItem("isAuthenticated");
      toast({
        title: "Erro de autenticação",
        description: error?.message || "Usuário ou senha inválidos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se existe email salvo
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Milk className="h-12 w-12 text-farm-green" />
        </div>
        <CardTitle className="text-2xl text-center">RMCGEO</CardTitle>
        <CardDescription className="text-center">
          Entre com suas credenciais para acessar o sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {errorMessage && (
              <div className="p-3 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md">
                {errorMessage}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Lembrar meu email
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Autenticando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          Use seu email e senha cadastrados no sistema
        </p>
        <p className="text-xs text-muted-foreground">
          Credenciais de demonstração: admin@admin.com / admin
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
