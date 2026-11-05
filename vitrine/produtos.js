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

const OFERTAS_ATE = '09/11';

/* Banners do topo (passam sozinhos). "link": '#destaques' ou '#categoria/<id da categoria>' */
const BANNERS = [
  { rotulo: 'Ofertas da semana', titulo: 'Até 21% off em colchões e conjuntos', botao: 'Ver ofertas', foto: 'colchao-casal-cloud', link: '#destaques' },
  { rotulo: 'Lançamento', titulo: 'Cabeceira EVO ripada', botao: 'Conhecer', foto: 'cabeceira-evo-preta', link: '#categoria/cabeceiras' },
  { rotulo: 'Quarto completo', titulo: 'Colchão, box e cabeceira em um só conjunto', botao: 'Ver conjuntos', foto: 'conjunto-casal-rose', link: '#categoria/conjuntos' },
];

const CATEGORIAS = [
  { id: 'colchoes', nome: 'Colchões', produtos: [
    // VALORES DE EXEMPLO nas ofertas abaixo: trocar pelos preços reais antes de publicar
    { nome: 'Colchão Molas Cloud Pillow', detalhe: 'Casal · 138 x 188 x 30 cm', foto: 'colchao-casal-cloud', oferta: { de: 1899.90, por: 1499.90 }, selo: 'Mais vendido' },
    { nome: 'Colchão Magnético com Massageador', detalhe: 'Casal · azul · 138 x 188 x 30 cm', foto: 'colchao-casal-azul' },
    { nome: 'Colchão Magnético com Massageador', detalhe: 'Casal · bege · 138 x 188 x 30 cm', foto: 'colchao-casal-magnetico-bege' },
    { nome: 'Colchão Ortopédico', detalhe: 'Casal · 138 x 188 x 30 cm', foto: 'colchao-casal-ortopedico' },
    { nome: 'Colchão ISO Pillow D33', detalhe: 'Casal · 138 x 188 x 34 cm', foto: 'colchao-casal-iso-pillow' },
    { nome: 'Colchão Molas Cloud Pillow', detalhe: 'Queen · 158 x 198 x 30 cm', foto: 'colchao-queen-cloud' },
    { nome: 'Colchão com Massageador sem Fio', detalhe: 'Queen · cinza · 158 x 198 x 30 cm', foto: 'colchao-queen-cinza' },
    { nome: 'Colchão com Massageador', detalhe: 'Queen · vermelho · 158 x 198 x 40 cm', foto: 'colchao-queen-vermelho', destaque: true },
    { nome: 'Colchão de Molas Ensacadas', detalhe: 'Com base box', foto: 'colchao-molas-ensacadas' },
  ]},
  { id: 'conjuntos', nome: 'Conjuntos', produtos: [
    { nome: 'Conjunto Casal Rosé', detalhe: 'Colchão + box + cabeceira', foto: 'conjunto-casal-rose', oferta: { de: 2490.00, por: 1990.00 } },
    { nome: 'Conjunto com Cabeceira Modular', detalhe: 'Colchão + box + cabeceira', foto: 'conjunto-cabeceira-modular' },
    { nome: 'Conjunto Solteiro com Auxiliar', detalhe: 'Colchão ISO D33 30 cm + box + cama auxiliar', foto: 'conjunto-solteiro-auxiliar' },
    { nome: 'Conjugado Baú Solteiro com Auxiliar', detalhe: '90 x 190 x 39 cm · auxiliar 175 x 75 x 12 cm', foto: 'conjugado-bau-solteiro' },
  ]},
  { id: 'box', nome: 'Camas Box', produtos: [
    { nome: 'Base Box Bege', detalhe: 'Solteiro, Queen e King · 25 cm', foto: 'box-bege' },
    { nome: 'Base Box Marrom', detalhe: 'Queen · 158 x 198 x 26 cm', foto: 'box-queen-marrom' },
    { nome: 'Base Box Cinza', detalhe: 'Casal', foto: 'box-casal-cinza' },
    { nome: 'Base Box Cinza', detalhe: 'Solteiro', foto: 'box-solteiro-cinza' },
    { nome: 'Base Box Bipartida Bege', detalhe: 'Queen ou King', foto: 'box-king-queen-bege' },
  ]},
  { id: 'baus', nome: 'Camas Baú', produtos: [
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · bege', foto: 'bau-casal-bege', oferta: { de: 1590.00, por: 1290.00 } },
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · preto', foto: 'bau-casal-preto' },
    { nome: 'Baú com Amortecedor', detalhe: 'Casal · palha', foto: 'bau-casal-palha' },
    { nome: 'Baú com Pegador e Amortecedor', detalhe: 'Casal · preto · 140 x 190 x 31 cm', foto: 'bau-casal-amortecedor' },
    { nome: 'Baú Bipartido', detalhe: 'Queen ou King · bege', foto: 'bau-king-queen-bege' },
    { nome: 'Baú Bipartido', detalhe: 'Queen · cinza', foto: 'bau-queen' },
    { nome: 'Baú com Abertura Lateral', detalhe: 'Solteiro', foto: 'bau-solteiro-lateral' },
    { nome: 'Baú Suede Rosa', detalhe: 'Solteiro', foto: 'bau-solteiro-rosa' },
    { nome: 'Baú Suede Preto', detalhe: 'Solteiro', foto: 'bau-solteiro-preto' },
  ]},
  { id: 'cabeceiras', nome: 'Cabeceiras', produtos: [
    { nome: 'Cabeceira EVO', detalhe: 'Preta · ripada', foto: 'cabeceira-evo-preta', selo: 'Lançamento', destaque: true },
    { nome: 'Cabeceira Estofada', detalhe: 'Cinza', foto: 'cabeceira-cinza' },
    { nome: 'Cabeceira Estofada', detalhe: 'Bege', foto: 'cabeceira-bege' },
    { nome: 'Cabeceira Estofada Modular', detalhe: 'Queen · monte do seu jeito', foto: 'cabeceira-modular-queen' },
    { nome: 'Cabeceira Estofada Modular', detalhe: 'Solteiro · várias cores', foto: 'cabeceira-modular-solteiro' },
  ]},
  { id: 'jogos', nome: 'Jogos de Cama', produtos: [
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'King · 3 peças · 100% algodão', foto: 'jogo-edromania-king' },
    { nome: 'Jogo de Cama Edromania Europa', detalhe: 'Casal · 3 peças · algodão', foto: 'jogo-edromania-casal-algodao', oferta: { de: 189.90, por: 149.90 } },
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
    { nome: 'Cobertor Peluciado Sherpa', detalhe: 'King', foto: 'cobertor-king-peluciado' },
    { nome: 'Protetor de Colchão Impermeável', detalhe: 'Hedrons', foto: 'protetor-impermeavel' },
    { nome: 'Protetor de Colchão', detalhe: 'Queen · 158 x 198 x 40 cm', foto: 'protetor-queen' },
    { nome: 'Enchimento de Almofada', detalhe: 'Hedrons', foto: 'enchimento-almofada' },
  ]},
];
