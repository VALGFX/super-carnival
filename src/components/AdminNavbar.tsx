'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/approve-user', label: 'Aprobări Utilizatori' },
    { href: '/admin/add-products', label: 'Adaugă Produs' }, // nou
]

export default function AdminNavbar() {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        router.replace('/login')  // recomand să redirecționezi către login-ul admin
    }

    return (
        <nav
            style={{
                display: 'flex',
                backgroundColor: '#1f2937',
                padding: '1rem 2rem',
                alignItems: 'center',
                gap: '2rem',
                color: 'white',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                userSelect: 'none',
            }}
        >
            <div
                style={{
                    fontWeight: '900',
                    fontSize: '1.3rem',
                    cursor: 'default',
                    flexGrow: 1,
                    color: '#27ae60',
                }}
            >
                VIDA-S Admin
            </div>

            {links.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                    <button
                        key={href}
                        onClick={() => router.push(href)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isActive ? '#27ae60' : 'white',
                            fontWeight: isActive ? '700' : '500',
                            cursor: 'pointer',
                            padding: '0.3rem 0.6rem',
                            borderBottom: isActive ? '2px solid #27ae60' : '2px solid transparent',
                            transition: 'color 0.3s, border-bottom-color 0.3s',
                            fontSize: '1rem',
                        }}
                    >
                        {label}
                    </button>
                )
            })}

            {/* Butonul de logout */}
            <button
                onClick={handleLogout}
                style={{
                    marginLeft: 'auto',
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    borderRadius: 4,
                    padding: '6px 14px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#c0392b'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#e74c3c'
                }}
                title="Deconectare"
            >
                Deconectare
            </button>
        </nav>
    )
}
