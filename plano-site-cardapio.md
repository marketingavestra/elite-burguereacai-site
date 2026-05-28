# Plano: Site Cardápio Digital — Elite Burguer & Açaí
**Data:** 2026-05-28
**Objetivo:** Criar prova de conceito de site cardápio mobile-first com listagem por categoria e pedido via WhatsApp, no modelo do chegamaissorveteria
**Critério de sucesso:** Site no ar na Vercel, abrindo no celular, com pelo menos 3 categorias de produtos e botão de WhatsApp funcional em cada item

---

## Fase 1 — Inspeção e Design Tokens
**Objetivo da fase:** Extrair exatamente como o site referência funciona e montar o sistema de design base
**Prazo estimado:** 2–3 horas

### Tarefas
- [ ] 1.1 Abrir chegamaissorveteria.grandchef.com.br no celular e tirar screenshots de todas as telas (home, categoria aberta, item, carrinho)
- [ ] 1.2 Extrair paleta de cores (bg, texto, accent, botões, separadores)
- [ ] 1.3 Extrair tipografia (família, tamanhos h1–h6, body, label)
- [ ] 1.4 Mapear os componentes existentes: nav topo, banner hero, lista de categorias, card de item, botão CTA, footer
- [ ] 1.5 Anotar comportamento mobile: scroll, sticky header, como o botão WhatsApp aparece
- [ ] 1.6 Salvar tudo em `docs/research/DESIGN_TOKENS.md` e `docs/research/COMPONENT_INVENTORY.md`

### Entregável
Sistema de design documentado + lista de todos os componentes necessários

---

## Fase 2 — Scaffolding do Projeto
**Objetivo da fase:** Projeto Next.js 16 funcionando localmente com design tokens aplicados
**Prazo estimado:** 1–2 horas

### Tarefas
- [ ] 2.1 Criar projeto em `clientes/elite-burguereacai/01-site/` via `npx create-next-app@latest` com TypeScript + Tailwind
- [ ] 2.2 Instalar shadcn/ui (`npx shadcn@latest init`)
- [ ] 2.3 Configurar tokens oklch no `globals.css` com as cores extraídas na Fase 1
- [ ] 2.4 Configurar fontes via `next/font/google` (replicar a fonte do site referência)
- [ ] 2.5 Criar `src/types/menu.ts` com interfaces `Category`, `MenuItem`, `MenuData`
- [ ] 2.6 Criar `src/data/menu.ts` com dados fake de burguer + açaí (3 categorias, 3–4 itens cada)

### Entregável
`npm run dev` rodando em localhost com tema aplicado e dados do cardápio prontos

---

## Fase 3 — Construção dos Componentes
**Objetivo da fase:** Todos os componentes visuais implementados, mobile-first
**Prazo estimado:** 3–4 horas

### Tarefas
- [ ] 3.1 `Header` — logo + nome da lanchonete, sticky no topo, fundo sólido
- [ ] 3.2 `HeroBanner` — foto de destaque + nome do estabelecimento + tagline
- [ ] 3.3 `CategoryNav` — tabs ou scroll horizontal de categorias (Hambúrgueres, Açaí, Combos, Bebidas)
- [ ] 3.4 `MenuSection` — grade de cards por categoria, renderiza ao selecionar tab
- [ ] 3.5 `ItemCard` — foto, nome, descrição curta, preço + botão "Pedir pelo WhatsApp"
- [ ] 3.6 `WhatsAppButton` — botão flutuante no canto inferior direito (atalho para pedido geral)
- [ ] 3.7 `Footer` — endereço, horário de funcionamento, redes sociais

### Entregável
Página completa renderizada com dados fake, todos os componentes funcionando no mobile

---

## Fase 4 — Integração WhatsApp
**Objetivo da fase:** Cada botão de pedido abre conversa pré-formatada no WhatsApp
**Prazo estimado:** 1 hora

