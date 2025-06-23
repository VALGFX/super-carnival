import React from 'react'

export default function AdminHeader() {
    return (
        <header
            style={{
                padding: '1.5rem 2rem',
                borderBottom: '2px solid #27ae60',
                marginBottom: '2rem',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#27ae60',
                userSelect: 'none',
            }}
        >
            <h1 style={{ fontWeight: '900', fontSize: '2.4rem', margin: 0 }}>Admin Dashboard (Real-time)</h1>
            <p style={{ marginTop: '0.5rem', color: '#555', fontWeight: '600' }}>
                Bine ai venit în panoul de control al administrației VIDA-S.
            </p>
        </header>
    )
}
