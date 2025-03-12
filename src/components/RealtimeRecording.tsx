
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, AudioLines, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface RealtimeRecordingProps {
  onTranscriptUpdate: (text: string) => void;
}

const RealtimeRecording = ({ onTranscriptUpdate }: RealtimeRecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.onstart = () => {
        toast.success("Started listening to conversation");
      };

      // In a real app, this would send audio chunks to a speech-to-text service
      recorder.ondataavailable = (e) => {
        console.log("Audio data available", e.data.size);
        // Simulated real-time transcription
        if (isRecording) {
          onTranscriptUpdate("Sample transcribed text...");
        }
      };

      recorder.start(1000); // Collect data every second
      setMediaRecorder(recorder);
    } catch (err) {
      toast.error("Could not access microphone");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => setIsRecording(!isRecording)}
        variant={isRecording ? "destructive" : "default"}
        className={`relative group transition-all duration-300 ${
          isRecording 
            ? "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-red-500/30" 
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20"
        }`}
      >
        {isRecording ? (
          <>
            <MicOff className="mr-2 h-4 w-4" />
            Stop Recording
            <AudioLines className="absolute -right-2 -top-2 text-rose-200 animate-pulse" />
          </>
        ) : (
          <>
            <Mic className="mr-2 h-4 w-4" />
            <span>Start Recording</span>
            <Sparkles className="absolute -right-2 -top-2 text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
          </>
        )}
      </Button>
      {isRecording && (
        <div className="flex items-center gap-2 text-sm text-primary/70 animate-pulse bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent font-medium">
          <AudioLines className="h-4 w-4 text-rose-500" />
          Listening...
        </div>
      )}
    </div>
  );
};

export default RealtimeRecording;
