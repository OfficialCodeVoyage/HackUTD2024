"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

interface ScrollAreaProps extends ScrollAreaPrimitive.ScrollAreaProps {}

export function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={`relative ${className}`} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none p-0.5 bg-transparent transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-gray-400 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        orientation="horizontal"
        className="flex touch-none select-none p-0.5 bg-transparent transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-gray-400 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-gray-200" />
    </ScrollAreaPrimitive.Root>
  )
}
