export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const navigation = {
  pt: [
    { label: "Início", href: "" },
    { label: "Aulas", href: "/aulas" },
    { label: "Eventos", href: "/eventos" },
    { label: "Curso", href: "/curso" },
    { label: "Pía e PC", href: "/pia-e-pc" },
    { label: "Contato", href: "/contato" },
  ],
  en: [
    { label: "Home", href: "" },
    { label: "Classes", href: "/classes" },
    { label: "Events", href: "/events" },
    { label: "Course", href: "/course" },
    { label: "Pía & PC", href: "/pia-and-pc" },
    { label: "Contact", href: "/contact" },
  ],
} satisfies Record<Locale, { label: string; href: string }[]>;

export const equivalentSlugs: Record<string, string> = {
  aulas: "classes",
  classes: "aulas",
  eventos: "events",
  events: "eventos",
  curso: "course",
  course: "curso",
  "pia-e-pc": "pia-and-pc",
  "pia-and-pc": "pia-e-pc",
  contato: "contact",
  contact: "contato",
  "politica-de-privacidade": "privacy-policy",
  "privacy-policy": "politica-de-privacidade",
  "termos-de-uso": "terms-of-use",
  "terms-of-use": "termos-de-uso",
  cookies: "cookies",
};

export const homeContent = {
  pt: {
    eyebrow: "Rio Vermelho · Salvador",
    slides: [
      {
        kicker: "Curso online",
        title: "Roots para atravessar distâncias.",
        text: "Um percurso online com Pía e PC para quem já tem alguma base no forró.",
        href: "/curso",
        image: "/images/instagram/optimized/generated/hero/comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/mergulhar-comunidade-editorial.webp",
        imageAlt: "Turma da Varanda Roots reunida em uma aula.",
      },
      {
        kicker: "Aulas presenciais",
        title: "O forró começa no encontro.",
        text: "Do primeiro passo ao aprofundamento no Roots.",
        href: "/aulas",
        image: "/images/instagram/optimized/generated/hero/aulas-comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Festas e bailes",
        title: "A pista também ensina.",
        text: "Música, presença e comunidade em movimento.",
        href: "/eventos",
        image: "/images/instagram/optimized/generated/hero/danca-conexao-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/evoluir-conexao-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Pía e PC",
        title: "Corpo, música e pista.",
        text: "Uma parceria construída entre o ensino, a pesquisa e a curadoria musical.",
        href: "/pia-e-pc",
        image: "/images/instagram/optimized/generated/hero/pia-pc-editorial.webp",
        mobileImage: "/images/instagram/optimized/photos/pia-pc-casacos-varanda-roots-DYkNlnOjRZq.webp",
        imageAlt: "",
      },
    ],
    discover: "Descobrir",
    manifestKicker: "Escola, festa, comunidade e casa",
    manifest:
      "Uma varanda aberta para aprender, dançar e viver o Forró Roots em Salvador.",
    manifestBody:
      "A técnica encontra a leveza. O estudo encontra o baile. E cada pessoa encontra espaço para construir a própria dança.",
    classesKicker: "Aulas presenciais",
    classesTitle: "Há um caminho para cada momento da dança.",
    classesBody:
      "Aulas em grupo e particulares, do nível iniciante ao aprofundamento no Forró Roots, no Rio Vermelho.",
    classCards: [
      ["Começar", "Para construir fundamentos e entrar no forró com segurança."],
      ["Evoluir", "Para ampliar repertório, escuta e autonomia na dança."],
      ["Mergulhar", "Para aprofundar princípios, técnica e expressão no Roots."],
    ],
    classImages: [
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp",
    ],
    learnMore: "Conheça as aulas",
    agendaKicker: "Agenda",
    agendaTitle: "Onde a Varanda acontece.",
    agendaNote: "Festas, música e formação no mesmo calendário.",
    agendaItems: [
      { type: "Festa", title: "Varanda Roots Party", place: "Salvador · Bahia", status: "Próxima edição", href: "/eventos#varanda-roots-party" },
      { type: "Música", title: "Baile de Forró em Vinil", place: "Rio Vermelho", status: "Na pista", href: "/eventos#forro-em-vinil" },
      { type: "Formação", title: "Workshop com Pía e PC", place: "Brasil e exterior", status: "Agenda aberta", href: "/eventos#workshops-e-festivais" },
    ],
    allEvents: "Ver eventos",
    courseKicker: "Aprenda o Roots com Pía e PC",
    courseTitle: "Um percurso online para aprofundar a sua dança.",
    courseBody:
      "O curso online parte de alguma experiência prévia no forró e organiza o estudo do Roots em fundamentos, movimentos e possibilidades.",
    courseLink: "Conheça o curso",
    duoKicker: "Pía Ovalle e DJ PC",
    duoTitle: "Duas pesquisas. Uma dança construída em parceria.",
    duoBody:
      "Eles começaram a ensinar juntos em 2020 e fundaram a Varanda Roots em 2021. Desde então, conectam pedagogia, experiência de pista e curadoria musical em aulas, festas e workshops.",
    duoLink: "Conheça Pía e PC",
    visitKicker: "No Rio Vermelho",
    visitTitle: "Trace sua rota até a Varanda.",
    visitNeighborhood: "Rio Vermelho · Salvador",
    visitBody: "Rua Deputado Cunha Bueno, 55 · Rio Vermelho · Salvador, Bahia.",
    visitNearby: [
      { icon: "beach", time: "9 min a pé", place: "Praia do Buracão" },
      { icon: "community", time: "13 min a pé", place: "Vila Caramuru" },
      { icon: "landmark", time: "18 min a pé", place: "Largo de Santana" },
    ],
    visitMapsLabel: "Maps",
    visitWazeLabel: "Waze",
    contact: "Fale com a Varanda",
  },
  en: {
    eyebrow: "Rio Vermelho · Salvador, Brazil",
    slides: [
      {
        kicker: "Online course",
        title: "Roots across distances.",
        text: "An online path with Pía and PC for dancers who already know the basics.",
        href: "/course",
        image: "/images/instagram/optimized/generated/hero/comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/mergulhar-comunidade-editorial.webp",
        imageAlt: "A Varanda Roots class gathered together.",
      },
      {
        kicker: "In-person classes",
        title: "Forró begins with connection.",
        text: "From the first step to a deeper exploration of Roots.",
        href: "/classes",
        image: "/images/instagram/optimized/generated/hero/aulas-comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Parties and dances",
        title: "The dance floor teaches too.",
        text: "Music, presence and community in motion.",
        href: "/events",
        image: "/images/instagram/optimized/generated/hero/danca-conexao-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/evoluir-conexao-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Pía and PC",
        title: "Body, music and dance floor.",
        text: "A partnership shaped by teaching, research and musical curation.",
        href: "/pia-and-pc",
        image: "/images/instagram/optimized/generated/hero/pia-pc-editorial.webp",
        mobileImage: "/images/instagram/optimized/photos/pia-pc-casacos-varanda-roots-DYkNlnOjRZq.webp",
        imageAlt: "",
      },
    ],
    discover: "Discover",
    manifestKicker: "School, party, community and home",
    manifest:
      "An open veranda to learn, dance and experience Forró Roots in Salvador.",
    manifestBody:
      "Technique meets lightness. Study meets the dance floor. And everyone finds room to build their own dance.",
    classesKicker: "In-person classes",
    classesTitle: "A path for every moment in your dance.",
    classesBody:
      "Group and private classes, from beginners to an in-depth exploration of Forró Roots, in Rio Vermelho.",
    classCards: [
      ["Begin", "Build solid foundations and enter the dance with confidence."],
      ["Evolve", "Expand your repertoire, listening and autonomy."],
      ["Go deeper", "Explore the principles, technique and expression of Roots."],
    ],
    classImages: [
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp",
    ],
    learnMore: "Explore classes",
    agendaKicker: "Schedule",
    agendaTitle: "Where Varanda comes alive.",
    agendaNote: "Parties, music and learning on the same calendar.",
    agendaItems: [
      { type: "Party", title: "Varanda Roots Party", place: "Salvador · Bahia", status: "Next edition", href: "/events#varanda-roots-party" },
      { type: "Music", title: "Forró Vinyl Dance", place: "Rio Vermelho", status: "On the dance floor", href: "/events#forro-em-vinil" },
      { type: "Learning", title: "Workshop with Pía and PC", place: "Brazil and abroad", status: "Open schedule", href: "/events#workshops-e-festivais" },
    ],
    allEvents: "View events",
    courseKicker: "Learn Roots with Pía and PC",
    courseTitle: "An online path to deepen your dance.",
    courseBody:
      "The online course assumes some previous forró experience and structures the study of Roots through foundations, movements and possibilities.",
    courseLink: "Explore the course",
    duoKicker: "Pía Ovalle and DJ PC",
    duoTitle: "Two perspectives. One dance built together.",
    duoBody:
      "They began teaching together in 2020 and founded Varanda Roots in 2021. Since then, they have connected pedagogy, dance-floor experience and musical curation through classes, parties and workshops.",
    duoLink: "Meet Pía and PC",
    visitKicker: "In Rio Vermelho",
    visitTitle: "Plan your route to Varanda.",
    visitNeighborhood: "Rio Vermelho · Salvador",
    visitBody: "Rua Deputado Cunha Bueno, 55 · Rio Vermelho · Salvador, Bahia, Brazil.",
    visitNearby: [
      { icon: "beach", time: "9 min walk", place: "Praia do Buracão" },
      { icon: "community", time: "13 min walk", place: "Vila Caramuru" },
      { icon: "landmark", time: "18 min walk", place: "Largo de Santana" },
    ],
    visitMapsLabel: "Maps",
    visitWazeLabel: "Waze",
    contact: "Contact Varanda",
  },
} satisfies Record<Locale, Record<string, unknown>>;

