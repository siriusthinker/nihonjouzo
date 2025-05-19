// Controls.tsx
import { KanjiData, LocalKanjiData } from "../types";

interface ControlsProps {
	currentSet: number;
	setCurrentSet: (set: number) => void;
	fetchRandomKanji: () => void;
	showMeaning: boolean;
	setShowMeaning: (show: boolean) => void;
	saveCurrentKanji: () => void;
	kanji: KanjiData | null;
	savedKanji: KanjiData[];
	allKanjiSets: Array<{ id: number; name: string; data: LocalKanjiData[] }>;
}

export function Controls({
	currentSet,
	setCurrentSet,
	fetchRandomKanji,
	showMeaning,
	setShowMeaning,
	saveCurrentKanji,
	kanji,
	savedKanji,
	allKanjiSets,
}: ControlsProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md mb-8">
			<div className="">
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
			</div>

			<div className="mt-6 flex flex-wrap gap-3">
				<button
					onClick={fetchRandomKanji}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Next Kanji
				</button>

				{/* <button
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
				</button> */}
			</div>
		</div>
	);
}
