// Reused ideas from https://github.com/diragb/shadcn-dropzone

import { useMemo, useRef, useState } from "react";

import { getSortedFiles } from "../helpers";
import { useDragNDrop } from '../hooks/useDragNDrop';
import type { StoredFile } from '../types';
import { DraggableSpace } from "./DraggableSpace";
import { FileCard } from './FileCard';

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
        <FileCard
          file={item}
          key={item.id}
          draggable
          onDragStart={e => handleDragStart(e, item)}
          onDragEnd={() => handleDragEnd()}
          onDragOver={e => handleDragOver(e, item)}
          onDrop={handleDrop}
          className={`
            ${draggedOverItem?.id === item.id ? 'tw:bg-gray-600' : ''}
            ${draggedItem?.id === item.id ? 'tw:opacity-50' : ''}
          `}
        >
        </FileCard>
      ))}
    </DraggableSpace>
  );
}
