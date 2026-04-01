"use client"

import { useEffect, useState } from "react"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const [editId, setEditId] = useState<number | null>(null)
  const [editLocation, setEditLocation] = useState("")
  const [editProgress, setEditProgress] = useState("")

  const fetchUsers = async () => {
  const res = await fetch("/api/users")
  const data = await res.json()
  setUsers(data)
}

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
    fetchUsers()
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
  if (!selectedUserId) {
    alert("Please select a user")
    return
  }

  const res = await fetch("/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: selectedUserId,
      location: "Add Location",
      progress: "Select progress",
    }),
  })

  const data = await res.json()
  console.log(data)

  fetchClients()
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
    progress: "Completed"
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
      <select
  onChange={(e) => setSelectedUserId(Number(e.target.value))}
  className="border px-3 py-2 rounded-lg"
>
  <option value="">Select Client</option>
  {users.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ))}
</select>

      {/* CREATE BUTTON */}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
        + Add Client
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
                <td className="p-4">
                {editId === c.id ? (
                    <input
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="border px-2 py-1 rounded"
                    />
                ) : (
                    c.location
                )}
                </td>

                {/* Progress */}
                <td className="p-4">
                {editId === c.id ? (
                    <select
                    value={editProgress}
                    onChange={(e) => setEditProgress(e.target.value)}
                    className="border px-2 py-1 rounded"
                    >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                ) : (
                    <span>{c.progress}</span>
                )}
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-2">
                {editId === c.id ? (
                    <button
                    onClick={async () => {
                        await fetch(`/api/clients/${c.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            location: editLocation,
                            progress: editProgress,
                        }),
                        })

                        setEditId(null) // exit edit mode
                        fetchClients()  // refresh data
                    }}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                    Save
                    </button>
                ) : (
                    <button
                    onClick={() => {
                        setEditId(c.id)
                        setEditLocation(c.location)
                        setEditProgress(c.progress)
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                    Edit
                    </button>
                )}

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