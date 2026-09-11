import type { Locale } from "@/lib/site-content";

export type PageAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type RichInternalPage = {
  kind: "rich";
  theme: "yellow" | "blue" | "light";
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: string;
  heroAlt?: string;
  primaryAction: PageAction;
  secondaryAction?: PageAction;
  highlights?: { id?: string; title: string; body: string; image?: string; alt?: string }[];
  story?: { eyebrow: string; title: string; body: string };
  gallery?: { src: string; alt: string; caption: string }[];
  profiles?: { name: string; role: string; image: string; alt: string; description: string }[];
  video?: { src: string; poster: string; title: string; body: string };
  contactOptions?: { title: string; body: string; action: PageAction; note: string }[];
  closingTitle: string;
  closingBody: string;
  closingAction: PageAction;
};

const whatsapp = (message: string) =>
  `https://wa.me/5571936189895?text=${encodeURIComponent(message)}`;

const pt = {
  aulas: {
    kind: "rich",
    theme: "blue",
    eyebrow: "Aulas presenciais no Rio Vermelho",
    title: "Aprender forró é ganhar liberdade para a pista.",
    intro: "Turmas e aulas particulares para começar com segurança, ampliar repertório e aprofundar o Forró Roots com presença, escuta e autonomia.",
    heroImage: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
    heroAlt: "Pía e PC orientando uma grande roda de participantes em uma aula de forró.",
    primaryAction: { label: "Quero conhecer as turmas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero conhecer as turmas presenciais. Meu nível de experiência com forró é: "), external: true },
    secondaryAction: { label: "Ver como funciona", href: "#como-funciona" },
    highlights: [
      { title: "Fundamento antes da fórmula", body: "A técnica aparece a serviço da dança, da música e da relação com cada parceria." },
      { title: "Progressão de verdade", body: "Há caminhos para quem nunca dançou e para quem deseja refinar repertório e qualidade de movimento." },
      { title: "Aula que encontra a pista", body: "O aprendizado conversa com bailes, práticas e com a comunidade que mantém o forró vivo." },
    ],
    story: { eyebrow: "Como funciona", title: "Um percurso construído no corpo.", body: "As turmas organizam o estudo em fundamentos, conexão, musicalidade e possibilidades do Roots. Você pode entrar pelo nível mais adequado e conversar com a equipe sobre horários, aula experimental e acompanhamento particular." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp", alt: "Pessoas dançando forró em uma prática coletiva.", caption: "Prática e leitura de pista" },
      { src: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp", alt: "Pía orientando uma turma durante uma aula de forró.", caption: "Turmas e comunidade" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp", alt: "Pía e PC orientando participantes em um encontro de forró.", caption: "Ensino próximo" },
    ],
    closingTitle: "Qual é o seu momento na dança?",
    closingBody: "Conte para a equipe se você está começando, voltando a dançar ou buscando aprofundamento. A resposta já pode indicar a turma mais adequada.",
    closingAction: { label: "Conversar sobre meu nível", href: whatsapp("Olá! Quero encontrar a turma presencial mais adequada para mim. Hoje eu me considero: "), external: true },
  },
  eventos: {
    kind: "rich",
    theme: "light",
    eyebrow: "Festas, bailes e encontros",
    title: "A Varanda também acontece quando a pista abre.",
    intro: "Festas próprias, bailes em vinil, workshops e participações que aproximam música, pesquisa e comunidade.",
    heroImage: "/images/instagram/optimized/reels/DN3T2tHWCik/DN3T2tHWCik_20250827.webp",
    heroAlt: "Pía e PC dançando no evento Matrizes diante do público.",
    primaryAction: { label: "Receber a próxima agenda", href: whatsapp("Olá! Vim pelo site e quero receber informações sobre os próximos eventos da Varanda Roots."), external: true },
    secondaryAction: { label: "Convidar Pía e PC", href: whatsapp("Olá! Gostaria de conversar sobre um convite para evento, workshop ou DJ set. O evento é: "), external: true },
    highlights: [
      { id: "varanda-roots-party", title: "Varanda Roots Party", body: "Uma festa autoral em que a curadoria musical e a experiência de pista fazem parte da proposta.", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_9.webp", alt: "Público reunido em uma edição da Varanda Roots Party." },
      { id: "forro-em-vinil", title: "Forró em vinil", body: "Baile, pesquisa musical e a presença de DJ PC em uma escuta que atravessa épocas e repertórios.", image: "/images/instagram/optimized/reels/pia-pc-dancando-em-evento-Davphbzv178.webp", alt: "Pía e PC dançando em um evento de forró." },
      { id: "workshops-e-festivais", title: "Workshops e festivais", body: "Aulas, apresentações e encontros com Pía e PC em Salvador, no Brasil e no exterior.", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp", alt: "Pía e PC conduzindo uma atividade em roda." },
    ],
    story: { eyebrow: "O que a gente cria", title: "Cada evento tem uma intenção de encontro.", body: "A Varanda produz experiências próprias e também participa de programações parceiras. O formato pode combinar aula, prática, baile, apresentação e pesquisa musical conforme o contexto." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_1.webp", alt: "Pía e PC dançando juntos no evento Matrizes.", caption: "Dança em parceria" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_4.webp", alt: "Pessoas dançando em uma roda durante um encontro da Varanda.", caption: "O encontro começa antes da música" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_8.webp", alt: "Pía e PC dançando diante do público.", caption: "Comunidade em volta da pista" },
    ],
    closingTitle: "Quer dançar ou construir um evento com a Varanda?",
    closingBody: "Fale com a equipe para receber a agenda ou apresentar um convite com cidade, data e formato desejado.",
    closingAction: { label: "Falar sobre eventos", href: whatsapp("Olá! Quero conversar sobre eventos da Varanda Roots. Meu interesse é: "), external: true },
  },
  curso: {
    kind: "rich",
    theme: "yellow",
    eyebrow: "Curso online de Forró Roots",
    title: "O estudo continua onde você estiver.",
    intro: "Um percurso com Pía e PC para quem já possui alguma base de forró e quer organizar o estudo do Roots com mais clareza.",
    heroImage: "/images/instagram/optimized/generated/hero/turma-editorial.webp",
    heroAlt: "Turma da Varanda Roots reunida em uma aula de forró.",
    primaryAction: { label: "Conhecer o curso completo", href: "https://go.hotmart.com/L106426800T", external: true },
    secondaryAction: { label: "Tirar uma dúvida", href: whatsapp("Olá! Tenho uma dúvida sobre o curso online de Forró Roots: "), external: true },
    highlights: [
      { title: "Para quem já dança", body: "O conteúdo parte de uma experiência inicial com forró e avança sobre princípios próprios do Roots." },
      { title: "Estudo organizado", body: "Fundamentos, movimentos e possibilidades aparecem em uma progressão que facilita rever e praticar." },
      { title: "Pía e PC juntos", body: "Duas perspectivas de pesquisa se encontram na demonstração, na condução e na leitura da dança." },
    ],
    story: { eyebrow: "O que você vai estudar", title: "Roots com estrutura, prática e repertório.", body: "O curso online organiza fundamentos, movimentos, conexões e possibilidades do Forró Roots em aulas que você pode rever e praticar no seu ritmo, onde estiver." },
    gallery: [
      { src: "/images/instagram/optimized/google/google-varanda-01.webp", alt: "Pía conduzindo uma turma em uma aula presencial.", caption: "Fundamentos em movimento" },
      { src: "/images/instagram/optimized/google/google-varanda-03.webp", alt: "Turma reunida depois de uma experiência de aprendizagem.", caption: "Aprendizado em comunidade" },
      { src: "/images/instagram/optimized/google/google-varanda-04.webp", alt: "Grande turma reunida no salão da Varanda Roots.", caption: "Prática, troca e repertório" },
    ],
    closingTitle: "Quer entender se o curso é para você?",
    closingBody: "Veja a apresentação completa, o conteúdo e as condições na página do curso. Se ainda houver dúvida sobre o nível indicado, fale com a Varanda.",
    closingAction: { label: "Ir para a página do curso", href: "https://go.hotmart.com/L106426800T", external: true },
  },
  "pia-e-pc": {
    kind: "rich",
    theme: "light",
    eyebrow: "Fundadores da Varanda Roots",
    title: "Duas pesquisas que se encontram na dança.",
    intro: "Pía Ovalle e Paulo Cezar, o DJ PC, conectam ensino, experiência de pista e pesquisa musical desde a criação da Varanda Roots, em 2021.",
    heroImage: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_5.webp",
    heroAlt: "Pía e PC juntos durante uma viagem internacional.",
    primaryAction: { label: "Conheça cada trajetória", href: "#perfis" },
    secondaryAction: { label: "Fazer um convite", href: whatsapp("Olá! Gostaria de conversar sobre um convite profissional para Pía e PC. O projeto é: "), external: true },
    profiles: [
      { name: "Pía Ovalle", role: "Professora e cofundadora", image: "/images/instagram/optimized/profiles/pia-ovalle-retrato.webp", alt: "Pía Ovalle dançando em uma apresentação da Varanda Roots.", description: "Pía é professora de forró e cofundadora da Varanda Roots. Sua atuação atravessa aulas presenciais, curso online, workshops e festivais, com atenção à consciência corporal, à conexão e à autonomia de cada pessoa na dança." },
      { name: "Paulo Cezar — DJ PC", role: "Professor, DJ e pesquisador musical", image: "/images/instagram/optimized/carousels/DNybhLIWhMx/DNybhLIWhMx_20250825_12.webp", alt: "Retrato de DJ PC diante de uma arquitetura branca e céu azul.", description: "PC é professor, DJ e pesquisador musical. Sua escuta conecta tradição, repertório e experiência de pista em aulas, festas, festivais e sets que apresentam o forró como cultura viva." },
    ],
    story: { eyebrow: "Desde 2020", title: "A parceria virou escola, festa e comunidade.", body: "Pía e PC começaram a ensinar juntos em 2020 e fundaram a Varanda Roots em Salvador no ano seguinte. O trabalho do casal reúne pedagogia, dança, produção de encontros e curadoria musical dentro e fora do Brasil." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_1.webp", alt: "Pía e PC em frente ao Portão de Brandemburgo.", caption: "Caminhos compartilhados" },
      { src: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_4.webp", alt: "Pía e PC diante de um mural em Berlim.", caption: "Pesquisa dentro e fora da pista" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_8.webp", alt: "Pía e PC dançando diante do público.", caption: "Uma dança construída em parceria" },
    ],
    video: { src: "/videos/instagram/DMFtAiWt5NS/optimized/danca-pia-varanda-loop.mp4", poster: "/videos/instagram/DMFtAiWt5NS/optimized/danca-pia-varanda-poster.webp", title: "A pesquisa ganha corpo na pista.", body: "Um recorte curto de dança para mostrar ritmo, presença e improviso. O vídeo só começa quando aparece na tela e roda sem áudio para preservar desempenho e fluidez." },
    closingTitle: "A Varanda também viaja.",
    closingBody: "Pía e PC recebem convites para workshops, festivais, aulas, apresentações e DJ sets no Brasil e no exterior.",
    closingAction: { label: "Convidar Pía e PC", href: whatsapp("Olá! Gostaria de convidar Pía e PC para um trabalho. Cidade, data e formato: "), external: true },
  },
  contato: {
    kind: "rich",
    theme: "yellow",
    eyebrow: "Fale com a Varanda",
    title: "Escolha a conversa que você quer começar.",
    intro: "Cada botão abre o canal certo com uma mensagem pronta. Você só completa as informações do seu caso e envia.",
    primaryAction: { label: "Falar sobre aulas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero informações sobre aulas presenciais. Meu nível é: "), external: true },
    contactOptions: [
      { title: "Aulas e escola", body: "Turmas, níveis, aula experimental, horários e aulas particulares.", note: "A mensagem já pergunta o seu nível de experiência.", action: { label: "Perguntar sobre aulas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero informações sobre aulas presenciais. Meu nível de experiência com forró é: "), external: true } },
      { title: "Eventos e workshops", body: "Convites para festivais, workshops, apresentações e DJ sets.", note: "Inclua cidade, data prevista e formato do evento.", action: { label: "Apresentar um convite", href: whatsapp("Olá! Gostaria de conversar sobre um evento ou workshop com a Varanda Roots. Cidade, data e formato: "), external: true } },
      { title: "Curso online", body: "Dúvidas sobre indicação, conteúdo e acesso ao curso de Roots.", note: "Para ver conteúdo e condições, você também pode abrir a página de vendas.", action: { label: "Tirar dúvida do curso", href: whatsapp("Olá! Tenho uma dúvida sobre o curso online de Forró Roots: "), external: true } },
      { title: "Instagram", body: "Acompanhe agenda, aulas e registros recentes da comunidade.", note: "O perfil oficial é @varanda.roots.", action: { label: "Abrir o Instagram", href: "https://www.instagram.com/varanda.roots/", external: true } },
    ],
    closingTitle: "Fale direto com a Varanda.",
    closingBody: "O mesmo número recebe ligações e mensagens no WhatsApp. A escola fica na Rua Deputado Cunha Bueno, 55, no Rio Vermelho.",
    closingAction: { label: "WhatsApp", href: whatsapp("Olá! Vim pelo site da Varanda Roots e gostaria de conversar com a equipe."), external: true },
  },
} satisfies Record<string, RichInternalPage>;

