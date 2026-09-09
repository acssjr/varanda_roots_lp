# Varanda Roots: localização e refinamento de movimento

## Objetivo

Transformar a seção de localização em uma orientação prática sobre o Rio Vermelho e refinar as interações do cabeçalho e dos botões para que a interface pareça mais estável, suave e claramente interativa.

## Seção de localização

- Manter o Google Maps como elemento principal.
- Repetir `Rio Vermelho · Salvador` no painel ao lado do mapa, acima do endereço completo.
- Mostrar três referências verificadas pelo Google Maps como tempos aproximados de caminhada:
  - Praia do Buracão: 9 min a pé.
  - Vila Caramuru: 13 min a pé.
  - Largo de Santana: 18 min a pé.
- Usar ícones lineares próprios e coerentes com a identidade: onda para a praia, encontro/cultura para a Vila Caramuru e marco urbano para o Largo de Santana.
- Exibir dois botões equivalentes: Google Maps e Waze. O Waze usa exatamente o link fornecido pelo usuário.
- Em telas menores, empilhar endereço, referências e botões abaixo do mapa sem comprimir o conteúdo.

## Cabeçalho e movimento

- Manter a mudança para apenas o ícone quando o cabeçalho entra no estado compacto no mobile.
- Fazer o nome desaparecer gradualmente usando apenas `opacity` e um pequeno deslocamento, enquanto a largura da marca se ajusta em uma duração levemente maior.
- Evitar a tremida no retorno ao topo mantendo dimensões estáveis no contêiner do ícone e sincronizando largura, espaçamento, opacidade e deslocamento com a mesma curva.
- Alinhar opticamente a marca e o conjunto ícone + texto do botão Menu pelo mesmo centro vertical do cabeçalho.
- Respeitar `prefers-reduced-motion`.

## Microinterações

- Aplicar hover apenas em dispositivos que realmente possuem hover.
- Nos botões com seta, deslocar a seta discretamente para cima e para a direita em 160 ms.
- Adicionar resposta de pressão com escala sutil, sem alterar layout.
- Preservar contraste, foco por teclado e área de toque.

## Verificação

- Testes de regressão para o conteúdo e os links da localização.
- Testes de regressão para durações, propriedades animadas, alinhamento e hover.
- Lint, testes, build, inspeção visual desktop/mobile e validação da produção na Vercel.

