const layoutHTML = `
  <aside class="sb">
    <div class="sb-logo">
      <div class="mk">DAM</div>
      <div class="lt"><strong>Toolkit</strong></div>
    </div>
    <div class="sb-sec">
      <div class="sb-lbl">Principal</div>
      <a href="index.html" class="ni" id="nav-index" style="text-decoration:none"><i class="fas fa-th-large"></i><span>Inicio</span></a>
    </div>
    <div class="sb-sec">
      <div class="sb-lbl">Documentación</div>
      <a href="estructura.html" class="ni" id="nav-estructura" style="text-decoration:none"><i class="fas fa-sitemap"></i><span>Estructura de Carpetas</span></a>
      <a href="cdn.html" class="ni" id="nav-cdn" style="text-decoration:none"><i class="fas fa-globe"></i><span>CDN, Dominios y Cache</span></a>
      <a href="nomenclatura.html" class="ni" id="nav-nomenclatura" style="text-decoration:none"><i class="fas fa-tag"></i><span>Nomenclatura</span></a>
      <a href="optimizacion.html" class="ni" id="nav-optimizacion" style="text-decoration:none"><i class="fas fa-compress-arrows-alt"></i><span>Optimización</span></a>
      <a href="carpetas.html" class="ni" id="nav-carpetas" style="text-decoration:none"><i class="fas fa-folder-open"></i><span>Carpetas Específicas</span></a>
    </div>
    <div class="sb-sec">
      <div class="sb-lbl">Herramientas</div>
      <a href="herramientas.html" class="ni" id="nav-herramientas" style="text-decoration:none"><i class="fas fa-wrench"></i><span>Validador y Calculadoras</span></a>
    </div>
    <div class="sb-ft">© 2026 Grupo Alkosto</div>
  </aside>

  <main class="main">
    <header class="topbar">
      <span class="ttl" id="ttl">Cargando...</span>
      <span class="chip" id="chip"></span>
      <div class="sw">
        <i class="fas fa-search"></i>
        <input type="text" id="gs" placeholder="Buscar en esta página..." oninput="localSearch(this.value)">
      </div>
    </header>

    <div class="content" id="main-content">
    </div>
  </main>

  <div class="toast" id="toast"><i class="fas fa-check-circle"></i><span id="tmsg">Notificación</span></div>
`;

function renderLayout(pageId, title, chipLabel) {
  const container = document.getElementById('app-layout');
  const contentHTML = container.innerHTML;
  
  // Limpiamos todo el body para incrustar el layout completo en caso de no usar app-layout directamente bajo body
  document.body.innerHTML = layoutHTML;

  // Insertamos el contenido de cada vista individualmente
  document.getElementById('main-content').innerHTML = contentHTML;

  // Actualizamos el Header
  document.getElementById('ttl').textContent = title;
  document.getElementById('chip').textContent = chipLabel;
  if (!chipLabel) document.getElementById('chip').style.display = 'none';

  // Activamos el nav lateral que corresponda
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) activeNav.classList.add('active');
  
  // Event callbacks obligatorios que necesitan refixture (si existen)
  if (window.onLayoutReady) {
    window.onLayoutReady();
  }
}

function toast(msg) { 
  const t = document.getElementById('toast'); 
  document.getElementById('tmsg').textContent = msg; 
  t.classList.add('show'); 
  setTimeout(() => t.classList.remove('show'), 2200); 
}

function copyText(id, msg) { 
  const e = document.getElementById(id); 
  if (e && !e.classList.contains('ph2')) {
    navigator.clipboard.writeText(e.textContent).then(() => toast(msg)); 
  }
}

function localSearch(v) {
  const q = v.toLowerCase();
  // Busca texto dentro de las tarjetas "card" y dentro de las filas de tablas "tbody tr"
  document.querySelectorAll('.card, .tw tbody tr, .exrow').forEach(el => {
    if (q === '') {
      el.style.display = '';
    } else {
      if (el.textContent.toLowerCase().includes(q)) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    }
  });
}
