// Add this near your other imports
import { useState } from 'react';

// Add this component before your App component
export const QRCodeButton = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showQR && (
        <div className="bg-white p-4 rounded-lg shadow-xl mb-2 border border-gray-200">
          <p className="text-sm font-medium text-center mb-2 text-gray-500">Buy Me a Coffee ☕</p>
          <img 
            src="/nihonjouzo/qr-code.png" 
            alt="Buy Me a Coffee" 
            className="w-32 h-32 mx-auto"
          />
          <p className="text-xs text-gray-500 text-center mt-1">Scan to support</p>
        </div>
      )}
      <button
        onClick={() => setShowQR(!showQR)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        <span>☕</span>
        <span className="ml-2 text-xs">Buy Me a Coffee</span>
      </button>
    </div>
  );
};