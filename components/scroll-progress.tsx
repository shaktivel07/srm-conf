"use client"

import { motion, useSpring, type MotionValue } from "framer-motion"

interface ScrollProgressProps {
  scrollYProgress: MotionValue<number>
}

export function ScrollProgress({ scrollYProgress }: ScrollProgressProps) {
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 origin-left"
      style={{ scaleX }}
    />
  )
}
