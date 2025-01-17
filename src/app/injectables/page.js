"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";

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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center text-red-500">
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

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
              {products.map((product, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
