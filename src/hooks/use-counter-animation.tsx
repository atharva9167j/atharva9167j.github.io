import { useState, useEffect, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  start?: boolean;
}

export const useCounterAnimation = ({
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  start = true
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const hasStarted = useRef<boolean>(false);
  
  useEffect(() => {
    // Only start animation if start is true and hasn't already started
    if (!start || hasStarted.current) return;
    
    // Mark as started to prevent restarting
    hasStarted.current = true;
    
    // Reset counter when animation starts
    countRef.current = 0;
    setCount(0);
    
    // Clear any existing animation
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
    }
    
    // Delay start if needed
    const delayTimeout = setTimeout(() => {
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smoother animation
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        // Calculate current count value
        const currentCount = easedProgress * end;
        countRef.current = currentCount;
        
        // Format with decimals
        const formattedCount = currentCount.toFixed(decimals);
        setCount(parseFloat(formattedCount));
        
        // Continue animation if not complete
        if (progress < 1) {
          timerRef.current = requestAnimationFrame(updateCounter);
        }
      };
      
      timerRef.current = requestAnimationFrame(updateCounter);
    }, delay);
    
    return () => {
      clearTimeout(delayTimeout);
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [end, duration, delay, decimals, start]);
  
  // Format the output with prefix and suffix
  const formattedCount = `${prefix}${count}${suffix}`;
  
  return formattedCount;
};