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
            className="float-right ml-8 mt-2 w-full lg:w-72 mb-8 lg:mb-0  border border-gray-300"
            src="/images/company1.jpg"
            alt="Sawa Pharma"
            width={280}
            height={150}
          />

          <ul className="list-disc space-y-2 text-justify pl-5">
            <li>
              Sawa Pharma develops and distributes prescription drugs, OTC
              medications, and wellness products to enhance global healthcare
              accessibility and affordability.
            </li>
            <li>
              The company is committed to innovation, ensuring sustainable
              solutions and maintaining the highest quality standards in all its
              healthcare offerings.
            </li>
            <li>
              Backed by a team of experts, Sawa Pharma consistently delivers
              excellence in pharmaceutical manufacturing and healthcare research
              worldwide.
            </li>
            <li>
              Ethical practices and sustainability form the core of Sawa
              Pharma's mission to create long-lasting positive impacts on global
              health.
            </li>
            <li>
              Through strategic partnerships and cutting-edge solutions, Sawa
              Pharma aspires to revolutionize the healthcare industry with
              trusted products and services.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mt-10 mb-5 font-semibold text-3xl">Our Vision</h3>
          <p>
            We want to excel in manufacturing of highest quality pharmaceutical
            products with ethical standards and obligations to do things right
            and fair. We sincerely believe that with right approach and with
            enthusiasm we can able to provide our customers the best quality
            services within the time frame.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
