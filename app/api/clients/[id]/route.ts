import prisma from "@/lib/prisma"

// UPDATE
export async function PUT(req: Request, { params }: any) {
  const body = await req.json()

  const updated = await prisma.client.update({
    where: { id: Number(params.id) },
    data: {
      location: body.location,
      progress: body.progress,
    },
  })

  return Response.json(updated)
}

// DELETE
export async function DELETE(req: Request, { params }: any) {
  await prisma.client.delete({
    where: { id: Number(params.id) },
  })

  return Response.json({ message: "Deleted" })
}