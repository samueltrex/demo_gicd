import React, { useState, useEffect, useRef } from "react";

interface StatCounterProps {
  key?: string;
  targetNumber?: number;
  textValue?: string;
  suffix: string;
  label: string;
}

export function StatCounter({ targetNumber, textValue, suffix, label }: StatCounterProps) {
  const [count, setCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (targetNumber === undefined) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animateCount();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetNumber]);

  const animateCount = () => {
    if (targetNumber === undefined) return;
    let start = 0;
    const duration = 1500; // 1.5s total animation duration
    const stepTime = Math.max(Math.floor(duration / targetNumber), 15);
    
    // For large numbers, increase step amount to prevent trailing delay
    const totalSteps = duration / stepTime;
    const increment = Math.ceil(targetNumber / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
  };

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm min-w-0 w-full hover:border-[#F5C518]/30 transition-all duration-300"
      id={`stat-card-${label.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className={`font-sans font-black ${textValue ? 'text-base sm:text-xl md:text-2xl' : 'text-2xl sm:text-4xl md:text-5xl'} text-[#F5C518] tracking-tight leading-none`}>
        {textValue ? (
          <span>{textValue}</span>
        ) : (
          <>
            <span>{count.toLocaleString()}</span>
            <span className="text-white/90 ml-0.5">{suffix}</span>
          </>
        )}
      </div>
      <div className="text-[9px] sm:text-[10px] text-white/50 font-mono tracking-wider sm:tracking-widest mt-1.5 sm:mt-2 uppercase leading-snug max-w-full">
        {label}
      </div>
    </div>
  );
}
