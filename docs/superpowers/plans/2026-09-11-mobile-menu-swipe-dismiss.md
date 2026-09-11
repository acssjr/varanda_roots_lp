# Mobile Menu Swipe Dismiss Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir que o menu móvel seja fechado por um gesto para cima iniciado no painel ou no fundo externo, mantendo a faixa da marca imóvel e visualmente acima do conteúdo que recolhe.

**Architecture:** `SiteHeader` continuará responsável pelo estado aberto/compacto, mas passará a controlar o deslocamento por uma referência única ao `<nav>`, independentemente da superfície onde o gesto começar. No CSS, o painel móvel ficará fixo abaixo da altura corrente do cabeçalho; assim, apenas o corpo do menu se move e desaparece atrás da faixa opaca da marca.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node Test Runner.

---

### Task 1: Reproduzir a lacuna do gesto e da composição visual

**Files:**
- Modify: `tests/mobile-header.test.mjs`
- Test: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Escrever testes que falham com a implementação atual**

Acrescentar ao teste do menu móvel as expectativas de que o fundo externo compartilha todos os eventos de ponteiro, que o código usa uma referência ao painel animado e que o CSS ancora o painel abaixo da borda do cabeçalho:

```js
assert.match(header, /ref=\{navigationRef\}/);
assert.match(
  header,
  /className="mobile-menu-backdrop"[\s\S]*?onPointerDown=\{handleMenuPointerDown\}[\s\S]*?onPointerMove=\{handleMenuPointerMove\}[\s\S]*?onPointerUp=\{handleMenuPointerEnd\}[\s\S]*?onPointerCancel=\{handleMenuPointerCancel\}/,
);
assert.match(styles, /\.site-header\s*\{[^}]*--mobile-header-edge:\s*148px/s);
assert.match(
  styles,
  /@media \(max-width:\s*1080px\)[\s\S]*?\.site-header\s*\{[^}]*--mobile-header-edge:\s*136px[\s\S]*?\.site-header--compact\s*\{[^}]*--mobile-header-edge:\s*75px/s,
);
assert.match(
  styles,
  /@media \(max-width:\s*760px\)[\s\S]*?\.site-header\s*\{[^}]*--mobile-header-edge:\s*88px[\s\S]*?\.site-header--compact\s*\{[^}]*--mobile-header-edge:\s*72px/s,
);
assert.match(styles, /\.main-navigation\s*\{[^}]*top:\s*var\(--mobile-header-edge\)/s);
```

- [ ] **Step 2: Executar o teste e confirmar a falha esperada**

Run: `node --test tests/mobile-header.test.mjs`

Expected: `FAIL` porque o backdrop não possui eventos de arraste, `navigationRef` não existe e o painel ainda usa `top: 0`.

- [ ] **Step 3: Commit do teste vermelho**

```bash
git add tests/mobile-header.test.mjs
git commit -m "test: cover mobile menu swipe surfaces"
```

### Task 2: Compartilhar o gesto e isolar o painel móvel

**Files:**
- Modify: `components/SiteHeader.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Fazer os manipuladores moverem uma referência única**

Adicionar a referência e guardar o identificador do ponteiro ativo:

```tsx
const navigationRef = useRef<HTMLElement | null>(null);
const dragStartRef = useRef<{ y: number; time: number; pointerId: number } | null>(null);
```

No início, ignorar um segundo ponteiro, registrar o ponteiro ativo e capturá-lo na superfície onde o gesto começou. No movimento e na finalização, aplicar `is-dragging` e `--menu-drag-y` em `navigationRef.current`, nunca em `event.currentTarget`.

```tsx
const navigation = navigationRef.current;
if (!start || !navigation || start.pointerId !== event.pointerId) return;
navigation.classList.add("is-dragging");
navigation.style.setProperty("--menu-drag-y", `${offset}px`);
```

- [ ] **Step 2: Ligar os eventos ao painel e ao backdrop**

Adicionar `ref={navigationRef}` ao `<nav>` e os quatro manipuladores ao botão `.mobile-menu-backdrop`, preservando `onClick={closeMenu}`.

- [ ] **Step 3: Ancorar o corpo do menu abaixo do cabeçalho**

Adicionar a curva de gaveta ao sistema de movimento existente e criar o token de altura no cabeçalho:

```css
:root { --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1); }

.site-header { --mobile-header-edge: 148px; }

@media (max-width: 1080px) {
  .site-header { --mobile-header-edge: 136px; }
  .site-header--compact { --mobile-header-edge: 75px; }
  .main-navigation {
    top: var(--mobile-header-edge);
    max-height: calc(100svh - var(--mobile-header-edge) - 18px);
    padding: 24px 24px 28px;
    transition:
      opacity 280ms var(--ease-out),
      visibility 280ms var(--ease-out),
      transform 280ms var(--ease-drawer);
  }
}

@media (max-width: 760px) {
  .site-header { --mobile-header-edge: 88px; }
  .site-header--compact { --mobile-header-edge: 72px; }
  .main-navigation { padding: 30px 14px 24px; }
}
```

O painel continua com `z-index: -1`, enquanto o fundo opaco do cabeçalho mascara o recolhimento e protege a marca.

- [ ] **Step 4: Executar o teste focal e confirmar o verde**

Run: `node --test tests/mobile-header.test.mjs`

Expected: todos os testes de `mobile-header.test.mjs` passam.

- [ ] **Step 5: Commit da implementação**

```bash
git add components/SiteHeader.tsx app/globals.css tests/mobile-header.test.mjs
git commit -m "fix: restore polished mobile menu swipe dismissal"
```

### Task 3: Verificar interação, estados e regressões

**Files:**
- Verify: `components/SiteHeader.tsx`
- Verify: `app/globals.css`
- Verify: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Validar o menu em `384 × 824` no topo**

Abrir `http://localhost:3000/pt`, manter `scrollY = 0`, abrir o menu e confirmar:

1. o painel começa abaixo da faixa da marca;
2. um gesto curto volta à posição aberta;
3. um gesto para cima suficiente fecha o painel sem cobrir a logo;
4. depois de fechar, o cabeçalho volta suavemente ao branco;
5. um clique abaixo do painel fecha o menu.

- [ ] **Step 2: Validar o menu com a página rolada**

Rolar além de 128 px, abrir o menu, fechar pelo gesto e confirmar que a faixa permanece compacta e azul, sem tremor da marca.

- [ ] **Step 3: Validar movimento reduzido e ausência de rolagem interna**

Emular `prefers-reduced-motion: reduce`, repetir o fechamento e confirmar transição quase instantânea. Com o menu aberto, confirmar que nem o documento nem o painel criam rolagem interna.

- [ ] **Step 4: Executar a verificação completa**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: testes, lint e build passam; `git diff --check` não produz saída.

- [ ] **Step 5: Confirmar o estado do repositório**

Run: `git status --short`

Expected: nenhum arquivo de implementação fica pendente depois dos commits previstos.
