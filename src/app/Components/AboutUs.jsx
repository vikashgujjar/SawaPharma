"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCategory from "./ProductCategory";
import { baseLink } from "../config/Apilink";

const AboutUsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseLink}/video-sections`);
        const data = await response.json();
        setSectionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };
  return (
    <>
      <section id="video-1" className="py-16 px-5 lg:px-28">
        {/* key={section.id} */}
        {/* {sectionData.map((section) => ( */}
        <div className="container mx-auto">
          <span className="text-uppercase text-[#03a297] text-4xl font-semibold mb-5 block animate-fadeInUp">
            Our Business Model
          </span>
          <div className="flex flex-wrap items-center">

            <div className="w-full lg:w-1/2 pr-4 mb-8 lg:mb-0">
              <div
                className=" fadeInUp"
                style={{ animationDelay: "0.4s", animationName: "fadeInUp" }}
              >


                <p className="text-justify">
                  As a virtual company, we create value by leveraging our
                  expertise in product manufacturing project management,
                  connecting people, knowledge, and resources to meet the needs of
                  the global pharmaceutical market. We collaborate with a network
                  of carefully chosen partners for laboratory and production work,
                  ensuring flexibility and a wide range of solutions for our
                  clients.
                </p>
                <span className="text-uppercase text-2xl font-semibold pt-5  block animate-fadeInUp">
                  Our People
                </span>

                <p className="text-justify">
                  Our team brings expertise in all non-clinical stages of the
                  pharmaceutical value chain, from the precursor materials of
                  active ingredients to finished market-ready drug products.
                </p>
                <span className="text-uppercase text-2xl font-semibold pt-5  block animate-fadeInUp">
                  Quality
                </span>

                <p className="text-justify">
                  We are committed to maintaining exceptional quality, sustainability, and integrity in all aspects of our business. Sustainability is central to both our products and operations, and we strive to extend our business values globally by working closely with affiliates to reach clients and suppliers.
                </p>


              </div>
            </div>


            <div className="w-full lg:w-1/2 px-4">
              <div
                className="text-center relative fadeInUp"
                style={{ animationDelay: "0.6s", animationName: "fadeInUp" }}
              >

                <div
                  className="absolute top-[40%] left-[45%] mx-auto mb-6 w-16 h-16 bg-[#03a297] text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110"
                  onClick={() => openModal(section.video)}
                >
                  <i className="fas fa-play text-lg"></i>
                </div>
                <img
                  src="/images/01.webp"
                  alt="Video Preview"
                  loading="lazy"
                  className="w-auto h-[350px] object-cover rounded-md shadow-lg"
                />

              </div>


              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                  onClick={closeModal}
                >
                  <div className="relative w-full h-full max-w-4xl">
                    <button
                      className="absolute top-4 right-4 text-white text-3xl"
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title="Video Player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ))} */}
      </section>


      <ProductCategory />

      <div className="bg-gray-50 py-20 px-5 md:px-28">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Overview</h2>
          <p className="mt-4 text-gray-700">
            As a mid-sized pharmaceutical company, Sawa Pharma (India) Pvt. Ltd. offers a wide range of products
            and services across the entire pharmaceutical industry value chain. We connect companies, people, and
            knowledge, providing expertise and products. Our strength lies in the manufacturing and global supply
            of pharmaceuticals, serving clients worldwide.
          </p>
          <p className="mt-4 text-gray-700">
            We manufacture both drug substances and finished products, produced in-house or through our contract
            manufacturing partners. For each project, we select the best partner to meet quality and regulatory
            standards. Our collaborative approach enables us to unlock new potential within the pharmaceutical
            field for our clients and partners.
          </p>
        </section>

        {/* What We Offer */}
        <section className="">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">What We Offer</h2>
          <ul className="mt-4 list-disc list-inside space-y-3 text-gray-700">
            <li>Manufacturing of general category finished products</li>
            <li>Production of a full range of pharmaceutical dosage forms such as tablets, capsules, liquids, and injections</li>
            <li>Finished product development</li>
            <li>Regulatory affairs</li>
            <li>Quality management</li>
            <li>Intellectual property and patents</li>
            <li>Business development and licensing</li>
            <li>Business Process Outsourcing</li>
            <li>Distribution and warehousing of drug substances</li>
          </ul>
        </section>


      </div></>

  );
};

export default AboutUsSection;
