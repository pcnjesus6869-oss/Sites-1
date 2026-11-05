/* Catálogo. Para incluir um modelo, acrescente uma linha. destaque: true aparece na página inicial. */
const foto = id => `https://images.unsplash.com/photo-${id}?w=700&q=70&auto=format&fit=crop`;

/* Aba Tipos de colchão: explica cada tipo. specs vira a lista abaixo da descrição. */
const TIPOS_COLCHAO = [
  { nome: 'Espuma', foto: foto('1635594202056-9ea3b497e5c0'),
    desc: 'Bloco de espuma que sustenta o corpo de forma uniforme. A densidade (D23, D28, D33...) precisa acompanhar o peso de quem dorme.',
    specs: [['Sensação', 'Do médio ao firme'], ['Combina com', 'Quem prefere superfície estável e sente pouco calor'], ['Atenção', 'Ventila menos que os modelos de molas']] },
  { nome: 'Molas ensacadas', foto: foto('1759176170912-3b192e8d14b0'),
    desc: 'Cada mola fica em um saquinho de tecido e trabalha sozinha, acompanhando o contorno do corpo.',
    specs: [['Sensação', 'Do macio ao médio firme'], ['Combina com', 'Casais e quem sente calor à noite'], ['Atenção', 'Costuma ter investimento maior']] },
  { nome: 'Molas interligadas', foto: foto('1617198998846-56e8a4c6e7b7'),
    desc: 'As molas são ligadas entre si e formam uma estrutura única, com apoio firme e boa circulação de ar.',
    specs: [['Sensação', 'Médio firme a firme'], ['Combina com', 'Quem dorme sozinho e gosta de firmeza'], ['Atenção', 'O movimento passa de um lado para o outro da cama']] },
  { nome: 'Pillow top', foto: foto('1759176170553-7c078c66c514'),
    desc: 'Camada extra de conforto costurada sobre o colchão. Deixa o toque mais macio sem mudar a sustentação do núcleo.',
    specs: [['Sensação', 'Macia na superfície'], ['Combina com', 'Quem dorme de lado'], ['Atenção', 'Pode não agradar quem dorme de bruços']] },
  { nome: 'Euro pillow', foto: foto('1759176171251-bb1f2788343f'),
    desc: 'Camada de conforto integrada ao colchão, sem o degrau do pillow top. O visual é mais reto e o toque, equilibrado.',
    specs: [['Sensação', 'Intermediária'], ['Combina com', 'Quem muda de posição durante a noite'], ['Atenção', 'É menos macio que o pillow top']] },
  { nome: 'Viscoelástico', foto: foto('1759176171789-0aa3f84d15ca'),
    desc: 'Espuma que reage ao calor e ao peso, moldando-se ao corpo e voltando devagar à forma original.',
    specs: [['Sensação', 'Envolvente'], ['Combina com', 'Quem sente pressão nos ombros e no quadril'], ['Atenção', 'Pode acumular calor, por isso a ventilação importa']] },
];

const TIPOS_CAMAS = [
  { nome: 'Cama box', foto: foto('1560185128-e173042f79dd'),
    desc: 'Conjunto de base e colchão pensados para trabalhar juntos, com medidas e visual combinando.',
    specs: [['Vantagem', 'Compra única e encaixe certo'], ['Pense em', 'Medida do quarto e altura final da cama']] },
  { nome: 'Base box', foto: foto('1506720186575-11354d325017'),
    desc: 'Base estofada que dá apoio uniforme ao colchão. É a escolha simples para quem não precisa de espaço para guardar.',
    specs: [['Vantagem', 'Apoio firme e visual limpo'], ['Pense em', 'Usar a mesma medida do colchão']] },
  { nome: 'Base baú', foto: foto('1768946131535-b90bad125f16'),
    desc: 'Base com compartimento interno que abre para guardar cobertores, malas e roupas fora de uso.',
    specs: [['Vantagem', 'Espaço extra em quartos pequenos'], ['Pense em', 'Área livre ao redor para a abertura']] },
];

