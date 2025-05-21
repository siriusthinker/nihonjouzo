import { useState, useEffect } from "react";
import { QRCodeButton } from "./components/QRCodeButton";
import { BurgerMenu } from "./components/BurgerMenu";
import { KanjiPage } from "./pages/KanjiPage";
import { VocabularyPage } from "./pages/VocabularyPage";
import { KanjiData } from "./types";
import goi from "./data/goi/goi.json";

// Mock vocabulary data - replace with your actual vocabulary data
const vocabularyData = goi;

type PageType = "kanji" | "vocabulary";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("kanji");
  const [savedKanji, setSavedKanji] = useState<KanjiData[]>([]);
  const [alwaysShowDetails, setAlwaysShowDetails] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 relative">
      <BurgerMenu 
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setMenuOpen={setMenuOpen}
      />

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            日本語 N4 {currentPage === "kanji" ? "漢字" : "語彙"}
          </h1>
          
          {currentPage === "vocabulary" && (
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
              <input
                type="checkbox"
                id="show-details"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                checked={alwaysShowDetails}
                onChange={() => setAlwaysShowDetails(!alwaysShowDetails)}
              />
              <label htmlFor="show-details" className="ml-2 text-sm font-medium text-gray-700">
                Always Show Details
              </label>
            </div>
          )}
        </div>

        {currentPage === "kanji" ? (
          <KanjiPage 
            loading={loading}
            setLoading={setLoading}
            savedKanji={savedKanji}
            setSavedKanji={setSavedKanji}
          />
        ) : (
          <VocabularyPage 
            vocabularyData={vocabularyData} 
            alwaysShowDetails={alwaysShowDetails}
          />
        )}
      </div>
      <QRCodeButton />
    </div>
  );
}

export default App;