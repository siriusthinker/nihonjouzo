import { useState, useEffect } from 'react'
import { KanjiCard } from './components/KanjiCard'
import { Controls } from './components/Controls2'
import { LoadingSpinner } from './components/LoadingSpinner'
import { KanjiData } from './types'

function App() {
  const [kanji, setKanji] = useState<KanjiData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showMeaning, setShowMeaning] = useState<boolean>(false)
  const [gradeLevel, setGradeLevel] = useState<number>(1)
  const [savedKanji, setSavedKanji] = useState<KanjiData[]>([])

  const fetchRandomKanji = async () => {
    setLoading(true)
    setShowMeaning(false)
    setError(null)
    
    try {
      // First get a random kanji character
      const randomResponse = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${gradeLevel}`)
      const kanjiList = await randomResponse.json()
      const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)]
      
      // Then get details for that kanji
      const detailsResponse = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(randomKanji)}`)
      const details = await detailsResponse.json()
      
      setKanji({
        character: randomKanji,
        meanings: details.meanings,
        kun_readings: details.kun_readings,
        on_readings: details.on_readings,
        stroke_count: details.stroke_count,
        grade: gradeLevel
      })
    } catch (err) {
      setError('Failed to fetch kanji. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomKanji()
  }, [gradeLevel])

  const saveCurrentKanji = () => {
    if (kanji && !savedKanji.some(k => k.character === kanji.character)) {
      setSavedKanji([...savedKanji, kanji])
    }
  }

  const removeSavedKanji = (character: string) => {
    setSavedKanji(savedKanji.filter(k => k.character !== character))
  }

  if (loading && !kanji) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">日本語 漢字 Flashcards</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Controls 
          gradeLevel={gradeLevel}
          setGradeLevel={setGradeLevel}
          fetchRandomKanji={fetchRandomKanji}
          showMeaning={showMeaning}
          setShowMeaning={setShowMeaning}
          saveCurrentKanji={saveCurrentKanji}
          kanji={kanji}
          savedKanji={savedKanji}
        />

        {kanji && (
          <KanjiCard 
            kanji={kanji} 
            showMeaning={showMeaning} 
          />
        )}

        {savedKanji.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Saved Kanji</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {savedKanji.map(saved => (
                <div 
                  key={saved.character}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
                  onClick={() => setKanji(saved)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSavedKanji(saved.character)
                    }}
                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                  <div className="text-3xl text-center mb-2">{saved.character}</div>
                  <div className="text-sm text-gray-600 text-center">
                    {saved.meanings.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App