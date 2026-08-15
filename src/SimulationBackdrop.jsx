import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

function line(ctx, x1, y1, x2, y2, alpha = 0.16, width = 1) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

function dot(ctx, x, y, r, color, alpha = 0.35) {
  ctx.fillStyle = color.replace('ALPHA', alpha);
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
}

function panel(ctx, x, y, w, h, label, draw) {
  ctx.strokeStyle = 'rgba(255,255,255,.065)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.font = '9px JetBrains Mono, monospace';
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  ctx.fillText(label, x + 12, y + 17);
  ctx.save(); ctx.translate(x, y + 24); draw(ctx, w, h - 24); ctx.restore();
}

export default function SimulationBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf = 0, last = 0, t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const simulations = [
      ['PROJECTILE MOTION', (c,W,H) => { const ox=24,oy=H-20,R=W-44; line(c,ox,oy,ox+R,oy,.12); const p=(t*.10)%1, x=ox+R*p, y=oy-(H-42)*.72*(4*p*(1-p)); c.strokeStyle='rgba(139,233,255,.25)'; c.beginPath(); for(let i=0;i<=60;i++){const q=i/60,xx=ox+R*q,yy=oy-(H-42)*.72*(4*q*(1-q)); i?c.lineTo(xx,yy):c.moveTo(xx,yy)} c.stroke(); dot(c,x,y,3,'rgba(139,233,255,ALPHA)',.5); }],
      ['PENDULUM', (c,W,H) => { const ox=W*.5,oy=15,L=Math.min(W,H)*.43,a=Math.sin(t*1.15)*.55,bx=ox+Math.sin(a)*L,by=oy+Math.cos(a)*L; line(c,ox,oy,bx,by,.22); dot(c,ox,oy,2,'rgba(255,255,255,ALPHA)',.4); dot(c,bx,by,5,'rgba(125,255,189,ALPHA)',.5); }],
      ['TRAVELLING WAVE', (c,W,H) => { const m=H*.55; c.strokeStyle='rgba(125,255,189,.27)'; c.beginPath(); for(let x=0;x<=W;x+=3){const y=m+Math.sin(x*.055-t*2.5)*H*.19; x?c.lineTo(x,y):c.moveTo(x,y)} c.stroke(); line(c,0,m,W,m,.06); }],
      ['ORBITAL MOTION', (c,W,H) => { const cx=W*.5,cy=H*.54,rx=W*.31,ry=H*.34,a=t*.75; c.strokeStyle='rgba(139,233,255,.16)'; c.beginPath(); c.ellipse(cx,cy,rx,ry,-.25,0,TAU); c.stroke(); dot(c,cx,cy,4,'rgba(255,255,255,ALPHA)',.45); dot(c,cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,3,'rgba(139,233,255,ALPHA)',.55); }],
      ['COUPLED OSCILLATORS', (c,W,H) => { const y=H*.58,x1=W*.3+Math.sin(t*1.5)*W*.09,x2=W*.7+Math.sin(t*1.5+1.9)*W*.09; line(c,12,y,W-12,y,.08); dot(c,x1,y,5,'rgba(139,233,255,ALPHA)',.45); dot(c,x2,y,5,'rgba(125,255,189,ALPHA)',.4); line(c,x1+7,y,x2-7,y,.13); }],
      ['ELECTRIC FIELD', (c,W,H) => { const cx=W*.5,cy=H*.53; for(let r=18;r<Math.min(W,H)*.45;r+=18){c.strokeStyle=`rgba(139,233,255,${Math.max(.025,.11-r/(Math.min(W,H)*5))})`;c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke()} dot(c,cx,cy,4,'rgba(139,233,255,ALPHA)',.48); const p=(t*.35)%1,rr=22+p*Math.min(W,H)*.36; dot(c,cx+Math.cos(p*TAU)*rr,cy+Math.sin(p*TAU)*rr,2,'rgba(125,255,189,ALPHA)',.36); }],
      ['INTERFERENCE', (c,W,H) => { const m=H*.52; for(let x=0;x<W;x+=9){const y=m+Math.sin(x*.07-t*2)*H*.12+Math.sin(x*.12-t*1.2)*H*.08;dot(c,x,y,1.4,'rgba(139,233,255,ALPHA)',.25)} }],
      ['ROTATIONAL DYNAMICS', (c,W,H) => { const cx=W*.5,cy=H*.53,r=Math.min(W,H)*.28,a=t*.8;c.strokeStyle='rgba(125,255,189,.2)';c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke();line(c,cx,cy,cx+Math.cos(a)*r,cy+Math.sin(a)*r,.22);dot(c,cx+Math.cos(a)*r,cy+Math.sin(a)*r,4,'rgba(125,255,189,ALPHA)',.48); }],
      ['FOURIER DECOMPOSITION', (c,W,H) => { const m=H*.55;c.strokeStyle='rgba(139,233,255,.24)';c.beginPath();for(let x=0;x<=W;x+=3){const y=m+Math.sin(x*.035-t*1.5)*H*.12+Math.sin(x*.095-t*2.3)*H*.055;x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke(); }],
      ['LENS / RAY OPTICS', (c,W,H) => { const cy=H*.52,lx=W*.53;c.strokeStyle='rgba(255,255,255,.14)';c.beginPath();c.ellipse(lx,cy,8,H*.33,0,0,TAU);c.stroke();const p=(t*.16)%1,y=10+p*(H-20);line(c,10,y,lx,cy,.16);line(c,lx,cy,W-10,cy-(y-cy)*.45,.18); }],
      ['THERMAL MOTION', (c,W,H) => { for(let i=0;i<12;i++){const x=(i*71+Math.sin(t*(.7+i*.03)+i)*22+W)%W,y=(i*31+Math.cos(t*(.8+i*.02)+i)*18+H)%H;dot(c,x,y,2,i%2?'rgba(139,233,255,ALPHA)':'rgba(125,255,189,ALPHA)',.23)} }],
      ['SPECIAL RELATIVITY', (c,W,H) => { const cy=H*.55;for(let i=0;i<5;i++)line(c,10,cy+(i-2)*14,W-10,cy+(i-2)*7,.07);const p=(t*.22)%1;dot(c,10+p*(W-20),cy,3,'rgba(139,233,255,ALPHA)',.42); }],
    ];

    const draw = (now) => {
      const dt=Math.min((now-last)/1000||0,.033); last=now; t+=dt;
      const W=canvas.clientWidth,H=canvas.clientHeight;
      ctx.clearRect(0,0,W,H);
      const cols=W>1100?4:W>700?3:2, rows=3, gap=18;
      const pw=(W-gap*(cols-1))/cols, ph=(H-gap*(rows-1))/rows;
      const drift=Math.sin(t*.12)*8;
      ctx.save(); ctx.translate(drift,Math.sin(t*.08)*3);
      simulations.forEach(([label,drawSim],i)=>{const col=i%cols,row=Math.floor(i/cols);if(row>=rows)return;panel(ctx,col*(pw+gap),row*(ph+gap),pw,ph,label,drawSim)});
      ctx.restore();
      const vignette=ctx.createRadialGradient(W*.5,H*.48,H*.08,W*.5,H*.48,H*.75);
      vignette.addColorStop(0,'rgba(5,5,5,0)');vignette.addColorStop(.65,'rgba(5,5,5,.10)');vignette.addColorStop(1,'rgba(5,5,5,.68)');ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);
      raf=requestAnimationFrame(draw);
    };

    resize(); window.addEventListener('resize',resize); raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
  },[]);

  return <canvas ref={ref} className="simulation-backdrop" aria-hidden="true" />;
}
