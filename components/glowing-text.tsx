"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowingTextProps {
  children: ReactNode
  className?: string
  glowColor?: string
  animationDuration?: number
}

export function GlowingText({
  children,
  className = "",
  glowColor = "rgba(16, 185, 129, 0.7)",
  animationDuration = 3,
}: GlowingTextProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}`,
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}`,
        ],
      }}
      transition={{
        duration: animationDuration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
