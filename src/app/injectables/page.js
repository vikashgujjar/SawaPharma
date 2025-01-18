"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseLink}/injectable`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <div className="border mb-1 flex gap-5 px-2 lg:px-5 py-2 justify-between">
          <h1 className="text-sm lg:text-2xl py-3 font-semibold text-center">
            SAWA PHARMA INDIA PRIVATE LIMITED INJECTABLES
          </h1>
          <button
            onClick={() => window.open("/pdfs/Cefa Injectables.pdf", "_blank")}
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
                  SR NO.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  GENERIC NAME OF PRODUCT
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  STRENGTH
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  PACKING
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  SHELF LIFE
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
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
                    <td className="border border-gray-200 px-4 py-2">
                      <Skeleton />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-lg text-red-500 py-5"
                  >
                    {error}
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {product.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.strength}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.packing}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.shelfLife}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-lg py-5">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
