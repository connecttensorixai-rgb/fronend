/* Auto-ported from tensaiweb.html. Runs inside a Shadow DOM so the page keeps its exact original styling. */
export default function initTensorix(root, host) {
  const L = [], T = [], O = [];
  let dead = false;
  const win = window;
  const addEventListener = (t, f, o) => { win.addEventListener(t, f, o); L.push(['w', t, f, o]); };
  const requestAnimationFrame = (f) => (dead ? 0 : win.requestAnimationFrame(f));
  const setTimeout = (f, ms, ...a) => { const id = win.setTimeout(f, ms, ...a); T.push(['t', id]); return id; };
  const setInterval = (f, ms, ...a) => { const id = win.setInterval(f, ms, ...a); T.push(['i', id]); return id; };
  const clearInterval = (id) => win.clearInterval(id);
  const IntersectionObserver = function (cb, o) { const x = new win.IntersectionObserver(cb, o); O.push(x); return x; };
  const ResizeObserver = function (cb) { const x = new win.ResizeObserver(cb); O.push(x); return x; };
  const document = {
    getElementById: (id) => root.getElementById(id),
    querySelector: (s) => root.querySelector(s),
    querySelectorAll: (s) => root.querySelectorAll(s),
    createElement: (t) => win.document.createElement(t),
    createElementNS: (n, t) => win.document.createElementNS(n, t),
    documentElement: host,
    fonts: win.document.fonts,
    addEventListener: (t, f, o) => { win.document.addEventListener(t, f, o); L.push(['d', t, f, o]); },
  };
  const matchMedia = win.matchMedia.bind(win);
  let lockUntil = 0;
  const jumpTo = (y) => {
    lockUntil = win.performance.now() + 1500;
    const lx = win.lenis;
    if (lx && !matchMedia('(prefers-reduced-motion:reduce)').matches) lx.scrollTo(y, { duration: 1.2 });
    else win.scrollTo({ top: y, behavior: 'auto' });
  };
  const getComputedStyle = win.getComputedStyle.bind(win);
  const innerWidthGetter = () => win.innerWidth;
  void innerWidthGetter;
  try {

const $=id=>document.getElementById(id),calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const P=[["Agentic AI & Intelligent Automation","Deploy autonomous agents that coordinate tasks, execute workflows and make real time decisions.","Eliminate repetitive manual work and accelerate operational execution."],
["Data Intelligence & Integration","Unify fragmented enterprise data into real-time pipelines for complete operational visibility.","Eliminate reporting silos and make faster, data-backed decisions."],
["Computer Vision & AI Analytics","Transform cameras and visual feeds into automated inspection, tracking, and anomaly detection.","Catch defects early and run 24/7 quality monitoring with zero fatigue."],
["Generative AI & Enterprise Knowledge","Turn enterprise data into secure, conversational intelligence to instantly find verified answers.","Cut search time and access company knowledge instantly."]];
const S=[["Ingest","Customer requirement","Parses purchase orders, delivery dates and required quantities.","> reading PO #49102<br>> 4 child parts, 800 units"],
["Extract","Production and nesting data","Reads CAM nesting layouts, DXF parts lists and CNC cut logs.","> parsing NEST-SHEET-316L-JOB04<br>> 796 units nested"],
["Compute","Comparison engine","Cross-checks child-part counts, assembly parent codes and sheet allocations.","> comparing 4 lines<br>> done in 2.8 s"],
["Isolate","Discrepancy identification","Flags deficits, surplus parts and un-nested child components.","> PRT-FLANGE-12 short by 4<br>> 3 lines matched"],
["Report","Structured BOM report","Generates purchase quantity schedules and reconciliation sheets.","> report ready<br>> sent to planner"]];
const I=[["Manufacturing","Discrepancy prevention across laser cutting, sheet metal nesting and sub-assembly yields."],["Healthcare","Structured clinical documentation, medical consumable tracking and predictive inventory."],["Agriculture","Yield forecasting, drone vision crop health inspection and supply-chain routing."],["Financial management","Invoice parsing, multi-currency ledger audits and frequent discrepancy checks."],["Supply chain","Improve forecasting, demand visibility and operational planning with connected data and intelligent analaytics."],["Energy and utilities","Apply predictive analytics and AI-powered monitoring to support resource planning, operational visibility and energy efficiency."],["Automotive and telecom","OEM line sequencing, component traceability, tower vision inspection and load balancing."],["Construction","BIM drawing discrepancy checks, site safety monitoring and material procurement reconciliation."]];
function tabs(host,items,fn,cls){items.forEach((x,i)=>{const b=document.createElement('button');b.role='tab';b.innerHTML=cls?x[0]:'<small>Pillar '+(i+1)+'</small>'+x[0];b.onclick=()=>{fn(i,true)};host.appendChild(b)})}
function sel(host,i){[...host.children].forEach((b,j)=>b.setAttribute('aria-selected',j===i))}
const pl=$('pl'),pp=$('pp');tabs(pl,P,i=>{sel(pl,i);pp.innerHTML='<div class="fade"><h3>'+P[i][0]+'</h3><p>'+P[i][1]+'</p><div class="ben"><b>Business benefit.</b> '+P[i][2]+'</div></div>'});pl.children[0].click();
(function(){

const A0=[`<img src=\"/tx/tx-13-9784d1a278.jpg\" alt=\"Healthcare specialist reviewing medical imaging\" loading=\"lazy\" decoding=\"async\">`,
`<img src=\"/tx/tx-14-344093ec7e.jpg\" alt=\"Industrial robotic arm machining a metal component\" loading=\"lazy\" decoding=\"async\">`,
`<img src=\"/tx/tx-15-4cd84c9d83.jpg\" alt=\"Drone surveying green agricultural fields\" loading=\"lazy\" decoding=\"async\">`,
`<img src=\"/tx/tx-16-445fafa1d5.jpg\" alt=\"Electrical power substation at dusk\" loading=\"lazy\" decoding=\"async\">`,
`<img src=\"/tx/tx-17-a106381cf5.jpg\" alt=\"Autonomous robots moving goods in a logistics warehouse\" loading=\"lazy\" decoding=\"async\">`];

const CD0=[['Healthcare','Use AI-driven analytics and intelligent data solutions to support insights, streamline workflows and enabled informed decisions across healthcare.'],['Manufacturing','Leverage machine learning, data integration and intelligent automation to support quality insights, planning and operational performance.'],['Agriculture','Use data intelligence and predictive insights to support crop monitoring, resource planning and more informed agricultural decisions.'],['Energy and utilities','Apply predictive analysis and AI-powered monitoring to support resource planning, operational visibility and energy efficiency.'],['Supply chain','Improve forecasting, demand visibility and operational planning with connected data and intelligent analytics.']];

const ORD=[1,4,3,2,0],A=ORD.map(i=>A0[i]),CD=ORD.map(i=>CD0[i]);

const cs=$('car'),n=CD.length;let cur=0;

const cards=CD.map((c,i)=>{const a=document.createElement('article');a.className='cd';a.innerHTML=`<div class='im'>${A[i]}</div><div class='tx'><h3>${c[0]}<span class='ix'>${String(i+1).padStart(2,'0')}</span></h3><p>${c[1]}</p><div class='ln'><button data-demo>View technical briefing</button><i aria-hidden='true'>&rarr;</i></div></div>${['Healthcare','Energy and utilities'].includes(c[0])?"<span class='soon'><i></i>Upcoming</span>":''}`;a.onclick=()=>{if(!a.classList.contains('on'))go(i)};cs.appendChild(a);return a});

function go(i){cur=(i+n)%n;pos()}

let K=1,WIDE=false;
const amb=document.createElement('div');amb.className='amb';cs.insertBefore(amb,cs.firstChild);
function fit(){
 const pin=cs.closest('.industry-pin'),nav=document.querySelector('.cnav');
 WIDE=innerWidth>=900;cs.classList.toggle('wide',WIDE);
 cards.forEach(a=>{a.style.minHeight=''});
 if(getComputedStyle(cs).display==='grid'){cs.style.height='';cs.classList.remove('wide','compact');return 1}
 const top=cs.getBoundingClientRect().top-pin.getBoundingClientRect().top;
 const avail=pin.clientHeight-top-(nav?nav.offsetHeight+28:0)-12;
 if(WIDE){const ch=Math.max(250,Math.min(440,Math.round(avail-30)));cs.style.setProperty('--ch',ch+'px');cs.classList.toggle('compact',ch<340);cs.style.height=(ch+30)+'px';return 1}
 cs.classList.remove('compact');
 const nat=Math.max(...cards.map(a=>a.offsetHeight));
 cards.forEach(a=>a.style.minHeight=nat+'px');
 const k=Math.max(.6,Math.min(1,(avail-34)/nat));
 cs.style.height=Math.round(nat*k+34)+'px';
 return k}
function refit(){K=fit();pos()}
function pos(){const k=K,cw=Math.min(880,innerWidth*.72),sp=WIDE?cw*.64:Math.min(350*Math.max(k,.8),cs.clientWidth*.33);
 cards.forEach((a,i)=>{a.style.transformOrigin=WIDE?'50% 50%':'50% 0';let d=i-cur;if(d>n/2)d-=n;if(d<-n/2)d+=n;const ab=Math.abs(d),on=!d;a.classList.toggle('on',on);
  a.style.transform=WIDE?`translateX(${d*sp}px) translateZ(${on?0:-140*ab}px) rotateY(${-d*18}deg) scale(${on?1:.86})`:`translateX(${d*sp}px) translateZ(${on?60:-60*ab}px) rotateY(${-d*14}deg) scale(${(on?1:.92)*k})`;
  a.style.opacity=ab>1?0:on?1:(WIDE?.72:.55);a.style.pointerEvents=ab>1?'none':'auto';a.style.zIndex=10-ab;a.setAttribute('aria-hidden',ab>1);a.querySelector('button').tabIndex=on?0:-1});
 $('cc').textContent=(cur+1)+' / '+n;
 const im=cards[cur].querySelector('img');if(im&&amb.dataset.s!==im.src){amb.dataset.s=im.src;amb.style.opacity=0;setTimeout(()=>{amb.style.backgroundImage='url("'+im.src+'")';amb.style.opacity=.42},280)}}
cs.onpointermove=e=>{const r=cs.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cs.style.setProperty('--px',(x*-22).toFixed(1)+'px');cs.style.setProperty('--py',(y*-14).toFixed(1)+'px')};

$('cp').onclick=()=>go(cur-1);$('cn').onclick=()=>go(cur+1);

cs.onkeydown=e=>{if(e.key=='ArrowLeft')go(cur-1);if(e.key=='ArrowRight')go(cur+1)};

let x0=null;cs.onpointerdown=e=>{x0=e.clientX};cs.onpointerup=e=>{if(x0!==null){const d=e.clientX-x0;if(d>60)go(cur-1);else if(d<-60)go(cur+1)}x0=null};

addEventListener('resize',refit);const IM={0:0,1:1,2:2,3:3,4:4};addEventListener('industry',e=>{const k=IM[e.detail];if(k===undefined)return;go(k);const t=industrySection.getBoundingClientRect().top+scrollY,tot=Math.max(1,industrySection.offsetHeight-innerHeight);jumpTo(t+((k+.5)/n)*tot)});
const industrySection=$('industries');let scrollTick=false;
function syncIndustryToScroll(){scrollTick=false;if(calm||win.performance.now()<lockUntil)return;const r=industrySection.getBoundingClientRect();const total=Math.max(1,industrySection.offsetHeight-innerHeight);const travelled=Math.max(0,Math.min(total,-r.top));const p=Math.max(0,Math.min(.9999,travelled/total));go(Math.min(n-1,Math.floor(p*n)));}
addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(syncIndustryToScroll)}},{passive:true});
if(!calm)syncIndustryToScroll();refit();document.fonts&&document.fonts.ready.then(refit);addEventListener('load',refit);

})();









