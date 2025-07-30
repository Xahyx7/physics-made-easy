// ===== ELECTRIC INTRO ANIMATION =====
window.addEventListener('DOMContentLoaded', function () {
  // Draw circuit in SVG
  const svg = document.getElementById('circuitSVG');
  const wirePath = [[60, 295],[180,295],[180,80],[615,80],[615,295],[740,295]];
  let wire = svgWire(svg, wirePath, "#5cf4ff", 8, "round");
  let battery = svgRect(svg, 45, 270, 34, 52, 7, "#14151b", "#fed766", 3);
  svgLine(svg, 43, 287, 34, 287, "#fed766", 3); // Battery terminal
  svgLine(svg, 79, 308, 87, 308, "#fed766", 3); // Battery terminal
  svgEllipse(svg,740,295,25,14,"#888e96");
  let bulb = svgCircle(svg,740,265,33,"#111c20","#aaa",2);
  let filament = svgWire(svg,[[740,295],[740,277],[732,270],[748,270],[740,277]],"#fed766",2,"round");
  filament.setAttribute('opacity','0');
  let sparkG = document.createElementNS("http://www.w3.org/2000/svg","g");svg.appendChild(sparkG);

  setTimeout(()=>{
    wire.setAttribute("stroke","#08f7fe");
    animateSparksOnWire(wirePath,sparkG,"#08f7fe",16);
    setTimeout(()=>{
      filament.setAttribute("opacity","1");
      bulb.setAttribute("fill","#fed766");
      document.querySelector('.bulb-light-glow').style.opacity=1;
      svgSpark(sparkG,740,265,'#fed766',18);
    },1300);
    setTimeout(()=>{
      document.querySelector('.dark-overlay').style.opacity=0;
      document.getElementById('introText').style.opacity=1;
    },2100);
    setTimeout(()=>{
      document.getElementById('electricIntro').style.opacity=0;
      setTimeout(()=>{ document.getElementById('electricIntro').style.display="none"; document.getElementById('mainUI').style.opacity=1;},600);
    },3400);
  },850);
});

function svgWire(svg,pts,color,wid,cap){
  let pl= document.createElementNS("http://www.w3.org/2000/svg","polyline");
  pl.setAttribute('points',pts.map(p=>p.join(',')).join(' '));
  pl.setAttribute('fill','none');
  pl.setAttribute('stroke',color); pl.setAttribute('stroke-width',wid);
  pl.setAttribute('stroke-linecap',cap||"round");
  svg.appendChild(pl); return pl;
}
function svgRect(svg,x,y,w,h,rx,fill,stroke,sw){
  let r= document.createElementNS("http://www.w3.org/2000/svg","rect");
  r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width',w);r.setAttribute('height',h);
  r.setAttribute('rx',rx);r.setAttribute('fill',fill);r.setAttribute('stroke',stroke);r.setAttribute('stroke-width',sw);
  svg.appendChild(r);return r;
}
function svgCircle(svg,cx,cy,r,fill,stroke,sw){
  let c=document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r',r);
  c.setAttribute('fill',fill||'none');if(stroke)c.setAttribute('stroke',stroke);if(sw)c.setAttribute('stroke-width',sw);
  svg.appendChild(c);return c;
}
function svgEllipse(svg,cx,cy,rx,ry,fill){
  let e=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
  e.setAttribute('cx',cx);e.setAttribute('cy',cy);e.setAttribute('rx',rx);e.setAttribute('ry',ry);
  e.setAttribute('fill',fill||'none');svg.appendChild(e);return e;
}
function svgLine(svg,x1,y1,x2,y2,stroke,sw){
  let l=document.createElementNS("http://www.w3.org/2000/svg","line");
  l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);
  l.setAttribute('stroke',stroke);l.setAttribute('stroke-width',sw||2);
  svg.appendChild(l); return l;
}
function svgSpark(g,x,y,col,cnt){
  for(let i=0;i<cnt;i++){
    let a=2*Math.PI*i/cnt+Math.random()*0.4;let r=13+Math.random()*8;
    let x2=x+r*Math.cos(a),y2=y+r*Math.sin(a);
    let l=document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute('x1',x);l.setAttribute('y1',y);l.setAttribute('x2',x2);l.setAttribute('y2',y2);l.setAttribute('stroke',col);
    l.setAttribute('stroke-width','1.2');l.setAttribute('opacity','0.97'); g.appendChild(l);
    setTimeout(()=>{l.setAttribute('opacity','0');},300+40*i);setTimeout(()=>{g.removeChild(l)},700+60*i);
  }
}
function animateSparksOnWire(pathArr,g,col,cnt){
  let t=0; function one(){ if(t>=pathArr.length-1)return;
    let [x1,y1]=pathArr[t], [x2,y2]=pathArr[t+1];
    let dx=x2-x1,dy=y2-y1; let L=Math.sqrt(dx*dx+dy*dy);
    for(let s=0;s<L;s+=13+13*Math.random()){
      let xf=x1+dx*(s/L), yf=y1+dy*(s/L)+(Math.random()-.5)*9;
      svgSpark(g,xf,yf,col,7+Math.floor(3*Math.random()));
    } t++; setTimeout(one,140);}
  one();
}

