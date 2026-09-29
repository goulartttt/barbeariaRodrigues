# Rodrigues Barbearia

Site oficial da Rodrigues Barbearia (Vila Aurora, Zona Norte de São Paulo). O agendamento acontece na [TopSalão](https://topsalao.com/?id=98939), plataforma externa.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (página estática)
npm run typecheck
```

## Onde fica o conteúdo

Todos os fatos do negócio (endereço, telefone, nota do Google, serviços, temas das avaliações) ficam em `src/content/business.ts`. Não adicione preços, horários, equipe, redes sociais ou depoimentos sem confirmação do dono. Ao atualizar a nota ou o total de avaliações do Google, atualize também `checkedAt`.

## Fotos

O site ainda não usa fotos porque não há fotos reais da barbearia no repositório. Quando existirem, as que mais ajudam são: fachada (para quem chega pela rua), ambiente interno e cadeiras, e detalhes de trabalho (corte, barba). Coloque-as em `public/images/` e use `next/image`.
