import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { Camera, X, Zap, RefreshCw, ScanLine, Eye as Visibility } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Scanner = ({ onScanResult, onClose }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [lastDetected, setLastDetected] = useState('');
  const canvasRef = useRef(null);

  // 🔹 Normalization: Non-destructive cleaning
  const normalizeOCR = (input) => {
    return input.toUpperCase()
      .replace(/[^A-Z0-9-]/g, "") // Keep alphanumeric and hyphens only
      .trim();
  };

  const captureFrame = useCallback(() => {
    if (!webcamRef.current) return;
    
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // ROI Calculation (Matching the Sniper Box UI: 288x160px center)
    // Sniper Box: w=72 (18rem/288px), h=40 (10rem/160px) in CSS units
    const context = canvas.getContext('2d');
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // We want the center area. 
    // sniperW / totalW = 288 / 512 (max-w-lg is 512px)
    // sniperH / totalH = 160 / (screen aspect)
    // Better: We calculate relative to the container.
    const cropWidth = videoWidth * 0.6; // 60% of width
    const cropHeight = videoHeight * 0.3; // 30% of height
    const startX = (videoWidth - cropWidth) / 2;
    const startY = (videoHeight - cropHeight) / 2;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    context.drawImage(
      video,
      startX, startY, cropWidth, cropHeight, // Source
      0, 0, cropWidth, cropHeight // Destination
    );

    const imageSrc = canvas.toDataURL('image/jpeg', 0.9);
    processImage(imageSrc);
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
      setLastDetected(text.substring(0, 50).replace(/\n/g, ' ')); // UI Feedback
      
      // 🔹 Smart Extraction
      const potentialCodes = text.split(/\s+/)
        .map(w => normalizeOCR(w))
        .filter(w => w.length >= 6);

      if (potentialCodes.length > 0) {
        const chipPatterns = /^(K|H|J|S|T|MT|NH)/;
        const bestMatch = potentialCodes.find(c => chipPatterns.test(c)) || potentialCodes.reduce((a, b) => a.length > b.length ? a : b);
        
        if (bestMatch && bestMatch.length >= 6) {
          console.log('%c [OCR SUCCESS] Identified:', 'color: #10b981; font-weight: bold', bestMatch);
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
            captureFrame();
        }
    }, 4000); // Slightly slower auto-scan to allow focus
    return () => clearInterval(interval);
  }, [isScanning, captureFrame]);

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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white text-center p-8 z-50">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/50">
                    <X className="text-red-500" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Camera Error</h3>
                <p className="text-gray-400 text-sm mb-6">{cameraError}</p>
                <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">Go Back</button>
            </div>
        )}

        {/* Hidden Canvas for ROI Processing */}
        <canvas ref={canvasRef} className="hidden" />

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
          
          <div className="absolute bottom-32 text-center w-full">
             <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 mx-auto">
                <p className="text-white font-mono text-[10px] tracking-[0.2em] font-medium uppercase mb-1">
                    Center Code in Sniper Box
                </p>
                {lastDetected && (
                   <p className="text-emerald-400 text-[9px] font-bold animate-pulse truncate max-w-[200px]">
                     RAW: {lastDetected}
                   </p>
                )}
             </div>
          </div>

          {/* Manual Capture Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
             <button 
                onClick={captureFrame}
                className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/5 flex items-center justify-center group active:scale-90 transition-all"
             >
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-emerald-400 transition-colors flex items-center justify-center shadow-xl shadow-white/10">
                   <Camera size={28} className="text-black" />
                </div>
             </button>
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
