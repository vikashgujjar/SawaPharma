"use client";
import React from "react";
import Breadcrumb from "../Components/Breadcrumb";

const dryInjectables = [
  {
    id: 1,
    name: "Artesunate Inj.",
    composition: "Each Vial Contains: Artesunate (Sterile)",
    strength: "60mg",
  },
  {
    id: 2,
    name: "Artesunate Inj.",
    composition: "Each Vial Contains: Artesunate (Sterile)",
    strength: "120mg",
  },
  {
    id: 3,
    name: "Azithromycin Sodium Inj.",
    composition:
      "Each Vial Contains: Azithromycin Sodium IP Eq. To Azithromycin",
    strength: "500mg",
  },
  {
    id: 4,
    name: "Azithromycin Sodium Inj.",
    composition:
      "Each Vial Contains: Azithromycin Sodium IP Eq. To Azithromycin",
    strength: "1000mg",
  },
  {
    id: 5,
    name: "Clarithromycin Inj.",
    composition: "Each Vial Contains: Clarithromycin IP (A Lyophilized Powder)",
    strength: "500mg",
  },
  {
    id: 6,
    name: "Colistimethate Sodium Inj. IP",
    composition: "Each Vial Contains: Sterile Colistimethate Sodium",
    strength: "1,000,000 IU",
  },
  {
    id: 7,
    name: "Colistimethate Sodium Inj. IP",
    composition: "Each Vial Contains: Sterile Colistimethate Sodium",
    strength: "2,000,000 IU",
  },
  {
    id: 8,
    name: "Esomeprazole Sodium Inj.",
    composition: "Each Vial Contains: Esomeprazole Sodium E.Q. To Esomeprazole",
    strength: "40mg",
  },
  {
    id: 9,
    name: "Hydrocortisone Sodium Succinate Inj. IP",
    composition:
      "Each Vial Contains: Hydrocortisone Sodium Succinate E.Q.To Hydrocortisone",
    strength: "100mg",
  },
  {
    id: 10,
    name: "Hydrocortisone Sodium Succinate Inj. IP",
    composition:
      "Each Vial Contains: Hydrocortisone Sodium Succinate E.Q.To Hydrocortisone",
    strength: "200mg",
  },
  {
    id: 11,
    name: "Methylprednisolone Sodium Succinate For Inj. USP",
    composition:
      "Each Vial Contains: Methylprednisolone Sodium Succinate E.Q. To Methylprednisolone",
    strength: "40mg",
  },
  {
    id: 12,
    name: "Methylprednisolone Sodium Succinate For Inj. USP",
    composition:
      "Each Vial Contains: Methylprednisolone Sodium Succinate E.Q. To Methylprednisolone",
    strength: "125mg",
  },
];

const ProductTable = () => {
  return (
    <>
      <Breadcrumb />{" "}
      <div className="container mx-auto py-20 px-5 lg:px-28">
        <div className="border mb-1 flex gap-5 px-5 py-2 justify-between">
          <h1 className="text-sm md:text-2xl  py-3 font-semibold text-center ">
            SAWA PHARMA INDIA PVT. LTD. DRY INJECTABLES
          </h1>
          <button
            onClick={() => window.open("/pdfs/Dry Injections.pdf", "_blank")}
            className="px-4 py-2 bg-white hover:bg-black hover:text-white border  text-sm lg:text-lg font-bold  focus:outline-none focus:ring-0 "
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
            <tbody>
              {dryInjectables.map((tablet, index) => (
                <tr
                  key={tablet.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {tablet.id}
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
        </div>
      </div>
    </>
  );
};

export default ProductTable;
