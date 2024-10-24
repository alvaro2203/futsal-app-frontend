import { useState, useEffect } from 'react';
import Header from './components/Header';
import PlayerList from './components/PlayerList';
import MatchControls from './components/MatchControls';
import ScoreBoard from './components/ScoreBoard';
import ActionLog from './components/ActionLog';
import { Player, Action, Match } from './types';

const initialPlayers: Player[] = [
  { id: 1, name: 'Aitor', number: 1 },
  { id: 2, name: 'Peru', number: 5 },
  { id: 3, name: 'Adri', number: 11 },
  { id: 4, name: 'Ochoa', number: 8 },
  { id: 5, name: 'Apa', number: 22 },
];

const teamPlayers: Player[] = [
  { id: 1, name: 'Aitor', number: 1 },
  { id: 2, name: 'Peru', number: 5 },
  { id: 3, name: 'Adri', number: 11 },
  { id: 4, name: 'Ochoa', number: 8 },
  { id: 5, name: 'Apa', number: 22 },
  { id: 6, name: 'Christian', number: 10 },
  { id: 7, name: 'Mini', number: 7 },
  { id: 8, name: 'Borja', number: 6 },
  { id: 9, name: 'Mario', number: 15 },
];

const initialMatch: Match = {
  id: 1,
  opponent: 'Rival FC',
  date: new Date().toISOString(),
  isOngoing: false,
  score: { home: 0, away: 0 },
  actions: [],
};

function App() {
  const [fieldPlayers, setFieldPlayers] = useState<Player[]>(initialPlayers);
  const [match, setMatch] = useState<Match>(initialMatch);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (match.isOngoing) {
      interval = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [match.isOngoing]);

  const addGoal = (team: "home" | "away") => {
    const newAction: Action = {
      id: match.actions.length + 1,
      type: "gol",
      timestamp: elapsedTime,
    };

    setMatch((prevMatch) => {
      return {
        ...prevMatch,
        actions: [...prevMatch.actions, newAction],
        score: {
          ...prevMatch.score,
          [team]: prevMatch.score[team] + 1,
        },
      };
    });
  };

  const handlePlayerAction = (playerId: number, actionType: string) => {
    if (!match.isOngoing) return;

    const newAction: Action = {
      id: match.actions.length + 1,
      playerId,
      type: actionType as Action['type'],
      timestamp: elapsedTime,
    };

    setMatch((prevMatch) => {
      const newScore = { ...prevMatch.score };
      if (actionType === 'gol') {
        newScore.home += 1;
      }

      return {
        ...prevMatch,
        actions: [...prevMatch.actions, newAction],
        score: newScore,
      };
    });
  };

  const toggleMatch = () => {
    setMatch((prevMatch) => ({
      ...prevMatch,
      isOngoing: !prevMatch.isOngoing,
    }));
  };

  const resetMatch = () => {
    setMatch(initialMatch);
    setElapsedTime(0);
  };

  const formatElapsedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <main className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <ScoreBoard
              homeScore={match.score.home}
              awayScore={match.score.away}
              opponent={match.opponent}
            />
            <MatchControls
              isOngoing={match.isOngoing}
              onToggleMatch={toggleMatch}
              onReset={resetMatch}
              elapsedTime={formatElapsedTime(elapsedTime)}
              addGoal={addGoal}
            />
            <PlayerList
              fieldPlayers={fieldPlayers}
              setFieldPlayers={setFieldPlayers}
              allPlayers={teamPlayers}
              onPlayerAction={handlePlayerAction}
            />
          </div>
          <ActionLog actions={match.actions} players={teamPlayers} />
        </div>
      </main>
    </div>
  );
}

export default App;
