import { useState } from "react";
import { BarChart, LineChart, PieChart, Smile, Meh, Frown, FileText, LightbulbIcon, CheckSquare, MessageSquare, Info, CircleCheck, AlertCircle, BadgeCheck, ArrowRight, Users, Calendar, FileBarChart, Award, ListChecks, Mail, PhoneOutgoing, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

interface AnalysisVisualizationsProps {
  data?: any;
  isLoading?: boolean;
}

const AnalysisVisualizations = ({
  data = null,
  isLoading = false,
}: AnalysisVisualizationsProps) => {
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line" | "sentiment" | "text">("bar");
  
  const sampleData = data || {
    keyTopics: [
      { name: "Pricing", value: 15 },
      { name: "Features", value: 23 },
      { name: "Support", value: 8 },
      { name: "Integration", value: 17 },
      { name: "Timeline", value: 12 },
    ],
    sentimentOverTime: [
      { minute: "0:00", value: 0.6 },
      { minute: "1:00", value: 0.7 },
      { minute: "2:00", value: 0.5 },
      { minute: "3:00", value: 0.8 },
      { minute: "4:00", value: 0.9 },
      { minute: "5:00", value: 0.7 },
    ],
    overallSentiment: 0.72,
    percentages: [
      { name: "Client Speaking", value: 35 },
      { name: "Sales Rep Speaking", value: 65 },
    ],
    textResults: {
      context: "The salesperson, John from TechSolutions, is contacting a prospect to discuss customer support scaling solutions. The prospect's company has been growing rapidly and is facing challenges related to their support team's capacity.",
      keyTopics: [
        "Challenges in scaling customer support infrastructure.",
        "Overwhelmed support team due to rapid company growth.",
        "Current solutions: Hiring more staff and exploring ticketing systems.",
        "Introduction of an AI-powered support solution specifically for customer support scenarios."
      ],
      customerObjections: [
        "Skepticism regarding the effectiveness of AI solutions based on past experiences."
      ],
      recognizedQuestions: [
        "'How is yours different?' (Prospect questioning the uniqueness and reliability of the offered AI solution.)"
      ],
      salesProcessStage: "The conversation is in the needs analysis and solution presentation stages. The salesperson is identifying the prospect's needs and challenges while presenting a tailored solution and addressing objections with an offer for a demo.",
      recommendations: {
        guidance: [
          "Acknowledge the Objection: It's important to validate the prospect's past experiences with AI solutions to build trust.",
          "Differentiate the Product: Emphasize unique features and customized implementation to meet their specific needs.",
          "Offer Proof Points: Share relevant case studies or testimonials demonstrating success in similar industries.",
          "Prompt for Next Steps: Encourage engagement with an offer for a demo to showcase the solution's capabilities."
        ],
        suggestedResponses: [
          "Acknowledge and Validate: 'I completely understand your concerns. It's crucial for any solution to meet your expectations.'",
          "Differentiate the Solution: 'Our AI is trained specifically with industry data, making it highly relevant to your challenges. Additionally, our customization ensures it directly supports your unique operations.'",
          "Provide Supporting Evidence: 'In fact, one of our clients in a similar industry saw a 50% reduction in tickets and increased customer satisfaction scores within the first three months. I'd be happy to share more details if you're interested.'",
          "Encourage Next Steps: 'Seeing is believing, right? I'd love to set up a quick demo so you can see how it functions and evaluate its fit for your team. Does that sound good?'"
        ],
        competitiveIntelligence: [
          "Highlight any competitors' lack of industry-specific customization or support during the implementation phase.",
          "Stress the importance of an ongoing partnership rather than a one-time setup, which might not be a focus for other solutions.",
          "Compare resolution time improvements and scalability with industry benchmarks that your solution excels at."
        ]
      },
      callSummary: {
        participants: [
          "Salesperson: John from TechSolutions",
          "Prospect: [Prospect's Name] from [Prospect's Company]"
        ],
        date: "[Insert Date]",
        keyDiscussionPoints: [
          "Current Challenges: The prospect's support team is overwhelmed due to rapid growth. Existing solutions include hiring more staff, which is costly and time-consuming. Exploration of ticketing systems is underway but no decisions made yet.",
          "Proposed Solution: An AI-powered support solution from TechSolutions that claims to reduce ticket resolution time by 40% and addresses 60% of routine inquiries.",
          "Prospect Concerns: Skepticism about AI effectiveness based on past experiences. Inquiry about how TechSolutions' AI differs from others in the market.",
          "Salesperson's Response: Emphasized industry-specific training of the AI. Mentioned a 4-week customization and implementation process. Offered a demo to demonstrate the solution in action."
        ],
        actionItems: [
          "Demo Scheduling: Coordinate with [Prospect's Name] to schedule a demonstration of the AI solution. Ensure it's tailored to their industry and challenges.",
          "Provide Testimonials/Case Studies: Send relevant case studies or testimonials showing success in similar industries to build trust and credibility.",
          "Prepare Competitive Analysis: Share information on how TechSolutions' offering differs from competitors, emphasizing unique features and customization.",
          "Follow-Up: Send a follow-up email recapping the call highlights, confirming the demo schedule, and attaching supporting materials.",
          "Feedback Loop: After the demo, gather feedback from the prospect to address any further questions or concerns."
        ]
      }
    }
  };

  const COLORS = ["#9b87f5", "#7E69AB", "#6E59A5", "#D6BCFA", "#E5DEFF"];
  const BAR_COLOR = "#8B5CF6";
  const LINE_COLOR = "#D946EF";

  const renderSentimentIcon = () => {
    const sentiment = sampleData.overallSentiment;
    
    if (sentiment > 0.66) {
      return <Smile size={80} className="text-green-500" />;
    } else if (sentiment > 0.33) {
      return <Meh size={80} className="text-amber-500" />;
    } else {
      return <Frown size={80} className="text-red-500" />;
    }
  };

  const renderTextResults = () => {
    return (
      <div className="h-[500px] overflow-y-auto px-4 py-2 text-gray-700">
        <div className="mb-8 bg-gradient-to-br from-white to-indigo-50/30 p-4 rounded-xl border border-indigo-100/50">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-indigo-800">Analysis</h3>
          </div>
          
          <div className="space-y-4 ml-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <BriefcaseBusiness size={16} className="text-indigo-500" /> Context:
              </h4>
              <p className="text-sm bg-white p-3 rounded-md shadow-sm">{sampleData.textResults.context}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <FileBarChart size={16} className="text-indigo-500" /> Key Topics:
              </h4>
              <ul className="space-y-1 text-sm">
                {sampleData.textResults.keyTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-2"></span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-500" /> Customer Objections:
              </h4>
              <ul className="space-y-1 text-sm">
                {sampleData.textResults.customerObjections.map((objection, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-rose-500 mr-2">⚠️</span>
                    <span>{objection}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <MessageSquare size={16} className="text-amber-500" /> Recognized Questions:
              </h4>
              <ul className="space-y-1 text-sm">
                {sampleData.textResults.recognizedQuestions.map((question, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-500 mr-2">❓</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Award size={16} className="text-emerald-500" /> Sales Process Stage:
              </h4>
              <p className="text-sm bg-white p-3 rounded-md shadow-sm">{sampleData.textResults.salesProcessStage}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8 bg-gradient-to-br from-white to-amber-50/30 p-4 rounded-xl border border-amber-100/50">
          <div className="flex items-center gap-2 mb-4">
            <LightbulbIcon size={20} className="text-amber-500" />
            <h3 className="text-lg font-semibold text-amber-800">Recommendations</h3>
          </div>
          
          <div className="space-y-6 ml-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <CheckSquare size={16} className="text-amber-500" /> Real-Time Guidance:
              </h4>
              <ol className="space-y-2 text-sm">
                {sampleData.textResults.recommendations.guidance.map((guidance, idx) => {
                  const [title, description] = guidance.split(":");
                  return (
                    <li key={idx} className="bg-white p-3 rounded-md shadow-sm">
                      <span className="font-medium flex items-center gap-1">
                        <span className="text-amber-500">✨</span> {title}:
                      </span> {description}
                    </li>
                  );
                })}
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <MessageSquare size={16} className="text-emerald-500" /> Suggested Responses:
              </h4>
              <div className="space-y-2 text-sm">
                {sampleData.textResults.recommendations.suggestedResponses.map((response, idx) => {
                  const [title, description] = response.split(":");
                  return (
                    <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                      <span className="font-medium flex items-start">
                        <span className="text-emerald-500 mr-1">💬</span> {title}:
                      </span> {description}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <BadgeCheck size={16} className="text-sky-500" /> Relevant Competitive Intelligence:
              </h4>
              <ul className="space-y-1 text-sm">
                {sampleData.textResults.recommendations.competitiveIntelligence.map((intel, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-sky-500 mr-2">🏆</span>
                    <span>{intel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-blue-50/30 p-4 rounded-xl border border-blue-100/50">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Documentation</h3>
          </div>
          
          <div className="space-y-4 ml-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <CheckSquare size={16} className="text-blue-500" /> Call Summary:
              </h4>
              
              <div className="bg-white p-4 rounded-md shadow-sm text-sm">
                <div className="mb-3">
                  <span className="font-medium flex items-center gap-2">
                    <Users size={14} className="text-indigo-500" /> Participants:
                  </span>
                  {sampleData.textResults.callSummary.participants.map((participant, idx) => (
                    <div key={idx} className="ml-6 flex items-center gap-1">
                      <span className="text-indigo-400">👤</span> {participant}
                    </div>
                  ))}
                </div>
                
                <div className="mb-3">
                  <span className="font-medium flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-500" /> Date:
                  </span> 
                  <span className="ml-6">{sampleData.textResults.callSummary.date}</span>
                </div>
                
                <div className="mb-3">
                  <span className="font-medium flex items-center gap-2">
                    <MessageSquare size={14} className="text-indigo-500" /> Key Discussion Points:
                  </span>
                  <ol className="ml-6 mt-1 space-y-2">
                    {sampleData.textResults.callSummary.keyDiscussionPoints.map((point, idx) => {
                      const [title, description] = point.split(":");
                      return (
                        <li key={idx}>
                          <span className="font-medium flex items-center">
                            <ArrowRight size={12} className="text-indigo-400 mr-1" /> {title}:
                          </span> {description}
                        </li>
                      );
                    })}
                  </ol>
                </div>
                
                <div>
                  <span className="font-medium flex items-center gap-2">
                    <ListChecks size={14} className="text-indigo-500" /> Action Items:
                  </span>
                  <ul className="ml-6 mt-1 space-y-2">
                    {sampleData.textResults.callSummary.actionItems.map((item, idx) => {
                      const [title, description] = item.split(":");
                      return (
                        <li key={idx} className="flex items-start">
                          <span className="text-indigo-500 mr-2">📋</span>
                          <span>
                            <span className="font-medium">{title}:</span> {description}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case "bar":
        return (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={sampleData.keyTopics}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E5DEFF"
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={BAR_COLOR}
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
            <p className="text-center font-medium text-gray-700 mt-4">Key Topics Mentioned</p>
          </div>
        );
      
      case "pie":
        return (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={sampleData.percentages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#333"
                  dataKey="value"
                >
                  {sampleData.percentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E5DEFF"
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <p className="text-center font-medium text-gray-700 mt-4">Speaking Time Distribution</p>
          </div>
        );
      
      case "line":
        return (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={sampleData.sentimentOverTime}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="minute" />
                <YAxis domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E5DEFF"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={LINE_COLOR}
                  strokeWidth={3}
                  dot={{ r: 4, fill: LINE_COLOR, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 6, fill: LINE_COLOR, strokeWidth: 2, stroke: "white" }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
            <p className="text-center font-medium text-gray-700 mt-4">Sentiment Over Time</p>
          </div>
        );
      
      case "sentiment":
        return (
          <div className="h-72 w-full flex flex-col items-center justify-center">
            {renderSentimentIcon()}
            <p className="text-xl font-medium text-gray-700 mt-6">
              Overall Sentiment: {sampleData.overallSentiment > 0.66 ? "Positive" : 
                                  sampleData.overallSentiment > 0.33 ? "Neutral" : "Negative"}
            </p>
            <p className="text-sm text-gray-500">
              Score: {(sampleData.overallSentiment * 100).toFixed(0)}%
            </p>
          </div>
        );
      
      case "text":
        return renderTextResults();
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-72 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeChart === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("bar")}
            className="flex items-center gap-2"
          >
            <BarChart size={16} />
            Topics
          </Button>
          <Button
            variant={activeChart === "pie" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("pie")}
            className="flex items-center gap-2"
          >
            <PieChart size={16} />
            Distribution
          </Button>
          <Button
            variant={activeChart === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("line")}
            className="flex items-center gap-2"
          >
            <LineChart size={16} />
            Trends
          </Button>
          <Button
            variant={activeChart === "sentiment" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("sentiment")}
            className="flex items-center gap-2"
          >
            <Smile size={16} />
            Sentiment
          </Button>
          <Button
            variant={activeChart === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("text")}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Detailed Analysis
          </Button>
        </div>
      </div>
      
      {renderActiveChart()}
    </div>
  );
};

export default AnalysisVisualizations;
