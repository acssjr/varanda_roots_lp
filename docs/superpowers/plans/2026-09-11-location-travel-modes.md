# Location Travel Modes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar ao painel de localização um seletor compacto que troca tempo e distância entre caminhada, bicicleta e carro para os três destinos pesquisados.

**Architecture:** Os nove valores ficarão em `site-content.ts`, localizados por idioma e agrupados por destino e modo. `HomePage` manterá apenas o modo ativo; as três métricas de cada destino permanecerão montadas em camadas e serão alternadas por transições CSS de opacidade e transformação, evitando saltos e permitindo interrupção suave.

**Tech Stack:** React 19, TypeScript, CSS, Node Test Runner.

---

### Task 1: Especificar dados e interação com testes vermelhos

**Files:**
- Modify: `tests/location-panel.test.mjs`
- Test: `tests/location-panel.test.mjs`

- [ ] **Step 1: Escrever o teste dos três modos e nove métricas**

Adicionar expectativas para `travelMode`, grupo acessível, botões pressionáveis, todas as distâncias e as classes de transição:

```js
assert.match(homePage, /const \[travelMode, setTravelMode\] = useState<TravelMode>\("walk"\)/);
assert.match(homePage, /className="visit__mode-switch"/);
assert.match(homePage, /role="group"/);
assert.match(homePage, /aria-pressed=\{travelMode === mode\}/);
assert.match(homePage, /className=\{`visit__nearby-metric/);
for (const value of ["600 m", "950 m", "1,2 km", "1,3 km", "1.2 km", "1.3 km"]) {
  assert.match(content, new RegExp(value.replace(".", "\\.")));
}
assert.match(styles, /\.visit__mode-button\s*\{/);
assert.match(styles, /\.visit__nearby-metric\s*\{[^}]*opacity:\s*0[^}]*transform:\s*translate3d/s);
assert.match(styles, /\.visit__nearby-metric\.is-active\s*\{[^}]*opacity:\s*1[^}]*transform:\s*translate3d\(0,\s*0,\s*0\)/s);
```

- [ ] **Step 2: Executar e confirmar a falha**

Run: `node --test tests/location-panel.test.mjs`

Expected: `FAIL` porque o estado, o seletor e as distâncias ainda não existem.

- [ ] **Step 3: Commit do teste vermelho**

```bash
git add tests/location-panel.test.mjs
git commit -m "test: cover fixed travel mode references"
```

### Task 2: Modelar e renderizar os modos pesquisados

**Files:**
- Modify: `lib/site-content.ts`
- Modify: `components/HomePage.tsx`
- Modify: `app/globals.css`
- Test: `tests/location-panel.test.mjs`

- [ ] **Step 1: Trocar `time` por rotas localizadas**

Cada item de `visitNearby` terá este formato, com equivalentes em inglês:

```ts
{
  icon: "beach",
  place: "Praia do Buracão",
  routes: {
    walk: { time: "9 min", distance: "600 m" },
    bike: { time: "4 min", distance: "600 m" },
    car: { time: "2 min", distance: "600 m" },
  },
}
```

Adicionar `visitTravelModes` com `walk`, `bike` e `car` em português e inglês. Aplicar os valores aprovados para Praia do Buracão, Vila Caramuru e Largo de Santana.

- [ ] **Step 2: Criar os ícones e o estado do seletor**

Definir:

```tsx
type TravelMode = "walk" | "bike" | "car";
const travelModes: TravelMode[] = ["walk", "bike", "car"];
const [travelMode, setTravelMode] = useState<TravelMode>("walk");
```

Criar `TravelModeIcon` com SVGs `aria-hidden` e renderizar o grupo antes de `.visit__nearby`:

```tsx
<div className="visit__mode-switch" role="group" aria-label={content.visitTravelModeLabel}>
  {travelModes.map((mode) => (
    <button
      type="button"
      className={`visit__mode-button ${travelMode === mode ? "is-active" : ""}`}
      aria-label={content.visitTravelModes[mode]}
      aria-pressed={travelMode === mode}
      onClick={() => setTravelMode(mode)}
      key={mode}
    >
      <TravelModeIcon mode={mode} />
    </button>
  ))}
</div>
```

- [ ] **Step 3: Manter as métricas montadas em camadas**

Dentro de cada destino, renderizar os três modos em `.visit__nearby-metrics`, com apenas o ativo acessível:

```tsx
<span className="visit__nearby-metrics" aria-live="polite">
  {travelModes.map((mode) => (
    <span
      className={`visit__nearby-metric ${travelMode === mode ? "is-active" : ""}`}
      aria-hidden={travelMode !== mode}
      key={mode}
    >
      <strong>{item.routes[mode].time}</strong>
      <em>{item.routes[mode].distance}</em>
    </span>
  ))}
  <small>{item.place}</small>
</span>
```

- [ ] **Step 4: Estilizar controles e transição**

Usar botões de 42 px com ícones de 19 px, borda azul e estado amarelo. Posicionar as métricas na mesma célula e alternar com:

```css
.visit__nearby-metric {
  grid-area: metric;
  opacity: 0;
  transform: translate3d(0, 4px, 0);
  transition: opacity 160ms var(--ease-out), transform 160ms var(--ease-out);
}
.visit__nearby-metric.is-active { opacity: 1; transform: translate3d(0, 0, 0); }
```

No bloco global de movimento reduzido, remover o deslocamento das métricas.

- [ ] **Step 5: Executar o teste focal e confirmar o verde**

Run: `node --test tests/location-panel.test.mjs`

Expected: todos os testes do painel de localização passam.

- [ ] **Step 6: Commit da implementação**

```bash
git add lib/site-content.ts components/HomePage.tsx app/globals.css tests/location-panel.test.mjs
git commit -m "feat: add fixed travel modes to location panel"
```

### Task 3: Validar o painel responsivo

**Files:**
- Verify: `components/HomePage.tsx`
- Verify: `app/globals.css`

- [ ] **Step 1: Validar em mobile**

Em `384 × 824`, confirmar que os três botões cabem acima da lista, cada modo troca os nove valores corretos, os destinos não se movem e Maps/Waze mantêm a largura atual.

- [ ] **Step 2: Validar em desktop**

Confirmar que o seletor permanece discreto na coluna lateral e que tempo e distância não quebram linha.

- [ ] **Step 3: Validar acessibilidade e movimento reduzido**

Confirmar `aria-pressed`, nomes acessíveis, navegação por teclado, foco visível e troca sem deslocamento quando `prefers-reduced-motion: reduce` estiver ativo.

