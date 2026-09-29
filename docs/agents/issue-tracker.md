# Issue tracker: GitHub

As issues e especificações deste repositório ficam nas GitHub Issues. Use a CLI `gh` para todas as operações.

## Convenções

- **Criar uma issue**: `gh issue create --title "..." --body "..."`. Use um heredoc para corpos com várias linhas.
- **Ler uma issue**: `gh issue view <number> --comments`, filtrando os comentários com `jq` e buscando também os rótulos.
- **Listar issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` com os filtros `--label` e `--state` adequados.
- **Comentar numa issue**: `gh issue comment <number> --body "..."`
- **Aplicar / remover rótulos**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Fechar**: `gh issue close <number> --comment "..."`

O repositório é inferido de `git remote -v`; o `gh` faz isso sozinho quando roda dentro de um clone.

## Pull requests como entrada de triagem

**PRs como canal de pedidos: não.** _(Troque para `yes` se este repositório tratar PRs externos como pedidos de funcionalidade; o `/triage` lê esta flag.)_

Quando estiver em `yes`, os PRs passam pelos mesmos rótulos e estados das issues, usando os equivalentes `gh pr`:

- **Ler um PR**: `gh pr view <number> --comments` e `gh pr diff <number>` para o diff.
- **Listar PRs externos para triagem**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` e manter só `authorAssociation` igual a `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR` ou `NONE` (descartar `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comentar / rotular / fechar**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

O GitHub usa a mesma numeração para issues e PRs, então um `#42` pode ser qualquer um dos dois: tente `gh pr view 42` e, se falhar, `gh issue view 42`.

## Quando uma skill disser "publique no issue tracker"

Crie uma issue no GitHub.

## Quando uma skill disser "busque o ticket relevante"

Rode `gh issue view <number> --comments`.

## Operações do wayfinding

Usadas pelo `/wayfinder`. O **mapa** é uma única issue, e os tickets são issues **filhas**.

- **Mapa**: uma única issue com o rótulo `wayfinder:map`, contendo o corpo Notes / Decisions-so-far / Fog. `gh issue create --label wayfinder:map`.
- **Ticket filho**: uma issue ligada ao mapa como sub-issue do GitHub (`gh api` no endpoint de sub-issues). Onde sub-issues não estiverem habilitadas, adicione a filha a uma lista de tarefas no corpo do mapa e coloque `Part of #<map>` no topo do corpo da filha. Rótulos: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Depois de assumido, o ticket fica atribuído a quem está conduzindo.
- **Bloqueio**: as **dependências nativas de issues** do GitHub, a representação canônica e visível na interface. Adicione uma aresta com `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, em que `<blocker-db-id>` é o **database id** numérico do bloqueador (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _não_ o `#number` nem o `node_id`). O GitHub informa `issue_dependencies_summary.blocked_by` (só bloqueadores abertos, que é o que vale). Onde dependências não existirem, use uma linha `Blocked by: #<n>, #<n>` no topo do corpo da filha. Um ticket fica desbloqueado quando todos os bloqueadores estão fechados.
- **Consulta da fronteira**: liste as filhas abertas do mapa (`gh issue list --state open`, restrito às sub-issues / lista de tarefas do mapa), descarte as que têm bloqueador aberto (`issue_dependencies_summary.blocked_by > 0`, ou uma issue aberta na linha `Blocked by`) ou responsável atribuído; a primeira na ordem do mapa vence.
- **Assumir**: `gh issue edit <n> --add-assignee @me`, a primeira escrita da sessão.
- **Resolver**: `gh issue comment <n> --body "<answer>"`, depois `gh issue close <n>`, depois acrescente um ponteiro de contexto (resumo + link) em Decisions-so-far no mapa.
