import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Image from "next/image";

const page = () => {
    const directors = [
        {
          id: 1,
          name: "Mr. Vishal Gupta",
          image: "/images/members/member1.jpg",
          bio: `
    Mr. Vishal Gupta is the Promoter and Managing Director of Sawa Pharma. With a Civil Engineering degree from Thaper Institute, he founded Sawa Pharma in 2006. Bringing over 20 years of expertise in management, marketing, and administration, he has been instrumental in shaping the company’s strategic growth and market presence.`,
        },
        {
          id: 2,
          name: "Mr. Anil Kumar ",
          image: "/images/members/member1.jpg",
          bio: `Mr. Anil Kumar is the CEO and Co-Founder of Sawa Pharma. With a background in Pharmaceutical Sciences, he has over 18 years of experience in research and product development. His leadership has been key to driving innovation and ensuring the company’s growth in the competitive pharmaceutical market.`,
        },
        {
          id: 3,
          name: "Mr. Harvinder Singh Dhami",
          image: "/images/members/member1.jpg",
          bio: `Mr. Harvinder Singh Dhami, aged 58, has over 25 years of experience in law, accounts, and taxation. He holds a 
                    Post-Graduate degree in Commerce and a Bachelor’s in Law. He is a registered Insolvency Professional and is passionate 
                    about business processes and building high-performance teams. He is an Independent Director appointed to our company 
                    since May 2024.`,
        },
        {
          id: 4,
          name: "Mrs. Priya Sharma",
          image: "/images/members/member1.jpg",
          bio: `Mrs. Priya Sharma is the Director of Operations at Sawa Pharma. A graduate in Business Management, she brings over 15 years of experience in streamlining operations. Her expertise in supply chain management has significantly contributed to the efficiency and growth of Sawa Pharma.`,
        },
        {
          id: 5,
          name: "Mr. Ravi Jain ",
          image: "/images/members/member1.jpg",
          bio: `Mr. Ravi Jain is the Chief Financial Officer of Sawa Pharma. With a degree in Finance and over 20 years of experience in financial management, he oversees the company's financial strategy, helping to ensure stability and profitability, enabling sustainable growth in the pharmaceutical sector.`,
        },
        {
          id: 6,
          name: "Dr. Neelam Verma ",
          image: "/images/members/member1.jpg",
          bio: `Dr. Neelam Verma is the Chief Scientific Officer of Sawa Pharma. Holding a Ph.D. in Pharmacology, she has more than 15 years of experience in drug research and development. Dr. Verma leads the company’s R&D efforts, ensuring the development of innovative and high-quality pharmaceutical products.`,
        },
        {
          id: 7,
          name: "Mr. Vikas Mehta",
          image: "/images/members/member1.jpg",
          bio: `Mr. Vikas Mehta is the Director of Marketing at Sawa Pharma. With a background in Marketing and over 12 years of experience, he has successfully led branding and marketing strategies. His vision and innovative approach have played a crucial role in strengthening Sawa Pharma’s market presence.`,
        },
      ];

  return (
    <>
      <Breadcrumb />

      <div className="mx-5 lg:mx-28 my-10 lg:my-20">
        {/* Table View for Larger Screens */}
        <div className="hidden md:block">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-nowrap">Sr. No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Brief Biographies</th>
              </tr>
            </thead>
            <tbody>
              {directors.map((director, index) => (
                <tr key={director.id} className="border-t">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}.</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {director.image ? (
                      <Image
                        src={director.image}
                        alt={director.name}
                        width={800}
                        height={900}
                        className="w-28 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No Image Available</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{director.bio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Mobile Screens */}
        <div className="block md:hidden">
          {directors.map((director, index) => (
            <div
              key={director.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md bg-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16">
                  {director.image ? (
                    <Image
                      src={director.image}
                      alt={director.name}
                      width={800}
                      height={900}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      N/A
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{director.name}</h3>
                  <p className="text-sm text-gray-500">Director #{index + 1}</p>
                </div>
              </div>
              <p className="text-gray-700">{director.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
