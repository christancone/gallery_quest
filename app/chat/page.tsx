'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import Slider from 'rc-slider';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';

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

export default function ChatBotPage() {
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! Let’s find your photos 🎉' },
    { from: 'bot', text: 'Please select a Start Date 📅' },
  ]);

  const [step, setStep] = useState(1);
  const [chatActive, setChatActive] = useState(false);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | 'all'>('all');
  const [selectedHours, setSelectedHours] = useState<[number, number]>([0, 24]);
  const [userInput, setUserInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Images on Load
  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing');
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

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!data.galleryquest_imagess) throw new Error('API response format is unexpected.');

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

        const dates = Array.from(new Set(formattedProducts.map((product) => product.dateTaken.split(' ')[0])));

        setAvailableDates(dates);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiKey]);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle steps in wizard
  const handleNext = () => {
    switch (step) {
      case 1:
        if (!startDate) return;
        addUserMessage(`Start Date: ${startDate}`);
        addBotMessage('Great! Now select an End Date 📅');
        setStep(2);
        break;
      case 2:
        if (!endDate) return;
        addUserMessage(`End Date: ${endDate}`);
        addBotMessage('Awesome! Choose your Location 📍');
        setStep(3);
        break;
      case 3:
        addUserMessage(`Location: ${selectedLocation}`);
        addBotMessage('Finally, select the Time Range ⏰');
        setStep(4);
        break;
      case 4:
        addUserMessage(`Time Range: ${selectedHours[0]}:00 - ${selectedHours[1]}:00`);
        addBotMessage('Great! You can now chat with me about your photos! 😊');
        setChatActive(true);
        setStep(5);
        break;
      default:
        break;
    }
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { from: 'bot', text }]);
  };

  // Handle user message in chat
  const handleSend = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);

    setTimeout(() => {
      const botReply = generateBotReply(userInput);
      addBotMessage(botReply);
    }, 500);

    setUserInput('');
  };

  const generateBotReply = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('location')) {
      return 'You can filter by location in the gallery.';
    }
    if (lowerInput.includes('date')) {
      return `Photos are available on: ${availableDates.join(', ')}`;
    }
    if (lowerInput.includes('time')) {
      return `Your selected time range is ${selectedHours[0]}:00 - ${selectedHours[1]}:00.`;
    }
    return "I'm here to help! Ask about dates, times, or locations of your photos.";
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-800 to-blue-800 shadow-md">
        <h1 className="text-xl font-semibold">AI Chat Assistant 🤖</h1>
        <button
          onClick={() => router.push('/')}
          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-all"
        >
          Back to Home
        </button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center py-4 text-gray-400">Loading images...</div>
      )}
      {error && (
        <div className="text-center py-4 text-red-500">{error}</div>
      )}

      {/* Chat Body */}
      <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-[75%] text-sm ${
                  msg.from === 'bot' ? 'bg-blue-700 text-white' : 'bg-green-600 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Wizard Form */}
        {!chatActive && (
          <div className="flex flex-col space-y-4 mt-4">
            {/* Step 1: Start Date */}
            {step === 1 && (
              <>
                <DatePicker
                  selected={startDate ? new Date(startDate) : null}
                  onChange={(date) => setStartDate(date?.toISOString().split('T')[0] || null)}
                  highlightDates={availableDates.map((d) => new Date(d))}
                  placeholderText="Select Start Date"
                  className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
                  calendarClassName="bg-neutral-900 text-white"
                  popperPlacement="top-start"
                />
                <button
                  onClick={handleNext}
                  disabled={!startDate}
                  className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2: End Date */}
            {step === 2 && (
              <>
                <DatePicker
                  selected={endDate ? new Date(endDate) : null}
                  onChange={(date) => setEndDate(date?.toISOString().split('T')[0] || null)}
                  highlightDates={availableDates.map((d) => new Date(d))}
                  placeholderText="Select End Date"
                  className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
                  calendarClassName="bg-neutral-900 text-white"
                  popperPlacement="top-start"
                />
                <button
                  onClick={handleNext}
                  disabled={!endDate}
                  className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <>
                <select
                  className="border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                >
                  <option value="all">All Locations</option>
                  {[...Array(9)].map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>{`Location ${idx + 1}`}</option>
                  ))}
                </select>
                <button onClick={handleNext} className="bg-blue-600 px-4 py-2 rounded">
                  Next
                </button>
              </>
            )}

            {/* Step 4: Time Interval */}
            {step === 4 && (
              <>
                <label>
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
                <button onClick={handleNext} className="bg-green-600 px-4 py-2 rounded">
                  Chat Now
                </button>
              </>
            )}
          </div>
        )}

        {/* Chat Input */}
        {chatActive && (
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 border border-gray-700 bg-neutral-800 text-white rounded px-4 py-2"
            />
            <button
              onClick={handleSend}
              disabled={!userInput.trim()}
              className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
