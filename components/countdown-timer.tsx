"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {[
        { label: "Days", value: timeLeft.days, color: "from-emerald-500 to-teal-600" },
        { label: "Hours", value: timeLeft.hours, color: "from-amber-500 to-yellow-600" },
        { label: "Minutes", value: timeLeft.minutes, color: "from-pink-500 to-rose-600" },
        { label: "Seconds", value: timeLeft.seconds, color: "from-indigo-500 to-purple-600" },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div
              className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${item.color} border border-white/20 shadow-lg md:h-24 md:w-24`}
            >
              <motion.span
                key={item.value} // Re-render on value change
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="text-2xl font-bold text-white md:text-3xl"
              >
                {item.value.toString().padStart(2, "0")}
              </motion.span>
            </div>
            <span className="mt-2 text-sm font-medium text-white md:text-base">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
