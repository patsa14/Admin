"use client"

import { useEffect, useState } from "react"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  // Fetch clients
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients", { cache: "no-store" })
      const data = await res.json()
      setClients(data)
    } catch (err: any) {
      window.alert(err.message)
    }
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setUsers(data)
    } catch (err: any) {
      window.alert(err.message)
    }
  }

  useEffect(() => {
    fetchClients()
    fetchUsers()
  }, [])

  // Handle add client
  const handleCreate = async () => {
    if (!selectedUserId) return window.alert("Select user first")

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(selectedUserId),
          location: "Add Location",
          projectName: "No Project",
        }),
      })

      if (!res.ok) throw new Error("Failed to add client")

      const newClient = await res.json() // ✅ should include user

      // Update clients list instantly
      setClients((prev) => [...prev, newClient])
      setSelectedUserId("")

      // Show success popup
      setSuccessMessage("Client added successfully!")
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (err: any) {
      window.alert(err.message)
    }
  }

  // Handle delete client
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this client?")
    if (!confirmed) return

    try {
      const res = await fetch("/api/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.message)

      // Remove client from state instantly
      setClients((prev) => prev.filter((c) => c.id !== id))

      // Show success popup
      setSuccessMessage("Client deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 2000)
    } catch (err: any) {
      window.alert(err.message)
    }
  }

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-2xl font-semibold">Client Information</h1>

      {/* Success alert */}
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
          {successMessage}
        </div>
      )}

      {/* select + add */}
      <div className="flex gap-3">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Client</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Client
        </button>
      </div>

      {/* client cards */}
      <div className="grid grid-cols-3 gap-6">
        {clients.map((c) => (
          <div
  key={c.id}
  className="relative group p-5 min-h-[200px] bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col"
>
  <h2 className="font-semibold text-lg text-gray-800">{c.user?.name}</h2>

  <p className="mt-2 text-sm text-gray-600">
    Project: <span className="font-medium text-gray-900">{c.projectName}</span>
  </p>

  {/* buttons at the bottom */}
  <div className="mt-auto flex gap-2 pt-2">
    <button
      onClick={() => window.location.href = `/clients/${c.id}`}
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
    >
      View Details
    </button>

    <button
      onClick={() => handleDelete(c.id)}
      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow hover:from-red-600 hover:to-red-700 transition-all duration-300"
    >
      Delete
    </button>
  </div>

  {/* HOVER POPUP */}
  <div className="absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-200 bg-black text-white text-xs p-3 rounded-xl 
                  top-2 right-2 w-48 pointer-events-none group-hover:pointer-events-auto shadow-lg">
    <p>Email: {c.user?.email}</p>
    <p>Phone: {c.user?.phone || "-"}</p>
    <p>Address: {c.user?.address || "-"}</p>
    <p>Location: {c.location}</p>
  </div>
</div>
        ))}
      </div>
    </div>
  )
}