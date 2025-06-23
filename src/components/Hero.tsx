'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Hero: React.FC = () => {
    const [hoverPrimary, setHoverPrimary] = useState(false)
    const [hoverSecondary, setHoverSecondary] = useState(false)

    return (
        <div className="hero-container">
            {/* Text Section */}
            <div className="hero-text">
                <h1 className="hero-headline">
                    Prodotti e soluzioni complete<br />
                    per il vostro acquario da sogno
                </h1>
                <p className="hero-paragraph">
                    Esplora la nostra selezione di prodotti di qualità, beneficia di prezzi
                    speciali dopo il login e comunica direttamente in chat con il nostro team.
                </p>
                <div className="hero-buttons">
                    <Link href="/products">
                        <div
                            className="primary-button"
                            onMouseEnter={() => setHoverPrimary(true)}
                            onMouseLeave={() => setHoverPrimary(false)}
                            style={{
                                backgroundColor: hoverPrimary ? '#111' : '#000',
                            }}
                        >
                            Vedi i prodotti
                        </div>
                    </Link>
                    <Link href="/about">
                        <div
                            className="secondary-button"
                            onMouseEnter={() => setHoverSecondary(true)}
                            onMouseLeave={() => setHoverSecondary(false)}
                            style={{
                                backgroundColor: hoverSecondary ? '#f3f4f6' : 'transparent',
                            }}
                        >
                            Scopri di più
                            <Image
                                src="/icons/arrow-up-line.svg"
                                alt="Arrow"
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Image Section */}
            <div className="hero-image-wrapper">
                <Image
                    src="/home-hero.jpg"
                    alt="Acquario"
                    width={580}
                    height={500}
                    className="hero-image"
                    priority
                />
            </div>

            <style jsx>{`
                .hero-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 80%;
                    margin: 40px auto;
                    padding: 0 1rem;
                }

                .hero-text {
                    text-align: center;
                    max-width: 700px;
                    order: 2;
                }

                .hero-image-wrapper {
                    width: 100%;
                    max-width: 600px;
                    margin-bottom: 2rem;
                    order: 1;
                }

                .hero-image {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 20px;
                }

                .hero-headline {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #111827;
                    line-height: 1.3;
                    margin-bottom: 1rem;
                }

                .hero-paragraph {
                    color: #4B5563;
                    font-size: 1.05rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .hero-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    align-items: center;
                }

                .primary-button,
                .secondary-button {
                    padding: 14px 26px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .primary-button {
                    background-color: #000;
                    color: #fff;
                }

                .secondary-button {
                    border: 2px solid #000;
                    color: #000;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                /* --- Tablet & Desktop --- */
                @media (min-width: 768px) {
                    .hero-container {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        gap: 40px;
                        margin: 80px auto;
                    }

                    .hero-text {
                        text-align: left;
                        max-width: 50%;
                        order: 1;
                    }

                    .hero-image-wrapper {
                        order: 2;
                        margin-bottom: 0;
                    }

                    .hero-buttons {
                        flex-direction: row;
                        justify-content: flex-start;
                    }

                    .hero-headline {
                        font-size: 2.5rem;
                    }

                    .hero-paragraph {
                        font-size: 1.125rem;
                    }
                }

                /* --- Small phones --- */
                @media (max-width: 480px) {
                    .hero-headline {
                        font-size: 1.5rem;
                    }

                    .hero-paragraph {
                        font-size: 0.95rem;
                    }

                    .primary-button,
                    .secondary-button {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    )
}

export default Hero