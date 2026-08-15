import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, Search, X } from 'lucide-react';

const frames = [
  { no: '001', title: 'Your first real frame', topic: 'COMING SOON', text: 'The first study, derivation, question or visualization you choose to publish.' },
  { no: '002', title: 'Another thought in motion', topic: 'COMING SOON', text: 'Every frame will become its own page — a permanent piece of the notebook.' },
  { no: '003', title: 'The next thing you understand', topic: 'COMING SOON', text: 'The notebook grows as the physics does.' },
];

const topics = ['Mechanics', 'Vectors', 'Waves', 'Optics', 'Electromagnetism', 'Quantum', 'Mathematics', 'Experiments', 'Simulations'];

const equations = [
  'F = ma', 'E = mc²', 'p = mv', 'K = ½mv²', '∇ · E = ρ/ε₀', '∇ · B = 0',
  '∇ × E = −∂B/∂t', '∇ × B = μ₀J + μ₀ε₀∂E/∂t', 'ψ(x,t)', 'iℏ∂ψ/∂t = Ĥψ',
  'λ = h/p', 'ΔxΔp ≥ ℏ/2', 'v = fλ', 'ω = 2πf', '∇²ψ + k²ψ = 0',
  'L = T − V', 'δS = 0', 'τ = r × F', 'p = γmv', 'ds² = c²dt² − dx²',
  'PV = nRT', 'Q = mcΔT', 'S = k ln Ω', 'V = IR', 'P = VI', 'n₁sinθ₁ = n₂sinθ₂'
];

