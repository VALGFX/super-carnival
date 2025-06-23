import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function verifyAdmin(token: string | null) {
    if (!token) return false;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'object' && 'isAdmin' in decoded && decoded.isAdmin) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const authHeader = req.headers.get('authorization') || '';
        const token = authHeader.replace('Bearer ', '');

        if (!(await verifyAdmin(token))) {
            return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
        }

        const { name, price, description, imageUrl, category, type } = await req.json();

        if (!name || !price || !category || !type) {
            return NextResponse.json({ error: 'Nume, preț, categorie și tip sunt obligatorii.' }, { status: 400 });
        }

        const newProduct = new Product({ name, price, description, imageUrl, category, type });
        await newProduct.save();

        return NextResponse.json({ message: 'Produs adăugat cu succes.', product: newProduct });
    } catch (error) {
        console.error('Eroare la adăugare produs:', error);
        return NextResponse.json({ error: 'Eroare server.' }, { status: 500 });
    }
}