const dm=$('dm'),chb=$('chb'),chq=$('chq'),chf=$('chf');
const SEC=['Manufacturing','Supply chain','Energy','Agriculture','Healthcare','Something else'];
const bub=(t,c)=>{const d=document.createElement('div');d.className='ch-bb '+c;d.textContent=t;chb.appendChild(d);chb.scrollTop=chb.scrollHeight};
let picked='';
function chatReset(){picked='';chb.innerHTML='';chq.hidden=false;chq.innerHTML='';chf.hidden=true;chf.reset();bub('Hi! I can set up a demo for you. What would you like to improve?','bot');SEC.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='ch-chip';b.textContent=t;chq.appendChild(b)})}
chq.onclick=e=>{
  const b=e.target.closest('button');if(!b)return;
  picked=b.textContent.trim();
  chq.hidden=true;bub(picked,'me');
  setTimeout(()=>{bub('Great choice. Where should we send the invite?','bot');chf.hidden=false;chf.querySelector('input').focus()},600);
};
chf.onsubmit=async e=>{
  e.preventDefault();
  const v=chf.querySelector('input').value.trim();
  chf.hidden=true;bub(v,'me');
  try{
    const r=await fetch((window.__TX_LEADS_URL__||'http://127.0.0.1:3001/api/leads'),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:v,interest:picked})
    });
    if(!r.ok)throw new Error('Lead submission failed');
    setTimeout(()=>bub('Thanks! We will email you a time within one business day.','bot'),600);
  }catch{
    bub('Sorry, something went wrong. Please try again.','bot');
    chf.hidden=false;
  }
};
document.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>{chatReset();dm.showModal()});
dm.addEventListener('click',e=>{const r=dm.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dm.close()});
(function(){
const cv=$('nn'),g=cv.getContext('2d'),hero=document.querySelector('.hero');
let W=0,H=0,N=[],X=[],P=[],M={x:-999,y:-999},col={nv:'#213d83',or:'#eb510e'},fr=0,run=true,t0=0;
const clamp=v=>Math.max(0,Math.min(1,v));
function vis(x,y){let a=1;for(const r of X){const dx=Math.max(r[0]-x,0,x-r[2]),dy=Math.max(r[1]-y,0,y-r[3]);a=Math.min(a,clamp(Math.hypot(dx,dy)/50));if(!a)break}return a}
function colors(){const s=getComputedStyle(document.documentElement);col.nv=s.getPropertyValue('--nv').trim()||col.nv;col.or=s.getPropertyValue('--or').trim()||col.or}
function rects(){const c=cv.getBoundingClientRect();X=[...hero.querySelectorAll('h1,.lead,.cta,.chips,.net')].map(e=>{const r=e.getBoundingClientRect();return[r.left-c.left-22,r.top-c.top-22,r.right-c.left+22,r.bottom-c.top+22]})}
function layout(){const d=Math.min(devicePixelRatio||1,2),w=cv.parentElement.clientWidth;H=hero.offsetHeight;cv.width=w*d;cv.height=H*d;cv.style.height=H+'px';g.setTransform(d,0,0,d,0,0);colors();rects();
if(!N.length||Math.abs(w-W)>60){W=w;N=Array.from({length:Math.round(W*H/7500)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,o:Math.random()<.2,r:1.8+Math.random()*2}))}else W=w;if(calm)draw(16)}
function draw(dt){g.clearRect(0,0,W,H);if(fr%40==0)rects();if(fr%90==0)colors();fr++;
for(const n of N){n.x+=n.vx*dt/16;n.y+=n.vy*dt/16;if(n.x<-10)n.x=W+10;if(n.x>W+10)n.x=-10;if(n.y<-10)n.y=H+10;if(n.y>H+10)n.y=-10;n.a=vis(n.x,n.y)}
const m={x:M.x,y:M.y,a:vis(M.x,M.y)};g.lineWidth=1;
for(let i=0;i<N.length;i++){const a=N[i];if(a.a<.02)continue;
for(let j=i+1;j<N.length;j++){const b=N[j];if(b.a<.02)continue;const d=Math.hypot(a.x-b.x,a.y-b.y);if(d>135)continue;
const al=(1-d/135)*Math.min(a.a,b.a,vis((a.x+b.x)/2,(a.y+b.y)/2),vis(a.x*.75+b.x*.25,a.y*.75+b.y*.25),vis(a.x*.25+b.x*.75,a.y*.25+b.y*.75));
if(al<.02)continue;g.globalAlpha=al*.35;g.strokeStyle=col.nv;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
const d=Math.hypot(a.x-m.x,a.y-m.y);if(d<150&&m.a>.02){const al=(1-d/150)*Math.min(a.a,m.a,vis((a.x+m.x)/2,(a.y+m.y)/2));if(al>.02){g.globalAlpha=al*.7;g.strokeStyle=col.or;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(m.x,m.y);g.stroke()}}}
for(const n of N){g.globalAlpha=n.a*(n.o?.9:.5);g.fillStyle=n.o?col.or:col.nv;g.beginPath();g.arc(n.x,n.y,n.r,0,6.283);g.fill()}
if(!calm){if(Math.random()<dt/450&&N.length){const a=N[Math.floor(Math.random()*N.length)];if(a.a>.5){const b=N.find(n=>{const d=Math.hypot(a.x-n.x,a.y-n.y);return n!==a&&n.a>.5&&d>40&&d<135});if(b)P.push({a,b,t:0})}}
P=P.filter(p=>p.t<1);for(const p of P){p.t+=dt/800;const x=p.a.x+(p.b.x-p.a.x)*p.t,y=p.a.y+(p.b.y-p.a.y)*p.t;g.globalAlpha=Math.min(p.a.a,p.b.a,vis(x,y));g.fillStyle=col.or;g.beginPath();g.arc(x,y,3,0,6.283);g.fill()}}
g.globalAlpha=1}
function loop(t){if(run)draw(Math.min(t-t0||16,50));t0=t;requestAnimationFrame(loop)}
addEventListener('mousemove',e=>{const c=cv.getBoundingClientRect();M.x=e.clientX-c.left;M.y=e.clientY-c.top});
document.addEventListener('mouseleave',()=>{M.x=-999});
new IntersectionObserver(e=>{run=e[0].isIntersecting}).observe(hero);
new ResizeObserver(layout).observe(hero);
layout();document.fonts&&document.fonts.ready.then(layout);
if(!calm)requestAnimationFrame(loop);
})();

