import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useImage } from '../../hooks/useImage'
import type { StoredFile } from '../../types'
import { PreviewFail } from '../PreviewFail/PreviewFail'
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

  const { src, hasFailed, isLoading, isLoaded, clear } = useImage(imgUrl)

  useEffect(() => clear, [clear])

  if (isLoaded && !src) {
    return <PreviewFail text="No file provided" />
  }

  if (hasFailed) {
    return <PreviewFail text="Preview failed" />
  }

  if (isLoading) {
    return <Loader />
  }

  return <img className="tw:w-full tw:h-full tw:object-contain tw:pointer-events-none" src={src as string} />
}

export const Preview: React.FC<Props> = ({ file }) => {
  if (!(file.source || file.file)) {
    return <PreviewFail text="No file provided" />
  }

  return (
    <ErrorBoundary fallbackRender={() => <PreviewFail text="Invalid error occurred" />}>
      <PreviewComponent file={file} />
    </ErrorBoundary>
  )
}