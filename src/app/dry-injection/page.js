"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";

const SkeletonLoader = () => {
  const rows = Array.from({ length: 5 }); // Adjust the number of rows for the skeleton loader

  return (
    <tbody>
      {rows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="border border-gray-200 px-4 py-2">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="border border-gray-200 px-4 py-2">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="border border-gray-200 px-4 py-2">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="border border-gray-200 px-4 py-2">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ProductTable = () => {
  const [dryInjectables, setDryInjectables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInjectables = async () => {
      try {
        const response = await fetch(`${baseLink}/dryinjectable`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDryInjectables(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInjectables();
  }, []);

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <div className="border mb-1 flex gap-5 px-5 py-2 justify-between">
          <h1 className="text-sm md:text-2xl py-3 font-semibold text-center">
            SAWA PHARMA INDIA PVT. LTD. DRY INJECTION
          </h1>
          <button
            onClick={() => window.open("/pdfs/Dry Injections.pdf", "_blank")}
            className="px-4 py-2 bg-white hover:bg-black hover:text-white border text-sm lg:text-lg font-bold focus:outline-none focus:ring-0"
            download
          >
            View PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-black text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  SR. NO.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  GENERIC NAME
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  COMPOSITION
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  STRENGTH
                </th>
              </tr>
            </thead>
            {loading ? (
              <SkeletonLoader />
            ) : error ? (
              <tbody>
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-red-500 py-10 border"
                  >
                    Error: {error}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {dryInjectables.map((tablet, index) => (
                  <tr
                    key={tablet.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {tablet.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {tablet.composition}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {tablet.strength}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
