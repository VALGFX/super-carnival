import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        await connectDB();
        const totalUsers = await User.countDocuments();
        const pendingApprovals = await User.countDocuments({ isApproved: false });
        // activeSessions poate fi calculat diferit (ex: cu Redis sau altă logică)
        const activeSessions = 5; // placeholder

        return NextResponse.json({ totalUsers, pendingApprovals, activeSessions });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
