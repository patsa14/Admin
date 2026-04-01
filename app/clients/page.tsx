"use client"

import { useEffect, useState } from "react"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients")
      const data = await res.json()
      setClients(data)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      })
      fetchClients()
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleCreate = async () => {
  try {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        location: "Test Villa",
        progress: 50,
      }),
    })

    // 🔥 FIX: check before parsing
    if (!res.ok) {
      const text = await res.text()
      console.error("Server error:", text)
      return
    }

    const data = await res.json()
    console.log("Created:", data)

    fetchClients()
  } catch (error) {
    console.error("Create error:", error)
  }
}

  const handleUpdate = async (id: number) => {
    try {
      await fetch(`/api/clients/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    location: "Updated Location",
    progress: 80,
  }),
})

      fetchClients()
    } catch (error) {
      console.error("Update error:", error)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Client Portfolio</h1>

      {/* CREATE BUTTON */}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Adding..." : "+ Add Client"}
      </button>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{c.user?.name || "No Name"}</td>
                <td className="p-4">{c.location}</td>

                {/* Progress */}
                <td className="p-4 w-1/3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${c.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {c.progress || 0}%
                  </p>
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(c.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}