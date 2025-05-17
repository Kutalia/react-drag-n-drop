import './index.css';

import { DraggableList } from "./components/DraggableList";
import { ActionTypes, type Configuration } from './contexts/DragNDrop.reducer';
import { useDragNDrop } from './hooks/useDragNDrop';
import { useEffect } from 'react';

const DragNDrop: React.FC<Configuration> = ({ multiple, accept }) => {
  const { dispatch } = useDragNDrop()

  useEffect(() => {
    dispatch({
      type: ActionTypes.CONFIGURE,
      payload: { multiple, accept }
    })
  }, [multiple, accept])

  return (
    <div className="react-drag-n-drop-wrapper">
      <DraggableList />
    </div>
  )
}

export default DragNDrop
