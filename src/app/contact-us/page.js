import React from 'react'
import ContactSection from '../Components/ContactSection'
import Breadcrumb from '../Components/Breadcrumb'

const page = () => {
  return (
    <>
    <Breadcrumb />
    <ContactSection />
    <div className="p-4 pb-10">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            "SCO 21, 1st Floor, Swastik Vihar, MDC, Sector 5, Panchkula, Haryana 134109"
          )}&output=embed`}
          width="100%"
          height="450"
          className="border-0 w-full h-96"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </>
  )
}

export default page