### Tarefas
- [ ] 4.1 Criar `src/lib/whatsapp.ts` com função `buildWhatsAppUrl(item, phone)` que gera link `wa.me/55...?text=...`
- [ ] 4.2 Texto padrão da mensagem: `"Olá! Quero pedir: [nome do item] - R$[preço]. Pode confirmar disponibilidade?"`
- [ ] 4.3 Mover número do WhatsApp para `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- [ ] 4.4 Testar link no celular — confirmar abertura no WhatsApp nativo e Web
- [ ] 4.5 Botão flutuante: link genérico `"Quero fazer um pedido!"`

### Entregável
Todos os botões de item e o botão flutuante abrindo WhatsApp com texto pré-preenchido

---

## Fase 5 — Segurança e Deploy
**Objetivo da fase:** Site seguro no ar na Vercel com URL pública
**Prazo estimado:** 1–2 horas

### Tarefas
- [ ] 5.1 Aplicar skill `/cybersecurity`: `next.config.ts` com security headers (CSP, HSTS, X-Frame-Options)
- [ ] 5.2 Criar `middleware.ts` com rate limiting básico por IP
- [ ] 5.3 Garantir `.env.local` no `.gitignore`, zero segredo no código
- [ ] 5.4 `npm run build` passa sem erros
- [ ] 5.5 Deploy via skill `/deploy` na Vercel, gerar URL pública
- [ ] 5.6 Testar a URL pública no celular (Android e iOS se possível)

### Entregável
URL Vercel funcionando no celular com site completo e seguro

---

## Fase 6 — Validação com o Cliente
**Objetivo da fase:** Cliente aprova o conceito e define próximos passos
**Prazo estimado:** 1–3 dias (depende de resposta do cliente)

### Tarefas
- [ ] 6.1 Enviar link Vercel para o cliente via WhatsApp com mensagem curta explicando o que foi feito
- [ ] 6.2 Pedir feedback: "O layout está no caminho certo? O que muda?"
- [ ] 6.3 Levantar cardápio real (fotos, nomes, preços, categorias) para substituir dados fake
- [ ] 6.4 Confirmar número do WhatsApp real do estabelecimento
- [ ] 6.5 Anotar ajustes solicitados em `EVOLUCAO.md`
- [ ] 6.6 Definir se avança para versão completa (cardápio editável, analytics, domínio próprio)

### Entregável
Aprovação do cliente + lista de ajustes + decisão sobre evolução do projeto

---

## Milestones

| Marco | Fase | Entregável |
|-------|------|-----------|
| M1 | Fim Fase 1 | Design tokens + componentes mapeados |
| M2 | Fim Fase 2 | Projeto rodando local com dados fake |
| M3 | Fim Fase 3 | Site visual completo no celular |
| M4 | Fim Fase 4 | WhatsApp integrado e testado |
| M5 | Fim Fase 5 | URL pública no ar na Vercel |
| M6 | Fim Fase 6 | Cliente aprova — prova de conceito validada |

---

## Riscos e Bloqueios

- **Risco:** Cliente não tem fotos dos produtos → **Mitigação:** usar fotos stock de burguer/açaí para a prova de conceito, trocar depois
- **Risco:** WhatsApp do negócio não confirmado → **Mitigação:** usar número placeholder nas Fases 3–4, trocar antes do envio ao cliente
- **Risco:** Site referência usa muitos assets proprietários (GrandChef) → **Mitigação:** replicar o estilo visual, não copiar código ou assets diretamente
- **Risco:** Cliente pede painel admin na prova de conceito → **Mitigação:** alinhar escopo: prova de conceito é site estático; admin é Fase 2 do projeto

---

## Stack resumida

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| UI | shadcn/ui + Tailwind CSS v4 |
| Dados | Arquivo `.ts` estático (sem banco de dados) |
| WhatsApp | Link `wa.me` com texto pré-formatado |
| Deploy | Vercel |
| Segurança | skill `/cybersecurity` |

---

## Próximo passo imediato

Abrir https://chegamaissorveteriaeacaiteria.grandchef.com.br/?origin=whatsapp no celular, tirar screenshots de cada tela e anotar as cores e componentes em `docs/research/DESIGN_TOKENS.md` antes de escrever uma linha de código.