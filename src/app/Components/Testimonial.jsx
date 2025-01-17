"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
    const testimonials = [
        {
            text: 'Etiam sapien sem at sagittis congue an augue massa varius egestas a suscipit magna undo tempus aliquet porta vitae',
            name: 'Scott Boxer',
            role: 'Programmer',
            avatar: '/images/testimonial4.avif',
        },
        {
            text: 'Mauris donec ociis magnisa a augue egestas et ultrice vitae purus diam integer congue magna ligula egestas',
            name: 'Penelopa Peterson',
            role: 'Project Manager',
            avatar: '/images/testimonial3.avif',
        },
        {
            text: 'At sagittis congue augue an egestas magna ipsum vitae purus ipsum primis undo cubilia laoreet augue',
            name: 'M.Scanlon',
            role: 'Photographer',
            avatar: '/images/testimonial2.jpg',
        },
        {
            text: 'Mauris donec ociis magnis sapien etiam sapien congue augue pretium ligula a lectus aenean magna mauris',
            name: 'Jeremy Kruse',
            role: 'Graphic Designer',
            avatar: '/images/testimonial1.jpg',
        },
    ];

    return (
        <section id="reviews" className="bg-gray-100 py-20 px-5 lg:px-28">
            <div className="container mx-auto px-0 lg:px-4">
                <div className="text-center mb-12 w-full lg:w-2/4 mx-auto">
                    <h3 className="text-4xl font-semibold text-steelblue mb-4">
                        What Our Patients Say
                    </h3>
                    <p className="text-gray-600">
                        Aliquam a augue suscipit, luctus neque purus ipsum neque dolor
                        primis libero at tempus, blandit posuere ligula varius congue cursus
                        porta feugiat
                    </p>
                </div>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                  
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="review-2">
                                <div className="review-txt text-center">
                                    <div className="mb-4 quote">
                                        <img
                                            src="/images/quote.png"
                                            alt="quote"
                                            className=""
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={`${testimonial.name}-avatar`}
                                            className="w-20 h-20 rounded-full mx-auto object-cover"
                                        />
                                    </div>

                                    <p className="text-gray-700 mb-4">{testimonial.text}</p>

                                    <h5 className="font-semibold text-lg">{testimonial.name}</h5>
                                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
