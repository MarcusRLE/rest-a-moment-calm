import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Future audio hooks - ready for ambient sound or breath tones
    // setupAudio();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--bg-stop-1))] via-[hsl(var(--bg-stop-2))] to-[hsl(var(--bg-stop-3))] animate-gradient-drift bg-[length:400%_400%]">
      {/* Title */}
      <h1 className="text-foreground text-2xl md:text-3xl font-light tracking-[0.2em] mb-12 md:mb-16 uppercase opacity-90">
        Rest a moment
      </h1>

      {/* Breathing Circle */}
      <div
        className="relative w-[min(88vmin,900px)] h-[min(88vmin,900px)] rounded-full animate-breathe"
        style={{
          background: `radial-gradient(circle at center, hsl(var(--circle-center)), hsl(var(--circle-edge)))`,
          boxShadow: `0 0 60px 20px hsl(var(--circle-center) / 0.2)`,
        }}
        aria-label="Breathing circle"
      >
        {/* Golden Edge Ring */}
        <div
          className="absolute w-full h-full"
          style={{
            borderRadius: '100%',
            border: '5px solid hsl(var(--countdown-segment))',
            boxShadow: `0 0 30px hsl(var(--countdown-glow) / 0.6)`,
          }}
          aria-label="Golden edge ring"
        />

        {/* Inner Countdown Circles */}
        {[
          { x: 50, y: 10, anim: 'animate-inner-pulse-1' }, // Top
          { x: 87, y: 38, anim: 'animate-inner-pulse-2' }, // Top right
          { x: 73, y: 82, anim: 'animate-inner-pulse-3' }, // Bottom right
          { x: 26, y: 82, anim: 'animate-inner-pulse-4' }, // Bottom left
          { x: 13, y: 37, anim: 'animate-inner-pulse-5' }, // Top left
        ].map((position, index) => (
          <div
          key={index}
          className={`absolute w-10 h-10 rounded-full ${position.anim}`}
          style={{
            boxShadow: `0 0 30px hsl(var(--inner-circle-glow))`,
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
            // full-color fill; opacity is animated by the keyframes above
            background: 'radial-gradient(circle, hsl(var(--inner-circle)), hsl(var(--inner-circle) / 0.3))',
          }}
          aria-label={`Countdown circle ${index + 1}`}
        />
        ))}
      </div>
    </div>
  );
};

// Commented audio setup for future use
// function setupAudio() {
//   // Web Audio API context
//   // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   
//   // Example: Load ambient audio or generate soft tones
//   // const oscillator = audioContext.createOscillator();
//   // oscillator.type = 'sine';
//   // oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
//   
//   // Connect to gain for volume control
//   // const gainNode = audioContext.createGain();
//   // gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//   // oscillator.connect(gainNode);
//   // gainNode.connect(audioContext.destination);
//   
//   // Sync with breathing cycle (15s total)
//   // Schedule inhale/exhale sounds at 0s, 5s, 10s marks
// }

export default Index;
