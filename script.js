// ELECTRIC INTRO ANIMATION
window.addEventListener('DOMContentLoaded', function () {
  let intro = document.getElementById('electricIntro');
  let darkroom = intro.querySelector('.darkroom');
  let filament = document.getElementById('filament');
  let bulbGlass = document.getElementById('bulbGlass');
  let introText = document.getElementById('introText');
  let sparkGroup = document.getElementById('sparkGroup');
  let wire = document.getElementById('wirePath');

  // Animate "current" flowing in stages: fade in wire highlight, add sparks, then bulb.
  setTimeout(()=>{
    // Animate current flow on wire
    wire.setAttribute('stroke', '#08f7fe');
    animateCurrentSpark(wire, sparkGroup);

    // Insert battery animation
    bulbGlass.setAttribute('fill', '#22282a');

    setTimeout(()=> {
      // Highlight bulb filament as "current" arrives
      filament.setAttribute('opacity','1');
      bulbGlass.setAttribute('fill','#fed766');
      // Sparks at bulb
      addSpark(740,330, sparkGroup, '#fed766');
    }, 1300);

    // Fade out darkroom as bulb lights
    setTimeout(()=>{
      darkroom.style.opacity = 0;
      introText.style.opacity = 1;
    }, 2100);

    // Fade out intro after bulb/on+text revealed
    setTimeout(()=>{
      intro.style.opacity = 0;
      setTimeout(()=>{ intro.style.display = "none"; document.getElementById('mainUI').style.opacity = 1; }, 700);
    }, 3500);
  }, 800);
});

// Helper: Draw animated sparks along the wire
function animateCurrentSpark(wire, sparkGroup) {
  // get wire path points
  let pts = wire.getAttribute('points').split(' ').map(x=>x.split(',').map(Number)).filter(x=>x.length===2);
  let i = 0;
  function sparkStep() {
    if(i<pts.length-1) {
      let [x1,y1]=pts[i], [x2,y2]=pts[i+1];
      let cx = (x1*2+x2)/3, cy = (y1*2+y2)/3+ (Math.random()-0.5)*8;
      addSpark(cx,cy,sparkGroup,'#08f7fe');
      setTimeout(sparkStep,180);
      i++;
    }
  }
  sparkStep();
}
function addSpark(x,y,g,color){
  for(let n=0; n<3; n++){
    let a = Math.random()*2*Math.PI, r = 8+Math.random()*8;
    let sx = x+r*Math.cos(a), sy = y+r*Math.sin(a);
    let sp = document.createElementNS("http://www.w3.org/2000/svg","line");
    sp.setAttribute('x1',x); sp.setAttribute('y1',y);
    sp.setAttribute('x2',sx);sp.setAttribute('y2',sy);
    sp.setAttribute('stroke', color || '#fed766');
    sp.setAttribute('stroke-width','1.6');
    sp.setAttribute('opacity','0.9');
    sp.style.transition = "opacity 0.4s";
    g.appendChild(sp);
    setTimeout(()=>{ sp.setAttribute('opacity','0'); }, 280+n*25);
    setTimeout(()=>{ if(g.contains(sp)) g.removeChild(sp); }, 800+n*60);
  }
}

window.showHome = function () {
  // Hide all info sections and show grid
  document.querySelectorAll('.section-info').forEach(s=>{ s.style.display='none'; });
  document.getElementById('topicGrid').style.display = 'grid';
  document.getElementById('backBtn').style.display = 'none';
  document.body.style.background = "";
  window.scrollTo(0,0);
};

window.showTopic = function(sectionId, accent) {
  document.querySelectorAll('.section-info').forEach(s=>{ s.style.display='none'; s.classList.remove('active') });
  document.getElementById('topicGrid').style.display = 'none';
  let sec = document.getElementById(sectionId);
  document.getElementById('backBtn').style.display = 'inline-block';
  if (sec) { sec.style.display = 'block'; sec.classList.add('active'); }
  document.body.style.background = `linear-gradient(115deg, ${accent} 7%, #232946 80%)`;
  window.scrollTo(0,0);

  // Call SVG diagram animation initializers as needed:
  if(sectionId==='humanEye')       animateEyeDiagram();
  else if(sectionId==='defects')   animateDefectsDiagram();
  else if(sectionId==='prismDispersion') animatePrismDiagram();
  else if(sectionId==='atmoRefraction')  animateAtmosRefraction();
  else if(sectionId==='scattering')      animateScatterDiagram();
};