// ===== GUI Navigation =====
window.showHome=function(){
  document.querySelectorAll('.topic-section').forEach(s=>s.style.display='none');
  document.getElementById('topicGrid').style.display='grid';
  document.getElementById('backBtn').style.display='none';
  document.body.style.background="";
  window.scrollTo(0,0);
}
window.showTopic=function(sectionId,accent){
  document.querySelectorAll('.topic-section').forEach(s=>{s.style.display='none';s.classList.remove('active')});
  document.getElementById('topicGrid').style.display='none';
  let section=document.getElementById(sectionId);
  document.getElementById('backBtn').style.display='inline-block';
  if(section){section.style.display='block';section.classList.add('active');}
  document.body.style.background=`linear-gradient(115deg,${accent} 7%,#232946 80%)`;
  window.scrollTo(0,0);
};

// ===== SVG ICONS FOR TOPICS =====
function setTopicIcons(){
  document.getElementById('icon-humanEye').innerHTML=
    `<svg width="50" height="50"><ellipse cx="25" cy="25" rx="19" ry="10" fill="none" stroke="#2cf6ff" stroke-width="3"/><circle cx="25" cy="25" r="7.5" fill="#74fff4" stroke="white" stroke-width="2"/><animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/></svg>`;
  document.getElementById('icon-defects').innerHTML=
    `<svg width="50" height="50"><ellipse cx="25" cy="25" rx="9" ry="19" fill="none" stroke="#fed766" stroke-width="3"/><rect x="12" y="19" width="26" height="12" fill="none" stroke="#eeff00" stroke-width="1.5"/><circle cx="25" cy="25" r="3" fill="#fed766"/></svg>`;
  document.getElementById('icon-dispersion').innerHTML=
    `<svg width="50" height="50"><polygon points="12,36 38,36 25,12" fill="none" stroke="#4bfaff" stroke-width="2"/><line x1="13" y1="29" x2="37" y2="29" stroke="#fed766" stroke-width="2"/><line x1="25" y1="18" x2="25" y2="37" stroke="#ff4777" stroke-width="2"/></svg>`;
  document.getElementById('icon-refraction').innerHTML=
    `<svg width="50" height="50"><ellipse cx="25" cy="30" rx="18" ry="7" fill="none" stroke="#90a8ff" stroke-width="2"/><circle cx="13" cy="20" r="3" fill="#fdc801"/><circle cx="37" cy="16" r="1.7" fill="white"/><line x1="13" y1="20" x2="38" y2="37" stroke="#ffec45" stroke-width="2"/></svg>`;
  document.getElementById('icon-scattering').innerHTML=
    `<svg width="50" height="50"><circle cx="24" cy="32" r="14" fill="none" stroke="#47b0ff" stroke-width="3"/><circle cx="24" cy="18" r="6.5" fill="#47b0ff" fill-opacity=".6"/><line x1="24" y1="18" x2="38" y2="12" stroke="#47b0ff" stroke-width="2" /><animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/></svg>`;
}
window.addEventListener('DOMContentLoaded',setTopicIcons);

