# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar com o código deste repositório. As regras gerais (idioma, autonomia, entrevista, branches HML/PROD, commits, segurança e checklist de "pronto") estão no CLAUDE.md global do desenvolvedor; aqui fica só o que é deste projeto.

## O projeto e as pessoas

- Landing page de marketing da Rodrigues Barbearia (Vila Aurora, Zona Norte de São Paulo). O objetivo é apresentar a barbearia a quem ainda não a conhece. O agendamento continua na TopSalão, a plataforma externa que a barbearia já usa. Agendamento próprio, loja e similares ficam para o futuro.
- **Você conversa com o desenvolvedor.** **Farlen é o dono da barbearia** e o cliente: fatos do negócio, textos, layout e direção visual precisam da validação dele, que chega pelo desenvolvedor.
- Hospedagem na Vercel: https://barbeariarodrigues.vercel.app/

## Particularidades deste projeto

- **Vercel:** os ambientes HML e PROD acompanham as branches `HML-Vx.y` e `PROD-Vx.y`. A cada versão nova, avise qual branch escolher em cada ambiente.
- Nunca trabalhe nem faça merge nas branches `claude/*`: são o histórico das primeiras sessões.
- **Build:** `npm run build` precisa passar antes de dizer "pronto".
- **Segurança:** os cabeçalhos ficam no `next.config`; segredos, se houver, vão como variável de ambiente na Vercel. Nenhum dado pessoal publicado além do que o Farlen autorizou.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção; a página é gerada como estática
npm run start   # serve o build
```

Não há lint nem testes automatizados configurados.

## Arquitetura

- Next.js 16 (App Router) + React 19 em **JavaScript puro** (`.js`/`.jsx`). Não use TypeScript.
- Uma única página: `src/app/page.jsx` monta as seções, cada uma em `src/components/<Nome>.jsx` com seu `<Nome>.module.css` ao lado. Sem Tailwind nem bibliotecas de UI.
- Tokens de design (cores, tipografia, espaço, raios, sombras, movimento) são variáveis CSS em `src/app/globals.css`: tema escuro, preto da fachada com acento bronze. Use os papéis (`--bg`, `--fg`, `--accent`…), não as cores cruas. Classes globais: `.container`, `.display` (título condensado), `.eyebrow`, `.visually-hidden`.
- 3D com Three.js + React Three Fiber em `src/components/three/` (objetos feitos só com geometria, sem arquivos de modelo). `SceneStage` carrega a cena depois do `load` e da primeira interação (mouse, toque, rolagem ou tecla), pausa fora da tela e mostra uma imagem estática (`public/images/3d/`) com "reduzir movimento", aparelho fraco ou queda de FPS. Se mudar uma cena, regenere a imagem estática no mesmo formato do palco no computador (ela é ajustada pela altura, como a câmera 3D). Animações de entrada e scroll usam GSAP.
- Fonte Archivo via `next/font` com o eixo `wdth`, usado em `font-variation-settings`.
- **Fatos do negócio** (endereço, telefone, agenda TopSalão, nota do Google, serviços, temas das avaliações) ficam só em `src/content/business.js`. Metadados, dados estruturados (`HairSalon`) e todas as seções leem dali; o FAQ (`src/content/faq.js`) monta as respostas a partir desses fatos. O que não estiver confirmado vira TODO para o desenvolvedor validar com o Farlen. Ao atualizar a nota do Google, atualize `checkedAt`.
- Links externos usam `ExternalLink` (nova aba, `rel="noopener"` e aviso para leitores de tela); botões usam `ActionLink`.
- `MobileActionBar` (componente cliente) mostra as ações fixas quando os botões do hero e da chamada final saem da tela (marcadores `data-hero-actions` e `data-closing-actions`): barra "Agendar" + WhatsApp no celular e botão redondo de WhatsApp no computador.
- Ainda não há fotos reais da barbearia; quando houver, vão em `public/images/` com `next/image`.

## Agent skills

### Issue tracker

As issues ficam nas GitHub Issues deste repositório (`goulartttt/barbeariaRodrigues`). Veja `docs/agents/issue-tracker.md`.

### Triage labels

Usa os cinco rótulos padrão (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Veja `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: um `CONTEXT.md` e `docs/adr/` na raiz, criados conforme termos e decisões forem definidos. Veja `docs/agents/domain.md`.
