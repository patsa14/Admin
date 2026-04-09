"use client"

import { useState } from "react"
import { useTransition } from "react"

export default function AddEntityModal({
  addProject,
  addWorker,
  defaultType = "project",
  label = "+ Add",
}: any) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(defaultType)
  const [pending, startTransition] = useTransition()
  

  return (
    <>
      <button
  onClick={() => {
    setType(defaultType) // reset type when opening
    setOpen(true)
  }}
  className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-md text-sm hover:bg-emerald-500 transition"
>
  {label}
</button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl shadow w-[320px] space-y-4">

            <h2 className="text-lg font-semibold">Add New</h2>

            

            {defaultType === "project" ? (
              <form
                action={(formData) =>
                    startTransition(() => addProject(formData))
                }
                className="space-y-2"
                >
                <input name="name" placeholder="Project Name" className="border p-2 w-full" />
                <input name="location" placeholder="Location" className="border p-2 w-full" />
                <button type="submit" className="bg-sky-700 text-white w-full py-2 rounded">Add Project</button>
              </form>
            ) : (
              <form action={addWorker} className="space-y-2">
                <input name="name" placeholder="Worker Name" className="border p-2 w-full" />
                <input name="team" placeholder="Team" className="border p-2 w-full" />
                <button className="bg-cyan-700 text-white w-full py-2 rounded">Add Worker</button>
              </form>
            )}

            <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
              Cancel
            </button>
          </div>

        </div>
      )}
    </>
  )
}