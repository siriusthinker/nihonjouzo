import { KanjiData, LocalKanjiData } from "../types";

interface ControlsProps {
    currentSet: number;
    setCurrentSet: (set: number) => void;
    fetchRandomKanji: () => void;
    fetchPreviousKanji: () => void; // New prop
    showMeaning: boolean;
    setShowMeaning: (show: boolean) => void;
    saveCurrentKanji: () => void;
    kanji: KanjiData | null;
    savedKanji: KanjiData[];
    allKanjiSets: Array<{ id: number; name: string; data: LocalKanjiData[] }>;
    randomMode: boolean; // New prop
    setRandomMode: (mode: boolean) => void; // New prop
}

export function Controls({
    currentSet,
    setCurrentSet,
    fetchRandomKanji,
    fetchPreviousKanji,
    showMeaning,
    setShowMeaning,
    saveCurrentKanji,
    kanji,
    savedKanji,
    allKanjiSets,
    randomMode,
    setRandomMode,
}: ControlsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kanji Set
                    </label>
                    <select
                        value={currentSet}
                        onChange={(e) => setCurrentSet(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {allKanjiSets.map((set) => (
                            <option key={set.id} value={set.id}>
                                {set.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Random Mode Toggle */}
                <div className="flex items-center justify-end md:justify-start">
                    <label className="inline-flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-gray-700">
                            Random Order
                        </span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={randomMode}
                                onChange={() => setRandomMode(!randomMode)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                {/* Previous Button - Disabled in random mode */}
                <button
                    onClick={fetchPreviousKanji}
                    disabled={randomMode}
                    className={`px-4 py-2 rounded-md ${
                        randomMode 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                >
                    Previous
                </button>

                <button
                    onClick={fetchRandomKanji}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Next Kanji
                </button>

                {/* Uncomment if you want to use these buttons later */}
                {/*
                <button
                    onClick={() => setShowMeaning(!showMeaning)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    {showMeaning ? "Hide Meaning" : "Show Meaning"}
                </button>

                <button
                    onClick={saveCurrentKanji}
                    disabled={
                        !kanji || savedKanji.some((k) => k.character === kanji.character)
                    }
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
                >
                    Save Kanji
                </button>
                */}
            </div>
        </div>
    );
}