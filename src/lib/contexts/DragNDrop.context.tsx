import { createContext, useCallback, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

import type { StoredFile, InputFile, IndexedInputFile } from "../types"
import { getSortedFiles } from "../helpers"

export interface IDragNDropContext {
  addFiles: (files: (InputFile | IndexedInputFile)[]) => void
  files: StoredFile[]
  moveFile: (id: StoredFile['id'], targetFileId: StoredFile['id']) => void
}

export const DragNDropContext = createContext<IDragNDropContext>({} as IDragNDropContext)

export const DragNDropProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<StoredFile[]>([])

  const addFiles = useCallback<IDragNDropContext['addFiles']>((files) => {
    setFiles((prevFiles) => {
      const sortedFiles = getSortedFiles(prevFiles)
      
      return [
      ...prevFiles,
      ...(files.map((f, index) => ({
        ...f,
        id: uuidv4(),
        sortIndex: (sortedFiles[sortedFiles.length - 1]?.sortIndex || 0) + index + 1,
      }))),
    ]})
  }, [])

  // Moves the file with the given id to the place of the file targeted with its id
  // Fills the gap by reindexing target file accordingly (kinda like splice)
  const moveFile = useCallback<IDragNDropContext['moveFile']>((id, targetFileId) => {
    setFiles((prevFiles) => {
      const file = prevFiles.find((f) => f.id === id) as StoredFile
      const targetFile = prevFiles.find((f) => f.id === targetFileId) as StoredFile

      const sortedFiles = getSortedFiles(prevFiles)

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
    })
  }, [])

  return (
    <DragNDropContext.Provider value={{ files, addFiles, moveFile }}>
      {children}
    </DragNDropContext.Provider>
  )
}
