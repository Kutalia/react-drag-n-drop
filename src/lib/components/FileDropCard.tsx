import { useDropzone } from 'react-dropzone'
import { useDragNDrop } from '../hooks/useDragNDrop'

import { useCallback, useRef } from "react"
import { ActionTypes } from '../contexts/DragNDrop.reducer'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
export const FileDropCard: React.FC<Props> = ({ className, ...rest }) => {
  const { config: { multiple, accept }, dispatch } = useDragNDrop()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    dispatch({
      type: ActionTypes.ADD_FILES, payload: [
        ...acceptedFiles.map((file) => ({
          file,
          source: null,
          altText: file.name,
        }))]
    })
  }, [dispatch])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: multiple, accept })

  const sourceInputRef = useRef<HTMLInputElement>(null)

  const handleAddFromSource = () => {
    if (!sourceInputRef.current) {
      return
    }

    const source = sourceInputRef.current.value

    if (!source) {
      return
    }

    dispatch({
      type: ActionTypes.ADD_FILES, payload: [{
        source,
        file: null
      }]
    })

    sourceInputRef.current.value = ''
  }

  return <div
    className={`
      tw:self-stretch
      tw:px-3 tw:py-2
      tw:w-60
      tw:h-74
      tw:rounded-md
      tw:text-white 
      tw:bg-black
      tw:flex
      tw:flex-col 
      tw:justify-end
      tw:gap-4
      tw:relative
    `}
    {...rest}
  >
    <div {...getRootProps()} className="tw:relative tw:grow-1">
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p className="tw:text-8xl tw:absolute tw:left-1/2 tw:top-1/2 tw:translate-[-50%] tw:cursor-pointer">➕</p>
      }
    </div>
    <div className="tw:flex tw:gap-2 tw:pb-2">
      <input className="tw:w-full" placeholder='File source' ref={sourceInputRef} />
      <button onClick={handleAddFromSource}>Save</button>
    </div>
  </div>
}
