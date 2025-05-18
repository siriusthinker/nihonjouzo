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
  strokes: number;
  meaning: string;
  kunyomi: KanjiExample[];
  onyomi: KanjiExample[];
}

// export interface KanjiData {
//   character: string;
//   meanings: string[];
//   kun_readings: string[];
//   on_readings: string[];
//   stroke_count: number;
//   grade: number;
// }