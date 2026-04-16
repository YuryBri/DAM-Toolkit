// ==========================================
// DAM TOOLKIT - GLOBAL LOGIC
// ==========================================

// Tree Management
function buildTreeHTML(data, path = '') {
  return '<ul class="tree">' + data.map(item => {
    const isFile = item.name.includes('.');
    const hasChildren = item.children && item.children.length > 0;
    const isFolder = !isFile;
    const newPath = path ? path + '/' + item.name : item.name;
    return `
      <li class="${hasChildren ? 'has-children' : ''}">
        <div class="titem" onclick="${hasChildren ? 'toggleTree(this)' : 'copyPath(\'' + newPath + '\')'}">
          <span style="width:${hasChildren ? 'auto' : '10px'}">
            ${hasChildren ? '<i class="fas fa-chevron-right tog"></i>' : ''}
          </span>
          <i class="${isFolder ? 'fas fa-folder fi2' : 'fas fa-file leaf'}"></i>
          <span>${item.name}</span>
          ${isFile || !hasChildren ? '<span class="tpath">/' + newPath + '</span>' : ''}
        </div>
        ${hasChildren ? buildTreeHTML(item.children, newPath) : ''}
      </li>
    `;
  }).join('') + '</ul>';
}

function toggleTree(element) {
  const li = element.parentElement;
  li.classList.toggle('open');
  const icon = element.querySelector('.fi2');
  if (icon) {
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  }
}

function copyPath(path) {
  if (window.copyText) {
    navigator.clipboard.writeText('/' + path).then(() => {
      document.getElementById('tmsg').textContent = 'Ruta copiada: /' + path;
      const t = document.getElementById('toast');
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2200);
    });
  }
}

function expandTreeAll() {
  document.querySelectorAll('#sirv-tree .has-children').forEach(li => {
    li.classList.add('open');
    const icon = li.querySelector('.fi2');
    if (icon) {
      icon.classList.remove('fa-folder');
      icon.classList.add('fa-folder-open');
    }
  });
}

function collapseTreeAll() {
  document.querySelectorAll('#sirv-tree .has-children').forEach(li => {
    li.classList.remove('open');
    const icon = li.querySelector('.fi2');
    if (icon) {
      icon.classList.remove('fa-folder-open');
      icon.classList.add('fa-folder');
    }
  });
  const firstLi = document.querySelector('#sirv-tree > ul > li.has-children');
  if (firstLi) {
    firstLi.classList.add('open');
    const icon = firstLi.querySelector('.fi2');
    if (icon) {
      icon.classList.remove('fa-folder');
      icon.classList.add('fa-folder-open');
    }
  }
}

function filterTree(query) {
  document.querySelectorAll('#sirv-tree .titem').forEach(el => {
    el.style.background = '';
    el.style.color = '';
    const nameNode = el.querySelector('span:nth-child(3)');
    const name = nameNode ? nameNode.textContent.toLowerCase() : '';
    
    if (query && name.includes(query.toLowerCase())) {
      el.style.background = 'rgba(0,82,204,.3)';
      el.style.color = '#fff';
      
      let parentLi = el.closest('li').parentElement.closest('li');
      while (parentLi) {
        parentLi.classList.add('open');
        const icon = parentLi.querySelector('.fi2');
        if (icon) {
          icon.classList.remove('fa-folder');
          icon.classList.add('fa-folder-open');
        }
        parentLi = parentLi.parentElement.closest('li');
      }
    }
  });
}

const CATEGORIES = [
  ['celulares', 'cel'], ['computadores', 'comp'], ['grandes electrodomésticos', 'gelec'], 
  ['pequeños electrodomésticos', 'pelec'], ['tv', 'tv'], ['accesorios', 'acce'], 
  ['videojuegos', 'viju'], ['audio', 'aud'], ['cámaras', 'cam'], ['pines', 'pin'], 
  ['hogar', 'hog'], ['casa inteligente', 'cain'], ['deportes', 'dep'], ['llantas y motos', 'llamot'], 
  ['juguetes', 'jug'], ['cocina', 'coci'], ['refrigeración', 'refri'], ['lavado', 'lava'], 
  ['smartwatch', 'swatch'], ['audífonos', 'aufo'], ['mercado', 'mer']
];

