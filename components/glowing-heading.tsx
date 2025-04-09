"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowingHeadingProps {
  children: ReactNode
  className?: string
  glowColor?: string
  animationDuration?: number
}

export function GlowingHeading({
  children,
  className = "",
  glowColor = "rgba(234, 179, 8, 0.7)",
  animationDuration = 3,
}: GlowingHeadingProps) {
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
