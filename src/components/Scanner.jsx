import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { Camera, X, Zap, RefreshCw, ScanLine, Visibility, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Scanner = ({ onScanResult, onClose }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // 🔹 Normalization: Fixing common OCR errors (mirroring Android logic)
  const normalizeOCR = (input) => {
    return input.toUpperCase()
      .replace(/O/g, "0")
      .replace(/I/g, "1")
      .replace(/L/g, "1")
      .replace(/S/g, "5")
      .replace(/B/g, "8")
      .replace(/Z/g, "2")
      .replace(/[^A-Z0-9-]/g, ""); // Keep alphanumeric and hyphens
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    }
  }, [webcamRef]);

  const processImage = async (imageSrc) => {
    setIsScanning(true);
    setProgress(0);
    try {
      const result = await Tesseract.recognize(
        imageSrc,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(parseInt(m.progress * 100));
            }
          }
        }
      );
      
      const text = result.data.text;
      
      // 🔹 Smart Extraction: Target chip patterns (e.g., KLM... from Samsung)
      const potentialCodes = text.split(/\s+/)
        .map(w => normalizeOCR(w))
        .filter(w => {
          // Safety logic: must be at least 6 chars for a chip code
          if (w.length < 6) return false;
          // Filter out generic words
          const blocked = ['THE', 'AND', 'CHIP', 'MADE', 'CHINA', 'SERIES'];
          return !blocked.includes(w);
        });

      if (potentialCodes.length > 0) {
        // Find the most "chip-like" code (usually starts with K, H, J, S, T)
        const chipPatterns = /^(K|H|J|S|T|MT|NH)/;
        const bestMatch = potentialCodes.find(c => chipPatterns.test(c)) || potentialCodes.reduce((a, b) => a.length > b.length ? a : b);
        
        if (bestMatch.length >= 6) {
          onScanResult(bestMatch);
        }
      }
    } catch (err) {
      console.error("OCR Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        if (!isScanning && webcamRef.current) {
            capture();
        }
    }, 3000);
    return () => clearInterval(interval);
  }, [isScanning, capture]);

  const videoConstraints = {
    facingMode: "environment",
    // Simulation of better capture
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg aspect-[9/16] md:aspect-[3/4] bg-black rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/20"
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded bg-black/50 border ${isHighContrast ? 'border-cyan-400 text-cyan-400' : 'border-emerald-500/30 text-emerald-400'} font-mono text-[10px] tracking-widest uppercase`}>
              {isHighContrast ? 'HI-CONTRAST ACTIVE' : 'LIVE FEED'}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsHighContrast(!isHighContrast)}
              className={`p-2 rounded-xl transition-all ${isHighContrast ? 'bg-cyan-500 text-black' : 'bg-black/50 text-white hover:bg-white/10'}`}
              title="Toggle High Contrast"
            >
              <Zap size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-black/50 text-white rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Camera Feed with High Contrast Simulation */}
        <div className={`w-full h-full transition-all duration-300 ${isHighContrast ? 'grayscale contrast-200 brightness-125' : ''}`}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={videoConstraints}
            onUserMediaError={(e) => setCameraError("Camera permission denied. Please enable camera access in your browser settings.")}
          />
        </div>

        {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white text-center p-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/50">
                    <X className="text-red-500" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Camera Error</h3>
                <p className="text-gray-400 text-sm mb-6">{cameraError}</p>
                <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">Go Back</button>
            </div>
        )}

        {/* 🎯 Sniper Box Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className={`relative w-72 h-40 border-2 ${isHighContrast ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-emerald-500/30'} rounded-2xl`}>
            {/* Corner Accents */}
            <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 ${isHighContrast ? 'border-cyan-400' : 'border-emerald-400'} rounded-tl-xl`} />
            <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 ${isHighContrast ? 'border-cyan-400' : 'border-emerald-400'} rounded-tr-xl`} />
            <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 ${isHighContrast ? 'border-cyan-400' : 'border-emerald-400'} rounded-bl-xl`} />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 ${isHighContrast ? 'border-cyan-400' : 'border-emerald-400'} rounded-br-xl`} />
            
            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[2px] bg-red-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-4 bg-red-500" />
            
            {/* Scanning Line Animation */}
            <motion.div 
              animate={{ top: ['5%', '95%', '5%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute left-2 right-2 h-[2px] ${isHighContrast ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]'}`}
            />
          </div>
          
          <div className="absolute bottom-24 text-center">
             <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                <p className="text-white font-mono text-[10px] tracking-[0.2em] font-medium uppercase">
                    Center Code in Sniper Box
                </p>
             </div>
          </div>
        </div>

        {/* Progress & Feedback Indicator */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl"
            >
              <div className="relative">
                <RefreshCw className="text-emerald-400 animate-spin" size={24} />
                <div className="absolute inset-0 bg-emerald-400/20 blur-lg animate-pulse rounded-full" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-emerald-400 mb-1.5 font-black uppercase tracking-widest">
                   <span>Analyzing Frame</span>
                   <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                   />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Scanner;
