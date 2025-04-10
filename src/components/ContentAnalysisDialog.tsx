
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress"; 
import { Zap, Share2, Users, ThumbsUp, ThumbsDown, MessageSquare, BarChart4, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

const ContentAnalysisDialog: React.FC<ContentAnalysisDialogProps> = ({
  isOpen,
  onClose,
  content
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analysis");

  // Parse metrics from the preview response or generate placeholder metrics
  const getMetrics = () => {
    try {
      // In a real app, these would be parsed from AI analysis
      return {
        sentiment: Math.floor(Math.random() * 40) + 60, // 60-100
        engagement: Math.floor(Math.random() * 30) + 50, // 50-80
        sharing: Math.floor(Math.random() * 40) + 40,   // 40-80
        conversion: Math.floor(Math.random() * 30) + 30 // 30-60
      };
    } catch (error) {
      console.error("Error parsing metrics:", error);
      return {
        sentiment: 75,
        engagement: 65,
        sharing: 55,
        conversion: 45
      };
    }
  };

  const metrics = getMetrics();

  const handleImprove = () => {
    toast({
      title: "Improving Content",
      description: "AI is analyzing your content for improvements..."
    });
    // In a real app, this would make an API call to improve the content
  };

  const handleShare = () => {
    toast({
      title: "Share Content",
      description: "Sharing options dialog would open here"
    });
    // In a real app, this would open sharing options
  };

  const handleCollaborate = () => {
    toast({
      title: "Collaboration Started",
      description: "Invite sent to collaborators for this content"
    });
    // In a real app, this would open collaboration options
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{content?.title || "Content Analysis"}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center mb-5 p-3 border rounded-lg bg-suprbrain-light/30">
          <div className="flex-shrink-0 mr-3">
            {content?.personaName && (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">
                {content.personaName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{content?.personaName || "Persona"}</h3>
            <p className="text-sm text-gray-500">Content created on {new Date(content?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="analysis">Persona Analysis</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <div className="space-y-4 mt-4">
              <h3 className="font-medium text-sm mb-3 flex items-center">
                <BarChart4 className="h-4 w-4 text-indigo-500 mr-2" />
                <span>Response Metrics</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sentiment</span>
                    <span className="text-sm text-gray-500">{metrics.sentiment}%</span>
                  </div>
                  <Progress value={metrics.sentiment} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Engagement</span>
                    <span className="text-sm text-gray-500">{metrics.engagement}%</span>
                  </div>
                  <Progress value={metrics.engagement} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sharing</span>
                    <span className="text-sm text-gray-500">{metrics.sharing}%</span>
                  </div>
                  <Progress value={metrics.sharing} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Conversion</span>
                    <span className="text-sm text-gray-500">{metrics.conversion}%</span>
                  </div>
                  <Progress value={metrics.conversion} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="font-medium text-sm mb-3">Persona Feedback</h3>
              
              <Card className="p-4">
                <div className="whitespace-pre-wrap">{content?.preview || "No preview available"}</div>
              </Card>
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="font-medium text-sm mb-3">Key Takeaways</h3>
              
              <div className="space-y-2">
                <div className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="rounded-full p-1 mr-3 bg-green-100">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-700">
                      {metrics.sentiment >= 70 
                        ? "Content strongly resonates with this persona. High alignment with interests."
                        : "Content is moderately aligned with this persona's interests and preferences."}
                    </p>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="rounded-full p-1 mr-3 bg-blue-100">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-700">
                      {metrics.engagement >= 70
                        ? "Likely to generate high engagement and meaningful interactions."
                        : "May generate moderate engagement, some comments or reactions likely."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {content?.type || "text"}
                </Badge>
                <div className="text-sm text-gray-500">
                  {new Date(content?.createdAt).toLocaleDateString()} {new Date(content?.createdAt).toLocaleTimeString()}
                </div>
              </div>

              <Card className="p-4">
                <h3 className="font-medium mb-2">{content?.title}</h3>
                <div className="whitespace-pre-wrap">{content?.content || "No content available"}</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-3 mt-6">
          <Button variant="outline" className="gap-2" onClick={handleImprove}>
            <Zap className="h-4 w-4 text-amber-500" />
            Improve
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4 text-blue-500" />
            Share
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleCollaborate}>
            <Users className="h-4 w-4 text-purple-500" />
            Collaborate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentAnalysisDialog;
