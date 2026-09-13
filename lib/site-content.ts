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
        actionLabel: "Ver o curso",
        title: "Estude Forró Roots com Pía e PC.",
        text: "Aulas online para quem já dança forró e quer aprender mais sobre o Roots.",
        href: "/curso",
        image: "/images/instagram/optimized/generated/hero/comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/mergulhar-comunidade-editorial.webp",
        imageAlt: "Turma da Varanda Roots reunida em uma aula.",
      },
      {
        kicker: "Aulas presenciais",
        actionLabel: "Conhecer as aulas",
        title: "Venha aprender forró no Rio Vermelho.",
        text: "Aulas em grupo e particulares, para quem vai começar e para quem já dança.",
        href: "/aulas",
        image: "/images/instagram/optimized/generated/hero/aulas-comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Festas e bailes",
        actionLabel: "Ver os eventos",
        title: "Vem dançar com a gente.",
        text: "Conheça os bailes da Varanda e os eventos com Pía e PC.",
        href: "/eventos",
        image: "/images/instagram/optimized/generated/hero/danca-conexao-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/evoluir-conexao-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Pía e PC",
        actionLabel: "Conhecer Pía e PC",
        title: "Conheça Pía e PC.",
        text: "Professores de forró e fundadores da Varanda Roots, em Salvador.",
        href: "/pia-e-pc",
        image: "/images/instagram/optimized/generated/hero/pia-pc-editorial.webp",
        mobileImage: "/images/instagram/optimized/photos/pia-pc-casacos-varanda-roots-DYkNlnOjRZq.webp",
        imageAlt: "",
      },
    ],
    discover: "Saiba mais",
    manifestKicker: "Aulas, bailes e workshops",
    manifest:
      "Uma escola e uma turma para dançar Forró Roots em Salvador.",
    manifestBody:
      "Na Varanda, você pode aprender os primeiros passos, conhecer outras pessoas que dançam e participar dos bailes. Pía e PC fundaram a escola em 2021, no Rio Vermelho.",
    classesKicker: "Aulas presenciais",
    classesTitle: "Do primeiro passo às aulas de Roots.",
    classesBody:
      "Aulas em grupo e particulares, do nível iniciante ao aprofundamento no Forró Roots, no Rio Vermelho.",
    classCards: [
      ["Começar", "Aprenda os passos básicos e pratique a dança a dois."],
      ["Evoluir", "Experimente novos passos e aprenda a variar com a música."],
      ["Mergulhar", "Estude os movimentos do Roots e refine o que você já dança."],
    ],
    classImages: [
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp",
    ],
    learnMore: "Conheça as aulas",
    agendaKicker: "Bailes e workshops",
    agendaTitle: "Veja o que a gente faz.",
    agendaNote: "Conheça os eventos e consulte as próximas datas com a equipe.",
    agendaItems: [
      { type: "Festa", title: "Varanda Roots Party", place: "Salvador · Bahia", status: "Sobre a festa", href: "/eventos#varanda-roots-party" },
      { type: "Música", title: "Baile de Forró em Vinil", place: "Rio Vermelho", status: "Sobre o baile", href: "/eventos#forro-em-vinil" },
      { type: "Workshop", title: "Workshop com Pía e PC", place: "Brasil e exterior", status: "Sobre os workshops", href: "/eventos#workshops-e-festivais" },
    ],
    allEvents: "Ver eventos",
    courseKicker: "Aprenda o Roots com Pía e PC",
    courseTitle: "Aulas de Roots para estudar online.",
    courseBody:
      "Já dança forró? No curso de Pía e PC, você pode estudar os fundamentos e movimentos do Roots, rever as aulas e praticar no seu ritmo.",
    courseLink: "Conheça o curso",
    duoKicker: "Pía Ovalle e DJ PC",
    duoTitle: "Pía e PC ensinam juntos desde 2020.",
    duoBody:
      "No ano seguinte, fundaram a Varanda Roots em Salvador. Dão aulas, participam de festivais e ministram workshops no Brasil e no exterior. PC também é DJ e pesquisador musical.",
    duoLink: "Conheça Pía e PC",
    visitKicker: "No Rio Vermelho",
    visitTitle: "Trace sua rota até a Varanda.",
    visitNeighborhood: "Rio Vermelho · Salvador",
    visitBody: "Rua Deputado Cunha Bueno, 55 · Rio Vermelho · Salvador, Bahia.",
    visitTravelModeLabel: "Como você vem?",
    visitTravelModes: { walk: "A pé", bike: "Bicicleta", car: "Carro" },
    visitNearby: [
      { icon: "beach", place: "Praia do Buracão", routes: { walk: { time: "9 min", distance: "600 m" }, bike: { time: "4 min", distance: "600 m" }, car: { time: "2 min", distance: "600 m" } } },
      { icon: "community", place: "Vila Caramuru", routes: { walk: { time: "13 min", distance: "950 m" }, bike: { time: "6 min", distance: "1,2 km" }, car: { time: "4 min", distance: "1,2 km" } } },
      { icon: "landmark", place: "Largo de Santana", routes: { walk: { time: "18 min", distance: "1,3 km" }, bike: { time: "5 min", distance: "1,3 km" }, car: { time: "4 min", distance: "1,3 km" } } },
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
        actionLabel: "View the course",
        title: "Study Forró Roots with Pía and PC.",
        text: "Online lessons for people who already dance forró and want to learn more about Roots.",
        href: "/course",
        image: "/images/instagram/optimized/generated/hero/comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/mergulhar-comunidade-editorial.webp",
        imageAlt: "A Varanda Roots class gathered together.",
      },
      {
        kicker: "In-person classes",
        actionLabel: "Explore classes",
        title: "Learn forró in Rio Vermelho.",
        text: "Group and private classes for beginners and experienced dancers.",
        href: "/classes",
        image: "/images/instagram/optimized/generated/hero/aulas-comunidade-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Parties and dances",
        actionLabel: "Explore events",
        title: "Come dancing with us.",
        text: "Get to know Varanda’s social dances and events with Pía and PC.",
        href: "/events",
        image: "/images/instagram/optimized/generated/hero/danca-conexao-editorial.webp",
        mobileImage: "/images/instagram/optimized/generated/cards/evoluir-conexao-editorial.webp",
        imageAlt: "",
      },
      {
        kicker: "Pía and PC",
        actionLabel: "Meet Pía and PC",
        title: "Meet Pía and PC.",
        text: "Forró teachers and founders of Varanda Roots in Salvador, Brazil.",
        href: "/pia-and-pc",
        image: "/images/instagram/optimized/generated/hero/pia-pc-editorial.webp",
        mobileImage: "/images/instagram/optimized/photos/pia-pc-casacos-varanda-roots-DYkNlnOjRZq.webp",
        imageAlt: "",
      },
    ],
    discover: "Find out more",
    manifestKicker: "Classes, social dances and workshops",
    manifest:
      "Learn to dance and meet people through Forró Roots in Salvador.",
    manifestBody:
      "At Varanda, you can learn your first steps, meet other dancers and join our social dances. Pía and PC founded the school in Rio Vermelho in 2021.",
    classesKicker: "In-person classes",
    classesTitle: "From your first steps to Roots classes.",
    classesBody:
      "Group and private classes, from beginners to an in-depth exploration of Forró Roots, in Rio Vermelho.",
    classCards: [
      ["Get started", "Learn the basic steps and practise dancing with a partner."],
      ["Build your skills", "Try new steps and learn to vary them with the music."],
      ["Go deeper", "Study Roots movements and refine the way you dance."],
    ],
    classImages: [
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp",
      "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp",
    ],
    learnMore: "Explore classes",
    agendaKicker: "Social dances and workshops",
    agendaTitle: "See what we get up to.",
    agendaNote: "Explore our events and ask the team about upcoming dates.",
    agendaItems: [
      { type: "Party", title: "Varanda Roots Party", place: "Salvador · Bahia", status: "About the party", href: "/events#varanda-roots-party" },
      { type: "Music", title: "Forró on vinyl", place: "Rio Vermelho", status: "About the dance", href: "/events#forro-em-vinil" },
      { type: "Workshop", title: "Workshop with Pía and PC", place: "Brazil and abroad", status: "About the workshops", href: "/events#workshops-e-festivais" },
    ],
    allEvents: "View events",
    courseKicker: "Learn Roots with Pía and PC",
    courseTitle: "Study Roots online with Pía and PC.",
    courseBody:
      "Already dancing forró? Study Roots foundations and movements with Pía and PC, revisit the lessons and practise at your own pace.",
    courseLink: "Explore the course",
    duoKicker: "Pía Ovalle and DJ PC",
    duoTitle: "Pía and PC have taught together since 2020.",
    duoBody:
      "They founded Varanda Roots in Salvador the following year. They teach classes and workshops and take part in festivals in Brazil and abroad. PC is also a DJ and music researcher.",
    duoLink: "Meet Pía and PC",
    visitKicker: "In Rio Vermelho",
    visitTitle: "Plan your route to Varanda.",
    visitNeighborhood: "Rio Vermelho · Salvador",
    visitBody: "Rua Deputado Cunha Bueno, 55 · Rio Vermelho · Salvador, Bahia, Brazil.",
    visitTravelModeLabel: "Choose travel mode",
    visitTravelModes: { walk: "Walk", bike: "Bicycle", car: "Car" },
    visitNearby: [
      { icon: "beach", place: "Praia do Buracão", routes: { walk: { time: "9 min", distance: "600 m" }, bike: { time: "4 min", distance: "600 m" }, car: { time: "2 min", distance: "600 m" } } },
      { icon: "community", place: "Vila Caramuru", routes: { walk: { time: "13 min", distance: "950 m" }, bike: { time: "6 min", distance: "1.2 km" }, car: { time: "4 min", distance: "1.2 km" } } },
      { icon: "landmark", place: "Largo de Santana", routes: { walk: { time: "18 min", distance: "1.3 km" }, bike: { time: "5 min", distance: "1.3 km" }, car: { time: "4 min", distance: "1.3 km" } } },
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
      title: "Aulas de forró para começar ou aprender mais.",
      intro:
        "Aulas em grupo e particulares para quem está começando e para quem deseja aprofundar o Forró Roots.",
      theme: "blue",
      sections: [
        { title: "Começar", body: "Aprenda os passos básicos e pratique a dança a dois." },
        { title: "Evoluir", body: "Aprenda novos movimentos e trabalhe a técnica e a musicalidade." },
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
        { title: "Varanda Roots Party", body: "Uma festa da Varanda Roots para dançar forró e conhecer outras pessoas da comunidade." },
        { title: "Convites e workshops", body: "Pía e PC participam de festivais, escolas e eventos no Brasil e no exterior." },
      ],
    },
    curso: {
      eyebrow: "Aprenda o Roots com Pía e PC",
      title: "O estudo continua onde você estiver.",
      intro:
        "Aulas online de Forró Roots para quem já conhece o básico do forró.",
      theme: "yellow",
      sections: [
        { title: "Para quem é", body: "Para quem já conhece fundamentos iniciais e deseja aprofundar o Roots." },
        { title: "As aulas", body: "Aulas sobre fundamentos e movimentos do Roots para rever e praticar." },
        { title: "Importante", body: "O curso online não substitui a formação inicial de quem nunca dançou forró." },
      ],
    },
    "pia-e-pc": {
      eyebrow: "Fundadores da Varanda Roots",
      title: "Pía Ovalle e Paulo Cezar, o DJ PC.",
      intro:
        "Professores de forró que ensinam juntos desde 2020 e fundaram a Varanda Roots em 2021.",
      theme: "dark",
      sections: [
        { title: "Uma parceria", body: "Pía e PC começaram a dar aulas juntos em 2020 e fundaram a Varanda Roots em Salvador em 2021." },
        { title: "Pía", body: "Professora de forró e cofundadora da Varanda. Ensina em aulas presenciais, no curso online e em workshops." },
        { title: "PC", body: "Professor, DJ e pesquisador musical, com atuação em festas, festivais e eventos nacionais e internacionais." },
      ],
    },
    contato: {
      eyebrow: "Contato",
      title: "Quer conhecer a Varanda? Fale com a gente.",
      intro:
        "Pergunte sobre aulas, eventos e o curso online ou envie um convite para Pía e PC.",
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
      title: "Forró classes for beginners and experienced dancers.",
      intro:
        "Group and private classes for beginners and dancers who want to explore Forró Roots more deeply.",
      theme: "blue",
      sections: [
        { title: "Begin", body: "Learn the basic steps and practise dancing with a partner." },
        { title: "Evolve", body: "Learn new movements and work on technique and musicality." },
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
        { title: "Varanda Roots Party", body: "A Varanda Roots party where you can dance forró and meet other people from the community." },
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
        { title: "The lessons", body: "Lessons on Roots foundations and movements to revisit and practise." },
        { title: "Please note", body: "The online course does not replace beginner training for someone who has never danced forró." },
      ],
    },
    "pia-and-pc": {
      eyebrow: "Founders of Varanda Roots",
      title: "Pía Ovalle and Paulo Cezar, DJ PC.",
      intro: "Forró teachers who began teaching together in 2020 and founded Varanda Roots in 2021.",
      theme: "dark",
      sections: [
        { title: "A partnership", body: "Pía and PC began teaching together in 2020 and founded Varanda Roots in Salvador in 2021." },
        { title: "Pía", body: "Forró teacher and co-founder of Varanda. She teaches in-person classes, the online course and workshops." },
        { title: "PC", body: "Teacher, DJ and music researcher with experience at parties, festivals and events in Brazil and abroad." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Want to know more about Varanda?",
      intro:
        "Ask about classes, events and the online course, or send an invitation for Pía and PC.",
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
