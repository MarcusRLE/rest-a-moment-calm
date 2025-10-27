import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const rainAudioRef2 = useRef<HTMLAudioElement>(null);
  const musicAudioRef = useRef<HTMLAudioElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleSound = () => {
    if (isSoundOn) {
      rainAudioRef.current?.pause();
      rainAudioRef2.current?.pause();
      musicAudioRef.current?.pause();
      setIsSoundOn(false);
    } else {
      rainAudioRef.current?.play();
      musicAudioRef.current?.play();
      setIsSoundOn(true);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

    // Handle visibility change to pause audio when page is hidden (mobile only)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause all audio
        rainAudioRef.current?.pause();
        rainAudioRef2.current?.pause();
        musicAudioRef.current?.pause();
      } else if (isSoundOn) {
        // Page is visible again and sound was on, resume playback
        rainAudioRef.current?.play().catch(() => {});
        musicAudioRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    if (isMobile) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    
    // Setup audio loops and volumes
    if (rainAudioRef.current) {
      rainAudioRef.current.loop = true;
      rainAudioRef.current.volume = 0.5; // 50% volume for rain
      
      // Crossfade setup for seamless looping
      const handleEnding = () => {
        const current = rainAudioRef.current;
        const backup = rainAudioRef2.current;
        
        if (current && backup) {
          // When main audio is near end (95%), start backup
          if (current.currentTime / current.duration > 0.95 && backup.paused) {
            backup.currentTime = 0;
            backup.play().catch(() => {});
          }
          
          // When main audio loops back, backup becomes the active one
          // Continue the pattern by preparing a new backup
        }
      };
      
      rainAudioRef.current.addEventListener('timeupdate', handleEnding);
    }
    
    if (rainAudioRef2.current) {
      rainAudioRef2.current.loop = true;
      rainAudioRef2.current.volume = 0.5; // 50% volume for rain clone
    }
    
    if (musicAudioRef.current) {
      musicAudioRef.current.loop = true;
      musicAudioRef.current.volume = 1; // 100% volume for music
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (isMobile) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [isSoundOn]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--bg-stop-1))] via-[hsl(var(--bg-stop-2))] to-[hsl(var(--bg-stop-3))] animate-gradient-drift bg-[length:400%_400%]">
      {/* Audio Elements */}
      <audio ref={rainAudioRef} src="/rain.mp3" preload="auto" />
      <audio ref={rainAudioRef2} src="/rain.mp3" preload="auto" />
      <audio ref={musicAudioRef} src="/music.mp3" preload="auto" />
      
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-16 p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        aria-label={isSoundOn ? "Turn sound off" : "Turn sound on"}
        title={isSoundOn ? "Turn sound off" : "Turn sound on"}
      >
        {isSoundOn ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </button>

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
