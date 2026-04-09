"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ClientDetailPage() {
  const params = useParams() // ✅ get dynamic route param
  const id = params?.id
  const router = useRouter() // <-- for navigation

  const [client, setClient] = useState<any>(null)
  const [projectName, setProjectName] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return
    fetch(`/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch client")
        return res.json()
      })
      .then((data) => {
        setClient(data)
        setProjectName(data.projectName)
        setLocation(data.location)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Something went wrong")
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async () => {
  try {
    const res = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectName, location }),
    })
    if (!res.ok) throw new Error("Update failed")

    // ✅ Update only the fields we changed
    setClient((prev: any) => ({
      ...prev,
      projectName,
      location,
      updatedAt: new Date().toISOString(), // optional: show last updated time
    }))

    alert("Saved Successfully!")
  } catch (err: any) {
    alert(err.message || "Update error")
  }
}

  const handleBack = () => {
    router.push("/clients") // <-- go back to client CRUD/list page
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!client) return <p>No client found</p>

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{client.user?.name}</h1>
      <p>Email: {client.user?.email}</p>
      <p>Phone: {client.user?.phone || "-"}</p>
      <p>Address: {client.user?.address || "-"}</p>

      <div className="mt-4 space-y-3">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Project Name"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Location"
        />
        <div className="mt-4 flex gap-2">
        <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 transition"
        >
            Update
        </button>
        <button
            onClick={handleBack}
            className="flex-1 bg-gray-300 text-gray-800 text-sm px-2 py-1 rounded hover:bg-gray-400 transition"
        >
            Back
        </button>
        </div>
      </div>
    </div>
  )
}