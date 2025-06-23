'use client'

import { useEffect, useState } from 'react'

interface Product {
	_id: string
	name: string
	price: number
	imageUrl?: string
}

export default function AdminPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [deletingId, setDeletingId] = useState<string | null>(null)

	// Încarcă produsele la mount
	useEffect(() => {
		async function fetchProducts() {
			setLoading(true)
			setError('')
			try {
				const res = await fetch('/api/products')
				if (!res.ok) throw new Error('Eroare la încărcarea produselor')
				const data = await res.json()
				setProducts(Array.isArray(data) ? data : data.products ?? [])
			} catch (err) {
				setError((err as Error).message || 'Eroare neașteptată')
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [])

	// Șterge produsul după id
	const handleDelete = async (id: string) => {
		if (!confirm('Ești sigur că vrei să ștergi acest produs?')) return

		setDeletingId(id)
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: 'DELETE',
			})
			if (!res.ok) throw new Error('Eroare la ștergerea produsului')
			setProducts(products.filter(product => product._id !== id))
		} catch (error) {
			alert((error as Error).message || 'Eroare neașteptată')
		} finally {
			setDeletingId(null)
		}
	}

	if (loading) return <p>Se încarcă produsele...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div
			style={{
				maxWidth: 900,
				margin: '40px auto',
				padding: 20,
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
			}}
		>
			<h1 style={{ textAlign: 'center', marginBottom: 30 }}>
				Admin Panel - Gestionare Produse
			</h1>
			{products.length === 0 ? (
				<p>Nu există produse în baza de date.</p>
			) : (
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							<th
								style={{
									borderBottom: '1px solid #ccc',
									padding: 10,
									textAlign: 'left',
								}}
							>
								Nume
							</th>
							<th
								style={{
									borderBottom: '1px solid #ccc',
									padding: 10,
									textAlign: 'left',
								}}
							>
								Preț
							</th>
							<th style={{ borderBottom: '1px solid #ccc', padding: 10 }}>
								Acțiuni
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map(({ _id, name, price }) => (
							<tr key={_id}>
								<td style={{ padding: 10 }}>{name}</td>
								<td style={{ padding: 10 }}>${price.toFixed(2)}</td>
								<td style={{ padding: 10, textAlign: 'center' }}>
									<button
										onClick={() => handleDelete(_id)}
										disabled={deletingId === _id}
										style={{
											backgroundColor: '#e74c3c',
											color: 'white',
											border: 'none',
											borderRadius: 4,
											padding: '6px 12px',
											cursor: 'pointer',
										}}
									>
										{deletingId === _id ? 'Ștergere...' : 'Șterge'}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
