'use client';

import React from 'react';

interface ProductItemProps {
    item: {
        id: string;
        name: string;
        category?: string;
        type?: string;
        price: number;
        image?: string[];
    };
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, isFavorite, onToggleFavorite }) => {
    return (
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 cursor-pointer max-w-sm mx-auto">
            <div className="w-full h-64 overflow-hidden rounded-t-2xl bg-gray-50 relative">
                <img
                    src={item.image && item.image.length > 0 ? item.image[0] : '/images/default.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                    }}
                    aria-label={isFavorite ? 'Scoate din favorite' : 'Adaugă la favorite'}
                    className="absolute top-3 right-3  rounded-full p-1 shadow hover:shadow-md transition"
                    type="button"
                >
                    {isFavorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-red-500" viewBox="0 0 24 24" stroke="none">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductItem;
