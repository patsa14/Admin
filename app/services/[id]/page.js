// /app/services/[id]/page.js

import React from "react";
import Link from "next/link";

const servicesData = [
  {
    id: 1,
    name: "Electrical System",
    img: "/images/elec.jpg",
    description:
      "Our Electrical System services provide reliable and safe installations.",
    gallery: ["/images/elec2.jpg", "/images/elec3.jpg"],
  },
  {
    id: 2,
    name: "Water Supply System",
    img: "/images/water.jpg",
    description:
      "We ensure clean and efficient water supply systems...",
    gallery: ["/images/water2.jpg", "/images/water8.jpg"],
  },
  {
    id: 3,
    name: "Air Conditioning System",
    img: "/images/airr.jpg",
    description:
      "Our Home System Design service provides safe, efficient, and well-planned system installations for residential buildings.",
    gallery: [
      "/images/air2.jpg",
      "/images/air3.jpg",
      "/images/air4.jpg",
      "/images/air5.jpg",
    ],
  },
  {
    id: 4,
    name: "Design and Drafting",
    img: "/images/design.jpg",
    description:
      "Our Design and Drafting services create detailed plans and blueprints tailored to your project's requirements.",
    gallery: [
      "/images/design2.jpg",
      "/images/design3.jpg",
      "/images/design4.jpg",
      "/images/design5.jpg",
    ],
  },
  {
    id: 5,
    name: "Home System Design",
    img: "/images/plan1.jpg",
    description:
      "Our Solar Energy System services provide sustainable and energy-efficient solutions for residential and commercial projects.",
    gallery: [
      "/images/plan2.jpg",
      "/images/plan3.jpg",
      "/images/plan4.jpg",
    ],
  },
];

export default function ServiceDetail({ params }) {
  const { id } = params;
  const service = servicesData.find(
    (service) => service.id.toString() === id
  );

  if (!service) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-red-600">
          Service Not Found
        </h1>
        <p className="text-lg mt-4">
          The requested service does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 lg:px-20">

      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 px-4 py-2 
                   rounded-full text-sm font-medium
                   bg-sky-600 text-white
                   hover:bg-sky-700 
                   transition duration-200 mb-6"
      >
        &lt; Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Hero Image */}
        <div className="relative w-full h-[350px]">
          <img
            src={service.img}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {service.name}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Gallery Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Gallery
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {service.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.name} ${index + 1}`}
                  className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
