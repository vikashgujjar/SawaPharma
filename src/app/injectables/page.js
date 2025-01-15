import React from "react";
import Breadcrumb from "../Components/Breadcrumb";

const products = [
    {
      id: 1,
      name: "Amoxicillin Sodium + Clavulanate Potassium inj.",
      strength: "1000mg + 200mg",
      packing: "10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 2,
      name: "Amikacin Sulphate inj.",
      strength: "250mg/ml",
      packing: "VIAL",
      shelfLife: "24 months",
    },
    {
      id: 3,
      name: "Aztreonam for inj.",
      strength: "250mg, 500mg, 1000mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 4,
      name: "Cefepime Hydrochloride inj.",
      strength: "250mg, 500mg, 1000mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 5,
      name: "Cefepime + Tazobactam inj.",
      strength: "250mg + 31.25mg, 500mg + 62.50mg, 1000mg + 125mg",
      packing: "5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 6,
      name: "Cefoperazone inj.",
      strength: "250mg, 500mg, 1000mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 7,
      name: "Cefoperazone + Sulbactam inj.",
      strength: "500mg + 500mg, 1000mg + 500mg, 3000mg + 1500mg",
      packing: "10ml WFI, 10ml WFI, 20ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 8,
      name: "Cefotaxime Sodium inj.",
      strength: "250mg, 500mg, 1000mg, 4000mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI, 20ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 9,
      name: "Ceftazidime inj.",
      strength: "125mg, 250mg, 500mg, 1000mg",
      packing: "5ml WFI, 5ml WFI, 5ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 10,
      name: "Ceftazidime + Tazobactam inj.",
      strength: "250mg + 31.25mg, 1000mg + 125mg",
      packing: "5ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 11,
      name: "Ceftriaxone Sodium inj.",
      strength: "125mg, 250mg, 500mg, 1000mg, 2000mg",
      packing: "5ml WFI, 5ml WFI, 5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 12,
      name: "Ceftriaxone + Sulbactam inj.",
      strength: "150mg + 37.5mg, 250mg + 125mg, 500mg + 250mg, 1000mg + 500mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 13,
      name: "Ceftriaxone + Tazobactam inj.",
      strength: "250mg + 31.25mg, 500mg + 62.50mg, 1000mg + 125mg",
      packing: "5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 14,
      name: "Cefuroxime Sodium inj.",
      strength: "250mg, 750mg, 1.5gm",
      packing: "5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 15,
      name: "Imipenem + Cilastatin inj.",
      strength: "1gm, 500mg",
      packing: "10ml WFI, 5ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 16,
      name: "Meropenem inj.",
      strength: "125mg, 250mg, 500mg, 1000mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 17,
      name: "Meropenem + Sulbactam inj.",
      strength: "500mg + 250mg, 1000mg + 500mg",
      packing: "5ml WFI, 5ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
    {
      id: 18,
      name: "Piperacillin + Tazobactam inj.",
      strength: "4000mg + 500mg, 2000mg + 250mg, 1000mg + 125mg",
      packing: "20ml WFI, 10ml WFI, 10ml WFI",
      shelfLife: "24 months",
    },
  ];
  

const ProductTable = () => {
  return (
    <>
      <Breadcrumb />{" "}
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <h1 className="text-2xl border py-3 font-semibold text-center mb-1">
          SAWA PHARMA INDIA PRIVATE LIMITED INJECTABLES
        </h1>
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
