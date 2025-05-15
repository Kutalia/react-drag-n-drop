import { useContext } from "react"
import { DragNDropContext } from "../contexts/DragNDrop.context"

export const useDragNDrop = () => {
  const context = useContext(DragNDropContext)

  return context
}
