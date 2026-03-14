import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-zinc-900 text-white placeholder:text-zinc-400 border-zinc-700",
        "h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm",
        "focus-visible:ring-2 focus-visible:ring-white/30",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
