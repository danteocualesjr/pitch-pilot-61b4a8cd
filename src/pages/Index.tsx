
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Sparkles, Zap, CheckCheck } from "lucide-react";
import AnalysisVisualizations from "@/components/AnalysisVisualizations";
import { toast } from "sonner";
import RealtimeRecording from "@/components/RealtimeRecording";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleAnalyze = () => {
    if (!transcript.trim() && files.length === 0) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      
      toast.success("Analysis complete", {
        description: `Analyzed ${transcript.trim() ? "transcript" : ""} ${transcript.trim() && files.length > 0 ? "and " : ""} ${files.length > 0 ? `${files.length} file(s)` : ""}`,
      });
    }, 1500);
    
    if (transcript.trim()) {
      console.log("Analyzing transcript:", transcript);
    }
    
    if (files.length > 0) {
      console.log("Analyzing files:", files.map(f => f.name));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleTranscriptUpdate = (text: string) => {
    setTranscript(prev => prev + "\n" + text);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
              Sales Playbook Coach
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Upload your sales calls or enable real-time conversation analysis for instant guidance
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 p-8 space-y-6 transition-all hover:shadow-2xl hover:bg-white/80">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent flex items-center">
                <Zap size={20} className="mr-2 text-indigo-500" />
                Conversation Analysis
              </h2>
              <RealtimeRecording onTranscriptUpdate={handleTranscriptUpdate} />
            </div>
            
            <div className="relative" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              {isDragging && (
                <div className="absolute inset-0 border-2 border-dashed border-indigo-300 bg-indigo-50/70 rounded-lg flex items-center justify-center z-10 backdrop-blur-sm">
                  <p className="text-indigo-600 text-lg font-medium flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Drop files here to add to chat
                  </p>
                </div>
              )}
              <div className="relative group">
                <Textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste your conversation transcript here or start recording..."
                  className="min-h-[200px] text-gray-700 bg-white/50 backdrop-blur-sm border-indigo-100 focus:border-indigo-300 transition-all resize-none pr-10 rounded-xl shadow-inner"
                />
                <label className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors group-hover:scale-110 transform duration-200">
                  <Paperclip className="h-5 w-5" />
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-indigo-50/80 rounded-lg text-sm text-gray-700 hover:bg-indigo-100/80 transition-all border border-indigo-100/50"
                  >
                    <Paperclip className="h-4 w-4 text-indigo-400" />
                    <span className="flex-1 truncate font-medium">{file.name}</span>
                    <span className="text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full text-xs">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button 
                      onClick={() => handleRemoveFile(index)}
                      className="text-indigo-400 hover:text-rose-500 transition-colors p-1 rounded-full hover:bg-rose-50"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl w-full md:w-auto"
              disabled={isAnalyzing || (!transcript.trim() && files.length === 0)}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                  {transcript.trim() || files.length > 0 ? (
                    <>
                      <Sparkles className="h-5 w-5" /> 
                      Analyze Conversation
                    </>
                  ) : (
                    <>
                      <CheckCheck className="h-5 w-5" />
                      Ready to Analyze
                    </>
                  )}
                </span>
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
