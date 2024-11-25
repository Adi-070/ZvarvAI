import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChromeIcon } from 'lucide-react'
import { supabase } from "../../lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      
      if (error) throw error
      router.push("/home")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <header className="flex flex-col items-center justify-between p-4 sm:flex-row sm:p-6">
        <Link href="/" className="mb-4 text-xl font-semibold text-purple-600 sm:mb-0">
          Zvarv AI
        </Link>
        <nav className="space-x-2 text-sm sm:space-x-4 sm:text-base">
          <Link href="/features" className="text-gray-600 hover:text-purple-600">
            Features
          </Link>
          <Link href="/" className="text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-purple-600">
            Contact
          </Link>
        </nav>
      </header>

      {/* Login Form */}
      <div className="container mx-auto flex min-h-[calc(100vh-120px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Sign in to continue to your account
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <form className="space-y-4 sm:space-y-6" onSubmit={handleEmailLogin}>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                placeholder="hello@example.com"
                className="border-purple-100 focus-visible:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                className="border-purple-100 focus-visible:ring-purple-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-purple-50 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleLogin}
            type="button"
          >
            <ChromeIcon className="mr-2 h-4 w-4" />
            Google
          </Button>

          <div className="text-center text-xs sm:text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:text-purple-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}