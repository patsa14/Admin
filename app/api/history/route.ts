import { prisma } from "@/lib/prisma"

// GET all history
export async function GET() {
  const history = await prisma.history.findMany({
    include: { user: true },
    orderBy: { completedAt: "desc" },
  })
  return Response.json(history)
}

// POST (save done project)
export async function POST(req: Request) {
  const body = await req.json()

  const newHistory = await prisma.history.create({
    data: {
      userId: body.userId,
      projectName: body.projectName,
      location: body.location,
    },
  })

  return Response.json(newHistory)
}