import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Debug: vezi ce valori ai în .env și ce primești la cerere
        console.log('Login attempt:', { email, password });
        console.log('Expected:', { ADMIN_EMAIL, ADMIN_PASSWORD });

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email și parolă sunt obligatorii.' },
                { status: 400 }
            );
        }

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { message: 'Date invalide.' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { email, isAdmin: true },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ token });
    } catch (error) {
        console.error('Eroare la login admin:', error);
        return NextResponse.json(
            { message: 'Eroare server.' },
            { status: 500 }
        );
    }
}
