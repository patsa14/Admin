import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
    include: {
      schedules: {
        include: {
          worker: true
        }
      }
    }
  })

  return NextResponse.json(project)
}