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
    if (document.getElementById('upar')) document.getElementById('upar').innerHTML = '';
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

  if (document.getElementById('upar')) {
    document.getElementById('upar').innerHTML = params.length
      ? '<div>' + params.map(x => `<span style="display:inline-block;background:var(--infb);color:var(--inf);padding:2px 7px;border-radius:20px;font-size:11px;font-weight:600;margin:2px">${x}</span>`).join('') + '</div>'
      : '<p style="font-size:11px;color:var(--tx3)">Sin parámetros — se servirá original.</p>';
  }
}

const CAMPAIGNS = [
  { n: 'Hotdays', s: 'hotdays' }, { n: 'Blackdays', s: 'blackdays' }, { n: 'Cyberdays', s: 'cyberdays' },
  { n: 'Solo x Hoy', s: 'soloxhoy' }, { n: 'Extrapack', s: 'extrapack' }, { n: 'Hiperquincenazo', s: 'hiperquincenazo' },
  { n: 'Expotrónika', s: 'expotronika' }, { n: 'Feria de computadores y celulares', s: 'feriacomputadorescelulares' },
  { n: 'Feria de muebles y colchones', s: 'feriamueblescolchones' }, { n: 'Agosto Alkosto', s: 'agostoalkosto' },
  { n: 'Abril Ofertas Mil', s: 'abrilofertasmil' }, { n: 'Navidad', s: 'navidad' },
  { n: 'Novedades hogar', s: 'novedadeshogar' }, { n: 'Bluesale', s: 'bluesale' },
  { n: 'Temporadas de ofertas', s: 'temporadasofertas' }, { n: 'Aniversario Ktronix', s: 'aniversarioktronix' },
  { n: 'Grandes ofertas de Agosto (Kalley)', s: 'grandesofertasagosto' }, { n: 'Alkomprar Ganga', s: 'alkomprarganga' },
  { n: 'Aniversario Alkomprar', s: 'aniversarioalkomprar' }, { n: 'Miércoles Mobile', s: 'miercolesmobile' },
  { n: 'Jueves de Cómputo', s: 'juevescomputo' }, { n: 'Viernes de TV', s: 'viernestv' },
  { n: 'Categorías', s: 'categorias' }, { n: 'Hiperofertas', s: 'hiperofertas' },
  { n: 'Marca Apple', s: 'marcaapple' }, { n: 'Alkomprar paga', s: 'alkomprarpaga' },
  { n: 'Zona Gamer', s: 'zonagamer' }, { n: 'Gaming Week', s: 'gamingweek' },
  { n: 'Crédito 20 Minutos', s: 'credito20minutos' }, { n: 'Lanzamientos o novedades', s: 'lanzamientos' }
];

function renderCampaigns(showAll = false) {
  const container = document.getElementById('camp-tags');
  if (!container) return;

  const toShow = showAll ? CAMPAIGNS : CAMPAIGNS.slice(0, 4);
  let html = toShow.map(c => `<span style="background:var(--dk3);padding:2px 6px;border-radius:4px;color:var(--tx)" title="En el nombre del archivo se escribe así: ${c.s}">${c.n}</span>`).join('');

  if (!showAll && CAMPAIGNS.length > 4) {
    html += `<span style="background:transparent;padding:2px 6px;border-radius:4px;border:1px dashed var(--bd);cursor:pointer;color:var(--tx2)" onclick="renderCampaigns(true)">+ ${CAMPAIGNS.length - 4} más</span>`;
  }

  container.innerHTML = html;
}

