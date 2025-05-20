// components/KanjiCard.tsx
import { KanjiData } from "../types";

interface KanjiCardProps {
	kanji: KanjiData;
	showDetails: boolean;
	onToggleDetails: () => void;
}

export function KanjiCard({
	kanji,
	showDetails,
	onToggleDetails,
}: KanjiCardProps) {
	return (
		<div
			className={`bg-white p-8 rounded-lg shadow-lg cursor-pointer select-none transition-transform duration-300 ${
				showDetails ? "scale-100" : "scale-95 hover:scale-100"
			}`}
			onClick={onToggleDetails}
		>
			<div className="kanji-character text-7xl text-center mb-6 text-black font-japanese">
				{kanji.character}
			</div>
			<div className="text-center text-gray-500 mb-4">
				Stroke count: {kanji.stroke_count}
			</div>

			{showDetails && (
				<div className="mt-6 space-y-4">
					<div>
						<h3 className="font-semibold text-gray-700">Meaning:</h3>
						<p className="text-black">{kanji.meanings.join(", ")}</p>
					</div>

					{kanji.kun_readings.length > 0 && (
						<div>
							<h3 className="font-semibold text-gray-700">Kun Readings:</h3>
							<ul className="kanji-character list-disc pl-5 text-black">
								{kanji.kun_readings.map((reading, i) => (
									<li key={i}>{reading}</li>
								))}
							</ul>
						</div>
					)}

					{kanji.on_readings.length > 0 && (
						<div>
							<h3 className="font-semibold text-gray-700">On Readings:</h3>
							<ul className="kanji-character list-disc pl-5 text-black">
								{kanji.on_readings.map((reading, i) => (
									<li key={i}>{reading}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
