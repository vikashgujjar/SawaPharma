"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { baseLink, storageLink } from "../config/Apilink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseLink}/service`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data); // Assuming the API response is an array of services
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <section className="service bg-primary px-5 lg:px-28 my-20 pb-0 bg-cover bg-center">
        <div className="mx-auto px-4">
          <div className="text-center">
            <span className="inline-block text-[0.875rem] leading-[1.375rem] font-semibold tracking-wider uppercase text-primary bg-[#d3e9fb] px-2 py-1 rounded-[3px] mb-2">
              Our Services
            </span>
            <h5 className="text-2xl font-bold mb-5">What Facilities We Provided</h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white shadow-lg rounded-none overflow-hidden">
                    <div className="relative">
                      <Skeleton className="w-full h-64" />
                    </div>
                    <div className="p-6">
                      <Skeleton width="70%" />
                      <Skeleton width="90%" className="my-2" />
                      <Skeleton width="50%" />
                    </div>
                  </div>
                ))
              : error
              ? <p className="text-center text-lg text-red-500 py-5">{error}</p>
              : services.map((service) => (
                  <div key={service.id} className="bg-white shadow-lg rounded-none overflow-hidden">
                    <div className="relative">
                      <Image
                        src={`${storageLink}/${service.image}`}
                        alt={service?.title}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-3"></div>
                    </div>
                    <div className="p-6">
                      <h5 className="text-lg font-semibold mb-2">{service.title}</h5>
                      <p className="text-gray-600 mb-4">{service.text}</p>
                      <Link
                        href={service.link || "#"}
                        className="text-primary hover:text-blue-400 font-medium hover:underline inline-flex items-center"
                      >
                        Read More <FaPlus className="text-sm ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="common-section road-ahead py-14 px-5 lg:px-28 bg-gray-100" id="learn">
        <div className="container mx-auto ">
          <h2 className="text-uppercase text-[#03a297] text-xl md:text-4xl font-semibold mb-5 animate-fadeInUp">
            Sawa Pharma (India) Pvt. Ltd.
          </h2>
          <div className="flex flex-col lg:flex-row lg:space-x-10">
            <div className="w-full lg:w-7/12">
              <p className="text-base text-gray-700 text-justify animate-fadeInUp">
                Sawa Pharma (India) Pvt. Ltd. provides a comprehensive outsourcing for Sterile/Non
                sterile pharmaceutical products, to our customers in need of custom pharmaceutical
                contract manufacturing. From formulation development to commercial
                manufacturing, Sawa Pharma (India) Pvt. Ltd. will successfully support your
                pharmaceutical contract manufacturing of products efficiently and effectively in your
                efforts to bring products to market. Sawa's interdisciplinary project team offers
                innovation, superior quality, and confidentiality.
              </p>
              <h2 className="texl-lg lg:text-2xl font-semibold mt-8">Quality Assurance</h2>
              <p className="text-base text-gray-700 text-justify animate-fadeInUp">
                We are renowned in the industry as a quality centric organization, which follows each
                & every rule defined by the pharmaceutical industry. In order to maintain strict
                quality standards, we have developed a stringent quality procedure that is rigorously
                followed at each step of entire process. We have maintained a high-end quality-testing
                unit that is integrated with numerous testing instruments. In the formulation of
                offered drugs, we use quality-tested ingredients that are sourced from the reliable and
                genuine vendors of the industry. Further, the prepared drugs also go through several
                testing procedures, in order to know their side effects and efficacy.
              </p>
            </div>

            <div className="w-full lg:w-5/12">
              <figure className="animate-fadeInUp">
                <Image
                  src="/images/doctor.jpg"
                  alt="pharmaceutical companies in India"
                  className="rounded-lg p-4 w-full h-full"
                  width={500}
                  height={400}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
