import { useEffect, useState } from 'react';
import { Player } from '../types';

interface PlayerListProps {
  fieldPlayers: Player[];
  setFieldPlayers: (fieldPlayersList: Player[]) => void;
  allPlayers: Player[];
  onPlayerAction: (playerId: number, actionType: string) => void;
}

const PlayerList = ({
  fieldPlayers,
  onPlayerAction,
  allPlayers,
  setFieldPlayers,
}: PlayerListProps) => {
  const [clickedPlayerID, setClickedPlayerID] = useState<number | null>(null);
  const [clickedChange, setClickedChange] = useState<boolean>(false);
  const fieldPlayersId = new Set(fieldPlayers.map((player) => player.id));
  const benchPlayers = allPlayers.filter(
    (player) => !fieldPlayersId.has(player.id)
  );

  useEffect(
    () => setClickedChange(false),
    [clickedPlayerID, setClickedPlayerID]
  );

  function handleSelect(incomingPlayerId: number, leavingPlayerId: number) {
    const incomingPlayer = allPlayers.find(
      (player) => player.id === incomingPlayerId
    );

    const leavingPlayer = allPlayers.find(
      (player) => player.id === leavingPlayerId
    );

    if (!leavingPlayer || !incomingPlayer) return;

    const leavingPlayerIndex = fieldPlayers.findIndex(
      (player) => player.id === leavingPlayerId
    );

    if (leavingPlayerIndex !== -1) {
      const updatedFieldPlayers = [...fieldPlayers];
      updatedFieldPlayers[leavingPlayerIndex] = incomingPlayer;

      setFieldPlayers(updatedFieldPlayers);
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {fieldPlayers.map((player) => (
        <div
          key={player.id}
          className='bg-white rounded-lg shadow-md p-4 flex flex-col '
        >
          <div
            className='grid grid-cols-2 place-items-center'
            onClick={() =>
              setClickedPlayerID(
                player.id !== clickedPlayerID ? player.id : null
              )
            }
          >
            <p className='font-semibold'>{player.name} - {player.number}</p>
          </div>

          {clickedPlayerID === player.id && (
            <div className='mt-2 space-y-2'>
              <button
                onClick={() => setClickedChange(!clickedChange)}
                className='w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors duration-300'
              >
                Cambio
              </button>
              {clickedChange && (
                <div>
                  <select
                    name='jugadores-banquillo'
                    id='seleccionar-jugadores'
                    onChange={(event) =>
                      handleSelect(parseInt(event.target.value), player.id)
                    }
                    className='w-full block text-sm rounded py-2 p-2.5 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option defaultValue={0}>Selecciona un jugador</option>
                    {benchPlayers.map((benchPlayer) => (
                      <option key={benchPlayer.id} value={benchPlayer.id}>
                        {benchPlayer.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() => onPlayerAction(player.id, 'gol')}
                className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-300'
              >
                Gol
              </button>
              <button
                onClick={() => onPlayerAction(player.id, 'asistencia')}
                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300'
              >
                Asistencia
              </button>
              <button
                onClick={() => onPlayerAction(player.id, 'amarilla')}
                className='w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors duration-300'
              >
                Amarilla
              </button>
              <button
                onClick={() => onPlayerAction(player.id, 'roja')}
                className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors duration-300'
              >
                Roja
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
