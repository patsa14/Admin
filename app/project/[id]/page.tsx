"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params.id

  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects/${id}`)
      const data = await res.json()
      setProject(data)
    }

    if (id) fetchProject()
  }, [id])

  if (!project) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-gray-500 mt-1">📍 {project.location}</p>
      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Schedule Table
        </h2>

        {project.schedules.length === 0 ? (
          <p className="text-gray-400">No schedules</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 text-left">Worker</th>
                <th className="text-left">Team</th>
                <th className="text-left">Date</th>
                <th className="text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {project.schedules.map((s: any) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">👷 {s.worker.name}</td>
                  <td>{s.worker.team}</td>
                  <td>
                    {new Date(s.date).toLocaleDateString()}
                  </td>
                  <td>
                    {s.startTime} - {s.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}