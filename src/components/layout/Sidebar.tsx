
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Milk, 
  ShoppingCart, 
  CreditCard, 
  BarChart 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Produção",
      href: "/production",
      icon: <Milk className="h-5 w-5" />,
    },
    {
      title: "Vendas",
      href: "/sales",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Despesas",
      href: "/expenses",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Relatórios",
      href: "/reports",
      icon: <BarChart className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r h-screen fixed">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Milk className="h-6 w-6 text-farm-green" />
          <span className="font-semibold">Farm Milk Monitor</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {links.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  isActive(link.href) && "bg-sidebar-accent font-medium"
                )}
              >
                <span className={cn("mr-2", isActive(link.href) ? "text-primary" : "text-muted-foreground")}>
                  {link.icon}
                </span>
                {link.title}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-center text-muted-foreground">
          Farm Milk Monitor © 2023
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