(function(){
const svg=$('nw'),NS='http://www.w3.org/2000/svg';
const Z=[['Manufacturing','M'],['Supply chain','S'],['Energy','E'],['Agriculture','A'],['Healthcare','H']];
const el=(t,a,p,x)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;(p||svg).appendChild(e);return e};
const X0=114,Y0=210,XM=240,X1=432,mid=[120,210,300],map=[0,0,1,2,2],sy=i=>70+i*70,paths=[],rings=[],dots=[];let hover=-1,run=true,last=0;
mid.forEach(ym=>{el('path',{class:'fl',d:'M'+X0+' '+Y0+'C170 '+Y0+',190 '+ym+','+XM+' '+ym});Z.forEach((z,i)=>el('path',{class:'fl',d:'M'+XM+' '+ym+'C320 '+ym+',340 '+sy(i)+','+X1+' '+sy(i)}))});
Z.forEach((z,i)=>{const ym=mid[map[i]];paths.push(el('path',{class:'cv',d:'M'+X0+' '+Y0+'C170 '+Y0+',190 '+ym+','+XM+' '+ym+'C320 '+ym+',340 '+sy(i)+','+X1+' '+sy(i)}))});
mid.forEach(ym=>el('circle',{class:'mn',cx:XM,cy:ym,r:9}));el('text',{class:'ml',x:XM,y:mid[0]-26,'text-anchor':'middle'},svg,'AI agents');
Z.forEach((z,i)=>{const y=sy(i),g=el('g',{class:'ep',tabindex:0,role:'button','aria-label':'Open '+z[0]});
 el('rect',{x:X1-12,y:y-20,width:132,height:40,fill:'transparent'},g);rings.push(el('circle',{class:'rg',cx:X1,cy:y,r:6},g));el('circle',{class:'nd',cx:X1,cy:y,r:5.5},g);el('text',{x:X1+14,y:y+4.5},g,z[0]);
 const on=()=>{hover=i;svg.classList.add('hov');paths[i].classList.add('on');g.classList.add('on')},off=()=>{hover=-1;svg.classList.remove('hov');paths[i].classList.remove('on');g.classList.remove('on')};
 g.onmouseenter=on;g.onmouseleave=off;g.onfocus=on;g.onblur=off;
 const open=()=>{dispatchEvent(new CustomEvent('industry',{detail:i}));void 0};
 g.onclick=open;g.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();open()}}});
