
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Folders, PlusCircle, Brain, FileImage, FileVideo, FileText, Mic, Zap, Share2, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ContentAnalysisDialog from "@/components/ContentAnalysisDialog";
import MultimodalContent from "@/components/MultimodalContent";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  personaId: string;
  personaName: string;
  content: string;
  preview: string;
  createdAt: string;
}

const ContentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [savedContent, setSavedContent] = useState<ContentItem[]>([]);

  // Load saved content from localStorage
  useEffect(() => {
    try {
      const storedContent = localStorage.getItem("contentGallery");
      if (storedContent) {
        setSavedContent(JSON.parse(storedContent));
      }
    } catch (error) {
      console.error("Error loading content from localStorage:", error);
    }
  }, []);

  // Get icon based on content type
  const getContentIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-10 w-10 text-blue-500" />;
      case "image":
        return <FileImage className="h-10 w-10 text-green-500" />;
      case "video":
        return <FileVideo className="h-10 w-10 text-purple-500" />;
      case "audio":
        return <Mic className="h-10 w-10 text-orange-500" />;
      default:
        return <FileText className="h-10 w-10 text-blue-500" />;
    }
  };

  // Filter content based on search query and tab
  const filterContent = (type: string | null) => {
    return savedContent.filter(item => {
      const matchesSearch = searchQuery 
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;
      
      const matchesType = type && type !== "all" 
        ? item.type === type 
        : true;
      
      return matchesSearch && matchesType;
    });
  };

  // Open content analysis dialog
  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
    setIsAnalysisOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Content Library</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Content
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          {["all", "text", "image", "video", "audio"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              {filterContent(tab === "all" ? null : tab).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterContent(tab === "all" ? null : tab).map((content) => (
                    <Card 
                      key={content.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleContentClick(content)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium truncate">{content.title}</CardTitle>
                        {getContentIcon(content.type)}
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mt-1 mb-2 truncate">
                          For persona: {content.personaName}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Improve with AI">
                            <Zap className="h-4 w-4 text-amber-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Share">
                            <Share2 className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Collaborate">
                            <Users className="h-4 w-4 text-purple-500" />
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        Created {new Date(content.createdAt).toLocaleDateString()}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? "No content matches your search criteria." 
                      : `No ${tab === "all" ? "" : tab} content found. Create your first content.`}
                  </p>
                  <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Content
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {isAnalysisOpen && selectedContent && (
        <ContentAnalysisDialog
          isOpen={isAnalysisOpen}
          onClose={() => {
            setIsAnalysisOpen(false);
            setSelectedContent(null);
          }}
          content={selectedContent}
        />
      )}

      <MultimodalContent
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        personaId={localStorage.getItem("selectedPersona") ? JSON.parse(localStorage.getItem("selectedPersona")!).id : undefined}
        personaName={localStorage.getItem("selectedPersona") ? JSON.parse(localStorage.getItem("selectedPersona")!).name : undefined}
      />
    </div>
  );
};

export default ContentLibrary;
