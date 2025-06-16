"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";
import Image from "next/image";

const Page = () => {
  const [locations, setLocations] = useState([]);
  const [header, setHeader] = useState("Our Locations");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        const result = await response.json();

        if (result?.location?.length > 0) {
          setLocations(result.location);
          setHeader(result.location[0].header || "Our Locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // const images = [
  //   { src: '/images/image1.webp', alt: 'Image 1' },
  //   { src: '/images/image2.webp', alt: 'Image 2' },
  //   { src: '/images/image3.webp', alt: 'Image 3' },
  //   { src: '/images/image4.webp', alt: 'Image 4' },
  // ];

  return (
    <>
      <Breadcrumb />
      <div className="px-5 lg:px-28 py-20">
        <h2 className="text-4xl font-semibold text-steelblue text-center mb-8">
          {header}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 justify-center">
            {[1].map((index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 w-full h-96 rounded-lg"
              ></div>
            ))}
          </div>
        ) : locations.length === 0 ? (
          <p className="text-center text-gray-500">No locations available</p>
        ) : (
          <div className="grid grid-cols-1  gap-6 justify-center mx-auto">
            {locations.map((location, index) => (
              <div key={index}>
                <iframe
                  src={`http://maps.google.com/maps?q=${location.lat},${location.lang}&z=15&output=embed`}
                  width="450"
                  height="450"
                  className="border-0 w-full h-96 rounded-lg"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={location.header}
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 lg:px-28 mb-20">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-96">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Page;
