"use client";

export function AboutGame() {
    return (
        <div className="w-full">
            <section id="about" className="py-16 px-6 max-w-full">
                <h2 className="font-cinzel text-[2rem] mb-8 relative pb-2.5 text-center text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,243,255,0.5)] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[2px] after:bg-[linear-gradient(90deg,transparent,#00f3ff,transparent)]">
                    What is 52 Before Zero?
                </h2>
                <p className="text-center text-[1rem] text-[#b3b3b3] max-w-3xl mx-auto">
                    Enter a three-day survival hierarchy where strategic progression is everything. In this arena, logic intersects with trust, and authority slowly spirals into chaos.
                </p>
                <ul className="list-none mt-6 text-center">
                    <li className="mb-3 font-semibold text-[#e0e0e0]"><span className="text-[#00f3ff] mr-2">/</span> Competitive Filtration</li>
                    <li className="mb-3 font-semibold text-[#e0e0e0]"><span className="text-[#00f3ff] mr-2">/</span> Trust & Chaos</li>
                    <li className="mb-3 font-semibold text-[#e0e0e0]"><span className="text-[#00f3ff] mr-2">/</span> Immersive Authority</li>
                </ul>
            </section>

            {/* <div className="w-full h-[250px] border-t border-[rgba(157,0,255,0.3)] border-b border-[rgba(0,243,255,0.3)] overflow-hidden relative my-8">
                <img src="/photo1.jpeg" alt="The Arena" className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.2]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,8,1)_0%,rgba(5,5,8,0)_20%,rgba(5,5,8,0)_80%,rgba(5,5,8,1)_100%)]"></div>
            </div> */}

            <section id="days" className="flex flex-col gap-8 pt-12 mx-auto px-6 max-w-7xl">
                {/* Phase 01 Card */}
                <div className="rounded-xl p-[1px] bg-gradient-to-b from-[rgba(157,0,255,0.6)] to-[rgba(0,243,255,0.2)]">
                    <div className="h-full w-full bg-[linear-gradient(145deg,#0a0a0f,#11111a)] rounded-xl py-8 px-6">
                        <span className="font-montserrat text-[0.8rem] uppercase tracking-[2px] text-[#9d00ff] mb-2 block">Phase 01</span>
                        <h3 className="font-cinzel text-[1.6rem] mb-4 text-left text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,243,255,0.5)]">Number Trials</h3>
                        <p className="text-[#cccccc] text-[0.95rem]">Cards 2–10 govern this phase. Survival demands intellect and speed to conquer the logical elimination system.</p>
                        <ul className="list-none pl-0 mt-4">
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">4 Distinct Zones (♠ ♥ ♦ ♣)</li>
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">QR-based Cryptic Riddles</li>
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">Time-Bound Retrieval Tasks</li>
                        </ul>
                    </div>
                </div>

                {/* Phase 02 Card */}
                <div className="rounded-xl p-[1px] bg-gradient-to-b from-[rgba(157,0,255,0.6)] to-[rgba(0,243,255,0.2)]">
                    <div className="h-full w-full bg-[linear-gradient(145deg,#0a0a0f,#11111a)] rounded-xl py-8 px-6">
                        <span className="font-montserrat text-[0.8rem] uppercase tracking-[2px] text-[#9d00ff] mb-2 block">Phase 02</span>
                        <h3 className="font-cinzel text-[1.6rem] mb-4 text-left text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,243,255,0.5)]">Shadow Collapse</h3>
                        <p className="text-[#cccccc] text-[0.95rem]">The rules distort. Psychological gameplay takes center stage as trust instability shatters alliances.</p>
                        <ul className="list-none pl-0 mt-4">
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">Hidden Operatives deployed</li>
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">Strategy & active deception required</li>
                            <li className="relative pl-6 mb-3 text-[0.95rem] text-[#cccccc] before:content-['⬩'] before:absolute before:left-0 before:text-[#00f3ff] before:text-[1rem] before:leading-[1.5]">Admin-controlled visibility shifts</li>
                        </ul>
                    </div>
                </div>

                {/* Final Phase Card */}
                <div className="rounded-xl p-[1px] bg-gradient-to-b from-[rgba(157,0,255,0.6)] to-[rgba(0,243,255,0.2)] border-b-2 border-[#00f3ff]">
                    <div className="h-full w-full bg-[linear-gradient(145deg,#0a0a0f,#11111a)] rounded-xl py-8 px-6">
                        <span className="font-montserrat text-[0.8rem] uppercase tracking-[2px] text-[#9d00ff] mb-2 block">Final Phase</span>
                        <h3 className="font-cinzel text-[1.6rem] mb-4 text-left text-[#00f3ff] [text-shadow:0_0_10px_rgba(0,243,255,0.5)]">The Sovereign Reckoning</h3>
                        <p className="text-[#cccccc] text-[0.95rem]">Only the strongest remain. The final filtration leaves only King and Joker rounds.</p>

                        <div className="bg-[rgba(157,0,255,0.05)] border-l-2 border-[#00f3ff] p-4 mt-6">
                            <h4 className="font-cinzel text-white text-[1.1rem] mb-2 tracking-[1px]">♔ KING ROUND</h4>
                            <p className="text-[0.9rem] text-[#b3b3b3] mb-4">The ultimate authority trial. Prove speed dominance under crushing, high-pressure environments.</p>

                            <h4 className="font-cinzel text-white text-[1.1rem] mb-2 tracking-[1px]">🃏 JOKER ROUND</h4>
                            <p className="text-[0.9rem] text-[#b3b3b3]">The final unpredictable twist. Total rule collapse leading to an intense public climax.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="command" className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMXY0MEgweiIgZmlsbD0icmdiYSgwLCAyNDMsIDI1NSwgMC4wNSkiLz48cGF0aCBkPSJNMCAwaDQwdjFIMHoiIGZpbGw9InJnYmEoMCwgMjQzLCAyNTUsIDAuMDUpIi8+PC9zdmc+')] border-y border-[rgba(0,243,255,0.2)] py-12 px-6 my-16 w-full">
                <h2 className="font-cinzel text-[2rem] mb-8 relative pb-2.5 text-center text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,243,255,0.5)] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[2px] after:bg-[linear-gradient(90deg,transparent,#00f3ff,transparent)]">
                    Command & Control
                </h2>
                <div className="bg-[rgba(5,5,8,0.9)] border border-[#333] rounded-md p-6 font-mono text-[#00f3ff] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] text-left max-w-7xl mx-auto">
                    <ul className="list-none m-0 p-0">
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Accessing Admin Dashboard...</li>
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Unlocking Protocols: Day 2 & Day 3</li>
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Assigning Operative Roles</li>
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Designating ♠ ♥ ♦ ♣ Zones</li>
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Monitoring Team Vitals</li>
                        <li className="mb-3 flex items-center before:content-['>'] before:text-[#9d00ff] before:mr-2.5 before:font-bold">Awaiting Instruction Update...</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
