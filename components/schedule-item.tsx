"use client"
import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ScheduleItemProps {
  event: {
    time: string
    title: string
    speaker: string
    location: string
  }
}

export function ScheduleItem({ event }: ScheduleItemProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
      <Card className="overflow-hidden border-none bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-purple-900/30">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-purple-900/30 p-4 md:w-1/4 md:p-6">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <div className="relative z-10 text-center">
                <Clock className="mx-auto mb-2 h-6 w-6 text-purple-400" />
                <p className="text-lg font-bold text-white">{event.time}</p>
              </div>
            </div>

            <div className="flex-1 p-4 md:p-6">
              <h3 className="mb-3 text-xl font-bold text-white">{event.title}</h3>

              {event.speaker && (
                <div className="mb-2 flex items-center text-sm text-gray-300">
                  <User className="mr-2 h-4 w-4 text-purple-400" />
                  <span>{event.speaker}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
