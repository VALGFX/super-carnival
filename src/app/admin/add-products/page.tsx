'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = ['Acquario', 'Stagni'];
const types = ['Estivo', 'Invernale'];

export default function AddProductPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [type, setType] = useState(types[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name.trim()) {
            setError('Te rog să introduci numele produsului.');
            setLoading(false);
            return;
        }

        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            setError('Te rog să introduci un preț valid.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setError('Nu ești autentificat.');
                setLoading(false);
                return;
            }

            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name.trim(),
                    price: Number(price),
                    description: description.trim(),
                    imageUrl: imageUrl.trim(),
                    category,
                    type,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Eroare la adăugarea produsului.');
                setLoading(false);
                return;
            }

            // Reset formular după succes
            setName('');
            setPrice('');
            setDescription('');
            setImageUrl('');
            setCategory(categories[0]);
            setType(types[0]);

            alert('Produs adăugat cu succes!');
            setLoading(false);

            // Dacă vrei, poți redirecta adminul altundeva
            // router.push('/admin');

        } catch (err) {
            setError('Eroare neașteptată.');
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Adaugă produs nou</h1>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Nume produs"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={loading}
                />

                <input
                    type="number"
                    placeholder="Preț (ex: 100)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    style={{ padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={loading}
                />

                <textarea
                    placeholder="Descriere"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    style={{ padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={loading}
                />

                <input
                    type="text"
                    placeholder="URL imagine"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    style={{ padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={loading}
                />

                <label>
                    Categorie:
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{ marginLeft: 8, padding: 6, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                        disabled={loading}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Tip:
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        style={{ marginLeft: 8, padding: 6, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
                        disabled={loading}
                    >
                        {types.map(t => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: 10,
                        backgroundColor: '#2ecc71',
                        border: 'none',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 16,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginTop: 12,
                    }}
                >
                    {loading ? 'Se adaugă...' : 'Adaugă produs'}
                </button>

                {error && (
                    <p style={{ color: '#e74c3c', marginTop: 10, fontWeight: '600' }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
