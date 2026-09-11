# README interno de manutenção e entrega

## Objetivo

Criar o `README.md` principal do repositório como documento operacional para quem recebe, mantém ou publica o site institucional da Varanda Roots. O arquivo não será uma peça de venda nem um modelo genérico de portfólio.

## Leitor

Desenvolvedores, responsáveis técnicos e pessoas encarregadas da entrega comercial do site. O texto deve permitir que alguém novo no projeto entenda onde está cada responsabilidade sem precisar rastrear todo o código.

## Conteúdo

O README apresentará:

1. a função institucional do site e o escopo bilíngue;
2. as tecnologias realmente instaladas;
3. os comandos de instalação, desenvolvimento, teste, lint e build;
4. a organização das pastas que concentram páginas, componentes, conteúdo, imagens, testes e documentação;
5. os pontos de manutenção de textos, navegação, imagens, mapa e referências de deslocamento;
6. os comportamentos sensíveis do cabeçalho, menu móvel, scroll suave e animações;
7. a rotina mínima de validação antes da publicação;
8. o fluxo de entrega por GitHub e Vercel;
9. os limites de uso de marca, fontes, imagens e código comercial, sem declarar uma licença aberta que não existe;
10. um checklist de manutenção para futuras alterações.

## Tom

Português direto e técnico. Cada afirmação deve apontar para uma pasta, comando ou comportamento existente. O texto evitará slogans, elogios ao próprio projeto, frases intercambiáveis com outros produtos e promessas não comprovadas.

## Limites

- Não documentar credenciais, tokens, contas ou variáveis secretas.
- Não inventar responsáveis, contatos, processos empresariais ou política de licenciamento.
- Não repetir especificações detalhadas que já vivem em `docs/`; o README apenas indicará onde encontrá-las.
- Não incluir badges decorativos sem integração real.
- Não apresentar o projeto como software de código aberto.

## Validação

- Conferir todos os comandos com `package.json`.
- Conferir os caminhos mencionados no sistema de arquivos.
- Executar a revisão `no-ai-slop` no texto final.
- Verificar links Markdown e ausência de placeholders.
- Rodar testes, lint e build antes de concluir a entrega.
