import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Gamepad2, 
  Brain, 
  Target, 
  Puzzle, 
  Dices, 
  Swords,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const GameCard = ({ title, icon: Icon, description, path, comingSoon = true }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
      <CardTitle className="flex items-center gap-2 text-blue-800">
        <Icon size={20} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-gray-600 mb-4">{description}</p>
      {comingSoon ? (
        <span className="text-sm text-amber-600 font-medium">Coming Soon</span>
      ) : (
        <Link 
          to={path} 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Play Now →
        </Link>
      )}
    </CardContent>
  </Card>
);

const GamesPage = () => {
  const games = [
    {
      title: "Memory Match",
      icon: Brain,
      description: "Test your memory by matching pairs of cards. Improve focus and concentration.",
      path: "/games/memory",
      comingSoon: false
    },
    {
      title: "Word Search",
      icon: Target,
      description: "Find hidden medical terms and improve your vocabulary while having fun.",
      path: "/games/wordsearch"
    },
    {
      title: "Medical Trivia",
      icon: Puzzle,
      description: "Challenge yourself with interesting medical facts and knowledge.",
      path: "/games/trivia"
    },
    {
      title: "Stress Relief",
      icon: Dices,
      description: "Simple and relaxing games to help reduce anxiety while waiting.",
      path: "/games/stress-relief"
    },
    {
      title: "Health Quiz",
      icon: Swords,
      description: "Test your health knowledge with interactive quizzes.",
      path: "/games/quiz"
    },
    {
      title: "Wellness Journey",
      icon: Heart,
      description: "A calming adventure game focused on health and wellness.",
      path: "/games/wellness"
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <header className="w-full bg-white border-b shadow-sm">
        <div className="w-full">
          <div className="flex justify-between items-center h-14 px-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="text-blue-600" size={24} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Flow-Aid Games
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Link 
                to="/dashboard" 
                className="text-blue-600 hover:text-blue-800 px-3 py-2 font-medium transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage; 