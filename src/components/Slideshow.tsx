import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder images - replace these with your actual photos
const photos = [
  {
    url: "/placeholder.svg",
    caption: "Our first adventure together ❤️",
  },
  {
    url: "/placeholder.svg",
    caption: "That magical sunset we shared 🌅",
  },
  {
    url: "/placeholder.svg",
    caption: "Making memories every day 💕",
  },
  {
    url: "/placeholder.svg",
    caption: "My favorite smile in the world 😊",
  },
  {
    url: "/placeholder.svg",
    caption: "Forever grateful for you 💝",
  },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-romantic-gradient flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Audio element - replace src with your music file */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        autoPlay
      >
        {/* Add your music file here */}
        {/* <source src="/your-music-file.mp3" type="audio/mpeg" /> */}
      </audio>

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-primary fill-primary animate-heart-beat" />
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-foreground">
            Our Love Story
          </h1>
          <Heart className="w-8 h-8 text-primary fill-primary animate-heart-beat" />
        </div>
      </div>

      {/* Slideshow Container */}
      <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-float bg-card z-10">
        <div
          className={`w-full h-full transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className="w-full h-full object-cover"
          />
          
          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
            <p className="font-serif text-xl sm:text-2xl text-primary-foreground text-center">
              {photos[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="rounded-full w-12 h-12 border-2 border-primary/30 hover:bg-primary/10"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary" />
          ) : (
            <Play className="w-5 h-5 text-primary" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="rounded-full w-12 h-12 border-2 border-primary/30 hover:bg-primary/10"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-primary" />
          ) : (
            <Volume2 className="w-5 h-5 text-primary" />
          )}
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6 z-10">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>

      {/* Instructions */}
      <p className="font-serif text-muted-foreground text-center mt-8 max-w-md z-10">
        💡 Tip: Replace the placeholder images with your own photos and add your favorite song!
      </p>
    </div>
  );
};

export default Slideshow;
