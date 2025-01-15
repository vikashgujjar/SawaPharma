import Link from "next/link";
import React from "react";

const AboutUsSection = () => {
  return (
    <section id="video-1" className="py-16 px-5 lg:px-28">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          {/* VIDEO TEXT */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div
              className="space-y-6 fadeInUp"
              style={{ animationDelay: "0.4s", animationName: "fadeInUp" }}
            >
              <span className="text-uppercase text-[#03a297] text-4xl font-semibold mb-5 animate-fadeInUp">
                Highest Quality Care
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold text-steelblue-500">
                Solutions to Complex Medical Problems
              </h3>

              {[
                "Nemo ipsam egestas volute turpis dolores ut aliquam quaerat sodales sapien undo pretium purus feugiat dolor impedit",
                "Gravida quis vehicula magna luctus tempor quisque vel laoreet turpis urna augue, viverra a augue eget dictum",
                "Nemo ipsam egestas volute turpis dolores ut aliquam quaerat sodales sapien undo pretium purus feugiat dolor impedit",
              ].map((text, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-[#03a297]">
                    <i className="fas fa-genderless"></i>
                  </div>
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO LINK */}
          <div className="w-full lg:w-1/2 px-4">
            <div
              className="text-center relative fadeInUp"
              style={{ animationDelay: "0.6s", animationName: "fadeInUp" }}
            >
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="absolute top-[40%] left-[45%] mx-auto mb-6 w-16 h-16 bg-[#03a297] text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110">
                  <i className="fas fa-play text-lg"></i>
                </div>
                <img
                  src="https://live.themewild.com/medion/assets/img/video/01.jpg"
                  alt="Video Preview"
                  className="w-auto h-[350px] object-cover rounded-md shadow-lg"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
