# Varanda Roots: site institucional

Este repositório contém o site institucional bilíngue da Varanda Roots, escola e comunidade de Forró Roots no Rio Vermelho, em Salvador. A aplicação reúne a página inicial, informações sobre aulas, eventos, curso online, Pía e PC, contato e documentos legais em português e inglês.

Produção: [varandarootslp.vercel.app/pt](https://varandarootslp.vercel.app/pt)

## Tecnologias

- Next.js 16 com App Router e geração estática das páginas;
- React 19 e TypeScript;
- GSAP e `@gsap/react` para animações carregadas sob demanda;
- Lenis para suavização da rolagem com suporte a movimento reduzido;
- Lucide React para os ícones dos modos de deslocamento;
- CSS global próprio em [`app/globals.css`](app/globals.css);
- Node Test Runner e ESLint para validação.

## Instalação e execução

Use o `package-lock.json` versionado para instalar exatamente as dependências aprovadas:

```powershell
npm ci
npm run dev
```

O servidor de desenvolvimento usa `http://localhost:3000` por padrão. A rota `/` redireciona para `/pt`.

Para simular o build publicado:

```powershell
npm run build
npm start
```

O código atual não lê variáveis de ambiente obrigatórias. Tokens, credenciais da Vercel e dados de contas não devem ser adicionados ao repositório ou a este documento.

## Rotas e idiomas

As páginas usam o segmento inicial `/pt` ou `/en`. Os pares de rotas ficam em [`lib/site-content.ts`](lib/site-content.ts), no objeto `equivalentSlugs`.

| Conteúdo | Português | Inglês |
| --- | --- | --- |
| Início | `/pt` | `/en` |
| Aulas | `/pt/aulas` | `/en/classes` |
| Eventos | `/pt/eventos` | `/en/events` |
| Curso | `/pt/curso` | `/en/course` |
| Pía e PC | `/pt/pia-e-pc` | `/en/pia-and-pc` |
| Contato | `/pt/contato` | `/en/contact` |
| Privacidade | `/pt/politica-de-privacidade` | `/en/privacy-policy` |
| Termos de uso | `/pt/termos-de-uso` | `/en/terms-of-use` |
| Cookies | `/pt/cookies` | `/en/cookies` |

[`app/[locale]/page.tsx`](app/%5Blocale%5D/page.tsx) renderiza a página inicial. [`app/[locale]/[slug]/page.tsx`](app/%5Blocale%5D/%5Bslug%5D/page.tsx) resolve as páginas internas e gera seus metadados. Uma combinação de idioma ou slug que não existe usa a página 404 da marca.

## Organização do repositório

| Caminho | Responsabilidade |
| --- | --- |
| [`app/`](app/) | layouts, rotas, metadados e estilos globais |
| [`components/`](components/) | cabeçalho, rodapé, páginas, transições e componentes de marca |
| [`lib/site-content.ts`](lib/site-content.ts) | navegação, pares de slugs, textos da home, localização e páginas legais |
| [`lib/rich-page-content.ts`](lib/rich-page-content.ts) | conteúdo editorial das páginas de aulas, eventos, curso e Pía e PC |
| [`public/`](public/) | arquivos servidos pelo site: marca, fontes, imagens otimizadas e vídeo |
| [`assets/media-source/`](assets/media-source/) | fontes originais de imagem e vídeo usadas na produção dos arquivos publicados |
| [`scripts/`](scripts/) | processamento local de mídia |
| [`tests/`](tests/) | regressões de conteúdo, layout, movimento, imagens, mapa e navegação |
| [`docs/`](docs/) | direção visual, decisões de implementação, especificações e planos |

## Onde fazer cada manutenção

### Textos, navegação e páginas

- Edite a navegação, o hero, os blocos da home, o endereço, as referências de deslocamento e as páginas legais em [`lib/site-content.ts`](lib/site-content.ts).
- Mantenha português e inglês na mesma alteração. Ao criar uma rota, inclua também o par correspondente em `equivalentSlugs`.
- Edite o conteúdo editorial das páginas internas em [`lib/rich-page-content.ts`](lib/rich-page-content.ts).
- A composição da home fica em [`components/HomePage.tsx`](components/HomePage.tsx). A composição compartilhada das páginas internas fica em [`components/InternalPageView.tsx`](components/InternalPageView.tsx).

### Cabeçalho e menu móvel

[`components/SiteHeader.tsx`](components/SiteHeader.tsx) concentra o cabeçalho fixo, a troca de idioma e o menu móvel. O menu:

- abre abaixo da barra superior;
- fecha pelo botão, por clique fora, pela tecla `Escape` ou pelo gesto de arrastar para cima;
- bloqueia a rolagem da página enquanto está aberto;
- preserva a posição da marca durante a abertura e o recolhimento.

As medidas, cores, transições e estados responsivos desses comportamentos ficam em [`app/globals.css`](app/globals.css). Mudanças no cabeçalho devem ser conferidas no topo da página e depois de iniciar a rolagem, em desktop e mobile.

### Rolagem, transições e movimento

- [`components/PageScrollFade.tsx`](components/PageScrollFade.tsx) inicializa o Lenis quando o navegador fica ocioso, controla o indicador de rolagem e interrompe a rolagem suave quando o menu assume a tela.
- [`components/PageTransition.tsx`](components/PageTransition.tsx) controla as transições entre a home e as cinco páginas institucionais principais.
- [`components/HomePage.tsx`](components/HomePage.tsx) carrega GSAP sob demanda para o hero, os destaques editoriais e os valores de deslocamento.

Toda animação nova deve respeitar `prefers-reduced-motion`. Prefira `transform` e `opacity` para evitar recálculo de layout durante o movimento.

### Mapa e referências de deslocamento

O mapa incorporado, os links do Maps e do Waze e a interface de troca entre A pé, Bicicleta e Carro estão em [`components/HomePage.tsx`](components/HomePage.tsx). Os nomes dos lugares, tempos e distâncias ficam em `homeContent`, dentro de [`lib/site-content.ts`](lib/site-content.ts).

Os valores são referências fixas, não respostas de uma API em tempo real. Ao alterar o endereço ou uma referência:

1. confira o percurso no serviço de mapas;
2. atualize português e inglês;
3. revise o destino dos links do Maps e do Waze;
4. valide no mobile se textos e botões continuam cabendo no painel.

### Imagens, vídeo, marca e fontes

- Preserve os arquivos originais em [`assets/media-source/`](assets/media-source/).
- Publique somente as versões preparadas em [`public/images/instagram/optimized/`](public/images/instagram/optimized/) e [`public/videos/instagram/`](public/videos/instagram/).
- Para reprocessar as imagens de origem, execute `npm run optimize:instagram`. O script grava arquivos WebP no diretório público sem apagar os originais.
- Os arquivos oficiais da marca ficam em [`public/brand/`](public/brand/).
- As fontes ficam em [`public/fonts/`](public/fonts/). O site usa o arquivo variável latino compacto na entrega principal; mantenha os demais arquivos até confirmar que nenhum material complementar depende deles.
- As regras de formatos, tamanhos e qualidades aceitas pelo `next/image` ficam em [`next.config.ts`](next.config.ts).

Não substitua imagens, logotipos ou fontes sem confirmar a origem e a autorização de uso comercial. Otimização não altera direitos de uso do arquivo original.

## Validação antes da entrega

Execute a sequência completa:

```powershell
npm test
npm run lint
npm run build
git diff --check
```

Além dos comandos, confira manualmente:

- `/pt` e `/en` em largura mobile e desktop;
- abertura, recolhimento, gesto e bloqueio de rolagem do menu móvel;
- transição do cabeçalho ao rolar;
- legibilidade dos quatro slides do hero;
- troca entre A pé, Bicicleta e Carro;
- carregamento do mapa e abertura dos links externos;
- navegação entre idiomas e retorno da marca para a página inicial;
- páginas legais e 404.

Se `npm run lint` começar a analisar arquivos de `.next` ou `.worktrees`, não versione esses artefatos. A configuração em [`eslint.config.mjs`](eslint.config.mjs) deve manter ambos fora do escopo.

## Entrega pelo GitHub e Vercel

A Vercel está ligada ao repositório GitHub:

- branches de trabalho geram deployments de Preview;
- a branch `main` gera o deployment de Production;
- o domínio público é [varandarootslp.vercel.app](https://varandarootslp.vercel.app/pt).

Fluxo mínimo de entrega:

1. trabalhe em uma branch e mantenha o diff limitado à demanda;
2. execute testes, lint e build;
3. envie a branch e revise o Preview da Vercel;
4. integre a alteração à `main`;
5. confirme na Vercel que o deployment de Production está `Ready` e corresponde ao commit da `main`;
6. abra o domínio público e valide a rota `/pt`.

Não registre no repositório tokens, identificadores privados de equipe ou arquivos da pasta `.vercel`.

## Documentação de apoio

- [Direção visual e estrutural](docs/design-varanda-roots.md)
- [Plano geral de implementação](docs/implementation-plan.md)
- [Especificação deste README](docs/superpowers/specs/2026-09-11-internal-readme-design.md)
- [Plano deste README](docs/superpowers/plans/2026-09-11-internal-readme.md)
- [Decisões sobre modos de deslocamento e cabeçalho claro](docs/superpowers/specs/2026-09-11-location-modes-and-light-header-boundary-design.md)
- [Decisões sobre o gesto do menu móvel](docs/superpowers/specs/2026-09-11-mobile-menu-swipe-dismiss-design.md)

## Uso comercial e propriedade

Este é um projeto autoral com fins comerciais. O repositório reúne código, textos, fotografias, vídeos, fontes e arquivos de marca com condições de uso diferentes. Acesso ao código não concede autorização para reutilizar a identidade Varanda Roots ou sua mídia.

O projeto não está publicado como software de código aberto e não possui uma licença aberta no repositório. Qualquer entrega, cópia, adaptação ou transferência deve seguir os termos definidos pelos titulares dos materiais envolvidos.

## Checklist de manutenção

- [ ] Alterei português e inglês quando o conteúdo tem equivalente nos dois idiomas.
- [ ] Mantive originais em `assets/media-source/` e arquivos publicados em `public/`.
- [ ] Testei o cabeçalho e o menu em mobile e desktop.
- [ ] Conferi animações com e sem movimento reduzido.
- [ ] Validei mapa, Maps, Waze, tempos e distâncias quando mexi na localização.
- [ ] Executei `npm test`, `npm run lint`, `npm run build` e `git diff --check`.
- [ ] Revisei o Preview antes de integrar à `main`.
- [ ] Confirmei o commit e o domínio de produção depois do deployment.
