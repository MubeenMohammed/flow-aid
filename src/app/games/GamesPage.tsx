import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { gamesData } from "./games-data";
import { SearchBar } from "./components/SearchBar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Game = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
};

const GameCard = ({ title, imageUrl, description, gameUrl }: Game) => (
  <Card className="group relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md bg-white">
    <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
      <CardTitle className="flex items-center gap-2 text-blue-800">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-8 h-8 rounded object-cover shadow-sm"
        />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="aspect-video mb-4 overflow-hidden rounded-lg shadow-inner">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <a 
        href={gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        Play Now →
      </a>
    </CardContent>
    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Card>
);

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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
        setFilteredGames(parsedGames);
        setProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Add search functionality
  useEffect(() => {
    const filtered = games.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery, games]);

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
          <div className="flex flex-col items-center justify-center h-[calc(100vh-theme(spacing.14))]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-600">{error}</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <SearchBar 
              onSearch={setSearchQuery}
              className="mb-8"
            />

            {/* No Results Message */}
            {filteredGames.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No games found matching "{searchQuery}"
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search or browse all games
                </p>
              </div>
            )}

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage; 