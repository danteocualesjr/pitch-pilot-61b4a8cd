
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [transcript, setTranscript] = useState("");

  const handleAnalyze = () => {
    // Handle analysis logic here
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
            >
              Analyze Conversation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
