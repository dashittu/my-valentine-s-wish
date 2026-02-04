import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StarBurst {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

const ValentineQuestion = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<StarBurst[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleYesClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    
    // Create star burst
    const newStars: StarBurst[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i * 18) + Math.random() * 10,
      distance: 80 + Math.random() * 150,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 0.15,
    }));
    
    setStars(newStars);
    
    // Navigate after animation
    setTimeout(() => {
      navigate("/slideshow");
    }, 1200);
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
        
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <Button
              onClick={handleYesClick}
              className={`bg-button-gradient text-primary-foreground font-serif text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-romantic hover:shadow-float transition-all duration-300 z-10 ${
                isClicked ? "scale-110" : "animate-pulse-glow"
              }`}
            >
              Yes! 💕
            </Button>
            
            {/* Star burst effect */}
            {stars.map((star) => (
              <Star
                key={star.id}
                className="absolute left-1/2 top-1/2 text-gold fill-gold star-burst"
                style={{
                  width: star.size,
                  height: star.size,
                  ["--angle" as string]: `${star.angle}deg`,
                  ["--distance" as string]: `${star.distance}px`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>
          
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-muted-foreground italic animate-fade-in opacity-0" style={{ animationDelay: "0.9s" }}>
            No is not an option because we are stuck together forever 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValentineQuestion;
