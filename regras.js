/* Regras do questionário. Tudo que a fábrica precisar ajustar fica neste arquivo.
   PERGUNTAS define o que é perguntado; recomendar() transforma respostas em colchão. */

const WHATSAPP = '5547992156344';

const PERGUNTAS = [
  { id: 'quem', titulo: 'Quem vai dormir nesse colchão?', opcoes: [
    { v: 'solo', t: 'Só eu' },
    { v: 'casal', t: 'Eu e mais uma pessoa' },
  ]},
  { id: 'peso', titulo: 'Qual é o seu peso, aproximadamente?',
    ajuda: 'O peso define a densidade que sustenta o corpo sem afundar.', opcoes: [
    { v: 60, t: 'Até 60 kg' },
    { v: 80, t: '61 a 80 kg' },
    { v: 100, t: '81 a 100 kg' },
    { v: 120, t: '101 a 120 kg' },
    { v: 150, t: 'Acima de 120 kg' },
  ]},
  { id: 'peso2', se: r => r.quem === 'casal', titulo: 'E o peso da outra pessoa?',
    ajuda: 'O colchão é dimensionado para quem pesa mais.', opcoes: [
    { v: 60, t: 'Até 60 kg' },
    { v: 80, t: '61 a 80 kg' },
    { v: 100, t: '81 a 100 kg' },
    { v: 120, t: '101 a 120 kg' },
    { v: 150, t: 'Acima de 120 kg' },
  ]},
  { id: 'altura', titulo: 'Qual é a altura de quem é mais alto na cama?', opcoes: [
    { v: 170, t: 'Até 1,70 m' },
    { v: 185, t: '1,71 a 1,85 m' },
    { v: 195, t: '1,86 a 1,95 m' },
    { v: 210, t: 'Acima de 1,95 m' },
  ]},
  { id: 'posicao', titulo: 'Em que posição você costuma dormir?', opcoes: [
    { v: 'lado', t: 'De lado' },
    { v: 'costas', t: 'De costas' },
    { v: 'brucos', t: 'De bruços' },
    { v: 'varia', t: 'Mudo a noite toda' },
  ]},
  { id: 'dor', titulo: 'Como você costuma acordar?', opcoes: [
    { v: 'nenhuma', t: 'Bem, sem incômodo' },
    { v: 'lombar', t: 'Com a lombar dolorida' },
    { v: 'ombros', t: 'Com ombros ou quadril doloridos' },
    { v: 'pescoco', t: 'Com o pescoço dolorido' },
    { v: 'cansaco', t: 'Cansado, mesmo depois de dormir' },
  ]},
  { id: 'calor', titulo: 'Como é a sua temperatura durante a noite?', opcoes: [
    { v: 'quente', t: 'Sinto calor e acordo suando' },
    { v: 'neutro', t: 'Normal' },
    { v: 'frio', t: 'Sinto frio com facilidade' },
  ]},
  { id: 'sensacao', titulo: 'Que sensação você prefere ao deitar?', opcoes: [
    { v: 'macio', t: 'Macio, de afundar um pouco' },
    { v: 'medio', t: 'Equilibrado' },
    { v: 'firme', t: 'Firme, de ficar por cima' },
    { v: 'naosei', t: 'Não sei dizer' },
  ]},
  { id: 'movimento', se: r => r.quem === 'casal', titulo: 'Você acorda quando a outra pessoa se mexe?', opcoes: [
    { v: 'muito', t: 'Sim, com frequência' },
    { v: 'pouco', t: 'Às vezes' },
    { v: 'nao', t: 'Não' },
  ]},
  { id: 'alergia', titulo: 'Alguém na cama tem rinite ou alergia a ácaros?', opcoes: [
    { v: 'sim', t: 'Sim' },
    { v: 'nao', t: 'Não' },
  ]},
  { id: 'medida', titulo: 'Qual medida você precisa?', ajuda: 'Medidas em centímetros, largura por comprimento.', opcoes: [
    { v: 'Solteiro 88 x 188', t: 'Solteiro', d: '88 x 188', c: 188 },
    { v: 'Solteiro King 96 x 203', t: 'Solteiro King', d: '96 x 203', c: 203 },
    { v: 'Viúva 128 x 188', t: 'Viúva', d: '128 x 188', c: 188 },
    { v: 'Casal 138 x 188', t: 'Casal', d: '138 x 188', c: 188 },
    { v: 'Queen 158 x 198', t: 'Queen', d: '158 x 198', c: 198 },
    { v: 'King 193 x 203', t: 'King', d: '193 x 203', c: 203 },
    { v: 'Sob medida', t: 'Sob medida', d: 'Combinamos com você', c: 999 },
  ]},
  { id: 'extras', multipla: true, titulo: 'Precisa de mais alguma coisa para o quarto?', ajuda: 'Marque quantas quiser, ou siga sem marcar.', opcoes: [
    { v: 'Base box', t: 'Base box' },
    { v: 'Base baú', t: 'Base baú' },
    { v: 'Cabeceira', t: 'Cabeceira' },
    { v: 'Protetor de colchão', t: 'Protetor de colchão' },
    { v: 'Jogo de cama', t: 'Jogo de cama' },
    { v: 'Cobertor', t: 'Cobertor' },
  ]},
];

