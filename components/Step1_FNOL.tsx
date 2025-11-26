
import React, { useState } from 'react';
import { Upload, Mic, FileText, Camera, CheckCircle2, Play, Video } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

interface Step1Props {
  onNext: () => void;
}

export const Step1_FNOL: React.FC<Step1Props> = ({ onNext }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  const [recording, setRecording] = useState(false);
  
  // Video upload states
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onNext();
    }, 1500);
  };

  const handleVideoUpload = () => {
    setIsUploadingVideo(true);
    setTimeout(() => {
      setIsUploadingVideo(false);
      setVideoUploaded(true);
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer group">
                  <Upload className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Add Photo</span>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Video Walkthrough</span>
                 <span className="text-xs text-slate-500">MP4, MOV</span>
               </div>

               {!videoUploaded ? (
                 <div 
                  onClick={!isUploadingVideo ? handleVideoUpload : undefined}
                  className={`
                    h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer
                    ${isUploadingVideo 
                      ? 'bg-slate-100 dark:bg-slate-800 border-indigo-500' 
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }
                  `}
                 >
                   {isUploadingVideo ? (
                     <div className="flex flex-col items-center animate-pulse">
                        <Video className="w-6 h-6 text-indigo-500 mb-2" />
                        <span className="text-xs text-indigo-500 font-medium">Uploading video...</span>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center text-slate-400 group hover:text-indigo-500">
                        <Video className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Click to Upload Video</span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300')] bg-cover bg-center"></div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                      00:42
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
              placeholder="Describe what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Card>

          <Card>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-rose-500" />
              <span>Voice Report</span>
            </h3>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setRecording(!recording)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${recording ? 'bg-rose-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}
              >
                <Mic className={`w-5 h-5 ${recording ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`} />
              </button>
              <div className="flex-1 space-y-2">
                <div className="h-8 flex items-end gap-1 justify-center opacity-70">
                   {[...Array(20)].map((_, i) => (
                     <div 
                      key={i} 
                      className="w-1 bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-100"
                      style={{ 
                        height: recording ? `${Math.random() * 100}%` : '20%',
                        animationDelay: `${i * 0.05}s`
                      }}
                     ></div>
                   ))}
                </div>
                <p className="text-xs text-center text-slate-500 font-mono">
                  {recording ? '00:14 / 02:00' : 'Ready to record'}
                </p>
              </div>
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
        >
          Generate FNOL Summary
        </Button>
      </motion.div>
    </motion.div>
  );
};
