'use client';

import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Product {
  id: number;
  name: string;
  dateTaken: string;
  uploadedBy: string;
  price: string;
  imageUrl: string;
  locationId: number;
}

export default function HomePage() {
  const products: Product[] = [
    {
      id: 15,
      name: 'IMG_GQ_158_filigrane.jpg',
      dateTaken: '2024-11-22 12:46:00',
      uploadedBy: 'Sankeethan Tharmathayalan',
      price: '29.99',
      imageUrl: 'https://pub-f154438dceef491ba243fbee53912d51.r2.dev/wp-content/uploads/2015/06/07230451/DSC_1073_kl.jpg',
      locationId: 1,
    },
    {
      id: 23,
      name: 'free-photo-of-majestic-white-pelican-near-lush-forest-pond.jpeg',
      dateTaken: '2024-11-30 19:53:38',
      uploadedBy: 'Sankeethan Tharmathayalan',
      price: '39.99',
      imageUrl: 'https://www.provence-cycling.co.uk/app/uploads/2020/10/velo-ventoux-Hocquel.jpg',
      locationId: 2,
    },
    {
      id: 25,
      name: 'Plan de travail 2 copie.jpg',
      dateTaken: '2024-12-01 07:16:55',
      uploadedBy: 'Vivien Vassalo',
      price: '24.99',
      imageUrl: 'https://www.bretonbikes.com/images/sliderpics/cyclists/cycling-holiday-up-the-ventoux.JPG',
      locationId: 9,
    },
    {
      id: 26,
      name: 'IMG_GQ_158_filigrane.jpg',
      dateTaken: '2024-12-01 07:36:09',
      uploadedBy: 'Vivien Vassalo',
      price: '19.99',
      imageUrl: 'https://progressivegeographies.com/wp-content/uploads/2013/07/ventoux1.jpg',
      locationId: 8,
    },
    {
      id: 53,
      name: 'rider1.jpg',
      dateTaken: '2024-12-08 20:27:31',
      uploadedBy: 'Sankeethan Tharmathayalan',
      price: '34.99',
      imageUrl: 'https://cdm0lfbn.cloudimg.io/v7/_images_base_/image_uploader/cities/photos/original/mountain-biker.jpg?ua=1654013267&p=small',
      locationId: 1,
    },
    
    {
      id: 101,
      name: 'Ride and Seek Adventure',
      dateTaken: '2024-06-15 10:20:00',
      uploadedBy: 'Alex Martin',
      price: '49.99',
      imageUrl: 'https://rideandseek.com/wp-content/uploads/2019/03/IMG_8352.1-1500x1000.jpg',
      locationId: 3,
    },
    {
      id: 102,
      name: 'Best Bike Mount Ventoux 2024',
      dateTaken: '2024-10-05 15:30:00',
      uploadedBy: 'Emily Johnson',
      price: '59.99',
      imageUrl: 'https://granfondo-cycling.com/wp-content/uploads/sites/3/2024/10/Best_Bike_Mount_Ventoux_2024_Test-Review-WEB-1.jpg',
      locationId: 4,
    },
    {
      id: 103,
      name: 'Epic Road Rides Mont Ventoux',
      dateTaken: '2023-09-12 08:45:00',
      uploadedBy: 'Chris Evans',
      price: '54.99',
      imageUrl: 'https://epicroadrides.com/wp-content/uploads/2023/09/Mont-Ventoux-DSC03109-scaled-1920x1080.jpg.webp',
      locationId: 5,
    },
    {
      id: 104,
      name: 'Cycling Challenge Mont Ventoux',
      dateTaken: '2014-08-20 09:15:00',
      uploadedBy: 'Sophia Williams',
      price: '44.99',
      imageUrl: 'https://i0.wp.com/www.cycling-challenge.com/wp-content/uploads/2014/08/Mont-Ventoux-3.jpg',
      locationId: 6,
    },
    {
      id: 105,
      name: 'Crillon Le Brave View',
      dateTaken: '2024-09-25 17:50:00',
      uploadedBy: 'Oliver Smith',
      price: '64.99',
      imageUrl: 'https://www.crillonlebrave.com/wp-content/uploads/sites/4/2024/09/crillon-le-brave-3-1500x1000.jpg',
      locationId: 7,
    },
    {
      id: 106,
      name: 'Manawa Cycling Experience',
      dateTaken: '2024-07-12 13:30:00',
      uploadedBy: 'Lucas Brown',
      price: '58.99',
      imageUrl: 'https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/da1d991918a4fde51e4cbc645bbb61dd',
      locationId: 3,
    },
    {
      id: 107,
      name: 'Love Velo Female Cyclist Mont Ventoux',
      dateTaken: '2024-08-18 11:00:00',
      uploadedBy: 'Emma Davis',
      price: '52.99',
      imageUrl: 'https://lovevelo.co.uk/_next/image?url=https%3A%2F%2Fdedicated-angel-d0555d950b.media.strapiapp.com%2FFemale_cyclist_mont_ventoux_93d23ed6ed.png&w=1440&q=75',
      locationId: 4,
    },
    {
      id: 108,
      name: 'Cycling Challenge Mont Ventoux 2',
      dateTaken: '2014-08-21 09:45:00',
      uploadedBy: 'Noah Wilson',
      price: '46.99',
      imageUrl: 'https://i0.wp.com/www.cycling-challenge.com/wp-content/uploads/2014/08/Mont-Ventoux.jpg?fit=1024%2C627&ssl=1',
      locationId: 6,
    },
    {
      id: 109,
      name: 'Ascension Ventoux Rosso',
      dateTaken: '2021-01-10 07:25:00',
      uploadedBy: 'Isabella Taylor',
      price: '55.99',
      imageUrl: 'https://www.provence-cycling.co.uk/app/uploads/2021/01/ascension-ventoux-Rosso.jpg',
      locationId: 5,
    },
  ];

  // States
  const [selectedLocation, setSelectedLocation] = useState<number | 'all'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [previewImage, setPreviewImage] = useState<Product | null>(null);
  const [selectedHours, setSelectedHours] = useState<[number, number]>([0, 24]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter((product) => {
    const matchesLocation = selectedLocation === 'all' || product.locationId === selectedLocation;
    const productDate = new Date(product.dateTaken);
    const matchesStartDate = startDate ? productDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? productDate <= new Date(endDate) : true;
    const productHour = productDate.getHours();
    const matchesHour = productHour >= selectedHours[0] && productHour <= selectedHours[1];
    return matchesLocation && matchesStartDate && matchesEndDate && matchesHour;
  });

  // Pagination logic
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
        {/* Location Filter */}
        <select
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2 w-64 focus:ring focus:ring-blue-500"
          value={selectedLocation}
          onChange={(e) =>
            setSelectedLocation(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
          }
        >
          <option value="all">All Locations</option>
          {[...Array(9)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>{`Location ${idx + 1}`}</option>
          ))}
        </select>

        {/* Date Filters */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2 focus:ring focus:ring-blue-500"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2 focus:ring focus:ring-blue-500"
        />

         {/* Single Time Interval Range Slider */}
  <div className="flex flex-col items-center w-64">
    <label className="mb-2 text-sm text-gray-300">
      Time Range: {selectedHours[0]}:00 - {selectedHours[1]}:00
    </label>

    <Slider.Range
      min={0}
      max={24}
      allowCross={false}
      value={selectedHours}
      onChange={(value: number[]) => {
        if (value.length === 2) {
          setSelectedHours([value[0], value[1]]);
        }
      }}
      trackStyle={[{ backgroundColor: '#3B82F6' }]}
      handleStyle={[
        { borderColor: '#3B82F6', backgroundColor: '#3B82F6' },
        { borderColor: '#3B82F6', backgroundColor: '#3B82F6' },
      ]}
      railStyle={{ backgroundColor: '#374151' }}
    />
  </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setPreviewImage(product)}
              className="relative group overflow-hidden rounded-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 bg-neutral-800 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                <p className="text-sm text-gray-300">Uploaded by: {product.uploadedBy}</p>
                <p className="text-sm text-gray-300">Date: {new Date(product.dateTaken).toLocaleDateString()}</p>
                <p className="text-sm text-gray-300">Time: {new Date(product.dateTaken).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-gray-300">Location ID: {product.locationId}</p>
                <p className="text-lg font-bold text-blue-400 mt-2">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">No products available.</p>
        )}
      </div>

      {/* Pagination Controls */}
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
            className={`px-4 py-2 rounded-lg ${currentPage === idx + 1 ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
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

 {/* Modal Preview */}
 {previewImage && (
  <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
    <div className="bg-neutral-800 rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-lg">

      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setPreviewImage(null)}
          className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 px-6 pb-6 overflow-hidden">

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={previewImage.imageUrl}
            alt={previewImage.name}
            className="object-contain max-h-[60vh] w-full rounded"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 text-left flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{previewImage.name}</h2>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Uploaded by:</span> {previewImage.uploadedBy}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Date:</span> {new Date(previewImage.dateTaken).toLocaleDateString()}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Time:</span> {new Date(previewImage.dateTaken).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Location ID:</span> {previewImage.locationId}
            </p>
            <p className="text-lg font-bold text-blue-400 mt-4">
              ${previewImage.price}
            </p>
          </div>

          {/* Checkout Button */}
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


  

      {/* CTA at Bottom */}
      <div className="mt-20 mb-10 flex justify-center">
        <div className="bg-gradient-to-r from-purple-700 to-blue-700 text-white px-8 py-6 rounded-lg shadow-lg text-center max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">Not seeing your pic yet?</h3>
          <p className="mb-4">Try our AI-powered chatbot to help you search smarter and faster!</p>
          <button className="bg-white text-blue-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300">
            Chat with AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
