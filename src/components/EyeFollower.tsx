'use client';

import { useState, useEffect, useRef } from 'react';

export default function EyeFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 2000); // Blink every 2-5 seconds

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
    const distance = Math.min(4, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 50);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div className="flex items-center justify-center" style={{ gap: '2px', pointerEvents: 'none' }}>
      {[0, 1].map((index) => (
        <div
          key={index}
          ref={index === 0 ? eyeRef : null}
          style={{
            width: '16px',
            height: '16px',
            minWidth: '16px',
            minHeight: '16px',
            maxWidth: '16px',
            maxHeight: '16px',
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '50%',
            border: '0.1px solid rgb(0, 0, 0)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
            transition: isBlinking ? 'transform 0.1s ease-in-out' : 'transform 0.15s ease-in-out',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'rgb(0, 0, 0)',
              transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
              transition: 'transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1)',
              willChange: 'transform',
            }}
          />
        </div>
      ))}
    </div>
  );
}
