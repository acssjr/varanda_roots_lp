# Location and Motion Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enriquecer a seção de localização e tornar as transições do cabeçalho e os hovers dos botões mais suaves e estáveis.

**Architecture:** Os dados bilíngues das referências próximas permanecem centralizados em `lib/site-content.ts`; `HomePage.tsx` apenas renderiza o painel e os links externos. O movimento continua em CSS com `transform` e `opacity`, sem nova dependência e sem animação de layout por JavaScript.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, Vercel.

---

### Task 1: Conteúdo verificável da localização

**Files:**
- Modify: `lib/site-content.ts`
- Modify: `components/HomePage.tsx`
- Create: `tests/location-panel.test.mjs`

- [ ] **Step 1: Write the failing test**

Validar `Rio Vermelho`, os três tempos a pé, os destinos e o link Waze fornecido.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/location-panel.test.mjs`
Expected: FAIL porque o painel ainda não contém referências nem Waze.

- [ ] **Step 3: Write minimal implementation**

Adicionar `visitNeighborhood`, `visitNearby` e rótulos bilíngues ao conteúdo; renderizar três itens com SVGs semânticos e os dois botões externos.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/location-panel.test.mjs`
Expected: PASS.

### Task 2: Layout do painel de localização

**Files:**
- Modify: `app/globals.css`
- Test: `tests/location-panel.test.mjs`

- [ ] **Step 1: Extend the failing test**

Exigir grade de referências, grupo de ações e empilhamento mobile.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/location-panel.test.mjs`
Expected: FAIL nas novas classes.

- [ ] **Step 3: Write minimal implementation**

Organizar a lateral em bairro, endereço, três linhas compactas e dois botões; empilhar abaixo do mapa em até 760 px.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/location-panel.test.mjs`
Expected: PASS.

### Task 3: Estabilidade e suavidade do cabeçalho

**Files:**
- Modify: `app/globals.css`
- Modify: `components/SiteHeader.tsx` only if state coordination requires it
- Modify: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Write the failing test**

Exigir transição gradual do nome, dimensões estáveis do ícone e alinhamento central compartilhado entre marca e Menu.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/mobile-header.test.mjs`
Expected: FAIL nas novas regras de movimento e alinhamento.

- [ ] **Step 3: Write minimal implementation**

Sincronizar `width`, `gap`, `opacity` e `transform` com curva `cubic-bezier(.22,1,.36,1)`, preservar o ícone e posicionar marca/Menu pelo mesmo centro vertical.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/mobile-header.test.mjs`
Expected: PASS.

### Task 4: Microinteração dos botões

**Files:**
- Modify: `app/globals.css`
- Create: `tests/button-motion.test.mjs`

- [ ] **Step 1: Write the failing test**

Exigir hover condicionado a `hover: hover` e `pointer: fine`, deslocamento da seta por `transform` e pressão por escala.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/button-motion.test.mjs`
Expected: FAIL porque as microinterações não existem.

- [ ] **Step 3: Write minimal implementation**

Adicionar transições de 160 ms para as setas e escala de pressão 0.98 nos elementos clicáveis relevantes.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/button-motion.test.mjs`
Expected: PASS.

### Task 5: Validação e publicação

**Files:**
- Verify all modified files

- [ ] **Step 1: Run the complete checks**

Run: `npm run lint; npm test; npm run build; git diff --check`
Expected: lint limpo, todos os testes aprovados, build concluído e diff sem erros.

- [ ] **Step 2: Inspect desktop and mobile**

Verificar a seção em 390 × 844 e desktop, o cabeçalho descendo/subindo e os hovers com ponteiro fino.

- [ ] **Step 3: Commit and deploy**

Commitar em `main`, enviar ao GitHub, aguardar a Vercel ficar `READY` e conferir `/pt` e `/en` com HTTP 200.

