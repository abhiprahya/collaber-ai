
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FileImage, FileVideo, Mic, FileText, Upload, X, Plus } from "lucide-react";
import { Card } from "./ui/card";

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
  const [activeTab, setActiveTab] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Multimodal Content</DialogTitle>
          <p className="text-muted-foreground">
            Add content in different formats for {personaName} to preview
          </p>
        </DialogHeader>
        
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
                <Input id="title" placeholder="Enter content title" className="mt-1" />
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
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {textContent.length} characters
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Preview for Persona</Button>
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
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Preview for Persona</Button>
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
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Preview for Persona</Button>
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
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Preview for Persona</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MultimodalContent;
