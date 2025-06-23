'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            router.replace('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50, fontSize: 18, color: '#555' }}>
                Verificare autentificare...
            </div>
        );
    }

    return (
        <>
            <AdminNavbar />
            <main>{children}</main>
        </>
    );
}
