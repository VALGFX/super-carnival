'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const res = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})

			if (!res.ok) {
				const data = await res.json()
				setError(data.message || 'Eroare la autentificare')
				setLoading(false)
				return
			}

			const data = await res.json()
			localStorage.setItem('adminToken', data.token)
			router.push('/admin')
		} catch {
			setError('Eroare neașteptată. Încearcă din nou.')
			setLoading(false)
		}
	}

	return (
		<div
			style={{
				maxWidth: 400,
				margin: '100px auto',
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
				padding: 20,
				border: '1px solid #ddd',
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
			}}
		>
			<h1 style={{ textAlign: 'center', marginBottom: 24, fontWeight: 600, color: '#222' }}>
				Login Admin
			</h1>
			<form
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
			>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					disabled={loading}
					style={{
						padding: 10,
						fontSize: 16,
						borderRadius: 6,
						border: '1px solid #ccc',
						outline: 'none',
						transition: 'border-color 0.2s ease',
					}}
					onFocus={e => (e.currentTarget.style.borderColor = '#2ecc71')}
					onBlur={e => (e.currentTarget.style.borderColor = '#ccc')}
				/>
				<input
					type="password"
					placeholder="Parolă"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					disabled={loading}
					style={{
						padding: 10,
						fontSize: 16,
						borderRadius: 6,
						border: '1px solid #ccc',
						outline: 'none',
						transition: 'border-color 0.2s ease',
					}}
					onFocus={e => (e.currentTarget.style.borderColor = '#2ecc71')}
					onBlur={e => (e.currentTarget.style.borderColor = '#ccc')}
				/>
				<button
					type="submit"
					disabled={loading}
					style={{
						padding: 12,
						backgroundColor: loading ? '#27ae60cc' : '#2ecc71',
						border: 'none',
						borderRadius: 6,
						color: 'white',
						fontWeight: 700,
						fontSize: 16,
						cursor: loading ? 'not-allowed' : 'pointer',
						transition: 'background-color 0.2s ease',
					}}
					onMouseEnter={e => {
						if (!loading) e.currentTarget.style.backgroundColor = '#27ae60';
					}}
					onMouseLeave={e => {
						if (!loading) e.currentTarget.style.backgroundColor = '#2ecc71';
					}}
				>
					{loading ? 'Se autentifică...' : 'Autentifică-te'}
				</button>
				{error && (
					<p style={{ color: '#e74c3c', marginTop: 8, fontWeight: '500', textAlign: 'center' }}>
						{error}
					</p>
				)}
			</form>
		</div>
	)
}
