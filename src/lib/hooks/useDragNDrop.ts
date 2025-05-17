import { useContext } from "react"
import { DragNDropContext } from "../contexts/DragNDrop.context"

export const useDragNDrop = () => {
  const { files, config , dispatch } = useContext(DragNDropContext)

  return { files, config, dispatch }
}
