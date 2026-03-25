'use client';

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectDetail() {
  const { id } = useParams();

  const properties = [
    {
      id: "1",
      name: "Pool Villa",
      location: "Manik - Phuket",
      description: "Modern pool villa with tropical design.",
      images: [
        "/images/pool.jpg",
        "/images/pool2.jpg",
        "/images/pool3.jpg",
        "/images/pool4.jpg",
      ],
    },
    {
      id: "2",
      name: "Cafe",
      location: "Mueang - Phuket",
      description: "Minimal cafe interior design.",
      images: [
        "/images/pro1.jpg",
        "/images/inte.jpg",
        "/images/cafe3.jpg",
        "/images/cafe4.jpg",
      ],
    },
    {
    id: "3",
    name: "Luxury Villa",
    location: "Thalang - Phuket",
    projectType: "Residential",
    description:
      "An exclusive luxury villa combining modern architecture with high-end finishes and private outdoor living spaces.",
    images: [
      "/images/project3.jpg",
      "/images/project2.jpg",
      "/images/project4.jpg",
      "/images/project5.jpg",
    ],
    },
    {
        id: "4",
        name: "Dental Clinic",
        location: "Thalang - Phuket",
        projectType: "Commercial",
        description:
        "A fully equipped dental clinic designed with patient comfort, hygiene standards, and efficient workflow in mind.",
        images: [
        "/images/dental1.jpg",
        "/images/dental2.jpg",
        "/images/dental3.jpg",
        "/images/dental4.jpg",
        ],
    },
    {
        id: "5",
        name: "Dermatology Clinic",
        location: "Thalang - Phuket",
        projectType: "Commercial",
        description:
        "A modern dermatology clinic with professional treatment rooms and a clean, calming interior concept.",
        images: [
        "/images/Drpat1.jpg",
        "/images/Drpat2.jpg",
        "/images/Drpat3.jpg",
        "/images/Drpat4.jpg",
        ],
    },
    {
        id: "6",
        name: "Boutique Villa",
        location: "Thalang - Phuket",
        projectType: "Residential",
        description:
        "A boutique-style villa featuring warm wood elements, elegant finishes, and a peaceful tropical ambiance.",
        images: [
        "/images/wood1.jpg",
        "/images/wood2.jpg",
        "/images/wood3.jpg",
        "/images/wood4.jpg",
        "/images/wood5.jpg",
        ],
    },
  ];

  const project = properties.find(p => p.id === id);

  if (!project) return <div className="p-10">Project not found</div>;

  return (
    <main className="min-h-screen bg-sky-50 p-6">

      <Link
  href="/projects"
  className="inline-flex items-center gap-1 px-3 py-1.5 
             rounded-full text-sm font-medium
             bg-sky-600 text-white
             hover:bg-sky-700 
             transition duration-200"
        >
        &lt; Back to projects
        </Link>



      <h1 className="text-3xl font-bold mt-4">{project.name}</h1>
      <p className="text-gray-500 mb-6">{project.location}</p>

      <p className="mb-8 text-gray-700">
        {project.description}
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
     - Gallery - 
      </h2>


      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {project.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="gallery"
            className="rounded-xl shadow-sm object-cover w-full h-64"
          />
        ))}
      </div>

    </main>
  );
}
