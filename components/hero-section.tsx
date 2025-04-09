"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const outerRadius = Math.min(canvas.width, canvas.height) * 0.4
    const innerRadius = outerRadius * 0.8

    let rotation = 0
    let hue = 260 // Purple hue

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circular grid
      const segments = 36
      const rings = 5

      for (let i = 0; i <= rings; i++) {
        const radius = innerRadius + (outerRadius - innerRadius) * (i / rings)

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + rotation

        ctx.beginPath()
        ctx.moveTo(centerX + innerRadius * Math.cos(angle), centerY + innerRadius * Math.sin(angle))
        ctx.lineTo(centerX + outerRadius * Math.cos(angle), centerY + outerRadius * Math.sin(angle))
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw data points
      const dataPoints = 12
      for (let i = 0; i < dataPoints; i++) {
        const angle = (i / dataPoints) * Math.PI * 2 + rotation * 1.5
        const radius = innerRadius + Math.sin(i * 5 + rotation * 3) * (outerRadius - innerRadius) * 0.3

        ctx.beginPath()
        ctx.arc(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle), 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${(hue + i * 10) % 360}, 70%, 60%, 0.8)`
        ctx.fill()
      }

      // Update rotation
      rotation += 0.005
      hue = (hue + 0.1) % 360

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-[80vh] py-20">
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="h-full w-full opacity-30" />
      </div>

      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
              International Conference
            </span>
            <span className="mt-2 block text-white">SRMIST Tiruchirapalli</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-2xl text-xl text-gray-300"
        >
          Exploring the Frontiers of Technology and Innovation
          <span className="block mt-2 text-gray-400">June 15-17, 2025</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Register Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
          >
            View Schedule <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
