import React, { useState, useRef } from 'react';
import { Mic, ArrowRight, Loader2, Info, StopCircle, User, Phone, Mail, Car, MapPin, Calendar, Clock, FileText, Paperclip, CheckCircle2, Sparkles, Image as ImageIcon, Film } from 'lucide-react';
import FileUpload from './FileUpload';
import { fnolResponses } from '../data/dummyData';
import { getRandomItem, wait } from '../utils/helpers';
import { FnolResponse } from '../types';
import AIProcessingIndicator from './AIProcessingIndicator';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Step1Props {
  onComplete: (data: FnolResponse) => void;
}

const Step1_FNOL: React.FC<Step1Props> = ({ onComplete }) => {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [docs, setDocs] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedFnol, setGeneratedFnol] = useState<FnolResponse | null>(null);

  // Voice Recording State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const runSimulation = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const dummyText = "I was driving south on Main Street when a blue sedan ran a red light and hit my front driver side bumper. The impact was moderate, causing damage to the headlight and fender. No injuries were sustained, but the other driver seemed distracted.";
      setDescription(prev => prev + (prev ? " " : "") + dummyText);
    }, 3000);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition. We'll simulate a voice input for you.");
      runSimulation();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
           setDescription(prev => prev + (prev ? " " : "") + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
           alert("Microphone access was denied or is unavailable. Switching to simulation mode.");
           runSimulation();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      runSimulation();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleAnalyze = () => {
    if (!description && images.length === 0) {
      alert("Please provide at least a description or upload images.");
      return;
    }
    setIsAnalyzing(true);
  };

  const handleAIComplete = () => {
    const dummyFnol = getRandomItem(fnolResponses);
    setGeneratedFnol(dummyFnol);
    setIsAnalyzing(false);
    // Scroll to summary
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 page-transition pb-20">
      
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Incident Report</h2>
        <p className="text-gray-500 dark:text-gray-400">Upload evidence and describe the incident for AI intake.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Uploads */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Images */}
          <div className="hover-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="w-2 h-6 bg-brand-500 rounded-full mr-2"></span>
              Damage Photos
            </h3>
            <FileUpload 
              accept="image/*" 
              multiple 
              variant="image" 
              label="Upload Scene Photos" 
              subLabel="JPG, PNG • Min 2 photos recommended"
              onFilesSelected={(files) => setImages(prev => [...prev, ...files])} 
            />
          </div>

          {/* Description */}
          <div className="hover-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                  <span className="w-2 h-6 bg-purple-500 rounded-full mr-2"></span>
                  Incident Description
                </h3>
                {isListening && (
                  <span className="flex items-center text-xs text-red-500 font-bold animate-pulse">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    LISTENING...
                  </span>
                )}
             </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field-anim w-full h-32 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-0 transition-all resize-none outline-none"
              placeholder="Describe what happened in your own words, or use the voice recorder below..."
            ></textarea>
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>Min 50 characters recommended</span>
              <span>{description.length} chars</span>
            </div>
          </div>

           {/* Voice Recorder */}
           <div className={`
             transition-all duration-500 p-4 rounded-xl border flex items-center justify-between shadow-sm
             ${isListening 
               ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 shadow-[0_0_20px_rgba(239,68,68,0.2)] scale-[1.02]' 
               : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 border-gray-200 dark:border-gray-600 hover:shadow-md'}
           `}>
              <div className="flex items-center space-x-3">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-3 rounded-full transition-all duration-300 shadow-md ${
                    isListening 
                      ? 'bg-red-500 text-white animate-[pulse_1.5s_infinite] scale-110 hover:bg-red-600' 
                      : 'bg-white dark:bg-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-gray-600 hover:scale-110 hover:shadow-lg'
                  }`}
                >
                  {isListening ? <StopCircle size={24} /> : <Mic size={24} />}
                </button>
                <div>
                  <p className={`text-sm font-medium transition-colors ${isListening ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-200'}`}>
                    {isListening ? 'Recording in progress...' : 'Record Voice Note'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isListening ? 'Click stop to finish' : 'Tap mic to transcribe audio'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 h-8 opacity-80">
                 {isListening ? (
                   [...Array(12)].map((_, i) => (
                     <div 
                       key={i} 
                       className="w-1 bg-red-400 rounded-full" 
                       style={{ 
                         height: `${Math.random() * 80 + 20}%`,
                         animation: `bounce ${Math.random() * 0.4 + 0.3}s infinite alternate`
                       }}
                     ></div>
                   ))
                 ) : (
                   [...Array(12)].map((_, i) => (
                     <div key={i} className="w-1 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 group-hover:bg-gray-400" style={{ height: '20%' }}></div>
                   ))
                 )}
              </div>
           </div>

        </div>

        {/* Right Col: Other Files & Actions */}
        <div className="space-y-6">
          
          <div className="hover-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Video Evidence</h3>
            <FileUpload 
              accept="video/*" 
              variant="video" 
              label="Upload Dashcam/Video"
              subLabel="MP4, MOV up to 50MB"
              onFilesSelected={(files) => setVideos(prev => [...prev, ...files])}
            />
          </div>

          <div className="hover-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Documents</h3>
            <FileUpload 
              accept=".pdf,.doc,.docx,.txt" 
              multiple
              variant="document" 
              label="Police Report / Driver Info"
              subLabel="PDF, DOC"
              onFilesSelected={(files) => setDocs(prev => [...prev, ...files])}
            />
          </div>

        </div>
      </div>

      {isAnalyzing && (
        <AIProcessingIndicator onComplete={handleAIComplete} />
      )}

      {!isAnalyzing && generatedFnol && (
        <div className="glass-card p-0 overflow-hidden animate-slide-up mb-8 shadow-2xl dark:shadow-brand-900/20">
          {/* Header */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 border-b border-green-100 dark:border-green-900/30 flex justify-between items-center">
            <span className="flex items-center text-green-700 dark:text-green-400 font-bold text-lg">
              <CheckCircle2 className="mr-2 h-5 w-5" /> FNOL Summary Generated
            </span>
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30">
              Confidence: {(generatedFnol.confidence * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Claim Details */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
               <div>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Policy Number</p>
                 <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">{generatedFnol.policyNumber}</p>
               </div>
               <div>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Claim ID</p>
                 <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">{generatedFnol.id}</p>
               </div>
            </div>

            {/* Policyholder */}
            <div>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                 <User size={16} className="mr-2 text-brand-500" /> POLICYHOLDER
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div><span className="text-gray-500 block text-xs mb-0.5">Name</span> <span className="font-medium text-gray-900 dark:text-white">{generatedFnol.claimant}</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">Contact</span> <span className="font-medium text-gray-900 dark:text-white">(555) 123-4567</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">Email</span> <span className="font-medium text-gray-900 dark:text-white">{generatedFnol.claimant.toLowerCase().replace(' ', '.')}@email.com</span></div>
               </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700"></div>

            {/* Vehicle Info */}
            <div>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                 <Car size={16} className="mr-2 text-brand-500" /> VEHICLE INFORMATION
               </h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div><span className="text-gray-500 block text-xs mb-0.5">Make/Model</span> <span className="font-medium text-gray-900 dark:text-white">{generatedFnol.vehicleInfo.year} {generatedFnol.vehicleInfo.make} {generatedFnol.vehicleInfo.model}</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">VIN</span> <span className="font-medium font-mono text-gray-900 dark:text-white">1HGBH41JXMN109186</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">License Plate</span> <span className="font-medium font-mono text-gray-900 dark:text-white">ABC-1234</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">Color</span> <span className="font-medium text-gray-900 dark:text-white">Silver</span></div>
               </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700"></div>

            {/* Incident Details */}
            <div>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                 <MapPin size={16} className="mr-2 text-brand-500" /> INCIDENT DETAILS
               </h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div><span className="text-gray-500 block text-xs mb-0.5">Date</span> <span className="font-medium text-gray-900 dark:text-white">{generatedFnol.incidentDate}</span></div>
                  <div><span className="text-gray-500 block text-xs mb-0.5">Time</span> <span className="font-medium text-gray-900 dark:text-white">10:24 AM</span></div>
                  <div className="col-span-2"><span className="text-gray-500 block text-xs mb-0.5">Location</span> <span className="font-medium text-gray-900 dark:text-white">{generatedFnol.incidentLocation}</span></div>
               </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700"></div>

            {/* AI Summary */}
            <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-800">
               <h4 className="text-sm font-bold text-brand-700 dark:text-brand-300 mb-2 flex items-center">
                 <Sparkles size={16} className="mr-2" /> AI-EXTRACTED SUMMARY
               </h4>
               <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                 "{generatedFnol.damageDescription}"
               </p>
            </div>

            {/* Evidence */}
            <div>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                 <Paperclip size={16} className="mr-2 text-brand-500" /> EVIDENCE UPLOADED
               </h4>
               <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg"><ImageIcon size={14} className="mr-2 text-blue-500"/> {images.length || 4} photos</span>
                  <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg"><Film size={14} className="mr-2 text-purple-500"/> {videos.length || 1} video</span>
                  <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg"><FileText size={14} className="mr-2 text-orange-500"/> {docs.length || 2} documents</span>
               </div>
            </div>
          </div>
          
          {/* Footer Action */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
             <button 
               onClick={() => onComplete(generatedFnol)}
               className="btn-primary-anim flex items-center px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg hover:shadow-brand-500/30 text-lg group"
             >
               Continue to AI Triage
               <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
             </button>
          </div>
        </div>
      )}

      {/* Generate Button - Only show if not generated yet */}
      {!generatedFnol && (
        <div className="sticky bottom-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center z-10 transition-transform duration-300 hover:translate-y-[-2px]">
           <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Info size={16} className="mr-2 text-brand-500" />
              <span>AI will extract vehicle details automatically</span>
           </div>

           <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`btn-primary-anim flex items-center px-6 py-3 rounded-xl text-white font-medium
                ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 dark:bg-brand-600 hover:bg-gray-800 dark:hover:bg-brand-500'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing Evidence...
                </>
              ) : (
                <>
                  Generate FNOL Summary
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
        </div>
      )}

    </div>
  );
};

export default Step1_FNOL;