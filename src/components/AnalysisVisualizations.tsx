
import { useState } from "react";
import { BarChart, LineChart, PieChart, Smile, Meh, Frown } from "lucide-react";
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
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line" | "sentiment">("bar");
  
  // Sample data - in a real app, this would come from the transcript analysis
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
    overallSentiment: 0.72, // 0-1 scale where 1 is most positive
    percentages: [
      { name: "Client Speaking", value: 35 },
      { name: "Sales Rep Speaking", value: 65 },
    ],
  };

  const COLORS = ["#9b87f5", "#7E69AB", "#6E59A5", "#D6BCFA", "#E5DEFF"];

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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
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
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sampleData.percentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minute" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
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
        <h2 className="text-xl font-semibold text-primary mb-4">Analysis Results</h2>
        <div className="flex space-x-2 mb-6">
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
        </div>
      </div>
      
      {renderActiveChart()}
    </div>
  );
};

export default AnalysisVisualizations;
