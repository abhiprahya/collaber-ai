
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Users, 
  BarChart3, 
  Settings,
  MessageSquareQuote
} from "lucide-react";

interface MainNavProps {
  mobile?: boolean;
}

const MainNav: React.FC<MainNavProps> = ({ mobile = false }) => {
  const navItems = [
    { name: "Persona Playback", href: "/", icon: <MessageSquareQuote className="mr-2 h-5 w-5" /> },
    { name: "Content Library", href: "/library", icon: <Brain className="mr-2 h-5 w-5" /> },
    { name: "Audience Personas", href: "/personas", icon: <Users className="mr-2 h-5 w-5" /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart3 className="mr-2 h-5 w-5" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="mr-2 h-5 w-5" /> },
  ];

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              window.location.pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            window.location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
