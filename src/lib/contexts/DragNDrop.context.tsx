import { createContext, useReducer } from "react"

import type { StoredFile } from "../types"
import type { Actions, Configuration } from "./DragNDrop.reducer"
import { DragNDropReducer } from "./DragNDrop.reducer"

export interface IDragNDropContext {
  files: StoredFile[]
  config: Configuration
  dispatch: React.ActionDispatch<[Actions]>
}

export const DragNDropContext = createContext<IDragNDropContext>({} as IDragNDropContext)

export const DragNDropProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(DragNDropReducer, { files: [], config: {} })

  return (
    <DragNDropContext.Provider value={{ files: state.files, config: state.config, dispatch }}>
      {children}
    </DragNDropContext.Provider>
  )
}
