import { RegistrationForm } from "@/components/RegistrationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <main className="w-full min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden bg-[#050508]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full z-0 pointer-events-none" />

            <div className="w-full max-w-[700px] z-10">
                <div className="mb-6 pl-2">
                    <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white transition font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>

                <RegistrationForm />
            </div>
        </main>
    );
}
