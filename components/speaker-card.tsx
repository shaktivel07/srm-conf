"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface SpeakerProps {
  speaker: {
    name: string
    role: string
    department: string
    organization: string
    image: string
  }
}

export function SpeakerCard({ speaker }: SpeakerProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-white/5">
          <img
            src={speaker.image || "/placeholder.svg"}
            alt={speaker.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-lg font-bold text-pink-400">{speaker.name}</h3>
          <p className="mb-1 text-sm text-emerald-400">{speaker.role}</p>
          {speaker.department && <p className="text-xs text-white/70">{speaker.department}</p>}
          <p className="text-xs text-white/70">{speaker.organization}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