// Smart Validator
function validateName() {
  const v = document.getElementById('vi') ? document.getElementById('vi').value.trim() : '';
  const vt = document.getElementById('vt') ? document.getElementById('vt').value : '';

  const hintEl = document.getElementById('vr-hint');
  if (hintEl) {
    if (vt === 'gen') {
      hintEl.innerHTML = `Estructura <b>Contenido General</b> (Landings, Home, Dinámicos):<br><code>[tipo]-[uso]-[detalle].[ext]</code><br><span style="font-size:10.5px;display:block;margin-top:6px;line-height:1.4;color:var(--tx2)"><b>Tipo:</b> hero, banner, card, fondo, icono, boton, video, titulo, logo.<br><b>Uso (Img):</b> nav, cta, cont, dest, fun, deco. <b>Uso (Vid):</b> descrip, tuto, promo, info, inst.</span>`;
    } else if (vt === 'ban') {
      hintEl.innerHTML = `Estructura <b>Banners Comerciales</b> (Pauta semanal, automatizados):<br><code>[tienda]-[marca]-[campaña/ean]-[zona].[ext]</code><br><span style="font-size:10.5px;display:block;margin-top:6px;line-height:1.4;color:var(--tx2)"><b>Tienda:</b> ak, kt, alkp, ka. <b>Nota:</b> Ideal usar .webp o .mp4 para videos.</span>`;
    }
  }

  const evEl = document.getElementById('vevents');
  if (evEl) {
    const isBan = (vt === 'ban');
    evEl.style.display = isBan ? 'block' : 'none';
    if (isBan && document.getElementById('camp-tags').childElementCount === 0) {
      renderCampaigns();
    }
  }

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

  document.getElementById('vsugg').innerHTML = '';

  let chks = [
    { ok: v === v.toLowerCase(), l: 'Todo en minúsculas', c: true },
    { ok: !v.includes(' '), l: 'Sin espacios', c: true },
    { ok: !/[áéíóúüñ¿¡@#$%^&*()+\={}\[\]|\\<>]/.test(v), l: 'Sin acentos ni especiales', c: true },
    { ok: !v.includes('_'), l: 'Sin guiones bajos', c: false },
    { ok: !/(final|ok|listo|v\d|copia)/i.test(v), l: 'Sin palabras de versión', c: false },
  ];

  const isVideo = /\.(mp4|webm|avi|mov)$/i.test(v);
  const isImage = /\.(webp|svg|jpg|jpeg|png|gif)$/i.test(v);

  // Specific format checks based on type
  if (vt === 'gen') {
    // Contenidos Generales: tipo-uso-detalle.ext
    const parts = v.split('.')[0].split('-');
    const hasCorrectStructure = parts.length >= 3;

    if (isImage) {
      const isRecommendedExt = /\.(webp|svg)$/i.test(v);
      chks.push({ ok: isRecommendedExt, l: 'Formato ideal (WebP/SVG)', c: false });
      if (!isRecommendedExt) {
        document.getElementById('vsugg').innerHTML += `<div class="al aw" style="margin:0;font-size:11px"><i class="fas fa-magic"></i><span>Sugerencia: Cambia a WebP para reducir peso de forma drástica.</span></div>`;
      }
      chks.push({ ok: true, l: 'Extensión de imagen identificada', c: true });
    } else if (isVideo) {
      chks.push({ ok: /\.(mp4|webm)$/i.test(v), l: 'Video optimizado (MP4/WebM)', c: false });
      chks.push({ ok: true, l: 'Extensión de video identificada', c: true });
    } else {
      chks.push({ ok: false, l: 'Extensión no reconocida', c: true });
    }

    chks.push({ ok: hasCorrectStructure, l: 'Estructura [tipo]-[uso]-[detalle]', c: true });

    if (hasCorrectStructure) {
      const tiposValidos = ['hero', 'banner', 'card', 'fondo', 'icono', 'boton', 'video', 'titulo', 'logo'];
      const currentTipo = parts[0];
      chks.push({ ok: tiposValidos.includes(currentTipo), l: `Tipo válido (${currentTipo || '?'})`, c: true });

      let usosValidos = [];
      if (isImage) {
        usosValidos = ['nav', 'cta', 'cont', 'dest', 'fun', 'deco'];
      } else if (isVideo) {
        usosValidos = ['descrip', 'tuto', 'promo', 'info', 'inst'];
      }
      const currentUso = parts[1];
      if (isImage || isVideo) {
        chks.push({ ok: usosValidos.includes(currentUso), l: `Uso válido (${currentUso || '?'})`, c: true });
      }
    }
  } else if (vt === 'ban') {
    // Banner Comercial: tienda-marca-campaña-zona.ext
    const parts = v.split('.')[0].split('-');
    const validShops = ['ak', 'kt', 'alkp', 'ka'];
    const currentShop = parts[0];
    const hasValidShop = validShops.includes(currentShop);

    chks.push({ ok: hasValidShop, l: `Prefijo tienda válido (${currentShop || '?'})`, c: true });

    const hasCorrectStructure = parts.length >= 4;
    chks.push({ ok: hasCorrectStructure, l: 'Estructura [tienda]-[marca]-[campaña]-[zona]', c: true });

    if (isImage) {
      const isWebP = /\.(webp)$/i.test(v);
      chks.push({ ok: isWebP, l: 'Idealmente extensión .webp', c: false });
      if (!isWebP) {
        document.getElementById('vsugg').innerHTML += `<div class="al aw" style="margin:0;font-size:11px"><i class="fas fa-magic"></i><span>Sugerencia: Cambia a WebP para que los banners carguen más rápido.</span></div>`;
      }
    } else if (isVideo) {
      chks.push({ ok: /\.(mp4|webm)$/i.test(v), l: 'Video optimizado (MP4/WebM)', c: false });
    } else {
      chks.push({ ok: false, l: 'Extensión no reconocida', c: true });
    }
  }

  const passed = chks.filter(c => c.ok).length;
  const criticalFails = chks.filter(c => !c.ok && c.c).length;
  const score = Math.round((passed / chks.length) * 100);

  const idealName = v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-.]/g, "").replace(/-{2,}/g, '-');
  if (v !== idealName && v !== '' && (v.includes(' ') || v.toLowerCase() !== v || /[áéíóúüñ¿¡@#$%^&*()+\={}\[\]|\\<>]/.test(v) || v.includes('_') || v.includes('--'))) {
    document.getElementById('vsugg').innerHTML += `<div class="al ai" style="margin-top:8px;font-size:11px"><i class="fas fa-magic"></i><span style="flex:1"><b>Recomendado:</b> Usa <code style="cursor:pointer;background:var(--infb);color:var(--inf);padding:2px 6px;border-radius:4px" onclick="document.getElementById('vi').value='${idealName}'; validateName();" title="Haz clic para aplicar">${idealName}</code></span></div>`;
  }

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
  if (!document.getElementById('pw')) return;
  const w = parseInt(document.getElementById('pw').value) || 1920;
  const h = parseInt(document.getElementById('ph2').value) || 600;
  const f = document.getElementById('pf').value;
  const c = parseFloat(document.getElementById('pc').value);

  const px = w * h;
  const md = Math.max(w, h);

  // Asumimos calidad web promedio del 75% (.75)
  const q = 0.75;
  let fac = f === 'webp' ? 0.055 * q * c : f === 'svg' ? 0.01 : f === 'jpg' ? 0.09 * q * c : 0.28 * c;
  const estKB = Math.round((px * fac) / 1024);

  const lim = md <= 400 ? 50 : md <= 800 ? 100 : md <= 1300 ? 150 : 250;
  const pct = Math.round((estKB / lim) * 100);

  document.getElementById('wnum').textContent = estKB > 999 ? (estKB / 1024).toFixed(1) + 'MB' : estKB;
  const sc = document.getElementById('wsc');

  const colorStatus = pct <= 75 ? 'green' : pct <= 100 ? 'yellow' : 'red';
  sc.className = 'score ' + (colorStatus === 'green' ? 'sh' : colorStatus === 'yellow' ? 'sm' : 'sl');

  document.getElementById('wst').textContent = colorStatus === 'green' ? '✓ Peso óptimo para carga rápida' : colorStatus === 'yellow' ? '⚠ Peso aceptable pero mejorable' : '✗ Peso muy alto, excede el límite';
  document.getElementById('wst').style.color = colorStatus === 'green' ? 'var(--su)' : colorStatus === 'yellow' ? 'var(--wn)' : 'var(--er)';

  document.getElementById('wds').textContent = `~${estKB > 999 ? (estKB / 1024).toFixed(1) + ' MB' : estKB + ' KB'} estimado · Límite: ${lim} KB`;

  const pBarWid = Math.min(100, pct);
  document.getElementById('wbr').innerHTML = `
    <div style="font-size:10px;color:var(--tx3);display:flex;justify-content:space-between;margin-bottom:2px">
      <span>vs. límite (${lim} KB)</span>
      <span>${pct}%</span>
    </div>
    <div class="pb">
      <div class="pf ${colorStatus}" style="width:${pBarWid}%"></div>
    </div>
  `;

  const tl = document.getElementById('tips-list');
  if (tl) {
    tl.innerHTML = `
      <li style="margin-bottom:6px"><a href="https://squoosh.app" target="_blank" style="color:#D97706;text-decoration:underline;font-weight:600">Squoosh.app:</a> Comprime imágenes y las convierte a WebP viendo el peso final en tiempo real.</li>
      <li style="margin-bottom:6px"><a href="https://tinypng.com/" target="_blank" style="color:#D97706;text-decoration:underline;font-weight:600">TinyPNG:</a> Reduce inteligentemente el peso de cualquier JPG, PNG o WebP sin perder calidad.</li>
      <li><a href="https://www.iloveimg.com/es" target="_blank" style="color:#D97706;text-decoration:underline;font-weight:600">iLoveIMG:</a> Conjunto de utilidades rápidas para recortar, redimensionar o comprimir imágenes por lotes.</li>
    `;
  }
}

function calculateVideoWeight() {
  if (!document.getElementById('vw-sec')) return;
  const w = parseInt(document.getElementById('vw-w').value) || 1920;
  const h = parseInt(document.getElementById('vw-h').value) || 1080;
  const sec = parseInt(document.getElementById('vw-sec').value) || 15;
  const c = parseFloat(document.getElementById('vw-res').value); // complexity

  const px = w * h;
  // Factor aproximado: bits por pixel por cuadro (web optimizado)
  const bitsPerFrame = px * c * 0.06;
  const bitrateKbps = Math.round((bitsPerFrame * 30) / 1024); // 30fps asumido

  const estKB = Math.round((bitrateKbps * sec) / 8);
  const estMB = parseFloat((estKB / 1024).toFixed(2));

  const limMB = 10;
  const limKB = limMB * 1024;
  const pct = Math.round((estKB / limKB) * 100);

  document.getElementById('wnum').textContent = estMB > 0.1 ? estMB + 'MB' : estKB + 'KB';

  const colorStatus = pct <= 75 ? 'green' : pct <= 100 ? 'yellow' : 'red';
  const sc = document.getElementById('wsc');
  sc.className = 'score ' + (colorStatus === 'green' ? 'sh' : colorStatus === 'yellow' ? 'sm' : 'sl');

  document.getElementById('wst').textContent = colorStatus === 'green' ? '✓ Peso óptimo para carga rápida' : colorStatus === 'yellow' ? '⚠ Peso aceptable pero mejorable' : '✗ Peso muy alto, excede el límite';
  document.getElementById('wst').style.color = colorStatus === 'green' ? 'var(--su)' : colorStatus === 'yellow' ? 'var(--wn)' : 'var(--er)';

  document.getElementById('wds').textContent = `~${estMB} MB estimado · Límite: ${limMB} MB`;

  const pBarWid = Math.min(100, pct);
  document.getElementById('wbr').innerHTML = `
    <div style="font-size:10px;color:var(--tx3);display:flex;justify-content:space-between;margin-bottom:2px">
      <span>vs. límite (${limMB} MB)</span>
      <span>${pct}%</span>
    </div>
    <div class="pb">
      <div class="pf ${colorStatus}" style="width:${pBarWid}%"></div>
    </div>
  `;

  const tl = document.getElementById('tips-list');
  if (tl) {
    tl.innerHTML = `
      <li><a href="https://www.freeconvert.com/es/video-compressor" target="_blank" style="color:#D97706;text-decoration:underline;font-weight:600">FreeConvert:</a> Excelente compresor 100% web. Sube tu video, en 'Advanced Settings' elige 'Target a file size (MB)' y ajustalo a menos de 10MB; la herramienta optimizará automáticamente.</li>
    `;
  }
}

// Asistente de Directorios DAM
function renderUploadSuggestions() {
  const q1 = document.getElementById('su-q1').value;
  const landType = document.getElementById('su-land-type').value;

  const fgLand = document.getElementById('fg-land');
  const resCont = document.getElementById('su-res-container');
  const pathEl = document.getElementById('su-path');
  const warnEl = document.getElementById('su-warn');
  const codeEl = document.getElementById('su-code');

  // Reset visibility
  fgLand.style.display = (q1 === 'land') ? 'block' : 'none';
  codeEl.style.display = 'none';

  if (!q1 || (q1 === 'land' && !landType)) {
    resCont.style.display = 'none';
    return;
  }

  resCont.style.display = 'block';

  let path = '';
  let warnMsg = '';
  let warnType = 'al ai'; // info (blue) -> aw (yellow) -> aerr (red)

  if (q1 === 'ban') {
    path = '/ecommerce/banners/[tienda]/[categoria]/[semana]/';
    warnType = 'al ai';
    warnMsg = '<b>Actualizado cada semana:</b> Esta carpeta tiene subcarpetas para facilitar los ajustes semanales. Recuerda que siempre se usan para campañas o promos temporales.';
  } else if (q1 === 'din') {
    path = '/ecommerce/dinamicos/[tienda]/';
    warnType = 'al ai';
    warnMsg = 'Para almacenar insumos/fondos/ítems que alimentan los diseños de banners automatizados construidos en HTML/CSS.';
  } else if (q1 === 'home') {
    path = '/ecommerce/home/[tienda]/visuales/';
    warnType = 'al aw';
    warnMsg = '<b>¡Cuidado al eliminar!</b> Úsalo para material de la página principal. Si vas a reemplazar o borrar algo, pregunta primero si está siendo usado, ya que podrías romper el Home.';
  } else if (q1 === 'land') {
    path = `/ecommerce/landings/[tienda]/${landType}/[nombre_landing]/`;
    warnType = 'al aw';
    warnMsg = '<b>¡Cuidado al eliminar!</b> Las landings son permanentes. Si subes/modificas archivos fijos, asegúrate de preguntar primero para no dañar contenido actualmente al aire.';
  } else if (q1 === 'cat') {
    path = '/ecommerce/catalog/[tienda]/';
    warnType = 'al aw';
    warnMsg = '<b>Atención:</b> Catalog la gestiona principalmente Nestor. Confirma con él antes de modificar archivos allí.';
  } else if (q1 === 'kevel') {
    path = '[Primero sube a Banners o Landings] -> Luego copia el Código UI';
    warnType = 'al ai';
    warnMsg = '<b>Para KEVEL usa MP4 primero y WEBM de respaldo.</b> Completa los datos para generar tu código HTML:';

    codeEl.style.display = 'block';
    codeEl.innerHTML = `
      <div style="font-size:11px;font-weight:bold;margin-bottom:8px;color:var(--tx2)">Configura tu anuncio KEVEL:</div>
      <div style="display:grid;grid-template-columns:1fr;gap:6px;margin-bottom:10px">
        <input type="text" id="kev-link" class="fi" placeholder="Link de promoción" style="font-size:11px;padding:6px;background:#fff;border-color:var(--bd)" value="link-promo" oninput="updateKevelCode()">
        <input type="text" id="kev-vid" class="fi" placeholder="URL del video (.mp4)" style="font-size:11px;padding:6px;background:#fff;border-color:var(--bd)" value="tu-video.mp4" oninput="updateKevelCode()">
      </div>
      <div style="position:relative">
         <textarea id="kev-out" style="width:100%;height:140px;font-family:monospace;font-size:11px;padding:8px;border:1px solid var(--bd);border-radius:4px;resize:vertical;background:var(--dk);color:var(--pr)" spellcheck="false" title="También puedes editar este código manualmente"></textarea>
         <button class="btn bp" style="position:absolute;bottom:10px;right:10px;padding:6px 10px;font-size:10px;cursor:pointer" onclick="const t = document.getElementById('kev-out'); t.select(); document.execCommand('copy'); toast('Código copiado');">Copiar HTML</button>
      </div>
    `;
    setTimeout(() => { if (typeof updateKevelCode === 'function') updateKevelCode(); }, 10);
  }

  pathEl.innerHTML = `<span style="user-select:all">${path}</span>`;
  warnEl.innerHTML = `<div class="${warnType}" style="margin:0;font-size:12px;padding:10px 12px"><i class="fas fa-exclamation-triangle"></i><span style="flex:1">${warnMsg}</span></div>`;
}

function updateKevelCode() {
  const linkEl = document.getElementById('kev-link');
  const vidEl = document.getElementById('kev-vid');
  const outEl = document.getElementById('kev-out');

  if (!linkEl || !vidEl || !outEl) return;

  const link = linkEl.value || 'link-promo';
  const vid = vidEl.value || 'tu-video.mp4';

  const code = `<a href="{{url}}&url=${link}" target="_self">
  <video autoplay muted loop playsinline webkit-playsinline preload="metadata">
    <!-- 2. WEBM como fallback secundario -->
    <source src="${vid}?profile=hls&quality=70&format=webm" type="video/webm">
    <!-- 1. MP4 primero (clave para iPhone) -->
    <source src="${vid}" type="video/mp4"> 
  </video> 
</a>`;

  outEl.value = code;
}
