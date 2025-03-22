'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Image from 'next/image';

// Types
interface GalleryquestImage {
  id: number;
  original_name: string;
  date_taken: string;
  uploaded_by: string;
  path_watermarked?: string;
  location_id: string;
}

interface Product {
  id: number;
  name: string;
  dateTaken: string;
  uploadedBy: string;
  price: string;
  imageUrl: string | null;
  locationId: number;
}

// Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-lg border border-gray-800 bg-neutral-800 shadow-lg animate-pulse">
    <div className="bg-gray-700 h-64 w-full"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
);

export default function Gallery() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=No+Image';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | 'all'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [previewImage, setPreviewImage] = useState<Product | null>(null);
  const [selectedHours, setSelectedHours] = useState<[number, number]>([0, 24]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing');
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const credentials = btoa(`${apiKey}:`);

        const response = await fetch(
          'https://photos-ventouxsummit.fr/api/galleryquest_images?display=full&output_format=JSON',
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.galleryquest_imagess) {
          throw new Error('API response format is unexpected.');
        }

        const formattedProducts: Product[] = data.galleryquest_imagess.map((item: GalleryquestImage) => ({
          id: item.id,
          name: item.original_name || 'Unknown Image',
          dateTaken: item.date_taken || '',
          uploadedBy: item.uploaded_by || 'Unknown',
          price: (Math.random() * 50 + 10).toFixed(2),
          imageUrl: item.path_watermarked
            ? `https://photos-ventouxsummit.fr/modules/galleryquest/download.php?id_image=${item.id}`
            : null,
          locationId: parseInt(item.location_id, 10),
        }));

        setProducts(formattedProducts);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching images:', err);
          setError(err.message);
        } else {
          console.error('Unknown error fetching images');
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiKey]);

  const filteredProducts = products.filter((product) => {
    const matchesLocation = selectedLocation === 'all' || product.locationId === selectedLocation;
    const productDate = new Date(product.dateTaken);
    const matchesStartDate = startDate ? productDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? productDate <= new Date(endDate) : true;
    const productHour = productDate.getHours();
    const matchesHour = productHour >= selectedHours[0] && productHour <= selectedHours[1];

    return matchesLocation && matchesStartDate && matchesEndDate && matchesHour;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-900 to-purple-800 text-white rounded-lg shadow-lg overflow-hidden mb-10">
        <div className="relative z-10 p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Image Gallery
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mb-4">
            Discover and explore an incredible collection of cycling adventures on Mont Ventoux!
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 blur-sm"></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center px-4">
        <select
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2 w-64"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
        >
          <option value="all">All Locations</option>
          {[...Array(9)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>{`Location ${idx + 1}`}</option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
        />

        <div className="flex flex-col items-center w-64">
          <label className="mb-2 text-sm text-gray-300">
            Time Range: {selectedHours[0]}:00 - {selectedHours[1]}:00
          </label>
          <Slider.Range
            min={0}
            max={24}
            allowCross={false}
            value={selectedHours}
            onChange={(value: number[]) => setSelectedHours([value[0], value[1]])}
            trackStyle={[{ backgroundColor: '#3B82F6' }]}
            handleStyle={[
              { borderColor: '#3B82F6', backgroundColor: '#3B82F6' },
              { borderColor: '#3B82F6', backgroundColor: '#3B82F6' },
            ]}
            railStyle={{ backgroundColor: '#374151' }}
          />
        </div>
      </div>

      {/* Loading / Error / Gallery */}
      {loading ? (
        <>
          <LoadingSpinner />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {[...Array(itemsPerPage)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                onClick={() => setPreviewImage(product)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                className="relative group overflow-hidden rounded-lg border border-gray-800 hover:border-blue-500 transition-all bg-neutral-800 shadow-lg cursor-pointer"
              >
                <Image
                  src={product.imageUrl || PLACEHOLDER_IMG}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <h2 className="text-lg font-semibold text-white mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-300">
                    {new Date(product.dateTaken).toLocaleDateString()} |{' '}
                    {new Date(product.dateTaken).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-gray-300">Uploaded by: {product.uploadedBy}</p>
                  <p className="text-sm text-gray-300">Location: {product.locationId}</p>
                  <p className="text-md font-bold text-blue-400 mt-2">${product.price}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No products available.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && (
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === idx + 1 ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            Next
          </button>
        </div>
      )}

      {/* AI Chatbot CTA */}
      <div className="mt-20 mb-10 flex justify-center">
        <div className="bg-gradient-to-r from-purple-700 to-blue-700 text-white px-8 py-6 rounded-lg shadow-lg text-center max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">Not seeing your pic yet?</h3>
          <p className="mb-4">Try our AI-powered chatbot to help you search smarter and faster!</p>
          <button
            onClick={() => alert('Chatbot coming soon!')}
            className="bg-white text-blue-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Chat with AI Assistant
          </button>
        </div>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
          <div className="bg-neutral-800 rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-lg">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 px-6 pb-6 overflow-hidden">
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src={previewImage.imageUrl || PLACEHOLDER_IMG}
                  alt={previewImage.name}
                  width={600}
                  height={400}
                  className="object-contain max-h-[60vh] w-full rounded"
                />
              </div>

              <div className="flex-1 text-left flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{previewImage.name}</h2>
                  <p className="text-gray-300 mb-1">Uploaded by: {previewImage.uploadedBy}</p>
                  <p className="text-gray-300 mb-1">Date: {new Date(previewImage.dateTaken).toLocaleDateString()}</p>
                  <p className="text-gray-300 mb-1">Time: {new Date(previewImage.dateTaken).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-gray-300 mb-1">Location ID: {previewImage.locationId}</p>
                  <p className="text-lg font-bold text-blue-400 mt-4">${previewImage.price}</p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => alert('Go to checkout!')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
