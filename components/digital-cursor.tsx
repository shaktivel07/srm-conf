"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function DigitalCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const gridRef = useRef<{ x: number; y: number; size: number; delay: number }[]>([])

  // Create grid cells for cursor
  const gridSize = 5
  const cellSize = 4
  const gridGap = 2

  if (gridRef.current.length === 0) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        gridRef.current.push({
          x: x * (cellSize + gridGap) - (gridSize * (cellSize + gridGap)) / 2 + cellSize / 2,
          y: y * (cellSize + gridGap) - (gridSize * (cellSize + gridGap)) / 2 + cellSize / 2,
          size: cellSize,
          delay: (x + y) * 0.02,
        })
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
    }
  }, [])

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Digital cursor container */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {/* Grid cells */}
        {gridRef.current.map((cell, index) => (
          <motion.div
            key={`cell-${index}`}
            className="absolute rounded-sm bg-teal-400"
            style={{
              x: cell.x,
              y: cell.y,
              width: cell.size,
              height: cell.size,
              opacity: 0.8,
            }}
            animate={
              clicked
                ? {
                    scale: [1, 0.5, 1],
                    opacity: [0.8, 1, 0.8],
                  }
                : linkHovered
                  ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8],
                      x: [cell.x, cell.x * 1.5, cell.x],
                      y: [cell.y, cell.y * 1.5, cell.y],
                    }
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }
            }
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: cell.delay,
            }}
          />
        ))}

        {/* Center dot */}
        <motion.div
          className="absolute h-2 w-2 rounded-full bg-cyan-300"
          style={{
            x: -1,
            y: -1,
            boxShadow: "0 0 5px 2px rgba(6, 182, 212, 0.6)",
          }}
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
