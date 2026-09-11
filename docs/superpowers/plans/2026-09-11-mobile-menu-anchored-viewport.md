# Mobile Menu Anchored Viewport Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o menu móvel surgir e recolher exclusivamente pela borda inferior do cabeçalho, com movimento e transição de cor mais lentos e sincronizados.

**Architecture:** Um contêiner `.main-navigation-viewport` fica fixo entre a borda inferior do cabeçalho e o fim da viewport e aplica `overflow: clip`. O `<nav>` continua sendo a única superfície revelada e gestual; cabeçalho e backdrop mantêm estados independentes, mas compartilham a duração de 500 ms.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node Test Runner.

---

### Task 1: Fixar a origem visual do painel

**Files:**
- Modify: `tests/mobile-header.test.mjs`
- Modify: `components/SiteHeader.tsx`
- Modify: `app/globals.css`

- [x] **Step 1: Escrever o teste vermelho**

Adicionar as seguintes expectativas:

```js
assert.match(header, /className="main-navigation-viewport"/);
assert.match(styles, /\.main-navigation-viewport\s*\{[^}]*overflow:\s*clip/s);
assert.match(styles, /\.main-navigation-viewport\s*\{[^}]*top:\s*var\(--mobile-header-edge\)/s);
assert.match(styles, /\.main-navigation\s*\{[^}]*position:\s*absolute[^}]*top:\s*0/s);
assert.match(styles, /\.main-navigation\s*\{[^}]*clip-path\s+500ms\s+var\(--ease-in-out\)/s);
assert.match(styles, /\.mobile-menu-backdrop\s*\{[^}]*500ms\s+var\(--ease-out\)/s);
```

- [x] **Step 2: Confirmar a falha**

Run: `node --test tests/mobile-header.test.mjs`

Expected: `FAIL` porque o wrapper e os novos tempos ainda não existem.

- [x] **Step 3: Implementar a janela de recorte**

Envolver o `<nav>` em `<div className="main-navigation-viewport">` e aplicar:

```css
.main-navigation-viewport { display: contents; }

@media (max-width: 1080px) {
  .main-navigation-viewport {
    position: fixed;
    z-index: 0;
    top: var(--mobile-header-edge);
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    overflow: clip;
    pointer-events: none;
  }
  .main-navigation { position: absolute; top: 0; right: 0; left: 0; pointer-events: none; }
  .main-navigation.is-open { pointer-events: auto; }
}
```

- [x] **Step 4: Sincronizar o movimento**

Aplicar as transições explícitas:

```css
.mobile-menu-backdrop { transition: opacity 500ms var(--ease-out), visibility 0s linear 500ms; }
.mobile-menu-backdrop[data-open] { transition-delay: 0s; }

@media (max-width: 1080px) {
  .main-navigation {
    transition: opacity 500ms var(--ease-in-out), visibility 0s linear 500ms, clip-path 500ms var(--ease-in-out);
  }
  .main-navigation.is-open { transition-delay: 0s; }
}

@media (max-width: 760px) {
  .site-header { transition: color 500ms var(--ease-in-out), background 500ms var(--ease-in-out), box-shadow 500ms var(--ease-in-out); }
}
```

- [x] **Step 5: Confirmar o verde**

Run: `node --test tests/mobile-header.test.mjs`

Expected: todos os testes passam.

### Task 2: Validar a experiência completa

**Files:**
- Verify: `components/SiteHeader.tsx`
- Verify: `app/globals.css`

- [x] **Step 1: Validar visualmente em 384 × 824**

Confirmar que abertura e fechamento partem da borda inferior da barra, que o menu termina depois de `English`, que a marca não é coberta e que o toque fora fecha.

- [x] **Step 2: Validar o gesto**

Confirmar que um arraste curto retorna o painel e um arraste suficiente fecha, tanto sobre o painel quanto sobre o backdrop.

- [x] **Step 3: Rodar a verificação completa**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: todos os comandos passam sem erros.

- [x] **Step 4: Commit**

```bash
git add components/SiteHeader.tsx app/globals.css tests/mobile-header.test.mjs docs/superpowers
git commit -m "fix: anchor mobile menu below header"
```
