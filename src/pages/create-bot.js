'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify' // Install react-toastify for better feedback
import 'react-toastify/dist/ReactToastify.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { UploadAvatar } from '@/components/upload-avatar'
import { ToastContainer } from 'react-toastify';

export default function CreateBot() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    greeting: '',
    accentColor: 'from-blue-500 to-blue-700',
    avatar: null,
  })

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // File type and size validation
    const allowedTypes = ['image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG or PNG files are allowed.')
      return
    }

    if (file.size > 2 * 1024 * 1024) { // Limit: 2MB
      toast.error('File size exceeds 2MB.')
      return
    }

    setAvatarLoading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, avatar: publicUrl }))
      toast.success('Avatar uploaded successfully!')
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error('Failed to upload avatar. Please try again.')
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('custom_bots')
        .insert([{
          user_id: user?.id,
          name: formData.name,
          description: formData.description,
          avatar: formData.avatar,
          accent_color: formData.accentColor,
          greeting: formData.greeting,
        }])

      if (error) throw error

      toast.success('Bot created successfully!')
      setFormData({
        name: '',
        description: '',
        greeting: '',
        accentColor: 'from-blue-500 to-blue-700',
        avatar: null,
      })
      router.push('/home')
    } catch (error) {
      console.error('Error creating bot:', error)
      toast.error('Failed to create bot. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
        <ToastContainer />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-base text-center font-bold tracking-tighter sm:text-xl md:text-xl lg:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Create Your Custom Bot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Bot Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="greeting">Greeting Message</Label>
              <Textarea
                id="greeting"
                value={formData.greeting}
                onChange={(e) => setFormData(prev => ({ ...prev, greeting: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <UploadAvatar
                onUpload={(file) => handleImageUpload({ target: { files: [file] } })}
              />
              {avatarLoading && (
                <div className="text-sm text-purple-600 mt-1">Uploading...</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <Select
                value={formData.accentColor}
                onValueChange={(value) => setFormData(prev => ({ ...prev, accentColor: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an accent color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-blue-500 to-blue-700">Blue</SelectItem>
                  <SelectItem value="from-red-500 to-red-700">Red</SelectItem>
                  <SelectItem value="from-green-500 to-green-700">Green</SelectItem>
                  <SelectItem value="from-purple-500 to-purple-700">Purple</SelectItem>
                  <SelectItem value="from-gray-500 to-gray-700">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || avatarLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Bot'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
