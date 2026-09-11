# Light Header Boundary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sinalizar o fim da topbar sobre aberturas brancas com uma linha sutil que desaparece durante a transição para o cabeçalho compacto azul.

**Architecture:** A linha será um pseudo-elemento do cabeçalho, sem alterar o fluxo ou a altura. Um seletor temático com `body:has(.rich-page--light)` a ativa apenas em páginas claras; classes de estado já existentes no cabeçalho controlam sua saída no modo compacto e quando o menu móvel está aberto.

**Tech Stack:** CSS, Node Test Runner.

---

### Task 1: Cobrir a linha temática com teste vermelho

**Files:**
- Modify: `tests/mobile-header.test.mjs`
- Test: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Escrever o teste da regra temática**

```js
assert.match(styles, /\.site-header::after\s*\{[^}]*width:\s*var\(--shell\)[^}]*opacity:\s*0/s);
assert.match(
  styles,
  /body:has\(\.rich-page--light\) \.site-header:not\(\.site-header--compact\):not\(\.site-header--menu-open\)::after\s*\{[^}]*opacity:/s,
);
assert.match(styles, /\.site-header--compact::after\s*\{[^}]*opacity:\s*0/s);
```

- [ ] **Step 2: Executar e confirmar a falha**

Run: `node --test tests/mobile-header.test.mjs`

Expected: `FAIL` porque o cabeçalho ainda não possui o pseudo-elemento temático.

- [ ] **Step 3: Commit do teste vermelho**

```bash
git add tests/mobile-header.test.mjs
git commit -m "test: cover light page header boundary"
```

### Task 2: Implementar o limite sem alterar o layout

**Files:**
- Modify: `app/globals.css`
- Test: `tests/mobile-header.test.mjs`

- [ ] **Step 1: Criar a linha invisível por padrão**

```css
.site-header::after {
  position: absolute;
  right: 50%;
  bottom: 0;
  width: var(--shell);
  height: 1px;
  content: "";
  background: var(--blue);
  opacity: 0;
  pointer-events: none;
  transform: translateX(50%) scaleX(.94);
  transform-origin: center;
  transition: opacity .45s var(--ease-out), transform .45s var(--ease-in-out);
}
```

- [ ] **Step 2: Ativar somente no topo de páginas claras**

```css
body:has(.rich-page--light) .site-header:not(.site-header--compact):not(.site-header--menu-open)::after {
  opacity: .26;
  transform: translateX(50%) scaleX(1);
}
.site-header--compact::after,
.site-header--menu-open::after {
  opacity: 0;
  transform: translateX(50%) scaleX(.94);
}
```

- [ ] **Step 3: Remover a transformação com movimento reduzido**

No bloco `prefers-reduced-motion`, manter apenas a alteração curta de opacidade da linha e definir `transform: translateX(50%)`.

- [ ] **Step 4: Executar o teste focal e confirmar o verde**

Run: `node --test tests/mobile-header.test.mjs`

Expected: todos os testes do cabeçalho móvel passam.

- [ ] **Step 5: Commit da implementação**

```bash
git add app/globals.css tests/mobile-header.test.mjs
git commit -m "fix: define header edge on light pages"
```

### Task 3: Validar páginas claras e coloridas

**Files:**
- Verify: `app/globals.css`

- [ ] **Step 1: Validar Pía e PC no topo e rolada**

Em mobile, abrir `/pt/pia-e-pc`, confirmar a linha sutil no topo e seu desaparecimento contínuo enquanto o cabeçalho fica azul. Voltar ao topo e confirmar que a linha reaparece sem tremor.

- [ ] **Step 2: Validar escopo temático**

Confirmar a mesma separação em `/pt/eventos` e ausência da linha em `/pt`, `/pt/aulas` e `/pt/curso`.

- [ ] **Step 3: Executar a verificação completa do conjunto**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: testes, lint e build passam; `git diff --check` não produz saída.
