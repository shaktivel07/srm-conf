"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface HolographicCardProps {
  children: React.ReactNode
}

export function HolographicCard({ children }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const dampenFactor = 15

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const glowX = useTransform(rotateYSpring, [-15, 0, 15], [-50, 0, 50])
  const glowY = useTransform(rotateXSpring, [-15, 0, 15], [50, 0, -50])
  const glowOpacity = useTransform(rotateYSpring, [-15, 0, 15], [0.5, 0.2, 0.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Get mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    setRotateY(mouseX / dampenFactor)
    setRotateX(-mouseY / dampenFactor)

    // Store mouse position for glow effect
    setMouseX((e.clientX - rect.left) / rect.width)
    setMouseY((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 10 }}
      className="group relative h-full perspective-1000"
    >
      <Card className="h-full border-none bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-0 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-purple-900/20">
        <CardContent className="relative h-full overflow-hidden p-6">
          {/* Holographic glow effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              left: glowX,
              top: glowY,
              opacity: glowOpacity,
              backgroundPosition: `${mouseX * 100}% ${mouseY * 100}%`,
            }}
          />

          {/* Subtle grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-[length:50px_50px] bg-repeat opacity-5" />

          {/* Card content with 3D effect */}
          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            {children}
          </div>

          {/* Edge highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </CardContent>
      </Card>
    </motion.div>
  )
}
