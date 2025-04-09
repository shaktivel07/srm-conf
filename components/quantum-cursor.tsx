"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function QuantumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const orbitRef = useRef<{ angle: number; distance: number; speed: number }[]>([])
  const rotationRef = useRef(0)

  // Create orbiting particles
  const particleCount = 3
  for (let i = 0; i < particleCount; i++) {
    if (!orbitRef.current[i]) {
      orbitRef.current[i] = {
        angle: (Math.PI * 2 * i) / particleCount,
        distance: 20 + i * 5,
        speed: 0.05 + i * 0.02,
      }
    }
  }

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    // Animation loop for orbiting particles
    const animateParticles = () => {
      rotationRef.current += 0.01
      requestAnimationFrame(animateParticles)
    }

    const animationId = requestAnimationFrame(animateParticles)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })

      cancelAnimationFrame(animationId)
    }
  }, [])

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Quantum core */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {/* Core particle */}
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-purple-500"
          animate={{
            boxShadow: [
              "0 0 8px 2px rgba(168, 85, 247, 0.8)",
              "0 0 12px 4px rgba(168, 85, 247, 0.8)",
              "0 0 8px 2px rgba(168, 85, 247, 0.8)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Orbiting particles */}
        {orbitRef.current.map((particle, index) => {
          const angle = particle.angle + rotationRef.current * particle.speed
          const x = Math.cos(angle) * particle.distance
          const y = Math.sin(angle) * particle.distance

          return (
            <motion.div
              key={`orbit-${index}`}
              className="absolute h-2 w-2 rounded-full bg-purple-300"
              style={{
                x,
                y,
                boxShadow: "0 0 5px 2px rgba(168, 85, 247, 0.6)",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          )
        })}

        {/* Quantum field */}
        <motion.div
          className="absolute h-16 w-16 rounded-full border border-purple-400/30"
          animate={{
            rotate: 360,
            borderColor: ["rgba(168, 85, 247, 0.3)", "rgba(139, 92, 246, 0.3)", "rgba(168, 85, 247, 0.3)"],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute h-24 w-24 rounded-full border border-purple-400/20"
          animate={{
            rotate: -360,
            borderColor: ["rgba(168, 85, 247, 0.2)", "rgba(139, 92, 246, 0.2)", "rgba(168, 85, 247, 0.2)"],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>

      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
        }
      `}</style>
    </>
  )
}
