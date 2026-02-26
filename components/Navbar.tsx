import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-neutral-900">
            <Link href="/" className="text-primary-500 tracking-widest font-bold text-xl glitch" data-text="52BZ">
                52BZ
            </Link>
            <div className="space-x-6 text-sm font-medium">
                <a href="/#about" className="text-neutral-300 hover:text-primary-500 transition-colors">
                    Protocol
                </a>
                <Link href="/login" className="text-neutral-300 hover:text-blue-400 transition-colors">
                    Login
                </Link>
            </div>
        </nav>
    );
}
