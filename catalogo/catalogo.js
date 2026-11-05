/* Dados do catálogo e contatos. Para trocar um produto, edite a linha dele.
   Campos de contato vazios não aparecem no site. */
const CONTATO = {
  whatsapp: '5547992156344',
  telefone: '(47) 99215-6344',
  instagram: 'https://www.instagram.com/criarecolchoeseacessorios/',
  facebook: '', // preencher com o link da página
  email: '',    // preencher com o e-mail da loja
  endereco: 'Rua Amazonas, 3815, Garcia, Blumenau, SC',
};

const foto = id => `https://images.unsplash.com/photo-${id}?w=700&q=70&auto=format&fit=crop`;

const CATALOGO = [
  { id: 'colchoes', nome: 'Colchões', itens: [
    { nome: 'Colchão de espuma', desc: 'Sustentação uniforme, com a densidade certa para o seu peso.', foto: foto('1635594202056-9ea3b497e5c0') },
    { nome: 'Colchão de molas ensacadas', desc: 'Molas independentes que acompanham o corpo e ventilam melhor.', foto: foto('1759176170912-3b192e8d14b0') },
    { nome: 'Colchão com pillow top', desc: 'Camada extra de conforto para uma superfície mais macia.', foto: foto('1759176170553-7c078c66c514') },
    { nome: 'Colchão sob medida', desc: 'Produzido nas medidas e na firmeza que você precisa.', foto: foto('1617325247661-675ab4b64ae2') },
  ]},
  { id: 'travesseiros', nome: 'Travesseiros', itens: [
    { nome: 'Travesseiro de fibra', desc: 'Macio e leve, para quem gosta de afundar a cabeça.', foto: foto('1620751852890-a89137ec78b9') },
    { nome: 'Travesseiro viscoelástico', desc: 'Molda-se ao pescoço e volta devagar à forma original.', foto: foto('1600414428640-f78a67c2aa3b') },
    { nome: 'Travesseiro de espuma', desc: 'Mais firme e estável, mantém a altura durante a noite.', foto: foto('1584100936595-c0654b55a2e2') },
  ]},
  { id: 'almofadas', nome: 'Almofadas', itens: [
    { nome: 'Almofadas decorativas', desc: 'Cores e texturas para completar a cama e o sofá.', foto: foto('1553114552-c4ece3a33c93') },
    { nome: 'Almofada lisa', desc: 'Visual clean, combina com qualquer roupa de cama.', foto: foto('1691207699465-603a8be4f7e3') },
    { nome: 'Enchimento de almofada', desc: 'Refil que devolve o volume às almofadas que você já tem.', foto: foto('1629949008265-af1bcaf59786') },
  ]},
  { id: 'roupagem', nome: 'Roupagem de cama', itens: [
    { nome: 'Lençóis', desc: 'Tecidos agradáveis ao toque, nas medidas do seu colchão.', foto: foto('1598535746036-87d13382f6a6') },
    { nome: 'Jogos de cama', desc: 'Lençol, elástico e fronhas combinando.', foto: foto('1762199904138-d163fe89540a') },
    { nome: 'Edredons', desc: 'Aconchego e acabamento para a cama nas noites frias.', foto: foto('1762199904500-266a6bd4e243') },
  ]},
  { id: 'acessorios', nome: 'Outros acessórios', itens: [
    { nome: 'Protetor de colchão', desc: 'Protege contra suor e sujeira e pode ser lavado.', foto: foto('1759176170879-6bd7073ab4f4') },
    { nome: 'Protetor de travesseiro', desc: 'Prolonga a vida útil do travesseiro.', foto: foto('1539438050859-39219d86bde8') },
    { nome: 'Cobertores', desc: 'Leves ou mais encorpados, para cada estação.', foto: foto('1734553529922-bc020a21643b') },
  ]},
];

const linkWhats = texto => `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;

/* Atalhos das categorias e vitrines */
document.getElementById('atalhos').innerHTML = CATALOGO
  .map(c => `<a href="#${c.id}">${c.nome}</a>`).join('');

document.getElementById('vitrines').innerHTML = CATALOGO.map(c => `
  <section id="${c.id}" class="vitrine">
    <h3>${c.nome}</h3>
    <ul class="grade" style="--colunas: ${c.itens.length}">
      ${c.itens.map(p => `
        <li class="produto">
          <div class="produto-foto"><img src="${p.foto}" alt="" loading="lazy"></div>
          <h4>${p.nome}</h4>
          <p>${p.desc}</p>
          <a class="botao botao-linha" href="${linkWhats(`Olá! Vi no catálogo da Criare e gostaria de saber mais sobre: ${p.nome}.`)}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
        </li>`).join('')}
    </ul>
  </section>`).join('');

/* Links gerais de WhatsApp */
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = linkWhats(a.dataset.wa);
  a.target = '_blank';
  a.rel = 'noopener';
});

/* Contatos do rodapé: só aparecem os que estão preenchidos */
const icones = {
  instagram: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.5l.5-3h-3V6.8c0-.5.3-.8.8-.8H15z"/></svg>',
};
const redes = ['instagram', 'facebook'].filter(r => CONTATO[r]);
document.getElementById('redes').innerHTML = redes.map(r => `
  <a class="rede" href="${CONTATO[r]}" target="_blank" rel="noopener">${icones[r]}<span>${r === 'instagram' ? 'Instagram' : 'Facebook'}</span></a>`).join('');
const email = document.getElementById('email');
if (CONTATO.email) email.innerHTML = `<a href="mailto:${CONTATO.email}">${CONTATO.email}</a>`;
else email.hidden = true;

/* Animação Revelar nas fotos */
const fotos = document.querySelectorAll('.produto-foto img, .sobre-foto img');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelector('img').classList.add('revelada');
      observador.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  fotos.forEach(f => {
    f.classList.add('revelar');
    const li = f.closest('li');
    f.style.transitionDelay = li ? `${[...li.parentElement.children].indexOf(li) * 110}ms` : '0ms';
    // Observa a moldura: a foto recortada conta como fora da tela
    observador.observe(f.parentElement);
  });
}
