import { useState, useEffect, useRef } from "react";
import { KanjiCard } from "./components/KanjiCard";
import { Controls } from "./components/Controls";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { KanjiData, LocalKanjiData } from "./types";
import set1 from "./data/N4_kanji_1_10.json"; // Contains exactly 10 kanji
import set2 from "./data/N4_kanji_11_20.json"; // Contains exactly 10 kanji
import set3 from "./data/N4_kanji_21_30.json";
import set4 from "./data/N4_kanji_31_40.json";
import set5 from "./data/N4_kanji_41_50.json";
import set6 from "./data/N4_kanji_51_60.json";
// Import other sets as needed

// Combine all sets with their identifiers
const allKanjiSets = [
	{ id: 1, name: "Set 1", data: set1 },
	{ id: 2, name: "Set 2", data: set2 },
    { id: 3, name: "Set 3", data: set3 },
	{ id: 4, name: "Set 4", data: set4 },
    { id: 5, name: "Set 5", data: set5 },
	{ id: 6, name: "Set 6", data: set6 },
	// Add more sets as needed
];

function App() {
	const [kanji, setKanji] = useState<KanjiData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showMeaning, setShowMeaning] = useState<boolean>(false);
	const [currentSet, setCurrentSet] = useState<number>(1); // Default to Set 1
	const [savedKanji, setSavedKanji] = useState<KanjiData[]>([]);
	const [currentKanjiList, setCurrentKanjiList] = useState<KanjiData[]>([]);
	const [showDetails, setShowDetails] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);

    // Load kanji when set changes
	useEffect(() => {
		loadCurrentSet();
	}, [currentSet]);

	// Fetch first kanji when list is ready
	useEffect(() => {
		if (currentKanjiList.length > 0) {
			fetchRandomKanji();
		}
	}, [currentKanjiList]);

	// Convert local data format to app's expected format
	const convertToKanjiData = (localData: LocalKanjiData): KanjiData => {
		return {
			character: localData.kanji,
			meanings: [localData.meaning],
			kun_readings: localData.kunyomi.map(
				(k) => `${k.kanji} (${k.furigana}) - ${k.meaning}`
			),
			on_readings: localData.onyomi.map(
				(o) => `${o.kanji} (${o.furigana}) - ${o.meaning}`
			),
			stroke_count: localData.strokes,
			grade: currentSet, // Using set number as grade here
		};
	};

	// Load the current set of kanji
	const loadCurrentSet = () => {
		const selectedSet = allKanjiSets.find((set) => set.id === currentSet);
		if (selectedSet) {
			const convertedKanji = selectedSet.data.map(convertToKanjiData);
			setCurrentKanjiList(convertedKanji);
			return convertedKanji;
		}
		return [];
	};

	const fetchRandomKanji = async () => {
		setLoading(true);
		setShowDetails(false);
		setError(null);

		try {
			const kanjiList =
				currentKanjiList.length === 0 ? loadCurrentSet() : currentKanjiList;

			if (kanjiList.length === 0) {
				throw new Error("No kanji found in current set");
			}

			// Get next kanji in sequence
			const nextIndex = (currentIndex + 1) % kanjiList.length;
			setCurrentIndex(nextIndex);
			setKanji(kanjiList[nextIndex]);
		} catch (err) {
			// ... error handling
		} finally {
			setLoading(false);
		}
	};

	const fetchPreviousKanji = () => {
		setLoading(true);
		setShowDetails(false);

		try {
			const kanjiList =
				currentKanjiList.length === 0 ? loadCurrentSet() : currentKanjiList;

			if (kanjiList.length === 0) {
				throw new Error("No kanji found in current set");
			}

			// Get previous kanji in sequence
			const prevIndex =
				(currentIndex - 1 + kanjiList.length) % kanjiList.length;
			setCurrentIndex(prevIndex);
			setKanji(kanjiList[prevIndex]);
		} catch (err) {
			// ... error handling
		} finally {
			setLoading(false);
		}
	};

	// Update handleTouchEnd
	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 50) {
			// Swipe left - next kanji
			fetchRandomKanji();
		}

		if (touchStart - touchEnd < -50) {
			// Swipe right - previous kanji
			fetchPreviousKanji();
		}
	};

	//   const fetchRandomKanji = async () => {
	//     setLoading(true)
	//     setShowMeaning(false)
	//     setError(null)

	//     try {
	//       // If we don't have a current list or need to refresh, load it
	//       const kanjiList = currentKanjiList.length === 0 ? loadCurrentSet() : currentKanjiList

	//       if (kanjiList.length === 0) {
	//         throw new Error("No kanji found in current set")
	//       }

	//       // Get a random kanji from the current set
	//       const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)]
	//       setKanji(randomKanji)
	//     } catch (err) {
	//       setError('Failed to load kanji. Please try again.')
	//       console.error(err)
	//     } finally {
	//       setLoading(false)
	//     }
	//   }

	const saveCurrentKanji = () => {
		if (kanji && !savedKanji.some((k) => k.character === kanji.character)) {
			setSavedKanji([...savedKanji, kanji]);
		}
	};

	const removeSavedKanji = (character: string) => {
		setSavedKanji(savedKanji.filter((k) => k.character !== character));
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	// const handleTouchEnd = () => {
	// 	if (touchStart - touchEnd > 50) {
	// 		// Swipe left
	// 		fetchRandomKanji();
	// 	}

	// 	if (touchStart - touchEnd < -50) {
	// 		// Swipe right - if you want to implement previous kanji
	// 		// You'll need to track current index in the set
	// 	}
	// };

	if (loading && !kanji) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
					日本語 漢字 Flashcards
				</h1>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}

				<Controls
					currentSet={currentSet}
					setCurrentSet={setCurrentSet}
					fetchRandomKanji={fetchRandomKanji}
					showMeaning={showMeaning}
					setShowMeaning={setShowMeaning}
					saveCurrentKanji={saveCurrentKanji}
					kanji={kanji}
					savedKanji={savedKanji}
					allKanjiSets={allKanjiSets}
				/>

				{kanji && (
					<div
						ref={cardRef}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						className="mb-8"
					>
						<KanjiCard
							kanji={kanji}
							showDetails={showDetails}
							onToggleDetails={() => setShowDetails(!showDetails)}
						/>
					</div>
				)}

				{savedKanji.length > 0 && (
					<div className="mt-12">
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							Saved Kanji
						</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{savedKanji.map((saved) => (
								<div
									key={saved.character}
									className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
									onClick={() => setKanji(saved)}
								>
									<button
										onClick={(e) => {
											e.stopPropagation();
											removeSavedKanji(saved.character);
										}}
										className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
									>
										×
									</button>
									<div className="text-3xl text-center mb-2 text-black">
										{saved.character}
									</div>
									<div className="text-sm text-gray-600 text-center">
										{saved.meanings.join(", ")}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;

