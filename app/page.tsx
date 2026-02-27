"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AboutGame } from "@/components/AboutGame";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Attempt to play on load (browsers usually block unmuted autoplay)
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay requires user interaction.'));
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.muted || audioRef.current.paused) {
        audioRef.current.muted = false;
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio id="bgMusic" ref={audioRef} src="/theme.mp4" loop muted></audio>
      <button
        id="musicToggle"
        className="music-btn"
        aria-label="Toggle Music"
        onClick={toggleMusic}
        style={{
          borderColor: !isMuted ? '#00f3ff' : '#9d00ff',
          color: !isMuted ? '#00f3ff' : '#fff',
          boxShadow: !isMuted ? '0 0 15px rgba(0, 243, 255, 0.5)' : '0 0 10px rgba(157, 0, 255, 0.4)'
        }}
      >
        {!isMuted ? '🔊' : '🔈'}
      </button>

      <header className="hero">
        <h1 className="glow-text">52 BEFORE ZERO</h1>
        <h2>Survive the Deck. Reach the Crown.</h2>
        <p>Three Days. Four Zones. One Collapse.</p>
        <Link href="/register" className="cta-button">ENTER NOW</Link>
      </header>

      <section id="about" className="about">
        <h2 className="section-title glow-text">What is 52 Before Zero?</h2>
        <p className="about-text">
          Enter a three-day survival hierarchy where strategic progression is everything. In this arena, logic intersects with trust, and authority slowly spirals into chaos.
        </p>
        <ul className="about-list">
          <li><span>/</span> Competitive Filtration</li>
          <li><span>/</span> Trust & Chaos</li>
          <li><span>/</span> Immersive Authority</li>
        </ul>
      </section>

      <div className="arena-container">
        <img src="/hero.jpeg" alt="The Arena" className="arena-img" />
        <div className="arena-overlay"></div>
      </div>

      <section id="days" className="days-container">
        <div className="card">
          <span className="card-day">Phase 01</span>
          <h3 className="glow-text">Number Trials</h3>
          <p>Cards 2–10 govern this phase. Survival demands intellect and speed to conquer the logical elimination system.</p>
          <ul>
            <li>4 Distinct Zones (♠ ♥ ♦ ♣)</li>
            <li>QR-based Cryptic Riddles</li>
            <li>Time-Bound Retrieval Tasks</li>
          </ul>
        </div>

        <div className="card">
          <span className="card-day">Phase 02</span>
          <h3 className="glow-text">Shadow Collapse</h3>
          <p>The rules distort. Psychological gameplay takes center stage as trust instability shatters alliances.</p>
          <ul>
            <li>Hidden Operatives deployed</li>
            <li>Strategy & active deception required</li>
          </ul>
        </div>

        <div className="card" style={{ borderBottom: '2px solid #00f3ff' }}>
          <span className="card-day">Final Phase</span>
          <h3 className="accent-blue">The Sovereign Reckoning</h3>
          <p>Only the strongest remain. The final filtration leaves only King and Joker rounds.</p>

          <div className="joker-king-box">
            <h4>♔ KING ROUND</h4>
            <p>The ultimate authority trial. Prove speed dominance under crushing, high-pressure environments.</p>
            <br />
            <h4>🃏 JOKER ROUND</h4>
            <p>The final unpredictable twist. Total rule collapse leading to an intense public climax.</p>
          </div>
        </div>
      </section>

      <section id="command" className="command">
        <h2 className="section-title glow-text">Command & Control</h2>
        <div className="terminal-box">
          <ul>
            <li>Unlocking Protocols: Day 2 & Day 3</li>
            <li>Assigning Operative Roles</li>
            <li>Designating ♠ ♥ ♦ ♣ Zones</li>
            <li>Monitoring Team Vitals</li>
            <li>Awaiting Instruction Update...</li>
          </ul>
        </div>
      </section>

      <footer>
        <h2>52 BEFORE ZERO</h2>
        <p>Organized by Mindbend Committee</p>
        <p>Contact: <a href="mailto:admin@52beforezero.com" className="contact-placeholder">admin@52beforezero.com</a></p>
        <p style={{ marginTop: '2rem' }}>&copy; 2026 52 Before Zero. All rights reserved.</p>
      </footer>
    </>
  );
}
