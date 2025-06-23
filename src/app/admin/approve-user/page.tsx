'use client';

import { useEffect, useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

interface User {
    _id: string;
    name: string;
    email: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [approving, setApproving] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/users');
            if (!res.ok) throw new Error('Eroare la încărcarea utilizatorilor');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError((err as Error).message || 'Eroare neașteptată');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleApprove = async (userId: string) => {
        setApproving(userId);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            if (!res.ok) throw new Error('Eroare la aprobare');
            await fetchUsers();
        } catch (err) {
            alert((err as Error).message || 'Eroare neașteptată');
        } finally {
            setApproving(null);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Ești sigur că vrei să ștergi acest utilizator?')) return;

        setDeleting(userId);
        try {
            // Schimbare importantă aici:
            const res = await fetch(`/api/admin/users?userId=${userId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Eroare la ștergere');
            await fetchUsers();
        } catch (err) {
            alert((err as Error).message || 'Eroare neașteptată');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Se încarcă utilizatorii...</p>;

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '50px auto',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                padding: '0 20px',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontWeight: '600',
                    color: '#222',
                    fontSize: '1.8rem',
                }}
            >
                Admin Panel — Utilizatori în așteptare
            </h1>

            {error && (
                <p
                    style={{
                        color: '#e74c3c',
                        backgroundColor: '#fdecea',
                        padding: '10px 15px',
                        borderRadius: 6,
                        marginBottom: 20,
                        textAlign: 'center',
                        fontWeight: '500',
                    }}
                >
                    {error}
                </p>
            )}

            {users.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
                    Nu există utilizatori în așteptare.
                </p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {users.map(user => (
                        <li
                            key={user._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                borderBottom: '1px solid #eee',
                                backgroundColor: '#fafafa',
                                borderRadius: '6px',
                                marginBottom: 12,
                                boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)',
                            }}
                        >
                            <div>
                                <strong style={{ fontSize: '1.05rem', color: '#333' }}>{user.name}</strong>{' '}
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>— {user.email}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button
                                    disabled={approving === user._id || deleting === user._id}
                                    onClick={() => handleApprove(user._id)}
                                    title="Aprobă utilizator"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '6px 14px',
                                        backgroundColor: '#2ecc71',
                                        border: 'none',
                                        borderRadius: 4,
                                        color: 'white',
                                        cursor: approving === user._id || deleting === user._id ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        opacity: approving === user._id ? 0.7 : 1,
                                        transition: 'background-color 0.2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        if (!approving && !deleting) e.currentTarget.style.backgroundColor = '#27ae60';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = '#2ecc71';
                                    }}
                                >
                                    <FaCheck size={14} />
                                    {approving === user._id ? 'Se aprobă...' : 'Aprobă'}
                                </button>

                                <button
                                    disabled={approving === user._id || deleting === user._id}
                                    onClick={() => handleDelete(user._id)}
                                    title="Șterge utilizator"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '6px 14px',
                                        backgroundColor: '#e74c3c',
                                        border: 'none',
                                        borderRadius: 4,
                                        color: 'white',
                                        cursor: approving === user._id || deleting === user._id ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        opacity: deleting === user._id ? 0.7 : 1,
                                        transition: 'background-color 0.2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        if (!approving && !deleting) e.currentTarget.style.backgroundColor = '#c0392b';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = '#e74c3c';
                                    }}
                                >
                                    <FaTrash size={14} />
                                    {deleting === user._id ? 'Se șterge...' : 'Șterge'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
