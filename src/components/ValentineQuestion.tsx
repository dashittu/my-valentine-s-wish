import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ValentineQuestion = () => {
  const navigate = useNavigate();

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
        
        <div className="flex flex-col items-center gap-8">
          <Button
            onClick={handleYesClick}
            className="bg-button-gradient text-primary-foreground font-serif text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-romantic hover:shadow-float transition-all duration-300 animate-pulse-glow z-10"
          >
            Yes! 💕
          </Button>
          
          <p className="font-serif text-lg sm:text-xl text-muted-foreground italic animate-fade-in opacity-0" style={{ animationDelay: "0.9s" }}>
            No is not an option because we are stuck together forever 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValentineQuestion;
