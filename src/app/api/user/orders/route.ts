// /app/api/user/orders/route.ts
import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import Order from '@/models/Order' // asigură-te că ai modelul Order

export async function GET(req: Request) {
    try {
        await connectDB()

        const token = req.headers.get('authorization')?.split(' ')[1]

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        const userId = (decoded as any).userId

        const orders = await Order.find({ user: userId })

        return NextResponse.json(orders)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}
