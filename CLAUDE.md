# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## O projeto e as pessoas

- Landing page de marketing da Rodrigues Barbearia (Vila Aurora, Zona Norte de São Paulo). O objetivo é apresentar a barbearia a quem ainda não a conhece. O agendamento continua na TopSalão, a plataforma externa que a barbearia já usa. Agendamento próprio, loja e similares ficam para o futuro.
- **Você conversa com o desenvolvedor**, que faz o site como freelancer e está aprendendo o ciclo completo: construir com IA, hospedar, proteger e fechar contrato.
- **Farlen é o dono da barbearia** e o cliente. Fatos do negócio, textos, layout e direção visual precisam da validação dele, que chega pelo desenvolvedor.
- Hospedagem na Vercel: https://barbeariarodrigues.vercel.app/

## Regras de trabalho

- **Idioma:** sempre converse, pergunte e escreva documentação em português do Brasil, mesmo que a mensagem venha misturada com inglês.
- **Mensagens por voz:** o desenvolvedor costuma ditar por voz, e a transcrição troca palavras ("HTML" quer dizer a branch **HML**, "Cloud.md" quer dizer **CLAUDE.md**). Se uma mensagem estiver ambígua ou fora de contexto, pergunte em vez de adivinhar.
- **Skills, agents e plugins:** use qualquer skill, subagente ou plugin disponível quando ajudar na tarefa. Antes de usar, diga qual vai usar e por quê, e espere a confirmação.
- **Dependências:** nunca instale pacotes npm sem pedir. Diga o motivo e se há alternativa sem pacote. Só instale sozinho quando o desenvolvedor liberar explicitamente.
- **O que corrigir sozinho:** bugs, código duplicado, acessibilidade, defeitos visuais e problemas de segurança.
- **O que propor e esperar o OK:** mudanças de layout, texto ou direção visual, porque o Farlen precisa validar.
- **Explicações:** enquanto programa, explique em uma ou duas frases o porquê das decisões técnicas importantes (segurança, hospedagem, desempenho). Assuntos maiores, como contrato ou domínio, só quando ele pedir.

## Branches e versões

Há dois trilhos com numeração **independente**: `HML-Vx.y` (homologação, onde o Farlen testa) e `PROD-Vx.y` (produção, publicada pela Vercel). Não é preciso que os números coincidam. Por exemplo, `HML-V1.7` e `PROD-V1.4` podem existir ao mesmo tempo.

1. **Demanda nova:** veja no GitHub (`git fetch`) a última `HML-Vx.y` e crie a próxima (`HML-V1.2` → `HML-V1.3`) **a partir da última `PROD-Vx.y`**, para partir sempre do que está no ar.
2. **Ajustes pedidos depois do teste** ficam na mesma HML. Um número novo só nasce com uma demanda nova, quando não há outra em andamento.
3. **Aprovada em HML:** crie a próxima `PROD-Vx.y` (`PROD-V1.0` → `PROD-V1.1`) a partir da HML aprovada. O desenvolvedor troca manualmente a branch de produção na Vercel. As PROD antigas ficam guardadas para permitir voltar atrás.
4. Nunca trabalhe nem faça merge em `main` ou nas branches `claude/*`.

## Commits

- Commit e push são do desenvolvedor. Só faça quando ele pedir.
- Mensagem em português, curta e objetiva, descrevendo o que mudou (ex.: `Altera a cor do botão de enviar`).
- Não mencione o Claude nem a IA: sem `Co-Authored-By`, sem assinatura.

## Antes de dizer "pronto"

1. **Código enxuto:** nada duplicado. Reaproveite funções e componentes existentes e prefira soluções genéricas e recursos do React/Next.js a código longo para algo simples. Siga o estilo do código ao redor.
2. **Build:** `npm run build` passando.
3. **Interface:** abra o site no navegador, no celular e no computador, e confira o resultado. Corrija o que encontrar, respeitando o limite das regras de trabalho.
4. **Segurança mínima:**
   - Segredos (chaves de API, acesso a banco, senhas) ficam num arquivo próprio, listado no `.gitignore` e configurado como variável de ambiente na Vercel. Nunca no GitHub, no bundle do navegador nem indexável pelo Google.
   - Nada no front-end pode dar acesso a banco de dados ou a dados de usuários, por exemplo via "Inspecionar" do navegador.
   - Dados sensíveis sempre criptografados.
   - Cabeçalhos de segurança no `next.config` (CSP, `X-Frame-Options` e similares).
   - Links externos com `rel="noopener"` (o `ExternalLink` já cuida disso).
   - `npm audit` sem vulnerabilidade grave.
   - Nenhum dado pessoal publicado além do que o Farlen autorizou.
5. Se algum passo não puder ser verificado, diga qual e por quê.

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
- **Fatos do negócio** (endereço, telefone, agenda TopSalão, nota do Google, serviços, temas das avaliações) ficam só em `src/content/business.js`. Metadados, dados estruturados (`HairSalon`) e todas as seções leem dali; o FAQ (`src/content/faq.js`) monta as respostas a partir desses fatos. Nunca invente preços, horários, equipe, redes sociais ou depoimentos: use TODO e pergunte ao desenvolvedor, que confirma com o Farlen. Ao atualizar a nota do Google, atualize `checkedAt`.
- Links externos usam `ExternalLink` (nova aba + aviso para leitores de tela); botões usam `ActionLink`.
- `MobileActionBar` (componente cliente) mostra as ações fixas quando os botões do hero e da chamada final saem da tela (marcadores `data-hero-actions` e `data-closing-actions`): barra "Agendar" + WhatsApp no celular e botão redondo de WhatsApp no computador.
- Ainda não há fotos reais da barbearia; quando houver, vão em `public/images/` com `next/image`.

## Agent skills

### Issue tracker

As issues ficam nas GitHub Issues deste repositório (`goulartttt/barbeariaRodrigues`). Veja `docs/agents/issue-tracker.md`.

### Triage labels

Usa os cinco rótulos padrão (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Veja `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: um `CONTEXT.md` e `docs/adr/` na raiz, criados conforme termos e decisões forem definidos. Veja `docs/agents/domain.md`.
