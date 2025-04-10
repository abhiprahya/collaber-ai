
import React, { useState } from "react";
import { BrainCircuit, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import MainNav from "./MainNav";
import PersonaDiscovery from "./PersonaDiscovery";
import CollaborationInvite from "./CollaborationInvite";
import MultimodalContent from "./MultimodalContent";

const Header = () => {
  const isMobile = useIsMobile();
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isMultimodalOpen, setIsMultimodalOpen] = useState(false);
  
  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-suprbrain-primary" />
            <span className="text-xl font-bold">
              <span className="gradient-text">SuprBrain</span>
            </span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button variant="outline" onClick={() => setIsMultimodalOpen(true)}>
              Add Content
            </Button>
            
            {!isMobile ? (
              <MainNav 
                onDiscoveryClick={() => setIsDiscoveryOpen(true)}
                onInviteClick={() => setIsInviteOpen(true)}
              />
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 py-4">
                    <MainNav 
                      mobile 
                      onDiscoveryClick={() => {
                        setIsDiscoveryOpen(true);
                      }}
                      onInviteClick={() => {
                        setIsInviteOpen(true);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>
      
      <PersonaDiscovery 
        isOpen={isDiscoveryOpen} 
        onClose={() => setIsDiscoveryOpen(false)} 
      />
      
      <CollaborationInvite 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
      />
      
      <MultimodalContent 
        isOpen={isMultimodalOpen} 
        onClose={() => setIsMultimodalOpen(false)} 
      />
    </>
  );
};

export default Header;
