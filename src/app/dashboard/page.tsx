'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.replace('/auth/login')
            return
        }

        fetch('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (res.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    localStorage.removeItem('token')
                    router.replace('/auth/login')
                }
            })
            .catch(() => {
                localStorage.removeItem('token')
                router.replace('/auth/login')
            })
    }, [router])

    if (isAuthenticated === null) {
        return <div style={{ textAlign: 'center', padding: 40 }}>Se încarcă...</div>
    }

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Dashboard</h1>
            <p style={{ textAlign: 'center', color: '#27ae60', fontWeight: '600' }}>
                Ești autentificat cu succes!
            </p>
            <button
                onClick={() => {
                    localStorage.removeItem('token')
                    router.replace('/auth/login')
                }}
                style={{
                    display: 'block',
                    margin: '30px auto',
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                }}
            >
                Deconectare
            </button>
        </div>
    )
}
