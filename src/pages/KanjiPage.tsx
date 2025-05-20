import { useState, useEffect, useRef } from "react";
import { KanjiCard } from "../components/KanjiCard";
import { Controls } from "../components/Controls";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { KanjiData, LocalKanjiData } from "../types";
import set1 from "../data/N4_kanji_1_10.json";
import set2 from "../data/N4_kanji_11_20.json";
import set3 from "../data/N4_kanji_21_30.json";
import set4 from "../data/N4_kanji_31_40.json";
import set5 from "../data/N4_kanji_41_50.json";
import set6 from "../data/N4_kanji_51_60.json";

const allKanjiSets = [
	{ id: 1, name: "Sakura Set 1", data: set1 },
	{ id: 2, name: "Sakura Set 2", data: set2 },
	{ id: 3, name: "Sakura Set 3", data: set3 },
	{ id: 4, name: "Sakura Set 4", data: set4 },
	{ id: 5, name: "Sakura Set 5", data: set5 },
	{ id: 6, name: "Sakura Set 6", data: set6 },
];

type KanjiPageProps = {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	savedKanji: KanjiData[];
	setSavedKanji: (kanji: KanjiData[]) => void;
};

export const KanjiPage = ({
	loading,
	setLoading,
	savedKanji,
	setSavedKanji,
}: KanjiPageProps) => {
	const [kanji, setKanji] = useState<KanjiData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [showMeaning, setShowMeaning] = useState<boolean>(false);
	const [currentSet, setCurrentSet] = useState<number>(1);
	const [currentKanjiList, setCurrentKanjiList] = useState<KanjiData[]>([]);
	const [showDetails, setShowDetails] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [randomMode, setRandomMode] = useState<boolean>(false);

	useEffect(() => {
		loadCurrentSet();
	}, [currentSet]);

	useEffect(() => {
		if (currentKanjiList.length > 0) {
			fetchRandomKanji();
		}
	}, [currentKanjiList]);

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
			grade: currentSet,
		};
	};

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

			let nextKanji;
			if (randomMode) {
				nextKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
			} else {
				const nextIndex = (currentIndex + 1) % kanjiList.length;
				setCurrentIndex(nextIndex);
				nextKanji = kanjiList[nextIndex];
			}

			setKanji(nextKanji);
		} catch (err) {
			setError("Failed to load kanji. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const fetchPreviousKanji = () => {
		if (randomMode) return;

		setLoading(true);
		setShowDetails(false);

		try {
			const kanjiList =
				currentKanjiList.length === 0 ? loadCurrentSet() : currentKanjiList;

			if (kanjiList.length === 0) {
				throw new Error("No kanji found in current set");
			}

			const prevIndex =
				(currentIndex - 1 + kanjiList.length) % kanjiList.length;
			setCurrentIndex(prevIndex);
			setKanji(kanjiList[prevIndex]);
		} catch (err) {
			setError("Failed to load previous kanji.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const saveCurrentKanji = () => {
		if (kanji && !savedKanji.some((k) => k.character === kanji.character)) {
			setSavedKanji([...savedKanji, kanji]);
		}
	};

	const removeSavedKanji = (character: string) => {
		setSavedKanji(savedKanji.filter((k) => k.character !== character));
	};

	if (loading && !kanji) return <LoadingSpinner />;

	return (
		<>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<Controls
				currentSet={currentSet}
				setCurrentSet={setCurrentSet}
				fetchRandomKanji={fetchRandomKanji}
				fetchPreviousKanji={fetchPreviousKanji}
				showMeaning={showMeaning}
				setShowMeaning={setShowMeaning}
				saveCurrentKanji={saveCurrentKanji}
				kanji={kanji}
				savedKanji={savedKanji}
				allKanjiSets={allKanjiSets}
				randomMode={randomMode}
				setRandomMode={setRandomMode}
			/>

			{kanji && (
				<div className="mb-8">
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
		</>
	);
};
