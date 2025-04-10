
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Folders, FolderOpen, FileImage, FileVideo, FileText, PlusCircle, Brain } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ContentLibrary = () => {
  const contentTypes = [
    {
      id: 1,
      title: "Marketing Blog Post Template",
      type: "text",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      tags: ["marketing", "blog", "template"],
      lastEdited: "2 days ago",
    },
    {
      id: 2,
      title: "Product Launch Video Script",
      type: "video",
      icon: <FileVideo className="h-10 w-10 text-purple-500" />,
      tags: ["product", "launch", "script"],
      lastEdited: "1 week ago",
    },
    {
      id: 3,
      title: "Social Media Graphics Pack",
      type: "image",
      icon: <FileImage className="h-10 w-10 text-green-500" />,
      tags: ["social media", "graphics", "visual"],
      lastEdited: "3 days ago",
    },
    {
      id: 4,
      title: "Email Newsletter Template",
      type: "text",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      tags: ["email", "newsletter", "template"],
      lastEdited: "5 days ago",
    },
    {
      id: 5,
      title: "Customer Testimonial Video",
      type: "video",
      icon: <FileVideo className="h-10 w-10 text-purple-500" />,
      tags: ["testimonial", "customer", "video"],
      lastEdited: "2 weeks ago",
    },
    {
      id: 6,
      title: "Brand Style Guide",
      type: "image",
      icon: <FileImage className="h-10 w-10 text-green-500" />,
      tags: ["brand", "style guide", "visual"],
      lastEdited: "1 month ago",
    },
  ];

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
              />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Content
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes.map((content) => (
                <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{content.title}</CardTitle>
                    {content.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {content.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    Last edited {content.lastEdited}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes
                .filter((content) => content.type === "text")
                .map((content) => (
                  <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{content.title}</CardTitle>
                      {content.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {content.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Last edited {content.lastEdited}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          {/* Similar TabsContent blocks for images, videos, and audio */}
          <TabsContent value="images" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes
                .filter((content) => content.type === "image")
                .map((content) => (
                  <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{content.title}</CardTitle>
                      {content.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {content.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Last edited {content.lastEdited}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes
                .filter((content) => content.type === "video")
                .map((content) => (
                  <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{content.title}</CardTitle>
                      {content.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {content.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Last edited {content.lastEdited}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-6">
            <div className="flex flex-col items-center justify-center h-64">
              <Brain className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No audio content found. Create your first audio content.</p>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Audio Content
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContentLibrary;
