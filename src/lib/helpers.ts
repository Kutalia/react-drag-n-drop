import type { StoredFile } from "./types";

// Might wrongly show typing errors in VSCode https://github.com/microsoft/vscode-edge-devtools/issues/2699
export const getSortedFiles = (files: StoredFile[]): StoredFile[] => {
  return files.toSorted((a, b) => a.sortIndex - b.sortIndex)
}
