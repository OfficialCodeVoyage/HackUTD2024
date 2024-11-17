"use client"

import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`border-b p-4 ${className}`} {...props} />
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-lg font-semibold leading-none ${className}`} {...props} />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 ${className}`} {...props} />
}
