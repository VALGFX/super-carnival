'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboardRealtime() {
	const [data, setData] = useState({
		totalUsers: 0,
		pendingApprovals: 0,
		activeSessions: 0,
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchData = async () => {
		try {
			const res = await fetch('/api/admin/stats')
			if (!res.ok) throw new Error('Failed to fetch')
			const json = await res.json()

			setData({
				totalUsers: json.totalUsers ?? 0,
				pendingApprovals: json.pendingApprovals ?? 0,
				activeSessions: json.activeSessions ?? 0,
			})
			setLoading(false)
			setError('')
		} catch (err) {
			console.error(err)
			setError('Eroare la încărcarea datelor.')
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
		const interval = setInterval(fetchData, 5000)
		return () => clearInterval(interval)
	}, [])

	if (loading)
		return (
			<p
				style={{
					textAlign: 'center',
					marginTop: '4rem',
					color: '#555',
					fontSize: '1.2rem',
				}}
			>
				Se încarcă...
			</p>
		)
	if (error)
		return (
			<p
				style={{
					textAlign: 'center',
					color: '#e74c3c',
					marginTop: '4rem',
					fontSize: '1.2rem',
				}}
			>
				{error}
			</p>
		)

	return (
		<div
			style={{
				maxWidth: 720,
				margin: '3rem auto',
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
				color: '#222',
				padding: '0 1rem',
			}}
		>
			<h1
				style={{
					textAlign: 'center',
					marginBottom: '2.5rem',
					fontWeight: '700',
					fontSize: '2.2rem',
					borderBottom: '2px solid #27ae60',
					paddingBottom: '0.5rem',
					userSelect: 'none',
				}}
			>
				Admin Dashboard
			</h1>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '1.5rem',
					flexWrap: 'wrap',
				}}
			>
				{[
					{
						label: 'Utilizatori înregistrați',
						value: data.totalUsers,
						color: '#27ae60',
					},
					{
						label: 'Cereri în așteptare',
						value: data.pendingApprovals,
						color: '#f39c12',
					},
					{
						label: 'Sesiuni active',
						value: data.activeSessions,
						color: '#2980b9',
					},
				].map(({ label, value, color }) => (
					<div
						key={label}
						style={{
							flex: '1 1 200px',
							backgroundColor: '#fff',
							borderRadius: 12,
							boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
							padding: '1.5rem 2rem',
							textAlign: 'center',
							cursor: 'default',
							transition: 'transform 0.2s ease',
						}}
						onMouseEnter={e =>
							(e.currentTarget.style.transform = 'scale(1.05)')
						}
						onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
					>
						<p
							style={{
								fontSize: '2.8rem',
								fontWeight: '700',
								margin: 0,
								color: color,
								userSelect: 'none',
								fontVariantNumeric: 'tabular-nums',
							}}
						>
							{value}
						</p>
						<p
							style={{
								marginTop: 6,
								fontSize: '1.1rem',
								fontWeight: '600',
								color: '#444',
								userSelect: 'none',
							}}
						>
							{label}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
