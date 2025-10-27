import { useState, useEffect, useRef } from 'react';

interface SessionTimerState {
  elapsedTime: number;
  coverage: number; // 0-100 percentage
}

const SESSION_STORAGE_KEY = 'rest-a-moment-session';
const MAX_SESSION_TIME = 30 * 60 * 1000; // 2 minutes in milliseconds (for testing - change back to 30 * 60 * 1000 for production)

export const useSessionTimer = (): SessionTimerState => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Load existing session data
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    let sessionStartTime: number;
    
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      sessionStartTime = sessionData.startTime;
    } else {
      sessionStartTime = Date.now();
      // Save new session start time
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        startTime: sessionStartTime
      }));
    }

    startTimeRef.current = sessionStartTime;

    // Calculate initial elapsed time
    const initialElapsed = Date.now() - sessionStartTime;
    setElapsedTime(initialElapsed);

    // Start timer
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        setElapsedTime(elapsed);
        
        // Update localStorage periodically
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          startTime: startTimeRef.current
        }));
      }
    }, 1000); // Update every second

    // Handle visibility change to pause/resume
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // Page is visible, resume timer
        if (!intervalRef.current && startTimeRef.current) {
          intervalRef.current = setInterval(() => {
            if (startTimeRef.current) {
              const elapsed = Date.now() - startTimeRef.current;
              setElapsedTime(elapsed);
            }
          }, 1000);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Calculate coverage percentage (0-100)
  const coverage = Math.min(100, (elapsedTime / MAX_SESSION_TIME) * 100);

  return {
    elapsedTime,
    coverage
  };
};
