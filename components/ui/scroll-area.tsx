import React from 'react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
      <div className="h-full w-full overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  )
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
