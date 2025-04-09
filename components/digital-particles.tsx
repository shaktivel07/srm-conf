"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function DigitalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Digital particles
    const particleCount = 80
    const particles: {
      x: number
      y: number
      size: number
      shape: "square" | "circle" | "triangle" | "diamond"
      color: string
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
    }[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const shapes = ["square", "circle", "triangle", "diamond"] as const
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const size = Math.random() * 3 + 1

      // Create color with teal/cyan hues
      const hue = 170 + Math.random() * 30 // 170-200 range (teals/cyans)
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        shape,
        color,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle based on shape
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.fillStyle = particle.color

        switch (particle.shape) {
          case "square":
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
            break

          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break

          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -particle.size / 2)
            ctx.lineTo(particle.size / 2, particle.size / 2)
            ctx.lineTo(-particle.size / 2, particle.size / 2)
            ctx.closePath()
            ctx.fill()
            break

          case "diamond":
            ctx.beginPath()
            ctx.moveTo(0, -particle.size / 2)
            ctx.lineTo(particle.size / 2, 0)
            ctx.lineTo(0, particle.size / 2)
            ctx.lineTo(-particle.size / 2, 0)
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()
      })

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
