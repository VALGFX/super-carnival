import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'

export async function GET() {
    try {
        await connectDB()
        const products = await Product.find().lean()
        return NextResponse.json(products)
    } catch (error) {
        console.error('Eroare la get produse:', error)
        return NextResponse.json({ error: 'Eroare server.' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { name, price, description, imageUrl, category, type } = await req.json()

        if (!name || !price || !category || !type) {
            return NextResponse.json({ error: 'Numele, prețul, categoria și tipul sunt obligatorii.' }, { status: 400 })
        }

        await connectDB()

        const newProduct = new Product({
            name,
            price,
            description: description || '',
            imageUrl: imageUrl || '',
            category,
            type,
        })

        await newProduct.save()

        return NextResponse.json({ message: 'Produs adăugat cu succes.' })
    } catch (error) {
        console.error('Eroare la adăugare produs:', error)
        return NextResponse.json({ error: 'Eroare server.' }, { status: 500 })
    }
}
