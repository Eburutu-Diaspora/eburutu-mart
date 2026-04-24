export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = params

    const data: any = { updatedAt: new Date() }

    // Status update
    if (body.status !== undefined) {
      data.isActive = body.status === 'ACTIVE'
    }

    // Placement toggle updates
    if (body.isFeatured !== undefined)    data.isFeatured    = body.isFeatured
    if (body.isNewArrival !== undefined)  data.isNewArrival  = body.isNewArrival
    if (body.isRecommended !== undefined) data.isRecommended = body.isRecommended

    const product = await prisma.product.update({
      where: { id },
      data
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}
