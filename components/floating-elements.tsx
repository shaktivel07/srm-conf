"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  const elements = [
    { size: 100, x: "10%", y: "20%", duration: 20, delay: 0, rotate: 360, color: "from-emerald-500/10 to-teal-500/5" },
    { size: 150, x: "80%", y: "15%", duration: 25, delay: 5, rotate: -360, color: "from-amber-500/10 to-yellow-500/5" },
    { size: 80, x: "25%", y: "80%", duration: 22, delay: 2, rotate: 360, color: "from-pink-500/10 to-rose-500/5" },
    { size: 120, x: "70%", y: "75%", duration: 18, delay: 8, rotate: -360, color: "from-blue-500/10 to-indigo-500/5" },
    { size: 60, x: "40%", y: "30%", duration: 15, delay: 12, rotate: 360, color: "from-purple-500/10 to-violet-500/5" },
    { size: 90, x: "60%", y: "60%", duration: 30, delay: 7, rotate: -360, color: "from-green-500/10 to-emerald-500/5" },
  ]

  return (
    <div className="pointer-events-none fixed left-0 top-0 h-full w-full overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${element.color}`}
          style={{
            width: element.size,
            height: element.size,
            left: element.x,
            top: element.y,
            filter: "blur(40px)",
          }}
          animate={{
            y: [`calc(${element.y} - 50px)`, `calc(${element.y} + 50px)`, `calc(${element.y} - 50px)`],
            rotate: [0, element.rotate],
            scale: [1, 1.1, 1],
          }}
          transition={{
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: element.duration,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Number.POSITIVE_INFINITY,
              duration: element.duration * 2,
              ease: "linear",
            },
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: element.duration / 2,
              ease: "easeInOut",
            },
            delay: element.delay,
          }}
        />
      ))}
    </div>
  )
}
