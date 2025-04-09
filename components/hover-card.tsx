"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface HoverCardProps {
  item: {
    icon: ReactNode
    title: string
    description: string
  }
}

export function HoverCard({ item }: HoverCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full border-none bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg transition-all duration-300 hover:shadow-cyan-900/20 overflow-hidden group">
        <CardContent className="p-6 relative">
          {/* Animated border */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-teal-500 to-transparent"
              animate={{ y: ["100%", "-100%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-900/30 backdrop-blur-sm">
            {item.icon}
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
