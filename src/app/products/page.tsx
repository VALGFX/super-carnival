'use client'

import ProductItem from '@/components/ProductItem'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Product {
	id: string
	name: string
	category: string
	type: string
	price: number
	image?: string
}

type SortType = 'relevant' | 'low-high' | 'high-low'

const Collection: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [filterCategory, setFilterCategory] = useState<string[]>([])
	const [filterType, setFilterType] = useState<string[]>([])
	const [sort, setSort] = useState<SortType>('relevant')
	const [openCategory, setOpenCategory] = useState(true)
	const [openType, setOpenType] = useState(true)
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

	// Încarcă produsele din API
	useEffect(() => {
		async function fetchProducts() {
			setLoading(true)
			setError('')
			try {
				const res = await fetch('/api/products')
				if (!res.ok) throw new Error('Eroare la încărcarea produselor')
				const data = await res.json()
				// Asum că datele au forma [{ id, name, category, type, price, image }]
				setProducts(Array.isArray(data) ? data : data.products ?? [])
			} catch (err) {
				setError((err as Error).message || 'Eroare neașteptată')
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [])

	// Aplica filtre și sortare când se schimbă produsele sau filtrele
	useEffect(() => {
		let result = products

		if (filterCategory.length > 0) {
			result = result.filter(product =>
				filterCategory.includes(product.category)
			)
		}
		if (filterType.length > 0) {
			result = result.filter(product => filterType.includes(product.type))
		}

		if (sort === 'low-high') {
			result = [...result].sort((a, b) => a.price - b.price)
		} else if (sort === 'high-low') {
			result = [...result].sort((a, b) => b.price - a.price)
		}

		setFilteredProducts(result)
	}, [products, filterCategory, filterType, sort])

	// Handlere filtre
	const handleFilterCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = event.target
		setFilterCategory(prev =>
			checked ? [...prev, value] : prev.filter(c => c !== value)
		)
	}

	const handleFilterTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = event.target
		setFilterType(prev =>
			checked ? [...prev, value] : prev.filter(t => t !== value)
		)
	}

	const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSort(event.target.value as SortType)
	}

	if (loading)
		return (
			<p style={{ textAlign: 'center', marginTop: 40 }}>
				Se încarcă produsele...
			</p>
		)

	if (error)
		return (
			<p
				style={{
					color: '#e74c3c',
					backgroundColor: '#fdecea',
					padding: 10,
					maxWidth: 600,
					margin: '40px auto',
					borderRadius: 6,
					textAlign: 'center',
				}}
			>
				{error}
			</p>
		)

	return (
		<>
			<div className='container'>
				<aside className='filters-sidebar'>
					<div className='filter-box'>
						<h2 className='filter-title'>
							<button
								className='filter-toggle'
								onClick={() => setOpenCategory(!openCategory)}
								aria-expanded={openCategory}
								aria-controls='category-filter'
							>
								Categorii{' '}
								<img
									src='/icons/arrow-up.svg'
									alt={openCategory ? 'Arrow up' : 'Arrow right'}
									className={openCategory ? 'arrow open' : 'arrow'}
									style={{
										width: '16px',
										height: '16px',
										transition: 'transform 0.3s ease',
									}}
								/>
							</button>
						</h2>
						<div
							id='category-filter'
							className={`checkbox-group ${openCategory ? 'open' : ''}`}
						>
							<label className='checkbox-label'>
								<input
									type='checkbox'
									value='Acquario'
									onChange={handleFilterCategoryChange}
									checked={filterCategory.includes('Acquario')}
								/>
								Acquario
							</label>
							<label className='checkbox-label'>
								<input
									type='checkbox'
									value='Stagni'
									onChange={handleFilterCategoryChange}
									checked={filterCategory.includes('Stagni')}
								/>
								Stagni
							</label>
						</div>

						<h2 className='filter-title'>
							<button
								className='filter-toggle'
								onClick={() => setOpenType(!openType)}
								aria-expanded={openType}
								aria-controls='type-filter'
							>
								Tipuri{' '}
								<img
									src='/icons/arrow-up.svg'
									alt={openType ? 'Arrow up' : 'Arrow right'}
									className={openType ? 'arrow open' : 'arrow'}
									style={{
										width: '16px',
										height: '16px',
										transition: 'transform 0.3s ease',
									}}
								/>
							</button>
						</h2>
						<div
							id='type-filter'
							className={`checkbox-group ${openType ? 'open' : ''}`}
						>
							<label className='checkbox-label'>
								<input
									type='checkbox'
									value='Estivo'
									onChange={handleFilterTypeChange}
									checked={filterType.includes('Estivo')}
								/>
								Estivo
							</label>
							<label className='checkbox-label'>
								<input
									type='checkbox'
									value='Invernale'
									onChange={handleFilterTypeChange}
									checked={filterType.includes('Invernale')}
								/>
								Invernale
							</label>
						</div>
					</div>
				</aside>

				<main className='content'>
					<div className='catalog-box'>
						<div className='header'>
							<h1 className='title'>Catalog Produse</h1>
							<select
								className='sort-select'
								value={sort}
								onChange={handleSortChange}
							>
								<option value='relevant'>Relevanță</option>
								<option value='low-high'>Preț: Mic → Mare</option>
								<option value='high-low'>Preț: Mare → Mic</option>
							</select>
						</div>

						<div className='product-grid'>
							{filteredProducts.length > 0 ? (
								filteredProducts.map(product => (
									<ProductItem
										key={product.id}
										item={{
											id: product.id,
											name: product.name,
											image: product.image ? [product.image] : [],
											price: product.price,
											category: product.category,
											type: product.type,
										}}
										isFavorite={false} // aici poți integra logica favorite dacă vrei
										onToggleFavorite={() => {}} // idem
									/>
								))
							) : (
								<p className='empty-message'>
									Nu există produse care să corespundă filtrelor.
								</p>
							)}
						</div>
					</div>
				</main>
			</div>

			{/* CSS din Collection */}
			<style jsx>{`
				.container {
					display: flex;
					flex-direction: column;
					padding: 16px;
				}
				.filters-sidebar {
					margin-bottom: 20px;
				}
				.filter-box {
					border: 1px solid #ddd;
					padding: 16px;
					border-radius: 8px;
				}
				.filter-title {
					margin: 0 0 8px;
					font-size: 1.2rem;
				}
				.filter-toggle {
					background: none;
					border: none;
					font-weight: 600;
					cursor: pointer;
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 0;
				}
				.arrow {
					transition: transform 0.3s ease;
				}
				.arrow.open {
					transform: rotate(180deg);
				}
				.checkbox-group {
					max-height: 0;
					overflow: hidden;
					transition: max-height 0.3s ease;
					margin-bottom: 16px;
				}
				.checkbox-group.open {
					max-height: 500px;
				}
				.checkbox-label {
					display: flex;
					align-items: center;
					gap: 8px;
					margin-bottom: 8px;
					cursor: pointer;
					font-weight: 400;
				}
				.content {
					width: 100%;
				}
				.catalog-box {
					margin-top: 16px;
				}
				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 16px;
				}
				.title {
					margin: 0;
					font-size: 1.5rem;
					font-weight: 700;
				}
				.sort-select {
					padding: 6px 12px;
					font-size: 1rem;
					border-radius: 4px;
					border: 1px solid #ccc;
					cursor: pointer;
				}
				.product-grid {
					display: grid;
					gap: 24px;
					grid-template-columns: 1fr;
				}
				.empty-message {
					font-style: italic;
					color: #666;
				}

				@media (min-width: 640px) {
					.container {
						flex-direction: row;
					}
					.filters-sidebar {
						width: 220px;
						margin-right: 20px;
						margin-bottom: 0;
					}
					.content {
						flex-grow: 1;
					}
					.product-grid {
						grid-template-columns: repeat(2, 1fr);
					}
				}

				@media (min-width: 1024px) {
					.product-grid {
						grid-template-columns: repeat(3, 1fr);
					}
				}
			`}</style>
		</>
	)
}

export default Collection