/* Densidade da espuma pela faixa de peso de quem pesa mais. */
const DENSIDADES = [
  { ate: 60, nome: 'D23', faixa: 'Até 60 kg' },
  { ate: 80, nome: 'D28', faixa: '61 a 80 kg' },
  { ate: 100, nome: 'D33', faixa: '81 a 100 kg' },
  { ate: 120, nome: 'D40', faixa: '101 a 120 kg' },
  { ate: 150, nome: 'D45', faixa: 'Acima de 120 kg' },
];

const NUCLEOS = {
  ensacada: { nome: 'Molas ensacadas', desc: 'Cada mola trabalha sozinha e o ar circula entre elas.' },
  espuma: { nome: 'Espuma', desc: 'Sustentação uniforme, sem molas, com a densidade certa para o peso.' },
  bonnel: { nome: 'Molas interligadas', desc: 'Base mais firme e ventilada, com molas ligadas entre si.' },
};

const FIRMEZA_BASE = { 60: 4, 80: 5, 100: 6, 120: 7, 150: 8 };

function rotuloFirmeza(f) {
  if (f <= 3.5) return 'Macio';
  if (f <= 5) return 'Médio macio';
  if (f <= 6.5) return 'Médio';
  if (f <= 8) return 'Médio firme';
  return 'Firme';
}

function calcularFirmeza(r, peso) {
  let f = FIRMEZA_BASE[peso] || 5;
  f += { lado: -1, costas: 0.5, brucos: 1.5 }[r.posicao] || 0;
  f += { lombar: 0.5, ombros: -1 }[r.dor] || 0;
  f += { macio: -1.5, firme: 1.5 }[r.sensacao] || 0;
  return Math.min(10, Math.max(1, f));
}

function escolherNucleo(r, peso, firmeza) {
  const p = { ensacada: 0, espuma: 0, bonnel: 0 };
  if (r.calor === 'quente') { p.ensacada += 2; p.bonnel += 1; }
  if (r.calor === 'frio') p.espuma += 1;
  if (r.quem === 'casal') p.ensacada += 1;
  if (r.movimento === 'muito') { p.ensacada += 3; p.espuma += 1; p.bonnel -= 1; }
  if (peso > 120) { p.espuma += 2; p.ensacada += 1; }
  if (peso <= 60) p.espuma += 1;
  if (r.posicao === 'lado') p.ensacada += 1;
  if (r.posicao === 'brucos') { p.espuma += 1; p.bonnel += 1; }
  if (r.dor === 'ombros') p.ensacada += 1;
  if (r.dor === 'lombar') { p.ensacada += 1; p.espuma += 1; }
  if (firmeza >= 7.5) { p.bonnel += 1; p.espuma += 1; }
  // Em empate vale a ordem do objeto: ensacada, espuma, molas interligadas.
  return Object.keys(p).reduce((a, b) => (p[b] > p[a] ? b : a));
}

