import React, { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useImage } from '../../hooks/useImage'
import type { StoredFile } from '../../types'
import { ImagePreviewFail } from './ImgPreviewFail'
import { UndefinedObjPreview } from './UndefinedObjPreview'
import { Loader } from '../Loader/Loader'

interface Props {
  file: StoredFile
}

const PreviewComponent: React.FC<Props> = ({ file: { file: fileObj, source } }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  useEffect(() => {
    let url = source || ''

    if (fileObj) {
      url = URL.createObjectURL(fileObj)
    }

    setImgUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [fileObj, source])

  const { src } = useImage(imgUrl)

  if (!src) {
    return <UndefinedObjPreview />
  }

  return <img className="tw:w-full tw:h-full tw:object-contain tw:pointer-events-none" src={src} />
}

export const Preview: React.FC<Props> = ({ file }) => {
  if (!(file.source || file.file)) {
    return <UndefinedObjPreview />
  }

  return (
    <ErrorBoundary FallbackComponent={ImagePreviewFail}>
      <Suspense fallback={<Loader />}>
        <PreviewComponent file={file} />
      </Suspense>
    </ErrorBoundary>
  )
}