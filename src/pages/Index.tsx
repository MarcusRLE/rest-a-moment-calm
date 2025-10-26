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
          boxShadow: `0 0 60px 20px hsl(var(--circle-center) / 0.3)`,
        }}
        aria-label="Breathing circle"
      />
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
