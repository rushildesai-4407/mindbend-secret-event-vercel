import { RegistrationForm } from "@/components/RegistrationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <main className="w-full bg-[#050508] text-[#e0e0e0] font-montserrat min-h-screen overflow-x-hidden relative leading-[1.6]">
            {/* Background Image / Gradient for the Register page to match the vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,8,0.8),rgba(5,5,8,0.95)),url('/hero.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed opacity-40 mix-blend-overlay -z-20"></div>

            <div className="pt-24 pb-12 px-6 flex justify-center w-full z-10 relative">
                <div className="w-full max-w-6xl">
                    <Link href="/" className="inline-flex items-center text-white/50 hover:text-[#00f3ff] transition-colors mb-8 font-semibold tracking-widest text-sm uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Base
                    </Link>

                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-2 shadow-2xl">
                        <RegistrationForm />
                    </div>
                </div>
            </div>

            <footer className="text-center pt-12 px-6 pb-20 bg-[#020203]/80 backdrop-blur-md border-t border-[#1a1a24] mt-auto relative z-10">
                <h2 className="font-cinzel text-center text-[1.5rem] tracking-[3px] mb-4 text-[#666]">
                    52 BEFORE ZERO
                </h2>
                <p className="text-[0.8rem] text-[#888] mt-8">
                    &copy; 2026 52 Before Zero. All rights reserved.
                </p>
            </footer>
        </main>
    );
}
