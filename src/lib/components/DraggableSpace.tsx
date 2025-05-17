interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ref: React.RefObject<HTMLDivElement | null>;
}

export const DraggableSpace: React.FC<Props> = ({ children, className, ref, ...rest }) => {
  return (
    <div
      className={`tw:flex tw:flex-wrap tw:content-start tw:items-start tw:gap-2 tw:p-4 ${className || ''}`}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
}
