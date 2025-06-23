import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii.' }, { status: 400 })
        }

        await connectDB()

        // Verifică dacă emailul există deja
        const existingUser = await User.findOne({ email }).exec()
        if (existingUser) {
            return NextResponse.json({ error: 'Email deja înregistrat.' }, { status: 409 })
        }

        // Hashează parola
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creează userul cu isApproved = false
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isApproved: false,
        })

        await newUser.save()

        return NextResponse.json({ message: 'Înregistrare reușită. Așteaptă aprobarea adminului.' }, { status: 201 })
    } catch (error) {
        console.error('Eroare la înregistrare:', error)
        return NextResponse.json({ error: 'Eroare internă la server.' }, { status: 500 })
    }
}
