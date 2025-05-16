// Reused ideas from https://github.com/diragb/shadcn-dropzone

import { useMemo, useRef, useState } from "react";

import { useDragNDrop } from '../hooks/useDragNDrop';
import type { StoredFile } from '../types';
import { DraggableSpace } from "./DraggableSpace";
import { getSortedFiles } from "../helpers";
import { Preview } from "./Preview/Preview";

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

  const sortedFiles = useMemo(() => getSortedFiles(files), [files])

  return (
    <DraggableSpace ref={wrapperRef}>
      {sortedFiles.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={e => handleDragStart(e, item)}
          onDragEnd={() => handleDragEnd()}
          onDragOver={e => handleDragOver(e, item)}
          onDrop={handleDrop}
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
              tw:transition-colors
              ${draggedOverItem?.id === item.id ? 'tw:bg-gray-600' : ''}
              ${draggedItem?.id === item.id ? 'tw:opacity-50' : ''}
            `}
        >
          <p className="tw:truncate">{item.altText}</p>
          <p className="tw:truncate">{item.sortIndex}</p>
          <div className="tw:flex tw:items-center tw:justify-center tw:h-20">
            <Preview file={item} />
          </div>
        </div>
      ))}
    </DraggableSpace>
  );
}
