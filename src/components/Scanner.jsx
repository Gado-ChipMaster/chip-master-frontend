import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { Camera, X, Zap, RefreshCw, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Scanner = ({ onScanResult, onClose }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraError, setCameraError] = useState(null);

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
      // Filter for potential chip codes (alphanumeric, 4+ chars)
      const potentialCodes = text.split(/\s+/)
        .map(w => w.replace(/[^A-Z0-9-]/gi, '').toUpperCase())
        .filter(w => w.length >= 4 && !['THE', 'AND', 'CHIP', 'MADE', 'CHINA'].includes(w));

      if (potentialCodes.length > 0) {
        // Return the best candidate (longest or most complex)
        const bestMatch = potentialCodes.reduce((a, b) => a.length > b.length ? a : b);
        onScanResult(bestMatch);
      }
    } catch (err) {
      console.error("OCR Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    // Auto-scan every 3 seconds if active
    const interval = setInterval(() => {
        if (!isScanning && webcamRef.current) {
            capture();
        }
    }, 3000);
    return () => clearInterval(interval);
  }, [isScanning, capture]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg aspect-[9/16] md:aspect-[3/4] bg-black rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/20"
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-emerald-400 font-mono text-xs tracking-widest">LIVE FEED</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera Feed */} // Added error handling for camera
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          videoConstraints={{ facingMode: "environment" }}
          onUserMediaError={(e) => setCameraError("Camera permission denied")}
        />

        {cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-center p-4">
                <p>{cameraError}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-emerald-500 rounded">Close</button>
            </div>
        )}

        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Aiming Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 border-2 border-emerald-400/50 rounded-lg flex items-center justify-center">
             <div className="w-full h-[1px] bg-emerald-500/50" />
             <div className="h-full w-[1px] bg-emerald-500/50 absolute" />
             
             {/* Scanning Line Animation */}
             <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-1 bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.8)]"
             />
          </div>
          
          <div className="absolute bottom-20 left-0 right-0 text-center">
             <p className="text-white/80 font-mono text-sm bg-black/60 inline-block px-3 py-1 rounded">
                ALIGN CHIP IN BOX
             </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3"
            >
              <RefreshCw className="text-emerald-400 animate-spin" size={20} />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-emerald-400 mb-1 font-mono">
                   <span>PROCESSING</span>
                   <span>{progress}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-emerald-400"
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
