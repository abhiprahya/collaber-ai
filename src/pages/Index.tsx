
import React, { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Users, Sparkles, PlaySquare } from "lucide-react";
import PersonaCard, { PersonaProps } from "@/components/PersonaCard";
import ContentInput from "@/components/ContentInput";
import ResponseSimulator from "@/components/ResponseSimulator";
import ABTestComparison from "@/components/ABTestComparison";

// Mock personas data
const MOCK_PERSONAS: PersonaProps[] = [
  {
    id: "1",
    name: "Tech-Savvy Millennial",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Early adopter, startup enthusiast, works in tech, values innovation and authenticity.",
    interests: ["Technology", "Startups", "Productivity", "Travel", "Finance"],
    tone: "Casual & Informative",
    engagement: 85,
    onSelect: () => {}
  },
  {
    id: "2",
    name: "Eco-Conscious Parent",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Suburban parent focused on sustainability, health-conscious, and concerned about the future.",
    interests: ["Sustainability", "Parenting", "Organic", "Education", "Health"],
    tone: "Caring & Educational",
    engagement: 72,
    onSelect: () => {}
  },
  {
    id: "3",
    name: "Creative Professional",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    description: "Freelance designer, values aesthetics and work-life balance, seeks inspiration.",
    interests: ["Design", "Art", "Freelancing", "Culture", "Photography"],
    tone: "Inspirational & Visual",
    engagement: 78,
    onSelect: () => {}
  },
  {
    id: "4",
    name: "Executive Decision Maker",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    description: "Corporate leader focused on ROI, efficiency, and strategic growth opportunities.",
    interests: ["Leadership", "Business Strategy", "Analytics", "Investment", "Innovation"],
    tone: "Professional & Direct",
    engagement: 65,
    onSelect: () => {}
  },
  {
    id: "5",
    name: "Gen Z Social Media Native",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    description: "Digital native who values authenticity, social causes, and entertaining content.",
    interests: ["Social Media", "Entertainment", "Social Justice", "Memes", "Fashion"],
    tone: "Informal & Bold",
    engagement: 90,
    onSelect: () => {}
  },
  {
    id: "6",
    name: "Retired Explorer",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    description: "Retired professional with time for hobbies, travel, and learning new skills.",
    interests: ["Travel", "History", "Gardening", "Reading", "Cooking"],
    tone: "Thoughtful & Detailed",
    engagement: 58,
    onSelect: () => {}
  }
];

const Index = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showABTest, setShowABTest] = useState(false);
  
  const handlePersonaSelect = (id: string) => {
    setSelectedPersonaId(id);
  };
  
  const handleAnalyze = (newContent: string, newPlatform: string, title?: string) => {
    setContent(newContent);
    setPlatform(newPlatform);
    setContentTitle(title || "");
    setIsAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Auto-show A/B test panel after analysis
      setShowABTest(true);
    }, 2000);
  };
  
  const selectedPersona = MOCK_PERSONAS.find(p => p.id === selectedPersonaId);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Persona Playback</span> Agent
          </h1>
          <p className="text-gray-600">
            Preview how your audience personas would respond to your content before publishing
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="h-5 w-5 text-suprbrain-primary" />
            <h2 className="text-xl font-semibold">Select Audience Persona</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_PERSONAS.map((persona) => (
              <PersonaCard
                key={persona.id}
                {...persona}
                selected={persona.id === selectedPersonaId}
                onSelect={handlePersonaSelect}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-suprbrain-secondary" />
              <h2 className="text-xl font-semibold">Create Content</h2>
            </div>
            
            <ContentInput onAnalyze={handleAnalyze} />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PlaySquare className="h-5 w-5 text-suprbrain-accent" />
              <h2 className="text-xl font-semibold">Persona Response</h2>
            </div>
            
            <ResponseSimulator 
              persona={selectedPersona} 
              content={content}
              platform={platform}
              title={contentTitle}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
        
        <div className="mt-6">
          {!showABTest && content && !isAnalyzing && (
            <div className="text-center">
              <Button 
                onClick={() => setShowABTest(true)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" /> Test Content Variations
              </Button>
            </div>
          )}
          
          {showABTest && (
            <ABTestComparison 
              originalContent={content} 
              persona={selectedPersona}
              isVisible={showABTest}
            />
          )}
        </div>
      </main>
      
      <footer className="border-t py-4 bg-background">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BrainCircuit className="h-5 w-5 text-suprbrain-primary mr-2" />
            <span className="text-sm font-medium">SuprBrain</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} SuprBrain • Conversational Content Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
