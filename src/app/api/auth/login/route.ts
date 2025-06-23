import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secretulTauSuperSecret'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email și parola sunt obligatorii.' },
                { status: 400 }
            )
        }

        await connectDB()

        const user = await User.findOne({ email }).exec()
        if (!user) {
            return NextResponse.json(
                { error: 'Email sau parola invalidă.' },
                { status: 401 }
            )
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: 'Email sau parola invalidă.' },
                { status: 401 }
            )
        }

        if (!user.isApproved) {
            return NextResponse.json(
                { error: 'Contul nu este aprobat încă.' },
                { status: 403 }
            )
        }

        const token = jwt.sign(
            { userId: user._id.toString(), isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '8h' }
        )

        return NextResponse.json({
            message: 'Login reușit!',
            token,
        })
    } catch (error) {
        console.error('Eroare la login:', error)
        return NextResponse.json(
            { error: 'Eroare internă la server.' },
            { status: 500 }
        )
    }
}
