import React from "react";
import Breadcrumb from "../Components/Breadcrumb";

const tablets = [
    {
      id: 1,
      name: "Acebrophylline Capsules",
      composition: "Each Hard Gelatin Capsule Contains: Acebrophylline, Excipients",
      strength: "100mg",
    },
    {
      id: 2,
      name: "Acebrophylline Sustained Release Tablets",
      composition:
        "Each Uncoated Sustained Release Tablet Contains: Acebrophylline, Excipients. Colour: Approved Colour Used",
      strength: "200mg",
    },
    {
      id: 3,
      name: "Aceclofenac & Paracetamol Tablets",
      composition:
        "Each Uncoated Tablet Contains: Aceclofenac, Paracetamol, Excipients",
      strength: "100mg & 325mg",
    },
    {
      id: 4,
      name: "Aceclofenac & Paracetamol Tablets",
      composition:
        "Each Film Coated Tablet Contains: Aceclofenac, Paracetamol, Excipients. Colour: Approved Colour Used",
      strength: "100mg & 325mg",
    },
    {
      id: 5,
      name: "Aceclofenac & Thiocolchicoside Tablets",
      composition:
        "Each Film Coated Tablet Contains: Aceclofenac, Thiocolchicoside, Excipients. Colour: Approved Colour Used",
      strength: "100mg & 4mg",
    },
    {
      id: 6,
      name: "Aceclofenac Paracetamol & Serratiopeptidase Tablets",
      composition:
        "Each Film Coated Tablet Contains: Aceclofenac, Paracetamol, Serratiopeptidase (As 30,000 Enzymatic Units), Excipients. Colour: Approved Colour Used",
      strength: "100mg, 325mg & 15mg",
    },
    {
      id: 7,
      name: "Aceclofenac Tablets IP 100mg",
      composition:
        "Each Film Coated Tablet Contains: Aceclofenac, Excipients. Colour: Approved Colour Used",
      strength: "100mg",
    },
    {
      id: 8,
      name: "Acetylsalicylic Acid Tablets IP 150mg",
      composition:
        "Each Enteric Coated Tablet Contains: Acetylsalicylic Acid, Excipients. Colour: Approved Colour Used",
      strength: "150mg",
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
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-700">SR. NO.</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">GENERIC NAME</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">COMPOSITION</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">STRENGTH</th>
            </tr>
          </thead>
          <tbody>
            {tablets.map((tablet) => (
              <tr key={tablet.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-700">{tablet.id}</td>
                <td className="p-4 text-sm text-gray-700">{tablet.name}</td>
                <td className="p-4 text-sm text-gray-700">{tablet.composition}</td>
                <td className="p-4 text-sm text-gray-700">{tablet.strength}</td>
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
