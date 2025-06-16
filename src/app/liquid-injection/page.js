"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseLink, storageLink } from "../config/Apilink";

const ProductTable = () => {
  const [loading, setLoading] = useState(true);
  const [liquidInjections, setLiquidInjections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseLink}/liquidinjection`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLiquidInjections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            SAWA PHARMA INDIA PVT. LTD. LIQUID INJECTION
          </h1>
          {product.map(
            (product) =>
              product.id === 3 && (
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
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  REF.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  STRENGTH
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">
                        <Skeleton width={20} />
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
                      <td className="border border-gray-200 px-4 py-2">
                        <Skeleton width={50} />
                      </td>
                    </tr>
                  ))
              ) : error ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-200 px-4 py-2 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                liquidInjections.map((injection, index) => (
                  <tr
                    key={injection.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {injection.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {injection.composition}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {injection.ref}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {injection.strength}
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
