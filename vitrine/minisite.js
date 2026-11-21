/* Monta a página a partir de produtos.js. Para atualizar o catálogo, edite só aquele arquivo. */
const real = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
// Produto sem foto: mostra a logo da loja no lugar
const foto = nome => nome ? `fotos/${nome}.webp` : 'assets/logo-criare.svg';
const linkWhats = texto => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
const msgProduto = p => `Olá, tenho interesse no produto ${p.nome} (${p.detalhe})${p.oferta ? ` por ${real(p.oferta.por)}` : ''}`;
const MSG_GERAL = 'Olá! Vim pelo site da Criare e gostaria de atendimento.';
const $ = id => document.getElementById(id);

/* 1. Perfil */
$('usuario').textContent = LOJA.usuario;
$('usuario').href = LOJA.instagram;
$('bio').textContent = LOJA.bio;

/* Cartão de produto, usado na vitrine e nos catálogos */
function selo(p) {
  if (p.oferta) return `<span class="selo selo-desconto">-${Math.round((1 - p.oferta.por / p.oferta.de) * 100)}%</span>`;
  return p.selo ? `<span class="selo">${p.selo}</span>` : '';
}
function preco(p) {
  if (p.oferta) return `<p class="preco"><s>${real(p.oferta.de)}</s><strong>${real(p.oferta.por)}</strong></p>`;
  if (p.preco) return `<p class="preco"><strong>${real(p.preco)}</strong></p>`;
  return '<p class="preco preco-consulte">Consulte o preço</p>';
}
const cartao = p => `
  <li class="produto">
    <div class="produto-foto${p.foto ? '' : ' sem-foto'}">${selo(p)}<img src="${foto(p.foto)}" alt="${p.nome}" width="800" height="800" loading="lazy"></div>
    <h3>${p.nome}</h3>
    <p class="detalhe">${p.detalhe}</p>
    ${preco(p)}
    <a class="botao botao-pedir" href="${linkWhats(msgProduto(p))}" target="_blank" rel="noopener">Pedir no WhatsApp</a>
  </li>`;

/* 2. Banners: deslizam com o dedo e passam sozinhos a cada 5 s */
const trilho = $('trilho');
trilho.innerHTML = BANNERS.map((b, i) => `
  <a class="banner" href="${b.link}" aria-label="${b.titulo}" data-i="${i}">
    <img src="${foto(b.foto)}" alt="" width="800" height="800" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
    <span class="banner-texto">
      <span class="banner-rotulo">${b.rotulo}</span>
      <strong>${b.titulo}</strong>
      <span class="banner-botao">${b.botao} →</span>
    </span>
  </a>`).join('');
const pontos = $('pontos');
pontos.innerHTML = BANNERS.map((b, i) => `<button type="button" aria-label="Banner ${i + 1}"></button>`).join('');
const irPara = i => trilho.scrollTo({ left: i * trilho.clientWidth, behavior: 'smooth' });
pontos.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => irPara(i)));
const atual = () => Math.round(trilho.scrollLeft / trilho.clientWidth);
const marcarPonto = () => pontos.querySelectorAll('button').forEach((b, i) => b.toggleAttribute('aria-current', i === atual()));
trilho.addEventListener('scroll', marcarPonto, { passive: true });
marcarPonto();
let pausado = matchMedia('(prefers-reduced-motion: reduce)').matches;
['pointerdown', 'mouseenter', 'focusin'].forEach(ev => trilho.addEventListener(ev, () => { pausado = true; }));
setInterval(() => { if (!pausado && !document.hidden && BANNERS.length > 1) irPara((atual() + 1) % BANNERS.length); }, 5000);

/* 3. Catálogos: cada categoria vira um banner clicável */
$('catalogos').innerHTML = CATEGORIAS.map(c => `
  <li><a class="catalogo" href="#categoria/${c.id}">
    <img src="${foto((c.produtos.find(p => p.capa) || c.produtos[0]).foto)}" alt="" width="800" height="800" loading="lazy">
    <span><strong>${c.nome}</strong><small>${c.produtos.length} ${c.produtos.length === 1 ? 'opção' : 'opções'}</small></span>
  </a></li>`).join('');

/* 4. Vitrine: produtos em oferta e marcados como destaque */
const desconto = p => p.oferta ? 1 - p.oferta.por / p.oferta.de : -1;
const destaques = CATEGORIAS.flatMap(c => c.produtos).filter(p => p.oferta || p.destaque)
  // Maior desconto primeiro; destaques sem desconto vão para o fim
  .sort((a, b) => desconto(b) - desconto(a));
$('vitrine').innerHTML = destaques.map(cartao).join('');
$('validade').textContent = OFERTAS_ATE ? `Ofertas válidas até ${OFERTAS_ATE}` : '';

/* Catálogo em tela cheia. Usa o endereço (#categoria/id) para o "voltar" do celular fechar a tela */
const folha = $('folha');
let abertoPorAqui = false;
function sincronizar() {
  const id = location.hash.startsWith('#categoria/') ? location.hash.slice(11) : null;
  const c = CATEGORIAS.find(x => x.id === id);
  if (c) {
    $('folha-titulo').textContent = c.nome;
    $('folha-qtd').textContent = `${c.produtos.length} ${c.produtos.length === 1 ? 'opção' : 'opções'}`;
    $('folha-grade').innerHTML = c.produtos.map(cartao).join('');
    if (!folha.open) folha.showModal();
    folha.scrollTop = 0;
    document.documentElement.classList.add('travado');
  } else if (folha.open) {
    folha.close();
    aoFechar();
  }
}
// Roda uma vez por fechamento, seja pelo botão, pelo "voltar" ou pela tecla Esc
function aoFechar() {
  if (!document.documentElement.classList.contains('travado')) return;
  document.documentElement.classList.remove('travado');
  if (location.hash.startsWith('#categoria/')) {
    if (abertoPorAqui) history.back();
    else history.replaceState(null, '', location.pathname);
  }
  abertoPorAqui = false;
}
folha.addEventListener('close', aoFechar);
document.addEventListener('click', e => { if (e.target.closest('a[href^="#categoria/"]')) abertoPorAqui = true; });
$('fechar').addEventListener('click', () => { folha.close(); aoFechar(); });
addEventListener('hashchange', sincronizar);
sincronizar();

/* 5. Rodapé e WhatsApp geral */
const mapa = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Criare Colchões, ' + LOJA.endereco)}`;
$('r-mapa').href = mapa;
$('r-instagram').href = LOJA.instagram;
$('r-telefone').href = `tel:+${LOJA.whatsapp}`;
$('endereco').innerHTML = `${LOJA.endereco}${LOJA.horario ? `<br>${LOJA.horario}` : ''}`;
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = linkWhats(MSG_GERAL);
  a.target = '_blank';
  a.rel = 'noopener';
});

/* Botão fixo de WhatsApp quando o do topo some da tela */
const fixo = $('whats-fixo');
new IntersectionObserver(([e]) => {
  const mostrar = !e.isIntersecting && e.boundingClientRect.top < 0;
  fixo.classList.toggle('visivel', mostrar);
  fixo.setAttribute('aria-hidden', String(!mostrar));
  fixo.tabIndex = mostrar ? 0 : -1;
}).observe($('whats-topo'));
