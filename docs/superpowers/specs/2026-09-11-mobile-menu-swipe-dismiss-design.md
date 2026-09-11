# Menu móvel: recolhimento por gesto

## Objetivo

Restaurar o fechamento do menu móvel por gesto para cima e manter o fechamento por clique fora, sem permitir que o painel azul atravesse visualmente a marca Varanda Roots durante a saída.

## Comportamento aprovado

- O gesto para cima pode começar tanto sobre o conteúdo do menu quanto sobre a área escurecida da página.
- Durante o gesto, somente o corpo do menu, com links, idioma e marca d'água, acompanha o dedo.
- A faixa superior com logo e botão **Fechar** permanece fixa, legível e acima do painel em movimento.
- Um deslocamento curto ou lento retorna o painel à posição aberta.
- Um deslocamento suficiente, ou um movimento curto com velocidade clara para cima, fecha o menu.
- Clicar na área externa e pressionar `Escape` continuam fechando o menu.
- A página permanece sem rolagem enquanto o menu está aberto.

## Estados visuais

O cabeçalho e o corpo do menu serão superfícies separadas. O corpo começa abaixo da faixa superior e, ao fechar, recolhe para trás dela usando apenas transformação e opacidade.

- **Página no topo:** o cabeçalho fica azul enquanto o menu está aberto e transita suavemente para branco depois do fechamento.
- **Página rolada:** o cabeçalho compacto permanece azul depois do fechamento.
- **Durante o arraste:** logo e botão não mudam de posição, não tremem e não são cobertos pelo painel.

## Movimento

- O arraste acompanha diretamente o ponteiro, sem animação concorrente.
- Ao cancelar, o painel retorna com uma curva de gaveta suave.
- Ao concluir, o painel continua na mesma direção e desaparece atrás do cabeçalho.
- A duração de acomodação fica dentro do intervalo de uma gaveta de interface, sem prolongar a ação.
- Com `prefers-reduced-motion`, o fechamento preserva a mudança de estado, mas elimina o deslocamento prolongado.

## Implementação

- Os manipuladores de ponteiro serão compartilhados pelo painel e pelo fundo externo.
- Uma referência única apontará para o corpo animado, evitando transformar o elemento que iniciou o gesto.
- O ponteiro será capturado no início do arraste para que o gesto continue fora da área original.
- A decisão de fechar combinará distância e velocidade vertical para cima.
- O cabeçalho manterá a camada visual superior; o painel móvel ficará ancorado abaixo da altura corrente do cabeçalho normal ou compacto.
- Nenhuma biblioteca nova será adicionada.

## Validação

- Teste automatizado falhará antes da correção e cobrirá o gesto no painel e no fundo externo.
- O teste verificará que o corpo móvel está separado do cabeçalho fixo.
- Serão testados: fechamento completo, arraste cancelado, clique externo, topo branco após fechar, estado rolado azul após fechar e preferência por movimento reduzido.
- A validação visual principal será feita em `384 × 824`, seguida pelos testes, análise estática e build completos.

## Fora do escopo

- Alterar os links, a ordem do menu ou sua identidade visual.
- Adicionar rolagem interna ao menu.
- Modificar a transição gradual do nome da marca fora do necessário para impedir tremor durante este gesto.
