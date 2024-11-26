'use client'

import { useState, useCallback } from 'react'
import { Upload } from 'lucide-react'
import { cn } from "@/lib/utils"

export function UploadAvatar({ onUpload, className }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    }
  }, [onUpload])

  const handleChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    }
  }, [onUpload])

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors",
        "flex flex-col items-center justify-center gap-2 p-8 text-center ",
        isDragging && "border-primary",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="h-8 w-8 text-muted-foreground" color="#c018e2" />
      <div className="space-y-1">
        <p className="text-lg text-purple-500 font-medium">Drag an image</p>
        <p className="text-sm text-purple-500 text-muted-foreground">
          Select a image or drag here to upload directly
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
      />
    </div>
  )
}

