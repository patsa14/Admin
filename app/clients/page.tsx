"use client"

import { useEffect, useState } from "react"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")

  // fetch data
  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(setClients)

    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])

  // create client
  const handleCreate = async () => {
    if (!selectedUserId) return alert("Select user first")

    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: Number(selectedUserId),
        location: "Add Location",
        projectName: "No Project",
      }),
    })

    const res = await fetch("/api/clients")
    setClients(await res.json())
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Client Portfolio</h1>

      {/* select + add */}
      <div className="flex gap-3">
        <select
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

      {/* cards */}
      <div className="grid grid-cols-3 gap-6">
        {clients.map((c) => (
          <div
            key={c.id}
            className="relative group p-5 bg-white border rounded-2xl shadow hover:shadow-xl hover:scale-105 transition"
          >
            {/* NAME */}
            <h2 className="font-bold">{c.user?.name}</h2>

            {/* PROJECT */}
            <p className="mt-2 text-sm">
              Project:{" "}
              <span className="font-semibold">
                {c.projectName}
              </span>
            </p>

            {/* DETAIL */}
            <a
              href={`/clients/${c.id}`}
              className="text-blue-500 text-sm mt-3 inline-block"
            >
              View Details →
            </a>

            {/* HOVER POPUP */}
            <div className="absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bg-black text-white text-xs p-3 rounded-xl top-2 right-2 w-48">
              <p>Email: {c.user?.email}</p>
              <p>Phone: {c.user?.phone || "-"}</p>
              <p>Location: {c.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}