const en = {
  classes: {
    ...pt.aulas,
    eyebrow: "In-person classes in Rio Vermelho",
    title: "Learning forró gives you freedom on the dance floor.",
    intro: "Group and private classes to begin with confidence, expand your repertoire and explore Forró Roots through presence, listening and autonomy.",
    heroAlt: "Pía and PC guiding a large circle of dancers during a forró class.",
    primaryAction: { label: "Explore the class groups", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My forró experience is: "), external: true },
    secondaryAction: { label: "How classes work", href: "#como-funciona" },
    highlights: [
      { title: "Foundations before formulas", body: "Technique supports the dance, the music and the relationship with each partner." },
      { title: "A real progression", body: "There are paths for first-time dancers and for people refining repertoire and movement quality." },
      { title: "Classes meet the dance floor", body: "Learning stays connected to dances, practice and the community keeping forró alive." },
    ],
    story: { eyebrow: "How it works", title: "A path built through the body.", body: "Groups organize the study around foundations, connection, musicality and Roots possibilities. The team can help you choose a level and explain schedules, trial classes and private sessions." },
    gallery: pt.aulas.gallery?.map((item, index) => ({ ...item, alt: ["People practising forró together.", "A Varanda Roots class gathered in the studio.", "Pía and PC guiding dancers at a forró gathering."][index], caption: ["Practice and dance-floor awareness", "Classes and community", "Close, attentive teaching"][index] })),
    closingTitle: "Where are you in your dance journey?",
    closingBody: "Tell the team whether you are beginning, returning to dance or looking for deeper study. They can point you towards the right group.",
    closingAction: { label: "Talk about my level", href: whatsapp("Hello! I would like to find the right in-person group for me. At the moment, I consider myself: "), external: true },
  },
  events: {
    ...pt.eventos,
    eyebrow: "Parties, dances and gatherings",
    title: "Varanda also comes alive when the dance floor opens.",
    intro: "Original parties, vinyl dances, workshops and guest appearances connecting music, research and community.",
    heroAlt: "Pía and PC dancing at Matrizes in front of the audience.",
    primaryAction: { label: "Get the next schedule", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about upcoming events."), external: true },
    secondaryAction: { label: "Invite Pía and PC", href: whatsapp("Hello! I would like to discuss an invitation for an event, workshop or DJ set. The event is: "), external: true },
    highlights: [
      { ...pt.eventos.highlights![0], title: "Varanda Roots Party", body: "An original party where musical curation and the experience of the dance floor shape the entire event.", alt: "An audience gathered at a Varanda Roots Party." },
      { ...pt.eventos.highlights![1], title: "Forró on vinyl", body: "Dance, musical research and DJ PC's selections connect different periods and repertoires.", alt: "Pía and PC dancing at a forró event." },
      { ...pt.eventos.highlights![2], title: "Workshops and festivals", body: "Classes, performances and gatherings with Pía and PC in Salvador, Brazil and abroad.", alt: "Pía and PC leading an activity in a circle." },
    ],
    story: { eyebrow: "What we create", title: "Every event begins with a reason to gather.", body: "Varanda produces its own experiences and joins partner programmes. Each format can combine a class, guided practice, dance, performance and musical research." },
    gallery: pt.eventos.gallery?.map((item, index) => ({ ...item, alt: ["Pía and PC dancing together at Matrizes.", "Pía and PC in the centre of a large circle of participants.", "An audience gathered around a forró performance."][index], caption: ["Dance as a partnership", "The gathering begins before the music", "Community around the dance floor"][index] })),
    closingTitle: "Would you like to dance or build an event with Varanda?",
    closingBody: "Contact the team for the schedule or send an invitation with the city, date and intended format.",
    closingAction: { label: "Talk about events", href: whatsapp("Hello! I would like to talk about Varanda Roots events. I am interested in: "), external: true },
  },
  course: {
    ...pt.curso,
    eyebrow: "Online Forró Roots course",
    title: "Keep studying wherever you are.",
    intro: "A path with Pía and PC for dancers who know the foundations of forró and want a clearer structure for studying Roots.",
    heroAlt: "A Varanda Roots group gathered during a forró class.",
    primaryAction: { label: "Explore the full course", href: "https://go.hotmart.com/L106426800T", external: true },
    secondaryAction: { label: "Ask a question", href: whatsapp("Hello! I have a question about the online Forró Roots course: "), external: true },
    highlights: [
      { title: "For people who already dance", body: "The content starts from initial forró experience and explores principles that shape Roots." },
      { title: "A structured study", body: "Foundations, movements and possibilities follow a progression that makes review and practice easier." },
      { title: "Pía and PC together", body: "Two areas of research meet through demonstrations, leading and the interpretation of the dance." },
    ],
    story: { eyebrow: "What you will study", title: "Roots with structure, practice and repertoire.", body: "The online course organizes foundations, movements, connections and Forró Roots possibilities into lessons you can revisit and practise at your own pace, wherever you are." },
    gallery: pt.curso.gallery?.map((item, index) => ({ ...item, alt: ["Pía guiding a group during an in-person class.", "A class gathered after a learning experience.", "A large class gathered at the Varanda Roots studio."][index], caption: ["Foundations in motion", "Learning in community", "Practice, exchange and repertoire"][index] })),
    closingTitle: "Want to know whether the course is right for you?",
    closingBody: "See the complete presentation, syllabus and terms on the course page. If you still have a question about the level, contact Varanda.",
    closingAction: { label: "Open the course page", href: "https://go.hotmart.com/L106426800T", external: true },
  },
  "pia-and-pc": {
    ...pt["pia-e-pc"],
    eyebrow: "Founders of Varanda Roots",
    title: "Two perspectives meeting through dance.",
    intro: "Pía Ovalle and Paulo Cezar, DJ PC, connect teaching, dance-floor experience and musical research.",
    heroAlt: "Pía and PC together during an international trip.",
    primaryAction: { label: "Meet each founder", href: "#perfis" },
    secondaryAction: { label: "Send an invitation", href: whatsapp("Hello! I would like to discuss a professional invitation for Pía and PC. The project is: "), external: true },
    profiles: [
      { ...pt["pia-e-pc"].profiles![0], role: "Teacher and co-founder", alt: "Portrait of Pía Ovalle dancing by the sea.", description: "Pía is a forró teacher and co-founder of Varanda Roots. Her work spans in-person classes, the online course, workshops and festivals, with close attention to body awareness, connection and each dancer's autonomy." },
      { ...pt["pia-e-pc"].profiles![1], role: "Teacher, DJ and music researcher", alt: "Portrait of DJ PC against white architecture and blue sky.", description: "PC is a teacher, DJ and music researcher. His listening connects tradition, repertoire and dance-floor experience through classes, parties, festivals and sets that present forró as a living culture." },
    ],
    story: { eyebrow: "Since 2020", title: "The partnership became a school, a party and a community.", body: "Pía and PC began teaching together in 2020 and founded Varanda Roots in Salvador the following year. Their work brings pedagogy, dance, event production and musical curation together in Brazil and abroad." },
    gallery: pt["pia-e-pc"].gallery?.map((item, index) => ({ ...item, alt: ["Pía and PC in front of the Brandenburg Gate.", "Pía and PC in front of a mural in Berlin.", "Pía and PC dancing in front of an audience."][index], caption: ["Paths travelled together", "Research on and beyond the dance floor", "A dance built in partnership"][index] })),
    video: { ...pt["pia-e-pc"].video!, title: "Research takes shape on the dance floor.", body: "A short dance excerpt revealing rhythm, presence and improvisation. The silent video starts only when it enters the screen, preserving page performance and flow." },
    closingTitle: "Varanda travels too.",
    closingBody: "Pía and PC welcome invitations for workshops, festivals, classes, performances and DJ sets in Brazil and abroad.",
    closingAction: { label: "Invite Pía and PC", href: whatsapp("Hello! I would like to invite Pía and PC for a project. City, date and format: "), external: true },
  },
  contact: {
    ...pt.contato,
    eyebrow: "Contact Varanda",
    title: "Choose the conversation you want to start.",
    intro: "Each button opens the right channel with a prepared message that you can complete before sending.",
    primaryAction: { label: "Ask about classes", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My level is: "), external: true },
    contactOptions: [
      { title: "Classes and school", body: "Groups, levels, trial classes, schedules and private sessions.", note: "The prepared message asks about your experience.", action: { label: "Ask about classes", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My forró experience is: "), external: true } },
      { title: "Events and workshops", body: "Invitations for festivals, workshops, performances and DJ sets.", note: "Include the city, expected date and event format.", action: { label: "Send an invitation", href: whatsapp("Hello! I would like to discuss an event or workshop with Varanda Roots. City, date and format: "), external: true } },
      { title: "Online course", body: "Questions about the recommended level, content and course access.", note: "You can also open the sales page to review the syllabus and terms.", action: { label: "Ask about the course", href: whatsapp("Hello! I have a question about the online Forró Roots course: "), external: true } },
      { title: "Instagram", body: "Follow recent classes, events and stories from the community.", note: "The official profile is @varanda.roots.", action: { label: "Open Instagram", href: "https://www.instagram.com/varanda.roots/", external: true } },
    ],
    closingTitle: "Talk directly to Varanda.",
    closingBody: "The same number receives calls and WhatsApp messages. The school is at Rua Deputado Cunha Bueno, 55, Rio Vermelho, Salvador.",
    closingAction: { label: "WhatsApp", href: whatsapp("Hello! I found Varanda Roots through the website and would like to talk to the team."), external: true },
  },
} satisfies Record<string, RichInternalPage>;

export const richInternalPages: Record<Locale, Record<string, RichInternalPage>> = { pt, en };
