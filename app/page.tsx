"use client"

import { useEffect, useState, useRef } from "react"
import { color, motion, useScroll } from "framer-motion"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  Cpu,
  Users,
  Code,
  Zap,
  Globe,
  Microscope,
  Database,
  Menu,
  X,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpeakerCard } from "@/components/speaker-card"
import { AgendaItem } from "@/components/agenda-item"
import { ScrollProgress } from "@/components/scroll-progress"
import { CountdownTimer } from "@/components/countdown-timer"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"
import { GlowingText } from "@/components/glowing-text"
import { AnimatedCard } from "@/components/animated-card"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-workshop" },
    { name: "Topics", href: "#topics" },
    { name: "Speakers", href: "#speakers" },
    { name: "Schedule", href: "#schedule" },
    { name: "Registration", href: "#registration" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white-900 via-gray-800 to-white-900 text-black">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0"
        style={{ backgroundImage: "url('/images/quantum-bg.png')" }}
      />

      <AnimatedBackground />
      <FloatingElements />
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/srm-logo.png"
              alt="SRM Institute of Science and Technology"
              width={180}
              height={60}
              className="h-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-emerald-400 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold border-0"
              onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
            >
              Register
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-emerald-400 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold w-full border-0"
                onClick={() => {
                  document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })
                  setMobileMenuOpen(false)
                }}
              >
                Register
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      <div className="container relative z-10 mx-auto px-4 pt-24">
        {/* Hero Section */}
        <section id="home" className="relative py-20 md:py-32">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              
              <GlowingText
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                glowColor="rgba(16, 185, 129, 0.7)"
              >
                Quantum Computing Workshop
              </GlowingText>
              <h2 className="text-xl md:text-2xl font-medium text-amber-400">
                Fundamentals, Current Research, and Future Paths
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg text-white/80"
            >
              A Three-Day Intensive Workshop to Equip Educators with the Latest Advancements in Quantum Computing.
              <span className="block mt-2 text-pink-400 font-medium">July 16-18, 2025</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12 flex flex-wrap items-center justify-center gap-6 text-base"
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-amber-400" />
                <span className="text-white/90">16-07-2025 to 18-07-2025</span>
              </div>

              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-amber-400" />
                <span className="text-white/90">SRM Institute of Science and Technology, Tiruchirappalli</span>
              </div>

              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-amber-400" />
                <span className="text-white/90">Language of Instruction: Tamil</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-lg group border-0"
                onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="flex items-center">
                  Register Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full px-4 py-6 flex justify-center items-center sm:px-6 md:px-8"
            >
              <div className="text-center">
                <CountdownTimer targetDate="2025-07-16T09:00:00" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              onClick={() => document.getElementById("about-institute")?.scrollIntoView({ behavior: "smooth" })}
              className="flex cursor-pointer flex-col items-center"
            >
              <span className="mb-2 text-sm text-white/70">Learn More</span>
              <div className="h-8 w-5 rounded-full border-2 border-emerald-500/50">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="mx-auto mt-1 h-2 w-2 rounded-full bg-emerald-400"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Institute Section */}
        <section
          id="about-institute"
          className="py-20 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(245, 158, 11, 0.5)">
              About the Institute
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-500" />
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="mb-4 text-2xl font-bold text-pink-400">SRM Institute of Science and Technology</h3>
              <p className="text-base leading-relaxed text-white/80">
                SRM Institute of Science and Technology (SRMIST), Tiruchirappalli, is a premier institution known for
                its academic excellence, innovation and research in various fields, particularly in Engineering and
                Technology. The institution boasts state-of-the-art facilities, cutting-edge laboratories and a vibrant
                campus culture that fosters creativity and research.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                SRMIST's commitment to providing world-class education and hands-on experiences makes it an ideal
                platform for this workshop. In line with the growing significance of Quantum Computing, SRMIST aims to
                empower educators with the latest knowledge in this transformative field as part of the global focus on
                Quantum Computing in 2025, which has been declared the "Quantum Computing Year" by various scientific
                communities worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center justify-center"
            >
              <div className="relative overflow-hidden rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/30">
                <Image
                  src="/images/srm-logo.png"
                  alt="SRM Institute of Science and Technology"
                  width={400}
                  height={200}
                  className="h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About AICTE-ATAL Section */}
        <section id="about-aicte" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(236, 72, 153, 0.5)">
              About AICTE-ATAL
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-pink-400 to-rose-500" />
          </motion.div>

          <AnimatedCard className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="mb-6 text-base leading-relaxed text-white/80">
                AICTE (All India Council for Technical Education) is the apex regulatory body for technical education in
                India. Its initiatives, like the ATAL (AICTE Training and Learning) scheme, aim to enhance faculty
                members' skills in emerging technologies, ensuring that educators stay at the cutting edge of research
                and development.
              </p>
              <p className="text-base leading-relaxed text-white/80">
                ATAL-VAANI, an extension of the ATAL initiative, focuses on delivering high-quality education through
                regional language support, including Tamil. This ensures greater accessibility to advanced technological
                knowledge, promoting interdisciplinary learning across India. The scheme plays a pivotal role in
                bridging knowledge gaps in fields like Quantum Computing, Artificial Intelligence and Cybersecurity,
                enabling educators to bring the latest advancements into their classrooms.
              </p>
            </motion.div>
          </AnimatedCard>
        </section>

        {/* About Workshop Section */}
        <section
          id="about-workshop"
          className="py-20 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(16, 185, 129, 0.5)">
              About the Workshop
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-4xl mb-12"
          >
            <p className="mb-6 text-base leading-relaxed text-white/80">
              The three-day workshop titled "Quantum Computing: Fundamentals, Current Research, and Future Paths" is
              designed to equip participants with a comprehensive understanding of Quantum Computing. As 2025 has been
              declared the "Quantum Computing Year", this workshop aligns perfectly with the global emphasis on quantum
              technologies. The program will focus on both foundational concepts and cutting-edge research, offering
              participants valuable insights into the future of computing.
            </p>
            <p className="text-base leading-relaxed text-white/80">
              The workshop will be conducted in Tamil to ensure accessibility and inclusivity, aligned with the VAANI
              scheme to promote technical education in regional languages.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Cpu className="h-8 w-8 text-emerald-400" />,
                title: "Quantum Computing Fundamentals",
                description:
                  "A thorough introduction to the principles of quantum mechanics, quantum states and qubits, which form the foundation of quantum computing.",
              },
              {
                icon: <Microscope className="h-8 w-8 text-amber-400" />,
                title: "Current Research in Quantum Computing",
                description:
                  "Exploration of the latest developments in quantum computing, including quantum algorithms, quantum error correction and advancements in quantum hardware.",
              },
              {
                icon: <Code className="h-8 w-8 text-pink-400" />,
                title: "Quantum Algorithms",
                description:
                  "In-depth analysis of key quantum algorithms such as Shor's algorithm and Grover's algorithm, which are set to revolutionize industries by offering exponential speedups for certain tasks.",
              },
              {
                icon: <Zap className="h-8 w-8 text-indigo-400" />,
                title: "Future Paths and Applications",
                description:
                  "Insight into the future impact of quantum computing in fields like cryptography, drug discovery, material science and artificial intelligence.",
              },
              {
                icon: <Database className="h-8 w-8 text-purple-400" />,
                title: "Industry Use Cases",
                description:
                  "Real-time applications of quantum computing in sectors such as healthcare, finance and manufacturing.",
              },
              {
                icon: <Users className="h-8 w-8 text-teal-400" />,
                title: "Interactive Sessions",
                description:
                  "Practical, hands-on labs and live demonstrations that will allow participants to gain real-world experience with quantum computing tools and simulations.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AnimatedCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-pink-400">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Attend Section */}
        <section id="why-attend" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(245, 158, 11, 0.5)">
              Why Attend This Workshop?
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-500" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedCard>
                <ul className="space-y-6 text-base text-white/80">
                  <motion.li
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-2 mt-1 text-emerald-400">•</span>
                    <span>
                      <strong className="text-pink-400">Stay Ahead of the Curve:</strong> Discover the future of
                      computing with exclusive insights into quantum technologies, making 2025 the Quantum Computing
                      Year.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-2 mt-1 text-amber-400">•</span>
                    <span>
                      <strong className="text-pink-400">Learn from Experts:</strong> Hear from leading industry
                      professionals and academic researchers pioneering advancements in quantum computing.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-2 mt-1 text-pink-400">•</span>
                    <span>
                      <strong className="text-pink-400">Boost Academics and Research:</strong> Explore ways to integrate
                      quantum computing into your curriculum and research projects effectively.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-2 mt-1 text-indigo-400">•</span>
                    <span>
                      <strong className="text-pink-400">Hands-on & Localized Learning:</strong> Engage in practical labs
                      and live demos delivered in Tamil for better understanding and accessibility.
                    </span>
                  </motion.li>
                </ul>
              </AnimatedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedCard className="overflow-hidden">
                <img
                  src="/images/quantum-bg.png"
                  alt="Quantum Computing Visualization"
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </AnimatedCard>
            </motion.div>
          </div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="py-20 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(236, 72, 153, 0.5)">
              Workshop Topics
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-pink-400 to-rose-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Four verticals of Quantum Technologies",
                "Introduction to Quantum Theory",
                "Review of Quantum Mechanics",
                "Quantum computation",
                "Quantum Information and Computation",
                "Basic of Quantum gates",
                "Quantum Computing: Algorithms and Applications",
                "Hands on-1: Invoking the environment for QISKIT Platform",
                "Hands on: QISKIT Implementation of Quantum Gates",
                "Quantum Algorithms",
                "Quantum Error Correction",
                "Implementation of Quantum circuits in Hardware using Qiskit",
                "Hands on: QISKIT Implementation of Quantum circuits",
                "Hands on: QISKIT Implementation of Quantum Algorithm",
              ].map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="rounded-lg bg-white/10 backdrop-blur-sm p-4 shadow-lg border border-white/20"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <div className="flex items-start">
                    <Sparkles className="mr-3 h-5 w-5 text-amber-400 mt-0.5" />
                    <span className="text-white/90">{topic}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(16, 185, 129, 0.5)">
              Meet the Experts
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500" />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                name: "Dr. Prabha",
                role: "Associate Professor",
                department: "Department of Physics",
                organization: "Indian Institute of Technology, Madras",
                image: "/images/1.png",
              },
              {
                name: "Johnbasco Vijay Anand",
                role: "Senior Cybersecurity Architect",
                department: "",
                organization: "NeST Digital Private Limited",
                image: "/images/2.png",
              },
              {
                name: "Dr. Kanaga Suba Raja S",
                role: "Head of The Department",
                department: "Department of CSE",
                organization: "SRMIST Tiruchirappalli",
                image: "/images/3.png",
              },
              {
                name: "Dr. K. Rajalakshmi",
                role: "Associate Professor",
                department: "Department of ECE",
                organization: "PSG College of Technology, Coimbatore",
                image: "/images/5.png",
              },
              {
                name: "Ms. Janani A",
                role: "Quantum Engineer",
                department: "",
                organization: "IBM Research, Bengaluru",
                image: "/images/4.png",
              },
              {
                name: "Dr. S. Gayathri",
                role: "Associate Professor",
                department: "Department of Datascience",
                organization: "Coimbatore Institute of Science and Technology",
                image: "/images/6.png",
              },
              {
                name: "Mr. Kumaresan",
                role: "Senior AI Consultant",
                department: "",
                organization: "Google India Pvt Ltd, Bangalore",
                image: "/images/7.png",
              },
              {
                name: "Kumar Thenkarai",
                role: "Vice President",
                department: "",
                organization: "Citi Bank, Chennai, Tamil Nadu, India",
                image: "/images/8.png",
              },
            ].map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * (index % 4) }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <SpeakerCard speaker={speaker} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        <section
          id="schedule"
          className="py-20 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(245, 158, 11, 0.5)">
              Workshop Schedule
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-500" />
          </motion.div>

          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm shadow-md border border-white/20">
              <TabsTrigger
                value="day1"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-emerald-400 text-white/80"
              >
                Day 1
              </TabsTrigger>
              <TabsTrigger
                value="day2"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-emerald-400 text-white/80"
              >
                Day 2
              </TabsTrigger>
              <TabsTrigger
                value="day3"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-emerald-400 text-white/80"
              >
                Day 3
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day1" className="mt-0">
              <div className="space-y-4">
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 1"
                  speaker="Dr. Prabha"
                  role="Associate Professor, Department of Physics"
                  organization="Indian Institute of Technology, Madras"
                />
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 2"
                  speaker="Johnbasco Vijay Anand"
                  role="Senior Cybersecurity Architect"
                  organization="NeST Digital Private Limited"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 3"
                  speaker="Dr. Kanaga Suba Raja S"
                  role="Head of The Department, Department of CSE"
                  organization="SRM Institute of Science and Technology, Tiruchirappalli"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 4"
                  speaker="Dr. K. Rajalakshmi"
                  role="Associate Professor, Department of ECE"
                  organization="PSG College of Technology, Coimbatore"
                />
              </div>
            </TabsContent>

            <TabsContent value="day2" className="mt-0">
              <div className="space-y-4">
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 5"
                  speaker="Ms. Janani A"
                  role="Quantum Engineer"
                  organization="IBM Research, Bengaluru"
                />
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 6"
                  speaker="Dr. S. Gayathri"
                  role="Associate Professor, Department of Datascience"
                  organization="Coimbatore Institute of Science and Technology"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 7"
                  speaker="Mr. Kumaresan"
                  role="Senior AI Consultant"
                  organization="Google India Pvt Ltd, Bangalore"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 8"
                  speaker="Kumar Thenkarai"
                  role="Vice President"
                  organization="Citi Bank, Chennai, Tamil Nadu, India"
                />
              </div>
            </TabsContent>

            <TabsContent value="day3" className="mt-0">
              <div className="space-y-4">
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 9"
                  speaker="Dr. Manjula Gandhi"
                  role="Associate Professor, Department of Computing"
                  organization="Coimbatore Institute of Science and Technology"
                />
                <AgendaItem
                  time="09:00 am - 12:00 pm"
                  title="Session 10"
                  speaker="Dr. R. Sankaranarayanan"
                  role="Professor, Department of Physics"
                  organization="National Institute of Technology, Tiruchirappalli"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 11"
                  speaker="Dr. S. Balakrishnan"
                  role="HOD of Physics, Associate Professor, School of Advanced Sciences"
                  organization="Vellore Institute of Technology, Vellore"
                />
                <AgendaItem
                  time="01:00 pm - 04:00 pm"
                  title="Session 12"
                  speaker="Dr. B. Devisri"
                  role="Assistant Professor, Department of ECE"
                  organization="SRM Institute of Science and Technology, Tiruchirappalli"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Registration Section */}
        <section id="registration" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(236, 72, 153, 0.5)">
              Registration Details
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-pink-400 to-rose-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <AnimatedCard className="mx-auto max-w-3xl opacity-900">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold text-pink-400">Registration Information</h3>
                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-center">
                      <Calendar className="mr-3 h-5 w-5 text-amber-400" />
                      <span>Dates: 16-07-2025 to 18-07-2025</span>
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-emerald-400" />
                      <span>Time: Morning and Afternoon Sessions</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-pink-400" />
                      <span>Venue: SRM Institute of Science and Technology, Tiruchirappalli</span>
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="mr-3 h-5 w-5 text-indigo-400" />
                      <span>Registration: FREE</span>
                    </li>
                    <li className="flex items-center">
                      <Cpu className="mr-3 h-5 w-5 text-purple-400" />
                      <span>Mode of Registration: Offline</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold text-pink-400">Who Can Apply?</h3>
                  <p className="text-white/80 mb-4">
                    The ATAL-VAANI scheme is open to faculty members, research scholars and PG scholars from
                    AICTE-approved institutions, as well as industry personnel involved in professional preparation.
                  </p>
                  <p className="text-white/80">
                    To be eligible for certification, participants must maintain 80% attendance throughout the program.
                    This ensures active engagement and learning during the conferences, seminars and workshops
                    facilitated under the scheme.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 text-lg shadow-lg border-0"
                >
                  Registration coming soon!
                </Button>
              </div>
            </AnimatedCard>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <GlowingText className="mb-4 text-3xl font-bold text-white md:text-4xl" glowColor="rgba(16, 185, 129, 0.5)">
              Contact Information
            </GlowingText>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedCard>
                <h3 className="mb-4 text-xl font-bold text-pink-400">Coordinator</h3>
                <div className="space-y-4">
                  <p className="text-lg font-medium text-white">Dr. Kanaga Suba Raja S</p>
                  <p className="text-white/80">Head of the Department, School of Computing (SRMIST)</p>
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-2">Email:</span>
                    <a href="mailto:kanagass@srmist.edu.in" className="text-white/80 hover:text-emerald-400">
                      kanagass@srmist.edu.in
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-2">Phone:</span>
                    <a href="tel:9486684400" className="text-white/80 hover:text-emerald-400">
                      +91 9486684400
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedCard>
                <h3 className="mb-4 text-xl font-bold text-pink-400">Co-Coordinator</h3>
                <div className="space-y-4">
                  <p className="text-lg font-medium text-white">Dr. B. Devisri</p>
                  <p className="text-white/80">Assistant Professor, Department of ECE (SRMIST)</p>
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-2">Email:</span>
                    <a href="mailto:devisrib@srmist.edu.in" className="text-white/80 hover:text-emerald-400">
                      devisrib@srmist.edu.in
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-2">Phone:</span>
                    <a href="tel:9994090100" className="text-white/80 hover:text-emerald-400">
                      +91 9994090100
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8 text-center"
          >
            <p className="text-white/80">
              For program-related updates, visit the School of Computing, SRM Tiruchirappalli
            </p>
            <a
              href="https://www.srmtrichy.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center justify-center mt-2"
            >
              www.srmtrichy.edu.in <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <Image
                src="/images/srm-logo.png"
                alt="SRM Institute of Science and Technology"
                width={150}
                height={50}
                className="h-auto mr-4"
              />
              <div className="text-center" style={{textAlign: 'center'}}>
                <p className="text-white/80">
                  © 2025 SRM Institute of Science and Technology, Tiruchirappalli. All rights reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-white/60">
            <a href="#" className="hover:text-emerald-400">
              Terms and Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400">
              Privacy Policy
            </a>
            <span>
              Developed by <a href="https://www.linkedin.com/in/shaktivel-t-k-803a75335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-yellow-400" target="_blank" rel="noopener noreferrer">Shaktivel</a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
