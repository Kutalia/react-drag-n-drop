export interface InputFile {
  file: File | null;
  source: string | null; // URL or local preview
  altText?: string | null;
}

export interface IndexedInputFile extends InputFile {
  sortIndex: number;
}

export interface StoredFile extends IndexedInputFile {
  id: string;
}