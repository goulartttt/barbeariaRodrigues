# Documentação de domínio

Como as skills de engenharia devem usar a documentação de domínio deste repositório ao explorar o código.

Este repositório tem **contexto único**: um `CONTEXT.md` e `docs/adr/` na raiz.

## Antes de explorar, leia

- **`CONTEXT.md`** na raiz do repositório.
- **`docs/adr/`**: leia os ADRs que tocam a área em que você vai trabalhar.

Se algum desses arquivos não existir, **siga em frente sem comentar**. Não aponte a ausência nem sugira criá-los antecipadamente. A skill `/domain-modeling` (acionada por `/grill-with-docs` e `/improve-codebase-architecture`) os cria quando termos ou decisões forem de fato definidos.

## Estrutura de arquivos

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-agendamento-por-horario.md
│   └── 0002-...md
└── src/
```

## Use o vocabulário do glossário

Quando o que você escrever nomear um conceito do domínio (título de issue, proposta de refatoração, hipótese, nome de teste), use o termo como definido no `CONTEXT.md`. Não troque por sinônimos que o glossário evita.

Se o conceito ainda não estiver no glossário, isso é um sinal: ou você está inventando uma linguagem que o projeto não usa (reconsidere), ou há uma lacuna real (anote para o `/domain-modeling`).

## Aponte conflitos com ADRs

Se o que você produzir contradizer um ADR existente, diga isso explicitamente em vez de sobrescrever em silêncio:

> _Contradiz o ADR-0001 (agendamento por horário), mas vale reabrir porque…_
