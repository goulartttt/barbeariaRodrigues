# Rodrigues Barbearia

Site oficial da Rodrigues Barbearia, na Vila Aurora (Zona Norte de São Paulo). É uma landing page que apresenta a barbearia a quem ainda não a conhece e leva o cliente a agendar. O agendamento acontece na [TopSalão](https://topsalao.com/?id=98939), plataforma externa que a barbearia já usa.

- **Produção:** https://barbeariarodrigues.vercel.app
- **Homologação (testes do dono):** https://hml-barbeariarodrigues.vercel.app

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router) e React 19, em JavaScript (sem TypeScript).
- CSS Modules e variáveis CSS, sem Tailwind nem bibliotecas de UI.
- Three.js com React Three Fiber para as cenas 3D, e GSAP para as animações de entrada e de rolagem.
- Hospedagem na Vercel. A página é gerada como estática.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (página estática)
npm run start      # serve o build
```

Não há lint nem testes automatizados.

## Estrutura

| Onde | O quê |
|---|---|
| `src/app/page.jsx` | Monta a página com as seções, na ordem em que aparecem. |
| `src/app/layout.jsx` | Fonte, metadados (título, descrição, compartilhamento) e dados estruturados do Google (`HairSalon`). |
| `src/app/not-found.jsx` | Página de erro 404. |
| `src/app/robots.js` e `sitemap.js` | `robots.txt` e `sitemap.xml` para os buscadores. |
| `src/components/` | Uma seção ou peça por arquivo, cada uma com seu `.module.css`. |
| `src/components/three/` | Cenas 3D, feitas só com geometria (sem arquivos de modelo). |
| `src/content/` | Conteúdo: fatos do negócio, perguntas frequentes e menu. |
| `public/images/fotos/` | Fotos reais enviadas pelo dono. |
| `public/images/3d/` | Imagens estáticas das cenas 3D, usadas enquanto o 3D carrega ou quando ele fica desligado. |
| `docs/imagens/` | HTML de origem da imagem de compartilhamento e do ícone do iPhone. |

## Conteúdo

Todos os fatos do negócio ficam em `src/content/business.js`: endereço, telefone, links, nota do Google, serviços, preços, horários, equipe, galeria e avaliações. O FAQ (`src/content/faq.js`) monta as respostas a partir desses dados.

- Não adicione nem altere preços, horários, equipe, redes sociais ou avaliações sem confirmação do dono.
- Ao atualizar a nota ou o total de avaliações do Google, atualize também `checkedAt`. Ao mudar preços, atualize `pricesCheckedAt`.
- O endereço do site fica em `business.url`. Troque ali quando houver domínio próprio.

## Fotos

As fotos reais ficam em `public/images/fotos/` e aparecem com `next/image`, que gera versões leves para cada tela. A lista de fotos da galeria e da equipe fica em `business.js`, sempre com um texto alternativo descrevendo a foto.

Ainda falta a foto do Raphael. Enquanto ela não chega, o card dele mostra a inicial.

## 3D

As cenas (navalha e tesoura no topo, poste de barbeiro nos preços) só carregam depois que a página terminou de carregar e a pessoa interagiu com ela. Até lá, aparece uma imagem estática igual à cena. A imagem também fica no lugar do 3D com "reduzir movimento" ligado ou em aparelhos fracos. Se o aparelho perder desempenho, a cena baixa a resolução em vez de desligar.

Se mudar uma cena, gere de novo a imagem estática dela em `public/images/3d/`.

## Imagem de compartilhamento e ícone do iPhone

`src/app/opengraph-image.png` (a imagem que aparece ao mandar o link no WhatsApp ou nas redes) e `src/app/apple-icon.png` são capturas dos HTMLs em `docs/imagens/`. Se a nota do Google ou o visual mudarem, edite o HTML e capture de novo no mesmo tamanho (1200x630 e 180x180).

## Versões e publicação

O site tem dois ambientes na Vercel, cada um acompanhando uma branch:

- `HML-Vx.y`: homologação, onde o dono testa (`hml-barbeariarodrigues.vercel.app`).
- `PROD-Vx.y`: produção, o site no ar (`barbeariarodrigues.vercel.app`).

Cada mudança nasce numa branch de demanda (`feature/`, `refac/` ou `hotfix/`) criada a partir da última PROD, passa pela HML e só vai para a PROD depois de aprovada. Nenhuma branch é apagada: elas guardam o histórico. O passo a passo da Vercel está no `CLAUDE.md`.

## Segurança

- Os cabeçalhos de segurança (CSP, `X-Frame-Options` e outros) ficam em `next.config.mjs`. O CSP só libera o próprio site e o mapa do Google: ao adicionar qualquer recurso externo, libere o domínio lá.
- Fora da produção, o site responde com `X-Robots-Tag: noindex`, para a homologação não aparecer no Google.
- O site não guarda senhas, chaves nem dados de visitantes. Se um dia precisar de segredos, eles vão em variáveis de ambiente na Vercel, nunca no repositório.
- Rode `npm audit` antes de publicar. Não deve haver vulnerabilidade grave.
