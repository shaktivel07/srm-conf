"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function QuantumBackground() {
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

    // Quantum field parameters
    const particleCount = 50
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
    }[] = []

    // Create quantum particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const vx = (Math.random() - 0.5) * 0.3
      const vy = (Math.random() - 0.5) * 0.3

      // Create colors with blue, yellow, and rose hues
      const colorOptions = [
        "rgba(59, 130, 246, 0.6)", // Blue
        "rgba(234, 179, 8, 0.6)", // Yellow
        "rgba(244, 114, 182, 0.6)", // Rose
      ]
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]

      particles.push({ x, y, radius, color, vx, vy })
    }

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
        const gradientColor = particle.color.replace(/[^,]+(?=\))/, "0.2")
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          particle.radius,
          particle.x,
          particle.y,
          particle.radius * 4,
        )
        gradient.addColorStop(0, gradientColor)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)

            // Create gradient line
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            gradient.addColorStop(0, particles[i].color.replace(/[^,]+(?=\))/, "0.1"))
            gradient.addColorStop(1, particles[j].color.replace(/[^,]+(?=\))/, "0.1"))

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

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
      className="fixed left-0 top-0 -z-10 h-full w-full opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1 }}
    />
  )
}
