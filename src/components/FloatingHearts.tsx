import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
  delay: number;
}

const FloatingHearts = () => {
  const [bursts, setBursts] = useState<BurstHeart[][]>([]);

  useEffect(() => {
    // Create initial burst
    createBurst();
    
    // Create new bursts periodically
    const interval = setInterval(() => {
      createBurst();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const createBurst = () => {
    const centerX = 30 + Math.random() * 40; // Random center between 30-70%
    const centerY = 30 + Math.random() * 40;
    
    const newBurst: BurstHeart[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      size: 16 + Math.random() * 28,
      angle: (i * 30) + Math.random() * 20, // Spread in all directions
      distance: 150 + Math.random() * 200,
      delay: Math.random() * 0.3,
    }));

    setBursts((prev) => [...prev.slice(-3), newBurst]); // Keep last 4 bursts
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bursts.map((burst, burstIndex) =>
        burst.map((heart) => (
          <Heart
            key={`${burstIndex}-${heart.id}`}
            className="absolute text-primary fill-primary/40"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              width: heart.size,
              height: heart.size,
              animation: `burst-out 2.5s ease-out forwards`,
              animationDelay: `${heart.delay}s`,
              ["--angle" as string]: `${heart.angle}deg`,
              ["--distance" as string]: `${heart.distance}px`,
            }}
          />
        ))
      )}
      
      {/* Continuous gentle floating hearts in background */}
      {Array.from({ length: 8 }, (_, i) => (
        <Heart
          key={`float-${i}`}
          className="absolute text-primary/20 fill-primary/10"
          style={{
            left: `${10 + i * 12}%`,
            bottom: "-30px",
            width: 14 + Math.random() * 16,
            height: 14 + Math.random() * 16,
            animation: `float-up ${12 + i * 2}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
