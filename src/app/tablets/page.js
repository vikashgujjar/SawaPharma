"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink, storageLink } from "../config/Apilink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductTable = () => {
  // State to hold the tablets data
  const [tablets, setTablets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await fetch(`${baseLink}/tabletp`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTablets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTablets();
  }, []);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`${baseLink}/prcate`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openPdf = (pdfUrl) => {
    // Open the PDF link in a new tab
    if (pdfUrl) {
      window.open(`${storageLink}/${pdfUrl}`, "_blank");
    } else {
      alert("No PDF available for this product.");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <div className="border mb-1 flex gap-5 px-5 py-2 justify-between">
          <h1 className="text-sm lg:text-2xl py-3 font-semibold text-center">
            SAWA PHARMA INDIA PRIVATE LIMITED TABLETS
          </h1>
          {product.map(
            (product) =>
              product.id === 2 && (
                <button
                  className="px-4 py-2 bg-white hover:bg-black hover:text-white border text-sm lg:text-lg font-bold focus:outline-none focus:ring-0"
                  onClick={() => openPdf(product.pdf_for_model)}
                >
                  Open PDF
                </button>
              )
          )}
        </div>
        <div className="overflow-x-auto">
          {error ? (
            <p className="text-center text-lg text-red-500 py-5">{error}</p>
          ) : (
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
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="border border-gray-200 px-4 py-2">
                          <Skeleton />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Skeleton />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Skeleton />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Skeleton />
                        </td>
                      </tr>
                    ))
                  : tablets.map((tablet, index) => (
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
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTable;
