import { useEffect } from 'react'
import DragNDrop from '../lib'
import { useDragNDrop } from '../lib/hooks/useDragNDrop'

const getRandomItem = () => {
  const sortIndex = Math.floor(Math.random() * 100_000)

  const id = +`${Date.now()}${sortIndex}`
  return {
    id, file: null, source: null, sortIndex, altText: `Test_${sortIndex}`
  }
}

function App() {
  const { addFiles } = useDragNDrop()

  useEffect(() => {
    const initialData = [...Array(2)].map(getRandomItem)
    addFiles(initialData)
  }, [])

  return (
    <div className="tw:bg-amber-100 tw:min-h-screen">
      <DragNDrop
        multiple
      />
    </div>
  )
}

export default App
