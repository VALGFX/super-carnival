'use client';

import { useState, FormEvent, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

const backgroundStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'url("/mountains.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -2,
};

const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(35, 36, 58, 0.85)',
    backdropFilter: 'blur(1px)',
    zIndex: -1,
};

const containerStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'white',
};

const cardStyle: CSSProperties = {
    width: '100%',
    maxWidth: '600px',
    minHeight: '400px',
    borderRadius: '24px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.7)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#1E1E1E',
    zIndex: 2,
    cursor: 'default',
};

const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    color: 'white',
};

const headerSmallStyle: CSSProperties = {
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#9ca3af',
    marginBottom: '0.5rem',
    fontWeight: 600,
};

const headerBigStyle: CSSProperties = {
    fontSize: '2rem',
    fontWeight: '900',
    marginBottom: '1rem',
    lineHeight: 1.1,
    userSelect: 'none',
};

const blueDotStyle: CSSProperties = {
    color: '#27ae60B6',
    userSelect: 'none',
};

const paragraphStyle: CSSProperties = {
    fontSize: '0.9rem',
    color: '#a1a5b8',
    marginBottom: '1.8rem',
};

const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexGrow: 1,
    justifyContent: 'center',
};

const inputWrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
};

const iconStyle: CSSProperties = {
    position: 'absolute',
    left: '12px',
    width: '18px',
    height: '18px',
    fill: '#27ae60',
    pointerEvents: 'none',
};

const inputStyle: CSSProperties = {
    backgroundColor: 'rgba(46, 50, 77, 0.85)',
    color: 'white',
    padding: '0.55rem 1rem 0.55rem 2.5rem',
    borderRadius: '14px',
    border: '1.5px solid transparent',
    outline: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    flexGrow: 1,
    transition: 'border-color 0.3s, background-color 0.3s',
    height: '38px',
};

const inputFocusStyle: CSSProperties = {
    borderColor: '#27ae60',
    backgroundColor: 'rgba(57, 68, 99, 0.9)',
};

const buttonsContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
};

const buttonGrayStyle: CSSProperties = {
    backgroundColor: '#5a5f7a',
    color: 'white',
    borderRadius: '18px',
    padding: '0.9rem 1.5rem',
    flexGrow: 1,
    cursor: 'pointer',
    border: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.15s',
};

const buttonBlueStyle: CSSProperties = {
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '18px',
    padding: '0.9rem 1.5rem',
    flexGrow: 1,
    cursor: 'pointer',
    border: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.15s',
};

const icons = {
    email: (
        <svg style={iconStyle} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16z" />
        </svg>
    ),
    password: (
        <svg style={iconStyle} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6h-1V7a5 5 0 10-10 0v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />
        </svg>
    ),
};

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Eroare la autentificare');
                setLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            router.push('/dashboard'); // Redirecționează la dashboard
        } catch {
            setError('Eroare neașteptată. Încearcă din nou.');
            setLoading(false);
        }
    };

    return (
        <>
            <div style={backgroundStyle} aria-hidden="true" />
            <div style={overlayStyle} aria-hidden="true" />
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <div style={contentStyle}>
                        <h3 style={headerSmallStyle}>Benvenuti a</h3>
                        <h1 style={headerBigStyle}>
                            The <span style={blueDotStyle}>VIDA-S Plante </span> Login
                        </h1>
                        <p style={paragraphStyle}>Accedi al tuo account per continuare.</p>

                        <form style={formStyle} onSubmit={handleSubmit} noValidate>
                            <div style={inputWrapperStyle}>
                                {icons.email}
                                <input
                                    type="email"
                                    name="email"
                                    aria-label="Email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                    style={{
                                        ...inputStyle,
                                        ...(focusedInput === 'email' ? inputFocusStyle : {}),
                                    }}
                                    required
                                />
                            </div>

                            <div style={inputWrapperStyle}>
                                {icons.password}
                                <input
                                    type="password"
                                    name="password"
                                    aria-label="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={() => setFocusedInput('password')}
                                    onBlur={() => setFocusedInput(null)}
                                    style={{
                                        ...inputStyle,
                                        ...(focusedInput === 'password' ? inputFocusStyle : {}),
                                    }}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div style={buttonsContainerStyle}>
                                <button
                                    type="button"
                                    style={buttonGrayStyle}
                                    onClick={() => router.push('/auth/register')}
                                    disabled={loading}
                                >
                                    Registration
                                </button>
                                <button type="submit" style={buttonBlueStyle} disabled={loading}>
                                    {loading ? 'Se autentifică...' : 'Log In'}
                                </button>
                            </div>
                            {error && (
                                <p
                                    style={{
                                        color: '#e74c3c',
                                        marginTop: 8,
                                        fontWeight: '500',
                                        textAlign: 'center',
                                    }}
                                >
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
