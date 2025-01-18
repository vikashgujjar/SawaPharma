import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

const Page = () => {
  const blogs = [
    {
      id: 1,
      title: "Exploring India’s Booming Restaurant Industry",
      image:
        "https://www.ibef.org/uploads/blog/1736265006_cf3b9f4c86ba4d190ed0.jpg",
      category: "Consumer Markets",
      categoryLink: "https://www.ibef.org/blogs/category/consumer_markets",
      date: "Jan 08, 2025",
      time: "10:00",
      author: "IBEF, Knowledge Centre",
      link: "https://www.ibef.org/blogs/exploring-india-s-booming-restaurant-industry",
    },
    {
      id: 2,
      title:
        "Digital Rupee: Exploring the Future of India’s Central Bank Digital Currency (CBDC)",
      image:
        "https://www.ibef.org/uploads/blog/1736265174_4ad4088b761801ce64ee.jpg",
      category: "Economy",
      categoryLink: "https://www.ibef.org/blogs/category/indian-economy",
      date: "Jan 07, 2025",
      time: "14:25",
      author: "IBEF, Knowledge Centre",
      link: "https://www.ibef.org/blogs/digital-rupee-exploring-the-future-of-india-s-central-bank-digital-currency-cbdc",
    },
    {
      id: 3,
      title: "Decoding the Indian Consumer Basket",
      image:
        "https://www.ibef.org/uploads/blog/1736265411_8320d9ae7e4f1da2100e.jpg",
      category: "Consumer Markets",
      categoryLink: "https://www.ibef.org/blogs/category/consumer_markets",
      date: "Jan 03, 2025",
      time: "10:15",
      author: "IBEF, Knowledge Centre",
      link: "https://www.ibef.org/blogs/decoding-the-indian-consumer-basket",
    },
  ];

  return (
    <>
      <Breadcrumb />
      <section className="common-section py-20 px-5 lg:px-28" id="skipToMain">
        <div className="container mx-auto">
          <div className="block lg:flex justify-between flex-wrap">
            <div className="w-full lg:w-[28%] ">
              <div className="bg-gray-100 shadow-md p-5 mb-5">
                <h4 className="text-lg font-bold text-[#03a297]  uppercase">
                  Recent Posts
                </h4>
                <div className="mt-4">
                  {[
                    {
                      title: "Exploring India’s Booming Restaurant Industry",
                      date: "Jan 08, 2025, 10:00",
                      link: "https://www.ibef.org/blogs/exploring-india-s-booming-restaurant-industry",
                    },
                    {
                      title:
                        "Digital Rupee: Exploring the Future of India’s Central Bank Digital Currency (CBDC)",
                      date: "Jan 07, 2025, 14:25",
                      link: "https://www.ibef.org/blogs/digital-rupee-exploring-the-future-of-india-s-central-bank-digital-currency-cbdc",
                    },
                    {
                      title: "Decoding the Indian Consumer Basket",
                      date: "Jan 03, 2025, 10:15",
                      link: "https://www.ibef.org/blogs/decoding-the-indian-consumer-basket",
                    },
                  ].map((post, index) => (
                    <div key={index} className="mb-4">
                      <Link
                        href={post.link}
                        className="text-[#4b5563] hover:underline"
                      >
                        {post.title}
                      </Link>
                      <span className="block text-gray-600 text-sm mt-1">
                        <i className="far fa-clock mr-2"></i>
                        {post.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-100 shadow-md p-5 mb-5">
                <h4 className="text-lg font-bold text-[#03a297] uppercase">
                  Categories
                </h4>
                <ul className="mt-4 space-y-3">
                  {[
                    {
                      name: "Agriculture",
                      count: 21,
                      link: "https://www.ibef.org/blogs/category/agriculture",
                    },
                    {
                      name: "Automobiles",
                      count: 18,
                      link: "https://www.ibef.org/blogs/category/automobiles",
                    },
                    {
                      name: "Banking and Financial services",
                      count: 28,
                      link: "https://www.ibef.org/blogs/category/banking-and-financial-services",
                    },
                  ].map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <Link
                        href={category.link}
                        className="text-[#4b5563] hover:underline flex items-center gap-2"
                      >
                        <FaAngleRight />
                        {category.name}
                      </Link>
                      <span className="text-gray-600">({category.count})</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="w-full lg:w-[70%] blogs-content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="item bg-white shadow-lg rounded-lg p-5 space-y-4"
                  >
                    <figure>
                      <Link href={blog.link}>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-auto rounded"
                        />
                      </Link>
                    </figure>
                    <div className="folderDate flex justify-between items-center">
                      <h4 className="text-[#4b5563] text-lg">
                        <i className="far fa-folder-open mr-2"></i>
                        <Link href={blog.categoryLink}>{blog.category}</Link>
                      </h4>
                      <h5 className="text-gray-600 text-sm">{blog.date}</h5>
                    </div>
                    <div className="innerItemContent space-y-2">
                      <div className="flex text-gray-600 text-sm space-x-5">
                        <span>
                          <i className="far fa-clock mr-2"></i>
                          {blog.time}
                        </span>
                        <span>
                          <i className="far fa-user-edit mr-2"></i>
                          {blog.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <h4 className="text-[#03a297] font-semibold">
                        {blog.author}
                      </h4>
                      <Link
                        href={blog.link}
                        className="text-orange-600 font-semibold flex items-center"
                      >
                        Read More
                        <i className="fal fa-angle-right ml-2"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination mt-8 flex justify-center items-center">
                <nav aria-label="Page navigation">
                  <ul className="flex space-x-3">
                    <li className="text-orange-600">
                      <Link href="/blogs?page=1">1</Link>
                    </li>
                    <li>
                      <Link href="/blogs?page=2">2</Link>
                    </li>
                    <li>
                      <Link href="/blogs?page=3">3</Link>
                    </li>
                    <li>
                      <Link href="/blogs?page=4" aria-label="Next" title="Next">
                        <i className="fal fa-chevron-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blogs?page=42"
                        aria-label="Last"
                        title="Last"
                      >
                        <i className="fal fa-chevron-double-right"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
