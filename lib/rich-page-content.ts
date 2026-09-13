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
    title: "Aulas de forró para começar ou aprender mais.",
    intro: "Aprenda a dançar a dois, pratique novos passos e conheça a turma. Temos aulas em grupo e particulares no Rio Vermelho, para iniciantes e para quem já dança.",
    heroImage: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp",
    heroAlt: "Pía e PC orientando uma grande roda de participantes em uma aula de forró.",
    primaryAction: { label: "Quero conhecer as turmas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero conhecer as turmas presenciais. Meu nível de experiência com forró é: "), external: true },
    secondaryAction: { label: "Ver como funciona", href: "#como-funciona" },
    highlights: [
      { title: "Para quem vai começar", body: "Estude os passos básicos, o ritmo e como dançar com outra pessoa." },
      { title: "Para quem já dança", body: "Aprenda novos movimentos e trabalhe a técnica e a musicalidade do Forró Roots." },
      { title: "Aulas particulares", body: "Converse com a equipe sobre o que quer praticar e organize uma aula voltada aos seus objetivos." },
    ],
    story: { eyebrow: "Como funciona", title: "Encontre a turma para o seu nível.", body: "Conte se você nunca dançou forró, está voltando às aulas ou já tem experiência. A equipe explica os níveis, os horários e as opções de aulas em grupo e particulares." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp", alt: "Pessoas dançando forró em uma prática coletiva.", caption: "Prática de forró em grupo" },
      { src: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp", alt: "Pía orientando uma turma durante uma aula de forró.", caption: "Aula de forró com Pía" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp", alt: "Pía e PC explicando um movimento aos participantes.", caption: "Pía e PC explicando um movimento" },
    ],
    closingTitle: "Vamos encontrar uma turma para você.",
    closingBody: "Diga o que já sabe de forró e quais horários funcionam para você. A equipe ajuda a escolher entre as turmas disponíveis.",
    closingAction: { label: "Conversar sobre meu nível", href: whatsapp("Olá! Quero encontrar a turma presencial mais adequada para mim. Hoje eu me considero: "), external: true },
  },
  eventos: {
    kind: "rich",
    theme: "light",
    eyebrow: "Festas, bailes e encontros",
    title: "Bailes de forró e workshops com Pía e PC.",
    intro: "Tem Varanda Roots Party, forró em vinil e workshops. Conheça os formatos, veja fotos e fale com a equipe para saber as próximas datas.",
    heroImage: "/images/instagram/optimized/reels/DN3T2tHWCik/DN3T2tHWCik_20250827.webp",
    heroAlt: "Pía e PC dançando no evento Matrizes diante do público.",
    primaryAction: { label: "Consultar próximas datas", href: whatsapp("Olá! Vim pelo site e quero receber informações sobre os próximos eventos da Varanda Roots."), external: true },
    secondaryAction: { label: "Convidar Pía e PC", href: whatsapp("Olá! Gostaria de conversar sobre um convite para evento, workshop ou DJ set. O evento é: "), external: true },
    highlights: [
      { id: "varanda-roots-party", title: "Varanda Roots Party", body: "Uma festa da Varanda Roots para dançar forró e encontrar outras pessoas da comunidade.", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_9.webp", alt: "Público aplaudindo durante um evento de forró." },
      { id: "forro-em-vinil", title: "Forró em vinil", body: "Forró para dançar ao som dos discos selecionados por DJ PC.", image: "/images/instagram/optimized/reels/pia-pc-dancando-em-evento-Davphbzv178.webp", alt: "Pía e PC dançando em um evento de forró." },
      { id: "workshops-e-festivais", title: "Workshops e festivais", body: "Aulas, apresentações e encontros com Pía e PC em Salvador, no Brasil e no exterior.", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp", alt: "Pía e PC conduzindo uma atividade em roda." },
    ],
    story: { eyebrow: "O que a gente cria", title: "Aulas, apresentações e bailes.", body: "A Varanda organiza festas e participa de eventos de outras escolas e produtores. Pía e PC dão workshops e fazem apresentações; PC também toca como DJ. Para participar, consulte a programação de cada evento." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_1.webp", alt: "Pía e PC dançando juntos no evento Matrizes.", caption: "Pía e PC dançando" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_4.webp", alt: "Pía e PC dançando no centro de uma roda de participantes.", caption: "Dança no centro da roda" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_8.webp", alt: "Pía e PC dançando diante do público.", caption: "Apresentação diante do público" },
    ],
    closingTitle: "Consulte a agenda ou convide Pía e PC.",
    closingBody: "Fale com a equipe para receber a agenda ou apresentar um convite com cidade, data e formato desejado.",
    closingAction: { label: "Falar sobre eventos", href: whatsapp("Olá! Quero conversar sobre eventos da Varanda Roots. Meu interesse é: "), external: true },
  },
  curso: {
    kind: "rich",
    theme: "yellow",
    eyebrow: "Curso online de Forró Roots",
    title: "Aprenda Forró Roots online com Pía e PC.",
    intro: "O curso é para quem já conhece o básico do forró e quer estudar Roots. Você pode rever as aulas e praticar no seu ritmo.",
    heroImage: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_9.webp",
    heroAlt: "Público aplaudindo durante uma atividade presencial de forró.",
    primaryAction: { label: "Conhecer o curso completo", href: "https://go.hotmart.com/L106426800T", external: true },
    secondaryAction: { label: "Tirar uma dúvida", href: whatsapp("Olá! Tenho uma dúvida sobre o curso online de Forró Roots: "), external: true },
    highlights: [
      { title: "Para quem já dança", body: "É preciso ter alguma experiência com forró. Se você nunca dançou, fale com a equipe sobre as aulas para iniciantes." },
      { title: "Aulas para rever", body: "Retome as explicações e demonstrações enquanto pratica os movimentos." },
      { title: "Pía e PC juntos", body: "Aprenda com os professores que fundaram a Varanda Roots e ensinam forró juntos desde 2020." },
    ],
    story: { eyebrow: "O que você vai estudar", title: "Fundamentos e movimentos do Roots.", body: "As aulas trabalham os fundamentos e movimentos do Forró Roots. Consulte o conteúdo completo e as condições de acesso na página do curso." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_3.webp", alt: "Participantes praticando forró durante uma atividade presencial.", caption: "Prática em uma atividade presencial" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_5.webp", alt: "Pía e PC conduzindo uma roda de participantes durante uma aula.", caption: "Aula presencial com Pía e PC" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_4.webp", alt: "Pía e PC dançando diante de uma roda de participantes.", caption: "Pía e PC em uma atividade presencial" },
    ],
    closingTitle: "Quer entender se o curso é para você?",
    closingBody: "Veja a apresentação completa, o conteúdo e as condições na página do curso. Se ainda houver dúvida sobre o nível indicado, fale com a Varanda.",
    closingAction: { label: "Ir para a página do curso", href: "https://go.hotmart.com/L106426800T", external: true },
  },
  "pia-e-pc": {
    kind: "rich",
    theme: "light",
    eyebrow: "Fundadores da Varanda Roots",
    title: "Conheça Pía Ovalle e DJ PC.",
    intro: "Eles ensinam forró juntos desde 2020 e fundaram a Varanda Roots em Salvador em 2021. Hoje, dão aulas e workshops e participam de festivais no Brasil e no exterior.",
    heroImage: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_5.webp",
    heroAlt: "Pía e PC juntos durante uma viagem internacional.",
    primaryAction: { label: "Conheça cada trajetória", href: "#perfis" },
    secondaryAction: { label: "Fazer um convite", href: whatsapp("Olá! Gostaria de conversar sobre um convite profissional para Pía e PC. O projeto é: "), external: true },
    profiles: [
      { name: "Pía Ovalle", role: "Professora e cofundadora", image: "/images/instagram/optimized/profiles/pia-ovalle-retrato.webp", alt: "Pía Ovalle dançando ao ar livre.", description: "Pía é professora de forró e cofundadora da Varanda Roots. Ensina nas aulas presenciais e no curso online, além de ministrar workshops e participar de festivais com PC." },
      { name: "Paulo Cezar — DJ PC", role: "Professor, DJ e pesquisador musical", image: "/images/instagram/optimized/carousels/DNybhLIWhMx/DNybhLIWhMx_20250825_12.webp", alt: "Retrato de DJ PC diante de uma arquitetura branca e céu azul.", description: "Paulo Cezar é professor de forró, DJ e pesquisador musical. Além de ensinar com Pía, seleciona e toca discos em bailes, festas e festivais no Brasil e no exterior." },
    ],
    story: { eyebrow: "Desde 2020", title: "De professores parceiros a fundadores da Varanda.", body: "Pía e PC começaram a dar aulas juntos em 2020. Em 2021, abriram a Varanda Roots em Salvador. A escola reúne aulas presenciais, curso online e festas, enquanto a dupla também leva seus workshops a outras cidades." },
    gallery: [
      { src: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_1.webp", alt: "Pía e PC em frente ao Portão de Brandemburgo.", caption: "Pía e PC no Portão de Brandemburgo" },
      { src: "/images/instagram/optimized/carousels/DNiwAdsIBiD/DNiwAdsIBiD_20250819_4.webp", alt: "Pía e PC diante de um mural em Berlim.", caption: "Em frente a um mural em Berlim" },
      { src: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_8.webp", alt: "Pía e PC dançando diante do público.", caption: "Pía e PC em uma apresentação" },
    ],
    video: { src: "/videos/instagram/DMFtAiWt5NS/optimized/danca-pia-varanda-loop.mp4", poster: "/videos/instagram/DMFtAiWt5NS/optimized/danca-pia-varanda-poster.webp", title: "Veja Pía dançando.", body: "Um trecho de dança de Pía. Para ver mais vídeos e acompanhar as aulas e os eventos, visite @varanda.roots no Instagram." },
    closingTitle: "Leve Pía e PC ao seu evento.",
    closingBody: "Pía e PC recebem convites para workshops, festivais, aulas, apresentações e DJ sets no Brasil e no exterior.",
    closingAction: { label: "Convidar Pía e PC", href: whatsapp("Olá! Gostaria de convidar Pía e PC para um trabalho. Cidade, data e formato: "), external: true },
  },
  contato: {
    kind: "rich",
    theme: "yellow",
    eyebrow: "Fale com a Varanda",
    title: "Quer conhecer a Varanda? Fale com a gente.",
    intro: "Pergunte sobre aulas, próximas festas ou o curso online. Para convidar Pía e PC para um evento, conte onde e quando ele vai acontecer.",
    primaryAction: { label: "Falar sobre aulas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero informações sobre aulas presenciais. Meu nível é: "), external: true },
    contactOptions: [
      { title: "Aulas e escola", body: "Informações sobre turmas, níveis, horários e aulas particulares.", note: "Conte se já dança forró e quais dias e horários procura.", action: { label: "Perguntar sobre aulas", href: whatsapp("Olá! Vim pelo site da Varanda Roots e quero informações sobre aulas presenciais. Meu nível de experiência com forró é: "), external: true } },
      { title: "Eventos e workshops", body: "Convites para festivais, workshops, apresentações e DJ sets.", note: "Inclua cidade, data prevista e formato do evento.", action: { label: "Apresentar um convite", href: whatsapp("Olá! Gostaria de conversar sobre um evento ou workshop com a Varanda Roots. Cidade, data e formato: "), external: true } },
      { title: "Curso online", body: "Dúvidas sobre indicação, conteúdo e acesso ao curso de Roots.", note: "Informe se quer conhecer o curso ou se precisa de ajuda com o acesso.", action: { label: "Tirar dúvida do curso", href: whatsapp("Olá! Tenho uma dúvida sobre o curso online de Forró Roots: "), external: true } },
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
    title: "Forró classes for beginners and experienced dancers.",
    intro: "Learn to dance with a partner, try new steps and meet other dancers. We offer group and private classes in Rio Vermelho, Salvador.",
    heroAlt: "Pía and PC guiding a large circle of dancers during a forró class.",
    primaryAction: { label: "Ask about classes", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My forró experience is: "), external: true },
    secondaryAction: { label: "How classes work", href: "#como-funciona" },
    highlights: [
      { title: "New to forró", body: "Learn the basic steps, follow the rhythm and practise dancing with a partner." },
      { title: "Already dancing", body: "Learn new movements and work on Forró Roots technique and musicality." },
      { title: "Private classes", body: "Tell the team what you want to practise and arrange a lesson around your goals." },
    ],
    story: { eyebrow: "How it works", title: "Find a class for your level.", body: "Tell us whether you are new to forró, returning to classes or already an experienced dancer. The team can explain the levels, schedules and options for group and private lessons." },
    gallery: pt.aulas.gallery?.map((item, index) => ({ ...item, alt: ["People practising forró together.", "Pía teaching a forró class.", "Pía and PC explaining a movement to participants."][index], caption: ["Group forró practice", "A forró class with Pía", "Pía and PC explaining a movement"][index] })),
    closingTitle: "Let’s find a class for you.",
    closingBody: "Tell us about your forró experience and when you can attend. The team will help you choose from the available classes.",
    closingAction: { label: "Talk about my level", href: whatsapp("Hello! I would like to find the right in-person group for me. At the moment, I consider myself: "), external: true },
  },
  events: {
    ...pt.eventos,
    eyebrow: "Parties, dances and gatherings",
    title: "Forró social dances and workshops with Pía and PC.",
    intro: "Explore Varanda Roots Party, forró on vinyl and workshops. Browse the photos and ask the team about upcoming dates.",
    heroAlt: "Pía and PC dancing at Matrizes in front of the audience.",
    primaryAction: { label: "Ask about upcoming dates", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about upcoming events."), external: true },
    secondaryAction: { label: "Invite Pía and PC", href: whatsapp("Hello! I would like to discuss an invitation for an event, workshop or DJ set. The event is: "), external: true },
    highlights: [
      { ...pt.eventos.highlights![0], title: "Varanda Roots Party", body: "A Varanda Roots party where you can dance forró and meet other people from the community.", alt: "An audience applauding at a forró event." },
      { ...pt.eventos.highlights![1], title: "Forró on vinyl", body: "Dance forró to records selected and played by DJ PC.", alt: "Pía and PC dancing at a forró event." },
      { ...pt.eventos.highlights![2], title: "Workshops and festivals", body: "Classes, performances and gatherings with Pía and PC in Salvador, Brazil and abroad.", alt: "Pía and PC leading an activity in a circle." },
    ],
    story: { eyebrow: "What we create", title: "Classes, performances and social dancing.", body: "Varanda hosts parties and takes part in events run by other schools and organisers. Pía and PC teach workshops and perform; PC also plays DJ sets. Check each event’s programme before attending." },
    gallery: pt.eventos.gallery?.map((item, index) => ({ ...item, alt: ["Pía and PC dancing together at Matrizes.", "Pía and PC dancing in the centre of a circle of participants.", "Pía and PC dancing in front of an audience."][index], caption: ["Pía and PC dancing", "Dancing in the centre of the circle", "Performing for an audience"][index] })),
    closingTitle: "Check the dates or invite Pía and PC.",
    closingBody: "Contact the team for the schedule or send an invitation with the city, date and intended format.",
    closingAction: { label: "Talk about events", href: whatsapp("Hello! I would like to talk about Varanda Roots events. I am interested in: "), external: true },
  },
  course: {
    ...pt.curso,
    eyebrow: "Online Forró Roots course",
    title: "Learn Forró Roots online with Pía and PC.",
    intro: "This course is for people who know basic forró and want to study Roots. Revisit the lessons and practise at your own pace.",
    heroAlt: "An audience applauding at an in-person forró activity.",
    primaryAction: { label: "Explore the full course", href: "https://go.hotmart.com/L106426800T", external: true },
    secondaryAction: { label: "Ask a question", href: whatsapp("Hello! I have a question about the online Forró Roots course: "), external: true },
    highlights: [
      { title: "For people who already dance", body: "You need some forró experience. If you have never danced before, ask the team about beginner classes." },
      { title: "Lessons to revisit", body: "Return to the explanations and demonstrations as you practise the movements." },
      { title: "Pía and PC together", body: "Learn from the founders of Varanda Roots, who have taught forró together since 2020." },
    ],
    story: { eyebrow: "What you will study", title: "Roots foundations and movements.", body: "The lessons cover Forró Roots foundations and movements. See the course page for the full syllabus and access terms." },
    gallery: pt.curso.gallery?.map((item, index) => ({ ...item, alt: ["Participants practising forró together.", "Pía and PC guiding a circle of participants during a class.", "Pía and PC dancing in the centre of a circle."][index], caption: ["Practice at an in-person activity", "An in-person class with Pía and PC", "Pía and PC at an in-person activity"][index] })),
    closingTitle: "Want to know whether the course is right for you?",
    closingBody: "See the complete presentation, syllabus and terms on the course page. If you still have a question about the level, contact Varanda.",
    closingAction: { label: "Open the course page", href: "https://go.hotmart.com/L106426800T", external: true },
  },
  "pia-and-pc": {
    ...pt["pia-e-pc"],
    eyebrow: "Founders of Varanda Roots",
    title: "Meet Pía Ovalle and DJ PC.",
    intro: "They began teaching forró together in 2020 and founded Varanda Roots in Salvador in 2021. They teach classes and workshops and take part in festivals in Brazil and abroad.",
    heroAlt: "Pía and PC together during an international trip.",
    primaryAction: { label: "Meet each founder", href: "#perfis" },
    secondaryAction: { label: "Send an invitation", href: whatsapp("Hello! I would like to discuss a professional invitation for Pía and PC. The project is: "), external: true },
    profiles: [
      { ...pt["pia-e-pc"].profiles![0], role: "Teacher and co-founder", alt: "Pía Ovalle dancing outdoors.", description: "Pía is a forró teacher and co-founder of Varanda Roots. She teaches in-person classes and the online course, and leads workshops and takes part in festivals with PC." },
      { ...pt["pia-e-pc"].profiles![1], role: "Teacher, DJ and music researcher", alt: "Portrait of DJ PC against white architecture and blue sky.", description: "Paulo Cezar is a forró teacher, DJ and music researcher. Alongside teaching with Pía, he selects and plays records at social dances, parties and festivals in Brazil and abroad." },
    ],
    story: { eyebrow: "Since 2020", title: "From teaching partners to Varanda’s founders.", body: "Pía and PC began teaching together in 2020. In 2021, they opened Varanda Roots in Salvador. The school offers in-person classes, an online course and parties, while the duo also teaches workshops in other cities." },
    gallery: pt["pia-e-pc"].gallery?.map((item, index) => ({ ...item, alt: ["Pía and PC in front of the Brandenburg Gate.", "Pía and PC in front of a mural in Berlin.", "Pía and PC dancing in front of an audience."][index], caption: ["Pía and PC at the Brandenburg Gate", "In front of a mural in Berlin", "Pía and PC performing"][index] })),
    video: { ...pt["pia-e-pc"].video!, title: "Watch Pía dance.", body: "A short clip of Pía dancing. For more videos, classes and events, follow @varanda.roots on Instagram." },
    closingTitle: "Invite Pía and PC to your event.",
    closingBody: "Pía and PC welcome invitations for workshops, festivals, classes, performances and DJ sets in Brazil and abroad.",
    closingAction: { label: "Invite Pía and PC", href: whatsapp("Hello! I would like to invite Pía and PC for a project. City, date and format: "), external: true },
  },
  contact: {
    ...pt.contato,
    eyebrow: "Contact Varanda",
    title: "Want to know more about Varanda?",
    intro: "Ask about classes, upcoming parties or the online course. To invite Pía and PC to an event, tell us where and when it will take place.",
    primaryAction: { label: "Ask about classes", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My level is: "), external: true },
    contactOptions: [
      { title: "Classes and school", body: "Class levels, schedules and private lessons.", note: "Tell us about your forró experience and when you would like to attend.", action: { label: "Ask about classes", href: whatsapp("Hello! I found Varanda Roots through the website and would like information about in-person classes. My forró experience is: "), external: true } },
      { title: "Events and workshops", body: "Invitations for festivals, workshops, performances and DJ sets.", note: "Include the city, expected date and event format.", action: { label: "Send an invitation", href: whatsapp("Hello! I would like to discuss an event or workshop with Varanda Roots. City, date and format: "), external: true } },
      { title: "Online course", body: "Questions about the recommended level, content and course access.", note: "Let us know whether you are considering the course or need help accessing it.", action: { label: "Ask about the course", href: whatsapp("Hello! I have a question about the online Forró Roots course: "), external: true } },
      { title: "Instagram", body: "Follow recent classes, events and stories from the community.", note: "The official profile is @varanda.roots.", action: { label: "Open Instagram", href: "https://www.instagram.com/varanda.roots/", external: true } },
    ],
    closingTitle: "Talk directly to Varanda.",
    closingBody: "The same number receives calls and WhatsApp messages. The school is at Rua Deputado Cunha Bueno, 55, Rio Vermelho, Salvador.",
    closingAction: { label: "WhatsApp", href: whatsapp("Hello! I found Varanda Roots through the website and would like to talk to the team."), external: true },
  },
} satisfies Record<string, RichInternalPage>;

export const richInternalPages: Record<Locale, Record<string, RichInternalPage>> = { pt, en };
