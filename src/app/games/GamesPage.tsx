import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { gamesData } from "./games-data";

type Game = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
};

const GameCard = ({ title, imageUrl, description, gameUrl }: Game) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
      <CardTitle className="flex items-center gap-2 text-blue-800">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-8 h-8 rounded object-cover"
        />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="aspect-video mb-4 overflow-hidden rounded-lg">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform"
        />
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <a 
        href={gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Play Now →
      </a>
    </CardContent>
  </Card>
);

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setProgress(20);
        
        // Simulate network delay in development
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(60);

        // Map the local games data
        const parsedGames: Game[] = gamesData.map(game => ({
          id: game.id,
          title: game.title,
          description: game.description,
          imageUrl: game.thumb,
          gameUrl: game.url
        }));

        setGames(parsedGames);
        setProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

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
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Progress value={progress} className="w-[60%] max-w-md" />
            <div className="text-gray-600">Loading games...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-600">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage; 