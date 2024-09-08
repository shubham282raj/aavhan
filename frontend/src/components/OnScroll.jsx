import React, { useState, useEffect, useRef } from "react";

const ScrollTranslateComponent = ({
  element,
  from,
  to,
  opacity,
  time = "0.5s",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null); // Ref for the observed element

  // Use Intersection Observer to detect when the element is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Element is visible
        } else {
          setIsVisible(false); // Element is out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current); // Observe the element
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current); // Clean up observer
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        transform: isVisible ? to : from, // Animate from -100% to 0%
        opacity: opacity ? (isVisible ? "1" : "0") : "1",
        transition: "all " + time + " ease-out", // Smooth transition when it becomes visible
      }}
      className={className}
    >
      {element}
    </div>
  );
};

export default ScrollTranslateComponent;
