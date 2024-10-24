import { Action, Player } from '../types';

interface ActionLogProps {
  actions: Action[];
  players: Player[];
}

const ActionLog = ({ actions, players }: ActionLogProps) => {
  const getPlayerName = (playerId: number) => {
    const player = players.find((p) => p.id === playerId);
    return player ? player.name : 'Jugador desconocido';
  };

  const formatTimestamp = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Resumen</h2>
      <div className="space-y-2">
        {actions.length === 0 && <h3>No hay acciones todavía</h3>}
        {actions.map((action) => (
          <div key={action.id} className="flex items-center space-x-2">
            <span className="text-gray-500">
              {formatTimestamp(action.timestamp)}
            </span>
            <span className="font-semibold">
              {action.playerId ? getPlayerName(action.playerId) : "Rival"}
            </span>
            <span className="capitalize">
              {action.type.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionLog;
