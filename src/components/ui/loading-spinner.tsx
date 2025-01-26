import 'ldrs/cardio';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <l-cardio 
        size="60" 
        stroke="3" 
        speed="1" 
        color="rgb(59 130 246)" // Tailwind blue-500
      />
      <div className="flex items-center gap-2">
        <div className="text-lg font-medium text-gray-700">Loading Games</div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 