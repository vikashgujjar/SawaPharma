"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink, storageLink } from "../config/Apilink";

const ProductTable = () => {
  const [syrupData, setSyrupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSyrupData = async () => {
      try {
        const response = await fetch(`${baseLink}/syrup`);
        if (!response.ok) {
          throw new Error("Failed to fetch syrup data");
        }
        const data = await response.json();
        setSyrupData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSyrupData();
  }, []);

  const renderSkeletonRows = (rows) => {
    return Array.from({ length: rows }).map((_, index) => (
      <tr
        key={index}
        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
      >
        <td className="border border-gray-200 px-4 py-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </td>
        <td className="border border-gray-200 px-4 py-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </td>
        <td className="border border-gray-200 px-4 py-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </td>
      </tr>
    ));
  };

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
          <h1 className="text-sm md:text-2xl py-3 font-semibold text-center">
            SAWA PHARMA INDIA PVT. LTD. SYRUPS
          </h1>
          {product.map(
            (product) =>
              product.id === 6 && (
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
              </tr>
            </thead>
            <tbody>
              {loading ? (
                renderSkeletonRows(5) // Render 5 skeleton rows while loading
              ) : error ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-red-500 py-5 text-center border"
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                syrupData.map((syrup, index) => (
                  <tr
                    key={syrup.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {syrup.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {syrup.composition}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
