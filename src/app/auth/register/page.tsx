'use client';

import { useState, FormEvent, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

const containerStyle: CSSProperties = {
    maxWidth: '400px',
    margin: '50px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '1rem',
    color: '#333',
};

const inputStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const buttonStyle: CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const errorStyle: CSSProperties = {
    color: 'red',
    marginTop: '10px',
};

const successStyle: CSSProperties = {
    color: 'green',
    marginTop: '10px',
};

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // validări simple
        if (!email || !password || !name) {
            setError('Toate câmpurile sunt obligatorii.');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Înregistrarea a eșuat.');
                return;
            }

            setSuccess('Contul a fost creat. Așteaptă aprobarea adminului.');
            setEmail('');
            setPassword('');
            setName('');

            // poți redirecționa după un timp sau rămâi pe pagina asta
            // setTimeout(() => router.push('/auth/login'), 3000);
        } catch (err) {
            setError('Eroare la server. Încearcă mai târziu.');
        }
    };

    return (
        <div style={containerStyle}>
            <h1>Register</h1>
            <form onSubmit={handleRegister} noValidate>
                <input
                    type="text"
                    placeholder="Nume complet"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    placeholder="Parolă"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={inputStyle}
                    minLength={6}
                    required
                />
                <button type="submit" style={buttonStyle}>Înregistrează-te</button>
            </form>

            {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}
        </div>
    );
}
