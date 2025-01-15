import Image from 'next/image';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';

const Gallery = () => {
  const galleryItems = [
    { id: 1, imgSrc: '/images/Gallary/gallery1.jpg', animation: 'fadeInUp' },
    { id: 2, imgSrc: '/images/Gallary/gallery2.jpg', animation: 'fadeInDown' },
    { id: 3, imgSrc: '/images/Gallary/gallery3.jpg', animation: 'fadeInUp' },
    { id: 4, imgSrc: '/images/Gallary/gallery4.jpg', animation: 'fadeInDown' },
    { id: 5, imgSrc: '/images/Gallary/gallery5.jpg', animation: 'fadeInUp' },
    { id: 6, imgSrc: '/images/Gallary/gallery6.jpg', animation: 'fadeInDown' },
  ];

  return (
    <div className="gallery-area py-20 px-5 lg:px-28" >
      <div className="">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-4xl font-semibold text-steelblue mb-4">Our Gallery</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Let's Check Our Photo <span className="text-[#03a297]">Gallery</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item h-[295px] wow ${item.animation} relative group`}
            >
              <div className="gallery-img">
                <Image
                  src={item.imgSrc}
                  alt={`Gallery Image ${item.id}`}
                  width={500}
                  height={500}
                  className="h-full w-ful object-cover"
                />
                <Link
                  href={item.imgSrc}
                  className="popup-img gallery-link relative"
                >
                  <FaPlus className='absolute text-[#03a297] top-3.5 left-3.5'/>
                </Link> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
