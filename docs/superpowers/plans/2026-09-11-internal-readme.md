# Internal README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um README técnico interno que permita manter, validar e entregar comercialmente o site institucional da Varanda Roots.

**Architecture:** O `README.md` será a porta de entrada operacional do repositório e apontará para os arquivos que concentram conteúdo, interface, mídia e documentação detalhada. Um teste de documentação verificará a presença dos comandos, caminhos e avisos essenciais para impedir que o README fique desatualizado silenciosamente.

**Tech Stack:** Markdown, Node Test Runner, Next.js 16, React 19, TypeScript, Vercel.

---

### Task 1: Documentação operacional

**Files:**
- Create: `README.md`
- Create: `tests/readme.test.mjs`

- [ ] **Step 1: Escrever o teste vermelho**

Criar um teste que leia `README.md` e exija: descrição da Varanda Roots, rotas bilíngues, comandos de desenvolvimento e validação, caminhos de manutenção, cuidados com marca e mídia e processo de entrega.

- [ ] **Step 2: Confirmar a falha**

Run: `node --test tests/readme.test.mjs`

Expected: falha porque `README.md` ainda não existe.

- [ ] **Step 3: Escrever o README**

Documentar somente comportamentos e caminhos confirmados no repositório. Não incluir tokens, contas, contatos inventados, badges decorativos ou licença aberta.

- [ ] **Step 4: Revisar o texto**

Aplicar a lista de padrões da skill `no-ai-slop`: remover frases intercambiáveis, metadiscurso, superlativos, slogans e conclusões vazias.

- [ ] **Step 5: Validar**

Run:

```powershell
node --test tests/readme.test.mjs
npm test
npm run lint
npm run build
git diff --check
```

Expected: todos os comandos encerram sem erro e sem placeholders no README.

- [ ] **Step 6: Commit**

```powershell
git add README.md tests/readme.test.mjs docs/superpowers/plans/2026-09-11-internal-readme.md
git commit -m "docs: add internal project readme"
```
