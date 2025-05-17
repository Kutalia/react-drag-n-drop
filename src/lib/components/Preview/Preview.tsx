import React, { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useImage } from '../../hooks/useImage'
import type { StoredFile } from '../../types'
import { ImagePreviewFail } from './ImgPreviewFail'
import { UndefinedObjPreview } from './UndefinedObjPreview'
import { PreviewLoader } from './PreviewLoader'

interface Props {
  file: StoredFile
}

const PreviewComponent: React.FC<Props> = ({ file }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  useEffect(() => {
    let url = file.source || ''

    if (file.file) {
      url = URL.createObjectURL(file.file)
    }

    setImgUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

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
      <Suspense fallback={<PreviewLoader />}>
        <PreviewComponent file={file} />
      </Suspense>
    </ErrorBoundary>
  )
}