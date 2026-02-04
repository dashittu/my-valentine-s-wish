import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 10,
    size: 12 + Math.random() * 24,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary/30 fill-primary/20"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            width: heart.size,
            height: heart.size,
            animation: `float-up ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