const TIPOS_CABECEIRAS = [
  { nome: 'Cabeceira estofada', foto: foto('1774647001291-7b63c35d5edf'),
    desc: 'Revestida em tecido, tem superfície macia e deixa mais confortável sentar para ler ou assistir.',
    specs: [['Vantagem', 'Conforto ao encostar'], ['Pense em', 'Tecido fácil de limpar']] },
  { nome: 'Cabeceira capitonê', foto: foto('1505693416388-ac5ce068fe85'),
    desc: 'Estofada com botões que formam um desenho na superfície, para um visual mais clássico.',
    specs: [['Vantagem', 'Vira o destaque do quarto'], ['Pense em', 'Combinar com o restante da decoração']] },
  { nome: 'Cabeceira painel', foto: foto('1757417983938-2c2a931d41aa'),
    desc: 'Painel fixo na parede, que pode ocupar toda a largura do quarto e ir além da cama.',
    specs: [['Vantagem', 'Visual contínuo e moderno'], ['Pense em', 'Medida exata da parede']] },
];

const TIPOS_ENXOVAL = [
  { nome: 'Protetor de colchão', foto: foto('1759176170879-6bd7073ab4f4'),
    desc: 'Capa que fica entre o colchão e o lençol, protege contra suor e sujeira e pode ser lavada.',
    specs: [['Vantagem', 'Ajuda a conservar o colchão'], ['Pense em', 'Altura do colchão, para o encaixe']] },
  { nome: 'Jogo de cama', foto: foto('1601276174812-63280a55656e'),
    desc: 'Lençóis e fronhas que influenciam o toque e a temperatura da noite, de acordo com o tecido.',
    specs: [['Vantagem', 'Conforto e troca do visual'], ['Pense em', 'Medida e altura do colchão']] },
  { nome: 'Cobertor', foto: foto('1734553529922-bc020a21643b'),
    desc: 'Aquece nas noites frias. A escolha muda conforme o peso, o tecido e a temperatura do quarto.',
    specs: [['Vantagem', 'Ajuste para cada estação'], ['Pense em', 'Quanto frio você sente à noite']] },
  { nome: 'Enchimento de almofada', foto: foto('1629949009765-40fc74c9ec21'),
    desc: 'Refil que devolve o volume às almofadas e permite renovar capas que você já tem em casa.',
    specs: [['Vantagem', 'Renova sem trocar a capa'], ['Pense em', 'Tamanho da capa da almofada']] },
];

const CATEGORIAS = ['Colchões', 'Camas e bases', 'Cabeceiras', 'Enxoval e proteção'];

const PRODUTOS = [
  { nome: 'Colchões', categoria: 'Colchões', info: 'Feitos para o seu corpo', foto: foto('1759176170553-7c078c66c514'), destaque: true },
  { nome: 'Camas box', categoria: 'Camas e bases', info: 'Base e colchão juntos', foto: foto('1560185128-e173042f79dd'), destaque: true },
  { nome: 'Base box', categoria: 'Camas e bases', info: 'Apoio firme para o colchão', foto: foto('1506720186575-11354d325017') },
  { nome: 'Base baú', categoria: 'Camas e bases', info: 'Espaço para guardar', foto: foto('1768946131535-b90bad125f16'), destaque: true },
  { nome: 'Cabeceiras', categoria: 'Cabeceiras', info: 'Diversos modelos', foto: foto('1505693416388-ac5ce068fe85'), destaque: true },
  { nome: 'Protetor de colchão', categoria: 'Enxoval e proteção', info: 'Mais cuidado com o colchão', foto: foto('1759176170879-6bd7073ab4f4') },
  { nome: 'Jogos de cama', categoria: 'Enxoval e proteção', info: 'Lençóis e fronhas', foto: foto('1601276174812-63280a55656e') },
  { nome: 'Cobertores', categoria: 'Enxoval e proteção', info: 'Para as noites frias', foto: foto('1734553529922-bc020a21643b') },
  { nome: 'Enchimento de almofada', categoria: 'Enxoval e proteção', info: 'Almofadas sempre cheias', foto: foto('1629949009765-40fc74c9ec21') },
];
