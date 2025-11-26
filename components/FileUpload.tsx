import React, { useRef, useState } from 'react';
import { UploadCloud, X, FileText, Film, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface FileUploadProps {
  accept: string;
  multiple?: boolean;
  variant: 'image' | 'video' | 'document' | 'invoice';
  onFilesSelected: (files: File[]) => void;
  label?: string;
  subLabel?: string;
}

interface FilePreview {
  file: File;
  previewUrl: string | null;
  progress: number;
  completed: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  accept, 
  multiple = false, 
  variant, 
  onFilesSelected,
  label,
  subLabel
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const filesToProcess = multiple ? selectedFiles : [selectedFiles[0]];
    onFilesSelected(filesToProcess);

    const newPreviews = filesToProcess.map(file => ({
      file,
      previewUrl: variant === 'image' || variant === 'video' || variant === 'invoice' ? URL.createObjectURL(file) : null,
      progress: 0,
      completed: false
    }));

    if (multiple) {
      setFiles(prev => [...prev, ...newPreviews]);
    } else {
      setFiles(newPreviews);
    }

    newPreviews.forEach((preview, index) => {
       const globalIndex = multiple ? files.length + index : index;
       let progress = 0;
       const interval = setInterval(() => {
         progress += Math.random() * 20;
         if (progress >= 100) {
           progress = 100;
           clearInterval(interval);
           setFiles(prev => {
             const newFiles = [...prev];
             if (newFiles[globalIndex]) {
                newFiles[globalIndex] = { ...newFiles[globalIndex], progress: 100, completed: true };
             }
             return newFiles;
           });
         } else {
           setFiles(prev => {
            const newFiles = [...prev];
            if (newFiles[globalIndex]) {
                newFiles[globalIndex] = { ...newFiles[globalIndex], progress };
            }
            return newFiles;
           });
         }
       }, 200);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => {
      const fileToRemove = prev[idx];
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((_, i) => i !== idx);
    });
  };

  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <div 
        className={`upload-zone-anim relative group cursor-pointer flex flex-col items-center justify-center w-full h-32 md:h-40 rounded-xl border-2 border-dashed transition-all duration-300 ease-out
          ${dragActive 
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 scale-[1.01] shadow-lg' 
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerInput}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="upload-icon-bounce p-3 rounded-full bg-white dark:bg-gray-700 shadow-sm mb-3 group-hover:shadow-md transition-shadow">
            {variant === 'image' && <ImageIcon className="w-6 h-6 text-brand-500" />}
            {variant === 'video' && <Film className="w-6 h-6 text-purple-500" />}
            {(variant === 'document' || variant === 'invoice') && <FileText className="w-6 h-6 text-orange-500" />}
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {label || "Click to upload or drag & drop"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subLabel || "Supported formats: PNG, JPG, PDF"}
          </p>
        </div>
      </div>

      {/* Previews */}
      {files.length > 0 && (
        <div className={`mt-4 ${variant === 'image' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col space-y-3'}`}>
          {files.map((fileData, idx) => (
            <div 
              key={`${fileData.file.name}-${idx}`} 
              className="relative group animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              
              {/* Image Grid Preview */}
              {variant === 'image' && fileData.previewUrl && (
                <div className="relative rounded-lg overflow-hidden aspect-video border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <img src={fileData.previewUrl} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="icon-hover p-2 bg-white/20 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg">
                      <X size={16} />
                    </button>
                  </div>
                  {!fileData.completed && (
                    <div className="absolute bottom-0 left-0 h-1 bg-brand-500 transition-all duration-200" style={{ width: `${fileData.progress}%` }} />
                  )}
                  {fileData.completed && (
                     <div className="absolute top-2 right-2 bg-green-500 text-white p-0.5 rounded-full shadow-sm animate-[fadeIn_0.3s_ease]">
                       <CheckCircle2 size={12} />
                     </div>
                  )}
                </div>
              )}

              {/* Video Preview */}
              {variant === 'video' && fileData.previewUrl && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-black hover:shadow-md transition-all">
                  <video src={fileData.previewUrl} controls className="w-full max-h-64 rounded-lg" />
                  <div className="p-2 flex justify-between items-center bg-white dark:bg-gray-800">
                    <span className="text-xs font-mono truncate">{fileData.file.name}</span>
                    <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 icon-hover"><X size={16} /></button>
                  </div>
                  {!fileData.completed && (
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 w-full">
                       <div className="h-full bg-purple-500 transition-all duration-200" style={{ width: `${fileData.progress}%` }} />
                    </div>
                  )}
                </div>
              )}

              {/* Document/Invoice List Preview */}
              {(variant === 'document' || variant === 'invoice') && (
                <div className="list-item-hover flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{fileData.file.name}</p>
                    <p className="text-xs text-gray-500">{(fileData.file.size / 1024).toFixed(1)} KB</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div 
                        className={`bg-brand-500 h-1.5 rounded-full transition-all duration-200 relative ${fileData.completed ? '' : 'shimmer-effect'}`} 
                        style={{ width: `${fileData.progress}%` }} 
                      />
                    </div>
                  </div>
                  <button onClick={() => removeFile(idx)} className="ml-3 p-1.5 text-gray-400 hover:text-red-500 transition-colors icon-hover">
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;