// ===== SVG DIAGRAMS AND INTERACTIVITY =====
window.addEventListener('DOMContentLoaded', ()=>{
  // THE HUMAN EYE: SVG ANIMATION + LABEL INTERACTIVITY
  document.getElementById('eyeAllSVG').innerHTML=
    `<svg width="360" height="200" viewBox="0 0 360 200">
      <ellipse cx="180" cy="100" rx="120" ry="55" fill="none" stroke="#00f4d3" stroke-width="4"/>
      <ellipse cx="180" cy="100" rx="40" ry="40" fill="#90d7ff33" stroke="#0cf" stroke-width="2"/>
      <circle cx="180" cy="110" r="15" fill="#333" stroke="#fed766" stroke-width="2"/>
      <ellipse cx="180" cy="100" rx="18" ry="34" fill="#149" fill-opacity=".25" stroke="#b7f" stroke-width="1.5"/>
      <ellipse cx="140" cy="97" rx="17" ry="8" fill="none" stroke="#fed766" stroke-width="2"/>
      <polyline points="180,110 130,135" fill="none" stroke="#ff9532" stroke-width="2" marker-end="url(#n1)"/>
      <defs>
          <marker id="n1" markerWidth="12" markerHeight="12" refX="2" refY="6" orient="auto">
            <polygon points="0,0 12,6 0,12" fill="#ff9532"/>
          </marker>
      </defs>
      <text x="110" y="150" font-size="14" fill="#232a55" style="cursor:pointer;">Retina</text>
      <text x="195" y="80" font-size="13" fill="#0078ff">Lens</text>
      <text x="125" y="80" font-size="13" fill="#00f4d3">Cornea</text>
      <text x="160" y="97" font-size="13" fill="#8fa">Iris</text>
      <text x="173" y="124" font-size="11" fill="#477">Pupil</text>
    </svg>`;
  // EYE DEFECTS: Animated
  document.getElementById('defectSVG').innerHTML=
    `<svg width="310" height="170" viewBox="0 0 310 170">
      <ellipse cx="80" cy="85" rx="28" ry="50" fill="none" stroke="#bbb" stroke-width="2"/>
      <ellipse cx="80" cy="85" rx="11" ry="16" fill="#f6ead3" stroke="#fed766"/>
      <line x1="20" y1="50" x2="143" y2="100" stroke="#08f7fe" stroke-width="3"/>
      <circle cx="143" cy="100" r="8" fill="#fed766"/>
      <text x="10" y="47" font-size="12" fill="#06fefa">Incident Rays</text>
      <text x="147" y="100" font-size="12" fill="#fed766">Myopic Focus</text>
      <rect x="67" y="55" width="7" height="60" fill="none" stroke="#eeff00" stroke-dasharray="2,2"/>
      <text x="110" y="30" font-size="12" fill="#78e">Myopic Eye</text>
      <polyline points="20,120 55,90 70,90" fill="none" stroke="#fa3737" stroke-width="2"/>
      <text x="25" y="120" fill="#fa3737" font-size="11">Concave Lens</text>
    </svg>`;
  // PRISM & DISPERSION
  document.getElementById('prismSVG').innerHTML=
    `<svg width="380" height="170" viewBox="0 0 400 180">
      <polygon points="110,150 290,150 200,50" fill="none" stroke="#4bfaff" stroke-width="4"/>
      <line x1="45" y1="123" x2="110" y2="130" stroke="#fff" stroke-width="3" marker-end="url(#arrw)"/>
      <line x1="245" y1="100" x2="340" y2="60" stroke="violet" stroke-width="2"/>
      <line x1="250" y1="110" x2="340" y2="100" stroke="blue" stroke-width="2"/>
      <line x1="255" y1="120" x2="340" y2="130" stroke="green" stroke-width="2"/>
      <line x1="265" y1="130" x2="345" y2="162" stroke="red" stroke-width="3"/>
      <defs>
        <marker id="arrw" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#fff"/>
        </marker>
      </defs>
      <text x="60" y="110" font-size="14" fill="#fff">White Light</text>
      <text x="345" y="59" font-size="12" fill="violet">Violet</text>
      <text x="345" y="166" font-size="12" fill="red">Red</text>
      <text x="195" y="100" font-size="12" fill="#222">Prism</text>
    </svg>`;
  // ATMOSPHERIC REFRACTION
  document.getElementById('refractionSVG').innerHTML=
    `<svg width="350" height="160" viewBox="0 0 350 160">
      <ellipse cx="175" cy="100" rx="120" ry="25" fill="#90a8ff15"/>
      <circle cx="40" cy="140" r="12" fill="#fdc801"/>
      <text x="18" y="130" font-size="12" fill="#ffec45">Sun</text>
      <line x1="40" y1="140" x2="270" y2="60" stroke="#fed766" stroke-width="3" stroke-dasharray="4,4"/>
      <circle cx="260" cy="60" r="7" fill="#fed766"/>
      <text x="265" y="54" font-size="12" fill="#fed766">Apparent Sun</text>
    </svg>`;
  // SCATTERING & TYNDALL
  document.getElementById('scatteringSVG').innerHTML=
    `<svg width="350" height="140" viewBox="0 0 350 140">
      <circle cx="40" cy="90" r="22" fill="#fed766"/>
      <ellipse cx="180" cy="105" rx="110" ry="22" fill="#47b0ff22"/>
      <line x1="55" y1="115" x2="230" y2="45" stroke="#47b0ff" stroke-width="3"/>
      <line x1="55" y1="115" x2="310" y2="70" stroke="#fed766" stroke-width="3"/>
      <text x="19" y="86" font-size="13" fill="#fed766">Sunlight</text>
      <text x="220" y="47" font-size="13" fill="#47b0ff">Blue scatter</text>
      <text x="270" y="80" font-size="13" fill="#ffae00">Red path</text>
    </svg>`;
});

// SVG label-button interactivity for eye diagram
function showSVGInfo(part){
  const infoBox = document.getElementById('svgInfoArea');
  const infoMap = {
   "corneaHuman": "<b>Cornea:</b> Transparent dome, main refraction, protects.",
   "irisHuman": "<b>Iris:</b> Colored muscle, controls light (pupil size).",
   "pupilHuman": "<b>Pupil:</b> Adjusts for lighting, opens/closes.",
   "lensHuman": "<b>Lens:</b> Changes shape for focus/clarity.",
   "retinaHuman": "<b>Retina:</b> Records image (rods and cones)."
  };
  infoBox.innerHTML = infoMap[part] || "";
}
