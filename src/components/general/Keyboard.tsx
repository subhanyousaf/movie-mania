import { PropsWithChildren } from "react";

const Keyboard = ({ children }: PropsWithChildren) => {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      <span className="text-xs">{children}</span>
    </kbd>
  );
};

export default Keyboard;
