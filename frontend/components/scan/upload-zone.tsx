"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isUploading: boolean
}

export function UploadZone({ onFileSelect, isUploading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0])
    }
  }, [onFileSelect])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0])
    }
  }

  const validateAndSelect = (file: File) => {
    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }
    // Max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }
    onFileSelect(file)
  }

  return (
    <div
      onClick={() => !isUploading && fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative group cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[300px]",
        isDragging
          ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
          : "border-white/20 hover:border-white/40 hover:bg-white/5",
        isUploading ? "pointer-events-none opacity-50" : ""
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col items-center p-6 text-center space-y-4">
        <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
          <Upload className="h-8 w-8 text-white/70" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-medium text-white">
            Click or drag & drop your photo
          </p>
          <p className="text-sm text-gray-400">
            Supports JPG, PNG (Max 5MB)
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          <AlertCircle className="h-3 w-3" />
          <span>Photos are processed securely in private storage</span>
        </div>
      </div>
    </div>
  )
}
