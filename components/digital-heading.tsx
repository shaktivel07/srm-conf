"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface DigitalHeadingProps {
  children: React.ReactNode
  className?: string
}

export function DigitalHeading({ children, className = "" }: DigitalHeadingProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <motion.h1
        className="relative z-10 bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
        animate={{
          textShadow: [
            "0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)",
            "0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)",
            "0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.h1>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute left-0 top-0 z-0 bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent opacity-70 md:text-5xl lg:text-6xl"
            animate={{
              x: [0, -2, 3, -1, 0],
              opacity: [0.7, 0.4, 0.7, 0.3, 0.7],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute left-0 top-0 z-0 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-400 bg-clip-text text-4xl font-bold text-transparent opacity-70 md:text-5xl lg:text-6xl"
            animate={{
              x: [0, 2, -3, 1, 0],
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
