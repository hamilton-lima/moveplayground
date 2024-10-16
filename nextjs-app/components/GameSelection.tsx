"use client";

import { FormattedMessage } from "react-intl";

interface GameSelectionProps {
  onGameSelect: (game: string, timeLimit: string) => void;
}

export default function GameSelection({ onGameSelect }: GameSelectionProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        <FormattedMessage id="play.gameSelection" />
      </h2>
      <p className="mb-4">
        <FormattedMessage id="play.readyToPlay" />
      </p>
      <div className="space-y-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onGameSelect("user-catch-ball", "2minutes")}
        >
          <FormattedMessage id="play.userCatchBall2Min" />
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onGameSelect("user-catch-ball", "no-time-limit")}
        >
          <FormattedMessage id="play.userCatchBallFreeTime" />
        </button>
      </div>
    </div>
  );
}
