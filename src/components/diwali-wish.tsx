"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Gift } from "lucide-react";

const BokehCircle = () => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const size = Math.random() * 80 + 20; // 20px to 100px
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5; // 5s to 10s
    const color = `hsla(${Math.random() * 60 + 30}, 90%, 60%, 0.5)`;

    setStyle({
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    });
  }, []);

  return <div className="bokeh-circle" style={style}></div>;
};

const Diya = ({ className }: { className?: string }) => (
    <div className={`relative flex flex-col items-center ${className}`}>
        <div className="w-4 h-6 bg-gradient-to-b from-orange-400 to-yellow-500 rounded-t-full rounded-b-[50%_10px] diya-flame"></div>
        <div className="w-12 h-5 bg-yellow-700 rounded-b-full border-2 border-yellow-800 shadow-inner"></div>
    </div>
);

export function DiwaliWish({ from }: { from?: string }) {
  const [doorsOpen, setDoorsOpen] = useState(false);

  const handleOpenDoors = () => {
    setDoorsOpen(true);
  };

  const greeting = "Happy Diwali!";

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-lg md:max-w-xl h-[80vh] max-h-[550px] sm:h-[600px] bg-yellow-900/20 rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-700/50">
      
      {/* Background and Wish Content */}
      <div className="absolute inset-0 diwali-background flex flex-col items-center justify-center text-center p-8 transition-opacity duration-1000" style={{ opacity: doorsOpen ? 1 : 0 }}>
        {doorsOpen && Array(15).fill(0).map((_, i) => <BokehCircle key={`bokeh-${i}`} />)}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-10" style={{ fontFamily: "'Lobster', cursive" }}>
          {greeting}
        </h1>
        <p className="mt-4 text-md sm:text-lg text-yellow-100/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] z-10">
          May the festival of lights fill your life with joy, prosperity, and happiness.
        </p>
        {from && (
            <p className="mt-8 text-sm text-yellow-200/80 z-10">
                From your friend,<br/>
                <span className="font-bold text-lg">{from}</span>
            </p>
        )}
        <div className="absolute bottom-4 w-full flex justify-between px-4 sm:px-8 z-10">
            <Diya />
            <Diya />
        </div>
      </div>

      {/* Door Frame */}
      <div className="absolute inset-0 border-[15px] sm:border-[20px] border-[#6b4623] rounded-xl pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]"></div>
      <div className="absolute top-0 h-16 sm:h-20 w-full bg-[#6b4623] z-10 flex items-center justify-center">
          <div className="h-full w-24 bg-repeat-x" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M 0 12 Q 6 0, 12 12 T 24 12' stroke='%23fef08a' stroke-width='2' fill='none'/%3E%3C/svg%3E")`}}></div>
      </div>
       <div className="absolute bottom-0 h-16 sm:h-20 w-full bg-[#6b4623] z-10 flex items-center justify-center">
          <div className="h-full w-24 bg-repeat-x" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M 0 12 Q 6 24, 12 12 T 24 12' stroke='%23fef08a' stroke-width='2' fill='none'/%3E%3C/svg%3E")`}}></div>
      </div>
      
      {/* Doors */}
      <div className={`absolute inset-0 door-container flex z-10 transition-all duration-500 ${doorsOpen ? 'pointer-events-none' : ''}`}>
        <div className={`door left w-1/2 h-full bg-[#85582c] border-r-2 border-black/20 flex items-center justify-center mandala-pattern ${doorsOpen ? "open" : ""}`}>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#6b4623] flex items-center justify-center shadow-lg"><Sparkles className="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8"/></div>
        </div>
        <div className={`door right w-1/2 h-full bg-[#85582c] border-l-2 border-black/20 flex items-center justify-center mandala-pattern ${doorsOpen ? "open" : ""}`}>
           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#6b4623] flex items-center justify-center shadow-lg"><Sparkles className="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8"/></div>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className={`absolute z-30 bottom-10 flex flex-col items-center p-4 transition-opacity duration-500 ${doorsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Button onClick={handleOpenDoors} size="lg" className="bg-gradient-to-br from-orange-400 to-red-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-full">
              <Gift className="mr-2"/>
              Open Your Diwali Surprise
          </Button>
      </div>
    </div>
  );
}
