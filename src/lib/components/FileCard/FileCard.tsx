import { useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

import { ActionTypes } from '../../contexts/DragNDrop.reducer'
import { useDragNDrop } from '../../hooks/useDragNDrop'
import type { StoredFile } from '../../types'
import { Preview } from '../Preview/Preview'
import classes from './FileCard.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  file: StoredFile
}
export const FileCard: React.FC<Props> = ({ file, className, ...rest }) => {
  const sourceInputRef = useRef<HTMLInputElement>(null)

  const { config: { accept }, dispatch } = useDragNDrop()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    dispatch({
      type: ActionTypes.EDIT_FILE, payload: {
        id: file.id,
        file: acceptedFiles[0],
        source: null,
      }
    })
  }, [file])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ multiple: false, onDrop, accept })

  const removeFile = () => {
    dispatch({ type: ActionTypes.REMOVE_FILE, payload: file.id })
  }

  const editFile = (payload: Partial<StoredFile>) => {
    dispatch({ type: ActionTypes.EDIT_FILE, payload: { id: file.id, ...payload } })
  }

  const editAltText = (altText: string) => {
    editFile({ altText })
  }

  const handleEditSource = () => {
    editFile({ source: sourceInputRef.current?.value, file: null })
  }

  const disableDragPropagation = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return <div
    key={file.id}
    draggable
    className={`
      tw:px-3 tw:py-2
      tw:w-60
      tw:h-72
      tw:rounded-md
      tw:text-white 
      tw:bg-black
      tw:cursor-grab 
      tw:flex
      tw:flex-col 
      tw:justify-center
      tw:gap-5
      tw:transition-colors ${className || ''}
    `}
    {...rest}
  >
    <div {...getRootProps()} className="tw:flex tw:items-center tw:justify-center tw:h-24">
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the file to replace the item ...</p>
          : <Preview file={file} />
      }

    </div>
    <input
      placeholder="Input file description"
      defaultValue={file.altText || ''}
      onChange={(e) => editAltText(e.target.value)}
      draggable
      onDragStart={disableDragPropagation}
    />
    <div className="tw:flex tw:gap-2">
      <input
        className="tw:w-full"
        placeholder='File source' ref={sourceInputRef}
        draggable
        onDragStart={disableDragPropagation}
      />
      <button onClick={handleEditSource}>Save</button>
    </div>
    <button className={`tw:cursor-pointer tw:mx-auto ${classes.button}`} onClick={removeFile}><span>Remove</span></button>
  </div>
}
