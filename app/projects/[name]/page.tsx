"use client"

import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const params = useParams()
  const name = params.name

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Project Detail</h1>

      <div className="mt-4 bg-white p-6 rounded-xl shadow">
        <p className="text-lg font-medium">{name}</p>

        <p className="text-gray-500 mt-2">
          More project details will be shown here.
        </p>
      </div>
    </div>
  )
}