"use client";

import { useEffect, useState } from "react";

const suits = ["♠", "♥", "♦", "♣"];

export function FloatingCards() {
    const [cards, setCards] = useState<{ id: number; suit: string; left: string; duration: string }[]>([]);

    useEffect(() => {
        const newCards = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            suit: suits[Math.floor(Math.random() * 4)],
            left: `${Math.random() * 100}vw`,
            duration: `${10 + Math.random() * 20}s`,
        }));
        setCards(newCards);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="card-particle"
                    style={{
                        left: card.left,
                        animationDuration: card.duration,
                    }}
                >
                    {card.suit}
                </div>
            ))}
        </div>
    );
}
