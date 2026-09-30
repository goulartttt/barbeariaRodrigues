# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

Converse, pergunte e escreva documentação em português do Brasil.

## Agent skills

### Issue tracker

As issues ficam nas GitHub Issues deste repositório (`goulartttt/barbeariaRodrigues`). Veja `docs/agents/issue-tracker.md`.

### Triage labels

Usa os cinco rótulos padrão (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Veja `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: um `CONTEXT.md` e `docs/adr/` na raiz. Veja `docs/agents/domain.md`.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção; a página é gerada como estática
npm run start   # serve o build
```

Não há lint nem testes automatizados configurados. Para validar mudanças visuais, rode o build e confira a página no navegador (o Playwright está disponível no ambiente remoto).

## Arquitetura

- Next.js 16 (App Router) + React 19 em **JavaScript puro** (`.js`/`.jsx`). O dono pediu para não usar TypeScript.
- Uma única página: `src/app/page.jsx` monta as seções, cada uma em `src/components/<Nome>.jsx` com seu `<Nome>.module.css` ao lado. Sem Tailwind nem bibliotecas de UI.
- Tokens de design (cores, tipografia, espaço, raios, sombras, movimento) são variáveis CSS em `src/app/globals.css`: tema escuro, preto da fachada com acento bronze. Use os papéis (`--bg`, `--fg`, `--accent`…), não as cores cruas. Classes globais: `.container`, `.display` (título condensado), `.eyebrow`, `.visually-hidden`.
- 3D com Three.js + React Three Fiber em `src/components/three/` (objetos feitos só com geometria, sem arquivos de modelo). `SceneStage` carrega a cena depois do `load`, pausa fora da tela e mostra uma imagem estática (`public/images/3d/`) com "reduzir movimento", aparelho fraco ou queda de FPS. Se mudar uma cena, regenere a imagem estática. Animações de entrada e scroll usam GSAP.
- Fonte Archivo via `next/font` com o eixo `wdth`, usado em `font-variation-settings`.
- **Fatos do negócio** (endereço, telefone, agenda TopSalão, nota do Google, serviços, temas das avaliações) ficam só em `src/content/business.js`. Metadados, dados estruturados (`HairSalon`) e todas as seções leem dali. Nunca invente preços, horários, equipe, redes sociais ou depoimentos: use TODO e pergunte ao dono. Ao atualizar a nota do Google, atualize `checkedAt`.
- Links externos usam `ExternalLink` (nova aba + aviso para leitores de tela); botões usam `ActionLink`.
- `MobileActionBar` (componente cliente) aparece no celular quando os botões do hero e da chamada final saem da tela (marcadores `data-hero-actions` e `data-closing-actions`).
- Ainda não há fotos reais da barbearia; quando houver, vão em `public/images/` com `next/image`.
