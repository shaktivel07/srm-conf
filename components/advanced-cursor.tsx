"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, type MotionValue } from "framer-motion"

interface AdvancedCursorProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export function AdvancedCursor({ mouseX, mouseY }: AdvancedCursorProps) {
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  // Create springs for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Secondary cursor with different spring settings for trailing effect
  const trailConfig = { damping: 40, stiffness: 300 }
  const trailX = useSpring(mouseX, trailConfig)
  const trailY = useSpring(mouseY, trailConfig)

  useEffect(() => {
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    const handleLinkEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      setLinkHovered(true)
      setCursorText(target.getAttribute("data-cursor-text") || "")
      setCursorVariant("link")
    }

    const handleLinkLeave = () => {
      setLinkHovered(false)
      setCursorText("")
      setCursorVariant("default")
    }

    const handleButtonEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      setButtonHovered(true)
      setCursorText(target.getAttribute("data-cursor-text") || "Click")
      setCursorVariant("button")
    }

    const handleButtonLeave = () => {
      setButtonHovered(false)
      setCursorText("")
      setCursorVariant("default")
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll("a")
    const buttons = document.querySelectorAll("button")

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkEnter)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleButtonEnter)
      button.addEventListener("mouseleave", handleButtonLeave)
    })

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkEnter)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })

      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleButtonEnter)
        button.removeEventListener("mouseleave", handleButtonLeave)
      })
    }
  }, [])

  // Cursor variants for different states
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(138, 43, 226, 0.2)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
    clicked: {
      height: 28,
      width: 28,
      backgroundColor: "rgba(138, 43, 226, 0.6)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
    link: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(138, 43, 226, 0.15)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
  }

  // Trail particles
  const trailCount = 5
  const trails = Array.from({ length: trailCount }).map((_, i) => {
    const delay = i * 0.05
    return { delay }
  })

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          opacity: hidden ? 0 : 1,
        }}
        animate={clicked ? "clicked" : cursorVariant}
        variants={variants}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      >
        {cursorText && <span className="select-none text-xs font-medium text-white">{cursorText}</span>}
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-white"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />

      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed left-0 top-0 z-40 h-1 w-1 rounded-full bg-purple-500"
          style={{
            left: trailX,
            top: trailY,
            opacity: hidden ? 0 : 0.3 - index * 0.05,
            x: "-50%",
            y: "-50%",
            transition: `left ${0.1 + trail.delay}s linear, top ${0.1 + trail.delay}s linear`,
          }}
        />
      ))}

      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  )
}
