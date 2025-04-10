
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { 
  BookText, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  Globe, 
  MessageSquare,
  Wand2 
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

interface ContentInputProps {
  onAnalyze: (content: string, platform: string, title?: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ onAnalyze }) => {
  const { toast } = useToast();
  const [platform, setPlatform] = useState("blog");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAnalyze = () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onAnalyze(content, platform, title);
      setIsLoading(false);
    }, 1500);
  };
  
  const generateRandomContent = () => {
    const blogSamples = [
      "Discover how AI is revolutionizing content creation for digital marketers. Our latest research shows a 45% increase in engagement when using AI-assisted tools.",
      "5 ways to improve your social media strategy in 2025. Number 3 will surprise even seasoned marketers!",
      "The future of remote work is hybrid: How companies are balancing in-office collaboration with work-from-home flexibility."
    ];
    
    const socialSamples = [
      "Just launched our new AI tool! 🚀 Who's ready to transform their content strategy? #AImarketing #ContentCreation",
      "Monday motivation: The best time to start was yesterday. The second best time is now. What are you starting today? ✨",
      "Hot take: Quality engagement is more important than follower count. Agree or disagree? 👇"
    ];
    
    const emailSamples = [
      "Subject: Don't Miss Our Exclusive Webinar\n\nDear [Name],\n\nWe're excited to invite you to our upcoming webinar on 'Future-Proofing Your Digital Marketing Strategy' happening this Thursday.",
      "Subject: Your May Newsletter Is Here\n\nHello from the team!\n\nSpring is here and so are new opportunities to grow your business. Check out this month's tips and tricks...",
      "Subject: Special Offer Just For You\n\nHi there,\n\nAs a valued customer, we're giving you early access to our new premium features at a special 30% discount."
    ];
    
    let samples;
    switch (platform) {
      case "blog":
        samples = blogSamples;
        setTitle("The Ultimate Guide to AI-Powered Marketing");
        break;
      case "social":
        samples = socialSamples;
        setTitle("");
        break;
      case "email":
        samples = emailSamples;
        setTitle("Your Exclusive Invitation Inside");
        break;
      default:
        samples = blogSamples;
    }
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setContent(randomSample);
    
    toast({
      title: "Sample Content Generated",
      description: "Feel free to edit this sample or write your own content.",
    });
  };

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Content Input</h2>
        <p className="text-sm text-gray-500">
          Enter your content to analyze how your selected personas would respond to it.
        </p>
      </div>
      
      <Tabs defaultValue="blog" value={platform} onValueChange={setPlatform}>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Select Platform</p>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookText className="h-4 w-4" /> Blog
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Social
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="blog" className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Blog Title</label>
            <Input 
              id="title" 
              placeholder="Enter your blog title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="blog-content" className="text-sm font-medium">Blog Content</label>
            <Textarea 
              id="blog-content" 
              placeholder="Write or paste your blog content here..." 
              className="min-h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button size="sm" variant="outline" className="h-8">
              <Instagram className="h-4 w-4 mr-1" /> Instagram
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Twitter className="h-4 w-4 mr-1" /> Twitter
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Facebook className="h-4 w-4 mr-1" /> Facebook
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
            </Button>
          </div>
          <div>
            <label htmlFor="social-content" className="text-sm font-medium">Post Content</label>
            <Textarea 
              id="social-content" 
              placeholder="Write or paste your social media post here..." 
              className="min-h-[150px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <div>
            <label htmlFor="email-subject" className="text-sm font-medium">Email Subject</label>
            <Input 
              id="email-subject" 
              placeholder="Enter your email subject line..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-content" className="text-sm font-medium">Email Body</label>
            <Textarea 
              id="email-content" 
              placeholder="Write or paste your email content here..." 
              className="min-h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-5">
        <Button 
          variant="outline" 
          onClick={generateRandomContent}
          type="button"
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" /> Generate Sample
        </Button>
        
        <Button 
          onClick={handleAnalyze}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? "Analyzing..." : "Analyze Response"}
        </Button>
      </div>
    </Card>
  );
};

export default ContentInput;