function buildCategoryGrid() {
  const grid = document.getElementById('codgrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(([name, code]) => `
    <div style="display:flex;justify-content:space-between;background:var(--dk3);padding:3px 6px;border-radius:4px">
      <span style="color:var(--tx3);font-size:10px">${name}</span>
      <code style="font-size:9px">${code}</code>
    </div>
  `).join('');
}

// Interfaz Helpers
function selectTab(btn, tabId) {
  const tabsContainer = btn.closest('.tabs');
  tabsContainer.querySelectorAll('.tbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  document.querySelectorAll('.tc').forEach(c => c.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function setFieldResult(textId, btnId, text, showBtn) {
  const t = document.getElementById(textId);
  const b = document.getElementById(btnId);
  if (t) {
    t.textContent = text;
    t.className = showBtn ? '' : 'ph2';
  }
  if (b) {
    b.style.display = showBtn ? 'inline-block' : 'none';
  }
}

// URL Dynamics
function buildSirvURL() {
  const base = document.getElementById('ub') ? document.getElementById('ub').value.trim() : '';
  if (!base) {
    setFieldResult('utxt', 'ucpb', 'Ingresa la ruta base...', false);
    if(document.getElementById('upar')) document.getElementById('upar').innerHTML = '';
    return;
  }
  
  const w = document.getElementById('uw').value;
  const h = document.getElementById('uh').value;
  const q = document.getElementById('uq').value;
  const f = document.getElementById('uf').value;
  const th = document.getElementById('uth').checked;
  const sh = document.getElementById('ush').checked;
  
  const params = [];
  if (w) params.push('w=' + w);
  if (h) params.push('h=' + h);
  if (f) params.push('format=' + f);
  if (q != '80') params.push('q=' + q);
  if (th) params.push('thumbnail=' + (w || 256));
  if (sh) params.push('sharpen=30');
  
  const url = `https://cdn.dam.alkosto.com/${base}${params.length ? '?' + params.join('&') : ''}`;
  setFieldResult('utxt', 'ucpb', url, true);
  
  if(document.getElementById('upar')) {
    document.getElementById('upar').innerHTML = params.length 
      ? '<div>' + params.map(x => `<span style="display:inline-block;background:var(--infb);color:var(--inf);padding:2px 7px;border-radius:20px;font-size:11px;font-weight:600;margin:2px">${x}</span>`).join('') + '</div>' 
      : '<p style="font-size:11px;color:var(--tx3)">Sin parámetros — se servirá original.</p>';
  }
}

// Smart Validator
function validateName() {
  const v = document.getElementById('vi') ? document.getElementById('vi').value.trim() : '';
  const vt = document.getElementById('vt') ? document.getElementById('vt').value : '';
  
  if (!v) {
    document.getElementById('vsn').textContent = '—';
    document.getElementById('vtit').textContent = 'Esperando...';
    document.getElementById('vsub').textContent = 'Escribe un nombre para validar';
    document.getElementById('vbar').style.width = '0%';
    document.getElementById('vpct').textContent = '0%';
    document.getElementById('vcks').innerHTML = '';
    document.getElementById('vsugg').innerHTML = '';
    return;
  }
  
  let chks = [
    { ok: v === v.toLowerCase(), l: 'Todo en minúsculas', c: true },
    { ok: !v.includes(' '), l: 'Sin espacios', c: true },
    { ok: !/[áéíóúüñ¿¡@#$%^&*()+\={}\[\]|\\<>]/.test(v), l: 'Sin acentos ni especiales', c: true },
    { ok: !v.includes('_'), l: 'Sin guiones bajos', c: false },
    { ok: !/(final|ok|listo|v\d|copia)/i.test(v), l: 'Sin palabras de versión', c: false },
  ];

  // Specific format checks based on type
  if (vt === 'img') {
    // Maqueta: tipo-uso-detalle.ext
    const parts = v.split('.')[0].split('-');
    const hasCorrectStructure = parts.length >= 3;
    const isRecommendedExt = /\.(webp|svg)$/.test(v);
    const isValidExt = /\.(webp|svg|jpg|jpeg|png)$/.test(v);

    chks.push({ ok: isRecommendedExt, l: 'Formato WebP o SVG ideal', c: false });
    if (!isRecommendedExt && isValidExt) {
      document.getElementById('vsugg').innerHTML = `<div class="al aw" style="margin:0;font-size:11px"><i class="fas fa-magic"></i><span>Sugerencia: Cambiar a WebP para reducir drásticamente el peso.</span></div>`;
    }
    chks.push({ ok: isValidExt, l: 'Extensión de imagen', c: true });
    chks.push({ ok: hasCorrectStructure, l: 'Estructura [tipo]-[uso]-[detalle]', c: true });
    
  } else if (vt === 'ban') {
    // Banner Comercial: tienda-marca-campaña-zona.webp
    const parts = v.split('.')[0].split('-');
    const hasCorrectStructure = parts.length >= 4;
    const hasValidShop = parts.length > 0 && ['ak', 'kt', 'alkp', 'ka'].includes(parts[0]);
    const isWebP = /\.(webp)$/.test(v);

    chks.push({ ok: hasValidShop, l: 'Prefijo tienda (ak, kt, alkp, ka)', c: true });
    chks.push({ ok: hasCorrectStructure, l: 'Estructura [tienda]-[marca]-[campaña]-[zona]', c: true });
    chks.push({ ok: isWebP, l: 'Debe ser WebP', c: true });
    
  } else if (vt === 'vid') {
    chks.push({ ok: /\.(mp4)$/.test(v), l: 'Video en formato MP4', c: true });
  } else {
    // General
    chks.push({ ok: /\.(webp|svg|mp4|pdf|jpg|jpeg|png)$/.test(v), l: 'Extensión válida conocida', c: true });
  }

  const passed = chks.filter(c => c.ok).length;
  const criticalFails = chks.filter(c => !c.ok && c.c).length;
  const score = Math.round((passed / chks.length) * 100);
  
  document.getElementById('vsn').textContent = score;
  document.getElementById('vcirc').className = 'score ' + (criticalFails === 0 && score >= 80 ? 'sh' : score >= 55 ? 'sm' : 'sl');
  document.getElementById('vtit').textContent = criticalFails > 0 ? `${criticalFails} error(es) crítico(s)` : score === 100 ? '¡Nombre perfecto!' : passed + '/' + chks.length + ' reglas';
  document.getElementById('vsub').textContent = criticalFails === 0 ? (score >= 90 ? 'Listo para subir' : 'Puede mejorar') : 'NO se puede subir así';
  
  document.getElementById('vpct').textContent = score + '%';
  document.getElementById('vbar').style.width = score + '%';
  document.getElementById('vbar').className = 'pf ' + (criticalFails === 0 && score >= 80 ? 'blue' : criticalFails === 0 && score >= 55 ? 'yellow' : 'red');
  
  document.getElementById('vcks').innerHTML = chks.map(c => `
    <div class="vi">
      <div class="vd ${c.ok ? 'vok' : c.c ? 'verr' : 'vwn'}">${c.ok ? '✓' : c.c ? '✗' : '!'}</div>
      <span${(!c.ok && c.c) ? ' style="color:var(--er);font-weight:600"' : ''}>
        ${c.l}${(!c.ok && c.c) ? ' <span class="tag tr" style="font-size:9px;margin-left:3px">CRÍTICO</span>' : ''}
      </span>
    </div>
  `).join('');
}


// Weight Calculators (Image & Video)
function swCalc(type) {
  document.getElementById('calc-img').style.display = type === 'img' ? 'block' : 'none';
  document.getElementById('calc-vid').style.display = type === 'vid' ? 'block' : 'none';
  document.getElementById('btn-calc-img').classList.toggle('bs', type !== 'img');
  document.getElementById('btn-calc-img').classList.toggle('bp', type === 'img');
  document.getElementById('btn-calc-vid').classList.toggle('bs', type !== 'vid');
  document.getElementById('btn-calc-vid').classList.toggle('bp', type === 'vid');
}

function calculateImageWeight() {
  if(!document.getElementById('pw')) return;
  const w = parseInt(document.getElementById('pw').value) || 1920;
  const h = parseInt(document.getElementById('ph2').value) || 600;
  const f = document.getElementById('pf').value;
  const q = parseInt(document.getElementById('pq').value) / 100;
  const c = parseFloat(document.getElementById('pc').value);
  
  const px = w * h;
  const md = Math.max(w, h);
  
  let fac = f === 'webp' ? 0.055 * q * c : f === 'svg' ? 0.01 : f === 'jpg' ? 0.09 * q * c : 0.28 * c;
  const estKB = Math.round((px * fac) / 1024);
  
  const lim = md <= 400 ? 40 : md <= 800 ? 80 : md <= 1300 ? 120 : 150;
  const pct = Math.min(100, Math.round((estKB / lim) * 100));
  
  document.getElementById('wnum').textContent = estKB > 999 ? (estKB / 1024).toFixed(1) + 'MB' : estKB;
  const sc = document.getElementById('wsc');
  sc.className = 'score ' + (estKB <= lim ? 'sh' : 'sl');
  
  document.getElementById('wst').textContent = estKB <= lim ? '✓ Dentro del límite' : '⚠ Supera el límite';
  document.getElementById('wds').textContent = `~${estKB > 999 ? (estKB / 1024).toFixed(1) + ' MB' : estKB + ' KB'} estimado · Límite: ${lim} KB`;
  
  document.getElementById('wbr').innerHTML = `
    <div style="font-size:10px;color:var(--tx3);display:flex;justify-content:space-between;margin-bottom:2px">
      <span>vs. límite (${lim} KB)</span>
      <span>${pct}%</span>
    </div>
    <div class="pb">
      <div class="pf ${pct < 70 ? 'green' : pct <= 100 ? 'yellow' : 'red'}" style="width:${pct}%"></div>
    </div>
  `;
}

function calculateVideoWeight() {
  if(!document.getElementById('vw-sec')) return;
  const sec = parseInt(document.getElementById('vw-sec').value) || 15;
  const res = document.getElementById('vw-res').value; // e.g. "1080p", "720p"
  
  // Bitrate estimation in kbps (Very rough web optimization estimation)
  let bitrate = res === '1080p' ? 2500 : res === '720p' ? 1200 : res === '1080p-low' ? 1500 : 800;
  
  // Total size in KB = (Bitrate * sec) / 8
  const estKB = Math.round((bitrate * sec) / 8);
  const estMB = (estKB / 1024).toFixed(2);
  
  // Limits: General video (10MB)
  const limMB = 10;
  const limKB = limMB * 1024;
  const pct = Math.min(100, Math.round((estKB / limKB) * 100));
  
  document.getElementById('wnum').textContent = estMB + 'M';
  const sc = document.getElementById('wsc');
  sc.className = 'score ' + (estMB <= limMB ? 'sh' : 'sl');
  
  document.getElementById('wst').textContent = estMB <= limMB ? '✓ Dentro del límite' : '⚠ Supera el límite';
  document.getElementById('wds').textContent = `~${estMB} MB estimado · Límite: ${limMB} MB`;
  
  document.getElementById('wbr').innerHTML = `
    <div style="font-size:10px;color:var(--tx3);display:flex;justify-content:space-between;margin-bottom:2px">
      <span>vs. límite (${limMB} MB)</span>
      <span>${pct}%</span>
    </div>
    <div class="pb">
      <div class="pf ${pct < 70 ? 'green' : pct <= 100 ? 'yellow' : 'red'}" style="width:${pct}%"></div>
    </div>
  `;
}

// Suggestion Where to Upload MVP
function suggestUpload() {
  const needs = document.getElementById('su-need') ? document.getElementById('su-need').value : '';
  const r = document.getElementById('su-res');
  if(!needs) {
    r.innerHTML = '<span class="ph2">Selecciona qué quieres hacer arriba.</span>';
    return;
  }
  
  const map = {
    'home': '<strong>/ecommerce/home/[tienda]/visuales/</strong><br>El home es estático a excepción de la cuponera promocional. Sube aquí los recursos fijos.',
    'ban': '<strong>/ecommerce/banners/[tienda]/</strong><br>Tiene cache corto. Perfecto para pautas semanales y eventos de alta rotación.',
    'land': '<strong>/ecommerce/landings/[tienda]/[tipo]/</strong><br>Nunca borres recursos activos aquí a menos que tengas control absoluto de la landing.',
    'cat': '<strong>/ecommerce/catalog/[tienda]/</strong><br>Utilizado principalmente para los PDFs de la separata quincenal o mensual.',
  };
  
  r.innerHTML = `<div class="al ai" style="margin:0;"><i class="fas fa-lightbulb"></i><span style="font-size:12px;display:block">${map[needs]}</span></div>`;
}
