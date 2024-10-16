"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CameraAccessCheck from "@/components/CameraAccessCheck";
import CalibrationScreen from "@/components/CalibrationScreen";
import GameSelection from "@/components/GameSelection";

enum PlayState {
  CheckingCamera,
  Calibrating,
  SelectingGame,
}

export default function Play() {
  const [playState, setPlayState] = useState<PlayState>(
    PlayState.CheckingCamera
  );
  const router = useRouter();

  const handleCameraAccessResult = (hasAccess: boolean) => {
    if (!hasAccess) {
      router.push("/setup");
    } else {
      setPlayState(PlayState.Calibrating);
    }
  };

  const handleCalibrationComplete = () => {
    setPlayState(PlayState.SelectingGame);
  };

  const handleGameSelection = (game: string, timeLimit: string) => {
    router.push(`/user/play/${game}/${timeLimit}`);
  };

  return (
    <div className="container mx-auto px-4">
      {playState === PlayState.CheckingCamera && (
        <CameraAccessCheck onResult={handleCameraAccessResult} />
      )}
      {playState === PlayState.Calibrating && (
        <CalibrationScreen onCalibrationComplete={handleCalibrationComplete} />
      )}
      {playState === PlayState.SelectingGame && (
        <GameSelection onGameSelect={handleGameSelection} />
      )}
    </div>
  );
}
