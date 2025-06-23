'use client'

import React, { useState } from 'react'
import Title from '@/components/Title'

const About: React.FC = () => {
    const [hoveredImg1, setHoveredImg1] = useState(false)
    const [hoveredImg2, setHoveredImg2] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    return (
        <div className="max-w-[75%] mx-auto px-6 py-12 font-poppins">
            {/* Titlu Secțiune */}
            <div className="text-center border-t border-gray-300 pt-6 mb-12 tracking-wide">
                <Title text1="CHI" text2="SIAMO" />
            </div>

            {/* Prima secțiune imagini + text */}
            <div className="flex flex-col md:flex-row md:gap-10 mb-14 items-center md:items-start">
                {/* Imagine */}
                <img
                    src="/about-img-1.jpg"
                    alt="Acquario"
                    className={`w-full max-w-[400px] rounded-xl shadow-lg object-cover cursor-pointer transition-transform duration-300 ease-in-out ${
                        hoveredImg1 ? 'scale-105' : 'scale-100'
                    }`}
                    onMouseEnter={() => setHoveredImg1(true)}
                    onMouseLeave={() => setHoveredImg1(false)}
                />

                {/* Text limitat la max 480px */}
                <div className="flex flex-col gap-4 max-w-[70%] flex-1 text-gray-700 px-4 md:px-0">
                    <b className="font-bold text-[1.4rem] leading-tight">
                        Benvenuti su VIDA • Piante – dove la natura acquatica prende vita!
                    </b>
                    <p className="text-lg leading-relaxed">
                        Siamo un’azienda appassionata della bellezza e dell’equilibrio degli ecosistemi acquatici.
                        Specializzati nella vendita di piante per acquari e laghetti, offriamo una selezione accurata di specie sane e adatte a qualsiasi tipo di ambiente.
                    </p>
                    <b className="flex items-center gap-2 font-extrabold text-green-600 text-lg">
                        <span>🌱</span> Qualità garantita
                    </b>
                    <p className="text-lg leading-relaxed text-gray-600">
                        Tutte le nostre piante sono coltivate e selezionate con attenzione per offrire vitalità e bellezza naturale all’habitat acquatico.
                    </p>
                </div>
            </div>

            {/* A doua secțiune imagini + text (inversat) */}
            <div className="flex flex-col md:flex-row-reverse md:gap-10 mb-14 items-center md:items-start">
                {/* Imagine */}
                <img
                    src="/about-img-2.jpg"
                    alt="Laghetto"
                    className={`w-full max-w-[400px] rounded-xl shadow-lg object-cover cursor-pointer transition-transform duration-300 ease-in-out ${
                        hoveredImg2 ? 'scale-105' : 'scale-100'
                    }`}
                    onMouseEnter={() => setHoveredImg2(true)}
                    onMouseLeave={() => setHoveredImg2(false)}
                />

                {/* Text limitat la max 480px */}
                <div className="flex flex-col gap-4 max-w-[70%] flex-1 text-gray-700 px-4 md:px-0">
                    <b className="flex items-center gap-2 font-extrabold text-orange-600 text-lg">
                        <span>🤝</span> Supporto personalizzato
                    </b>
                    <p className="text-lg leading-relaxed">
                        Il nostro team di esperti è a vostra disposizione per aiutarvi a scegliere le piante più adatte e per offrirvi consigli pratici sulla loro cura.
                    </p>
                    <b className="flex items-center gap-2 font-extrabold text-blue-600 text-lg">
                        <span>🌊</span> La nostra visione
                    </b>
                    <p className="text-lg leading-relaxed text-gray-600">
                        Crediamo che ogni acquario o laghetto sia un angolo di natura viva.
                        Il nostro obiettivo è ispirarvi a creare spazi acquatici belli, sani e pieni di vita.
                    </p>
                </div>
            </div>

            {/* Titlu secțiune */}
            <div className="text-left text-[1.5rem] mb-10">
                <Title text1="PERCHÉ" text2="SCEGLIERE NOI?" />
            </div>

            {/* Grid caracteristici */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mb-16">
                {[
                    {
                        icon: '🌱',
                        title: 'Crescente',
                        description:
                            'Coltiviamo in condizioni ottimali per offrirti piante splendide e un assortimento completo in ogni stagione.',
                    },
                    {
                        icon: '📦',
                        title: 'Imballaggi',
                        description:
                            'Imballaggi studiati per proteggere al meglio ogni pianta e prodotto, dalla nostra serra a casa tua.',
                    },
                    {
                        icon: '🚚',
                        title: 'Trasporto',
                        description:
                            'Consegniamo i nostri prodotti con i nostri mezzi per fornirvi un servizio veloce e affidabile.',
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`rounded-xl bg-white p-7 shadow-md flex flex-col items-center gap-4 cursor-pointer min-h-[230px] transition-shadow duration-300 ease-in-out ${
                            hoveredCard === i ? 'shadow-xl' : 'shadow-md'
                        }`}
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <span className="text-[2.5rem]">{item.icon}</span>
                        <b className="font-bold text-xl text-gray-900 text-center">{item.title}</b>
                        <p className="text-sm text-gray-600 text-center leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About
