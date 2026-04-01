import prisma from "@/lib/prisma"

// GET all clients
export async function GET() {
  const clients = await prisma.client.findMany({
    include: { user: true },
  })

  return Response.json(clients)
}

// CREATE client (FIXED)
export async function POST(req: Request) {
  const body = await req.json()

  const client = await prisma.client.create({
    data: {
      userId: body.userId,   // ✅ ONLY THIS
      location: body.location,
      progress: body.progress,
    },
  })

  return Response.json(client)
}