'use client';

import { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import Image from 'next/image';



export default function ProductGallery({ images, title }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <div className="space-y-4">
            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white hover:text-red-500 bg-white/10 rounded-full p-2"
                    >
                        <X size={32} />
                    </button>
                    <div className="w-full max-w-4xl max-h-[90vh] flex flex-col items-center">
                        <img
                            src={images[selectedImage]}
                            alt="Zoomed"
                            className="max-h-[80vh] object-contain rounded-md shadow-2xl"
                        />
                    </div>
                </div>
            )}

            {/* Main Image */}
            <div
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
            >
                <Image
                    src={images[selectedImage]}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                        <ZoomIn size={24} className="text-gray-800" />
                    </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                    تخفيض -30%
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent bg-gray-100'}`}
                    >
                        <Image src={img} alt="thumbnail" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}