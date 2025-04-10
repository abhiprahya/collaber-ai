
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  BarChart4,
  Heart,
  Smile,
  Frown,
  Meh,
  AlertCircle
} from "lucide-react";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ResponseSimulatorProps {
  persona: any;
  content: string;
  platform: string;
  title?: string;
  isAnalyzing: boolean;
}

const ResponseSimulator: React.FC<ResponseSimulatorProps> = ({
  persona,
  content,
  platform,
  title,
  isAnalyzing
}) => {
  const [feedbackLoaded, setFeedbackLoaded] = useState(false);
  const [insightsLoaded, setInsightsLoaded] = useState(false);
  const [reactionDelay, setReactionDelay] = useState(1500);
  
  // Simulated persona reaction and feedback data
  const [reaction, setReaction] = useState<Record<string, any>>({
    sentiment: 0,
    engagement: 0,
    sharing: 0,
    conversion: 0,
    feedback: '',
    suggestion: '',
    emotionalResponse: '',
  });
  
  useEffect(() => {
    if (!persona || !content || isAnalyzing) {
      setFeedbackLoaded(false);
      setInsightsLoaded(false);
      return;
    }
    
    // Reset states
    setFeedbackLoaded(false);
    setInsightsLoaded(false);
    
    // Simulate loading data based on persona and content
    setTimeout(() => {
      simulatePersonaReaction();
      setFeedbackLoaded(true);
      
      setTimeout(() => {
        setInsightsLoaded(true);
      }, 800);
    }, reactionDelay);
  }, [persona, content, isAnalyzing]);
  
  const simulatePersonaReaction = () => {
    if (!persona) return;
    
    // Simulated metrics generation based on persona characteristics
    // In a real app, this would come from an AI analysis
    const baseSentiment = Math.min(80, persona.engagement);
    const randomVariance = Math.floor(Math.random() * 30) - 15; // -15 to +15
    
    const sentimentScore = Math.max(5, Math.min(100, baseSentiment + randomVariance));
    const engagementScore = Math.max(10, Math.min(95, sentimentScore - Math.floor(Math.random() * 20)));
    const sharingScore = Math.max(0, Math.min(100, sentimentScore - 20 - Math.floor(Math.random() * 30)));
    const conversionScore = Math.max(0, Math.min(90, sentimentScore - 30 - Math.floor(Math.random() * 25)));
    
    // Generate feedback based on sentiment score
    let feedback = '';
    let suggestion = '';
    let emotionalResponse = '';
    
    if (sentimentScore >= 75) {
      feedback = "This content resonates strongly with me. The points made align with my interests and values.";
      suggestion = "Consider adding a clear call to action to capitalize on the positive reception.";
      emotionalResponse = "I feel excited and engaged by this content. It speaks directly to my needs.";
    } else if (sentimentScore >= 50) {
      feedback = "This content is interesting, but I'm not fully convinced by some of the arguments.";
      suggestion = "Try adding more specific examples that would appeal to my demographic.";
      emotionalResponse = "I'm somewhat intrigued but not fully emotionally invested.";
    } else if (sentimentScore >= 25) {
      feedback = "This content doesn't really speak to me. The tone seems off and the value proposition isn't clear.";
      suggestion = "Reconsider the framing and focus more on the benefits that would appeal to me.";
      emotionalResponse = "I feel somewhat disconnected from this message. It doesn't address my concerns.";
    } else {
      feedback = "This content doesn't resonate with me at all. The tone, style and content seem completely misaligned with my interests.";
      suggestion = "This needs a complete rethink to appeal to someone with my profile.";
      emotionalResponse = "I feel this content wasn't created with someone like me in mind.";
    }
    
    // Set the reaction data
    setReaction({
      sentiment: sentimentScore,
      engagement: engagementScore,
      sharing: sharingScore,
      conversion: conversionScore,
      feedback,
      suggestion,
      emotionalResponse
    });
  };
  
  const getSentimentIcon = (score: number) => {
    if (score >= 75) return <Smile className="text-green-500" />;
    if (score >= 50) return <Meh className="text-amber-500" />;
    if (score >= 25) return <Frown className="text-orange-500" />;
    return <AlertCircle className="text-red-500" />;
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    if (score >= 25) return "bg-orange-500";
    return "bg-red-500";
  };
  
  if (!persona || !content) {
    return (
      <Card className="p-5 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <MessageSquare className="mx-auto h-12 w-12 mb-3 opacity-20" />
          <p>Select a persona and enter content to see simulated responses</p>
        </div>
      </Card>
    );
  }
  
  if (isAnalyzing) {
    return (
      <Card className="p-5 h-full">
        <div className="animate-pulse flex flex-col h-full items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="mt-8 w-full max-w-md">
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-5 h-full overflow-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Persona Response</h2>
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
          <span>Simulated Live Response</span>
        </div>
      </div>
      
      <div className="flex items-center mb-5 p-3 border rounded-lg bg-suprbrain-light/30">
        <div className="flex-shrink-0 mr-3">
          <img 
            src={persona.avatar} 
            alt={persona.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
          />
        </div>
        <div>
          <h3 className="font-medium">{persona.name}</h3>
          <p className="text-sm text-gray-500">
            {persona.description.length > 60 
              ? persona.description.substring(0, 60) + '...' 
              : persona.description}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="feedback">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback" className="space-y-5">
          {feedbackLoaded ? (
            <>
              <div className="animate-fade-in">
                <h3 className="font-medium text-sm mb-2 flex items-center">
                  {getSentimentIcon(reaction.sentiment)}
                  <span className="ml-2">Overall Sentiment</span>
                </h3>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">{reaction.feedback}</p>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-1 text-amber-800">Emotional Response</h4>
                  <p className="text-amber-700 text-sm">{reaction.emotionalResponse}</p>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-medium text-sm mb-2 flex items-center">
                  <Heart className="h-4 w-4 text-pink-500 mr-2" />
                  <span>Engagement Actions</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-semibold text-gray-700">
                      {reaction.sentiment >= 50 ? "Yes" : "No"}
                    </div>
                    <div className="text-xs text-gray-500">Would Read</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-semibold text-gray-700">
                      {reaction.engagement >= 40 ? "Likely" : "Unlikely"}
                    </div>
                    <div className="text-xs text-gray-500">Would Comment</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-semibold text-gray-700">
                      {reaction.sharing >= 50 ? "Yes" : "No"}
                    </div>
                    <div className="text-xs text-gray-500">Would Share</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-semibold text-gray-700">
                      {reaction.conversion >= 40 ? "Maybe" : "No"}
                    </div>
                    <div className="text-xs text-gray-500">Would Convert</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-1 text-blue-800">Suggestion</h4>
                  <p className="text-blue-700 text-sm">{reaction.suggestion}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              
              <div className="h-24 bg-gray-100 rounded animate-pulse"></div>
              
              <div className="h-16 bg-amber-50 rounded animate-pulse"></div>
              
              <div className="flex items-center mt-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-gray-50 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-50 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-50 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-50 rounded animate-pulse"></div>
              </div>
              
              <div className="h-16 bg-blue-50 rounded animate-pulse"></div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-5">
          {insightsLoaded ? (
            <>
              <div className="animate-fade-in">
                <h3 className="font-medium text-sm mb-3 flex items-center">
                  <BarChart4 className="h-4 w-4 text-indigo-500 mr-2" />
                  <span>Response Metrics</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sentiment</span>
                      <span className="text-sm text-gray-500">{reaction.sentiment}%</span>
                    </div>
                    <Progress 
                      value={reaction.sentiment} 
                      className="h-2"
                      indicatorClassName={getProgressColor(reaction.sentiment)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Engagement</span>
                      <span className="text-sm text-gray-500">{reaction.engagement}%</span>
                    </div>
                    <Progress 
                      value={reaction.engagement} 
                      className="h-2"
                      indicatorClassName={getProgressColor(reaction.engagement)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sharing</span>
                      <span className="text-sm text-gray-500">{reaction.sharing}%</span>
                    </div>
                    <Progress 
                      value={reaction.sharing} 
                      className="h-2"
                      indicatorClassName={getProgressColor(reaction.sharing)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Conversion</span>
                      <span className="text-sm text-gray-500">{reaction.conversion}%</span>
                    </div>
                    <Progress 
                      value={reaction.conversion} 
                      className="h-2"
                      indicatorClassName={getProgressColor(reaction.conversion)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-medium text-sm mb-3">Key Takeaways</h3>
                
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-start">
                      <div className={`rounded-full p-1 mr-3 ${reaction.sentiment >= 50 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {reaction.sentiment >= 50 ? 
                          <ThumbsUp className="h-4 w-4 text-green-600" /> : 
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <p className="text-sm text-gray-700">
                        {reaction.sentiment >= 70 ? 
                          "Content strongly resonates with this persona. High alignment with interests." :
                          reaction.sentiment >= 50 ?
                          "Content is moderately aligned with this persona's interests and preferences." :
                          reaction.sentiment >= 30 ?
                          "Content has limited appeal to this persona. Consider significant revisions." :
                          "Content doesn't resonate with this persona at all. Complete rethink needed."
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-start">
                      <div className={`rounded-full p-1 mr-3 ${reaction.engagement >= 50 ? 'bg-blue-100' : 'bg-amber-100'}`}>
                        <MessageSquare className={`h-4 w-4 ${reaction.engagement >= 50 ? 'text-blue-600' : 'text-amber-600'}`} />
                      </div>
                      <p className="text-sm text-gray-700">
                        {reaction.engagement >= 70 ? 
                          "Likely to generate high engagement and meaningful interactions." :
                          reaction.engagement >= 50 ?
                          "May generate moderate engagement, some comments or reactions likely." :
                          reaction.engagement >= 30 ?
                          "Limited engagement expected. Content may be scrolled past." :
                          "Very low engagement probability. Content unlikely to capture attention."
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-start">
                      <div className={`rounded-full p-1 mr-3 ${reaction.sharing >= 40 ? 'bg-indigo-100' : 'bg-gray-200'}`}>
                        <Share2 className={`h-4 w-4 ${reaction.sharing >= 40 ? 'text-indigo-600' : 'text-gray-500'}`} />
                      </div>
                      <p className="text-sm text-gray-700">
                        {reaction.sharing >= 60 ? 
                          "High share potential. Content type and quality makes it highly shareable." :
                          reaction.sharing >= 40 ?
                          "Moderate share potential. Some segments of this persona may share it." :
                          reaction.sharing >= 20 ?
                          "Low share potential. Content lacks strong sharing incentives." :
                          "Very unlikely to be shared by this persona."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
                
                <div className="space-y-2">
                  <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ResponseSimulator;
