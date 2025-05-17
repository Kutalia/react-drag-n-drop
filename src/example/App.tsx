import { useEffect } from 'react'
import DragNDrop, { useDragNDrop } from '../lib'
import { ActionTypes } from '../lib'

const getRandomItem = () => {
  const sortIndex = Math.floor(Math.random() * 100_000)

  const id = +`${Date.now()}${sortIndex}`
  return {
    id, file: null, source: null, sortIndex, altText: `Test_${sortIndex}`
  }
}

function App() {
  const { dispatch } = useDragNDrop()

  useEffect(() => {
    const initialData = [...Array(2)].map(getRandomItem)

    dispatch({
      type: ActionTypes.ADD_FILES, payload: initialData
    })
  }, [])

  return (
    <div className="tw:bg-amber-100 tw:min-h-screen container">
      <DragNDrop
        multiple
      />
    </div>
  )
}

export default App
