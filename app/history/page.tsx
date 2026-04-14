"use client"

import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Project History</h1>

      <div className="grid gap-4">
        {history.map((h) => (
          <div
            key={h.id}
            className="p-4 bg-white shadow rounded-lg border"
          >
            <h2 className="font-semibold text-lg">{h.user?.name}</h2>
            <p>Project: {h.projectName}</p>
            <p>Location: {h.location}</p>
            <p className="text-sm text-gray-500">
              Completed: {new Date(h.completedAt).toLocaleString()}
            </p>
          </div>
        ))}

        {history.length === 0 && (
          <p className="text-gray-500">No history yet.</p>
        )}
      </div>
    </div>
  )
}