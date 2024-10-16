"use client";

import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

interface CameraAccessCheckProps {
  onResult: (hasAccess: boolean) => void;
}

export default function CameraAccessCheck({
  onResult,
}: CameraAccessCheckProps) {
  useEffect(() => {
    async function checkCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        onResult(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        onResult(false);
      }
    }

    checkCameraAccess();
  }, [onResult]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        <FormattedMessage id="play.checkingCamera" />
      </h2>
      <p>
        <FormattedMessage id="play.pleaseWait" />
      </p>
    </div>
  );
}
