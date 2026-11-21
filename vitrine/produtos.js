/* ==========================================================================
   CATÁLOGO DA SEMANA: é só este arquivo que muda toda semana.

   • Banners do topo: edite a lista BANNERS (título, texto, foto e para onde leva).
   • Ofertas: coloque  oferta: { de: 1899.90, por: 1499.90 }  no produto.
     Ele vai para "Destaques da semana" com o selo de desconto (-21%).
     Para tirar da oferta, apague a parte "oferta".
   • Destaque sem desconto: coloque  destaque: true  no produto.
   • Validade das ofertas: troque a data em OFERTAS_ATE.
   • Preço normal (opcional): preco: 1299.90. Sem preço, aparece "Consulte".
   • Selo opcional: selo: 'Lançamento' (ou 'Mais vendido', 'Últimas peças'...).
   • Produto novo: copie uma linha, troque o nome, o detalhe e a foto.
     A foto vai na pasta fotos/, de preferência quadrada (800 x 800).
   • Produto que acabou: apague a linha dele.
   ========================================================================== */

const LOJA = {
  whatsapp: '5547992156344',          // só números, com 55 + DDD
  telefone: '(47) 99215-6344',
  instagram: 'https://www.instagram.com/criarecolchoeseacessorios/',
  usuario: '@criarecolchoeseacessorios',
  bio: 'Colchões, camas, baús e enxoval em Blumenau. Venha deitar e testar antes de escolher.',
  endereco: 'Rua Amazonas, 3815, Garcia, Blumenau, SC',
  horario: '',                        // ex.: 'Seg a sex, 9h às 18h · Sáb, 9h às 13h' (vazio não aparece)
};

const OFERTAS_ATE = '';  // combos com preço fixo da tabela: sem data de validade

/* Banners do topo (passam sozinhos). "link": '#destaques' ou '#categoria/<id da categoria>' */
const BANNERS = [
  { rotulo: 'Combos', titulo: 'Até 28% off no combo colchão + box + cabeceira', botao: 'Ver combos', foto: 'conjunto-king-ortopedico', link: '#destaques' },
  { rotulo: 'Lançamento', titulo: 'Cabeceira EVO ripada', botao: 'Conhecer', foto: 'cabeceira-evo-preta', link: '#categoria/cabeceiras' },
  { rotulo: 'Quarto completo', titulo: 'Colchão, box e cabeceira em um só conjunto', botao: 'Ver conjuntos', foto: 'conjunto-casal-rose', link: '#categoria/conjuntos' },
];

