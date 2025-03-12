
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AnalysisVisualizations from "@/components/AnalysisVisualizations";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!transcript.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call for analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
    
    console.log("Analyzing:", transcript);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Sales Playbook Coach</h1>
            <p className="text-lg text-gray-600">
              Upload your sales calls or enter transcripts for real-time guidance and analysis
            </p>
          </div>

          <FileUpload />

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-primary">Transcript Analysis</h2>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your conversation transcript here..."
              className="min-h-[200px] text-gray-700"
            />
            <Button
              onClick={handleAnalyze}
              className="bg-primary hover:bg-primary-hover text-white px-8"
              disabled={isAnalyzing || !transcript.trim()}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Conversation"}
            </Button>
          </div>

          {showResults && (
            <AnalysisVisualizations isLoading={isAnalyzing} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
