import React from 'react';

interface VineBackgroundProps {
  coverage: number; // 0-100 percentage
}

interface VinePath {
  id: string;
  path: string;
  delay: number; // Delay in seconds before this vine starts growing
  duration: number; // Duration in seconds for this vine to grow
  strokeWidth: number;
  strokeColor: string;
}

const VineBackground: React.FC<VineBackgroundProps> = ({ coverage }) => {
  // Predefined vine paths that grow in sequence
  const vinePaths: VinePath[] = [
    {
      id: 'vine-1',
      path: 'M 0 20 Q 50 10 100 30 Q 150 50 200 40 Q 250 30 300 50 Q 350 70 400 60 Q 450 50 500 70 Q 550 90 600 80 Q 650 70 700 90 Q 750 110 800 100 Q 850 90 900 110 Q 950 130 1000 120',
      delay: 0,
      duration: 8,
      strokeWidth: 3,
      strokeColor: 'hsl(120 40% 60%)'
    },
    {
      id: 'vine-2',
      path: 'M 0 200 Q 80 180 160 200 Q 240 220 320 200 Q 400 180 480 200 Q 560 220 640 200 Q 720 180 800 200 Q 880 220 960 200 Q 1040 180 1120 200',
      delay: 2,
      duration: 10,
      strokeWidth: 2.5,
      strokeColor: 'hsl(100 45% 55%)'
    },
    {
      id: 'vine-3',
      path: 'M 100 0 Q 150 50 200 0 Q 250 50 300 0 Q 350 50 400 0 Q 450 50 500 0 Q 550 50 600 0 Q 650 50 700 0 Q 750 50 800 0 Q 850 50 900 0',
      delay: 4,
      duration: 12,
      strokeWidth: 2,
      strokeColor: 'hsl(140 35% 65%)'
    },
    {
      id: 'vine-4',
      path: 'M 0 300 Q 60 280 120 300 Q 180 320 240 300 Q 300 280 360 300 Q 420 320 480 300 Q 540 280 600 300 Q 660 320 720 300 Q 780 280 840 300 Q 900 320 960 300 Q 1020 280 1080 300',
      delay: 6,
      duration: 9,
      strokeWidth: 2.5,
      strokeColor: 'hsl(110 50% 50%)'
    },
    {
      id: 'vine-5',
      path: 'M 200 0 Q 250 100 300 0 Q 350 100 400 0 Q 450 100 500 0 Q 550 100 600 0 Q 650 100 700 0 Q 750 100 800 0 Q 850 100 900 0',
      delay: 8,
      duration: 11,
      strokeWidth: 2,
      strokeColor: 'hsl(130 40% 60%)'
    },
    {
      id: 'vine-6',
      path: 'M 0 400 Q 100 380 200 400 Q 300 420 400 400 Q 500 380 600 400 Q 700 420 800 400 Q 900 380 1000 400 Q 1100 420 1200 400',
      delay: 10,
      duration: 13,
      strokeWidth: 3,
      strokeColor: 'hsl(120 45% 55%)'
    },
    {
      id: 'vine-7',
      path: 'M 50 0 Q 100 150 150 0 Q 200 150 250 0 Q 300 150 350 0 Q 400 150 450 0 Q 500 150 550 0 Q 600 150 650 0 Q 700 150 750 0 Q 800 150 850 0',
      delay: 12,
      duration: 10,
      strokeWidth: 2,
      strokeColor: 'hsl(140 35% 70%)'
    },
    {
      id: 'vine-8',
      path: 'M 0 500 Q 70 480 140 500 Q 210 520 280 500 Q 350 480 420 500 Q 490 520 560 500 Q 630 480 700 500 Q 770 520 840 500 Q 910 480 980 500 Q 1050 520 1120 500',
      delay: 14,
      duration: 12,
      strokeWidth: 2.5,
      strokeColor: 'hsl(100 50% 50%)'
    }
  ];

  // Calculate which vines should be visible based on coverage
  const getVisibleVines = () => {
    return vinePaths.map(vine => {
      const totalTime = vine.delay + vine.duration;
      const maxCoverageForVine = (totalTime / 30) * 100; // Assuming 30 minutes max
      
      if (coverage < vine.delay) {
        return { ...vine, opacity: 0, strokeDasharray: '0 1000' };
      }
      
      if (coverage >= vine.delay && coverage < totalTime) {
        const progress = (coverage - vine.delay) / vine.duration;
        const opacity = Math.min(1, progress * 2); // Fade in over first half
        const strokeDasharray = `${progress * 1000} 1000`;
        return { ...vine, opacity, strokeDasharray };
      }
      
      return { ...vine, opacity: 1, strokeDasharray: '1000 0' };
    });
  };

  const visibleVines = getVisibleVines();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="vineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {visibleVines.map(vine => (
          <path
            key={vine.id}
            d={vine.path}
            fill="none"
            stroke={vine.strokeColor}
            strokeWidth={vine.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={vine.strokeDasharray}
            opacity={vine.opacity}
            filter="url(#vineGlow)"
            style={{
              transition: 'opacity 0.5s ease-in-out, stroke-dasharray 0.3s ease-out'
            }}
          />
        ))}
        
        {/* Add some leaves at vine intersections */}
        {visibleVines.filter(vine => vine.opacity > 0.5).map((vine, index) => (
          <g key={`leaves-${vine.id}`}>
            {/* Leaf 1 */}
            <ellipse
              cx={200 + index * 150}
              cy={100 + index * 50}
              rx="8"
              ry="15"
              fill={vine.strokeColor}
              opacity={vine.opacity * 0.7}
              transform={`rotate(${index * 30} ${200 + index * 150} ${100 + index * 50})`}
              style={{
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
            {/* Leaf 2 */}
            <ellipse
              cx={400 + index * 120}
              cy={200 + index * 80}
              rx="6"
              ry="12"
              fill={vine.strokeColor}
              opacity={vine.opacity * 0.6}
              transform={`rotate(${index * -20} ${400 + index * 120} ${200 + index * 80})`}
              style={{
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default VineBackground;
