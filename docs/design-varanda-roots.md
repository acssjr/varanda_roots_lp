# Varanda Roots — direção de design institucional

## Objetivo

Construir um site institucional bilíngue que organize a Varanda Roots como escola, festa, comunidade e casa. A experiência deve apresentar suas diferentes frentes sem reduzir o projeto a uma única oferta ou a uma página orientada somente à conversão.

## Linguagem visual

O conceito é **editorial cinético**: clareza de instituição cultural com o movimento e a proximidade de uma varanda de forró.

- Cabeçalho em uma camada visual distinta do conteúdo.
- Azul profundo e amarelo solar ocupando seções completas.
- Fotografias em grande escala como matéria principal.
- Branco quente e preto como pausas de leitura.
- Saans em toda a família, com pesos e itálicos disponíveis.
- Curvas, horizontes, círculos e raios inspirados na marca, sem redesenhá-la.

## Navegação

Menu principal: Início, Aulas, Eventos, Curso, Pía e PC, Contato.

O cabeçalho começa amplo e claro no desktop. Após o primeiro trecho da página, torna-se uma barra azul compacta. No mobile, começa compacto, com uma faixa amarela de identidade. O seletor PT/EN permanece disponível e conserva a página equivalente ao trocar o idioma.

## Página inicial

1. Carrossel audiovisual em tela ampla apresentando aulas, eventos, curso e Pía e PC.
2. Manifesto institucional em amarelo.
3. Aulas presenciais em azul.
4. Agenda em branco quente.
5. Curso online em amarelo.
6. Pía e PC em composição fotográfica editorial.
7. Contato e visita.
8. Rodapé escuro.

## Movimento

GSAP será usado como linguagem narrativa, mantendo o scroll nativo:

- troca de slides por máscara curva;
- entradas de texto por linhas;
- mudança de cor entre capítulos;
- trilho horizontal curto para conteúdos editoriais;
- elementos circulares e linhas da identidade reagindo ao scroll;
- animações reduzidas no mobile e alternativa para `prefers-reduced-motion`.

Transformações e opacidade terão prioridade para preservar desempenho. Seções fixadas serão pontuais e nunca impedirão a navegação natural.

## Conteúdo e confiança

O texto partirá apenas do dossiê público validado. Dados operacionais ainda não confirmados, imagens, agenda e contatos específicos serão tratados como placeholders explícitos. A arquitetura já ficará pronta para futura integração com painel administrativo e conteúdo em português e inglês.
