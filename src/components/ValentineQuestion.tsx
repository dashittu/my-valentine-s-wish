import { useState, useRef } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ValentineQuestion = () => {
  const navigate = useNavigate();
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [yesSize, setYesSize] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 120;
    const maxY = container.height - 60;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    setNoButtonStyle({
      position: "absolute",
      left: randomX,
      top: randomY,
      transition: "all 0.3s ease-out",
    });
    
    setYesSize((prev) => Math.min(prev + 0.1, 2));
  };

  const handleYesClick = () => {
    navigate("/slideshow");
  };

  return (
    <div className="min-h-screen bg-romantic-gradient flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="text-center z-10 max-w-2xl mx-auto">
        <div className="mb-8 animate-heart-beat inline-block">
          <Heart className="w-20 h-20 text-primary fill-primary mx-auto" />
        </div>
        
        <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-foreground mb-6 animate-fade-in">
          My Dearest Love
        </h1>
        
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
          Every moment with you is a treasure
        </p>
        
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-primary mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          Will you be my Valentine?
        </h2>
        
        <div 
          ref={containerRef}
          className="relative w-full h-40 flex items-center justify-center gap-6"
        >
          <Button
            onClick={handleYesClick}
            className="bg-button-gradient text-primary-foreground font-serif text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-romantic hover:shadow-float transition-all duration-300 animate-pulse-glow z-10"
            style={{ transform: `scale(${yesSize})` }}
          >
            Yes! 💕
          </Button>
          
          <Button
            ref={noButtonRef}
            variant="outline"
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="font-serif text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 rounded-full border-2 border-muted-foreground/30 text-muted-foreground hover:bg-transparent z-10"
            style={noButtonStyle}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValentineQuestion;
