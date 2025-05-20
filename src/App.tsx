import { useState, useEffect } from "react";
import { QRCodeButton } from "./components/QRCodeButton";
import { BurgerMenu } from "./components/BurgerMenu";
import { KanjiPage } from "./pages/KanjiPage";
import { VocabularyPage } from "./pages/VocabularyPage";
import { KanjiData } from "./types";

// Mock vocabulary data - replace with your actual vocabulary data
const vocabularyData = [
  { id: 1, word: "食べる", reading: "たべる", meaning: "to eat" },
  { id: 2, word: "飲む", reading: "のむ", meaning: "to drink" },
  { id: 3, word: "行く", reading: "いく", meaning: "to go" },
];

type PageType = "kanji" | "vocabulary";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("kanji");
  const [savedKanji, setSavedKanji] = useState<KanjiData[]>([]);

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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          日本語 N4 {currentPage === "kanji" ? "漢字" : "語彙"}
        </h1>

        {currentPage === "kanji" ? (
          <KanjiPage 
            loading={loading}
            setLoading={setLoading}
            savedKanji={savedKanji}
            setSavedKanji={setSavedKanji}
          />
        ) : (
          <VocabularyPage vocabularyData={vocabularyData} />
        )}
      </div>
      <QRCodeButton />
    </div>
  );
}

export default App;