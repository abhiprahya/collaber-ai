
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FileImage, FileVideo, Mic, FileText, Upload, X, Plus, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";
import { PersonaProps } from "./PersonaCard";

interface MultimodalContentProps {
  isOpen: boolean;
  onClose: () => void;
  personaId?: string;
  personaName?: string;
}

const MultimodalContent: React.FC<MultimodalContentProps> = ({
  isOpen,
  onClose,
  personaId,
  personaName = "Current Persona"
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewResponse, setPreviewResponse] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setVideoFiles(prev => [...prev, ...filesArray]);
    }
  };
  
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAudioFiles(prev => [...prev, ...filesArray]);
    }
  };
  
  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };
  
  const removeVideo = (index: number) => {
    setVideoFiles(videoFiles.filter((_, i) => i !== index));
  };
  
  const removeAudio = (index: number) => {
    setAudioFiles(audioFiles.filter((_, i) => i !== index));
  };

  const handlePreviewForPersona = async () => {
    if (!personaId) {
      toast({
        title: "No Persona Selected",
        description: "Please select a persona before generating a preview.",
        variant: "destructive",
      });
      return;
    }

    // Check for content based on active tab
    let hasContent = false;
    switch (activeTab) {
      case "text":
        hasContent = Boolean(textContent.trim());
        break;
      case "image":
        hasContent = imageFiles.length > 0;
        break;
      case "video":
        hasContent = videoFiles.length > 0;
        break;
      case "audio":
        hasContent = audioFiles.length > 0;
        break;
    }

    if (!hasContent) {
      toast({
        title: "Content Required",
        description: "Please add some content to preview.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call to generate preview
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fetch response from OpenAI-compatible API
      // This is a simulation - in a real implementation, you would call an actual API
      const responseContent = await generatePersonaResponse(personaName, activeTab, textContent || title);
      
      setPreviewResponse(responseContent);
      toast({
        title: "Preview Generated",
        description: `See how ${personaName} would respond to your content.`,
      });
    } catch (error) {
      console.error("Failed to generate preview:", error);
      toast({
        title: "Preview Generation Failed",
        description: "Unable to generate persona preview at this time.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Simulated API function - replace with actual API call in production
  const generatePersonaResponse = async (persona: string, contentType: string, content: string) => {
    // This simulates an API call - replace with actual API integration
    const contentTypesResponses: Record<string, string[]> = {
      text: [
        "I find this content very engaging and relevant to my interests. The writing style resonates with me, and I appreciate the clear explanations.",
        "This information is exactly what I've been looking for. The level of detail is perfect, and I'd definitely share this with my network.",
        "The narrative structure works well for me, though I'd be interested in seeing more examples or case studies to illustrate the main points."
      ],
      image: [
        "These visuals are compelling and align with my aesthetic preferences. The composition draws me in and communicates the message effectively.",
        "I appreciate the visual storytelling approach. The imagery speaks to me emotionally and reinforces the brand values I connect with.",
        "The visual elements are attention-grabbing, though I'd find it more engaging with a bit more context about what I'm seeing."
      ],
      video: [
        "The pacing and storytelling in this video content keeps me engaged throughout. The production quality matches what I expect from brands I follow.",
        "This video format works well for me - concise, informative, and visually stimulating. I'd likely watch it completely rather than scrolling past.",
        "The video content is compelling, though I'd prefer if the intro was slightly shorter to get to the main point more quickly."
      ],
      audio: [
        "The audio quality and tone of voice are excellent. The content is delivered at a pace that keeps me engaged and interested.",
        "This audio content feels personal and authentic. The conversational style makes complex information accessible and engaging.",
        "I appreciate the audio format for this content, though I might prefer some supporting visuals to enhance my understanding."
      ]
    };

    // Select random response based on content type and persona
    const responses = contentTypesResponses[contentType] || contentTypesResponses.text;
    const seed = persona.length + content.length; // Simple deterministic seed
    const selectedResponse = responses[seed % responses.length];
    
    // Add persona-specific sentiment
    return `As ${persona}, here's how I'd respond to your content:\n\n"${selectedResponse}"\n\nKey Takeaway: This content ${seed % 2 === 0 ? "strongly resonates" : "generally aligns"} with my interests and communication preferences.`;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Multimodal Content</DialogTitle>
          <DialogDescription>
            {personaId 
              ? `Creating content for ${personaName} to preview`
              : "Select a persona first to enable content preview"}
          </DialogDescription>
        </DialogHeader>
        
        {!personaId && (
          <Alert className="mb-4 border-amber-200 bg-amber-50 text-amber-900">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Persona Selection Required</AlertTitle>
            <AlertDescription>
              Please select a persona from the home page before creating content for preview.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="text" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <FileImage className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center">
              <FileVideo className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              Audio
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter content title" 
                  className="mt-1" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="text-content">Content</Label>
                <Textarea 
                  id="text-content"
                  placeholder="Write your content here..." 
                  className="min-h-[200px] mt-1"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
              
              {previewResponse && (
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="font-semibold text-sm text-gray-500 mb-2">Persona Response Preview:</div>
                  <div className="whitespace-pre-wrap">{previewResponse}</div>
                </Card>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {textContent.length} characters
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button 
                    onClick={handlePreviewForPersona} 
                    disabled={isGenerating || !personaId}
                  >
                    {isGenerating ? "Generating..." : "Preview for Persona"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="image">
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square border rounded-md overflow-hidden bg-muted">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Uploaded ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center bg-muted/50 cursor-pointer">
                  <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Images</span>
                  </Label>
                  <Input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              
              {previewResponse && (
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="font-semibold text-sm text-gray-500 mb-2">Persona Response Preview:</div>
                  <div className="whitespace-pre-wrap">{previewResponse}</div>
                </Card>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handlePreviewForPersona} 
                  disabled={isGenerating || !personaId || imageFiles.length === 0}
                >
                  {isGenerating ? "Generating..." : "Preview for Persona"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video border rounded-md overflow-hidden bg-muted">
                      <video 
                        src={URL.createObjectURL(file)} 
                        controls 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="aspect-video border border-dashed rounded-md flex flex-col items-center justify-center bg-muted/50 cursor-pointer">
                  <Label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Video</span>
                  </Label>
                  <Input 
                    id="video-upload" 
                    type="file" 
                    accept="video/*" 
                    multiple 
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </div>
              </div>
              
              {previewResponse && (
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="font-semibold text-sm text-gray-500 mb-2">Persona Response Preview:</div>
                  <div className="whitespace-pre-wrap">{previewResponse}</div>
                </Card>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handlePreviewForPersona} 
                  disabled={isGenerating || !personaId || videoFiles.length === 0}
                >
                  {isGenerating ? "Generating..." : "Preview for Persona"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audio">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {audioFiles.map((file, index) => (
                  <Card key={index} className="p-4 relative group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <audio controls className="max-w-md">
                        <source src={URL.createObjectURL(file)} type={file.type} />
                      </audio>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => removeAudio(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Card>
                ))}
                
                <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center bg-muted/50 cursor-pointer">
                  <Label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Audio Files</span>
                  </Label>
                  <Input 
                    id="audio-upload" 
                    type="file" 
                    accept="audio/*" 
                    multiple 
                    className="hidden"
                    onChange={handleAudioUpload}
                  />
                </div>
              </div>
              
              {previewResponse && (
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="font-semibold text-sm text-gray-500 mb-2">Persona Response Preview:</div>
                  <div className="whitespace-pre-wrap">{previewResponse}</div>
                </Card>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handlePreviewForPersona} 
                  disabled={isGenerating || !personaId || audioFiles.length === 0}
                >
                  {isGenerating ? "Generating..." : "Preview for Persona"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MultimodalContent;
