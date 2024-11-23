import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, Heart, ArrowRight, Music, Film, Dumbbell } from 'lucide-react'

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/50 fixed w-full z-50">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
           Zvarv AI
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/home">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-100 via-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center space-y-4 text-center"
            >
              <motion.div variants={item} className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Your Favorite Companions,
                  <span className="block">Now Just a Chat Away</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Step into a world where entertainment, learning, and well-being come together through meaningful conversations.
                </p>
              </motion.div>
              <motion.div variants={item} className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Discover the Magic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Film className="w-8 h-8 mb-2 text-purple-600" />,
                  title: "Entertainment",
                  description: "Chat with characters from movies, TV shows, and your favorite stories."
                },
                {
                  icon: <Music className="w-8 h-8 mb-2 text-purple-600" />,
                  title: "Music & Arts",
                  description: "Connect with virtual artists, musicians, and creative personalities."
                },
                {
                  icon: <Dumbbell className="w-8 h-8 mb-2 text-purple-600" />,
                  title: "Health & Fitness",
                  description: "Get motivated with virtual fitness trainers and wellness coaches."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      {feature.icon}
                      <CardTitle className="text-purple-600">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              About Zvarv AI
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl text-center mb-12">
            Zvarv AI brings characters to life through AI-powered conversations. 
              Our platform combines entertainment, creativity, and personal growth to create 
              meaningful interactions that inspire, educate, and delight.
            </p>
            <div className="flex justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl text-center mb-12">
              Ready to start your journey with Zvarv AI? We&apos;re here to help!
            </p>
            <div className="flex justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105">
                Contact Us
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-100 bg-white">
        <p className="text-xs text-gray-600">© 2024 Zvarv AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}