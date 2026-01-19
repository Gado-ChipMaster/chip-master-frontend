import React from 'react';

const Button = ({ children, className = "", onClick, gradientColor = "#10B981" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientColor} 0%, ${adjustColor(gradientColor, -20)} 100%)`
      }}
    >
      {children}
    </button>
  );
};

// Helper to darken color for gradient
const adjustColor = (color, amount) => {
    return color; // Simplified for now, just returns same color. 
    // In a real app we'd parse hex and adjust rgb.
}

export default Button;
