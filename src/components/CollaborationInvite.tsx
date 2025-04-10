
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Check, UserPlus, Mail, Link, Copy } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/use-toast";

interface CollaborationInviteProps {
  isOpen: boolean;
  onClose: () => void;
  personaId?: string;
  personaName?: string;
  personaAvatar?: string;
}

const CollaborationInvite: React.FC<CollaborationInviteProps> = ({
  isOpen,
  onClose,
  personaId,
  personaName = "Tech Enthusiast",
  personaAvatar = "https://i.pravatar.cc/150?img=1",
}) => {
  const [inviteMethod, setInviteMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`Hey, I'd love to collaborate with you on content targeting the ${personaName} persona. Join me!`);
  const [accessLevel, setAccessLevel] = useState("view");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://suprbrain.app/invite/${personaId}?access=${accessLevel}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "Link copied!",
      description: "Collaboration link copied to clipboard",
    });
  };
  
  const handleSendInvite = () => {
    toast({
      title: "Invitation sent!",
      description: `Invitation to collaborate on ${personaName} has been sent.`,
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Invite to Collaborate</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={personaAvatar} alt={personaName} />
              <AvatarFallback>{personaName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{personaName}</h3>
              <p className="text-sm text-muted-foreground">Collaborating on this persona</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Invite Method</Label>
              <RadioGroup defaultValue="email" value={inviteMethod} onValueChange={setInviteMethod} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="r-email" />
                  <Label htmlFor="r-email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Invitation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="link" id="r-link" />
                  <Label htmlFor="r-link" className="flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    Shareable Link
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {inviteMethod === "email" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="Enter email address" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Input 
                      value={`https://suprbrain.app/invite/${personaId}?access=${accessLevel}`}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      variant="secondary"
                      className="rounded-l-none h-10 px-3"
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">This link will expire in 7 days</p>
                </CardContent>
              </Card>
            )}
            
            <div className="space-y-2">
              <Label>Access Level</Label>
              <RadioGroup defaultValue="view" value={accessLevel} onValueChange={setAccessLevel} className="grid grid-cols-3 gap-2">
                <div>
                  <RadioGroupItem value="view" id="view" className="peer sr-only" />
                  <Label
                    htmlFor="view"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-sm font-medium">View</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="comment" id="comment" className="peer sr-only" />
                  <Label
                    htmlFor="comment"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-sm font-medium">Comment</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="edit" id="edit" className="peer sr-only" />
                  <Label
                    htmlFor="edit"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-sm font-medium">Edit</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {inviteMethod === "email" ? (
            <Button onClick={handleSendInvite}>
              <UserPlus className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          ) : (
            <Button onClick={handleCopyLink}>
              {isCopied ? 
                <Check className="h-4 w-4 mr-2" /> : 
                <Copy className="h-4 w-4 mr-2" />
              }
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollaborationInvite;
