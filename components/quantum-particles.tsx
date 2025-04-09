"use client"

import { useEffect, useRef } from "react"
import { motion, type MotionValue, useTransform } from "framer-motion"

interface DynamicParticlesProps {
  scrollYProgress: MotionValue<number>
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
  hue: number
}

export function QuantumParticles({ scrollYProgress, mouseX, mouseY }: DynamicParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const particleEmissionRate = useRef(0)

  const particleCount = useTransform(scrollYProgress, [0, 1], [50, 100])
  const particleSpeed = useTransform(scrollYProgress, [0, 1], [0.5, 2])
  const connectionDistance = useTransform(scrollYProgress, [0, 1], [100, 200])

  // Define the addParticle function at the component level
  const addParticle = (fromMouse = false) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = fromMouse ? mousePosition.current.x + (Math.random() - 0.5) * 20 : Math.random() * canvas.width
    const y = fromMouse ? mousePosition.current.y + (Math.random() - 0.5) * 20 : Math.random() * canvas.height

    const hue = Math.random() * 60 + 240 // Blue to purple range
    const maxLife = fromMouse ? 50 + Math.random() * 30 : 200 + Math.random() * 100

    particles.current.push({
      x,
      y,
      size: fromMouse ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * (fromMouse ? 3 : 0.5),
      speedY: (Math.random() - 0.5) * (fromMouse ? 3 : 0.5),
      color: `hsla(${hue}, 80%, 60%, alpha)`,
      opacity: fromMouse ? 0.8 : Math.random() * 0.5 + 0.1,
      life: maxLife,
      maxLife,
      hue,
    })
  }

  useEffect(() => {
    const unsubscribeCount = particleCount.onChange((value) => {
      // Adjust particle count based on scroll position
      const targetCount = Math.floor(value)
      const currentCount = particles.current.length

      if (targetCount > currentCount) {
        // Add particles
        for (let i = 0; i < targetCount - currentCount; i++) {
          addParticle()
        }
      } else if (targetCount < currentCount) {
        // Remove particles
        particles.current = particles.current.slice(0, targetCount)
      }
    })

    return () => {
      unsubscribeCount()
    }
  }, [particleCount])

  useEffect(() => {
    const unsubscribeX = mouseX.onChange((value) => {
      mousePosition.current.x = value
    })

    const unsubscribeY = mouseY.onChange((value) => {
      mousePosition.current.y = value
    })

    const handleMouseMove = () => {
      // Calculate mouse speed for particle emission
      const dx = mousePosition.current.x - lastMousePosition.current.x
      const dy = mousePosition.current.y - lastMousePosition.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Adjust particle emission rate based on mouse speed
      particleEmissionRate.current = Math.min(speed / 2, 10)

      lastMousePosition.current = { x: mousePosition.current.x, y: mousePosition.current.y }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      unsubscribeX()
      unsubscribeY()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const initialCount = Math.min(Math.floor(window.innerWidth * 0.05), 50)

      for (let i = 0; i < initialCount; i++) {
        addParticle()
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Emit particles based on mouse movement
      if (particleEmissionRate.current > 0 && Math.random() < particleEmissionRate.current / 30) {
        addParticle(true)
      }

      // Get current values from motion values
      const currentSpeed = particleSpeed.get()
      const currentConnectionDistance = connectionDistance.get()

      particles.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX * currentSpeed
        particle.y += particle.speedY * currentSpeed

        // Update life
        particle.life -= 1
        if (particle.life <= 0) {
          // Remove dead particles
          particles.current.splice(i, 1)
          return
        }

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife
        const finalOpacity = particle.opacity * lifeRatio

        // Boundary check with bounce
        if (particle.x > canvas.width) {
          particle.x = canvas.width
          particle.speedX *= -1
        } else if (particle.x < 0) {
          particle.x = 0
          particle.speedX *= -1
        }

        if (particle.y > canvas.height) {
          particle.y = canvas.height
          particle.speedY *= -1
        } else if (particle.y < 0) {
          particle.y = 0
          particle.speedY *= -1
        }

        // Mouse interaction
        const dx = mousePosition.current.x - particle.x
        const dy = mousePosition.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const angle = Math.atan2(dy, dx)
          const force = (150 - distance) / 1500
          particle.speedX -= Math.cos(angle) * force
          particle.speedY -= Math.sin(angle) * force
        }

        // Speed limit
        const maxSpeed = 2
        const particleCurrentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
        if (particleCurrentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / particleCurrentSpeed) * maxSpeed
          particle.speedY = (particle.speedY / particleCurrentSpeed) * maxSpeed
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", finalOpacity.toString())
        ctx.fill()

        // Draw connections
        particles.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < currentConnectionDistance) {
              const opacity = (1 - distance / currentConnectionDistance) * 0.15
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })

      animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resizeCanvas)

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [particleSpeed, connectionDistance])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed left-0 top-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
