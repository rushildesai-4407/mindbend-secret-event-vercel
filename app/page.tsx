import { Hero } from "@/components/Hero";
import { CountdownTimer } from "@/components/CountdownTimer";
import { AboutGame } from "@/components/AboutGame";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary-500/30">
      <div className="mx-auto max-w-7xl relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <Hero />
          <div className="-mt-16 sm:-mt-24 mb-16 w-full flex justify-center">
            <CountdownTimer />
          </div>
          <AboutGame />
          <RegistrationForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 text-center bg-black relative z-10">
        <p className="text-xs text-neutral-600 uppercase tracking-widest">
          SYSTEM_OVERRIDE_ACTIVE // NO_RECORDS_FOUND
        </p>
      </footer>
    </main>
  );
}