const CATEGORIAS = [
  { id: 'colchoes', nome: 'Colchões', produtos: [
    // Descrição: linha · tamanho + medida · densidade · altura (dados da tabela de preços)
    { nome: 'Colchão Molas Cloud Pillow', detalhe: 'Molas ensacadas · Casal 138 x 188 cm · D28 · 30 cm', foto: 'colchao-casal-cloud', preco: 1650, selo: 'Mais vendido' },
    { nome: 'Colchão Magnético com Massageador Azul', detalhe: 'Magnético VB · Casal 138 x 188 cm · D28/D33 · 30 cm', foto: 'colchao-casal-azul', preco: 5000 },
    { nome: 'Colchão Magnético com Massageador Bege', detalhe: 'Magnético VB · Casal 138 x 188 cm · D28/D33 · 30 cm', foto: 'colchao-casal-magnetico-bege', preco: 5000 },
    { nome: 'Colchão Ortopédico', detalhe: 'Ortopédico I.so · Casal 138 x 188 cm · D28 + soft · 30 cm', foto: 'colchao-casal-ortopedico', preco: 1700 },
    { nome: 'Colchão ISO Pillow D33', detalhe: 'Ortopédico I.so · Casal 138 x 188 cm · D33 + soft · 35 cm', foto: 'colchao-casal-iso-pillow', preco: 1900 },
    { nome: 'Colchão Molas Cloud Pillow', detalhe: 'Molas ensacadas · Queen 158 x 198 cm · D28 · 30 cm', foto: 'colchao-queen-cloud', preco: 1900 },
    { nome: 'Colchão com Massageador sem Fio Cinza', detalhe: 'Magnético VB · Queen 158 x 198 cm · D28/D33 · 30 cm', foto: 'colchao-queen-cinza', preco: 5800 },
    { nome: 'Colchão com Massageador', detalhe: 'Queen · vermelho · 158 x 198 x 40 cm', foto: 'colchao-queen-vermelho', destaque: true },
    { nome: 'Colchão de Molas Ensacadas', detalhe: 'Com base box', foto: 'colchao-molas-ensacadas' },
    { nome: 'Colchão Ortopédico Basic', detalhe: 'Ortopédico Basic · Solteiro 88 x 188 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', preco: 800 },
    { nome: 'Colchão Ortopédico Basic', detalhe: 'Ortopédico Basic · Casal 138 x 188 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', preco: 1200 },
    { nome: 'Colchão Ortopédico Basic', detalhe: 'Ortopédico Basic · Queen 158 x 198 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', preco: 1500 },
    { nome: 'Colchão Ortopédico Basic', detalhe: 'Ortopédico Basic · King 193 x 203 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', preco: 1900 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Solteiro 88 x 188 cm · D33 · 25 cm', foto: 'colchao-iso-25-bege', preco: 1100 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Solteiro 88 x 188 cm · D33 · 30 cm', foto: 'colchao-casal-ortopedico', preco: 1200 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Solteiro 88 x 188 cm · D28 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', preco: 1350 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Casal 138 x 188 cm · D33/D28 · 25 cm', foto: 'colchao-iso-25-cinza', preco: 1600 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Queen 158 x 198 cm · D33 · 25 cm', foto: 'colchao-iso-25-preto', preco: 1900 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Queen 158 x 198 cm · D33 · 30 cm', foto: 'colchao-casal-ortopedico', preco: 1900 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · Queen 158 x 198 cm · D33 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', preco: 2100 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · King 193 x 203 cm · D33/D28 · 25 cm', foto: 'colchao-iso-25-bege', preco: 2650 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · King 193 x 203 cm · D33/D28 · 30 cm', foto: 'colchao-casal-ortopedico', preco: 2650 },
    { nome: 'Colchão Ortopédico I.so', detalhe: 'Ortopédico I.so · King 193 x 203 cm · D33 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', preco: 2650 },
    { nome: 'Colchão Molas Ensacadas Cinza', detalhe: 'Molas ensacadas · Queen 158 x 198 cm · D33 · 30 cm', foto: 'colchao-molas-ensacadas', preco: 1800 },
    { nome: 'Colchão Molas Ensacadas Campinas', detalhe: 'Molas ensacadas · Queen 158 x 198 cm · D45 · 35 cm', foto: 'colchao-molas-ensacadas', preco: 2150 },
    { nome: 'Colchão Magnético com Luzes', detalhe: 'Magnético Luzes · Casal 138 x 188 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', preco: 6000 },
    { nome: 'Colchão Magnético com Luzes', detalhe: 'Magnético Luzes · Queen 158 x 198 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', preco: 7500 },
    { nome: 'Colchão Magnético com Luzes', detalhe: 'Magnético Luzes · King 193 x 203 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', preco: 8300 },
    { nome: 'Colchão Magnético VB', detalhe: 'Magnético VB · King 193 x 203 cm · D28/D33 · 30 cm', foto: 'colchao-casal-azul', preco: 6800 },
  ]},
  { id: 'conjuntos', nome: 'Conjuntos', produtos: [
    // Combos (tabela): colchão + box + cabeceira. "de" = soma das peças, "por" = preço do combo
    { nome: 'Combo Ortopédico Basic', detalhe: 'Colchão + box + cabeceira · Ortopédico Basic · Solteiro 88 x 188 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', oferta: { de: 1540, por: 1390 } },
    { nome: 'Combo Ortopédico Basic', detalhe: 'Colchão + box + cabeceira · Ortopédico Basic · Casal 138 x 188 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', oferta: { de: 2130, por: 2030 } },
    { nome: 'Combo Ortopédico Basic', detalhe: 'Colchão + box + cabeceira · Ortopédico Basic · Queen 158 x 198 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', oferta: { de: 2650, por: 2550 } },
    { nome: 'Combo Ortopédico Basic', detalhe: 'Colchão + box + cabeceira · Ortopédico Basic · King 193 x 203 cm · D28/D33 · 10 cm', foto: 'colchao-basic-10', oferta: { de: 3250, por: 3150 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Solteiro 88 x 188 cm · D33 · 25 cm', foto: 'colchao-iso-25-bege', oferta: { de: 1840, por: 1650 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Solteiro 88 x 188 cm · D33 · 30 cm', foto: 'colchao-casal-ortopedico', oferta: { de: 1940, por: 1750 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Solteiro 88 x 188 cm · D28 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', oferta: { de: 2090, por: 1900 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Casal 138 x 188 cm · D33/D28 · 25 cm', foto: 'colchao-iso-25-cinza', oferta: { de: 2530, por: 2230 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Casal 138 x 188 cm · D28 + soft · 30 cm', foto: 'colchao-casal-ortopedico', oferta: { de: 2630, por: 2330 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Casal 138 x 188 cm · D33 + soft · 35 cm', foto: 'colchao-casal-iso-pillow', oferta: { de: 2830, por: 2530 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Queen 158 x 198 cm · D33 · 25 cm', foto: 'colchao-iso-25-preto', oferta: { de: 3050, por: 2750 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Queen 158 x 198 cm · D33 · 30 cm', foto: 'colchao-casal-ortopedico', oferta: { de: 3050, por: 2750 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · Queen 158 x 198 cm · D33 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', oferta: { de: 3250, por: 2950 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · King 193 x 203 cm · D33/D28 · 25 cm', foto: 'conjunto-king-ortopedico', oferta: { de: 4000, por: 3450 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · King 193 x 203 cm · D33/D28 · 30 cm', foto: 'conjunto-king-ortopedico', oferta: { de: 4000, por: 3300 } },
    { nome: 'Combo Ortopédico I.so', detalhe: 'Colchão + box + cabeceira · Ortopédico I.so · King 193 x 203 cm · D33 + soft · 30 cm', foto: 'colchao-casal-iso-pillow', oferta: { de: 4000, por: 3200 } },
    { nome: 'Combo Molas Ensacadas', detalhe: 'Colchão + box + cabeceira · Molas ensacadas · Casal 138 x 188 cm · D28 · 30 cm', foto: 'colchao-casal-cloud', oferta: { de: 2580, por: 2120 } },
    { nome: 'Combo Molas Ensacadas', detalhe: 'Colchão + box + cabeceira · Molas ensacadas · Queen 158 x 198 cm · D28 · 30 cm', foto: 'colchao-queen-cloud', oferta: { de: 3050, por: 2600 } },
    { nome: 'Combo Molas Ensacadas Cinza', detalhe: 'Colchão + box + cabeceira · Molas ensacadas · Queen 158 x 198 cm · D33 · 30 cm', foto: 'colchao-molas-ensacadas', oferta: { de: 2950, por: 2400 } },
    { nome: 'Combo Molas Ensacadas Campinas', detalhe: 'Colchão + box + cabeceira · Molas ensacadas · Queen 158 x 198 cm · D45 · 35 cm', foto: 'colchao-molas-ensacadas', oferta: { de: 3550, por: 3200 } },
    { nome: 'Combo Magnético com Luzes', detalhe: 'Colchão + box + cabeceira · Magnético Luzes · Casal 138 x 188 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', oferta: { de: 7100, por: 6300 } },
    { nome: 'Combo Magnético com Luzes', detalhe: 'Colchão + box + cabeceira · Magnético Luzes · Queen 158 x 198 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', oferta: { de: 8650, por: 6700 } },
    { nome: 'Combo Magnético com Luzes', detalhe: 'Colchão + box + cabeceira · Magnético Luzes · King 193 x 203 cm · D33 + pillow · 30 cm', foto: 'colchao-queen-magnetico-marrom', oferta: { de: 9550, por: 7600 } },
    { nome: 'Combo Magnético VB', detalhe: 'Colchão + box + cabeceira · Magnético VB · Casal 138 x 188 cm · D28/D33 · 30 cm', foto: 'colchao-casal-azul', oferta: { de: 6100, por: 5300 } },
    { nome: 'Combo Magnético VB', detalhe: 'Colchão + box + cabeceira · Magnético VB · Queen 158 x 198 cm · D28/D33 · 30 cm', foto: 'colchao-queen-cinza', oferta: { de: 6950, por: 5000 } },
    { nome: 'Combo Magnético VB', detalhe: 'Colchão + box + cabeceira · Magnético VB · King 193 x 203 cm · D28/D33 · 30 cm', foto: 'colchao-casal-azul', oferta: { de: 8050, por: 6100 } },
    { nome: 'Conjunto Casal Rosé', detalhe: 'Colchão + box + cabeceira', foto: 'conjunto-casal-rose' },
    { nome: 'Conjunto com Cabeceira Modular', detalhe: 'Colchão + box + cabeceira', foto: 'conjunto-cabeceira-modular' },
    { nome: 'Conjunto Solteiro com Auxiliar', detalhe: 'Colchão ISO D33 30 cm + box + cama auxiliar', foto: 'conjunto-solteiro-auxiliar' },
    { nome: 'Conjugado Baú Solteiro com Auxiliar', detalhe: '90 x 190 x 39 cm · auxiliar 175 x 75 x 12 cm', foto: 'conjugado-bau-solteiro' },
  ]},
  { id: 'box', nome: 'Camas Box', produtos: [
    { nome: 'Base Box Bege', detalhe: 'Solteiro, Queen e King · 25 cm', foto: 'box-bege' },
    { nome: 'Base Box Marrom', detalhe: 'Queen · 158 x 198 x 26 cm', foto: 'box-queen-marrom', preco: 700 },
    { nome: 'Base Box Cinza', detalhe: 'Casal', foto: 'box-casal-cinza', preco: 550 },
    { nome: 'Base Box Cinza', detalhe: 'Solteiro', foto: 'box-solteiro-cinza', preco: 450 },
    { nome: 'Base Box Bipartida Bege', detalhe: 'Queen ou King', foto: 'box-king-queen-bege' },
  ]},
  { id: 'baus', nome: 'Camas Baú', produtos: [
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · bege', foto: 'bau-casal-bege', preco: 1200 },
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · preto', foto: 'bau-casal-preto', preco: 1200 },
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · palha', foto: 'bau-casal-palha', preco: 1200 },
    { nome: 'Baú com Pegador e Amortecedor', detalhe: 'Casal · preto · 140 x 190 x 31 cm', foto: 'bau-casal-amortecedor', preco: 1200 },
    { nome: 'Baú Bipartido', detalhe: 'Queen ou King · bege', foto: 'bau-king-queen-bege' },
    { nome: 'Baú Bipartido', detalhe: 'Queen · cinza', foto: 'bau-queen', preco: 1500 },
    { nome: 'Baú com Abertura Lateral', detalhe: 'Solteiro', foto: 'bau-solteiro-lateral', preco: 750 },
    { nome: 'Baú Suede Rosa', detalhe: 'Solteiro', foto: 'bau-solteiro-rosa', preco: 750 },
    { nome: 'Baú Suede Preto', detalhe: 'Solteiro', foto: 'bau-solteiro-preto', preco: 750 },
  ]},
  { id: 'cabeceiras', nome: 'Cabeceiras', produtos: [
    // Descrição: tamanho · medida · modelo
    { nome: 'Cabeceira EVO', detalhe: 'Preta · ripada', foto: 'cabeceira-evo-preta', selo: 'Lançamento', destaque: true },
    { nome: 'Cabeceira Solteiro', detalhe: 'Solteiro · 0,90 m', foto: 'cabeceira-solteiro', preco: 290 },
    { nome: 'Cabeceira Preta Strass', detalhe: 'Casal · 1,40 m · Preta strass', foto: 'cabeceira-preta-strass', preco: 380 },
    { nome: 'Cabeceira Quadriculada', detalhe: 'Queen · 1,60 m · Quadriculada', foto: 'cabeceira-quadriculada', preco: 450 },
    { nome: 'Cabeceira Luna Linho Bege', detalhe: 'King · 1,95 m · Luna Linho Bege', foto: 'cabeceira-luna-linho', preco: 550 },
    { nome: 'Cabeceira Estofada', detalhe: 'Cinza', foto: 'cabeceira-cinza' },
    { nome: 'Cabeceira Estofada', detalhe: 'Bege', foto: 'cabeceira-bege' },
    { nome: 'Cabeceira Estofada Modular', detalhe: 'Queen · monte do seu jeito', foto: 'cabeceira-modular-queen' },
    { nome: 'Cabeceira Estofada Modular', detalhe: 'Solteiro · várias cores', foto: 'cabeceira-modular-solteiro' },
  ]},
  { id: 'travesseiros', nome: 'Travesseiros', produtos: [
    // Descrição: marca · modelo · tipo · tamanho
    { nome: 'Travesseiro Suave', detalhe: 'Hedrons · Suave · Fibra siliconizada · 50 x 70 cm', foto: 'travesseiro-hedrons-suave', preco: 29.90 },
    { nome: 'Travesseiro Médio', detalhe: 'Hedrons · Médio · Fibra siliconizada · 50 x 70 cm', foto: 'travesseiro-hedrons-medio', preco: 49.90 },
    { nome: 'Travesseiro Firme', detalhe: 'Hedrons · Firme · Fibra siliconizada · 50 x 70 cm', foto: 'travesseiro-hedrons-firme', preco: 59.90 },
    { nome: 'Travesseiro Clorido', detalhe: 'Hedrons · Clorido · Fibra siliconizada · 50 x 70 cm', foto: '', preco: 39.90 },
    { nome: 'Travesseiro Azul', detalhe: 'Mario\'s · Azul · Látex · 60 x 40 cm', foto: 'travesseiro-marios-latex', preco: 140 },
    { nome: 'Travesseiro Flocos', detalhe: 'Mario\'s · Flocos · Espuma · 60 x 40 cm', foto: 'travesseiro-marios-flocos', preco: 120 },
    { nome: 'Travesseiro Cervical', detalhe: 'Mario\'s · Cervical · Viscoelástico · 60 x 40 cm', foto: 'travesseiro-marios-cervical', preco: 160 },
  ]},
  { id: 'jogos', nome: 'Jogos de Cama', produtos: [
    // Jogo de lençol (tabela): medida · modelo
    { nome: 'Jogo de Lençol', detalhe: '1,40 m · Casal', foto: 'jogo-lencol-casal', preco: 165 },
    { nome: 'Jogo de Lençol', detalhe: '1,60 m · Queen', foto: '', preco: 180 },
    { nome: 'Jogo de Lençol', detalhe: '1,95 m · King', foto: 'jogo-lencol-king', preco: 260 },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'King · 3 peças · 100% algodão', foto: 'jogo-edromania-king' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Casal · 3 peças · algodão', foto: 'jogo-edromania-casal-algodao' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Casal · 3 peças · floral', foto: 'jogo-edromania-casal-floral' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Casal · 3 peças · azul', foto: 'jogo-edromania-casal-azul' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Queen · 3 peças · algodão', foto: 'jogo-edromania-queen-algodao' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Queen · 3 peças · verde', foto: 'jogo-edromania-queen-verde' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Queen · 3 peças · cinza', foto: 'jogo-edromania-queen-cinza' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Casal · 3 peças · folhas', foto: 'jogo-malha-casal-folhas' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Casal · 3 peças · xadrez', foto: 'jogo-malha-casal-xadrez' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Casal · 3 peças · vermelho', foto: 'jogo-malha-casal-vermelho' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Queen · 3 peças · azul', foto: 'jogo-malha-queen-azul' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Queen · 3 peças · floral', foto: 'jogo-malha-queen-floral' },
    { nome: 'Jogo de Cama Malha', detalhe: 'Queen · 3 peças · folhas', foto: 'jogo-malha-queen-folhas' },
    { nome: 'Jogo de Cama Amália Enxovais', detalhe: 'King · rosa', foto: 'jogo-amalia-king-rosa' },
    { nome: 'Jogo de Cama Amália Enxovais', detalhe: 'Queen · rosa', foto: 'jogo-amalia-queen-rosa' },
    { nome: 'Jogo de Cama Amália Enxovais', detalhe: 'Casal · branco', foto: 'jogo-amalia-casal-branco' },
    { nome: 'Jogo de Cama Amália Enxovais', detalhe: 'Solteiro · 2 peças · rosa', foto: 'jogo-amalia-solteiro-rosa' },
    { nome: 'Jogo de Cama Amália Enxovais', detalhe: 'Solteiro · 2 peças · cinza', foto: 'jogo-amalia-solteiro-cinza' },
    { nome: 'Jogo de Cama Allenburg', detalhe: 'Casal', foto: 'jogo-allenburg-casal' },
  ]},
  { id: 'acessorios', nome: 'Acessórios', produtos: [
    // Capa impermeável (tabela): medida · modelo
    { nome: 'Capa Impermeável', detalhe: '1,40 m · Casal', foto: '', preco: 165 },
    { nome: 'Capa Impermeável', detalhe: '1,60 m · Queen', foto: 'capa-impermeavel-queen', preco: 180 },
    { nome: 'Capa Impermeável', detalhe: '1,95 m · King', foto: 'capa-impermeavel-king' },
    { nome: 'Combo Lençol + Capa + Travesseiro', detalhe: 'Jogo de lençol, capa impermeável e travesseiro', foto: '', preco: 249 },
    { nome: 'Cobertor Peluciado Sherpa', detalhe: 'King', foto: 'cobertor-king-peluciado' },
    { nome: 'Protetor de Colchão Impermeável', detalhe: 'Hedrons', foto: 'protetor-impermeavel' },
    { nome: 'Protetor de Colchão', detalhe: 'Queen · 158 x 198 x 40 cm', foto: 'protetor-queen' },
    { nome: 'Enchimento de Almofada', detalhe: 'Hedrons', foto: 'enchimento-almofada' },
  ]},
];
