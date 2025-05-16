import type { StoredFile } from '../types'
import { Preview } from '../components/Preview/Preview'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  file: StoredFile
}

export const FileCard: React.FC<Props> = ({ file, className, ...rest }) => {
  return <div
    key={file.id}
    draggable
    className={`
      tw:px-3 tw:py-2
      tw:w-60
      tw:rounded-md
      tw:text-white 
      tw:bg-black
      tw:cursor-grab 
      tw:flex
      tw:flex-col 
      tw:justify-center
      tw:gap-2
      tw:transition-colors ${className || ''}
    `}
    {...rest}
  >
    <p className="tw:truncate">{file.altText}</p>
    <p className="tw:truncate">{file.sortIndex}</p>
    <div className="tw:flex tw:items-center tw:justify-center tw:h-20">
      <Preview file={file} />
    </div>
  </div>
}
