'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  // Prefetch gallery page on component mount
  useEffect(() => {
    router.prefetch('/gallery');
  }, [router]);

  const handleExploreClick = () => {
    router.push('/gallery');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 to-purple-800 text-white font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h1 className="text-5xl mb-6 font-bold text-center">Welcome to Ventoux Summit Photos!</h1>

        <p className="text-lg mb-8 max-w-2xl mx-auto text-center">
          Explore and relive the best cycling adventures at Mont Ventoux.
        </p>

        <button
          onClick={handleExploreClick}
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
        >
          Explore Photos
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
