import { Play, Pause, RotateCcw } from 'lucide-react';

interface MatchControlsProps {
  isOngoing: boolean;
  onToggleMatch: () => void;
  onReset: () => void;
  elapsedTime: string;
}

const MatchControls = ({
  isOngoing,
  onToggleMatch,
  onReset,
  elapsedTime,
}: MatchControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 my-4">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onToggleMatch}
          className={`flex items-center space-x-2 py-2 px-4 w-full sm:w-auto justify-center rounded-full transition-colors duration-300 ${
            isOngoing
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isOngoing ? <Pause size={20} /> : <Play size={20} />}
          <span className="text-sm sm:text-base">
            {isOngoing ? 'Pausar Partido' : 'Empezar Partido'}
          </span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 py-2 px-4 w-full sm:w-auto justify-center rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-300"
        >
          <RotateCcw size={20} />
          <span className="text-sm sm:text-base">Reiniciar Partido</span>
        </button>
      </div>

      <div className="text-lg sm:text-2xl font-bold">{elapsedTime}</div>
    </div>
  );
};

export default MatchControls;
