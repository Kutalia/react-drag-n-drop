import './index.css';

import { useCallback } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { DraggableList } from "./components/DraggableList";
import { useDragNDrop } from './hooks/useDragNDrop';
import { ActionTypes } from './contexts/DragNDrop.reducer';

interface Props {
  multiple?: boolean
  accept?: Accept // common MIME types like { 'image/png': ['.png'] }
}

const DragNDrop: React.FC<Props> = ({ multiple, accept }) => {
  const { files, dispatch } = useDragNDrop()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    dispatch({
      type: ActionTypes.ADD_FILES, payload: [
        ...acceptedFiles.map((file) => ({
          file,
          source: null,
          altText: file.name,
        }))]
    })
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: multiple, accept })

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <input placeholder='Or input file URL here' />
      <button>Save</button>
      <DraggableList />
    </div>
  )
}

export default DragNDrop
