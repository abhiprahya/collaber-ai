import React, { useState } from "react";
import Header from "@/components/Header";
import PersonaCard from "@/components/PersonaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, UserPlus, Brain, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Personas = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const personas = [
    {
      id: "p1",
      name: "Tech Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=1",
      description: "Loves new technology and innovation, early adopter of digital products.",
      interests: ["Technology", "Gadgets", "AI", "Startups", "Innovation"],
      tone: "Excited",
      engagement: 85,
    },
    {
      id: "p2",
      name: "Business Professional",
      avatar: "https://i.pravatar.cc/150?img=2",
      description: "Career-focused individual looking to optimize productivity and business outcomes.",
      interests: ["Business", "Productivity", "Leadership", "Finance"],
      tone: "Professional",
      engagement: 72,
    },
    {
      id: "p3",
      name: "Creative Designer",
      avatar: "https://i.pravatar.cc/150?img=3",
      description: "Visually-oriented creative always seeking inspiration for projects.",
      interests: ["Design", "Art", "Photography", "UX/UI", "Creativity"],
      tone: "Expressive",
      engagement: 78,
    },
    {
      id: "p4",
      name: "Health & Wellness",
      avatar: "https://i.pravatar.cc/150?img=4",
      description: "Focused on sustainable wellness practices and holistic health solutions.",
      interests: ["Wellness", "Fitness", "Nutrition", "Mindfulness", "Yoga"],
      tone: "Encouraging",
      engagement: 65,
    },
    {
      id: "p5",
      name: "Student Learner",
      avatar: "https://i.pravatar.cc/150?img=5",
      description: "Always seeking to expand knowledge and grow intellectually.",
      interests: ["Education", "Books", "Learning", "Self-improvement"],
      tone: "Curious",
      engagement: 70,
    },
    {
      id: "p6",
      name: "Social Media Influencer",
      avatar: "https://i.pravatar.cc/150?img=6",
      description: "Highly engaged with social platforms and online communities.",
      interests: ["Social Media", "Trends", "Marketing", "Content Creation"],
      tone: "Trendy",
      engagement: 90,
    },
  ];

  const handleSelectPersona = (id: string) => {
    if (selectedPersona === id) {
      setSelectedPersona(null);
    } else {
      setSelectedPersona(id);
    }
  };

  const personaBrainMetrics = [
    { name: "Creativity", value: 85 },
    { name: "Analytical Thinking", value: 65 },
    { name: "Emotional Intelligence", value: 78 },
    { name: "Technical Knowledge", value: 90 },
    { name: "Communication", value: 75 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Audience Personas</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search personas..."
                className="w-[250px] pl-8"
              />
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Persona
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Personas</TabsTrigger>
            <TabsTrigger value="favorite">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Used</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <PersonaCard 
                  key={persona.id}
                  id={persona.id}
                  name={persona.name}
                  avatar={persona.avatar}
                  description={persona.description}
                  interests={persona.interests}
                  tone={persona.tone}
                  engagement={persona.engagement}
                  selected={selectedPersona === persona.id}
                  onSelect={handleSelectPersona}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Other tabs content */}
          <TabsContent value="favorite" className="mt-6">
            <div className="flex flex-col items-center justify-center h-64">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No favorite personas yet. Mark personas as favorite to see them here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.slice(0, 2).map((persona) => (
                <PersonaCard 
                  key={persona.id}
                  id={persona.id}
                  name={persona.name}
                  avatar={persona.avatar}
                  description={persona.description}
                  interests={persona.interests}
                  tone={persona.tone}
                  engagement={persona.engagement}
                  selected={selectedPersona === persona.id}
                  onSelect={handleSelectPersona}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-6">
            <div className="flex flex-col items-center justify-center h-64">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No persona groups created yet. Create a group to organize your personas.</p>
              <Button className="mt-4">
                <Users className="mr-2 h-4 w-4" />
                Create Persona Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedPersona && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Persona Brain Metrics</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Cognitive Profile</h3>
                    {personaBrainMetrics.map((metric, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className="text-sm text-muted-foreground">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" 
                          indicatorClassName={
                            metric.value > 80 ? "bg-green-500" : 
                            metric.value > 60 ? "bg-blue-500" : 
                            metric.value > 40 ? "bg-yellow-500" : 
                            "bg-red-500"
                          }
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Compatibility Analysis</h3>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Brain className="h-12 w-12 text-suprbrain-primary" />
                      <div>
                        <div className="text-sm font-medium mb-1">Match Score</div>
                        <div className="text-3xl font-bold">87%</div>
                        <div className="text-sm text-muted-foreground mt-1">Excellent compatibility for your content</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="bg-green-500 rounded-full h-2 w-2 mt-2"></span>
                          <span>Focus on technical details and innovative aspects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-500 rounded-full h-2 w-2 mt-2"></span>
                          <span>Use data-driven insights and visuals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-yellow-500 rounded-full h-2 w-2 mt-2"></span>
                          <span>Consider adding more emotional appeal</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Personas;
