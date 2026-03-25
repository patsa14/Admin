"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ➕ Add Project
export async function addProject(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const location = formData.get("location") as string

    if (!name?.trim()) return

    await prisma.project.create({
      data: {
        name: name.trim(),
        location: location?.trim() || "",
      },
    })

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Add Project Error:", error)
  }
}

// ➕ Add Worker
export async function addWorker(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const team = formData.get("team") as string

    if (!name?.trim()) return

    await prisma.worker.create({
      data: {
        name: name.trim(),
        team: team?.trim() || "General",
      },
    })

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Add Worker Error:", error)
  }
}

// ➕ Add Schedule (FIXED SAFE VERSION)
export async function addSchedule(formData: FormData) {
  try {
    const workerId = Number(formData.get("workerId"))
    const projectId = Number(formData.get("projectId"))
    const dateRaw = formData.get("date") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const start = new Date(`1970-01-01T${startTime}`)
    const end = new Date(`1970-01-01T${endTime}`)

    if (end <= start) {
    console.log("Invalid time")
    return
    }
    // ✅ VALIDATION
    if (!workerId || !projectId || !dateRaw) {
      console.log("Missing data")
      return
    }

    const date = new Date(dateRaw)

    // ❗ Prevent invalid date crash
    if (isNaN(date.getTime())) {
      console.log("Invalid date")
      return
    }

    await prisma.schedule.create({
      data: {
        workerId,
        projectId,
        date,
        startTime: startTime || "08:00",
        endTime: endTime || "16:00",
      },
    })

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Add Schedule Error:", error)
  }
}

// ❌ Delete Schedule
export async function deleteScheduleById(formData: FormData) {
  try {
    const id = Number(formData.get("id"))

    if (!id) return

    await prisma.schedule.delete({
      where: { id },
    })

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Delete Schedule Error:", error)
  }
}

// ❌ Delete Project (SAFE)
export async function deleteProject(formData: FormData) {
  try {
    const id = Number(formData.get("id"))

    if (!id) return

    // delete related schedules first
    await prisma.schedule.deleteMany({
      where: { projectId: id },
    })

    await prisma.project.delete({
      where: { id },
    })

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Delete Project Error:", error)
  }
}