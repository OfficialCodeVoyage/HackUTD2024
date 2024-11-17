"use client"

import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  let variantClasses = ""

  switch (variant) {
    case "secondary":
      variantClasses = "bg-secondary text-secondary-foreground"
      break
    case "destructive":
      variantClasses = "bg-red-500 text-white"
      break
    case "outline":
      variantClasses = "border border-gray-300 text-gray-800"
      break
    default:
      variantClasses = "bg-primary text-primary-foreground"
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses} ${className}`}
      {...props}
    />
  )
}
