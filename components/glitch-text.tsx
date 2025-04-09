"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 400)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <div className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
        {children}
      </div>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute left-0 top-0 z-0 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent opacity-70"
            animate={{
              x: [0, -3, 5, -2, 0],
              opacity: [0.7, 0.4, 0.7, 0.3, 0.7],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute left-0 top-0 z-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent opacity-70"
            animate={{
              x: [0, 4, -6, 3, 0],
              opacity: [0.7, 0.3, 0.7, 0.5, 0.7],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  )
}
