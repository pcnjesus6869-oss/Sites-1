/* Questionário do sono + tabela de densidades.
 * Compartilhado pelo site principal (index.html) e pelo catálogo (catalogo/index.html).
 * Depende de regras.js (PERGUNTAS, DENSIDADES, recomendar, mensagemWhatsApp).
 * A página precisa ter o bloco #quiz e botões com data-abrir-quiz. */
(() => {
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
})();
