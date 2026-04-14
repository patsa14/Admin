"use client"

import { useRouter } from "next/navigation"

export default function ProjectCard({ project }: any) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        if (!project.id) return
        router.push(`/project/${project.id}`)
      }}
      className="cursor-pointer bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {project.name}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        📍 {project.location}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
          Active
        </span>

        <span className="text-xs text-gray-400">
          {project.schedules?.length || 0} schedules
        </span>
      </div>
    </div>
  )
}