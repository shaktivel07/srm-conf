"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GlitchText } from "./glitch-text"

interface TechHeroSectionProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export function TechHeroSection({ mouseX, mouseY }: TechHeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2) // For retina displays

    const centerX = canvas.width / 4 // Adjusted for scale
    const centerY = canvas.height / 4 // Adjusted for scale
    const outerRadius = (Math.min(canvas.width, canvas.height) / 4) * 0.4
    const innerRadius = outerRadius * 0.8

    let rotation = 0
    let hue = 260 // Purple hue
    let mouseXValue = 0
    let mouseYValue = 0

    const unsubscribeX = mouseX.onChange((value) => {
      mouseXValue = value
    })

    const unsubscribeY = mouseY.onChange((value) => {
      mouseYValue = value
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2) // Adjusted for scale

      // Calculate mouse influence
      const canvasRect = canvas.getBoundingClientRect()
      const mouseXRatio = (mouseXValue - canvasRect.left) / canvasRect.width
      const mouseYRatio = (mouseYValue - canvasRect.top) / canvasRect.height
      const mouseDistanceX = mouseXRatio * 2 - 1 // -1 to 1
      const mouseDistanceY = mouseYRatio * 2 - 1 // -1 to 1

      // Draw circular grid with mouse influence
      const segments = 36
      const rings = 5

      // Distortion amount based on mouse position
      const distortionX = mouseDistanceX * 20
      const distortionY = mouseDistanceY * 20

      for (let i = 0; i <= rings; i++) {
        const radius = innerRadius + (outerRadius - innerRadius) * (i / rings)

        ctx.beginPath()
        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2

          // Apply distortion based on mouse position
          const distortionFactor = Math.sin(angle * 3 + rotation * 2) * 5
          const distortedRadius =
            radius + distortionFactor + Math.cos(angle) * distortionX + Math.sin(angle) * distortionY

          const x = centerX + distortedRadius * Math.cos(angle)
          const y = centerY + distortedRadius * Math.sin(angle)

          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.strokeStyle = `hsla(${hue + i * 5}, 70%, 50%, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw radial lines
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + rotation

        // Apply distortion to the lines
        const innerDistortion = Math.sin(angle * 5 + rotation * 3) * 5
        const outerDistortion = Math.sin(angle * 3 + rotation * 2) * 10

        const innerX =
          centerX +
          (innerRadius + innerDistortion + (Math.cos(angle) * distortionX) / 2 + (Math.sin(angle) * distortionY) / 2) *
            Math.cos(angle)
        const innerY =
          centerY +
          (innerRadius + innerDistortion + (Math.cos(angle) * distortionX) / 2 + (Math.sin(angle) * distortionY) / 2) *
            Math.sin(angle)

        const outerX =
          centerX +
          (outerRadius + outerDistortion + Math.cos(angle) * distortionX + Math.sin(angle) * distortionY) *
            Math.cos(angle)
        const outerY =
          centerY +
          (outerRadius + outerDistortion + Math.cos(angle) * distortionX + Math.sin(angle) * distortionY) *
            Math.sin(angle)

        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw data points
      const dataPoints = 12
      for (let i = 0; i < dataPoints; i++) {
        const angle = (i / dataPoints) * Math.PI * 2 + rotation * 1.5
        const distortionFactor = Math.sin(angle * 8 + rotation * 5) * 10

        const radius =
          innerRadius +
          Math.sin(i * 5 + rotation * 3) * (outerRadius - innerRadius) * 0.3 +
          distortionFactor +
          Math.cos(angle) * distortionX +
          Math.sin(angle) * distortionY

        ctx.beginPath()
        ctx.arc(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle),
          3 + Math.sin(i + rotation * 2) * 1.5,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `hsla(${(hue + i * 10) % 360}, 70%, 60%, 0.8)`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle),
          6 + Math.sin(i + rotation * 2) * 3,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `hsla(${(hue + i * 10) % 360}, 70%, 60%, 0.2)`
        ctx.fill()
      }

      // Update rotation
      rotation += 0.005
      hue = (hue + 0.1) % 360

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2) // For retina displays
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      unsubscribeX()
      unsubscribeY()
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mouseX, mouseY])

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] py-20">
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <canvas ref={canvasRef} className="h-full w-full opacity-30" />
      </motion.div>

      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <GlitchText className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            International Conference
          </GlitchText>
          <motion.span
            className="mt-2 block text-5xl font-extrabold text-white md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SRMIST Tiruchirapalli
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-2xl text-xl text-gray-300"
        >
          Exploring the Frontiers of Technology and Innovation
          <span className="block mt-2 text-gray-400">June 15-17, 2025</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 relative overflow-hidden group"
            data-cursor-text="Register"
          >
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300 relative overflow-hidden group"
            data-cursor-text="View"
          >
            <span className="relative z-10 flex items-center">
              View Schedule{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
