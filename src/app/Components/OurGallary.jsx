"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { baseLink, storageLink } from '../config/Apilink';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch gallery data from your API endpoint
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(`${baseLink}/gallery`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery items');
        }
        const data = await response.json();
        setGalleryItems(data); // Set the gallery data to state
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error if the request fails
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <div className="gallery-area py-20 px-5 lg:px-28 ">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-4xl font-semibold text-steelblue mb-4">Our Gallery</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Let's Check Our Photo <span className="text-[#03a297]">Gallery</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {[...Array(6)].map((_, index) => (
            <div key={index} className="gallery-item h-[295px]  bg-gray-200 animate-pulse relative group">
              <div className="gallery-img bg-gray-300 h-full w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery-area py-20 px-5 lg:px-28">
      <div className="text-center max-w-lg mx-auto mb-10">
        <span className="text-4xl font-semibold text-steelblue mb-4">Our Gallery</span>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Let's Check Our Photo <span className="text-[#03a297]">Gallery</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className={`gallery-item h-[295px] wow ${item.animation} relative group`}
          >
            <div className="gallery-img">
              <Image
                src={`${storageLink}/${item.image}`}
                alt={`Gallery Image ${item.id}`}
                width={500}
                 loading="lazy"
                height={500}
                className="h-full w-full object-cover"
              />
              <Link
                href="#"
                className="popup-img gallery-link relative"
              >
                <FaPlus className="absolute text-[#03a297] top-3.5 left-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
