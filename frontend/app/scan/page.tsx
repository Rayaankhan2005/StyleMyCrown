"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UploadZone } from "@/components/scan/upload-zone"
import { ScannerOverlay } from "@/components/scan/scanner-overlay"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
    setResult(null)
  }

  const startAnalysis = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setProgress(0)
    
    // Simulate progression for UX
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + 10
      })
    }, 500)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Replace with your actual backend URL
      const response = await fetch("http://localhost:8000/api/v1/analysis/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      
      clearInterval(interval)
      setProgress(100)
      
      setTimeout(() => {
        setIsAnalyzing(false)
        setResult(data.message)
      }, 500) // Small delay to show 100%

    } catch (error) {
      clearInterval(interval)
      setIsAnalyzing(false)
      alert("Error analyzing image. Please ensure backend is running.")
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
           <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
            Analyze Your Features
          </h1>
          <p className="text-gray-400">
            Upload a clear selfie. Our AI will map your face structure and hairline.
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
            {!previewUrl ? (
                 <UploadZone onFileSelect={handleFileSelect} isUploading={isAnalyzing} />
            ) : (
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-h-[500px] mx-auto bg-black/50">
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                    />
                    
                    {/* Scanner Overlay */}
                    <ScannerOverlay isScanning={isAnalyzing} />
                    
                    {/* Scanning Text Overlay */}
                    {isAnalyzing && (
                        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2">
                             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                                <span className="text-sm font-medium text-white">
                                    Analyzing facial landmarks... {progress}%
                                </span>
                             </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
            {previewUrl && !isAnalyzing && !result && (
                <>
                <Button variant="ghost" onClick={() => {
                    setFile(null)
                    setPreviewUrl(null)
                }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={startAnalysis} className="min-w-[150px]">
                    Confirm & Scan
                </Button>
                </>
            )}

            {result && (
                <div className="w-full bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-medium text-green-100">Analysis Complete</p>
                        <p className="text-green-300/80 mt-1">{result}</p>
                    </div>
                     <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto text-green-300 hover:text-green-200"
                        onClick={() => {
                            setFile(null)
                            setPreviewUrl(null)
                            setResult(null)
                        }}
                    >
                        Scan New
                    </Button>
                </div>
            )}
        </div>

      </div>
    </div>
  )
}
