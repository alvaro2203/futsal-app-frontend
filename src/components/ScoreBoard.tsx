interface ScoreBoardProps {
  homeScore: number;
  awayScore: number;
  opponent: string;
}

const ScoreBoard = ({ homeScore, awayScore, opponent }: ScoreBoardProps) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-2">Puntuación</h2>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Local</p>
          <p className="text-4xl font-bold">{homeScore}</p>
        </div>
        <div className="text-4xl font-bold">-</div>
        <div className="text-center">
          <p className="text-lg font-semibold">{opponent}</p>
          <p className="text-4xl font-bold">{awayScore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
