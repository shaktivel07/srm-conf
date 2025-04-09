"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  xOffset?: number
  yOffset?: number
  duration?: number
  delay?: number
}

export function FloatingElement({
  children,
  className = "",
  xOffset = 10,
  yOffset = 10,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [`-${yOffset}px`, `${yOffset}px`, `-${yOffset}px`],
        x: [`-${xOffset}px`, `${xOffset}px`, `-${xOffset}px`],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
