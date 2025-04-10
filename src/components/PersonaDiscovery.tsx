
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Search, Tag, Users, Globe, Brain } from "lucide-react";
import PersonaCard from "./PersonaCard";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface PersonaDiscoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonaDiscovery: React.FC<PersonaDiscoveryProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const popularTags = [
    "Technology", "Marketing", "Design", "Business", 
    "Health", "Education", "Finance", "Social Media"
  ];
  
  const personas = [
    {
      id: "pd1",
      name: "Tech Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=1",
      description: "Loves new technology and innovation, early adopter of digital products.",
      interests: ["Technology", "Gadgets", "AI", "Startups", "Innovation"],
      tone: "Excited",
      engagement: 85,
    },
    {
      id: "pd2",
      name: "Business Professional",
      avatar: "https://i.pravatar.cc/150?img=2",
      description: "Career-focused individual looking to optimize productivity and business outcomes.",
      interests: ["Business", "Productivity", "Leadership", "Finance"],
      tone: "Professional",
      engagement: 72,
    },
    {
      id: "pd3",
      name: "Creative Designer",
      avatar: "https://i.pravatar.cc/150?img=3",
      description: "Visually-oriented creative always seeking inspiration for projects.",
      interests: ["Design", "Art", "Photography", "UX/UI", "Creativity"],
      tone: "Expressive",
      engagement: 78,
    },
    {
      id: "pd4",
      name: "Health & Wellness",
      avatar: "https://i.pravatar.cc/150?img=4",
      description: "Focused on sustainable wellness practices and holistic health solutions.",
      interests: ["Wellness", "Fitness", "Nutrition", "Mindfulness", "Yoga"],
      tone: "Encouraging",
      engagement: 65,
    },
    {
      id: "pd5",
      name: "Student Learner",
      avatar: "https://i.pravatar.cc/150?img=5",
      description: "Always seeking to expand knowledge and grow intellectually.",
      interests: ["Education", "Books", "Learning", "Self-improvement"],
      tone: "Curious",
      engagement: 70,
    },
    {
      id: "pd6",
      name: "Social Media Influencer",
      avatar: "https://i.pravatar.cc/150?img=6",
      description: "Highly engaged with social platforms and online communities.",
      interests: ["Social Media", "Trends", "Marketing", "Content Creation"],
      tone: "Trendy",
      engagement: 90,
    },
    {
      id: "pd7",
      name: "Financial Advisor",
      avatar: "https://i.pravatar.cc/150?img=7",
      description: "Focuses on financial planning, investment strategies, and economic trends.",
      interests: ["Finance", "Investment", "Economics", "Wealth Management"],
      tone: "Authoritative",
      engagement: 75,
    },
    {
      id: "pd8",
      name: "Healthcare Professional",
      avatar: "https://i.pravatar.cc/150?img=8",
      description: "Dedicated to health education and medical advances.",
      interests: ["Healthcare", "Medicine", "Research", "Patient Care"],
      tone: "Informative",
      engagement: 82,
    },
  ];

  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  
  const handleSelectPersona = (id: string) => {
    setSelectedPersona(id === selectedPersona ? null : id);
  };
  
  const communities = [
    { name: "Tech Innovators", members: 5823, topics: ["AI", "Blockchain", "Startups"] },
    { name: "Digital Marketers", members: 4271, topics: ["SEO", "Content", "Social Media"] },
    { name: "Creative Professionals", members: 3950, topics: ["Design", "UX/UI", "Branding"] },
    { name: "Business Leaders", members: 2867, topics: ["Strategy", "Leadership", "Growth"] },
  ];

  const filteredPersonas = personas.filter(persona => 
    persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    persona.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())) ||
    persona.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Discover Personas</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by keywords, interests, or audience traits..."
              className="pl-9 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-1" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  variant="outline"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
                All Personas
              </TabsTrigger>
              <TabsTrigger value="communities" onClick={() => setSelectedCategory("communities")}>
                <Users className="h-4 w-4 mr-2" />
                Communities
              </TabsTrigger>
              <TabsTrigger value="trending" onClick={() => setSelectedCategory("trending")}>
                <Globe className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="compatible" onClick={() => setSelectedCategory("compatible")}>
                <Brain className="h-4 w-4 mr-2" />
                Brain Compatible
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredPersonas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPersonas.map((persona) => (
                    <PersonaCard
                      key={persona.id}
                      id={persona.id}
                      name={persona.name}
                      avatar={persona.avatar}
                      description={persona.description}
                      interests={persona.interests}
                      tone={persona.tone}
                      engagement={persona.engagement}
                      selected={persona.id === selectedPersona}
                      onSelect={handleSelectPersona}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">No personas found</h3>
                  <p className="text-muted-foreground">Try a different search term or browse by category</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="communities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communities.map((community, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{community.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{community.members.toLocaleString()} members</p>
                          <div className="flex flex-wrap gap-2">
                            {community.topics.map((topic, i) => (
                              <Badge key={i} variant="secondary">{topic}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Join Community</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personas.slice(5, 8).map((persona) => (
                  <PersonaCard
                    key={persona.id}
                    id={persona.id}
                    name={persona.name}
                    avatar={persona.avatar}
                    description={persona.description}
                    interests={persona.interests}
                    tone={persona.tone}
                    engagement={persona.engagement}
                    selected={persona.id === selectedPersona}
                    onSelect={handleSelectPersona}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="compatible">
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Brain Compatibility Analysis</h3>
                    <p className="text-sm text-muted-foreground">Showing personas most compatible with your content style and preferences</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personas.slice(0, 3).map((persona) => (
                  <PersonaCard
                    key={persona.id}
                    id={persona.id}
                    name={persona.name}
                    avatar={persona.avatar}
                    description={persona.description}
                    interests={persona.interests}
                    tone={persona.tone}
                    engagement={persona.engagement}
                    selected={persona.id === selectedPersona}
                    onSelect={handleSelectPersona}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            disabled={!selectedPersona} 
            onClick={() => {
              // Handle persona selection
              onClose();
            }}
          >
            Add Selected Persona
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonaDiscovery;
