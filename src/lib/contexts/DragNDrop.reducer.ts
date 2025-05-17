import { v4 as uuidv4 } from 'uuid'

import { getSortedFiles } from "../helpers";
import type { IndexedInputFile, InputFile, StoredFile } from "../types";
import type { Accept } from 'react-dropzone';

export type Configuration = Partial<{
  multiple: boolean
  accept: Accept
}>

interface State {
  files: StoredFile[]
  config: Configuration
}

export const initialState: State = {
  files: [],
  config: {
    multiple: true
  }
}

export enum ActionTypes {
  ADD_FILES = 'add_file',
  MOVE_FILE = 'move_file',
  REMOVE_FILE = 'remove_file',
  EDIT_FILE = 'edit_file',
  CONFIGURE = 'configure',
}

export type Actions =
  | { type: ActionTypes.ADD_FILES, payload: (InputFile | IndexedInputFile)[] }
  | { type: ActionTypes.MOVE_FILE, payload: { id: StoredFile['id'], targetFileId: StoredFile['id'] } }
  | { type: ActionTypes.REMOVE_FILE, payload: StoredFile['id'] }
  | { type: ActionTypes.EDIT_FILE, payload: Partial<StoredFile> & { id: StoredFile['id'] } }
  | { type: ActionTypes.CONFIGURE, payload: Configuration }

export const DragNDropReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_FILES: {
      const sortedFiles = getSortedFiles(state.files)

      return {
        ...state,
        files: [
          ...state.files,
          ...(action.payload.map((f, index) => ({
            ...f,
            id: uuidv4(),
            sortIndex: (sortedFiles[0]?.sortIndex || 0) - index - 1,
          }))),
        ]
      }
    }
    case ActionTypes.MOVE_FILE: {
      // Moves the file with the given id to the place of the file targeted with its id
      // Fills the gap by reindexing target file accordingly (kinda like splice)

      const { id, targetFileId } = action.payload

      const file = state.files.find((f) => f.id === id) as StoredFile
      const targetFile = state.files.find((f) => f.id === targetFileId) as StoredFile

      const sortedFiles = getSortedFiles(state.files)

      const fileSortedIndex = sortedFiles.findIndex((f) => f.id === id)
      const targetFileSortedIndex = sortedFiles.findIndex((f) => f.id === targetFileId)

      // Takes into the consideration a case when both have same `sortIndex`
      const shouldShuffleLeft = fileSortedIndex < targetFileSortedIndex

      const newFile = { ...file, sortIndex: targetFile.sortIndex }

      return {
        ...state,
        files: [
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
    }
    case ActionTypes.REMOVE_FILE: {
      return {
        ...state,
        files: state.files.filter((f) => f.id !== action.payload)
      }
    }
    case ActionTypes.EDIT_FILE: {
      const index = state.files.findIndex((f) => f.id === action.payload.id)

      return {
        ...state,
        files: state.files.toSpliced(index, 1, { ...state.files[index], ...action.payload })
      }
    }
    case ActionTypes.CONFIGURE: {
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        }
      }
    }
    default:
      return state

  }
}