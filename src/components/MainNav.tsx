
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Users, 
  BarChart3, 
  Settings,
  MessageSquareQuote,
  Search,
  UserPlus
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface MainNavProps {
  mobile?: boolean;
  onDiscoveryClick?: () => void;
  onInviteClick?: () => void;
}

const MainNav: React.FC<MainNavProps> = ({ 
  mobile = false, 
  onDiscoveryClick,
  onInviteClick
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
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
              currentPath === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        
        <div className="pt-2 border-t border-border/60">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onDiscoveryClick}
          >
            <Search className="mr-2 h-5 w-5" />
            Discover Personas
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onInviteClick}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Invite Collaborator
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              currentPath === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="ml-4 border-l border-border/60 pl-4 flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={onDiscoveryClick}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Discover Personas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Discover Personas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={onInviteClick}
              >
                <UserPlus className="h-5 w-5" />
                <span className="sr-only">Invite Collaborator</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Invite Collaborator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MainNav;
