"use client"

import { useState, useTransition } from "react"

export default function AddEntityModal({
  addProject,
  addWorker,
  defaultType = "project",
  label = "+ Add",
  buttonClass = "",
}: any) {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (defaultType === "project") {
        await addProject(formData)
      } else {
        await addWorker(formData)
      }

      setOpen(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    })
  }

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`px-3 py-1.5 rounded-md text-sm transition ${buttonClass}`}
      >
        {label}
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            action={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow w-[320px] space-y-4"
          >
            <h2 className="text-lg font-semibold">
              {defaultType === "project" ? "Add Project" : "Add Worker"}
            </h2>

            {defaultType === "project" ? (
              <>
                <input
                  name="name"
                  placeholder="Project Name"
                  className="border p-2 w-full"
                />
                <input
                  name="location"
                  placeholder="Location"
                  className="border p-2 w-full"
                />

                <button
                  disabled={pending}
                  className="bg-sky-700 text-white w-full py-2 rounded"
                >
                  {pending ? "Adding..." : "Add Project"}
                </button>
              </>
            ) : (
              <>
                <input
                  name="name"
                  placeholder="Worker Name"
                  className="border p-2 w-full"
                />
                <input
                  name="team"
                  placeholder="Team"
                  className="border p-2 w-full"
                />

                <button
                  disabled={pending}
                  className="bg-cyan-700 text-white w-full py-2 rounded"
                >
                  {pending ? "Adding..." : "Add Worker"}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {success && (
  <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm">
    🎉 Added successfully!
  </div>
)}
    </>
  )
}