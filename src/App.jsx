import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';

const frames = [
  { no: '001', title: 'When an equation becomes motion', topic: 'KINEMATICS', text: 'From symbols on a page to a system you can actually see move.' },
  { no: '002', title: 'The geometry behind a vector', topic: 'VECTORS', text: 'Magnitude, direction, components — treated as one visual object.' },
  { no: '003', title: 'Why waves carry information', topic: 'WAVES', text: 'A frame of thought around oscillation, propagation and superposition.' },
];

const topics = ['Mechanics', 'Vectors', 'Waves', 'Optics', 'Electromagnetism', 'Mathematics'];

function PhysicsCanvas() {
  const canvasRef = useRef(null);
  const [showComponents, setShowComponents] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.53, cy = h * 0.58;
      const scale = Math.min(w, h) * 0.18;
      const angle = -0.42 + Math.sin(time * 0.00045) * 0.035;
      const mag = 2.25;
      const ex = cx + Math.cos(angle) * scale * mag;
      const ey = cy + Math.sin(angle) * scale * mag;

      ctx.strokeStyle = 'rgba(255,255,255,.055)'; ctx.lineWidth = 1;
      const gap = 42;
      for (let x = cx % gap; x < w; x += gap) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
      for (let y = cy % gap; y < h; y += gap) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(255,255,255,.2)';
      ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(w,cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,h); ctx.stroke();

      if (showComponents) {
        ctx.setLineDash([5,6]); ctx.strokeStyle = 'rgba(94,234,212,.45)';
        ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex,cy); ctx.lineTo(cx,cy); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.strokeStyle = '#8be9ff'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.stroke();
      const a = Math.atan2(ey-cy, ex-cx), head = 12;
      ctx.fillStyle = '#8be9ff'; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex-Math.cos(a-.5)*head,ey-Math.sin(a-.5)*head); ctx.lineTo(ex-Math.cos(a+.5)*head,ey-Math.sin(a+.5)*head); ctx.closePath(); ctx.fill();
      ctx.font = '12px JetBrains Mono, monospace'; ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillText('y', cx+8, 18); ctx.fillText('x', w-18, cy-8);
      ctx.fillStyle = '#8be9ff'; ctx.fillText('A', ex+12, ey-8); ctx.fillStyle='rgba(255,255,255,.42)'; ctx.fillText('θ', cx+42, cy-8);
      frame = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize); frame=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [showComponents]);

  return <div className="canvas-shell"><canvas ref={canvasRef}/><div className="canvas-label">VECTOR / 001</div><button className="canvas-toggle" onClick={() => setShowComponents(v => !v)}>{showComponents ? 'components on' : 'components off'}</button></div>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  return <div className="site">
    <header className="nav">
      <a className="brand" href="#top"><span className="brand-mark">∿</span><span>FRAMES <i>/</i> PHYSICS</span></a>
      <nav className={menu ? 'nav-links open' : 'nav-links'}>{topics.slice(0,5).map(t => <a key={t} href="#frames">{t}</a>)}<a href="#about">ABOUT</a></nav>
      <div className="nav-actions"><button aria-label="Search"><Search size={17}/></button><button className="menu-btn" onClick={() => setMenu(v=>!v)} aria-label="Menu">{menu ? <X size={19}/> : <Menu size={19}/>}</button></div>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> RESEARCH NOTEBOOK / 001</div><h1>Physics is not<br/><em>just</em> an answer.</h1><p>It is the frame of thought that gets you there.</p><a className="primary" href="#frames">Explore the frames <ArrowUpRight size={16}/></a></div>
        <div className="hero-art"><PhysicsCanvas/><div className="equation eq-a">∇ · E = ρ / ε₀</div><div className="equation eq-b">F = ma</div><div className="equation eq-c">ψ(x,t)</div></div>
      </section>

      <section id="frames" className="frames section-pad"><div className="section-head"><div><span className="eyebrow">THE NOTEBOOK</span><h2>Latest frames.</h2></div><span className="count">03 / 2026</span></div><div className="frame-grid">{frames.map(f => <article className="frame-card" key={f.no}><div className="frame-top"><span>FRAME {f.no}</span><span>{f.topic}</span></div><h3>{f.title}</h3><p>{f.text}</p><a href="#about">Read frame <ArrowUpRight size={15}/></a></article>)}</div></section>

      <section id="about" className="manifesto section-pad"><div className="manifesto-index">01</div><div><span className="eyebrow">WHY FRAMES OF PHYSICS</span><h2>A real thought of truth.</h2><p>Equations are compressed ideas. A good frame opens them back up — showing the assumptions, geometry, motion and reasoning underneath.</p></div></section>

      <section className="topics section-pad"><div className="section-head"><div><span className="eyebrow">DOMAINS</span><h2>Where the frames live.</h2></div></div><div className="topic-list">{topics.map((t,i)=><a href="#frames" key={t}><span>0{i+1}</span><strong>{t}</strong><ArrowUpRight size={18}/></a>)}</div></section>
    </main>

    <footer><div className="footer-brand">FRAMES / PHYSICS</div><div>A real thought of truth.</div><div>© 2026</div></footer>
  </div>;
}