type PageSection = { title: string; body: string };
type InternalPage = {
  eyebrow: string;
  title: string;
  intro: string;
  theme: "yellow" | "blue" | "light" | "dark";
  sections: PageSection[];
};

export const internalPages: Record<Locale, Record<string, InternalPage>> = {
  pt: {
    aulas: {
      eyebrow: "Aulas presenciais · Rio Vermelho",
      title: "Aprender forró é construir presença.",
      intro:
        "Aulas em grupo e particulares para quem está começando e para quem deseja aprofundar o Forró Roots.",
      theme: "blue",
      sections: [
        { title: "Começar", body: "Fundamentos para entrar na dança com mais consciência e segurança." },
        { title: "Evoluir", body: "Repertório, escuta, conexão e autonomia para quem já dança." },
        { title: "Aulas particulares", body: "Encontros individuais ou em pequenos grupos, organizados conforme os objetivos de cada pessoa." },
      ],
    },
    eventos: {
      eyebrow: "Festas, bailes e encontros",
      title: "A Varanda também acontece na pista.",
      intro:
        "Agenda de eventos próprios, participações, workshops e encontros ligados à comunidade Varanda Roots.",
      theme: "light",
      sections: [
        { title: "Próximos eventos", body: "A programação reúne festas próprias, bailes, participações e encontros da comunidade." },
        { title: "Varanda Roots Party", body: "Festas e bailes fazem parte da experiência da marca e aproximam estudo, música e comunidade." },
        { title: "Convites e workshops", body: "Pía e PC participam de festivais, escolas e eventos no Brasil e no exterior." },
      ],
    },
    curso: {
      eyebrow: "Aprenda o Roots com Pía e PC",
      title: "O estudo continua onde você estiver.",
      intro:
        "Um percurso online de Forró Roots voltado a pessoas que já possuem alguma base de forró.",
      theme: "yellow",
      sections: [
        { title: "Para quem é", body: "Para quem já conhece fundamentos iniciais e deseja aprofundar o Roots." },
        { title: "O percurso", body: "Fundamentos, princípios, movimentos e possibilidades organizados em uma progressão de estudo." },
        { title: "Importante", body: "O curso online não substitui a formação inicial de quem nunca dançou forró." },
      ],
    },
    "pia-e-pc": {
      eyebrow: "Fundadores da Varanda Roots",
      title: "Pía Ovalle e Paulo Cezar, o DJ PC.",
      intro:
        "Uma parceria que conecta dança, ensino, música e experiência de pista.",
      theme: "dark",
      sections: [
        { title: "Uma parceria", body: "Pía e PC começaram a dar aulas juntos em 2020 e fundaram a Varanda Roots em Salvador em 2021." },
        { title: "Pía", body: "Professora de forró, cofundadora da Varanda e presença em aulas, cursos e workshops." },
        { title: "PC", body: "Professor, DJ e pesquisador musical, com atuação em festas, festivais e eventos nacionais e internacionais." },
      ],
    },
    contato: {
      eyebrow: "Contato",
      title: "Qual conversa você quer começar?",
      intro:
        "A página concentra os caminhos de contato da escola e os convites profissionais para Pía e PC.",
      theme: "yellow",
      sections: [
        { title: "Aulas e escola", body: "Fale com a equipe sobre turmas, níveis, aulas particulares e visitas à sede." },
        { title: "Eventos e workshops", body: "Convites para festivais, workshops, aulas particulares, apresentações e DJ sets." },
        { title: "Onde estamos", body: "Rua Deputado Cunha Bueno, 55, Rio Vermelho, Salvador — BA." },
      ],
    },
    "politica-de-privacidade": {
      eyebrow: "Informações legais",
      title: "Política de Privacidade.",
      intro: "Como as informações relacionadas à navegação e ao contato com a Varanda Roots podem ser tratadas.",
      theme: "light",
      sections: [
        { title: "Navegação", body: "O site pode processar dados técnicos necessários ao funcionamento, à segurança e à medição de desempenho." },
        { title: "Serviços externos", body: "Mapas, vídeos e conteúdos incorporados podem ser fornecidos por terceiros e seguir as políticas desses serviços." },
        { title: "Seus direitos", body: "Solicitações relacionadas a dados pessoais podem ser encaminhadas pelos canais apresentados na página de contato." },
      ],
    },
    "termos-de-uso": {
      eyebrow: "Informações legais",
      title: "Termos de Uso.",
      intro: "Condições gerais para navegação e utilização dos conteúdos institucionais da Varanda Roots.",
      theme: "light",
      sections: [
        { title: "Conteúdo", body: "Textos, imagens, marcas e materiais do site são destinados à apresentação institucional da Varanda Roots." },
        { title: "Agenda e serviços", body: "Informações de turmas, eventos e cursos devem ser confirmadas nos canais oficiais antes de qualquer contratação." },
        { title: "Links externos", body: "O site pode direcionar para plataformas de terceiros, que possuem suas próprias condições de uso." },
      ],
    },
    cookies: {
      eyebrow: "Informações legais",
      title: "Cookies.",
      intro: "Informações sobre tecnologias necessárias ao funcionamento e serviços incorporados ao site.",
      theme: "light",
      sections: [
        { title: "Essenciais", body: "Alguns recursos técnicos são necessários para o funcionamento seguro e consistente do site." },
        { title: "Terceiros", body: "Serviços incorporados, como mapas, podem utilizar tecnologias próprias ao serem carregados." },
        { title: "Preferências", body: "As configurações do navegador permitem limitar ou apagar cookies, com possível impacto em alguns recursos." },
      ],
    },
  },
  en: {
    classes: {
      eyebrow: "In-person classes · Rio Vermelho",
      title: "Learning forró means building presence.",
      intro:
        "Group and private classes for beginners and dancers who want to explore Forró Roots more deeply.",
      theme: "blue",
      sections: [
        { title: "Begin", body: "Foundations to enter the dance with awareness and confidence." },
        { title: "Evolve", body: "Repertoire, listening, connection and autonomy for dancers with experience." },
        { title: "Private classes", body: "Individual or small-group sessions shaped around each dancer’s goals." },
      ],
    },
    events: {
      eyebrow: "Parties, dances and gatherings",
      title: "Varanda also comes alive on the dance floor.",
      intro:
        "A schedule of Varanda events, guest appearances, workshops and community gatherings.",
      theme: "light",
      sections: [
        { title: "Upcoming events", body: "The programme brings together Varanda parties, dances, guest appearances and community gatherings." },
        { title: "Varanda Roots Party", body: "Parties and dances connect learning, music and community." },
        { title: "Invitations and workshops", body: "Pía and PC take part in festivals, schools and events in Brazil and abroad." },
      ],
    },
    course: {
      eyebrow: "Learn Roots with Pía and PC",
      title: "Keep studying wherever you are.",
      intro:
        "An online Forró Roots course for dancers who already have some forró experience.",
      theme: "yellow",
      sections: [
        { title: "Who it is for", body: "Dancers who know the initial foundations and want to go deeper into Roots." },
        { title: "The path", body: "Foundations, principles, movements and possibilities structured as a learning progression." },
        { title: "Please note", body: "The online course does not replace beginner training for someone who has never danced forró." },
      ],
    },
    "pia-and-pc": {
      eyebrow: "Founders of Varanda Roots",
      title: "Pía Ovalle and Paulo Cezar, DJ PC.",
      intro: "A partnership connecting dance, teaching, music and dance-floor experience.",
      theme: "dark",
      sections: [
        { title: "A partnership", body: "Pía and PC began teaching together in 2020 and founded Varanda Roots in Salvador in 2021." },
        { title: "Pía", body: "Forró teacher, co-founder of Varanda and a presence in classes, courses and workshops." },
        { title: "PC", body: "Teacher, DJ and music researcher with experience at parties, festivals and events in Brazil and abroad." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Which conversation would you like to start?",
      intro:
        "This page brings together school enquiries and professional invitations for Pía and PC.",
      theme: "yellow",
      sections: [
        { title: "Classes and school", body: "Talk to the team about groups, levels, private classes and visiting the school." },
        { title: "Events and workshops", body: "Invitations for festivals, workshops, private classes, performances and DJ sets." },
        { title: "Find us", body: "Rua Deputado Cunha Bueno, 55, Rio Vermelho, Salvador, Bahia, Brazil." },
      ],
    },
    "privacy-policy": {
      eyebrow: "Legal information",
      title: "Privacy Policy.",
      intro: "How information related to browsing and contacting Varanda Roots may be handled.",
      theme: "light",
      sections: [
        { title: "Browsing", body: "The website may process technical data required for operation, security and performance measurement." },
        { title: "External services", body: "Maps, videos and embedded content may be provided by third parties and follow their own policies." },
        { title: "Your rights", body: "Requests concerning personal data may be sent through the channels shown on the contact page." },
      ],
    },
    "terms-of-use": {
      eyebrow: "Legal information",
      title: "Terms of Use.",
      intro: "General conditions for browsing and using Varanda Roots institutional content.",
      theme: "light",
      sections: [
        { title: "Content", body: "Texts, images, trademarks and materials on this website present Varanda Roots as an institution." },
        { title: "Schedule and services", body: "Class, event and course information should be confirmed through official channels before booking." },
        { title: "External links", body: "The website may direct visitors to third-party platforms governed by their own terms." },
      ],
    },
    cookies: {
      eyebrow: "Legal information",
      title: "Cookies.",
      intro: "Information about technologies required for operation and services embedded in the website.",
      theme: "light",
      sections: [
        { title: "Essential", body: "Some technical resources are required for the website to operate securely and consistently." },
        { title: "Third parties", body: "Embedded services, such as maps, may use their own technologies when loaded." },
        { title: "Preferences", body: "Browser settings can limit or delete cookies, which may affect some features." },
      ],
    },
  },
};
