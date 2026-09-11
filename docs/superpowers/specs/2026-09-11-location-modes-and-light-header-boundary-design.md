# Modos de deslocamento e limite do cabeçalho claro

## Objetivo

Enriquecer o painel de localização com referências fixas de caminhada, bicicleta e carro, e tornar perceptível o limite inferior do cabeçalho quando ele estiver sobre uma abertura branca.

## Modos de deslocamento

Um único seletor segmentado ficará acima das três referências próximas. Ele terá três botões compactos, nesta ordem:

1. caminhada;
2. bicicleta;
3. carro.

Caminhada será o modo inicial, preservando a leitura atual. O modo selecionado terá fundo amarelo e cor azul; os demais serão discretos, com borda fina e fundo transparente. Cada botão terá ícone moderno, nome acessível e estado selecionado exposto com `aria-pressed`.

Ao trocar o modo, somente o conjunto formado por tempo e distância muda. Nome do destino, ícone do local e posição das linhas permanecem imóveis. A transição será curta, baseada em opacidade e pequeno deslocamento vertical, com alternativa sem deslocamento para `prefers-reduced-motion`.

## Valores fixos pesquisados

Pesquisa realizada em 11 de setembro de 2026 no Google Maps, partindo de Rua Deputado Cunha Bueno, 55, Rio Vermelho, Salvador. Será usada a primeira rota apresentada para cada modo.

| Destino | Caminhada | Bicicleta | Carro |
| --- | --- | --- | --- |
| Praia do Buracão | 9 min · 600 m | 4 min · 600 m | 2 min · 600 m |
| Vila Caramuru | 13 min · 950 m | 6 min · 1,2 km | 4 min · 1,2 km |
| Largo de Santana | 18 min · 1,3 km | 5 min · 1,3 km | 4 min · 1,3 km |

Os dados serão armazenados no conteúdo localizado em português e inglês. Como os valores são fixos, o site não prometerá atualização em tempo real; o tempo de carro é uma referência e pode variar com o trânsito.

Fontes consultadas:

- [Google Maps: Praia do Buracão](https://www.google.com/maps/dir/?api=1&origin=Rua+Deputado+Cunha+Bueno+55+Salvador+BA&destination=Praia+do+Buracao+Salvador+BA)
- [Google Maps: Vila Caramuru](https://www.google.com/maps/dir/?api=1&origin=Rua+Deputado+Cunha+Bueno+55+Salvador+BA&destination=Vila+Caramuru+Salvador+BA)
- [Google Maps: Largo de Santana](https://www.google.com/maps/dir/?api=1&origin=Rua+Deputado+Cunha+Bueno+55+Salvador+BA&destination=Largo+de+Santana+Salvador+BA)

## Limite do cabeçalho sobre fundo branco

Uma linha azul de um pixel marcará o limite inferior da topbar somente quando o documento contiver uma abertura de página com tema claro, como Pía e PC ou Eventos.

- A linha seguirá a mesma largura útil e as mesmas margens horizontais do conteúdo.
- No topo, terá baixa opacidade: presente o bastante para separar duas superfícies brancas, sem parecer uma borda pesada.
- Durante a mudança para o cabeçalho compacto, reduzirá a opacidade e a escala horizontal com a mesma família de curvas já usada pelo cabeçalho.
- No estado compacto azul, ficará invisível; o contraste entre azul e página passa a definir o limite.
- Ao retornar ao topo, reaparecerá suavemente e sem alterar altura, posição ou fluxo do cabeçalho.
- Não aparecerá na página inicial nem sobre aberturas amarelas, azuis ou escuras.

A regra será determinada pelo tema presente no próprio documento, evitando uma lista manual de rotas que possa ficar desatualizada.

## Responsabilidades técnicas

- `lib/site-content.ts`: armazenar rótulos dos modos e valores localizados por destino.
- `components/HomePage.tsx`: controlar o modo selecionado e renderizar o grupo de botões e os valores correspondentes.
- `app/globals.css`: estilizar o seletor, a transição dos valores e a linha temática do cabeçalho.
- `tests/location-panel.test.mjs`: cobrir os três modos, nove combinações de tempo/distância, acessibilidade e responsividade.
- `tests/mobile-header.test.mjs`: cobrir a presença temática e o desaparecimento da linha no estado compacto.

## Validação

- O painel será verificado em mobile e desktop sem ampliar a largura dos botões Maps e Waze.
- Os três destinos permanecerão visíveis sem rolagem interna adicional.
- O seletor terá alvo de toque adequado mesmo com aparência compacta.
- Trocas rápidas de modo deverão retomar a transição do estado visual corrente, sem empilhar animações.
- Testes, lint e build serão executados depois da validação visual.

## Fora do escopo

- API de rotas, geolocalização do visitante ou atualização automática por trânsito.
- Alterar os três destinos já aprovados.
- Exibir trajetos completos dentro do painel.
- Aplicar a linha do cabeçalho a temas que já tenham contraste suficiente.
