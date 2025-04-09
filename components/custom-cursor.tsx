"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

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

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(138, 43, 226, 0.3)",
      mixBlendMode: "difference" as const,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(138, 43, 226, 0.6)",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: position.x - 32,
      y: position.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(138, 43, 226, 0.15)",
      mixBlendMode: "difference" as const,
    },
  }

  const cursorDotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    link: {
      x: position.x - 8,
      y: position.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        variants={cursorDotVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: hidden ? 0 : 1 }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  )
}
