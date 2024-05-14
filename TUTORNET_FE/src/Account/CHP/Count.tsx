import React, { useState, useEffect } from 'react'; 

interface CounterProps {
  maxCount: number;
}

const Counter: React.FC<CounterProps> = ({ maxCount }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < maxCount) {
        setCount(count + 1); // Increase count by 50 every interval
      }
    }, 50); // Decreased interval to make it faster

    return () => clearInterval(interval);
  }, [count, maxCount]);

  return (
    <span className="counter">
      {count.toLocaleString()} {/* Adds commas to large numbers for better readability */}
    </span>
  );
};

export default Counter; 