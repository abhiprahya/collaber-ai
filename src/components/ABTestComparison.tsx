
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Copy, Check, Sparkles, BarChart3, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "./ui/progress";

interface ABTestComparisonProps {
  originalContent: string;
  persona: any;
  isVisible: boolean;
}

const ABTestComparison: React.FC<ABTestComparisonProps> = ({ 
  originalContent, 
  persona, 
  isVisible 
}) => {
  const { toast } = useToast();
  const [variations, setVariations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("tone");
  const [copied, setCopied] = useState<string | null>(null);
  
  useEffect(() => {
    if (isVisible && originalContent && persona) {
      // Reset
      setVariations([]);
    }
  }, [originalContent, persona, isVisible]);
  
  const generateVariations = () => {
    if (!originalContent || !persona) {
      toast({
        title: "Missing Content",
        description: "Please ensure you have content and a selected persona.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to generate variations
    setTimeout(() => {
      const newVariations: any = [];
      
      if (activeTab === "tone") {
        newVariations.push(
          {
            id: "professional",
            title: "Professional",
            content: transformContent(originalContent, "professional"),
            metrics: generateMetrics(80)
          },
          {
            id: "casual",
            title: "Casual & Friendly",
            content: transformContent(originalContent, "casual"),
            metrics: generateMetrics(70)
          },
          {
            id: "enthusiastic",
            title: "Enthusiastic",
            content: transformContent(originalContent, "enthusiastic"),
            metrics: generateMetrics(75)
          }
        );
      } else if (activeTab === "format") {
        newVariations.push(
          {
            id: "listicle",
            title: "Listicle Format",
            content: transformContent(originalContent, "listicle"),
            metrics: generateMetrics(65)
          },
          {
            id: "story",
            title: "Narrative Story",
            content: transformContent(originalContent, "story"),
            metrics: generateMetrics(85)
          },
          {
            id: "q-and-a",
            title: "Q&A Format",
            content: transformContent(originalContent, "qa"),
            metrics: generateMetrics(60)
          }
        );
      } else if (activeTab === "cta") {
        newVariations.push(
          {
            id: "urgent",
            title: "Urgency-Based CTA",
            content: originalContent + "\n\nLimited time offer! Act now before this opportunity disappears forever.",
            metrics: generateMetrics(65)
          },
          {
            id: "benefit",
            title: "Benefit-Focused CTA",
            content: originalContent + "\n\nDiscover how this can transform your approach today. Click to learn more.",
            metrics: generateMetrics(80)
          },
          {
            id: "fomo",
            title: "FOMO-Inducing CTA",
            content: originalContent + "\n\nJoin thousands of others who have already taken advantage of this insight.",
            metrics: generateMetrics(75)
          }
        );
      } else if (activeTab === "emotion") {
        newVariations.push(
          {
            id: "excitement",
            title: "Excitement & Enthusiasm",
            content: transformContent(originalContent, "excitement"),
            metrics: generateMetrics(85)
          },
          {
            id: "curiosity",
            title: "Curiosity & Wonder",
            content: transformContent(originalContent, "curiosity"),
            metrics: generateMetrics(70)
          },
          {
            id: "trust",
            title: "Trust & Authority",
            content: transformContent(originalContent, "trust"),
            metrics: generateMetrics(75)
          }
        );
      }
      
      setVariations(newVariations);
      setIsGenerating(false);
      
      toast({
        title: "Variations Generated",
        description: `${newVariations.length} content variations created based on your original content.`,
      });
    }, 2000);
  };
  
  const transformContent = (content: string, type: string) => {
    // In a real app, this would use an AI model to transform the content
    // This is just a simplified simulation
    const contentWords = content.split(' ');
    let result = '';
    
    switch (type) {
      case "professional":
        result = `I'd like to present our findings on ${contentWords.slice(1, 5).join(' ')}. Our analysis indicates that ${contentWords.slice(5, 15).join(' ')}. Furthermore, ${contentWords.slice(-15).join(' ')}.`;
        break;
      case "casual":
        result = `Hey there! Check this out - ${contentWords.slice(0, 10).join(' ')}. Isn't that cool? And guess what: ${contentWords.slice(10, 20).join(' ')}! Let's dive deeper into this...`;
        break;
      case "enthusiastic":
        result = `WOW! This is AMAZING! ${contentWords.slice(0, 10).join(' ')}! I'm so excited to share that ${contentWords.slice(10, 20).join(' ')}! You're going to LOVE this!`;
        break;
      case "listicle":
        result = `Top 3 Things You Need to Know:\n\n1. ${contentWords.slice(0, 7).join(' ')}\n2. ${contentWords.slice(7, 14).join(' ')}\n3. ${contentWords.slice(14, 21).join(' ')}`;
        break;
      case "story":
        result = `I remember when I first discovered ${contentWords.slice(0, 5).join(' ')}. It was a game-changer. Before that, ${contentWords.slice(5, 15).join(' ')}. But now, everything is different because ${contentWords.slice(15, 25).join(' ')}.`;
        break;
      case "qa":
        result = `Q: What's the deal with ${contentWords.slice(0, 5).join(' ')}?\nA: It's fascinating because ${contentWords.slice(5, 15).join(' ')}.\n\nQ: Why should I care?\nA: Because ${contentWords.slice(15, 25).join(' ')}.`;
        break;
      case "excitement":
        result = `I'm thrilled to share this incredible insight about ${contentWords.slice(0, 7).join(' ')}! This is a game-changing approach that will transform how you think about ${contentWords.slice(7, 14).join(' ')}!`;
        break;
      case "curiosity":
        result = `Have you ever wondered what would happen if ${contentWords.slice(0, 7).join(' ')}? The answer might surprise you. Consider this: ${contentWords.slice(7, 20).join(' ')}...`;
        break;
      case "trust":
        result = `Based on our decade of research and thousands of case studies, we can confidently state that ${contentWords.slice(0, 15).join(' ')}. Experts agree that ${contentWords.slice(15, 30).join(' ')}.`;
        break;
      default:
        result = content;
    }
    
    return result;
  };
  
  const generateMetrics = (baseScore: number) => {
    const randomVariance = () => Math.floor(Math.random() * 20) - 10; // -10 to +10
    
    return {
      engagement: Math.min(100, Math.max(10, baseScore + randomVariance())),
      conversion: Math.min(100, Math.max(5, baseScore - 20 + randomVariance())),
      shareability: Math.min(100, Math.max(5, baseScore - 10 + randomVariance())),
    };
  };
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
        
        toast({
          title: "Content Copied",
          description: "The content variation has been copied to your clipboard.",
        });
      },
      () => {
        toast({
          title: "Copy Failed",
          description: "Failed to copy content to clipboard.",
          variant: "destructive"
        });
      }
    );
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">A/B Test Variations</h2>
          <p className="text-sm text-gray-500">
            Generate alternative versions to test with your audience
          </p>
        </div>
        
        <Button 
          onClick={generateVariations}
          disabled={isGenerating || !originalContent || !persona}
          size="sm"
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> 
              {variations.length > 0 ? "Regenerate" : "Generate Options"}
            </>
          )}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="tone">Tone</TabsTrigger>
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="emotion">Emotion</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {variations.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg border-gray-200">
          <ArrowRightLeft className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-2">No variations generated yet</p>
          <p className="text-sm text-gray-400">
            Click "Generate Options" to create different versions based on {activeTab}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {variations.map((variant) => (
            <div 
              key={variant.id}
              className="border rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{variant.title}</h3>
                <Button 
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(variant.content, variant.id)}
                  className="h-8 px-2"
                >
                  {copied === variant.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-xs">
                    {copied === variant.id ? "Copied" : "Copy"}
                  </span>
                </Button>
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-sm mb-3 whitespace-pre-wrap">
                {variant.content}
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                <span>Predicted metrics for {persona?.name}:</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Engagement</span>
                    <span>{variant.metrics.engagement}%</span>
                  </div>
                  <Progress value={variant.metrics.engagement} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Conversion</span>
                    <span>{variant.metrics.conversion}%</span>
                  </div>
                  <Progress value={variant.metrics.conversion} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Shareability</span>
                    <span>{variant.metrics.shareability}%</span>
                  </div>
                  <Progress value={variant.metrics.shareability} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ABTestComparison;
