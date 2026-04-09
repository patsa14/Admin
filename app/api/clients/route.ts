import prisma from "@/lib/prisma"

// GET
export async function GET() {
  const clients = await prisma.client.findMany({
    include: { user: true },
  })
  return Response.json(clients)
}

// POST
export async function POST(req: Request) {
  const body = await req.json()

  const client = await prisma.client.create({
  data: {
    userId: body.userId,
    location: body.location,
    projectName: body.projectName, // ✅ เปลี่ยนตรงนี้
  },
})

  return Response.json(client)
}