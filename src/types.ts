export type KanjiData = {
  character: string
  meanings: string[]
  kun_readings: string[]
  on_readings: string[]
  stroke_count: number
  grade: number
}

export interface KanjiExample {
  kanji: string;
  furigana: string;
  meaning: string;
}

export interface LocalKanjiData {
  kanji: string;
  meaning: string;
  strokes: number;
  kunyomi: {
    kanji: string;
    furigana: string;
    meaning: string;
  }[];
  onyomi: {
    kanji: string;
    furigana: string;
    meaning: string;
  }[];
}

export interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
}