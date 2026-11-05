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

/* Tabela de densidades vem das mesmas regras do questionário */
const tabelaDensidades = document.getElementById('tabela-densidades');
if (tabelaDensidades) {
  tabelaDensidades.innerHTML = DENSIDADES
    .map(d => `<tr><td>${d.faixa}</td><td>${d.nome}</td></tr>`).join('');
}

const quiz = document.getElementById('quiz');
if (quiz) iniciarQuestionario();

function iniciarQuestionario() {

const palco = document.getElementById('palco');
const progresso = document.getElementById('progresso-barra');
const contador = document.getElementById('contador');
const voltar = document.getElementById('voltar');

let respostas = {};
let passo = 0;
let origem = null;

const perguntasAtivas = () => PERGUNTAS.filter(q => !q.se || q.se(respostas));

function abrir(e) {
  origem = e.currentTarget;
  respostas = {};
  passo = 0;
  quiz.hidden = false;
  document.body.classList.add('travado');
  renderizar();
}

function fechar() {
  quiz.hidden = true;
  document.body.classList.remove('travado');
  if (origem) origem.focus();
}

document.querySelectorAll('[data-abrir-quiz]').forEach(b => b.addEventListener('click', abrir));
document.getElementById('fechar').addEventListener('click', fechar);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !quiz.hidden) fechar(); });
voltar.addEventListener('click', () => { if (passo > 0) { passo--; renderizar(); } });

function avancar() {
  passo++;
  renderizar();
}

function renderizar() {
  const lista = perguntasAtivas();
  voltar.hidden = passo === 0;
  atualizarCamadas();
  palco.scrollTop = 0;
  palco.parentElement.scrollTop = 0; // no celular quem rola é o corpo do questionário
  if (passo >= lista.length) return mostrarResultado();
  progresso.style.width = `${(passo / lista.length) * 100}%`;
  contador.textContent = `Pergunta ${passo + 1} de ${lista.length}`;
  mostrarPergunta(lista[passo]);
}

function mostrarPergunta(q) {
  const selecionados = q.multipla ? (respostas[q.id] || []) : [respostas[q.id]];
  palco.innerHTML = `
    <h2 class="q-titulo" id="q-titulo" tabindex="-1">${q.titulo}</h2>
    ${q.ajuda ? `<p class="q-ajuda">${q.ajuda}</p>` : ''}
    <div class="opcoes ${q.opcoes.length > 5 ? 'opcoes-grade' : ''}" role="group" aria-labelledby="q-titulo">
      ${q.opcoes.map((o, i) => `
        <button type="button" class="opcao" data-i="${i}" aria-pressed="${selecionados.includes(o.v)}">
          <span>${o.t}</span>${o.d ? `<small>${o.d}</small>` : ''}
        </button>`).join('')}
    </div>
    ${q.multipla ? '<button type="button" class="botao" id="continuar">Ver meu colchão</button>' : ''}
  `;
  palco.querySelectorAll('.opcao').forEach(b => b.addEventListener('click', () => {
    const o = q.opcoes[Number(b.dataset.i)];
    if (q.multipla) {
      const atual = new Set(respostas[q.id] || []);
      atual.has(o.v) ? atual.delete(o.v) : atual.add(o.v);
      respostas[q.id] = [...atual];
      b.setAttribute('aria-pressed', String(atual.has(o.v)));
    } else {
      respostas[q.id] = o.v;
      avancar();
    }
  }));
  if (q.multipla) palco.querySelector('#continuar').addEventListener('click', avancar);
  document.getElementById('q-titulo').focus({ preventScroll: true });
}

/* O colchão ao lado vai sendo montado conforme as respostas chegam */
function atualizarCamadas() {
  const rec = recomendar(respostas);
  const r = respostas;
  definirCamada('tecido', r.calor || r.alergia ? rec.tecido : null);
  definirCamada('conforto', r.posicao ? rec.conforto.nome : null);
  const nucleoPronto = r.calor && r.posicao;
  definirCamada('nucleo', nucleoPronto
    ? `${rec.nucleo.nome}${rec.chaveNucleo === 'espuma' ? ' ' + rec.densidade.nome : ''}`
    : (r.peso ? `Faixa de peso: ${rec.densidade.faixa}` : null));
  document.getElementById('m-firmeza').textContent = r.sensacao ? rec.rotulo : 'A definir';
  document.getElementById('m-medida').textContent = r.medida || 'A definir';
}

function definirCamada(id, texto) {
  const el = document.getElementById(`c-${id}`);
  el.classList.toggle('definida', Boolean(texto));
  el.querySelector('.c-valor').textContent = texto || 'A definir';
}

function mostrarResultado() {
  progresso.style.width = '100%';
  contador.textContent = 'Seu colchão';
  voltar.hidden = false;
  const rec = recomendar(respostas);
  const nivel = Math.round(rec.firmeza);
  palco.innerHTML = `
    <p class="sobrelinha">Indicação para você</p>
    <h2 class="q-titulo" id="q-titulo" tabindex="-1">${rec.nucleo.nome}, ${rec.rotulo.toLowerCase()}, com ${rec.conforto.nome.toLowerCase()}</h2>
    <p class="q-ajuda">${rec.nucleo.desc} ${rec.conforto.desc}</p>

    <div class="regua" role="img" aria-label="Firmeza ${nivel} de 10">
      <span>Macio</span>
      <div class="regua-trilho"><i style="left:${(rec.firmeza - 1) / 9 * 100}%"></i></div>
      <span>Firme</span>
    </div>

    <h3 class="r-sub">Por que essa combinação</h3>
    <ul class="motivos">${rec.motivos.map(m => `<li>${m}</li>`).join('')}</ul>

    ${rec.avisos.length ? `<ul class="avisos">${rec.avisos.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
    ${rec.extras.length ? `<p class="q-ajuda"><strong>Para completar o quarto:</strong> ${rec.extras.join(', ')}.</p>` : ''}

    <div class="acoes">
      <a class="botao" href="${mensagemWhatsApp(respostas, rec)}" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
      <button type="button" class="botao-texto" id="refazer">Refazer o questionário</button>
    </div>
    <p class="nota">Esta é uma indicação inicial. A equipe da Criare confirma as opções disponíveis, e você pode deitar e testar na loja antes de decidir.</p>
  `;
  palco.querySelector('#refazer').addEventListener('click', () => { respostas = {}; passo = 0; renderizar(); });
  document.getElementById('q-titulo').focus({ preventScroll: true });
}

/* A aba Produtos chega aqui por index.html#questionario */
if (location.hash === '#questionario') document.querySelector('[data-abrir-quiz]').click();
}
