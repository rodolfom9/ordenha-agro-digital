
import LoginForm from "@/components/auth/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se já existe uma sessão ativa
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      
      if (data.session && isAuthenticated) {
        navigate("/dashboard");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <LoginForm />
    </div>
  );
};

export default Login;