/* ----------- Placeholder SVG Diagram Animations ----------- */
function animateEyeDiagram() {
  let box = document.getElementById('animEye');
  box.innerHTML = `
  <svg width="330" height="180" viewBox="0 0 330 180">
    <ellipse cx="165" cy="90" rx="120" ry="58" fill="none" stroke="#08f7fe" stroke-width="4"/>
    <ellipse cx="165" cy="90" rx="36" ry="36" fill="#2cd6ff33" stroke="#067cc6" stroke-width="3"/>
    <circle id="pupil" cx="165" cy="98" r="14" fill="#232946" stroke="#311" stroke-width="1.5"/>
    <line x1="165" y1="98" x2="130" y2="120" stroke="#fed766" stroke-width="2" marker-end="url(#arw)"/>
    <defs>
      <marker id="arw" markerWidth="10" markerHeight="10" refX="4" refY="3" orient="auto">
        <polygon points="0,0 10,3 0,6" fill="#fed766"/>
      </marker>
    </defs>
    <!-- Labels -->
    <text x="125" y="130" font-size="13" fill="#222">Retina</text>
    <text x="190" y="75" font-size="13" fill="#07a">Lens</text>
    <text x="110" y="65" font-size="13" fill="#222">Cornea</text>
    <text x="155" y="68" font-size="13" fill="#b7b">Iris</text>
    <text x="148" y="100" font-size="12" fill="#477">Pupil</text>
  </svg>`;
}
function animateDefectsDiagram() {
  let box = document.getElementById('animDefects');
  box.innerHTML = `
  <svg width="340" height="140" viewBox="0 0 340 140">
    <ellipse cx="90" cy="70" rx="30" ry="50" fill="none" stroke="#bbb" stroke-width="2"/>
    <line x1="20" y1="40" x2="150" y2="80" stroke="#08f7fe" stroke-width="3"/>
    <circle cx="150" cy="80" r="7" fill="#fed766"/>
    <text x="10" y="38" font-size="13" fill="#028">Incoming rays</text>
    <text x="155" y="80" font-size="13" fill="#fed766">Focus</text>
    <rect x="75" y="50" width="10" height="60" fill="none" stroke="#eeff00" stroke-dasharray="2,2"/>
    <text x="170" y="25" font-size="12" fill="#777">Eyeball (myopia demo)</text>
  </svg>`;
}
function animatePrismDiagram() {
  let box = document.getElementById('animPrism');
  box.innerHTML = `
  <svg width="392" height="180" viewBox="0 0 392 180">
    <polygon points="120,80 280,40 280,140" fill="none" stroke="#4bfaff" stroke-width="4"/>
    <line x1="50" y1="100" x2="130" y2="85" stroke="#fed766" stroke-width="4" marker-end="url(#warw)"/>
    <defs>
      <marker id="warw" markerWidth="16" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="0,0 16,5 0,10" fill="#fed766"/>
      </marker>
    </defs>
    <!-- Dispersion rays -->
    <line x1="200" y1="100" x2="340" y2="76" stroke="#fa4444" stroke-width="2"/>
    <line x1="212" y1="106" x2="340" y2="94" stroke="#ffb827" stroke-width="2"/>
    <line x1="225" y1="110" x2="340" y2="106" stroke="#ffe243" stroke-width="2"/>
    <line x1="228" y1="120" x2="340" y2="124" stroke="#1afa2f" stroke-width="2"/>
    <line x1="238" y1="127" x2="340" y2="142" stroke="#0afaff" stroke-width="2"/>
    <line x1="246" y1="134" x2="340" y2="156" stroke="#754ce6" stroke-width="2"/>
    <!-- VIBGYOR labels -->
    <text x="350" y="80" font-size="13" fill="#fa4444">V</text>
    <text x="350" y="95" font-size="13" fill="#ffb827">I</text>
    <text x="350" y="107" font-size="13" fill="#ffe243">B</text>
    <text x="350" y="125" font-size="13" fill="#1afa2f">G</text>
    <text x="350" y="143" font-size="13" fill="#0afaff">B</text>
    <text x="350" y="158" font-size="13" fill="#754ce6">O/R</text>
  </svg>`;
}
function animateAtmosRefraction() {
  let box = document.getElementById('animAtmo');
  box.innerHTML = `
  <svg width="380" height="140" viewBox="0 0 380 140">
    <ellipse cx="190" cy="90" rx="120" ry="25" fill="#90a8ff15"/>
    <circle cx="60" cy="110" r="15" fill="#ff9900"/>
    <circle cx="60" cy="110" r="7" fill="#ffd600"/>
    <line x1="60" y1="110" x2="320" y2="35" stroke="#fed766" stroke-width="3" stroke-dasharray="4,4"/>
    <line x1="100" y1="80" x2="320" y2="50" stroke="#ffec45" stroke-width="2"/>
    <text x="25" y="120" font-size="12" fill="#ffec45">Sun</text>
    <text x="298" y="38" font-size="13" fill="#fff">Apparent sun</text>
    <text x="70" y="87" font-size="12" fill="#90a8ff">Atmospheric layers</text>
  </svg>`;
}
function animateScatterDiagram() {
  let box = document.getElementById('animScatter');
  box.innerHTML = `
  <svg width="330" height="140" viewBox="0 0 330 140">
    <circle cx="40" cy="90" r="22" fill="#fed766"/>
    <circle cx="40" cy="90" r="11" fill="#fffbe6" fill-opacity="0.4"/>
    <ellipse cx="170" cy="100" rx="120" ry="30" fill="#47b0ff22"/>
    <!-- blue scatter -->
    <line x1="45" y1="110" x2="130" y2="65" stroke="#47b0ff" stroke-width="3"/>
    <line x1="45" y1="110" x2="230" y2="125" stroke="#47b0ff" stroke-width="2"/>
    <!-- red-orange long-path -->
    <line x1="45" y1="110" x2="300" y2="40" stroke="#fed766" stroke-width="3"/>
    <text x="15" y="86" font-size="13" fill="#fed766">Sunlight</text>
    <text x="255" y="125" font-size="13" fill="#47b0ff">Blue scattered</text>
    <text x="290" y="50" font-size="13" fill="#ffae00">Reddish seen</text>
  </svg>`;
}
