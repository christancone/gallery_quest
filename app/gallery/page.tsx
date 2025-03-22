'use client';

import Gallery from '../pages/gallery'; // Move Gallery component to /components/Gallery.tsx


export default function GalleryPage() {
  

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      

      {/* Gallery Component */}
      <Gallery />
    </div>
  );
}
