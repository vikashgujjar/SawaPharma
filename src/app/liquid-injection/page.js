"use client";
import React from "react";
import Breadcrumb from "../Components/Breadcrumb";

const liquidInjections = [
  {
    id: 1,
    name: "Aceclofenac Injection",
    composition:
      "Each ml contains: Aceclofenac IP-150mg, Water for Injection IP-q.s",
    ref: "CDSCO 28/09/2006",
    strength: "150mg",
  },
  {
    id: 2,
    name: "Acetylcysteine",
    composition:
      "Each ml contains: Acetylcysteine USP 200mg, Water for Injection IP-q.s",
    ref: "USP",
    strength: "200mg",
  },
  {
    id: 3,
    name: "Arteether",
    composition:
      "Each ml contains: Arteether (Alpha-Beta Arteether) IP-150mg, Oily Base-q.s.",
    ref: "CDSCO 14.01.1997",
    strength: "150mg",
  },
  {
    id: 4,
    name: "Artemether Injection",
    composition: "Each ml contains: Artemether-80mg, Oil base-q.s",
    ref: "CDSCO 02/08/1995",
    strength: "80mg",
  },
  {
    id: 5,
    name: "Ascorbic acid",
    composition:
      "Each 1.5ml contains: Ascorbic acid IP-150mg, Chlorocresrol 0.2%, Water for Injection q.s.",
    ref: "I.P 2018",
    strength: "150mg",
  },
  {
    id: 6,
    name: "Atracurium besylate Injection (2.5ml)",
    composition: "Each 2.5ml contains: Atracurium besylate IP 25mg, WFI-q.s",
    ref: "IP",
    strength: "25mg",
  },
  {
    id: 7,
    name: "Atracurium besylate Injection (5ml)",
    composition: "Each 5ml contains: Atracurium besylate IP 50mg, WFI-q.s",
    ref: "IP",
    strength: "50mg",
  },
  {
    id: 8,
    name: "Betamethasone Injection",
    composition:
      "Each ml contains: Betamethasone Sodium Phosphate Eq. to Betamethasone IP 4mg, Water for Injection IP-q.s",
    ref: "I.P 2018",
    strength: "4mg",
  },
  {
    id: 9,
    name: "Cholecalciferol",
    composition:
      "Each ml contains: Cholecalciferol IP 600,000 IU, Ethyl Oleate I.P-q.s.",
    ref: "I.P 2018",
    strength: "600,000 IU",
  },
  {
    id: 10,
    name: "Citicoline Injection",
    composition:
      "Each ml contains: Citicoline Sodium IP eq. to Citicoline 250mg, Water for Injection IP-q.s",
    ref: "CDSCO 22.07.1995",
    strength: "250mg",
  },
];

const ProductTable = () => {
  return (
    <>
      <Breadcrumb />{" "}
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <div className="border mb-1 flex gap-5 px-5 py-2 justify-between">
          <h1 className="text-sm lg:text-2xl  py-3 font-semibold text-center ">
          SAWA PHARMA INDIA PVT. LTD.
          LIQUID INJ.
          </h1>
          <button
            onClick={() => window.open("/pdfs/Dry Injections.pdf", "_blank")}
            className="px-4 py-2 bg-white hover:bg-black hover:text-white border text-sm lg:text-lg font-bold  focus:outline-none focus:ring-0 "
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
                REF.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  STRENGTH
                </th>
              </tr>
            </thead>
            <tbody>
              {liquidInjections.map((injection, index) => (
                <tr
                  key={injection.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {injection.id}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
