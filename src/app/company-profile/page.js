"use client";
import React, { useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Breadcrumb />
      <div className="mainContainer blog-page bg-gray-100 py-20 px-5 lg:px-28">
        <div className="content mx-auto ">
          {/* <div
      className="float-right ml-8 mt-2 relative w-auto h-[350px] border border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <Image
        src="/images/government.png"
        alt="Sawa Pharma"
        loading="lazy"
        width={850}
        height={350}
        className="w-full h-full object-cover"
      />

    
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <button
            className="px-6 py-2 bg-white text-black font-bold text-lg  shadow-md hover:bg-black hover:text-white transition"
            onClick={() => window.open("/pdf/certificateOfIEC-2.pdf", "_blank")}
          >
            Open PDF
          </button>
        </div>
      )}
    </div> */}

          <p className="mb-5 font-semibold text-3xl">About Us</p>
          <ul className="list-disc space-y-2 text-justify pl-5">
            <li>
              Sawa Pharma (India) Pvt. Ltd. is a global healthcare company
              focused on exporting our unique pharmaceutical formulations
              worldwide. Our core philosophy centers on expanding our business
              and providing affordable healthcare solutions.
            </li>
            <li>
              Our mission is to improve access to affordable, high-quality
              medicines. Sawa Pharma (India) Pvt. Ltd. has established a
              presence in countries such as Somalia, Angola, and Afghanistan,
              among others.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mt-10 mb-5 font-semibold text-3xl">Our Vision</h3>
          <p>
            Our vision is to become the preferred supplier, manufacturer, and
            service provider to the pharmaceutical industry. We aim to achieve
            this by offering a unique and diverse product portfolio, developing
            technological strengths through strategic partnerships, and
            expanding our international market presence with a complete range of
            drug substances, products, and services.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-12 px-5 lg:px-28">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Values
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/partnership.webp"
                width={800}
                height={900}
                loading="lazy"
                alt=""
                className="w-auto h-40 mx-auto mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Commitment
              </h3>
              <p className="text-gray-600">
                We are a passionate, dedicated, and experienced team who take
                pride in what we do.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/opportunity.webp"
                width={800}
                height={900}
                loading="lazy"
                alt=""
                className="w-auto h-40 mx-auto mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Vision & Values
              </h3>
              <p className="text-gray-600 text-justify">
                Our vision is to become the preferred supplier, manufacturer,
                and service provider to the pharmaceutical industry. We aim to
                achieve this by offering a unique and diverse product portfolio,
                developing technological strengths through strategic
                partnerships, and expanding our international market presence
                with a complete range of drug substances, products, and
                services.
              </p>
            </div>

            {/* Compliance Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/regulatory.webp"
                width={800}
                height={900}
                loading="lazy"
                className="w-auto h-40 mx-auto mb-5"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Compliance
              </h3>
              <p className="text-gray-600">
                We adhere to both national and international standards, and our
                practices are regularly inspected by competent authorities to
                ensure full compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
