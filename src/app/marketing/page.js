"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";

const Page = () => {
  const pinLocations = [
    { name: "Afghanistan", left: "65%", top: "10%" },
    { name: "Somalia", left: "32%", top: "25%" },
    { name: "Ghana", left: "48%", top: "62%" },
    { name: "Mali", left: "46%", top: "45%" },
    { name: "Tazakistan", left: "66%", top: "30%" },
    { name: "Fiji", left: "92%", top: "75%" },
    { name: "Angola", left: "60%", top: "55%" },
    { name: "Kenya", left: "15%", top: "80%" },
    { name: "Uganda", left: "55%", top: "70%" },
    { name: "Cambodia", left: "50%", top: "30%" },
  ];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb />
      <div className="mainContainer blog-page bg-gray-100 py-20 px-5 lg:px-28">
        <div className="flex flex-col lg:flex-row gap-5 mx-auto">
          <div className="w-full lg:w-3/4">
            <h3 className="text-4xl font-medium">
              Your Trusted Partner in Pharmaceuticals
            </h3>
            <p className="my-2">
              At Sawa Pharma, we are dedicated to delivering high-quality,
              innovative healthcare solutions that improve lives. As a leading
              pharmaceutical company, we combine cutting-edge research, advanced
              technology, and a commitment to excellence to bring you safe,
              effective, and affordable medicines.
            </p>
            <h3 className="text-2xl font-semibold mb-2">List of Countries:</h3>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-6 w-3/4 mb-2"></div>
            ) : (
              <p className="text-justify">
                {data?.countries[0]
                  ?.split(", ")
                  .map((country, index, array) => (
                    <span key={index}>
                      {country}
                      {index !== array.length - 1 && ", "}
                    </span>
                  ))}
              </p>
            )}

            <div className="relative w-full max-w-6xl mt-8 mx-auto">
              <img
                src="/images/world.png"
                alt="Dotted World Map"
                className="w-full h-auto lg:h-[450px] "
              />

              

            
            </div>
          </div>

          <div className="w-full lg:w-1/4 widget_text p-0 lg:p-6">
            <h2 className="widget-title text-xl font-bold text-gray-800 border-b-2 pb-2 mb-4">
              Find Us
            </h2>
            <div className="textwidget space-y-4">
              {loading ? (
                <div className="animate-pulse bg-gray-300 h-6 w-1/2 mb-2"></div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-700">Address</p>
                  <p className="text-gray-600 font-semibold">
                    SAWA PHARMA INDIA Pvt Lmt
                  </p>
                  <p className="text-gray-600">
                    SCO/F 21, 1st Floor, Sector 5, Swastik Vihar, Mansa Devi
                    Complex, Haryana - 134114 (India)
                  </p>
                </div>
              )}
              {loading ? (
                <div className="animate-pulse bg-gray-300 h-6 w-1/3 mb-2"></div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="text-gray-600">{data?.email}</p>
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-700">Hours</p>
                <p className="text-gray-600">Monday–Saturday: 9:30AM–5:30PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
