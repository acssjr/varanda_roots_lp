# Google Maps Embed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Usar na página da Varanda Roots o mesmo padrão de incorporação do Google Maps já validado no GFB, sem imagem estática simulando o mapa.

**Architecture:** O iframe continuará dentro da seção existente, mas sua URL será a busca simples do Google Maps com `output=embed`. O contêiner mantém a dimensão responsiva e uma cor neutra apenas durante o carregamento, sem imagem de fundo.

**Tech Stack:** Next.js 16, React 19, CSS, Node.js test runner.

---

### Task 1: Proteger o contrato do mapa

**Files:**
- Create: `tests/map-embed.test.mjs`
- Modify: `package.json`

- [x] Escrever um teste que confirme a URL `www.google.com/maps?q=...&output=embed`, `allowFullScreen` e a ausência da imagem estática.
- [x] Executar `npm test` e confirmar falha causada pela implementação atual.

### Task 2: Aplicar o iframe comprovado

**Files:**
- Modify: `components/HomePage.tsx:223`
- Modify: `app/globals.css:193`

- [x] Trocar a URL longa `maps/embed?pb=...` pela busca simples com o endereço codificado.
- [x] Adicionar `allowFullScreen`.
- [x] Remover `google-maps-varanda.webp` do fundo do contêiner.
- [x] Executar `npm test` e confirmar aprovação.

### Task 3: Verificar a entrega

- [x] Executar `npm run lint`.
- [x] Executar `npm run build`.
- [x] Inspecionar a seção em desktop e celular, confirmando dimensões e ausência da imagem estática.
- [x] Registrar que o conteúdo remoto pode permanecer vazio somente dentro da prévia local, embora o contrato seja o mesmo validado no GFB publicado.
