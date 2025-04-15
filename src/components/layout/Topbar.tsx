
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  Store, 
  Heart, 
  Clock, 
  ShoppingCart, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopbarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const TopbarItem = ({ to, icon, label, isActive }: TopbarItemProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex flex-col items-center px-4 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-manmul-600 border-b-2 border-manmul-600" 
          : "text-gray-600 hover:text-manmul-500"
      )}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
};

const Topbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Define navigation items
  const navItems = [
    { 
      to: "/products", 
      icon: <ShoppingBag size={isMobile ? 18 : 20} />, 
      label: "Products" 
    },
    { 
      to: "/shops", 
      icon: <Store size={isMobile ? 18 : 20} />, 
      label: "Shops" 
    },
    { 
      to: "/healthcare", 
      icon: <Heart size={isMobile ? 18 : 20} />, 
      label: "Healthcare" 
    },
    { 
      to: "/history", 
      icon: <Clock size={isMobile ? 18 : 20} />, 
      label: "History" 
    },
    { 
      to: "/cart", 
      icon: <ShoppingCart size={isMobile ? 18 : 20} />, 
      label: "Cart" 
    },
    { 
      to: "/settings", 
      icon: <Settings size={isMobile ? 18 : 20} />, 
      label: "Settings" 
    },
  ];

  // For mobile, we might want to show fewer items
  const displayItems = isMobile 
    ? navItems.slice(0, 4) // Show only first 4 items on mobile
    : navItems;

  return (
    <nav className="bg-white border-b">
      <div className="manmul-container">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none">
          {displayItems.map((item) => (
            <TopbarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.to)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
