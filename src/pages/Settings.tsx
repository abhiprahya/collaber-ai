
import React from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Brain, Bell, Shield, Users, Palette } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI & Brain</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="SuprBrain Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Content Marketing Manager" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="persona-updates">Persona updates and insights</Label>
                      <Switch id="persona-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-feedback">Content feedback summaries</Label>
                      <Switch id="content-feedback" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-analytics">Weekly analytics reports</Label>
                      <Switch id="weekly-analytics" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="product-updates">Product updates and news</Label>
                      <Switch id="product-updates" defaultChecked />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="real-time-insights">Real-time persona insights</Label>
                      <Switch id="real-time-insights" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collaboration">Collaboration requests</Label>
                      <Switch id="collaboration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="brain-metrics">Brain metrics updates</Label>
                      <Switch id="brain-metrics" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-alerts">System alerts</Label>
                      <Switch id="system-alerts" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI & Brain Settings</CardTitle>
                <CardDescription>
                  Configure AI behavior and brain metrics analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Persona Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="deep-learning">Enable deep learning from your content</Label>
                      <Switch id="deep-learning" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-optimize">Auto-optimize persona recommendations</Label>
                      <Switch id="auto-optimize" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model-preference">AI Model Preference</Label>
                      <select id="model-preference" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="balanced">Balanced (Default)</option>
                        <option value="creative">Creative & Explorative</option>
                        <option value="precise">Precise & Factual</option>
                        <option value="efficient">Efficient & Fast</option>
                      </select>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Brain Metrics Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="detailed-metrics">Show detailed brain metrics in reports</Label>
                      <Switch id="detailed-metrics" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compatibility">Show content-persona compatibility scores</Label>
                      <Switch id="compatibility" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metrics-refresh">Brain Metrics Refresh Rate</Label>
                      <select id="metrics-refresh" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="realtime">Real-time (High resource usage)</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-muted mt-4">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-suprbrain-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Brain Data Privacy</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your brain metrics and analysis data are stored securely and never shared with third parties.
                          You can export or delete this data at any time.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">Export Data</Button>
                          <Button size="sm" variant="destructive">Delete Brain Data</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Manage team members and collaboration settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Team Members (4)</h3>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-suprbrain-primary flex items-center justify-center text-white">
                        JD
                      </div>
                      <div>
                        <div className="font-medium">John Doe (You)</div>
                        <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Admin</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                        AS
                      </div>
                      <div>
                        <div className="font-medium">Alice Smith</div>
                        <div className="text-sm text-muted-foreground">alice.smith@example.com</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Editor</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        RJ
                      </div>
                      <div>
                        <div className="font-medium">Robert Johnson</div>
                        <div className="text-sm text-muted-foreground">robert.j@example.com</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Analyst</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        EN
                      </div>
                      <div>
                        <div className="font-medium">Emma Nelson</div>
                        <div className="text-sm text-muted-foreground">emma.n@example.com</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Viewer</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Manage Roles & Permissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex items-center gap-2 cursor-pointer bg-background">
                      <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>Light</span>
                    </div>
                    <div className="border rounded-md p-4 flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      </div>
                      <span>Dark</span>
                    </div>
                    <div className="border rounded-md p-4 flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      </div>
                      <span>System</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Display Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">Enable animations</Label>
                      <Switch id="animations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compact-mode">Compact mode</Label>
                      <Switch id="compact-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduced-motion">Reduced motion</Label>
                      <Switch id="reduced-motion" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
