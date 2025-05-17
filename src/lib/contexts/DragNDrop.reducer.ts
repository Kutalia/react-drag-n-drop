import { v4 as uuidv4 } from 'uuid'

import { getSortedFiles } from "../helpers";
import type { IndexedInputFile, InputFile, StoredFile } from "../types";

export enum ActionTypes {
  ADD_FILES = 'add_file',
  MOVE_FILE = 'move_file',
  REMOVE_FILE = 'remove_file',
}

export type Actions =
  | { type: ActionTypes.ADD_FILES, payload: (InputFile | IndexedInputFile)[] }
  | { type: ActionTypes.MOVE_FILE, payload: { id: StoredFile['id'], targetFileId: StoredFile['id'] } }
  | { type: ActionTypes.REMOVE_FILE, payload: StoredFile['id'] }

export const DragNDropReducer = (state: StoredFile[], action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_FILES: {
      const sortedFiles = getSortedFiles(state)

      return [
        ...state,
        ...(action.payload.map((f, index) => ({
          ...f,
          id: uuidv4(),
          sortIndex: (sortedFiles[sortedFiles.length - 1]?.sortIndex || 0) + index + 1,
        }))),
      ]
    }
    case ActionTypes.MOVE_FILE: {
      // Moves the file with the given id to the place of the file targeted with its id
      // Fills the gap by reindexing target file accordingly (kinda like splice)

      const { id, targetFileId } = action.payload

      const file = state.find((f) => f.id === id) as StoredFile
      const targetFile = state.find((f) => f.id === targetFileId) as StoredFile

      const sortedFiles = getSortedFiles(state)

      const fileSortedIndex = sortedFiles.findIndex((f) => f.id === id)
      const targetFileSortedIndex = sortedFiles.findIndex((f) => f.id === targetFileId)

      // Takes into the consideration a case when both have same `sortIndex`
      const shouldShuffleLeft = fileSortedIndex < targetFileSortedIndex

      const newFile = { ...file, sortIndex: targetFile.sortIndex }

      return [
        ...sortedFiles.map((f, index) => {
          if (shouldShuffleLeft) {
            if (index <= targetFileSortedIndex) {
              return { ...f, sortIndex: f.sortIndex - 1 }
            }
            return f
          }

          if (index >= targetFileSortedIndex) {
            return { ...f, sortIndex: f.sortIndex + 1 }
          }
          return f
        }).filter((f) => f.id !== id),
        newFile,
      ]
    }
    case ActionTypes.REMOVE_FILE: {
      return state.filter((f) => f.id !== action.payload)
    }
    default:
      return state

  }
}