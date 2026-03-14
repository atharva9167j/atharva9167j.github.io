import { useState, useRef, useEffect } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVisibleState, setIsVisibleState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsVisibleState(true);
    return () => setIsVisibleState(false);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = -e.deltaY;
        const zoomStep = 0.1;
        setScale(prev => Math.min(Math.max(1, prev + (delta > 0 ? zoomStep : -zoomStep)), 5));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1 && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 transition-opacity duration-300 touch-none ${isVisibleState ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute top-6 right-6 flex gap-4 z-10">
        <button 
          onClick={resetZoom}
          className="text-foreground/50 hover:text-primary transition-colors uppercase text-xs font-sans tracking-widest bg-background/50 backdrop-blur-md px-3 py-2 border border-border/50"
        >
          Reset
        </button>
        <button 
          onClick={onClose}
          className="text-foreground/50 hover:text-foreground transition-colors uppercase text-xs font-sans tracking-widest bg-background/50 backdrop-blur-md px-3 py-2 border border-border/50"
        >
          Close ✕
        </button>
      </div>

      <div 
        className={`relative overflow-hidden w-full h-full flex items-center justify-center cursor-${scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-transform duration-75 select-none pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/50 backdrop-blur-md border border-border/50 px-6 py-3 rounded-full flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/40">Zoom</span>
          <input 
            type="range" 
            min="1" 
            max="5" 
            step="0.1" 
            value={scale} 
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-32 h-1 bg-border/50 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-[10px] font-sans text-foreground/60 w-8">{scale.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
};
