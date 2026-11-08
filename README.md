# Site da Criare Colchões

Três páginas em um só site, todas em HTML puro, sem instalação nem etapa de build.

| Endereço | Pasta | O que é |
|---|---|---|
| `criarecolchoes.com.br` | raiz (`index.html`, `produtos.html`, `tipos.html`) | Site principal, com o questionário do colchão ideal |
| `criarecolchoes.com.br/catalogo` | `catalogo/` | Catálogo institucional |
| `criarecolchoes.com.br/vitrine` | `vitrine/` | Mini site de vendas (link na bio) |
| `/vellarsemijoias` | `vellarsemijoias/` | Mini site Vellar Semijoias (QR Code pós-caixa). Conteúdo em `vellarsemijoias/js/data.js`; código-fonte em github.com/pcnjesus6869-oss/Sites---2 |
| `criarecolchoes.com.br/qr` | `_redirects` | Endereço do QR Code da fachada. Leva para a vitrine |

---

## Publicar pela primeira vez

1. **GitHub:** crie um repositório (pode ser privado), clique em **Add file → Upload files** e arraste **o conteúdo desta pasta** (não a pasta em si). Clique em **Commit changes**.
2. **Netlify:** **Add new site → Import an existing project → GitHub**, escolha o repositório.
   - Build command: deixe **vazio**
   - Publish directory: deixe **vazio** (ou `/`)
   - Clique em **Deploy**.
3. **Domínio:** no Netlify, **Domain management → Add a domain → `criarecolchoes.com.br`** e escolha usar o **Netlify DNS**. Copie os 4 servidores DNS que ele mostrar e cole no Registro.br, em **Alterar servidores DNS**. O cadeado (https) é ativado sozinho em algumas horas.

A partir daí, **toda alteração salva no GitHub atualiza o site sozinha** em menos de um minuto.

---

## Atualização semanal (vitrine)

Tudo fica em **`vitrine/produtos.js`**. No GitHub, abra o arquivo, clique no lápis (✏️ *Edit*), altere e clique em **Commit changes**.

- **Oferta:** coloque `oferta: { de: 1899.90, por: 1499.90 }` no produto. Ele vai sozinho para *Destaques da semana*, com o selo de desconto.
- **Destaque sem desconto:** `destaque: true`
- **Validade das ofertas:** mude `OFERTAS_ATE`.
- **Banners do topo:** edite a lista `BANNERS`.
- **Produto que acabou:** apague a linha dele.
- **Produto novo:** copie uma linha, troque nome, detalhe e foto. Suba a foto em `vitrine/fotos/` (quadrada, de preferência 800 × 800, formato `.webp` ou `.jpg`) e use o nome do arquivo **sem a extensão** no campo `foto`.

Cuidado com vírgulas e aspas: cada produto termina com `},`. Se a página ficar em branco depois de uma alteração, foi um desses sinais; o GitHub guarda o histórico e dá para voltar à versão anterior.

---

## Antes de colocar no ar (pendências)

- [ ] **Número do WhatsApp:** os sites usam `(47) 99215-6344`; o mini site antigo do Canva usava `(47) 98828-9398`. Confirmar o certo e trocar em: `index.html`, `produtos.html`, `tipos.html`, `regras.js`, `catalogo/index.html`, `catalogo/catalogo.js` e `vitrine/produtos.js`.
- [ ] **Preços da vitrine:** os 4 preços de oferta e o "Até 21% off" do banner são **exemplos**.
- [ ] **Avaliações do site principal** (`index.html`, seção *avaliações*): são **fictícias**, só para mostrar o layout. Trocar por avaliações reais ou remover a seção.
- [ ] **Catálogo:** e-mail e Facebook da loja estão vazios em `catalogo/catalogo.js` (ficam ocultos até serem preenchidos).
- [ ] **Horário de funcionamento:** campo `horario` em `vitrine/produtos.js` (oculto enquanto vazio).

---

## QR Code da fachada

O QR deve apontar para **`https://criarecolchoes.com.br/qr`**, nunca direto para a vitrine ou outro link. Assim, se um dia a fachada precisar levar para outra página, basta trocar o destino no arquivo `_redirects`, sem refazer a arte.