function PhysicsField() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('vector');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;
      const cx = w * 0.51, cy = h * 0.55;
      const scale = Math.min(w, h) * 0.16;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,.035)';
      for (let x = 0; x < w; x += 38) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 38) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      if (mode === 'wave') {
        ctx.strokeStyle = 'rgba(139,233,255,.72)'; ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = cy + Math.sin(x * 0.035 - t * 3.2) * 42 * Math.exp(-Math.pow((x - w * .5) / (w * .55), 2));
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.strokeStyle = 'rgba(125,255,189,.22)';
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
      } else if (mode === 'orbit') {
        const ox = cx, oy = cy;
        [55, 105, 160].forEach((r, i) => {
          ctx.strokeStyle = `rgba(255,255,255,${.07 - i * .012})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.fillStyle = '#8be9ff'; ctx.shadowColor = 'rgba(139,233,255,.55)'; ctx.shadowBlur = 18;
        ctx.beginPath(); ctx.arc(ox, oy, 7, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        [55,105,160].forEach((r,i) => { const a=t*(1.1-i*.18)+i; const px=ox+Math.cos(a)*r; const py=oy+Math.sin(a)*r*.72; ctx.fillStyle=i===1?'#7dffbd':'rgba(139,233,255,.8)'; ctx.beginPath(); ctx.arc(px,py,4,0,Math.PI*2); ctx.fill(); });
      } else if (mode === 'pendulum') {
        const a = Math.sin(t * 1.7) * .55, len = Math.min(w,h) * .27;
        const px = cx + Math.sin(a) * len, py = cy + Math.cos(a) * len;
        ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(cx,cy-len*.15); ctx.lineTo(px,py); ctx.stroke();
        ctx.fillStyle='#8be9ff'; ctx.shadowColor='rgba(139,233,255,.45)'; ctx.shadowBlur=16; ctx.beginPath(); ctx.arc(px,py,8,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      } else {
        const angle = -0.43 + Math.sin(t * .8) * .1;
        const mag = 2.2 + Math.sin(t * .7) * .1;
        const ex = cx + Math.cos(angle) * scale * mag, ey = cy + Math.sin(angle) * scale * mag;
        ctx.strokeStyle='rgba(255,255,255,.16)'; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(w,cy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,h); ctx.stroke();
        ctx.setLineDash([5,6]); ctx.strokeStyle='rgba(125,255,189,.45)'; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex,cy); ctx.lineTo(cx,cy); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle='#8be9ff'; ctx.lineWidth=2.2; ctx.shadowColor='rgba(139,233,255,.5)'; ctx.shadowBlur=14; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.stroke(); ctx.shadowBlur=0;
        const a=Math.atan2(ey-cy,ex-cx), head=12; ctx.fillStyle='#8be9ff'; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex-Math.cos(a-.5)*head,ey-Math.sin(a-.5)*head); ctx.lineTo(ex-Math.cos(a+.5)*head,ey-Math.sin(a+.5)*head); ctx.closePath(); ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize',resize); raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
  },[mode]);

  return <div className="physics-field">
    <canvas ref={canvasRef}/>
    <div className="field-label">LIVE PHYSICS / {mode.toUpperCase()}</div>
    <div className="field-controls">{['vector','wave','orbit','pendulum'].map(m=><button key={m} className={mode===m?'active':''} onClick={()=>setMode(m)}>{m}</button>)}</div>
    <div className="field-readout"><span>{mode==='vector'?'VECTOR A':mode==='wave'?'WAVE PACKET':mode==='orbit'?'ORBITAL MODEL':'PENDULUM'}</span><strong>LIVE</strong></div>
  </div>;
}

function EquationCloud(){
  return <div className="equation-cloud" aria-hidden="true">{equations.map((eq,i)=><span key={i} style={{'--i':i}}>{eq}</span>)}</div>;
}

export default function App(){
  const [menu,setMenu]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>90);onScroll();window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[]);
  return <div className="site">
    <header className={scrolled?'nav island':'nav'}>
      <a className="brand" href="#top"><span className="brand-mark">∿</span><span>FRAMES <i>/</i> PHYSICS</span></a>
      <nav className={menu?'nav-links open':'nav-links'}><a href="#frames">FRAMES</a><a href="#domains">DOMAINS</a><a href="#about">ABOUT</a><a href="#notes">NOTES</a></nav>
      <div className="nav-actions"><button className="search-button" aria-label="Search"><Search size={15}/><span>SEARCH</span></button><button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Menu">{menu?<X size={18}/>:<Menu size={18}/>}</button></div>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <EquationCloud/>
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> RESEARCH NOTEBOOK / 2026</div><h1>FRAMES<br/><span>OF</span><br/>PHYSICS</h1><p className="tagline">A real thought of truth.</p><p className="hero-description">Every equation begins as a question. Every frame records what came after.</p><div className="hero-actions"><a className="primary" href="#frames">Enter the notebook <ArrowUpRight size={16}/></a><a className="scroll-cue" href="#frames"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={14}/></a></div></div>
        <div className="hero-visual"><PhysicsField/><div className="hero-equation e1">∇ × E = −∂B/∂t</div><div className="hero-equation e2">iℏ ∂ψ/∂t = Ĥψ</div><div className="hero-equation e3">L = T − V</div><div className="scan-line"/></div>
        <div className="hero-bottom"><span>01 — LIVING PHYSICS NOTEBOOK</span><span>QUESTIONS · DERIVATIONS · VISUALIZATIONS</span></div>
      </section>

      <section className="manifesto section-pad" id="about"><div className="manifesto-index">01</div><div><span className="eyebrow">THE IDEA</span><h2>Not a collection of answers.</h2><p>A living record of what you study, question, derive, understand and build. Each piece becomes a Frame — its own page, its own thought, its own place in the notebook.</p></div></section>

      <section id="frames" className="frames section-pad"><div className="section-head"><div><span className="eyebrow">THE NOTEBOOK</span><h2>Latest frames.</h2></div><a className="section-link" href="#domains">VIEW ALL ↗</a></div><div className="frame-grid">{frames.map(f=><article className="frame-card" key={f.no}><div className="frame-top"><span>FRAME {f.no}</span><span>{f.topic}</span></div><h3>{f.title}</h3><p>{f.text}</p><a href="#about">Open frame <ArrowUpRight size={15}/></a></article>)}</div></section>

      <section id="domains" className="topics section-pad"><div className="section-head"><div><span className="eyebrow">THE PHYSICS MAP</span><h2>Where the frames live.</h2></div></div><div className="topic-list">{topics.map((t,i)=><a href="#frames" key={t}><span>0{i+1}</span><strong>{t}</strong><ArrowUpRight size={18}/></a>)}</div></section>

      <section className="current-thought section-pad"><div className="thought-line"/><span className="eyebrow">CURRENTLY THINKING ABOUT</span><h2>The next question<br/><em>has not been written yet.</em></h2><p>When it appears, it becomes a frame.</p></section>
    </main>
    <footer id="notes"><div className="footer-brand">FRAMES / PHYSICS</div><div>A real thought of truth.</div><div>© 2026</div></footer>
  </div>;
}
