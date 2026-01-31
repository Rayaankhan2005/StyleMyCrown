"use client"

import { motion } from "framer-motion"

interface ScannerOverlayProps {
  isScanning: boolean
}

export function ScannerOverlay({ isScanning }: ScannerOverlayProps) {
  if (!isScanning) return null

  return (
    <div className="absolute inset-0 z-10 overflow-hidden rounded-xl border-2 border-blue-500/50 box-border">
      {/* Scanning Beam */}
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse"
        }}
        className="absolute left-0 right-0 h-1 bg-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
      />
      
      {/* Grid Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-blue-500" />
      <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-blue-500" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-blue-500" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-blue-500" />
    </div>
  )
}
