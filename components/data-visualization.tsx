"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2) // For retina displays
    }

    resizeCanvas()

    // Data for visualization
    const dataPoints = 12
    const categories = ["AI", "Quantum", "Robotics", "Biotech", "Energy", "Materials"]
    const years = [2020, 2021, 2022, 2023, 2024]

    // Generate random data
    const generateData = () => {
      const data = []
      for (let i = 0; i < categories.length; i++) {
        const categoryData = []
        for (let j = 0; j < years.length; j++) {
          categoryData.push(Math.random() * 80 + 20) // Random value between 20 and 100
        }
        data.push(categoryData)
      }
      return data
    }

    const data = generateData()

    // Animation variables
    let time = 0
    let hue = 260 // Purple hue

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2) // Adjusted for scale

      const width = canvas.width / 2
      const height = canvas.height / 2
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.4

      // Draw circular grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Draw concentric circles
      for (let i = 1; i <= 5; i++) {
        const r = radius * (i / 5)
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.stroke()

        // Add labels for scale
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "right"
        ctx.fillText(`${i * 20}`, centerX - r - 5, centerY)
      }

      // Draw category axes
      const angleStep = (Math.PI * 2) / categories.length

      for (let i = 0; i < categories.length; i++) {
        const axisAngle = i * angleStep - Math.PI / 2

        // Draw axis line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(axisAngle) * radius, centerY + Math.sin(axisAngle) * radius)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.stroke()

        // Add category label
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        const labelX = centerX + Math.cos(axisAngle) * (radius + 20)
        const labelY = centerY + Math.sin(axisAngle) * (radius + 20)
        ctx.fillText(categories[i], labelX, labelY)
      }

      // Draw data for each year with animation
      for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
        // Only draw years that have "appeared" in the animation
        if (yearIndex > time / 20) continue

        const yearProgress = Math.min(1, time / 20 - yearIndex)
        const yearHue = (hue + yearIndex * 15) % 360

        ctx.beginPath()

        for (let i = 0; i < categories.length; i++) {
          const angle = i * angleStep - Math.PI / 2
          const value = data[i][yearIndex] * yearProgress
          const pointRadius = radius * (value / 100)

          const x = centerX + Math.cos(angle) * pointRadius
          const y = centerY + Math.sin(angle) * pointRadius

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Close the path
        const firstAngle = -Math.PI / 2
        const firstValue = data[0][yearIndex] * yearProgress
        const firstPointRadius = radius * (firstValue / 100)
        ctx.lineTo(centerX + Math.cos(firstAngle) * firstPointRadius, centerY + Math.sin(firstAngle) * firstPointRadius)

        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        gradient.addColorStop(0, `hsla(${yearHue}, 70%, 60%, 0.1)`)
        gradient.addColorStop(1, `hsla(${yearHue}, 70%, 60%, 0.5)`)
        ctx.fillStyle = gradient
        ctx.fill()

        // Stroke
        ctx.strokeStyle = `hsla(${yearHue}, 70%, 60%, 0.8)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw data points with glow
        for (let i = 0; i < categories.length; i++) {
          const angle = i * angleStep - Math.PI / 2
          const value = data[i][yearIndex] * yearProgress
          const pointRadius = radius * (value / 100)

          const x = centerX + Math.cos(angle) * pointRadius
          const y = centerY + Math.sin(angle) * pointRadius

          // Glow effect
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 10)
          glow.addColorStop(0, `hsla(${yearHue}, 70%, 60%, 0.8)`)
          glow.addColorStop(1, `hsla(${yearHue}, 70%, 60%, 0)`)

          ctx.beginPath()
          ctx.arc(x, y, 5 + Math.sin(time * 0.1 + i) * 2, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()

          // Point
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${yearHue}, 70%, 90%, 0.9)`
          ctx.fill()
        }

        // Add year label
        ctx.fillStyle = `hsla(${yearHue}, 70%, 70%, 0.9)`
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(years[yearIndex].toString(), centerX, centerY - radius - 30 + yearIndex * 15)
      }

      // Update animation
      time += 0.2
      if (time > years.length * 20 + 10) time = years.length * 20 + 10
      hue = (hue + 0.1) % 360

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  )
}
