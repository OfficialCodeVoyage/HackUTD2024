"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

type AccordionProps = AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps & {
  className?: string;
};

export function Accordion({ className, ...props }: AccordionProps) {
  return <AccordionPrimitive.Root className={`w-full ${className || ''}`} {...props} />
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionPrimitive.AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`border-b ${className}`}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionPrimitive.AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`flex flex-1 items-center justify-between py-2 font-medium ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionPrimitive.AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`overflow-hidden text-sm ${className}`}
    {...props}
  >
    <div className="py-2">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"
