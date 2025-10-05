
import React, { useEffect, useState } from "react";
import { Smartphone } from 'lucide-react';
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      if (isMobile) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("📲 To install, open browser menu and select 'Add to Home Screen'");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ User accepted install");
    } else {
      console.log("❌ User dismissed install");
    }

    setDeferredPrompt(null);
    setShowInstallButton(true);
  };

  if (!showInstallButton) return null;

  return (

<div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={handleInstallClick}
    className="group relative flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-medium rounded-2xl shadow-lg hover:shadow-2xl hover:from-black hover:to-gray-900 transform hover:scale-105 transition-all duration-300 ease-out border border-gray-800"
  > 
    <svg 
      className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
      />
    </svg>
    
    <span>Install App</span>
     
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-shine pointer-events-none" />
  </button>
</div>
  );
}

export default InstallPrompt;







    {/** <div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={handleInstallClick}
    className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
  >
    <Smartphone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
    <span>Install App</span>
  </button>
</div> */}  
