import { useState, useEffect } from 'react';

const useCountUp = (end: number, duration: number = 1000, start: number = 0) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation (Quartic ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    if (end > start) {
        animationFrame = requestAnimationFrame(animate);
    } else {
        setCount(end);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
};

export default useCountUp;