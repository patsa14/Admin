import { prisma } from "@/lib/prisma"

export default async function SchedulePage() {
  const schedules = await prisma.schedule.findMany({
    include: {
      worker: true,
      project: true
    }
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Schedule</h1>

      {schedules.map((s: any) => (
        <div key={s.id} className="border p-3 mt-3 rounded">
          <p>Worker: {s.worker.name}</p>
          <p>Project: {s.project.name}</p>
          <p>{s.startTime} - {s.endTime}</p>
        </div>
      ))}
    </div>
  )
}