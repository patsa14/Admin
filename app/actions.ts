"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ➕ Add Project
export async function addProject(formData: FormData) {
    console.log("🔥 ADD PROJECT CLICKED")

  try {
    // ✅ Safe string extraction
    const name = formData.get("name")?.toString().trim()
    const location = formData.get("location")?.toString().trim() || ""
 
    console.log("DATA:", { name, location })

    if (!name) {
      console.log("❌ NAME EMPTY")
      return
    }

    await prisma.project.create({
      data: {
        name,
        location,
      },
    })
     
    console.log("✅ SAVED SUCCESS")

    revalidatePath("/schedule")
  } catch (error) {
    console.error("Add Project Error:", error)
  }
}

// ➕ Add Worker
export async function addWorker(formData: FormData) {
  try {
    const name = formData.get("name")?.toString().trim()
    const team = formData.get("team")?.toString().trim() || "General"

    if (!name) return

    await prisma.worker.create({
      data: {
        name,
        team,
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
    const dateRaw = formData.get("date")?.toString()
    const startTime = formData.get("startTime")?.toString() || "08:00"
    const endTime = formData.get("endTime")?.toString() || "16:00"

    const start = new Date(`1970-01-01T${startTime}`)
    const end = new Date(`1970-01-01T${endTime}`)

    if (end <= start) {
      console.log("Invalid time")
      return
    }

    if (!workerId || !projectId || !dateRaw) {
      console.log("Missing data")
      return
    }

    const date = new Date(dateRaw)
    if (isNaN(date.getTime())) {
      console.log("Invalid date")
      return
    }

    await prisma.schedule.create({
      data: {
        workerId,
        projectId,
        date,
        startTime,
        endTime,
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