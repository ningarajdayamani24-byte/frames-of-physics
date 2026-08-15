import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Menu, Search, X } from 'lucide-react';
import SimulationBackdrop from './SimulationBackdrop';
import './pitools.css';

const frames = [
  { no: '001', title: 'When an equation becomes motion', topic: 'KINEMATICS', text: 'From symbols on a page to a system you can actually see move.' },
  { no: '002', title: 'The geometry behind a vector', topic: 'VECTORS', text: 'Magnitude, direction, components — treated as one visual object.' },
  { no: '003', title: 'Why waves carry information', topic: 'WAVES', text: 'A frame of thought around oscillation, propagation and superposition.' },
];
const topics = ['Mechanics', 'Vectors', 'Waves', 'Optics', 'Electromagnetism', 'Mathematics'];
const equations = ['F = ma','p = mv','E = mc²','K = ½mv²','τ = Iα','L = Iω','∇ · E = ρ/ε₀','∇ × E = −∂B/∂t','∇ · B = 0','∇ × B = μ₀J + μ₀ε₀∂E/∂t','v = fλ','y = A sin(kx − ωt)','PV = nRT','ΔS ≥ 0','iℏ ∂ψ/∂t = Ĥψ','λ = h/p','E = hf','n₁ sinθ₁ = n₂ sinθ₂','1/f = 1/v + 1/u','∂²y/∂t² = v²∂²y/∂x²','∇²φ = 0','Gμν + Λgμν = 8πGTμν','H = p²/2m + V','x = x₀ + v₀t + ½at²'];

function PiToolsWindow() {
  const [loaded, setLoaded] = useState(false);
  return <div className="pitools-window">
    <div className="pitools-chrome"><div className="window-dots"><i/><i/><i/></div><div className="pitools-url"><span>π</span> pitools / simulations / physics</div><a className="pitools-open" href="https://pitools-physics.pages.dev" target="_blank" rel="noreferrer" aria-label="Open PiTools"><ExternalLink size={12}/></a></div>
    <div className="pitools-screen">
      <iframe title="PiTools physics simulation" src="https://pitools-physics.pages.dev" loading="eager" onLoad={() => setLoaded(true)} />
      {!loaded && <div className="pitools-loading"><div className="fallback-grid"/><div className="fallback-title">πTOOLS</div><div className="fallback-sub">PHYSICS SIMULATION ENVIRONMENT</div><div className="fallback-vector"><span/></div><div className="fallback-wave"/><div className="fallback-equation">F = ma</div><div className="fallback-equation e2">v = u + at</div><div className="fallback-status"><b/> LOADING SIMULATION</div></div>}
      <div className="pitools-overlay"/>
    </div>
    <div className="pitools-caption"><span>PI / TOOLS</span><span>INTERACTIVE PHYSICS ENVIRONMENT</span></div>
  </div>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <div className="site">
    <header className={scrolled ? 'nav island' : 'nav'}><a className="brand" href="#top"><span className="brand-mark">∿</span><span>FRAMES <i>/</i> PHYSICS</span></a><nav className={menu ? 'nav-links open' : 'nav-links'}><a href="#frames">FRAMES</a><a href="#domains">DOMAINS</a><a href="#about">ABOUT</a><a href="#notes">NOTES</a></nav><div className="nav-actions"><button className="search-button" aria-label="Search"><Search size={16}/><span>SEARCH</span></button><button className="menu-btn" onClick={() => setMenu(v => !v)} aria-label="Menu">{menu ? <X size={19}/> : <Menu size={19}/>}</button></div></header>
    <main id="top">
      <section className="hero section-pad"><SimulationBackdrop/><div className="hero-film-vignette"/><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="equation-cloud">{equations.map((eq, i) => <span key={i} style={{ '--i': i }}>{eq}</span>)}</div>
        <div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot"/> RESEARCH NOTEBOOK / 001</div><h1>Physics is not<br/><em>just</em> an answer.</h1><p className="tagline">A real thought of truth.</p><p className="hero-description">Every equation begins as a question. Every frame records what came after.</p><div className="hero-actions"><a className="primary" href="#frames">Explore the frames <ArrowUpRight size={16}/></a><a className="scroll-cue" href="#frames"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={14}/></a></div></div>
        <div className="hero-art reveal-delay"><PiToolsWindow/><div className="hero-side-equation eq-a">∇ · E = ρ / ε₀</div><div className="hero-side-equation eq-b">F = ma</div><div className="hero-side-equation eq-c">ψ(x,t)</div><div className="scan-line"/></div>
        <div className="hero-bottom"><span>01 — 06 / PHYSICS DOMAINS</span><span>PI / TOOLS — SIMULATION ENVIRONMENT</span></div>
      </section>
      <section id="frames" className="frames section-pad"><div className="section-head"><div><span className="eyebrow">THE NOTEBOOK</span><h2>Latest frames.</h2></div><span className="count">03 / 2026</span></div><div className="frame-grid">{frames.map(f => <article className="frame-card" key={f.no}><div className="frame-top"><span>FRAME {f.no}</span><span>{f.topic}</span></div><h3>{f.title}</h3><p>{f.text}</p><a href="#about">Read frame <ArrowUpRight size={15}/></a></article>)}</div></section>
      <section id="about" className="manifesto section-pad"><div className="manifesto-index">01</div><div><span className="eyebrow">WHY FRAMES OF PHYSICS</span><h2>A real thought of truth.</h2><p>Equations are compressed ideas. A good frame opens them back up — showing the assumptions, geometry, motion and reasoning underneath.</p></div></section>
      <section id="domains" className="topics section-pad"><div className="section-head"><div><span className="eyebrow">DOMAINS</span><h2>Where the frames live.</h2></div></div><div className="topic-list">{topics.map((t, i) => <a href="#frames" key={t}><span>0{i + 1}</span><strong>{t}</strong><ArrowUpRight size={18}/></a>)}</div></section>
    </main><footer id="notes"><div className="footer-brand">FRAMES / PHYSICS</div><div>A real thought of truth.</div><div>© 2026</div></footer>
  </div>;
}
