import React from 'react'
import ContactSection from '../Components/ContactSection'
import Breadcrumb from '../Components/Breadcrumb'

const page = () => {
  return (
    <>
    <Breadcrumb />
    <ContactSection />
    <div className="p-4">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0730356908966!2d76.84359843153271!3d30.7163471090798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9322a5785575%3A0x2b68fd6f348c72fa!2sSwastik%20Vihar%2C%20Sector%205%2C%20Panchkula%2C%20160101!5e0!3m2!1sen!2sin!4v1736942163309!5m2!1sen!2sin"
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