# Varanda Roots — alinhamento, movimento e compactação visual

## Objetivo

Corrigir a hierarquia e o alinhamento da página inicial em desktop e mobile, refinar as transições do cabeçalho, tornar os CTAs inequivocamente interativos e reduzir o espaço improdutivo do rodapé. O resultado deve continuar editorial, institucional e fotográfico, com movimento pontual e sem prejudicar leitura ou desempenho.

## Escopo

### Margens e alinhamento

- A etiqueta, o título e o parágrafo das seções `manifest` e `classes` devem começar no mesmo eixo esquerdo do `page-shell`.
- O respiro lateral deve aumentar de forma sutil:
  - desktop: `min(100% - 64px, 1500px)`, produzindo 32 px de margem mínima;
  - tablet até 1080 px: `min(100% - 48px, 1500px)`, produzindo 24 px de margem mínima;
  - mobile: 18 px;
  - telas largas: largura máxima de 1500 px, preservando centralização.
- Nenhum ajuste pode criar overflow horizontal.

### Entrada da seção amarela

- A primeira seção amarela deve revelar-se de baixo para cima na primeira aproximação durante o scroll.
- O fundo será revelado com `clip-path`; o conteúdo interno fará um pequeno `translateY` até a posição final.
- A animação deve usar o GSAP e o `ScrollTrigger` já existentes, sem novas dependências.
- Duração-alvo: 800 a 900 ms, usando a curva `power3.out` já presente no projeto.
- A animação executa uma única vez e não bloqueia interação.
- Com `prefers-reduced-motion`, o recorte e o deslocamento são removidos e o conteúdo aparece estável.

### Cards de aulas

- Os cards entram de baixo com deslocamento curto e opacidade, em sequência de 70 ms, uma única vez.
- No mobile, o botão circular de cada card fica no canto superior direito do conteúdo.
- O número permanece no canto superior esquerdo.
- As setas devem permanecer rigorosamente centralizadas dentro dos círculos.

### Cabeçalho mobile

- No topo, o cabeçalho deve ter 88 px de altura visual.
- No estado compacto, sua altura visual deve ter 72 px.
- A redução deve ser construída com recorte e transformação, evitando mudanças contínuas de largura na marca.
- A mudança entre fundo claro e azul deve durar cerca de 650 ms.
- Marca e botão `Menu` devem compartilhar o mesmo centro vertical nos dois estados.
- A área clicável da marca continua levando ao início da página atual ou à página inicial.

### Desaparecimento progressivo do nome

- O ícone da Varanda Roots permanece visível e imóvel.
- O nome desaparece gradualmente da direita para a esquerda por meio de `clip-path: inset(...)`.
- Duração-alvo: 700 ms, com curva forte de movimento em tela `cubic-bezier(0.77, 0, 0.175, 1)`.
- A largura externa da marca permanece fixa durante toda a transição para impedir tremidas.
- Ao retornar ao topo, a transição é exatamente reversa e pode ser interrompida sem reiniciar do zero.

### Microinterações dos CTAs

- A bola do CTA não se desloca, não escala e não muda de posição no hover.
- Somente a seta interna gira 45 graus no próprio eixo.
- Duração: 160 ms, usando a curva de movimento em tela.
- O hover é aplicado apenas em dispositivos com `hover: hover` e `pointer: fine`.
- O estado de pressão mantém feedback curto e discreto.
- O padrão será replicado nos CTAs circulares em que houver a mesma construção visual.

### Botões Maps e Waze

- O texto do primeiro botão passa de `Google Maps` para `Maps` em português e inglês.
- Cada botão recebe um ícone reconhecível do respectivo serviço, armazenado localmente ou implementado como SVG inline acessível.
- Os botões deixam de ocupar toda a largura do painel e passam a medir apenas o necessário para ícone, nome e seta.
- Os botões usam `flex-wrap`: permanecem lado a lado quando suas larguras intrínsecas couberem e quebram de linha somente quando não couberem, sem ocupar largura integral.
- Os links existentes para Google Maps e Waze permanecem inalterados.

### Rodapé mobile

- Reduzir padding vertical e intervalos entre identidade, colunas e área legal.
- Manter a identidade no topo, seguida por uma grade compacta de `Explore` e `Encontre`.
- A coluna de idioma vira uma linha horizontal compacta abaixo dessas duas colunas.
- Copyright, links legais e retorno ao topo permanecem disponíveis e legíveis.
- O rodapé deve usar apenas o espaço necessário para conteúdo e respiro, sem remover informações.

## Sistema de movimento

- Adicionar tokens compartilhados:
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`;
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- Priorizar `transform`, `opacity` e `clip-path`.
- Não usar `transition: all`.
- Animações de leitura e navegação não devem repetir a cada passagem pelo scroll.
- Informações do mapa, distâncias e rodapé não recebem movimento decorativo.

## Acessibilidade e desempenho

- Preservar nomes acessíveis dos links, mesmo com ícones visuais.
- SVGs decorativos usam `aria-hidden="true"`.
- Manter foco de teclado e áreas clicáveis atuais.
- Respeitar `prefers-reduced-motion` com estado estável ou transição somente de cor/opacidade.
- Não adicionar bibliotecas ou recursos remotos exclusivamente para animação.

## Validação

- Testes estruturais devem cobrir:
  - alinhamento compartilhado das introduções;
  - margens desktop e mobile;
  - recorte progressivo do nome;
  - ausência de alteração de largura no estado compacto;
  - bola estática e rotação exclusiva da seta;
  - rótulo `Maps`, ícones dos dois serviços e botões compactos;
  - layout compacto do rodapé mobile;
  - entrada da seção amarela e sequência dos cards com redução de movimento.
- Executar testes, lint e build.
- Validar visualmente em 1920 × 1080, 390 × 844 e uma largura intermediária.
- Medir o centro vertical da marca e do botão `Menu` nos estados normal e compacto.
- Verificar ausência de overflow horizontal e tremida durante scroll reverso.

## Fora do escopo

- Alterar conteúdo editorial além de `Google Maps` para `Maps`.
- Animar mapa, distâncias, rodapé ou imagens do hero com novos efeitos.
- Trocar biblioteca de animação.
- Redesenhar páginas internas.
