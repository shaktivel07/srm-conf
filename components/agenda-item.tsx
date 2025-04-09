"use client"

import { Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface AgendaItemProps {
  time: string
  title: string
  speaker: string
  role: string
  organization: string
}

export function AgendaItem({ time, title, speaker, role, organization }: AgendaItemProps) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
      <Card className="overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full items-center justify-center bg-white/5 p-4 md:w-1/4 md:p-6 border-r border-white/10">
              <div className="text-center">
                <Clock className="mx-auto mb-2 h-5 w-5 text-amber-400" />
                <p className="text-base font-medium text-white">{time}</p>
              </div>
            </div>

            <div className="flex-1 p-4 md:p-6">
              <h3 className="mb-3 text-xl font-bold text-pink-400">{title}</h3>

              <div className="mb-2 flex items-start">
                <User className="mr-2 mt-1 h-4 w-4 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">{speaker}</p>
                  <p className="text-sm text-white/70">{role}</p>
                  <p className="text-sm text-white/70">{organization}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
