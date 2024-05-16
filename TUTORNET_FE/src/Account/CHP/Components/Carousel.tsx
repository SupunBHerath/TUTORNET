import React, { useState } from 'react';
import '../CHP.css';

interface CarouselItem {
  image: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={goToPrevSlide}>‹</button>
      <div className="carousel-content">
        {items.map((item, index) => (
          <div key={index} className={index === currentIndex ? 'slide active' : 'slide'}>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
      <button className="next" onClick={goToNextSlide}>›</button>
    </div>
  );
};

export default Carousel;
