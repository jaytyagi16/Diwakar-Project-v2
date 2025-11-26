import React, { useState, useRef, useEffect } from 'react';
import { Mic, ArrowRight, Loader2, Info, StopCircle, Waveform } from 'lucide-react';
import FileUpload from './FileUpload';
import { fnolResponses } from '../data/dummyData';
import { getRandomItem, wait } from '../utils/helpers';
import { FnolResponse } from '../types';

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
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
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

  const handleAnalyze = async () => {
    if (!description && images.length === 0) {
      alert("Please provide at least a description or upload images.");
      return;
    }
    
    setIsAnalyzing(true);
    await wait(2500); 
    
    const dummyFnol = getRandomItem(fnolResponses);
    setGeneratedFnol(dummyFnol);
    setIsAnalyzing(false);
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

      {/* Action Bar */}
      <div className="sticky bottom-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center z-10 transition-transform duration-300 hover:translate-y-[-2px]">
         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Info size={16} className="mr-2 text-brand-500" />
            <span>AI will extract vehicle details automatically</span>
         </div>

         {!generatedFnol ? (
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
         ) : (
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="text-right hidden sm:block">
                 <p className="text-xs text-gray-500 uppercase font-semibold">FNOL Generated</p>
                 <p className="text-sm font-bold text-gray-900 dark:text-white">Confidence: {(generatedFnol.confidence * 100).toFixed(0)}%</p>
              </div>
              <button 
                onClick={() => onComplete(generatedFnol)}
                className="btn-primary-anim flex items-center px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg hover:shadow-green-500/30"
              >
                Continue to AI Triage
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
         )}
      </div>

      {/* Generated Summary Card Preview */}
      {generatedFnol && (
        <div className="animate-slide-up bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-gray-800 p-6 rounded-2xl border border-brand-100 dark:border-brand-900/50 relative overflow-hidden shadow-lg">
           <div className="relative z-10">
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Generated FNOL Summary</h3>
               <span className="bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full text-xs font-mono border border-brand-200 dark:border-brand-700">
                 {generatedFnol.id}
               </span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Policy", value: generatedFnol.policyNumber },
                  { label: "Vehicle", value: `${generatedFnol.vehicleInfo.year} ${generatedFnol.vehicleInfo.make} ${generatedFnol.vehicleInfo.model}` },
                  { label: "Est. Damage", value: generatedFnol.estimatedDamage },
                  { label: "Location", value: generatedFnol.incidentLocation }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                     <p className="text-xs text-gray-500">{item.label}</p>
                     <p className="font-semibold dark:text-gray-200 truncate">{item.value}</p>
                  </div>
                ))}
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">AI Extracted Details:</p>
                <div className="flex flex-wrap gap-2">
                   {generatedFnol.aiExtractedDetails.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-700 dark:text-gray-300 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                        {tag}
                      </span>
                   ))}
                </div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Step1_FNOL;