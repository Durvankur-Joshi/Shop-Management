import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event for later
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Reset the prompt
      });
    }
  };

  return isInstallable ? (
    <button onClick={handleInstallClick} className="btn btn-primary">
      <FiDownload />
      Install App
    </button>
  ) : null;
};

export default InstallAppButton;
