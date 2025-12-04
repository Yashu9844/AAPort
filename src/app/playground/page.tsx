'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Trophy, Target, Zap } from 'lucide-react';

// Game 1: Click Precision - Premium accuracy game
const ClickPrecisionGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number; points: number }>>([]);
  const [combo, setCombo] = useState(0);
  const [missClick, setMissClick] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const gameActiveRef = useRef(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    gameActiveRef.current = true;
    setTargets([]);
    setCombo(0);
    setTimeout(() => spawnTarget(), 100);
  };

  const spawnTarget = () => {
    if (!gameActiveRef.current) return;
    
    const size = 40 + Math.random() * 40; // 40-80px
    const points = Math.round(100 - size); // Smaller = more points
    const newTarget = {
      id: Date.now() + Math.random(),
      x: 5 + Math.random() * 85,
      y: 5 + Math.random() * 85,
      size,
      points,
    };
    setTargets([newTarget]);
  };

  const handleTargetClick = (target: typeof targets[0], event: React.MouseEvent<HTMLButtonElement>) => {
    // Calculate click precision (distance from center)
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = event.clientX;
    const clickY = event.clientY;
    
    // Calculate distance from center
    const dx = clickX - centerX;
    const dy = clickY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = rect.width / 2; // Radius
    
    // Calculate precision multiplier based on distance from center
    // Center (0-25% radius) = 100% points (1.0x)
    // Middle ring (25-60% radius) = 70% points (0.7x)
    // Outer ring (60-100% radius) = 40% points (0.4x)
    const normalizedDistance = distance / maxDistance;
    let precisionMultiplier = 1.0;
    let hitZone = 'perfect';
    
    if (normalizedDistance <= 0.25) {
      precisionMultiplier = 1.0;
      hitZone = 'perfect';
    } else if (normalizedDistance <= 0.60) {
      precisionMultiplier = 0.7;
      hitZone = 'good';
    } else {
      precisionMultiplier = 0.4;
      hitZone = 'hit';
    }
    
    const earnedPoints = Math.round(target.points * precisionMultiplier);
    const newCombo = combo + 1;
    const bonusPoints = Math.floor(newCombo / 3) * 10; // Bonus every 3 hits
    
    setScore(s => s + earnedPoints + bonusPoints);
    setCombo(newCombo);
    setTargets([]);
    
    // Show hit feedback (optional: you can enhance this later)
    console.log(`Hit: ${hitZone} | Points: ${earnedPoints} | Distance: ${normalizedDistance.toFixed(2)}`);
    
    // Spawn next target immediately
    setTimeout(() => {
      spawnTarget();
    }, 200);
  };

  // Auto-remove targets after timeout and reset combo
  useEffect(() => {
    if (targets.length === 0 || !gameActive) return;

    const timeout = setTimeout(() => {
      if (!gameActiveRef.current) return;
      setTargets([]);
      setCombo(0);
      // Spawn new target after miss
      setTimeout(() => spawnTarget(), 200);
    }, 1800); // Faster disappear - 1.8 seconds

    return () => clearTimeout(timeout);
  }, [targets, gameActive]);

  const handleMissClick = () => {
    setCombo(0);
    setMissClick(true);
    setTimeout(() => setMissClick(false), 300);
  };

  // Timer
  useEffect(() => {
    if (!gameActive) {
      gameActiveRef.current = false;
      setTargets([]); // Clear targets when game ends
      return;
    }
    
    gameActiveRef.current = true;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          gameActiveRef.current = false;
          setTargets([]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameActive]);

  return (
    <div className="relative bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-accent font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5" />
          Click Precision
        </h3>
        <div className="flex gap-4 text-sm text-white/60">
          <span>Score: <span className="text-white font-bold">{score}</span></span>
          {gameActive && (
            <>
              <span>Time: <span className="text-white font-bold">{timeLeft}s</span></span>
              {combo > 0 && <span>Combo: <span className="text-yellow-400 font-bold">x{combo}</span></span>}
            </>
          )}
        </div>
      </div>

      {!gameActive ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-white/60 text-center max-w-md text-sm">Click targets fast! Hit the <span className="text-green-400">center</span> for full points, <span className="text-yellow-400">middle</span> for 70%, <span className="text-red-400">outer</span> for 40%. Build combos for bonuses!</p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Start Game</span>
          </button>
          {score > 0 && (
            <div className="text-center space-y-2">
              <p className="text-white/40 text-sm">Final Score</p>
              <p className="text-5xl font-bold text-white">{score}</p>
              {score >= 2000 && <p className="text-yellow-400 text-sm">🎯 Pixel Perfect!</p>}
              {score >= 1500 && score < 2000 && <p className="text-green-400 text-sm">⭐ Excellent!</p>}
              {score >= 1000 && score < 1500 && <p className="text-blue-400 text-sm">👍 Great!</p>}
            </div>
          )}
        </div>
      ) : (
        <div 
          ref={containerRef}
          onClick={handleMissClick}
          className={`flex-1 relative border border-white/[0.05] overflow-hidden cursor-crosshair transition-all duration-300 min-h-[400px] ${
            missClick ? 'bg-red-500/20' : 'bg-white/[0.03]'
          }`}
        >
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Targets */}
          {targets.map((target) => (
            <button
              key={target.id}
              onClick={(e) => {
                e.stopPropagation();
                handleTargetClick(target, e);
              }}
              className="absolute group transition-all duration-150 hover:scale-110 z-10 cursor-crosshair"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.size}px`,
                height: `${target.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 border-2 border-white/40 animate-ping" />
              
              {/* Outer ring (40% points) - Red tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-white/60 group-hover:border-white transition-all backdrop-blur-sm" />
              
              {/* Middle ring (70% points) - Yellow tint */}
              <div className="absolute inset-[20%] bg-gradient-to-br from-yellow-500/15 to-yellow-500/10 border border-white/50 group-hover:border-white/80 transition-all" />
              
              {/* Center zone (100% points) - Green tint */}
              <div className="absolute inset-[40%] bg-gradient-to-br from-green-500/20 to-green-500/15 border border-white/60 group-hover:border-white transition-all" />
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white -translate-x-1/2 -translate-y-1/2 group-hover:w-2 group-hover:h-2 transition-all" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/60 group-hover:border-white transition-all" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/60 group-hover:border-white transition-all" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/60 group-hover:border-white transition-all" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/60 group-hover:border-white transition-all" />
              
              {/* Points label */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-white font-mono whitespace-nowrap bg-black/50 px-2 py-0.5 border border-white/20">
                +{target.points}
              </div>
            </button>
          ))}

          {/* Combo indicator */}
          {combo >= 3 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-yellow-400 text-xl sm:text-2xl font-bold animate-pulse bg-black/60 px-4 py-2 border border-yellow-400/30">
              🔥 {combo}x COMBO!
            </div>
          )}
          
          {/* Instructions */}
          {targets.length === 0 && gameActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/40 text-sm animate-pulse">Get ready...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Game 2: Reaction Time Game - ENHANCED
const ReactionGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'tooearly'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    setGameState('waiting');
    const delay = Math.random() * 3000 + 1500; // 1.5-4.5 seconds
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setGameState('ready');
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      // Clicked too early
      setGameState('tooearly');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
      setGameState('result');
    }
  };

  const reset = () => {
    setGameState('idle');
    setReactionTime(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-accent font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Reaction Time
        </h3>
        {bestTime && (
          <div className="text-sm text-white/60">
            Best: <span className="text-white font-bold">{bestTime}ms</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {gameState === 'idle' && (
          <div className="text-center space-y-6">
            <p className="text-white/60 max-w-xs text-sm sm:text-base">Test your reaction speed! Click when the box turns green. Don't click too early!</p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Start</span>
            </button>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="w-full max-w-md space-y-4">
            <button
              onClick={handleClick}
              className="w-full aspect-square bg-red-500/20 border-4 border-red-500/50 flex items-center justify-center hover:bg-red-500/30 transition-all duration-200"
            >
              <span className="text-red-400 text-2xl sm:text-3xl font-bold">Wait...</span>
            </button>
            <p className="text-white/40 text-xs text-center">Wait for green, then click as fast as you can!</p>
          </div>
        )}

        {gameState === 'ready' && (
          <button
            onClick={handleClick}
            className="w-full max-w-md aspect-square bg-green-500/30 border-4 border-green-400 flex items-center justify-center hover:bg-green-500/40 transition-all duration-200 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
          >
            <span className="text-green-400 text-2xl sm:text-3xl font-bold animate-pulse">CLICK NOW!</span>
          </button>
        )}

        {gameState === 'tooearly' && (
          <div className="text-center space-y-6">
            <div className="w-full max-w-md aspect-square bg-orange-500/20 border-4 border-orange-500/50 flex items-center justify-center">
              <span className="text-orange-400 text-2xl sm:text-3xl font-bold">Too Early!</span>
            </div>
            <p className="text-white/60 text-sm">Wait for the box to turn green before clicking</p>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Try Again</span>
            </button>
          </div>
        )}

        {gameState === 'result' && (
          <div className="text-center space-y-6">
            <div>
              <p className="text-white/40 text-sm mb-2">Your Reaction Time</p>
              <p className="text-6xl sm:text-7xl font-bold text-white mb-2">{reactionTime}ms</p>
              <div className="text-2xl mb-4">
                {reactionTime! < 150 ? '🔥' : reactionTime! < 200 ? '⚡' : reactionTime! < 250 ? '💨' : reactionTime! < 300 ? '👍' : reactionTime! < 400 ? '😊' : '🐌'}
              </div>
              <p className="text-white/60 text-base">
                {reactionTime! < 150 ? 'INCREDIBLE! Superhuman reflexes!' :
                 reactionTime! < 200 ? 'Lightning Fast! Amazing!' :
                 reactionTime! < 250 ? 'Very Fast! Excellent!' :
                 reactionTime! < 300 ? 'Great reaction time!' :
                 reactionTime! < 400 ? 'Good! Keep practicing!' : 'Keep trying, you can do better!'}
              </p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Try Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Game 3: Memory Pattern Game - ENHANCED
const MemoryPatternGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [clickedBox, setClickedBox] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = () => {
    setScore(0);
    setSequence([]);
    setUserSequence([]);
    setGameActive(true);
    setIsCorrect(null);
    addToSequence([]);
  };

  const addToSequence = (currentSeq: number[]) => {
    const newSequence = [...currentSeq, Math.floor(Math.random() * 9)];
    setSequence(newSequence);
    setUserSequence([]);
    setIsCorrect(null);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Initial delay
    for (let i = 0; i < seq.length; i++) {
      setActiveBox(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveBox(null);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    setIsPlaying(false);
  };

  const handleBoxClick = (index: number) => {
    if (isPlaying || !gameActive) return;

    // Visual feedback
    setClickedBox(index);
    setTimeout(() => setClickedBox(null), 200);

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if wrong
    if (sequence[newUserSequence.length - 1] !== index) {
      setIsCorrect(false);
      setTimeout(() => {
        setGameActive(false);
      }, 800);
      return;
    }

    // Check if completed this round
    if (newUserSequence.length === sequence.length) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(() => {
        setIsCorrect(null);
        addToSequence(sequence);
      }, 1200);
    }
  };

  return (
    <div className="relative bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-accent font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Memory Pattern
        </h3>
        <div className="text-sm text-white/60">
          Level: <span className="text-white font-bold">{score}</span>
        </div>
      </div>

      {!gameActive ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-white/60 text-center max-w-xs">Watch the pattern, then repeat it! Each level adds one more step.</p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Start Game</span>
          </button>
          {score > 0 && (
            <div className="text-center space-y-2">
              <p className="text-white/40 text-sm">You reached level</p>
              <p className="text-5xl font-bold text-white">{score}</p>
              {score >= 10 && <p className="text-green-400 text-sm">🏆 Memory Master!</p>}
              {score >= 5 && score < 10 && <p className="text-blue-400 text-sm">⭐ Impressive!</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
          {/* Status message */}
          <div className="h-8 flex items-center justify-center">
            {isPlaying && (
              <p className="text-white/60 text-sm animate-pulse">Watch carefully...</p>
            )}
            {!isPlaying && userSequence.length === 0 && (
              <p className="text-white/60 text-sm">Your turn! Repeat the pattern</p>
            )}
            {!isPlaying && userSequence.length > 0 && userSequence.length < sequence.length && (
              <p className="text-green-400 text-sm">{userSequence.length} / {sequence.length}</p>
            )}
            {isCorrect === true && (
              <p className="text-green-400 text-sm font-bold animate-pulse">✓ Correct! Get ready...</p>
            )}
            {isCorrect === false && (
              <p className="text-red-400 text-sm font-bold">✗ Wrong pattern!</p>
            )}
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xs w-full">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <button
                key={i}
                onClick={() => handleBoxClick(i)}
                disabled={isPlaying}
                className={`aspect-square border-2 transition-all duration-200 ${
                  activeBox === i
                    ? 'bg-white/40 border-white scale-95 shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                    : clickedBox === i
                    ? 'bg-white/30 border-white/50 scale-95'
                    : userSequence.includes(i)
                    ? 'bg-green-500/20 border-green-500/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105'
                } ${
                  isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Box number (hidden in production, helpful for debugging) */}
                {/* <span className="text-white/20 text-xs">{i + 1}</span> */}
              </button>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="flex gap-1.5">
            {sequence.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < userSequence.length
                    ? 'bg-green-400 scale-110'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function PlaygroundPage() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const games = [
    { id: 0, component: <ClickPrecisionGame />, name: 'Click Precision', icon: Target },
    { id: 1, component: <ReactionGame />, name: 'Reaction Time', icon: Zap },
    { id: 2, component: <MemoryPatternGame />, name: 'Memory Pattern', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-6 md:top-8 left-6 md:left-8 z-50 group flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3 hover:border-white/30 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
        <span className="text-sm text-white/70 group-hover:text-white transition-colors tracking-wide uppercase text-[11px]">Back</span>
      </Link>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24">
        <div className="w-full max-w-6xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
              <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase font-light">
                Interactive
              </span>
              <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-accent text-white font-black mb-4 sm:mb-6">
              Playground
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto">
              Take a break and test your skills with these interactive mini-games
            </p>
          </motion.div>

          {/* Games Grid */}
          {selectedGame === null ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {games.map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedGame(game.id)}
                  className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-white/20 p-8 sm:p-10 transition-all duration-500 text-left"
                >
                  <game.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white/30 group-hover:text-white/60 mb-6 transition-colors" />
                  <h3 className="text-xl sm:text-2xl font-accent font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-sm text-white/60">Click to play →</p>
                  
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </button>
              <div className="min-h-[500px]">
                {games[selectedGame].component}
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
