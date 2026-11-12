/* Interface: modo claro/escuro, produtos, questionário e resultado. As regras ficam em regras.js. */

/* Menu lateral: um só lugar para os links das três páginas */
const paginaAtual = location.pathname.split('/').pop() || 'index.html';
const SUBMENU_PRODUTOS = [
  ['Todos', 'produtos.html'],
  ['Colchões', 'tipos.html#colchoes'],
  ['Camas e Bases', 'tipos.html#camas-bases'],
  ['Cabeceiras', 'tipos.html#cabeceiras'],
  ['Enxoval e Proteção', 'tipos.html#enxoval'],
];
const gaveta = document.createElement('dialog');
gaveta.className = 'gaveta';
gaveta.setAttribute('aria-label', 'Menu');
gaveta.innerHTML = `
  <div class="gaveta-topo">
    <img src="assets/logo-criare-horizontal.svg" alt="Criare Colchões" width="135" height="36">
    <button type="button" class="botao-texto" id="fechar-menu">Fechar</button>
  </div>
  <ul class="gaveta-lista">
    <li><a href="index.html#como">Como funciona</a></li>
    <li><details ${paginaAtual !== 'index.html' ? 'open' : ''}>
      <summary>Produtos</summary>
      <ul class="gaveta-sub">
        ${SUBMENU_PRODUTOS.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}
      </ul>
    </details></li>
    <li><a href="index.html#sob-medida">Sob medida</a></li>
    <li><a href="index.html#loja">Onde estamos</a></li>
  </ul>`;
document.body.append(gaveta);
const botaoMenu = document.getElementById('abrir-menu');
botaoMenu.addEventListener('click', () => {
  gaveta.showModal();
  document.body.classList.add('travado');
});
gaveta.addEventListener('close', () => document.body.classList.remove('travado'));
gaveta.querySelector('#fechar-menu').addEventListener('click', () => gaveta.close());
gaveta.addEventListener('click', e => {
  // Clique fora do painel ou em um link fecha o menu
  if (e.target === gaveta || e.target.closest('a')) gaveta.close();
});

/* Modo claro (dia) e escuro (noite) */
const botaoTema = document.getElementById('tema');
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  botaoTema.setAttribute('aria-checked', String(tema === 'escuro'));
}
aplicarTema(document.documentElement.dataset.tema || 'claro');
botaoTema.addEventListener('click', () => {
  const novo = document.documentElement.dataset.tema === 'escuro' ? 'claro' : 'escuro';
  aplicarTema(novo);
  try { localStorage.setItem('tema', novo); } catch (e) { /* sem armazenamento, vale só nesta visita */ }
});

/* Prédios vistos pela janela: à noite, parte das janelas acende */
const predios = document.getElementById('predios');
if (predios) {
  const fundo = [[640, 300, 130], [760, 340, 90], [850, 270, 150], [1000, 320, 110], [1110, 280, 140], [1250, 330, 120], [1370, 290, 100]];
  const frente = [[650, 380, 150], [820, 430, 130], [970, 360, 170], [1160, 410, 140], [1310, 370, 150]];
  let svg = fundo.map(([x, y, l]) => `<rect class="c-predio-longe" x="${x}" y="${y}" width="${l}" height="${570 - y}"/>`).join('');
  frente.forEach(([x, y, l], p) => {
    svg += `<rect class="c-predio" x="${x}" y="${y}" width="${l}" height="${570 - y}"/>`;
    svg += `<rect class="c-predio-longe" x="${x + l / 2 - 16}" y="${y - 16}" width="32" height="16"/>`;
    const colunas = Math.floor((l - 16) / 28);
    for (let a = y + 14, andar = 0; a < 560; a += 30, andar++) {
      svg += `<rect class="c-laje" x="${x}" y="${a + 22}" width="${l}" height="2"/>`;
      for (let c = 0; c < colunas; c++) {
        const acesa = (p * 5 + andar * 3 + c * 7) % 4 === 0;
        svg += `<rect class="${acesa ? 'c-acesa' : 'c-apagada'}" x="${x + 12 + c * 28}" y="${a}" width="16" height="16"/>`;
      }
    }
  });
  predios.innerHTML = svg;
}

/* Links de WhatsApp com o assunto já escrito */
function ativarWhatsApp(raiz) {
  raiz.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

/* Cards de produto: a página inicial mostra os destaques, a aba Produtos mostra tudo */
function desenharCards(lista, alvo) {
  alvo.innerHTML = lista.map(p => `
    <li><a class="card" data-wa="Olá! Gostaria de saber mais sobre: ${p.nome}.">
      <img src="${p.foto}" alt="" loading="lazy">
      <span class="card-nome">${p.nome}</span><span class="card-info">${p.info}</span>
    </a></li>`).join('');
  ativarWhatsApp(alvo);
}
ativarWhatsApp(document);

const destaques = document.getElementById('destaques');
if (destaques) desenharCards(PRODUTOS.filter(p => p.destaque), destaques);

/* Animação Revelar: a foto se abre de cima para baixo ao entrar na tela.
   Só esconde quando o script roda e a pessoa aceita animações, senão a foto aparece normal. */
const fotosRevelar = document.querySelectorAll('.como-foto, #destaques img');
if (fotosRevelar.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelector('.revelar').classList.add('revelada');
      observador.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  fotosRevelar.forEach((foto, i) => {
    foto.classList.add('revelar');
    // A primeira é a foto de Como funciona; os cards abrem em sequência
    foto.style.transitionDelay = `${Math.max(i - 1, 0) * 120}ms`;
    // Observa o bloco em volta: a foto recortada conta como fora da tela
    observador.observe(foto.parentElement);
  });
}

const catalogo = document.getElementById('catalogo');
if (catalogo) {
  const filtros = document.getElementById('filtros');
  filtros.innerHTML = ['Todos', ...CATEGORIAS]
    .map((c, i) => `<button type="button" class="filtro" aria-pressed="${i === 0}">${c}</button>`).join('');
  filtros.querySelectorAll('.filtro').forEach(b => b.addEventListener('click', () => {
    filtros.querySelectorAll('.filtro').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    const c = b.textContent;
    desenharCards(c === 'Todos' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === c), catalogo);
  }));
  desenharCards(PRODUTOS, catalogo);
}

/* Aba Tipos de colchão */
function desenharTipos(lista, alvo) {
  alvo.innerHTML = lista.map(t => `
    <li class="tipo">
      <img src="${t.foto}" alt="" loading="lazy">
      <h3>${t.nome}</h3>
      <p>${t.desc}</p>
      <dl>${t.specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
      <a class="botao botao-contorno" data-wa="Olá! Gostaria de saber mais sobre: ${t.nome}.">Quero saber mais</a>
    </li>`).join('');
  ativarWhatsApp(alvo);
}
const tiposColchao = document.getElementById('tipos-colchao');
if (tiposColchao) {
  desenharTipos(TIPOS_COLCHAO, tiposColchao);
  desenharTipos(TIPOS_CAMAS, document.getElementById('tipos-camas'));
  desenharTipos(TIPOS_CABECEIRAS, document.getElementById('tipos-cabeceiras'));
  desenharTipos(TIPOS_ENXOVAL, document.getElementById('tipos-enxoval'));
  // O conteúdo nasce aqui, então o link do menu só acha a seção depois de desenhar
  const secao = document.getElementById(location.hash.slice(1));
  if (secao) secao.scrollIntoView({ behavior: 'instant' });
}
