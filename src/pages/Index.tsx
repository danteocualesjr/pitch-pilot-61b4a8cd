
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-3">
              Sales Playbook Coach
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Upload your sales calls or enter transcripts for real-time guidance and analysis
            </p>
          </div>

          <FileUpload />

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-8 space-y-4 transition-all hover:shadow-xl">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Transcript Analysis
            </h2>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your conversation transcript here..."
              className="min-h-[200px] text-gray-700 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-primary/30 transition-all resize-none"
            />
            <Button
              onClick={handleAnalyze}
              className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isAnalyzing || !transcript.trim()}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Analyze Conversation"
              )}
            </Button>
          </div>

          {showResults && (
            <div className="animate-fade-in">
              <AnalysisVisualizations isLoading={isAnalyzing} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
