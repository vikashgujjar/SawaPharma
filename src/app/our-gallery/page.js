import React from 'react'
import Breadcrumb from '../Components/Breadcrumb';

const page = () => {

    const imageUrls = [
        "/images/gallery/1.webp",
        "/images/gallery/2.webp",
        "/images/gallery/3.webp",
        "/images/gallery/5.webp",
        "/images/gallery/6.webp",
        "/images/gallery/8.webp",
        "/images/gallery/9.webp",
        "/images/gallery/10.webp",
        "/images/gallery/11.webp",
        "/images/gallery/12.webp",
        "/images/gallery/13.webp",
        "/images/gallery/14.webp",
        "/images/gallery/15.webp",
        "/images/gallery/16.webp",
        "/images/gallery/17.webp",
        "/images/gallery/19.webp",
        "/images/gallery/7.webp",
        "/images/gallery/18.webp",
        "/images/gallery/20.webp",
        "/images/gallery/4.webp",
      ];


  return (
    <>

<Breadcrumb />
     <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 px-5 lg:px-28 py-20">
      {imageUrls.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      ))}
    </div>
    </>
  )
}

export default page