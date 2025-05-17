// import { useDropzone } from 'react-dropzone'
// import { useDragNDrop } from '../hooks/useDragNDrop'
// import type { StoredFile } from '../types'

import { useRef } from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
export const FileDropCard: React.FC<Props> = ({ className, ...rest }) => {
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: multiple, accept })

  // const { dispatch } = useDragNDrop()

  const sourceInputRef = useRef<HTMLInputElement>(null)

  const handleEditSource = () => { }

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
    <p className="tw:text-8xl tw:absolute tw:left-1/2 tw:top-1/2 tw:translate-[-50%] tw:cursor-pointer">➕</p>
    <div className="tw:flex tw:gap-2 tw:pb-2">
      <input className="tw:w-full" placeholder='File source' ref={sourceInputRef} />
      <button onClick={handleEditSource}>Save</button>
    </div>
  </div>
}
