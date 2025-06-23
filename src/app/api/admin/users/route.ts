import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        await connectDB();
        // Caută utilizatorii neaprobați, returnează doar name și email
        const waitingUsers = await User.find({ isApproved: false }, 'name email').lean();
        return NextResponse.json(waitingUsers);
    } catch (error) {
        console.error('Eroare la get users:', error);
        return NextResponse.json({ error: 'Eroare la server.' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ error: 'UserId este obligatoriu.' }, { status: 400 });
        }

        await connectDB();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'Utilizator inexistent.' }, { status: 404 });
        }

        user.isApproved = true;
        await user.save();

        return NextResponse.json({ message: 'Utilizator aprobat.' });
    } catch (error) {
        console.error('Eroare la aprobare user:', error);
        return NextResponse.json({ error: 'Eroare la server.' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'UserId este obligatoriu.' }, { status: 400 });
        }

        await connectDB();

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json({ error: 'Utilizator inexistent.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Utilizator șters cu succes.' });
    } catch (error) {
        console.error('Eroare la ștergere user:', error);
        return NextResponse.json({ error: 'Eroare la server.' }, { status: 500 });
    }
}
