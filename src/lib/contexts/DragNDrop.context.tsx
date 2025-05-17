import { createContext, useReducer } from "react"

import type { StoredFile } from "../types"
import type { Actions } from "./DragNDrop.reducer"
import { DragNDropReducer } from "./DragNDrop.reducer"

export interface IDragNDropContext {
  files: StoredFile[]
  dispatch: React.ActionDispatch<[Actions]>
}

export const DragNDropContext = createContext<IDragNDropContext>({} as IDragNDropContext)

export const DragNDropProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [files, dispatch] = useReducer(DragNDropReducer, [])

  return (
    <DragNDropContext.Provider value={{ files, dispatch }}>
      {children}
    </DragNDropContext.Provider>
  )
}
