"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface HighlightCardProps {
  item: {
    icon: ReactNode
    title: string
    description: string
  }
}

export function HighlightCard({ item }: HighlightCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full border-none bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg transition-all duration-300 hover:shadow-purple-900/20">
        <CardContent className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/30 backdrop-blur-sm">
            {item.icon}
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
          <p className="text-slate-300">{item.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
