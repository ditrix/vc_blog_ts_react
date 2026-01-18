'use client'

import { useState, useRef } from 'react'
import { Image as ImageIcon, X, UploadCloud } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  currentImage?: string | null
  onImageSelect: (file: File | null) => void
}

export default function ImageUpload({ currentImage, onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    currentImage ? `/uploads/${currentImage}-low.webp` : null
  )
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    onImageSelect(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const removeImage = () => {
    setPreview(null)
    onImageSelect(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
        Обложка статьи
      </label>
      
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`relative aspect-[16/9] rounded-[24px] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ios-shadow ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border/60 bg-secondary/20 hover:bg-secondary/40'
        }`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </>
        ) : (
          <div 
            className="flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-[17px] font-semibold text-foreground">Загрузить фото</p>
              <p className="text-[13px] text-muted-foreground">Перетащите сюда или нажмите</p>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
