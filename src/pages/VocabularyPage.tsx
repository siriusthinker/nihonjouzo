import { useState } from "react";

type VocabularyItem = {
  id: number;
  word: string;
  reading: string;
  meaning: string;
};

type VocabularyPageProps = {
  vocabularyData: VocabularyItem[];
};

export const VocabularyPage = ({ vocabularyData }: VocabularyPageProps) => {
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const nextVocabulary = () => {
    setCurrentVocabIndex((prev) => (prev + 1) % vocabularyData.length);
    setShowDetails(false);
  };

  const prevVocabulary = () => {
    setCurrentVocabIndex(
      (prev) => (prev - 1 + vocabularyData.length) % vocabularyData.length
    );
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const currentVocabulary = vocabularyData[currentVocabIndex];

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
          className="flex-grow flex flex-col items-center justify-center cursor-pointer"
          onClick={toggleDetails}
        >
          {currentVocabulary && (
            <>
              <div 
                className="text-6xl md:text-7xl lg:text-8xl text-center mb-8 font-japanese text-black"
                style={{ lineHeight: "1.2" }}
              >
                {currentVocabulary.word}
              </div>
              
              {showDetails && (
                <div className="animate-fadeIn w-full text-center">
                  <div className="text-3xl md:text-4xl text-gray-600 mb-6 font-japanese">
                    {currentVocabulary.reading}
                  </div>
                  <div className="text-2xl md:text-3xl text-gray-800">
                    {currentVocabulary.meaning}
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
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            ← Prev
          </button>
          <button
            onClick={nextVocabulary}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};