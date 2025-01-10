import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the default browser install prompt
      setDeferredPrompt(e); // Save the event for later use
      setIsInstallable(true); // Enable the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the installation prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the saved prompt
      });
    }
  };

  return isInstallable ? (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handleInstallClick}
        className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm font-semibold"
      >
        <FiDownload className="text-lg" />
        Install App
      </button>
      <div className="tooltip tooltip-bottom" data-tip="Install this app for quick access">
        <span className="ml-2 text-gray-600 cursor-pointer text-sm">What's this?</span>
      </div>
    </div>
  ) : null; // Only show the button if installable
};

export default InstallAppButton;
