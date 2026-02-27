"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== "undefined") {
                const currentScrollY = window.scrollY;

                // Trigger glassmorphism background after scrolling down slightly
                setScrolled(currentScrollY > 20);

                // Hide on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 80) {
                    setShowNav(false);
                    setIsOpen(false); // Close mobile menu if open while scrolling
                } else {
                    setShowNav(true);
                }

                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    if (pathname !== "/") return null;

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${showNav ? "translate-y-0" : "-translate-y-full"}
      ${scrolled
                    ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4"
                    : "bg-gradient-to-b from-black/60 to-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="group relative flex items-center gap-2"
                >
                    <span className="font-cinzel text-white tracking-[4px] font-bold text-lg md:text-xl transition-all duration-300">
                        52 BEFORE ZERO
                    </span>
                    {/* Refined, softer glow that tracks with the text */}
                    <span className="absolute -inset-1 blur-xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-cyan-400 to-purple-500 transition-opacity duration-500 rounded-full z-[-1]"></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-xs tracking-[2px] uppercase font-semibold">
                    <Link
                        href="/register"
                        className="relative text-neutral-300 hover:text-white transition-colors duration-300 group py-2"
                    >
                        Register
                        {/* Smooth underline animation */}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    <Link
                        href="/login"
                        className="relative overflow-hidden rounded-full px-6 py-2.5 text-neutral-200 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    >
                        <span className="relative z-10">Login</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                    className="md:hidden relative z-50 flex w-8 h-8 flex-col items-center justify-center gap-[5px]"
                >
                    <span
                        className={`w-6 h-[1.5px] bg-neutral-200 rounded-full transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[1.5px] bg-neutral-200 rounded-full transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`w-6 h-[1.5px] bg-neutral-200 rounded-full transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top
        ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
        bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl`}
            >
                <div className="flex flex-col items-center justify-center py-8 space-y-6 text-sm tracking-[3px] uppercase">
                    <Link
                        href="/register"
                        className="text-neutral-300 hover:text-white transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Register
                    </Link>

                    <Link
                        href="/login"
                        className="px-8 py-3 w-3/4 max-w-xs text-center border border-purple-500/30 text-white rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}