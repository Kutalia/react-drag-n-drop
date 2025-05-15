import { useMemo, useRef, useState } from "react";

import { useDragNDrop } from '../hooks/useDragNDrop';
import type { StoredFile } from '../types';
import { DraggableSpace } from "./DraggableSpace";
import { getSortedFiles } from "../helpers";

export const DraggableList: React.FC = () => {
  const { files, moveFile } = useDragNDrop()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [draggedItem, setDraggedItem] = useState<StoredFile | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<StoredFile | null>(null);

  const handleDragStart = (_: React.DragEvent<HTMLDivElement>, item: StoredFile) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: StoredFile) => {
    e.preventDefault();
    setDraggedOverItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDraggedOverItem(null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggedItem || !draggedOverItem || draggedItem.id === draggedOverItem.id) {
      return;
    }

    moveFile(draggedItem.id, draggedOverItem.id)
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const items = useMemo(() => getSortedFiles(files), [files])

  return (
    <DraggableSpace ref={wrapperRef}>
      {items.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={e => handleDragStart(e, item)}
          onDragEnd={() => handleDragEnd()}
          onDragOver={e => handleDragOver(e, item)}
          onDrop={handleDrop}
          className={`
              tw:px-2 py-1
              tw:h-24
              tw:rounded-md
              tw:text-white 
              tw:bg-black
              tw:cursor-grab 
              tw:flex 
              tw:items-center
              tw:justify-center
              tw:transition-colors
              tw:whitespace-nowrap
              ${draggedOverItem?.id === item.id ? 'tw:bg-gray-600' : ''}
              ${draggedItem?.id === item.id ? 'tw:opacity-50' : ''}
            `}
        >
          {/* TODO: test moving files again to make sure they are sorted correctly */}
          <div>
            <p>{item.altText}</p>
            <p>{item.sortIndex}</p>
          </div>
        </div>
      ))}
    </DraggableSpace>
  );
}
