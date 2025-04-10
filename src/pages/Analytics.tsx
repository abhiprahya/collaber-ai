
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  // Mock data for charts
  const engagementData = [
    { month: "Jan", engagement: 45 },
    { month: "Feb", engagement: 52 },
    { month: "Mar", engagement: 49 },
    { month: "Apr", engagement: 62 },
    { month: "May", engagement: 55 },
    { month: "Jun", engagement: 72 },
    { month: "Jul", engagement: 80 },
    { month: "Aug", engagement: 85 },
    { month: "Sep", engagement: 90 },
  ];

  const conversionData = [
    { month: "Jan", rate: 2.4 },
    { month: "Feb", rate: 2.8 },
    { month: "Mar", rate: 2.2 },
    { month: "Apr", rate: 3.1 },
    { month: "May", rate: 2.9 },
    { month: "Jun", rate: 3.5 },
    { month: "Jul", rate: 4.2 },
    { month: "Aug", rate: 4.5 },
    { month: "Sep", rate: 4.8 },
  ];

  const personaPerformance = [
    { persona: "Tech Enthusiast", performance: 85, color: "#4CAF50" },
    { persona: "Business Pro", performance: 72, color: "#2196F3" },
    { persona: "Creative", performance: 78, color: "#9C27B0" },
    { persona: "Health", performance: 65, color: "#FFC107" },
    { persona: "Student", performance: 70, color: "#009688" },
    { persona: "Influencer", performance: 90, color: "#F44336" },
  ];

  const contentMetrics = [
    {
      title: "Total Content",
      value: "58",
      trend: "+12% from last month",
      trendUp: true,
    },
    {
      title: "Avg. Engagement",
      value: "73%",
      trend: "+5% from last month",
      trendUp: true,
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      trend: "+0.3% from last month",
      trendUp: true,
    },
    {
      title: "Audience Growth",
      value: "2,845",
      trend: "+15% from last month",
      trendUp: true,
    },
  ];

  const renderCustomBarLabel = ({ x, y, width, value }: any) => {
    return (
      <text x={x + width / 2} y={y - 5} fill="#666" textAnchor="middle">
        {value}%
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {contentMetrics.map((metric, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trendUp ? "text-green-500" : "text-red-500"}`}>
                  {metric.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personas">Personas</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="brain-metrics">Brain Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>Monthly audience engagement scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rates</CardTitle>
                  <CardDescription>Monthly conversion percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={conversionData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="personas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Persona Performance</CardTitle>
                <CardDescription>Engagement by audience persona</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={personaPerformance} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="persona" type="category" width={100} />
                    <Tooltip />
                    <Bar
                      dataKey="performance"
                      fill="#8884d8"
                      label={renderCustomBarLabel}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>Content types breakdown</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="mr-4">Text</span>
                      <span className="font-bold">42%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                      <span className="mr-4">Video</span>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="mr-4">Image</span>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                      <span className="mr-4">Audio</span>
                      <span className="font-bold">8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>Based on engagement score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Product Launch Video</span>
                      <span className="font-bold text-green-500">95%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Tech Feature Blog Post</span>
                      <span className="font-bold text-green-500">92%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">User Testimonial Series</span>
                      <span className="font-bold text-green-500">88%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Feature Comparison Graphic</span>
                      <span className="font-bold text-green-500">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Product Demo Webinar</span>
                      <span className="font-bold text-green-500">82%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="brain-metrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brain Metrics Analysis</CardTitle>
                <CardDescription>Cognitive pattern analysis of audience response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium">Audience Response Patterns</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Emotional Response</span>
                          <span>82%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Cognitive Engagement</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Memory Retention</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Decision Influence</span>
                          <span>79%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Content-Brain Compatibility</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-suprbrain-primary mb-2">78%</div>
                        <div className="text-sm text-muted-foreground">Overall brain compatibility score</div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <div className="text-sm font-medium">Key Insights:</div>
                        <ul className="text-sm space-y-1">
                          <li>• Content resonates best with analytical thinkers</li>
                          <li>• Visual elements improve memory retention by 24%</li>
                          <li>• Technical personas show 31% higher engagement</li>
                          <li>• Emotional anchoring increases conversion by 15%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
