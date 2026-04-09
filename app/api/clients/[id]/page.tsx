"use client"

import { useEffect, useState } from "react"

export default function ClientDetail({ params }: any) {
  const [client, setClient] = useState<any>(null)
  const [projectName, setProjectName] = useState("")
  const [location, setLocation] = useState("")

  const fetchClient = async () => {
    const res = await fetch(`/api/clients/${params.id}`)
    const data = await res.json()
    setClient(data)
    setProjectName(data.projectName)
    setLocation(data.location)
  }

  useEffect(() => {
    fetchClient()
  }, [])

  const handleUpdate = async () => {
    await fetch(`/api/clients/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        location,
      }),
    })

    fetchClient()
  }

  if (!client) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {client.user?.name}
      </h1>

      <p>Email: {client.user?.email}</p>
      <p>Phone: {client.user?.phone}</p>

      <div className="mt-4 space-y-3">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  )
}