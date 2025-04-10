
import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export interface PersonaProps {
  id: string;
  name: string;
  avatar: string;
  description: string;
  interests: string[];
  tone: string;
  engagement: number; // 1-100
  selected?: boolean;
  onSelect: (id: string) => void;
}

const PersonaCard: React.FC<PersonaProps> = ({
  id,
  name,
  avatar,
  description,
  interests,
  tone,
  engagement,
  selected = false,
  onSelect
}) => {
  const getEngagementColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-emerald-400";
    if (score >= 40) return "bg-yellow-400";
    if (score >= 20) return "bg-orange-400";
    return "bg-red-400";
  };
  
  return (
    <Card 
      className={cn(
        "persona-card cursor-pointer transition-all duration-200 h-full flex flex-col justify-between",
        selected ? "ring-2 ring-suprbrain-primary" : ""
      )}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12 border-2 border-suprbrain-light">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {interests.slice(0, 3).map((interest, i) => (
            <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
              {interest}
            </Badge>
          ))}
          {interests.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-xs">
              +{interests.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
          <div>Tone: <span className="font-medium">{tone}</span></div>
          <div className="flex items-center">
            <div className="mr-1">Engagement:</div>
            <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getEngagementColor(engagement)}`} 
                style={{ width: `${engagement}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="absolute -top-1 -right-1 bg-suprbrain-primary text-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </Card>
  );
};

export default PersonaCard;
