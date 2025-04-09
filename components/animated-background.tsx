"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
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

    // Circuit parameters
    const nodeCount = 40
    const nodes: {
      x: number
      y: number
      connections: number[]
      pulses: { progress: number; speed: number; active: boolean; color: string }[]
    }[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulses: [],
      })
    }

    // Create connections between nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i]

      // Find 2-4 closest nodes to connect to
      const distances: { index: number; distance: number }[] = []

      for (let j = 0; j < nodeCount; j++) {
        if (i !== j) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < canvas.width / 4) {
            distances.push({ index: j, distance })
          }
        }
      }

      // Sort by distance and take closest 2-4 nodes
      distances.sort((a, b) => a.distance - b.distance)
      const connectCount = Math.min(Math.floor(Math.random() * 3) + 2, distances.length)

      for (let k = 0; k < connectCount; k++) {
        if (distances[k]) {
          node.connections.push(distances[k].index)

          // Choose a random color for this connection
          const colors = [
            "rgba(16, 185, 129, 0.8)", // Emerald
            "rgba(245, 158, 11, 0.8)", // Amber
            "rgba(236, 72, 153, 0.8)", // Pink
            "rgba(59, 130, 246, 0.8)", // Blue
          ]
          const color = colors[Math.floor(Math.random() * colors.length)]

          // Initialize pulses for this connection
          node.pulses.push({
            progress: 0,
            speed: 0.002 + Math.random() * 0.003,
            active: false,
            color,
          })
        }
      }
    }

    // Randomly activate pulses
    const activatePulses = () => {
      if (Math.random() < 0.05) {
        const nodeIndex = Math.floor(Math.random() * nodeCount)
        const node = nodes[nodeIndex]

        if (node.connections.length > 0) {
          const connectionIndex = Math.floor(Math.random() * node.connections.length)
          if (!node.pulses[connectionIndex].active) {
            node.pulses[connectionIndex] = {
              ...node.pulses[connectionIndex],
              progress: 0,
              active: true,
            }
          }
        }
      }
    }

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Activate new pulses
      activatePulses()

      // Draw connections and update pulses
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i]

        for (let j = 0; j < node.connections.length; j++) {
          const otherNode = nodes[node.connections[j]]
          const pulse = node.pulses[j]
          const baseColor = pulse.color.replace("0.8", "0.15")

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = baseColor
          ctx.lineWidth = 1
          ctx.stroke()

          // Update and draw pulse if active
          if (pulse.active) {
            pulse.progress += pulse.speed

            if (pulse.progress >= 1) {
              pulse.active = false
              pulse.progress = 0
            } else {
              const dx = otherNode.x - node.x
              const dy = otherNode.y - node.y
              const pulseX = node.x + dx * pulse.progress
              const pulseY = node.y + dy * pulse.progress

              // Draw pulse
              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
              ctx.fillStyle = pulse.color
              ctx.fill()

              // Draw pulse glow
              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2)
              const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 6)
              gradient.addColorStop(0, pulse.color)
              gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
              ctx.fillStyle = gradient
              ctx.fill()
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i]

        // Choose a color based on position
        const hue = ((node.x / canvas.width) * 180 + (node.y / canvas.height) * 180) % 360
        const nodeColor = `hsla(${hue}, 80%, 60%, 0.8)`
        const nodeGlowColor = `hsla(${hue}, 80%, 60%, 0.3)`

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()

        // Node glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6)
        gradient.addColorStop(0, nodeGlowColor)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
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
      className="fixed left-0 top-0 -z-10 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    />
  )
}
