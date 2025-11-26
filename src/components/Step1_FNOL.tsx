import React, { useState, useRef } from 'react';
import { Upload, Mic, FileText, Camera, CheckCircle2, Play, Video, X, Trash2, File as FileIcon, Plus } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { aiService } from '../services/aiService';
import { FNOLData } from '../types';
import { generateDummyData } from '../data/dummyData';

interface Step1Props {
  onNext: () => void;
  setFnolData: (data: FNOLData) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  preview: string;
  file: File;
}

export const Step1_FNOL: React.FC<Step1Props> = ({ onNext, setFnolData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  
  // Real Media States
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<UploadedFile[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedFile[]>([]);

  // Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Refs for inputs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Trigger Functions
  const triggerImageUpload = () => {
    if (imageInputRef.current) imageInputRef.current.click();
  };

  const triggerVideoUpload = () => {
    if (videoInputRef.current) videoInputRef.current.click();
  };

  const triggerDocUpload = () => {
    if (docInputRef.current) docInputRef.current.click();
  };

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Image upload triggered', e.target.files);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file: File, idx) => ({
      id: `uploaded-img-${Date.now()}-${idx}`,
      name: file.name,
      type: 'User Upload',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      preview: URL.createObjectURL(file),
      file: file
    }));
    
    setUploadedImages(prev => [...prev, ...newImages]);
    e.target.value = ''; // Reset
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Video upload triggered', e.target.files);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newVideos = Array.from(files).map((file: File, idx) => ({
      id: `uploaded-vid-${Date.now()}-${idx}`,
      name: file.name,
      type: 'User Upload',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      preview: URL.createObjectURL(file),
      file: file
    }));
    
    setUploadedVideos(prev => [...prev, ...newVideos]);
    e.target.value = ''; // Reset
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Doc upload triggered', e.target.files);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs = Array.from(files).map((file: File, idx) => ({
      id: `uploaded-doc-${Date.now()}-${idx}`,
      name: file.name,
      type: 'User Upload',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      preview: '', 
      file: file
    }));
    
    setUploadedDocs(prev => [...prev, ...newDocs]);
    e.target.value = ''; // Reset
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const removeVideo = (id: string) => {
    setUploadedVideos(prev => prev.filter(vid => vid.id !== id));
  };

  const removeDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const imageFiles = uploadedImages.map(img => img.file);
      // Use API if data provided
      if (description.trim().length > 0 || imageFiles.length > 0 || audioBlob || uploadedDocs.length > 0) {
        // Pass real files to AI
        const data = await aiService.generateFNOL(description, imageFiles, audioBlob);
        setFnolData(data);
      } else {
        // Fallback for purely empty click (demo safety)
        const dummy = generateDummyData().fnol;
        setFnolData(dummy);
      }
      onNext();
    } catch (error) {
      console.error("AI Generation failed", error);
      // Fallback in case of API error
      setFnolData(generateDummyData().fnol);
      onNext();
    } finally {
      setIsGenerating(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Section */}
      <motion.div variants={item} className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">FNOL Intake</h2>
        <p className="text-slate-500 dark:text-slate-400">Capture incident details, media, and voice report.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col: Media Uploads */}
        <motion.div variants={item} className="space-y-6">
          <Card className="h-full">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-500" />
              <span>Evidence Upload</span>
            </h3>
            
            {/* Hidden Inputs - Robust Pattern */}
            <input 
              type="file" 
              ref={imageInputRef} 
              className="absolute opacity-0 w-0 h-0 overflow-hidden"
              accept="image/*" 
              multiple 
              onChange={handleImageUpload} 
            />
            <input 
               type="file" 
               ref={videoInputRef} 
               className="absolute opacity-0 w-0 h-0 overflow-hidden"
               accept="video/*" 
               onChange={handleVideoUpload} 
            />
            <input 
               type="file" 
               ref={docInputRef} 
               className="absolute opacity-0 w-0 h-0 overflow-hidden"
               accept=".pdf,.doc,.docx,.txt" 
               multiple 
               onChange={handleDocUpload} 
            />

            {/* Photos */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div 
                onClick={triggerImageUpload}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && triggerImageUpload()}
                className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer group"
              >
                <Upload className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Add Photo</span>
              </div>

              {uploadedImages.map((img) => (
                <div 
                  key={img.id} 
                  className="aspect-square relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-cover bg-center"
                  style={{ backgroundImage: `url(${img.preview})` }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[10px] text-white font-medium truncate w-full">{img.name}</span>
                    <span className="text-[9px] text-white/80">{img.size}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Video */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Video Walkthrough</span>
                 <span className="text-xs text-slate-500">MP4, MOV</span>
               </div>

               {uploadedVideos.length === 0 ? (
                 <div 
                  onClick={triggerVideoUpload}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && triggerVideoUpload()}
                  className="h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                 >
                    <div className="flex flex-col items-center text-slate-400 group hover:text-indigo-500">
                       <Video className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-medium">Click to Upload Video</span>
                    </div>
                 </div>
               ) : (
                 <div className="h-24 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    <video src={uploadedVideos[uploadedVideos.length - 1].preview} controls className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeVideo(uploadedVideos[uploadedVideos.length - 1].id)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                 </div>
               )}
            </div>

            {/* Documents */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Supporting Docs</span>
                 <span className="text-xs text-slate-500">PDF, DOCX</span>
               </div>

               {uploadedDocs.length === 0 ? (
                 <div 
                  onClick={triggerDocUpload}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && triggerDocUpload()}
                  className="h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                 >
                    <div className="flex items-center gap-2 text-slate-400 group hover:text-indigo-500">
                       <FileIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-medium">Upload Documents</span>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-2">
                    {uploadedDocs.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg group">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded text-indigo-600 dark:text-indigo-400">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{doc.name}</span>
                                    <span className="text-[9px] text-slate-400">{doc.size}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeDoc(doc.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <div 
                        onClick={triggerDocUpload}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && triggerDocUpload()}
                        className="flex items-center justify-center gap-1 py-1 text-xs text-indigo-500 hover:text-indigo-600 cursor-pointer border border-dashed border-indigo-200 dark:border-indigo-900 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add another
                    </div>
                 </div>
               )}
            </div>

          </Card>
        </motion.div>

        {/* Right Col: Text & Voice */}
        <motion.div variants={item} className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              <span>Incident Description</span>
            </h3>
            <textarea
              className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm"
              placeholder="Describe what happened (e.g., 'I was rear-ended at a stop light on 5th Ave...')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Card>

          <Card>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-rose-500" />
              <span>Voice Report</span>
            </h3>
            
            <div className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${isRecording ? 'bg-rose-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}
                >
                  {isRecording ? (
                    <div className="w-4 h-4 bg-white rounded-sm" />
                  ) : (
                    <Mic className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  )}
                </button>
                <div className="flex-1 space-y-2">
                  <div className="h-8 flex items-end gap-1 justify-center opacity-70">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-100"
                        style={{ 
                          height: isRecording ? `${Math.random() * 100}%` : '20%',
                          animationDelay: `${i * 0.05}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-slate-500 font-mono">
                    {isRecording ? 'Recording...' : audioUrl ? 'Recording Saved' : 'Click mic to record'}
                  </p>
                </div>
              </div>
              
              {audioUrl && (
                <div className="w-full mt-2">
                   <audio src={audioUrl} controls className="w-full h-8" />
                   <button 
                     onClick={() => { setAudioBlob(null); setAudioUrl(null); }}
                     className="text-xs text-rose-500 hover:text-rose-600 mt-1 flex items-center gap-1 justify-center"
                   >
                      <Trash2 className="w-3 h-3" /> Delete Recording
                   </button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item} className="flex justify-end pt-4">
        <Button 
          onClick={handleGenerate} 
          isLoading={isGenerating}
          variant="primary"
          className="w-full md:w-auto px-8"
          icon={<CheckCircle2 className="w-4 h-4" />}
          disabled={!description && uploadedImages.length === 0 && !audioBlob}
        >
          Generate FNOL Summary
        </Button>
      </motion.div>
    </motion.div>
  );
};