function escolherConforto(r, firmeza) {
  const quente = r.calor === 'quente';
  if (firmeza >= 7.5 || r.posicao === 'brucos') {
    return { nome: 'Tampo plano', desc: 'Sem pillow top, para o corpo não afundar.' };
  }
  if (firmeza <= 4.5 || r.posicao === 'lado' || r.dor === 'ombros') {
    return quente
      ? { nome: 'Pillow top ventilado', desc: 'Camada macia com espuma ventilada, que acumula menos calor.' }
      : { nome: 'Pillow top viscoelástico', desc: 'Camada macia que alivia a pressão em ombros e quadril.' };
  }
  return { nome: 'Euro pillow', desc: 'Camada intermediária de conforto, integrada ao colchão.' };
}

function escolherTecido(r) {
  const partes = [r.calor === 'quente' ? 'Malha respirável' : 'Malha de conforto'];
  if (r.alergia === 'sim') partes.push('tratamento antiácaro');
  return partes.join(' com ');
}

function recomendar(r) {
  const peso = Math.max(r.peso || 80, r.peso2 || 0);
  const firmeza = calcularFirmeza(r, peso);
  const chaveNucleo = escolherNucleo(r, peso, firmeza);
  const densidade = DENSIDADES.find(d => peso <= d.ate) || DENSIDADES[DENSIDADES.length - 1];
  const nucleo = NUCLEOS[chaveNucleo];
  const conforto = escolherConforto(r, firmeza);

  const motivos = [];
  if (chaveNucleo === 'espuma') motivos.push(`Densidade ${densidade.nome} indicada para ${densidade.faixa.toLowerCase()}, sem afundar com o tempo.`);
  else motivos.push(`Molas dimensionadas para ${densidade.faixa.toLowerCase()}, faixa de quem pesa mais na cama.`);
  if (r.movimento === 'muito' && chaveNucleo === 'ensacada') motivos.push('As molas independentes reduzem o movimento que chega ao outro lado da cama.');
  if (r.calor === 'quente') motivos.push(chaveNucleo === 'espuma' ? 'Como você sente calor, a malha respirável ajuda a dissipar a temperatura.' : 'Como você sente calor, o ar entre as molas e a malha respirável ajudam a noite a ficar mais fresca.');
  if (r.posicao === 'lado') motivos.push('Dormindo de lado, ombro e quadril precisam afundar um pouco para a coluna ficar alinhada.');
  if (r.posicao === 'brucos') motivos.push('De bruços, uma superfície mais firme evita que o quadril afunde e force a lombar.');
  if (r.alergia === 'sim') motivos.push('Com alergia na cama, o tratamento antiácaro e um protetor de colchão fazem diferença.');

  const avisos = [];
  if (r.dor === 'lombar' || r.dor === 'ombros') avisos.push('Se a dor é frequente, vale conversar com um médico ou fisioterapeuta. O colchão ajuda, mas não substitui essa avaliação.');
  if (r.dor === 'pescoco') avisos.push('Dor no pescoço costuma ter relação com o travesseiro. Peça para avaliar a altura do seu na loja.');
  if (r.quem === 'casal' && Math.abs((r.peso || 0) - (r.peso2 || 0)) >= 40) avisos.push('Vocês têm uma diferença grande de peso. Deitem juntos na loja para confirmar a firmeza.');
  const op = PERGUNTAS.find(q => q.id === 'medida').opcoes.find(o => o.v === r.medida);
  if (op && r.altura && r.altura + 15 > op.c) avisos.push(`Para a altura informada, o comprimento de ${op.c} cm pode ficar curto. Como a Criare produz sob medida, peça um colchão mais longo.`);

  return { peso, densidade, firmeza, rotulo: rotuloFirmeza(firmeza), chaveNucleo, nucleo, conforto, tecido: escolherTecido(r), medida: r.medida, extras: r.extras || [], motivos, avisos };
}

function mensagemWhatsApp(r, rec) {
  const linhas = [
    'Olá! Fiz o questionário do sono no site da Criare e gostaria de um orçamento.',
    '',
    `Núcleo: ${rec.nucleo.nome}${rec.chaveNucleo === 'espuma' ? ' ' + rec.densidade.nome : ''}`,
    `Firmeza: ${rec.rotulo}`,
    `Conforto: ${rec.conforto.nome}`,
    `Tecido: ${rec.tecido}`,
    `Medida: ${rec.medida}`,
    `Peso de referência: ${rec.densidade.faixa}`,
  ];
  if (rec.extras.length) linhas.push(`Também preciso de: ${rec.extras.join(', ')}`);
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join('\n'))}`;
}
