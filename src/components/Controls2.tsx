import { KanjiData } from '../types'

type ControlsProps = {
  gradeLevel: number
  setGradeLevel: (level: number) => void
  fetchRandomKanji: () => void
  showMeaning: boolean
  setShowMeaning: (show: boolean) => void
  saveCurrentKanji: () => void
  kanji: KanjiData | null
  savedKanji: KanjiData[]
}

export const Controls2 = ({
  gradeLevel,
  setGradeLevel,
  fetchRandomKanji,
  showMeaning,
  setShowMeaning,
  saveCurrentKanji,
  kanji,
  savedKanji
}: ControlsProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="grade" className="text-gray-700">Grade Level:</label>
          <select
            id="grade"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5, 6, 8].map(grade => (
              <option key={grade} value={grade}>{grade === 8 ? 'Secondary' : grade}</option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={fetchRandomKanji}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Next Kanji
          </button>
          
          <button
            onClick={() => setShowMeaning(!showMeaning)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            {showMeaning ? 'Hide Meaning' : 'Show Meaning'}
          </button>
          
          {kanji && !savedKanji.some(k => k.character === kanji.character) && (
            <button
              onClick={saveCurrentKanji}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  )
}