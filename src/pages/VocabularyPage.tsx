import { useState, useRef, useEffect } from "react";

type VocabularyItem = {
  kana: string;
  kanji: string;
  english: string;
};

type VocabularyPageProps = {
  vocabularyData: VocabularyItem[];
  alwaysShowDetails: boolean;
};

export const VocabularyPage = ({ vocabularyData, alwaysShowDetails }: VocabularyPageProps) => {
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [dynamicFontSize, setDynamicFontSize] = useState('6xl');

  const nextVocabulary = () => {
    setCurrentVocabIndex((prev) => (prev + 1) % vocabularyData.length);
    if (!alwaysShowDetails) {
        setShowDetails(false);
      }
  };

  const prevVocabulary = () => {
    setCurrentVocabIndex(
      (prev) => (prev - 1 + vocabularyData.length) % vocabularyData.length
    );
    if (!alwaysShowDetails) {
        setShowDetails(false);
      }
  };

  const toggleDetails = () => {
    if (!alwaysShowDetails) {
        setShowDetails(!showDetails);
      }
  };

  const currentVocabulary = vocabularyData[currentVocabIndex];

  // Adjust font size based on text length (only for kana)
  useEffect(() => {
    if (textRef.current && !currentVocabulary?.kanji) {
      const text = currentVocabulary?.kana || '';
      // Count characters (adjust thresholds as needed)
      const charCount = text.length;
      
      if (charCount > 8) {
        setDynamicFontSize('36px');
      } else if (charCount > 5) {
        setDynamicFontSize('48px');
      } else {
        setDynamicFontSize('60px');
      }
    } else {
      // Reset to default when showing kanji
      setDynamicFontSize('60px');
    }
  }, [currentVocabIndex, currentVocabulary]);

  if (vocabularyData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-2xl text-gray-600">
            No vocabulary data available.
          </div>
          <div className="mt-4 text-gray-500">
            Please add vocabulary items to get started.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col"
        style={{ minHeight: "60vh" }}
      >
        {/* Clickable area covering the entire content space */}
        <div 
          className={`flex-grow flex flex-col items-center justify-center ${
            !alwaysShowDetails ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={toggleDetails}
        >
          {currentVocabulary && (
            <>
              <div 
                ref={textRef}
                className="md:text-7xl lg:text-8xl text-center mb-8 font-japanese text-black"
                style={{ lineHeight: "1.2", fontSize: dynamicFontSize }}
              >
                {currentVocabulary.kanji ? currentVocabulary.kanji : currentVocabulary.kana}
              </div>
              
              {showDetails && (
                <div className="animate-fadeIn w-full text-center">
                  <div className="text-3xl md:text-4xl text-gray-600 mb-6 font-japanese">
                    {currentVocabulary.kanji ? currentVocabulary.kana : ""}
                  </div>
                  <div className="text-2xl md:text-3xl text-gray-800">
                    {currentVocabulary.english}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Buttons positioned at the bottom */}
        <div className="flex justify-between w-full mt-auto pt-6">
          <button
            onClick={prevVocabulary}
            onDoubleClick={(e) => e.preventDefault()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            ← Prev
          </button>
          <button
            onClick={nextVocabulary}
            onDoubleClick={(e) => e.preventDefault()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};