Z.forEach((z,i)=>{const g=el('g',{});el('circle',{class:'dt'+(i%2?' o':''),r:11},g);el('text',{class:'dl'},g,z[1]);dots.push({i,g,path:paths[i],L:paths[i].getTotalLength(),t:i*.2,v:.15+((i*37)%7)*.012})});
function place(d){const p=d.path.getPointAtLength(d.t*d.L);d.g.setAttribute('transform','translate('+p.x+' '+p.y+')');d.g.style.opacity=Math.min(1,d.t*7,(1-d.t)*7)}
function hit(i){if(calm)return;rings[i].animate([{opacity:.9,transform:'scale(1)'},{opacity:0,transform:'scale(3.2)'}],{duration:700,easing:'ease-out'})}
function frame(ts){const dt=Math.min(ts-last||16,50);last=ts;if(run)dots.forEach(d=>{d.t+=dt/1000*d.v*(d.i===hover?2:1);if(d.t>=1){d.t-=1;hit(d.i)}place(d)});requestAnimationFrame(frame)}
dots.forEach(d=>{if(calm)d.t=.2+d.i*.07;place(d)});
if(!calm){new IntersectionObserver(e=>{run=e[0].isIntersecting}).observe(svg);requestAnimationFrame(frame)}
})();

(function(){
const home=$('top'),tp=$('page-tehter'),cs=$('page-casestudy'),csL=$('csList');
function show(p){home.hidden=p!=='home';tp.hidden=p!=='tehter';cs.hidden=p!=='casestudy';dispatchEvent(new Event('resize'))}
function route(){const h=location.hash;
 if(h.indexOf('#/tehter')===0){show('tehter')}
 else if(h.indexOf('#/case-studies')===0){show('casestudy');const id=h.split('/')[2]||'',d=document.querySelector('.cs-detail[data-cs="'+id+'"]');csL.hidden=!!d;document.querySelectorAll('.cs-detail').forEach(x=>x.hidden=x!==d)}
 else{show('home')}}
addEventListener('hashchange',route);route();
document.querySelectorAll('[data-open]').forEach(c=>c.addEventListener('click',()=>{location.hash='#/case-studies/'+c.dataset.open}));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{location.hash='#/case-studies'}));
document.querySelectorAll('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.getElementById(a.dataset.scroll);if(t)jumpTo(t.getBoundingClientRect().top+scrollY-(a.dataset.scroll==='industries'?0:80))}));
document.querySelectorAll('[data-dlg-close]').forEach(b=>b.addEventListener('click',()=>dm.close()));
})();
(function(){
const F=[["Manual data comparison","Engineers manually compare hundreds of order details against design blue prints by hand.","The system automatically cross-checks order files and ble prints in under 3 seconds."],
["Quantity mismatches","Cut parts fall short of required shipping amounts, leading to delivery delays and wasted material.","The system catches missing quantity immediately before left over material is thrown away."],
["Fragmented information","Design files, production systems, business records and white boards remain separate and uncoordinated.","Connect all data sources into a single, unified view updated in real time."],
["Slow verification","Supervisors spend the end of each shift manually ensuring that every final assembly includes all required sub-parts.","The system automatically verifies that every sub-component matches the job order."],
["Material planning","Ordering too much stocks or stopping the line due to uncounted-far scrapped parts.","Smart forecast show live material usage directly compared against actual project needs."],
["Limited visibility","Managers walk the factory floor to count pallets and track progress in person.","Smart cameras and sensors provide live, floor-wide status tracking across every workstation."]];
let mode=0;const host=$('tpFr'),sg=$('tpSg');
function fr(){host.innerHTML=F.map(r=>'<div class="tp-r"><h3>'+r[0]+'</h3><p class="'+(mode?'good':'')+'">'+r[1+mode]+'</p></div>').join('')}
sg.onclick=e=>{const b=e.target.closest('button');if(!b)return;mode=+b.dataset.m;[...sg.children].forEach(x=>x.setAttribute('aria-pressed',x===b));fr()};fr();
})();

