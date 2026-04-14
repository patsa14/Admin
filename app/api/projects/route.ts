import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      schedules: true
    }
  })

  return NextResponse.json(projects)
}