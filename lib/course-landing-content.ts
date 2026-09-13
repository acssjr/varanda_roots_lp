export const COURSE_CHECKOUT_URL = "https://go.hotmart.com/L106426800T";
export const VARANDA_WHATSAPP_NUMBER = "5571936189895";
export const COURSE_PRICING = {
  installment: "12x de R$ 46,54*",
  cash: "R$ 450,00 à vista",
  note: "*Parcelamento com acréscimo no cartão, conforme as condições da Hotmart.",
} as const;

export function courseWhatsappUrl(message: string) {
  return `https://wa.me/${VARANDA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const courseLandingContent = {
  hero: {
    eyebrow: "Curso online para quem já dança forró",
    title: "Aprenda Forró Roots com Pía e PC.",
    body: "Pía e PC mostram os fundamentos do estilo para você estudar no seu ritmo e experimentar no baile.",
    image: "/images/instagram/optimized/reels/pia-pc-retrato-ao-ar-livre-CyvrSRQIONU.webp",
    imageAlt: "Pía e PC juntos durante um encontro de forró ao ar livre.",
  },
  facts: ["27 aulas", "4 módulos", "2 bônus", "Acesso por tempo indeterminado"],
  modules: [
    {
      number: "01",
      title: "Introdução",
      subtitle: "O ponto de partida",
      body: "Você conhece a organização do curso e recebe orientações simples para aproveitar melhor as aulas e a prática.",
    },
    {
      number: "02",
      title: "Desconstrução",
      subtitle: "Perceber antes de mudar",
      body: "Pía e PC ajudam você a observar hábitos que já aparecem na sua dança e a experimentar outras formas de organizar o corpo no Roots.",
    },
    {
      number: "03",
      title: "Reprogramação",
      subtitle: "Vocabulário e fundamentos",
      body: "Você aprende os principais movimentos e algumas variações, junto com as estruturas e referências corporais que dão identidade ao estilo.",
    },
    {
      number: "04",
      title: "Como se sentir confortável no baile",
      subtitle: "Da aula para a pista",
      body: "Um módulo sobre a experiência real do baile: convite, parceria, adaptação e prática com pessoas diferentes.",
    },
  ],
  bonuses: [
    {
      title: "Aula do abraço",
      body: "Uma aula dedicada ao abraço como ferramenta de comunicação, conforto e clareza na dança a dois.",
    },
    {
      title: "Playlists Aprenda o Roots",
      body: "Três seleções feitas por DJ PC: uma para treinar, outra para ouvir em clima de baile e uma terceira para ampliar suas referências musicais.",
    },
  ],
  testimonials: [
    {
      name: "Cravo",
      image: "/images/course/testimonials/cravo.webp",
      quote: "Queria aprender, mas não sabia exatamente por onde começar.",
      body: "Danço forró há alguns anos e sempre tive curiosidade sobre o Roots. Antes do curso, eu até admirava o estilo, mas não me sentia seguro para dançar. Quando chegava em ambientes mais Roots, eu gostava de assistir, mas ficava receoso de dançar porque sentia que não dominava a linguagem do estilo.",
    },
    {
      name: "Kally",
      image: "/images/course/testimonials/kally.webp",
      quote: "Cheguei a evitar festas porque sentia vergonha de não saber dançar o estilo.",
      body: "Quando comecei a me interessar pelo Roots, achava que era um bicho de sete cabeças. Quando comecei a frequentar bailes Roots, veio o choque de realidade. Via as pessoas dançando e pensava que nunca conseguiria aprender.",
    },
    {
      name: "Cissa",
      image: "/images/course/testimonials/cissa.webp",
      quote: "Hoje eu consigo fazer coisas que nunca imaginei que conseguiria fazer.",
      body: "Eu não conhecia o Roots e nem sabia que existia. Meu primeiro contato foi em uma aula de Pía e PC durante uma festa, e eu me apaixonei. O que mais me chamou atenção foi a forma como eles ensinavam.",
    },
    {
      name: "Marcos",
      image: "/images/course/testimonials/marcos.webp",
      quote: "Eu não gostava do Roots.",
      body: "Via vídeos no Instagram e acreditava que o Roots se resumia a arrastadas e pescadas. Sempre estranhei isso. Entrar nas aulas com Pía e PC foi um processo de expandir a minha dança.",
    },
    {
      name: "Faby",
      image: "/images/course/testimonials/faby.webp",
      quote: "Eu admirava o Roots, mas me sentia insegura.",
      body: "Chegava aos bailes e festivais do estilo me sentindo intimidada. Queria muito aprender, mas não me expunha muito para dançar. Foi com Pía e PC que consegui desenvolver minha dança. As aulas são descontraídas e de fácil compreensão.",
    },
    {
      name: "Fersan",
      image: "/images/course/testimonials/fersan.webp",
      quote: "Ahhhh... então era isso! Esse era o detalhe.",
      body: "Eu já dançava forró há muitos anos, mas evitava dançar com pessoas que dançavam Roots. As explicações, a metodologia e as dinâmicas das aulas fizeram muita diferença para mim. Várias vezes aconteceu aquele momento de estalo.",
    },
  ],
  faq: [
    {
      question: "Preciso saber dançar forró para fazer o curso?",
      answer: "Sim. O curso começa a partir de uma base que você já tem no forró. Se você nunca dançou, o melhor caminho é começar por aulas de iniciação antes de entrar no Roots.",
    },
    {
      question: "Dá para acompanhar se comecei a dançar há pouco tempo?",
      answer: "Dá, desde que você já esteja minimamente confortável com o ritmo e com a dinâmica da dança a dois. O tempo de prática, sozinho, não define se o curso é para você.",
    },
    {
      question: "Preciso de parceria fixa para praticar?",
      answer: "Não. Muitas propostas podem ser estudadas individualmente. Como o Roots é uma dança a dois, praticar com pessoas diferentes no baile continua sendo uma parte importante do aprendizado.",
    },
    {
      question: "As aulas ficam disponíveis por quanto tempo?",
      answer: "O acesso é por tempo indeterminado. Você pode rever as aulas e retomar a prática quando precisar.",
    },
    {
      question: "Quando recebo o conteúdo?",
      answer: "Os módulos 1 e 2 e as primeiras aulas do módulo 3 são liberados assim que a compra é confirmada. O restante do curso e os bônus ficam disponíveis depois de 7 dias.",
    },
    {
      question: "O curso tem legendas?",
      answer: "Sim. As aulas têm legendas em português, inglês e espanhol.",
    },
    {
      question: "E se eu comprar e perceber que não é para mim?",
      answer: "Você tem 7 dias de garantia incondicional para conhecer o curso e solicitar o reembolso pela plataforma, se decidir não continuar.",
    },
  ],
} as const;

export const courseQuestionUrl = courseWhatsappUrl(
  "Olá! Vim pela página do curso Aprenda o Roots e tenho uma dúvida: ",
);

export const courseStickyQuestionUrl = courseWhatsappUrl(
  "Olá! Estou vendo o conteúdo do curso Aprenda o Roots e quero confirmar uma informação antes de comprar: ",
);

export type CourseStickyCtaState = {
  heroVisible: boolean;
  offerVisible: boolean;
  finalVisible: boolean;
  footerVisible: boolean;
};

export function shouldShowCourseStickyCta(state: CourseStickyCtaState) {
  return !state.heroVisible && !state.offerVisible && !state.finalVisible && !state.footerVisible;
}
