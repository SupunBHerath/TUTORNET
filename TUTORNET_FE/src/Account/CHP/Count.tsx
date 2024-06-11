import React, { useState, useEffect } from 'react'; 

interface CounterProps {
  maxCount: number;
}

const Counter: React.FC<CounterProps> = ({ maxCount }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < maxCount) {
        setCount(count + 1);
      }
    }, 50); 
    return () => clearInterval(interval);
  }, [count, maxCount]);

  return (
    <span className="counter">
      {count.toLocaleString()} 
    </span>
  );
};

export default Counter; 