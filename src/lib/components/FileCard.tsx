import type { StoredFile } from '../types'
import { Preview } from '../components/Preview/Preview'
import { useDragNDrop } from '../hooks/useDragNDrop'
import { ActionTypes } from '../contexts/DragNDrop.reducer'
import { useRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  file: StoredFile
}
export const FileCard: React.FC<Props> = ({ file, className, ...rest }) => {
  const sourceInputRef = useRef<HTMLInputElement>(null)

  const { dispatch } = useDragNDrop()

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

  return <div
    key={file.id}
    draggable
    className={`
      tw:px-3 tw:py-2
      tw:w-60
      tw:h-74
      tw:rounded-md
      tw:text-white 
      tw:bg-black
      tw:cursor-grab 
      tw:flex
      tw:flex-col 
      tw:justify-center
      tw:gap-4
      tw:transition-colors ${className || ''}
    `}
    {...rest}
  >
    <p className="tw:truncate">{file.altText}&nbsp;</p>
    <p className="tw:truncate">{file.sortIndex}</p>
    <div className="tw:flex tw:items-center tw:justify-center tw:h-20">
      <Preview file={file} />
    </div>
    <input placeholder="Input file description" onChange={(e) => editAltText(e.target.value)} />
    <div className="tw:flex tw:gap-2">
      <input className="tw:w-full" placeholder='File source' ref={sourceInputRef} />
      <button onClick={handleEditSource}>Save</button>
    </div>
    <button className="tw:cursor-pointer" onClick={removeFile}>Remove</button>
  </div>
}
