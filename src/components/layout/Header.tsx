
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { Milk } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        setUser({
          id: data.user.id,
          username: data.user.email || '',
          name: data.user.email?.split('@')[0] || 'Usuário',
          role: 'user'
        });
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center px-6 border-b bg-white">
      <div className="flex items-center gap-2 md:hidden">
        <Milk className="h-6 w-6 text-farm-green" />
        <span className="font-semibold">Farm Milk Monitor</span>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Olá, {user?.name || "Usuário"}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </header>
  );
};

export default Header;