(function(){const bt=[...document.querySelectorAll('.lpl button')];let cur=0,tm;
function go(i){cur=i;bt.forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-pressed',j===i);$('lpn'+j).classList.toggle('on',j===i);$('lpt'+j).classList.toggle('on',j===i)})}
bt.forEach((b,i)=>{b.onclick=()=>{clearInterval(tm);go(i)};b.onmouseenter=()=>{clearInterval(tm);go(i)}});
go(0);if(!calm)tm=setInterval(()=>go((cur+1)%bt.length),3200)})();

(function(){
const vz=document.querySelector('.vsp');if(!vz)return;
const cv=document.createElement('canvas'),g=cv.getContext('2d');vz.appendChild(cv);let W=0,H=0,R=48;
const cl=v=>Math.max(0,Math.min(1,v)),col=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const n=34,P=[];for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),t=i*2.399963;P.push([Math.cos(t)*r,y,Math.sin(t)*r])}
let ay=0,ax=.35,run=true,t0=0;const st={x:.5,y:.5,on:false};
const card=vz.closest('.stc')||vz;
card.addEventListener('pointermove',e=>{const r=vz.getBoundingClientRect();st.x=cl((e.clientX-r.left)/r.width);st.y=cl((e.clientY-r.top)/r.height);st.on=true});
card.addEventListener('pointerleave',()=>{st.on=false});
function ball(x,y,r,c1,c2){const q=g.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.beginPath();g.arc(x,y,r,0,6.283);g.fill()}
function draw(dt){const nv=col('--nv'),or=col('--or');
 ay+=(.006+(st.on?(st.x-.5)*.05:0))*dt/16;ax+=((st.on?.3-(st.y-.5)*1.2:.35)-ax)*.08;
 const cA=Math.cos(ay),sA=Math.sin(ay),cB=Math.cos(ax),sB=Math.sin(ax);
 const Q=P.map((q,i)=>{const x1=q[0]*cA+q[2]*sA,z1=-q[0]*sA+q[2]*cA,y2=q[1]*cB-z1*sB,z2=q[1]*sB+z1*cB,s=1/(1-z2*.22);return{x:W/2+x1*R*s,y:H/2+y2*R*s,z:z2,i,s}});
 g.clearRect(0,0,W,H);g.lineWidth=1;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const a=P[i],b=P[j],d=Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);if(d<.8){const A=Q[i],B=Q[j];g.globalAlpha=(.2+.5*((A.z+B.z)/2+1)/2)*(1-d/.95);g.strokeStyle=nv;g.beginPath();g.moveTo(A.x,A.y);g.lineTo(B.x,B.y);g.stroke()}}
 const items=[...Q,{core:1,z:0}].sort((a,b)=>a.z-b.z);
 for(const it of items){if(it.core){g.globalAlpha=1;g.save();g.shadowColor=or;g.shadowBlur=18;ball(W/2,H/2,Math.max(8,R*.25),'#ffb08a',or);g.restore();continue}
  const o=[3,12,21].includes(it.i),r=(1.5+(it.z+1)*1.3)*it.s;g.globalAlpha=.4+.55*(it.z+1)/2;g.fillStyle=o?or:nv;g.beginPath();g.arc(it.x,it.y,o?r+1.1:r,0,6.283);g.fill()}
 g.globalAlpha=1}
