import { Dispatch, SetStateAction } from "react";

type BurgerMenuProps = {
	menuOpen: boolean;
	toggleMenu: () => void;
	currentPage: "kanji" | "vocabulary";
	setCurrentPage: Dispatch<SetStateAction<"kanji" | "vocabulary">>;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const BurgerMenu = ({
	menuOpen,
	toggleMenu,
	currentPage,
	setCurrentPage,
	setMenuOpen,
}: BurgerMenuProps) => {
	return (
		<>
			<button
				className="fixed top-8 left-4 z-50 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
				onClick={toggleMenu}
			>
				<div
					className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all ${
						menuOpen ? "rotate-45 translate-y-2" : ""
					}`}
				></div>
				<div
					className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all ${
						menuOpen ? "opacity-0" : ""
					}`}
				></div>
				<div
					className={`w-6 h-0.5 bg-gray-800 transition-all ${
						menuOpen ? "-rotate-45" : ""
					}`}
				></div>
			</button>

			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
					menuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="p-4 pt-16">
					<h2 className="text-xl font-bold mb-4">Menu</h2>
					<ul>
						<li className="mb-2">
							<button
								className={`w-full text-left p-2 rounded ${
									currentPage === "kanji"
										? "bg-blue-100 text-blue-800"
										: "hover:bg-gray-100"
								}`}
								onClick={() => {
									setCurrentPage("kanji");
									setMenuOpen(false);
								}}
							>
								Kanji Practice
							</button>
						</li>
						<li className="mb-2">
							<button
								className={`w-full text-left p-2 rounded ${
									currentPage === "vocabulary"
										? "bg-blue-100 text-blue-800"
										: "hover:bg-gray-100"
								}`}
								onClick={() => {
									setCurrentPage("vocabulary");
									setMenuOpen(false);
								}}
							>
								Vocabulary Practice
							</button>
						</li>
					</ul>
				</div>
			</div>

			{menuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30"
					onClick={toggleMenu}
				></div>
			)}
		</>
	);
};
