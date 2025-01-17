import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className="mainContainer blog-page bg-gray-100 py-20 px-5 lg:px-28">
        <div className="content mx-auto ">
          <Image
            className="float-right ml-5 mt-2 w-full lg:w-72 mb-8 lg:mb-0  border border-gray-300"
            src="/images/company1.jpg"
            alt="Sawa Pharma"
            width={280}
            height={150}
          />

          <ul className="list-disc space-y-2 text-justify pl-5">
            <li>
            Sawa Pharma develops and distributes prescription drugs, OTC medications, and wellness products to enhance global healthcare accessibility and affordability.
            </li>
            <li>
            The company is committed to innovation, ensuring sustainable solutions and maintaining the highest quality standards in all its healthcare offerings.
            </li>
            <li>
            Backed by a team of experts, Sawa Pharma consistently delivers excellence in pharmaceutical manufacturing and healthcare research worldwide.
            </li>
            <li>
            Ethical practices and sustainability form the core of Sawa Pharma's mission to create long-lasting positive impacts on global health.
            </li>
            <li>
            Through strategic partnerships and cutting-edge solutions, Sawa Pharma aspires to revolutionize the healthcare industry with trusted products and services.
            </li>
           
          </ul>

          
        </div>
      </div>
    </>
  );
};

export default page;