function size(){const d=Math.min(devicePixelRatio||1,2);W=vz.clientWidth;H=vz.clientHeight;cv.width=W*d;cv.height=H*d;cv.style.width=W+'px';cv.style.height=H+'px';g.setTransform(d,0,0,d,0,0);R=Math.min(H*.42,W*.3);if(calm)draw(16)}
size();new ResizeObserver(size).observe(vz);
new IntersectionObserver(e=>{run=e[0].isIntersecting}).observe(vz);
function loop(t){if(run)draw(Math.min(t-t0||16,50));t0=t;requestAnimationFrame(loop)}
if(!calm)requestAnimationFrame(loop);
})();

;
(function(){
var NS="http://www.w3.org/2000/svg",svg=document.getElementById("l4"),calm=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
function el(t,a,p,x){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e}
var lanes=["Customer","Engineering","Production","Quality","Logistics"],LH=66,Y0=14;
lanes.forEach(function(n,i){el("rect",{x:0,y:Y0+i*LH,width:520,height:LH-4,rx:12,fill:i%2?"var(--sf)":"var(--tint)",stroke:"var(--line)"},svg);el("text",{x:12,y:Y0+i*LH+(LH-4)/2+4,"font-size":12.5,"font-weight":700,fill:"var(--head)"},svg,n)});
var steps=[[0,0,["Place","order"]],[1,1,["Release","drawings"]],[2,1,["Nest and","CAM"]],[3,2,["Cut","parts"]],[4,3,["Inspect"]],[5,4,["Pack and","ship"]],[6,0,["Receive","order"]]];
function X(c){return 117+c*61}function Y(l){return Y0+l*LH+(LH-4)/2}
var d=steps.map(function(s,i){var x=X(s[0]),y=Y(s[1]);if(!i)return"M"+x+" "+y;var py=Y(steps[i-1][1]);return"L"+x+" "+py+"L"+x+" "+y}).join("");
var path=el("path",{d:d,fill:"none",stroke:"var(--nv)","stroke-opacity":.4,"stroke-width":2,"stroke-linejoin":"round"},svg);
steps.forEach(function(s){var x=X(s[0]),y=Y(s[1]),g=el("g",{},svg);el("rect",{x:x-28,y:y-18,width:56,height:36,rx:9,fill:"var(--sf)",stroke:"var(--nv)","stroke-width":1.6},g);
 s[2].forEach(function(l,k){el("text",{x:x,y:y+(s[2].length>1?(k?11:-1.5):4),"text-anchor":"middle","font-size":10.5,"font-weight":600,fill:"var(--head)"},g,l)})});
[[1,"Drawings = PO",0],[2,"Nest = PO?",1],[4,"Cut = nest",0],[5,"QC = ship",0]].forEach(function(c){
 var a=steps[c[0]-1],b=steps[c[0]],fl=c[2],x=X(b[0]),cy,cx=x;
 if(c[0]===2){cy=Y(1)-24}else{cy=(Y(a[1])+Y(b[1]))/2}
 var g=el("g",{transform:"translate("+cx+" "+cy+")"},svg),r=c[0]===2?6:8;
 el("path",{d:"M0 -"+r+"L"+r+" 0L0 "+r+"L-"+r+" 0Z",fill:fl?"var(--or)":"var(--ok)",stroke:"var(--sf)","stroke-width":2},g);
 el("text",{x:r+5,y:3.8,"font-size":10.5,"font-weight":700,fill:fl?"var(--or)":"var(--mute)",stroke:"var(--sf)","stroke-width":3,"paint-order":"stroke"},g,fl?"\u22124 parts":c[1])});
var dot=el("circle",{r:6,fill:"var(--or)"},svg);
if(!calm){el("animateMotion",{dur:"10s",repeatCount:"indefinite",path:d},dot)}else{dot.setAttribute("cx",X(0));dot.setAttribute("cy",Y(0))}
})();

  } catch (err) { console.error('tensorix init failed', err); }
  return () => {
    dead = true;
    L.forEach(([k, t, f, o]) => (k === 'w' ? win : win.document).removeEventListener(t, f, o));
    T.forEach(([k, id]) => (k === 't' ? win.clearTimeout(id) : win.clearInterval(id)));
    O.forEach((x) => x.disconnect());
  };
}