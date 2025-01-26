import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Wind, Brain, Music, Quote, ArrowLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

const BreathingExercise = () => {
  const [breathingState, setBreathingState] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      if (breathingState === 'ready') {
        setBreathingState('inhale');
        setCountdown(4);
      }

      timer = setTimeout(() => {
        if (progress >= 100) {
          // Reset progress and move to next state
          setProgress(0);
          setBreathingState(prev => {
            if (prev === 'inhale') {
              setCountdown(7);
              return 'hold';
            }
            if (prev === 'hold') {
              setCountdown(8);
              return 'exhale';
            }
            setCountdown(4);
            return 'inhale';
          });
        } else {
          // Update progress and countdown
          setProgress(prev => {
            const increment = breathingState === 'inhale' ? 25 : // 4 seconds
                            breathingState === 'hold' ? 14.3 : // 7 seconds
                            12.5; // 8 seconds
            return prev + increment;
          });
          
          setCountdown(prev => {
            const timeLeft = breathingState === 'inhale' ? 4 - (progress / 25) :
                           breathingState === 'hold' ? 7 - (progress / 14.3) :
                           8 - (progress / 12.5);
            return Math.max(1, Math.ceil(timeLeft));
          });
        }
      }, 1000); // Update every second instead of 100ms
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, progress, breathingState]);

  const getInstructions = () => {
    switch (breathingState) {
      case 'inhale':
        return 'Breathe In Deeply';
      case 'hold':
        return 'Hold Your Breath';
      case 'exhale':
        return 'Breathe Out Slowly';
      default:
        return 'Ready to Begin';
    }
  };

  const getScale = () => {
    if (!isActive) return 'scale-100';
    switch (breathingState) {
      case 'inhale':
        return `scale-${100 + (progress/2)}`;
      case 'hold':
        return 'scale-150';
      case 'exhale':
        return `scale-${150 - (progress/2)}`;
      default:
        return 'scale-100';
    }
  };

  const handleClick = () => {
    if (isActive) {
      setIsActive(false);
      setBreathingState('ready');
      setProgress(0);
      setCountdown(0);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="relative">
        {/* Background circle */}
        <div className="w-64 h-64 mx-auto rounded-full bg-blue-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Breathing circle */}
        <div
          className={`w-64 h-64 mx-auto rounded-full bg-blue-500 transition-transform duration-1000 ease-in-out relative flex items-center justify-center ${getScale()}`}
        >
          <div className="text-white flex flex-col items-center justify-center">
            <div className="text-2xl font-medium mb-2">{getInstructions()}</div>
            {isActive && breathingState !== 'ready' && (
              <>
                <div className="text-4xl font-bold mb-1">{countdown}</div>
                <div className="text-sm opacity-75">seconds</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleClick}
          size="lg"
          className="px-8 py-6 text-lg"
        >
          {isActive ? "Stop" : "Start Breathing Exercise"}
        </Button>
        
        {!isActive && (
          <div className="space-y-2 text-gray-600 max-w-md mx-auto">
            <p className="text-sm font-medium">
              4-7-8 Breathing Technique:
            </p>
            <ul className="text-sm list-disc list-inside">
              <li>Inhale deeply through your nose for 4 seconds</li>
              <li>Hold your breath for 7 seconds</li>
              <li>Exhale completely through your mouth for 8 seconds</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const affirmations = [
  "I am safe and well cared for",
  "This too shall pass",
  "I am stronger than I know",
  "Each breath brings me peace",
  "I trust in the healing process",
  "I am healthy",
  "I am perfect, whole, and complete",
  "I choose to be healthy",
  "I choose to be vibrant",
  "I choose to be whole",
  "Every cell in my body vibrates with life-giving energy",
  "My mind is sharp",
  "My body is in perfect working order",
  "I am healthy in mind, body, and spirit",
  "I am grateful for the healing that's happening right now",
  "I call forth perfect health",
  "I command healing energy to flow through me",
  "I let go of what doesn't serve me",
  "I give myself permission to heal",
  "I am healing inside and out",
  "I am patient with myself every day",
  "My body heals in its own time",
  "My body heals in divine order",
  "I believe in my ability to heal",
  "I deserve to be healthy",
  "I deserve to be happy",
  "I deserve to heal",
  "I deserve to live a full vibrant life",
  "My body is a temple of health and healing",
  "Now is the time to be healthy",
  "Now is the time to be healed",
  "Now is the time to be whole",
  "My body is in perfect alignment",
  "My body knows how to heal itself",
  "My body knows what to do",
  "My body knows what it needs",
  "The cells of my body tingle with positivity",
  "I command my body to be healthy",
  "I command my body to be whole",
  "I command my body to maintain and restore itself",
  "I listen to my body",
  "My body tells me what it needs",
  "I honor the wisdom of my body",
  "I trust my body to heal",
  "I love my body",
  "My body heals itself easily",
  "My body heals itself naturally",
  "My body is an intelligent energy system",
  "My body is a health-making machine",
  "My body is in harmony with itself",
  "My body is fueled by infinite intelligence",
  "My body is powered by infinite wisdom",
  "My body knows how to support itself",
  "My body knows how to sustain itself",
  "My body is attuned to the wisdom of the universe",
  "My body is in sync with nature",
  "My body is in harmony with the universe",
  "I am perfect, whole, and complete"
];

const sounds = [
  { name: "Rain", url: "/sounds/rain.mp3" },
  { name: "Ocean", url: "/sounds/ocean.mp3" },
  { name: "Forest", url: "/sounds/forest.mp3" },
  { name: "White Noise", url: "/sounds/white-noise.mp3" },
];

interface Sound {
  name: string;
  url: string;
}

const MeditationTimer = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeRemaining]);

  const startMeditation = (minutes: number) => {
    setSelectedTime(minutes);
    setTimeRemaining(minutes * 60);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetMeditation = () => {
    setSelectedTime(null);
    setSelectedSound(null);
    setTimeRemaining(0);
    setIsPlaying(false);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Selection - Moved to top */}
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 font-medium mb-2">Select Duration:</p>
        {[3, 5, 10].map((minutes) => (
          <Button
            key={minutes}
            variant={selectedTime === minutes ? "default" : "outline"}
            size="lg"
            className="py-6 text-lg"
            onClick={() => setSelectedTime(minutes)}
          >
            {minutes} Minutes
          </Button>
        ))}
      </div>

      {/* Sound Selection */}
      <div>
        <p className="text-gray-600 font-medium mb-4">Select Sound:</p>
        <div className="grid grid-cols-2 gap-4">
          {sounds.map((sound) => (
            <Button
              key={sound.name}
              variant={selectedSound?.name === sound.name ? "default" : "outline"}
              size="lg"
              className="py-4"
              onClick={() => {
                setSelectedSound(sound);
                if (audioRef.current) {
                  audioRef.current.src = sound.url;
                  if (isPlaying) {
                    audioRef.current.play();
                  }
                }
              }}
              disabled={!selectedTime}
            >
              {sound.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      {selectedTime && selectedSound && !timeRemaining && (
        <Button
          size="lg"
          className="w-full py-6 text-lg"
          onClick={() => startMeditation(selectedTime)}
        >
          Start Meditation
        </Button>
      )}

      {/* Timer Display */}
      {timeRemaining > 0 && (
        <div className="bg-blue-50 rounded-lg p-6 space-y-4">
          <div className="text-4xl font-bold text-center text-blue-800">
            {formatTime(timeRemaining)}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isPlaying ? 'Pause' : 'Resume'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={resetMeditation}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        loop
        hidden
      />
    </div>
  );
};

const MindfulMoments = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-change affirmation every 10 seconds with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // Wait for fade out, then change affirmation
      setTimeout(() => {
        const index = Math.floor(Math.random() * affirmations.length);
        setCurrentAffirmation(affirmations[index]);
        // Start fade in
        setIsVisible(true);
      }, 500); // Half of the transition duration
      
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Dashboard
              </Link>
            </div>
            <Link
              to="/games"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Go to Games
            </Link>
          </div>
        </div>
      </header>

      {/* Affirmation Banner with smooth transition */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <p 
                className={`text-2xl font-medium italic transition-opacity duration-1000 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                "{currentAffirmation}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Breathing Exercise */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <Wind className="text-blue-600" />
                Guided Breathing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <BreathingExercise />
            </CardContent>
          </Card>

          {/* Updated Meditation Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <Brain className="text-blue-600" />
                Meditation with Sounds
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <MeditationTimer />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MindfulMoments; 