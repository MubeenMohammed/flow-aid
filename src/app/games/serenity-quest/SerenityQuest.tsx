import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  Trees, 
  Stars, 
  Mountain,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Environment = {
  id: string;
  title: string;
  icon: any;
  description: string;
  preview: string;
  ambientSound: string;
};

const environments: Environment[] = [
  {
    id: "tropical-island",
    title: "Tropical Island",
    icon: Waves,
    description: "Gentle waves, palm trees swaying, and seashells scattered along the shore.",
    preview: "/environments/beach.gif",
    ambientSound: "/sounds/ocean-waves.mp3"
  },
  {
    id: "enchanted-forest",
    title: "Enchanted Forest",
    icon: Trees,
    description: "Sunlight streaming through trees, glowing plants, and chirping birds.",
    preview: "/environments/forest.gif",
    ambientSound: "/sounds/forest-sounds.mp3"
  },
  {
    id: "starry-galaxy",
    title: "Starry Galaxy",
    icon: Stars,
    description: "A serene space with floating stars, constellations, and soothing cosmic sounds.",
    preview: "/environments/space.gif",
    ambientSound: "/sounds/space-ambient.mp3"
  },
  {
    id: "mountain-meadow",
    title: "Mountain Meadow",
    icon: Mountain,
    description: "Rolling hills, wildflowers, and a gentle breeze.",
    preview: "/environments/mountain.gif",
    ambientSound: "/sounds/meadow-breeze.mp3"
  }
];

const EnvironmentCard = ({ environment, onSelect }: { environment: Environment; onSelect: (env: Environment) => void }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(environment)}
  >
    <Card className="cursor-pointer overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={environment.preview} 
          alt={environment.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log(`Failed to load image: ${target.src}`);
            target.src = 'https://placehold.co/600x400/EEE/31343C?text=Loading...';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center gap-2">
            <environment.icon size={20} />
            <h3 className="text-lg font-semibold">{environment.title}</h3>
          </div>
          <p className="text-sm opacity-90 mt-1">{environment.description}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const SerenityQuest = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);

  const handleEnvironmentSelect = (environment: Environment) => {
    setSelectedEnvironment(environment);
    // TODO: Navigate to the selected environment experience
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <header className="w-full bg-white border-b shadow-sm">
        <div className="w-full">
          <div className="flex justify-between items-center h-14 px-4">
            <div className="flex items-center space-x-2">
              <Link to="/games" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Serenity Quest
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Peaceful Environment</h2>
            <p className="text-gray-600">Select a calming space to begin your mindfulness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {environments.map((env) => (
              <EnvironmentCard
                key={env.id}
                environment={env}
                onSelect={handleEnvironmentSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerenityQuest; 