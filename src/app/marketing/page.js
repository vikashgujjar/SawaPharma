import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className="mainContainer blog-page bg-gray-100 py-20 px-5 lg:px-28">
        <div className="flex flex-col lg:flex-row  gap-5 mx-auto ">
          <div className="w-full lg:w-3/4">
            <h3 className="text-4xl font-medium">Marketing</h3>
            <p className="my-2">
              Providing local competence and networks in all major
              pharmaceutical markets, the presence of GOGA Healthcare etched out
              in various countries.
            </p>
            <h3 className="text-2xl font-semibold mb-2">List of Countries:</h3>
            <p className="text-justify text-lg">
              Benin, Bhutan, Bolivia, Botswana, Cameroon, Chile, Combodia,
              Congo, Costa Rica, El-Salvador, Ethiopia, Fiji, Ghana, Guatemala,
              Guyana, Honduras, Hong Kong, Jamaica, Kenya, Lebanon, Madagascar,
              Malawi, Mozambique, Myanmar, Nepal, Nigeria, Panama, Peru,
              Philippines, Rwanda, Senegal, Sri Lanka, Suriname, Tanzania,
              Thailand, Trinidad & Tobago, Uganda, Vietnam, Zambia, Zanzibar,
              Zimbabwe
            </p>
          </div>

          <div
            id="text-3"
            className="widget w-full lg:w-1/4 widget_text p-0 lg:p-6 "
          >
            <h2 className="widget-title text-xl font-bold text-gray-800 border-b-2 pb-2 mb-4">
              Find Us
            </h2>
            <div className="textwidget space-y-4">
              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p className="text-gray-600 font-semibold">SAWA PHARMA INDIA Pvt Lmt</p>
                <p className="text-gray-600">
                SCO/F 21, 1st Floor, Sector 5, Swastik Vihar, Mansa Devi Complex, Haryana - 134114 (India)
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-600">
                ceo@sawapharma.in
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Hours</p>
                <p className="text-gray-600">
                  Monday–Saturday: 9:00AM–5:00PM <br />
                  Sunday: 11:00AM–3:00PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
