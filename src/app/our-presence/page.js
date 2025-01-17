import React from "react";
import Breadcrumb from "../Components/Breadcrumb";

const locations = [
  {
    id: 1,
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0730356908966!2d76.84359843153271!3d30.7163471090798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9322a5785575%3A0x2b68fd6f348c72fa!2sSwastik%20Vihar%2C%20Sector%205%2C%20Panchkula%2C%20160101!5e0!3m2!1sen!2sin!4v1736942163309!5m2!1sen!2sin",
    alt: "Location 1"
  },
  {
    id: 2,
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0730356908966!2d76.84359843153271!3d30.7163471090798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9322a5785575%3A0x2b68fd6f348c72fa!2sSwastik%20Vihar%2C%20Sector%205%2C%20Panchkula%2C%20160101!5e0!3m2!1sen!2sin!4v1736942163309!5m2!1sen!2sin",
    alt: "Location 2"
  }
  // Add more locations as needed
];

const Page = () => {
  return (
    <>
      <Breadcrumb />
      <div className="px-28 py-20">
        <h2 className="text-4xl font-semibold text-steelblue text-center mb-8">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div key={location.id}>
              <iframe
                src={location.src}
                width="450"
                height="450"
                className="border-0 w-full h-96"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                alt={location.alt}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
