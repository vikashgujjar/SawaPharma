"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseLink } from "../config/Apilink";

const Topbar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching topbar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="sp-top-bar" className="hidden lg:block bg-[#6e7881] h-8 py-2 border-b px-28">
      <div className="flex flex-wrap items-center justify-between">
        
    
        {/* <div id="sp-top1" className="text-center md:text-left md:w-2/3 lg:w-7/12">
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white">
            {loading ? (
              <>
               
                <li className="h-4 w-32 bg-gray-400 animate-pulse rounded"></li>
                <li className="h-4 w-32 bg-gray-400 animate-pulse rounded"></li>
                <li className="h-4 w-40 bg-gray-400 animate-pulse rounded"></li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <span className="fas fa-phone-alt" aria-hidden="true"></span>
                  <Link href={`tel:${data?.number1}`} className="hover:underline">
                    {data?.number1}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="fas fa-phone-alt" aria-hidden="true"></span>
                  <Link href={`tel:${data?.number2}`} className="hover:underline">
                    {data?.number2}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="far fa-envelope" aria-hidden="true"></span>
                  <Link href={`mailto:${data?.email}`} className="hover:underline">
                    {data?.email}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div> */}

       
        {/* <div id="sp-top2" className="text-center md:text-right md:w-1/3 lg:w-5/12">
          <ul className="flex items-center justify-center md:justify-end gap-4 text-white">
            {loading ? (
              <>
                
                <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
              </>
            ) : (
              data?.links?.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} target="_blank" className="hover:text-gray-300">
                    {item.platform === "facebook" && <i className="fab fa-facebook-f"></i>}
                    {item.platform === "tweeter" && <i className="fab fa-twitter"></i>}
                    {item.platform === "instagram" && <i className="fab fa-instagram"></i>}
                    {item.platform === "youtube" && <i className="fab fa-youtube"></i>}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Topbar;
