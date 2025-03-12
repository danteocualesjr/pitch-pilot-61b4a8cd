
import { Upload, File } from "lucide-react";
import { useState } from "react";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8
          transition-all duration-200 ease-in-out
          ${isDragging ? "border-secondary bg-secondary/10" : "border-gray-300"}
          hover:border-secondary hover:bg-secondary/5
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload
            size={40}
            className={`${
              isDragging ? "text-secondary" : "text-gray-400"
            } transition-colors`}
          />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drop your files here, or{" "}
              <label className="text-secondary hover:text-secondary-hover cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Support for PDF, DOC, TXT, and audio files
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
            >
              <File size={20} className="text-gray-400" />
              <span className="flex-1 truncate text-gray-700">{file.name}</span>
              <span className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
