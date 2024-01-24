import { PropsWithChildren } from "react";

export function H2({ children }: PropsWithChildren) {
  return (
    <h2 className="scroll-m-20 pb-1 text-2xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H4({ children }: PropsWithChildren) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function Muted({ children }: PropsWithChildren) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
