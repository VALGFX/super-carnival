import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'

// DELETE /api/products/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()

        const deletedProduct = await Product.findByIdAndDelete(params.id)

        if (!deletedProduct) {
            return NextResponse.json({ error: 'Produsul nu a fost găsit.' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Produs șters cu succes.' })
    } catch (error) {
        console.error('Eroare la ștergere produs:', error)
        return NextResponse.json({ error: 'Eroare server.' }, { status: 500 })
    }
}
