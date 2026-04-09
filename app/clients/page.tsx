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

      
       {/* CARD LIST */}
<div className="grid grid-cols-3 gap-6">
  {clients.map((c) => (
    <div
      key={c.id}
      className="relative p-5 bg-white border rounded-2xl shadow hover:shadow-xl hover:scale-105 transition group"
    >
      {/* NAME */}
      <h2 className="text-lg font-bold">
        {c.user?.name || "No Name"}
      </h2>

      {/* LOCATION */}
      <div className="mt-2">
        {editId === c.id ? (
          <input
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <p className="text-gray-500">{c.location}</p>
        )}
      </div>

      {/* PROGRESS */}
      <div className="mt-2">
        {editId === c.id ? (
          <select
            value={editProgress}
            onChange={(e) => setEditProgress(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          <p>
            Status:{" "}
            <span className="font-semibold">{c.progress}</span>
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4">
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

              setEditId(null)
              fetchClients()
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
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
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => handleDelete(c.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* DETAIL BUTTON */}
      <a
        href={`/clients/${c.id}`}
        className="inline-block mt-3 text-blue-500 text-sm"
      >
        View Details →
      </a>

      {/* HOVER POPUP */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs p-3 rounded-xl top-2 right-2 w-48">
        <p>Email: {c.user?.email}</p>
        <p>Phone: {c.user?.phone || "-"}</p>
        <p>Address: {c.user?.address || "-"}</p>
      </div>
    </div>
  ))}
</div>
      </div>

  )
}