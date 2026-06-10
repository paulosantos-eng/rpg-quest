// ============================================================
// RPG PERSONALITY QUEST — DATABASE
// Banco de dados completo: classes, raças, subclasses,
// perguntas, MBTI, Big Five, helpers
// ============================================================

// ── BIG FIVE COLORS & LABELS ────────────────────────────────
export const BF_COLORS = { O: '#9b59b6', C: '#3498db', E: '#e74c3c', A: '#2ecc71', N: '#f39c12' };
export const BF_LABELS = { O: 'Abertura', C: 'Conscienciosidade', E: 'Extroversão', A: 'Amabilidade', N: 'Neuroticismo' };
export const DIMS = ['O', 'C', 'E', 'A', 'N'];
export const COG_DIMS = ['QI', 'Proj', 'Foco', 'Imp', 'IE'];

// ── MBTI DIMENSION INFO ─────────────────────────────────────
export const MBTI_INFO = {
  E: { l: 'E', c: '#d4af37', w: 'Extroversão', d: 'Ganha energia das interações. Age primeiro, reflete depois.' },
  I: { l: 'I', c: '#6aaddb', w: 'Introversão', d: 'Ganha energia da solidão. Processa antes de agir.' },
  S: { l: 'S', c: '#d4af37', w: 'Sensação', d: 'Foca em fatos concretos e experiência direta.' },
  N: { l: 'N', c: '#6aaddb', w: 'Intuição', d: 'Foca em padrões, possibilidades e o panorama geral.' },
  T: { l: 'T', c: '#d4af37', w: 'Pensamento', d: 'Decide pela lógica e objetividade.' },
  F: { l: 'F', c: '#6aaddb', w: 'Sentimento', d: 'Decide pelos valores e pelo impacto humano.' },
  J: { l: 'J', c: '#d4af37', w: 'Julgamento', d: 'Ama estrutura, planejamento e decisões fechadas.' },
  P: { l: 'P', c: '#6aaddb', w: 'Percepção', d: 'Prefere flexibilidade e espontaneidade.' }
};

// ── MBTI 16 TYPES ───────────────────────────────────────────
export const MBTI_TYPES = {
  ana: [
    { t: 'INTJ', n: 'O Arquiteto', d: 'Estratégico e visionário. Independente, inovador e sempre com um plano de longo prazo.', c: '#7d3c98' },
    { t: 'INTP', n: 'O Lógico', d: 'Inventor criativo com sede insaciável por conhecimento. Adora dissecar sistemas.', c: '#8e44ad' },
    { t: 'ENTJ', n: 'O Comandante', d: 'Líder nato com vontade de ferro. Focado em eficiência.', c: '#6c3483' },
    { t: 'ENTP', n: 'O Inovador', d: 'Debatedor esperto que não resiste a um desafio intelectual.', c: '#9b59b6' }
  ],
  dip: [
    { t: 'INFJ', n: 'O Advogado', d: 'Idealista quieto mas profundamente inspirador. Senso de propósito como bússola.', c: '#1a5276' },
    { t: 'INFP', n: 'O Mediador', d: 'Guiado por valores interiores. Mundo interno rico e imaginativo.', c: '#154360' },
    { t: 'ENFJ', n: 'O Protagonista', d: 'Líder carismático com habilidade natural para entender e guiar pessoas.', c: '#1f618d' },
    { t: 'ENFP', n: 'O Ativista', d: 'Espírito livre entusiasmado. Vê a vida como um grande quebra-cabeça de possibilidades.', c: '#2471a3' }
  ],
  sen: [
    { t: 'ISTJ', n: 'O Logístico', d: 'Pilar de confiabilidade. Prático, honesto e orientado ao dever.', c: '#145a32' },
    { t: 'ISFJ', n: 'O Defensor', d: 'Protetor caloroso com memória excepcional para o que importa.', c: '#1e8449' },
    { t: 'ESTJ', n: 'O Executivo', d: 'Administrador nato que traz ordem ao caos.', c: '#117a65' },
    { t: 'ESFJ', n: 'O Cônsul', d: 'Carinhoso e popular. Garante que todos se sintam incluídos.', c: '#0e6655' }
  ],
  exp: [
    { t: 'ISTP', n: 'O Virtuoso', d: 'Experimentador prático e calmo sob pressão. Desmonta sistemas para entender.', c: '#7d6608' },
    { t: 'ISFP', n: 'O Aventureiro', d: 'Artista flexível com profundo apreço pela estética.', c: '#9a7d0a' },
    { t: 'ESTP', n: 'O Empreendedor', d: 'Enérgico, perceptivo e orientado para ação.', c: '#b7950b' },
    { t: 'ESFP', n: 'O Animador', d: 'Espontâneo, entusiasmado e irresistível.', c: '#d4ac0d' }
  ]
};

// ── BIG FIVE EDUCATIONAL DATA ───────────────────────────────
export const BF_EDU = [
  { k: 'O', n: 'Abertura', l: 'Openness to Experience', c: '#9b59b6',
    d: 'Profundidade da vida mental e disposição para novas ideias, estéticas e experiências.',
    hi: 'Criativo, curioso, imaginativo — adora arte, filosofia e o desconhecido.',
    lo: 'Pragmático, tradicional — prefere o comprovado e o concreto.' },
  { k: 'C', n: 'Conscienciosidade', l: 'Conscientiousness', c: '#3498db',
    d: 'Capacidade de autorregulação, planejamento e orientação a objetivos. Maior preditor de sucesso profissional.',
    hi: 'Disciplinado, organizado, confiável — cumpre metas mesmo sem supervisão.',
    lo: 'Espontâneo, flexível — lida bem com improviso, mas pode procrastinar.' },
  { k: 'E', n: 'Extroversão', l: 'Extraversion', c: '#e74c3c',
    d: 'Busca de estimulação no mundo exterior. Não é sobre timidez — é sobre de onde você extrai energia.',
    hi: 'Sociável, assertivo, energizado por pessoas e interação.',
    lo: 'Reservado, reflexivo — recarrega na solidão e em espaços tranquilos.' },
  { k: 'A', n: 'Amabilidade', l: 'Agreeableness', c: '#2ecc71',
    d: 'Orientação cooperativa nas relações. Mede empatia, confiança e generosidade.',
    hi: 'Cooperativo, empático, genuinamente interessado no bem-estar alheio.',
    lo: 'Competitivo, cético, direto — prioriza resultados sobre harmonia.' },
  { k: 'N', n: 'Neuroticismo', l: 'Neuroticism', c: '#f39c12',
    d: 'Tendência a experienciar emoções negativas e reatividade ao estresse. Baixo N = estabilidade emocional.',
    hi: 'Sensível, reativo, emocionalmente intenso sob pressão.',
    lo: 'Calmo, resiliente, estável — mantém equilíbrio em situações extremas.' }
];

// ── CORE DESCRIPTIONS (primary class text) ──────────────────
export const CORE = {
  guerreiro: 'direto, protetor e movido pela ação imediata',
  mago: 'analítico, curioso e solitário por escolha própria',
  ladino: 'adaptável, perspicaz e orientado ao risco calculado',
  clerigo: 'empático, dedicado e focado no cuidado genuíno dos outros',
  bardo: 'criativo, intensamente social e energizado pela expressão',
  paladino: 'inspirador, comprometido e inabalável em seus valores',
  cacador: 'preciso, autossuficiente e incrivelmente calmo sob pressão',
  necromante: 'estratégico, implacável e focado no controle e maestria total',
  samurai: 'disciplinado, metódico e absolutamente leal ao seu código interno',
  ninja: 'intuitivo, introspectivo e movido por uma missão que transcende o óbvio',
  monge: 'contemplativo, idealista e intensamente conectado ao seu mundo interior'
};

// ── INFLUENCE DESCRIPTIONS (secondary class text) ───────────
export const INFLUENCE = {
  guerreiro: 'sua determinação protetora emerge com força quando as pessoas que ama precisam de você',
  mago: 'sua mente analítica funciona sempre em segundo plano, questionando e buscando compreender',
  ladino: 'você surpreende pela capacidade de improvisar e se adaptar quando tudo vai por água abaixo',
  clerigo: 'há um cuidado genuíno pelos outros que nem sempre aparece na superfície, mas nunca some',
  bardo: 'uma energia criativa e comunicativa floresce em você nos momentos em que se sente livre',
  paladino: 'princípios profundos definem as linhas que você nunca cruza, mesmo sob pressão extrema',
  cacador: 'você tem uma capacidade notável de operar sozinho e em silêncio quando a situação exige',
  necromante: 'um lado frio e calculista emerge em situações de alta pressão ou quando seu grupo é ameaçado',
  samurai: 'uma disciplina e consistência silenciosas sustentam tudo que você faz, mesmo que ninguém veja',
  ninja: 'uma intuição profunda e um senso de missão guiam você além do que é visível ou óbvio',
  monge: 'uma vida interior rica e um idealismo constante fazem você buscar significado em cada experiência'
};

// ── INCOMPATIBILITY MATRIX ──────────────────────────────────
export const INCOMPAT = {
  paladino: ['ladino', 'necromante'],
  ladino: ['paladino', 'clerigo', 'samurai'],
  necromante: ['clerigo', 'paladino'],
  samurai: ['bardo', 'ladino'],
  bardo: ['samurai', 'necromante'],
  clerigo: ['necromante'],
  guerreiro: ['monge'],
  monge: ['guerreiro']
};

// ── 11 CLASSES ──────────────────────────────────────────────
export const CLASSES = {
  guerreiro: {
    name: 'Guerreiro', emoji: '⚔️', color: '#c0392b', mbti: 'ESTJ',
    compat: ['ESTJ', 'ISTJ', 'ENTJ'], tagline: 'A Muralha que Não Cede',
    desc: 'Você não pensa em proteção — você a encarna. Disciplinado como aço temperado, age antes de hesitar e lidera pela presença, não pelo discurso.',
    bf: { O: 15, C: 90, E: 90, A: 25, N: 15 },
    traits: ['Determinado', 'Protetor', 'Disciplinado', 'Assertivo', 'Confiável'],
    subclasses: [
      { name: 'Mercenário', trait: 'A', dir: 'low', th: 25, tagline: 'Sem Causa, Sem Limites',
        desc: 'Luta por recompensa, não por bandeira. Sua lealdade é ao melhor contrato.',
        diagnostico: 'Baixa amabilidade combinada com alta conscienciosidade gera um operador eficiente mas emocionalmente desconectado das causas alheias.' },
      { name: 'Guardião', trait: 'A', dir: 'high', th: 65, tagline: 'Escudo dos Vulneráveis',
        desc: 'Protege quem não pode se proteger. Seu poder existe para servir.',
        diagnostico: 'A combinação de disciplina e empatia gera um protetor genuíno — raro e valioso, mas propenso a exaustão por carregar demais.' },
      { name: 'Berserker', trait: 'N', dir: 'high', th: 65, tagline: 'Fúria como Combustível',
        desc: 'Transforma raiva em poder bruto. Eficiente, mas instável.',
        diagnostico: 'Alto neuroticismo canalizado em ação — funcional sob pressão, mas o sistema nervoso cobra o preço depois.' }
    ],
    doss: {
      weapon: 'Liderança por presença — você não precisa pedir autoridade, ela simplesmente se forma ao seu redor. Sob pressão extrema, sua velocidade de decisão supera qualquer análise paralela.',
      heel: 'Sob ameaça, pode se tornar controlador e incapaz de ouvir. A urgência de agir atropela nuances críticas — o que parece proteção pode ser dominância disfarçada.',
      party: 'Você protege com intensidade, mas pode sufocar quem precisa de espaço para crescer. Busque Clérigos e Magos para cobrir pontos cegos emocionais e analíticos.',
      quest: 'Pratique "pausa estratégica": antes de agir, force 60 segundos de silêncio reflexivo. Seu maior salto de nível vem de liderar com inteligência emocional.',
      guild: { name: 'Guilda dos Estrategistas', icon: '⚔️', sub: 'Realista · Empreendedor', careers: ['Liderança Executiva', 'Gestão de Crises', 'Forças Especiais', 'Coaching', 'Empreendedorismo'] },
      diagnostico_clinico: 'Sistema nervoso calibrado para ação imediata. Cortisol baixo em situações de perigo real — seu cérebro foi feito para crises. Em tempos de paz, essa mesma configuração gera inquietude e necessidade de controle sobre o ambiente.',
      a_sombra: 'O Guerreiro imaturo é o Tirano Doméstico: controla tudo e todos "pelo bem deles", mas na verdade está gerenciando a própria ansiedade de não ter controle. Confunde obediência com respeito.',
      curiosidade_psicologica: 'Estudos de cortisol mostram que pessoas com seu perfil têm resposta de estresse invertida: ficam mais calmas em emergências reais do que durante o trânsito.',
      par_romantico: 'Atrai fatalmente Clérigos e Bardos — quem cuida e quem encanta. É destruído por outro Guerreiro: dois líderes disputando controle criam um campo de batalha, não um relacionamento.',
      probabilidade_erro: 'Se este resultado parece errado, talvez você tenha respondido como o protetor que aspira ser, não como a pessoa que realmente age sob pressão.'
    },
    chars: [
      { n: 'Mikasa Ackerman', s: 'Attack on Titan', e: '⚔️' },
      { n: 'Rock Lee', s: 'Naruto', e: '🥋' },
      { n: 'Reiner Braun', s: 'Attack on Titan', e: '🛡️' },
      { n: 'Zoro Roronoa', s: 'One Piece', e: '🗡️' },
      { n: 'Captain America', s: 'Marvel', e: '🛡️' },
      { n: 'Wonder Woman', s: 'DC Comics', e: '👑' },
      { n: 'Vegeta', s: 'Dragon Ball Z', e: '🔥' },
      { n: 'Guts', s: 'Berserk', e: '🗡️' },
      { n: 'Erwin Smith', s: 'Attack on Titan', e: '🏇' },
      { n: 'Monica Geller', s: 'Friends', e: '🍳' },
      { n: 'Brienne of Tarth', s: 'Game of Thrones', e: '⚔️' },
      { n: 'Thor', s: 'Marvel', e: '⚡' },
      { n: 'Katsuki Bakugo', s: 'My Hero Academia', e: '💥' },
      { n: 'Sanemi Shinazugawa', s: 'Demon Slayer', e: '🌪️' },
      { n: 'Todo Aoi', s: 'Jujutsu Kaisen', e: '👏' },
      { n: 'Kratos', s: 'God of War', e: '⚔️' },
      { n: 'Aragorn', s: 'Senhor dos Anéis', e: '🗡️' },
      { n: 'Joel Miller', s: 'The Last of Us', e: '🔫' },
      { n: 'Mike Tyson', s: 'Vida Real', e: '🥊' },
      { n: 'Serena Williams', s: 'Vida Real', e: '🎾' },
      { n: 'Leonidas', s: 'Vida Real / 300', e: '🛡️' },
      { n: 'Tommy Shelby', s: 'Peaky Blinders', e: '🎩' }
    ]
  },

  mago: {
    name: 'Mago', emoji: '🔮', color: '#8e44ad', mbti: 'INTP',
    compat: ['INTP', 'ENTP', 'INTJ'], tagline: 'O Arquiteto do Impossível',
    desc: 'A mente é a única arena que importa. Processa realidades em camadas que outros nunca alcançam, encontrando a solução elegante onde todos veem caos.',
    bf: { O: 98, C: 30, E: 8, A: 28, N: 42 },
    traits: ['Analítico', 'Curioso', 'Independente', 'Inventivo', 'Cético'],
    subclasses: [
      { name: 'Archon', trait: 'C', dir: 'high', th: 70, tagline: 'Sistemas Perfeitos',
        desc: 'Mago metódico que constrói frameworks impecáveis. Genialidade com disciplina.',
        diagnostico: 'Raro perfil de alta abertura com alta conscienciosidade — produz genialidade estruturada, mas pode ser inflexível com métodos alheios.' },
      { name: 'Conjurador Caótico', trait: 'C', dir: 'low', th: 25, tagline: 'Intuição sobre Método',
        desc: 'Genialidade errática. Resolve problemas impossíveis e esquece onde deixou as chaves.',
        diagnostico: 'Abertura máxima sem freio da conscienciosidade — flashes de insight brilhante intercalados com paralisia organizacional.' },
      { name: 'Vidente', trait: 'N', dir: 'high', th: 72, tagline: 'A Ansiedade como Radar',
        desc: 'Usa a sensibilidade emocional como antena para padrões invisíveis.',
        diagnostico: 'Alto neuroticismo em mente analítica gera hipervigilância intelectual — detecta ameaças antes de todos, mas também fantasmas que não existem.' }
    ],
    doss: {
      weapon: 'Análise sistêmica em múltiplos níveis — enquanto outros resolvem sintomas, você encontra a causa raiz. Sua paciência com complexidade é uma vantagem competitiva rara.',
      heel: 'Paralisia por análise: o perfeccionismo intelectual pode fazer você nunca lançar o projeto. "Bom o suficiente para validar" não existe no seu vocabulário.',
      party: 'Você inspira admiração mas raramente proximidade. Busque Bardos para traduzir suas ideias e Clérigos para lembrá-lo que pessoas não são variáveis.',
      quest: 'Lance algo imperfeito nos próximos 30 dias. A versão 0.5 do mundo real gera mais aprendizado do que a versão 1.0 da sua mente.',
      guild: { name: 'Guilda dos Pensadores', icon: '🔮', sub: 'Investigativo · Artístico', careers: ['Pesquisa Científica', 'Engenharia de Software', 'Análise de Dados', 'Arquitetura de Sistemas', 'Medicina'] },
      diagnostico_clinico: 'Córtex pré-frontal hiperativo com conectividade atípica entre regiões analíticas. Processa informação em paralelo, não em série — daí a dificuldade de explicar o raciocínio para mentes lineares.',
      a_sombra: 'O Mago imaturo é o Eremita Arrogante: confunde isolamento com superioridade e trata incompreensão alheia como prova de genialidade própria. Morre com potencial intacto.',
      curiosidade_psicologica: 'Seu cérebro queima 20% mais glicose que a média durante resolução de problemas abstratos. E queima a mesma quantidade tentando decidir o que jantar.',
      par_romantico: 'Atrai Bardos e Ninjas — quem traduz o que você sente e quem entende sem precisar de tradução. É destruído por Guerreiros impacientes que exigem ação antes da análise.',
      probabilidade_erro: 'Se este resultado parece incorreto, é provável que você tenha racionalizado cada resposta em vez de responder com o instinto. Tente de novo sem pensar.'
    },
    chars: [
      { n: 'L Lawliet', s: 'Death Note', e: '🔬' },
      { n: 'Senku Ishigami', s: 'Dr. Stone', e: '⚗️' },
      { n: 'Shikamaru Nara', s: 'Naruto', e: '🌿' },
      { n: 'Hermione Granger', s: 'Harry Potter', e: '📚' },
      { n: 'Doctor Strange', s: 'Marvel', e: '🌀' },
      { n: 'Tyrion Lannister', s: 'Game of Thrones', e: '🍷' },
      { n: 'Abed Nadir', s: 'Community', e: '🎬' },
      { n: 'Armin Arlert', s: 'Attack on Titan', e: '🗺️' },
      { n: 'Shuri', s: 'Marvel / Wakanda', e: '🔬' },
      { n: 'Spencer Reid', s: 'Criminal Minds', e: '🧠' },
      { n: 'Kisuke Urahara', s: 'Bleach', e: '🎩' },
      { n: 'Mei Hatsume', s: 'My Hero Academia', e: '⚙️' },
      { n: 'Momo Aizawa', s: 'Jujutsu Kaisen', e: '🧩' },
      { n: 'Yennefer', s: 'The Witcher', e: '✨' },
      { n: 'Neo', s: 'Matrix', e: '💊' },
      { n: 'Gandalf', s: 'Senhor dos Anéis', e: '🧙' },
      { n: 'Wednesday Addams', s: 'Wednesday', e: '🖤' },
      { n: 'Sherlock Holmes', s: 'BBC Series', e: '🔍' },
      { n: 'Nikola Tesla', s: 'Vida Real', e: '⚡' },
      { n: 'Albert Einstein', s: 'Vida Real', e: '🧠' },
      { n: 'Marie Curie', s: 'Vida Real', e: '☢️' },
      { n: 'Stephen Hawking', s: 'Vida Real', e: '🌌' }
    ]
  },

  ladino: {
    name: 'Ladino', emoji: '🗡️', color: '#27ae60', mbti: 'ESTP',
    compat: ['ESTP', 'ENTP', 'ISTP'], tagline: 'Mestre do Risco Calculado',
    desc: 'Regras são sugestões; limites são coordenadas de partida. Opera no espaço entre o que é e o que poderia ser.',
    bf: { O: 72, C: 5, E: 95, A: 12, N: 60 },
    traits: ['Adaptável', 'Perspicaz', 'Impulsivo', 'Carismático', 'Oportunista'],
    subclasses: [
      { name: 'Espião', trait: 'C', dir: 'high', th: 55, tagline: 'Caos Calculado',
        desc: 'Manipulação precisa disfarçada de espontaneidade. Cada gesto é intencional.',
        diagnostico: 'Conscienciosidade elevada em perfil caótico cria o manipulador perfeito — parece despreocupado mas controla cada variável.' },
      { name: 'Pirata', trait: 'A', dir: 'low', th: 15, tagline: 'Liberdade Total',
        desc: 'Zero lealdade, zero arrependimento. O mundo é um buffet e você se serve primeiro.',
        diagnostico: 'Extroversão máxima com amabilidade mínima — charm ofensivo que encanta e descarta com a mesma velocidade.' },
      { name: 'Robin Hood', trait: 'A', dir: 'high', th: 65, tagline: 'Rouba dos Poderosos',
        desc: 'Caos a serviço da justiça. Quebra regras para proteger quem o sistema esqueceu.',
        diagnostico: 'Alta amabilidade em perfil transgressivo — genuinamente se importa, mas expressa isso quebrando estruturas em vez de construindo.' }
    ],
    doss: {
      weapon: 'Leitura instantânea de pessoas e contextos — você processa subtexto enquanto outros ainda processam o texto.',
      heel: 'Instabilidade de comprometimento: foge de vínculos profundos antes que cobrem algo de você.',
      party: 'Você é o catalisador que faz grupos se mover. Mas sua tendência a jogar por fora pode isolar aliados.',
      quest: 'Identifique UMA relação que você abandonou por ficar desconfortável. Comprometa-se por 90 dias sem saída fácil.',
      guild: { name: 'Guilda dos Visionários', icon: '🗡️', sub: 'Empreendedor · Artístico', careers: ['Empreendedorismo', 'Vendas de Alto Nível', 'Negociação Estratégica', 'Marketing', 'Direito'] },
      diagnostico_clinico: 'Amígdala com threshold alto para medo — seu cérebro precisa de mais estímulo para sentir perigo, o que explica a busca constante por risco e novidade.',
      a_sombra: 'O Ladino imaturo é o Golpista Emocional: usa charm para extrair valor de relacionamentos e desaparece quando a conta chega. Confunde liberdade com incapacidade de intimidade.',
      curiosidade_psicologica: 'Na psicologia evolutiva, seu perfil é o do "explorador de nicho": em tribos ancestrais, você seria quem testava a fruta desconhecida. Metade morria, metade descobria novos recursos.',
      par_romantico: 'Atrai Samurais e Clérigos — a estrutura que falta e o cuidado que secretamente deseja. É destruído por outro Ladino: dois jogadores no mesmo jogo terminam sem ninguém para confiar.',
      probabilidade_erro: 'Se este resultado parece errado, você provavelmente respondeu o que achava mais interessante, não o que é verdade. Ladinos são mestres em se enganar.'
    },
    chars: [
      { n: 'Hisoka Morow', s: 'Hunter x Hunter', e: '🃏' },
      { n: 'Denji', s: 'Chainsaw Man', e: '⛓️' },
      { n: 'Dazai Osamu', s: 'Bungo Stray Dogs', e: '🎭' },
      { n: 'Spike Spiegel', s: 'Cowboy Bebop', e: '🚬' },
      { n: 'Loki', s: 'Marvel', e: '🐍' },
      { n: 'Jack Sparrow', s: 'Piratas do Caribe', e: '🍺' },
      { n: 'Han Solo', s: 'Star Wars', e: '🔫' },
      { n: 'Stiles Stilinski', s: 'Teen Wolf', e: '🦊' },
      { n: 'Gojo Satoru', s: 'Jujutsu Kaisen', e: '👁️' },
      { n: 'Lupin III', s: 'Lupin', e: '💎' },
      { n: 'Catwoman', s: 'DC Comics', e: '🐱' },
      { n: 'Joker (Heath Ledger)', s: 'The Dark Knight', e: '🎭' },
      { n: 'Ryuk', s: 'Death Note', e: '🍎' },
      { n: 'Flynn Rider', s: 'Enrolados', e: '😏' },
      { n: 'Tony Montana', s: 'Scarface', e: '💰' },
      { n: 'Malia Tate', s: 'Teen Wolf', e: '🐾' },
      { n: 'Theo Raeken', s: 'Teen Wolf', e: '🐺' },
      { n: 'Bugs Bunny', s: 'Looney Tunes', e: '🐰' },
      { n: 'Steve Jobs', s: 'Vida Real', e: '💻' },
      { n: 'Coco Chanel', s: 'Vida Real', e: '👗' },
      { n: 'Casanova', s: 'Vida Real', e: '🌹' }
    ]
  },

  clerigo: {
    name: 'Clérigo', emoji: '✨', color: '#d4a017', mbti: 'ISFJ',
    compat: ['ISFJ', 'ESFJ', 'INFJ'], tagline: 'A Força que Sustenta Tudo',
    desc: 'A âncora invisível de qualquer grupo. Cura sem esperar reconhecimento, lembra o que os outros esquecem e transforma cuidado em superpoder.',
    bf: { O: 22, C: 88, E: 18, A: 98, N: 32 },
    traits: ['Empático', 'Dedicado', 'Paciente', 'Leal', 'Atencioso'],
    subclasses: [
      { name: 'Mártir', trait: 'N', dir: 'high', th: 70, tagline: 'Sacrifício até a Destruição',
        desc: 'Cuida de todos até não restar nada de si. A dor alheia se torna sua.',
        diagnostico: 'Alto neuroticismo em perfil cuidador — absorve sofrimento alheio e internaliza como responsabilidade pessoal. Burnout crônico garantido.' },
      { name: 'Curandeiro de Batalha', trait: 'E', dir: 'high', th: 60, tagline: 'Cura em Campo',
        desc: 'Presença ativa que cura enquanto luta. Não espera os feridos virem — vai até eles.',
        diagnostico: 'Extroversão em perfil cuidador cria o raro tipo que cuida sem se esconder — visível, acessível, mas ainda vulnerável à exaustão empática.' },
      { name: 'Oráculo', trait: 'O', dir: 'high', th: 75, tagline: 'Lê as Almas',
        desc: 'Curador intuitivo que percebe o que não foi dito. Trata feridas que o paciente não sabe que tem.',
        diagnostico: 'Alta abertura em perfil cuidador — conecta padrões emocionais que escapam a todos, mas pode projetar seus próprios conflitos nos outros.' }
    ],
    doss: {
      weapon: 'Memória emocional e presença reparadora — você lembra o aniversário, percebe quando algo mudou e cria segurança onde outros criam ruído.',
      heel: 'Mártir silencioso: acumula ressentimentos que nunca expressa até entrar em colapso.',
      party: 'Você é a cola do grupo mas raramente pede o que precisa. Busque Guerreiros para protegê-lo de ser explorado.',
      quest: 'Pratique dizer "não" uma vez por semana para pedidos que vêm do dever, não do desejo.',
      guild: { name: 'Guilda dos Cuidadores', icon: '✨', sub: 'Social · Convencional', careers: ['Psicologia', 'Medicina', 'Educação', 'Recursos Humanos', 'Serviço Social'] },
      diagnostico_clinico: 'Sistema de ocitocina hiperativo — seu cérebro literalmente recompensa você por cuidar dos outros, criando uma dependência bioquímica de ser necessário.',
      a_sombra: 'O Clérigo imaturo é o Controlador Passivo-Agressivo: "cuida" para criar dívida emocional, depois cobra com silêncio e ressentimento. "Eu faço tudo por você e olha como me paga."',
      curiosidade_psicologica: 'Seu perfil tem a maior correlação com síndrome de burnout entre todas as classes. Não porque você é fraco — porque seu sistema nervoso não tem botão de "off" para empatia.',
      par_romantico: 'Atrai Guerreiros e Necromantes — quem protege e quem precisa de humanização. É destruído por Ladinos que consomem sua bondade e partem sem olhar pra trás.',
      probabilidade_erro: 'Se este resultado parece errado, você provavelmente respondeu como a pessoa que todos esperam que você seja — não como a pessoa exausta que existe por baixo.'
    },
    chars: [
      { n: 'Alphonse Elric', s: 'Fullmetal Alchemist', e: '🩵' },
      { n: 'Tohru Honda', s: 'Fruits Basket', e: '🌸' },
      { n: 'Hinata Hyūga', s: 'Naruto', e: '💜' },
      { n: 'Sam Gamgee', s: 'Senhor dos Anéis', e: '🌻' },
      { n: 'Iroh', s: 'Avatar', e: '🍵' },
      { n: 'Forrest Gump', s: 'Forrest Gump', e: '🏃' },
      { n: 'Emilia', s: 'Re:Zero', e: '❄️' },
      { n: 'Melissa McCall', s: 'Teen Wolf', e: '🏥' },
      { n: 'Tanjiro Kamado', s: 'Demon Slayer', e: '💧' },
      { n: 'Ochako Uraraka', s: 'My Hero Academia', e: '🌸' },
      { n: 'Winry Rockbell', s: 'Fullmetal Alchemist', e: '🔧' },
      { n: 'Dobby', s: 'Harry Potter', e: '🧦' },
      { n: 'Beth March', s: 'Adoráveis Mulheres', e: '🎹' },
      { n: 'Baymax', s: 'Big Hero 6', e: '🤖' },
      { n: 'Samwise', s: 'Senhor dos Anéis', e: '🌿' },
      { n: 'Bob Ross', s: 'Vida Real', e: '🎨' },
      { n: 'Keanu Reeves', s: 'Vida Real', e: '🕶️' },
      { n: 'Steve Irwin', s: 'Vida Real', e: '🐊' },
      { n: 'Madre Teresa', s: 'Vida Real', e: '✝️' },
      { n: 'Fred Rogers', s: 'Vida Real', e: '👟' }
    ]
  },

  bardo: {
    name: 'Bardo', emoji: '🎭', color: '#e67e22', mbti: 'ENFP',
    compat: ['ENFP', 'ESFP', 'ENTP'], tagline: 'A Chama que Acende Mundos',
    desc: 'A vida é material narrativo e você é o narrador. Catalisa o potencial dos outros com generosidade criativa que desconcerta.',
    bf: { O: 95, C: 18, E: 96, A: 75, N: 62 },
    traits: ['Criativo', 'Carismático', 'Espontâneo', 'Empático', 'Inspirador'],
    subclasses: [
      { name: 'Trovador', trait: 'A', dir: 'high', th: 90, tagline: 'Empatia como Arte',
        desc: 'Pura conexão humana transformada em expressão artística. Sente o que a sala sente.',
        diagnostico: 'Amabilidade extrema em perfil criativo-social — gera arte que cura, mas perde a própria identidade absorvendo emoções alheias.' },
      { name: 'Agitador', trait: 'A', dir: 'low', th: 40, tagline: 'Arte que Incomoda',
        desc: 'Provoca de propósito. Sua arte existe para quebrar zonas de conforto.',
        diagnostico: 'Baixa amabilidade em perfil expressivo — usa criatividade como arma. Eficaz para mudar paradigmas, destrutivo para relacionamentos.' },
      { name: 'Bufão Sombrio', trait: 'N', dir: 'high', th: 75, tagline: 'Humor como Escudo',
        desc: 'Transforma dor em comédia. Ninguém sabe que está sangrando porque todos estão rindo.',
        diagnostico: 'Alto neuroticismo mascarado por extroversão criativa — o palhaço triste clássico. Funciona socialmente, desmorona em silêncio.' }
    ],
    doss: {
      weapon: 'Contágio emocional positivo e síntese criativa — você transforma experiências em narrativas e narrativas em movimento.',
      heel: 'Dispersão criativa: começa tudo, termina pouco. O caos interno disfarçado de criatividade é na verdade evitação do desconforto de aprofundar.',
      party: 'Você energiza qualquer grupo mas raramente sustenta o ritmo. Busque Samurais para a estrutura que você foge.',
      quest: 'Escolha UM projeto criativo e finalize-o antes de começar outro. Defina "finalizado" com critérios concretos.',
      guild: { name: 'Guilda dos Criadores', icon: '🎭', sub: 'Artístico · Social', careers: ['Comunicação', 'Marketing Criativo', 'Design', 'Entretenimento', 'Educação Inovadora'] },
      diagnostico_clinico: 'Rede de modo padrão hiperconectada — seu cérebro nunca para de gerar associações, metáforas e possibilidades. Excelente para criar, péssimo para focar.',
      a_sombra: 'O Bardo imaturo é o Narcisista Criativo: transforma toda experiência alheia em material para sua narrativa pessoal e confunde atenção com amor.',
      curiosidade_psicologica: 'Seu perfil OCEAN é o mais correlacionado com TDAH entre todas as classes — não é coincidência, é literalmente o mesmo hardware neurológico operando de formas diferentes.',
      par_romantico: 'Atrai Samurais e Caçadores — a disciplina e o silêncio que faltam. É destruído por outro Bardo: dois furacões criativos sem ninguém pra ancorar.',
      probabilidade_erro: 'Se este resultado parece errado, talvez você tenha respondido como a pessoa que aparece nas festas — não como a pessoa que existe quando a música para.'
    },
    chars: [
      { n: 'Monkey D. Luffy', s: 'One Piece', e: '🏴‍☠️' },
      { n: 'Gon Freecss', s: 'Hunter x Hunter', e: '⚡' },
      { n: 'Kamina', s: 'Gurren Lagann', e: '🕶️' },
      { n: 'Tony Stark', s: 'Marvel', e: '🦾' },
      { n: 'Deadpool', s: 'Marvel', e: '💬' },
      { n: 'Aang', s: 'Avatar', e: '🌀' },
      { n: 'Naruto (jovem)', s: 'Naruto', e: '🍥' },
      { n: 'Barney Stinson', s: 'HIMYM', e: '👔' },
      { n: 'Liam Dunbar', s: 'Teen Wolf', e: '🐾' },
      { n: 'Denki Kaminari', s: 'My Hero Academia', e: '⚡' },
      { n: 'Zenitsu Agatsuma', s: 'Demon Slayer', e: '⚡' },
      { n: 'Anya Forger', s: 'Spy x Family', e: '🥜' },
      { n: 'Jake Peralta', s: 'Brooklyn 99', e: '🔫' },
      { n: 'Rapunzel', s: 'Enrolados', e: '🌻' },
      { n: 'Michael Scott', s: 'The Office', e: '📋' },
      { n: 'Willy Wonka', s: 'Charlie e a Fábrica', e: '🍫' },
      { n: 'The Doctor', s: 'Doctor Who', e: '🔵' },
      { n: 'Robin Williams', s: 'Vida Real', e: '😂' },
      { n: 'Freddie Mercury', s: 'Vida Real', e: '🎤' },
      { n: 'Lady Gaga', s: 'Vida Real', e: '🎨' },
      { n: 'Salvador Dalí', s: 'Vida Real', e: '🕰️' }
    ]
  },

  paladino: {
    name: 'Paladino', emoji: '🛡️', color: '#2980b9', mbti: 'ENFJ',
    compat: ['ENFJ', 'INFJ', 'ENTJ'], tagline: 'O Herói que o Mundo Merece',
    desc: 'Você não apenas luta — você eleva. Transforma grupos comuns em algo maior, com uma visão de propósito que magnetiza.',
    bf: { O: 75, C: 85, E: 88, A: 95, N: 12 },
    traits: ['Inspirador', 'Nobre', 'Empático', 'Comprometido', 'Visionário'],
    subclasses: [
      { name: 'Inquisidor', trait: 'N', dir: 'high', th: 65, tagline: 'Vê Pecado em Tudo',
        desc: 'A paranoia moral transforma justiça em vigilância obsessiva. Ninguém é inocente o bastante.',
        diagnostico: 'Alto neuroticismo em perfil moral — a ansiedade alimenta hipervigilância ética que exige perfeição impossível dos outros e de si mesmo.' },
      { name: 'Cruzado', trait: 'A', dir: 'low', th: 45, tagline: 'Justiça Implacável',
        desc: 'A causa é tudo. Indivíduos são aceitáveis como custo colateral.',
        diagnostico: 'Amabilidade reduzida em perfil de liderança moral — gera líderes eficazes mas desumanos. O fim justifica qualquer meio.' },
      { name: 'Jurado das Estrelas', trait: 'O', dir: 'high', th: 88, tagline: 'Justiça Cósmica',
        desc: 'Filosófico e adaptável. Vê a justiça como algo vivo que evolui com o contexto.',
        diagnostico: 'Alta abertura em perfil moral — capaz de mudar de posição sem perder princípios. Raro e poderoso, mas pode parecer inconsistente.' }
    ],
    doss: {
      weapon: 'Autoridade moral e visão de propósito — você não apenas lidera, você eleva.',
      heel: 'Exaustão do herói: você carrega o fardo de todos até não restar nada.',
      party: 'Você inspira mas pode se tornar messiânico. Precise de Ladinos para questioná-lo quando seus valores viram dogma.',
      quest: 'Identifique alguém que você está "salvando" sem que ela pediu. Pratique apoiar sem resolver.',
      guild: { name: 'Guilda dos Líderes', icon: '🛡️', sub: 'Social · Empreendedor', careers: ['Liderança Executiva', 'Política', 'Direito', 'Gestão de ONGs', 'Saúde Pública'] },
      diagnostico_clinico: 'Circuito de recompensa ativado por reconhecimento moral — seu cérebro literalmente vicia em "fazer a coisa certa", o que pode tornar a virtude uma compulsão.',
      a_sombra: 'O Paladino imaturo é o Ditador Benevolente: "eu sei o que é melhor para você" torna-se tirania moral. Impõe salvação a quem não pediu e se sente traído quando recusam.',
      curiosidade_psicologica: 'Pesquisas mostram que líderes com seu perfil têm a maior taxa de burnout por empatia — não por fraqueza, mas porque seu sistema nervoso não sabe parar de processar a dor alheia como urgência pessoal.',
      par_romantico: 'Atrai Ninjas e Magos — profundidade e intelecto que complementam visão. É destruído por Necromantes que exploram sua necessidade de ser herói.',
      probabilidade_erro: 'Se este resultado parece errado, você respondeu como o herói que aspira ser. A pergunta real: quem é você quando ninguém está olhando?'
    },
    chars: [
      { n: 'Scott McCall', s: 'Teen Wolf', e: '🐺' },
      { n: 'All Might', s: 'My Hero Academia', e: '💪' },
      { n: 'Superman', s: 'DC Comics', e: '🦸' },
      { n: 'Steve Rogers', s: 'Marvel', e: '⭐' },
      { n: 'Jon Snow', s: 'Game of Thrones', e: '🐺' },
      { n: 'Naruto (adulto)', s: 'Naruto Shippuden', e: '🌀' },
      { n: 'Ned Stark', s: 'Game of Thrones', e: '⚔️' },
      { n: 'Thorfinn (adulto)', s: 'Vinland Saga', e: '☮' },
      { n: 'Zuko (arco final)', s: 'Avatar', e: '🔥' },
      { n: 'Izuku Midoriya', s: 'My Hero Academia', e: '💚' },
      { n: 'Kamado Tanjiro', s: 'Demon Slayer', e: '🔥' },
      { n: 'Yuji Itadori', s: 'Jujutsu Kaisen', e: '🥊' },
      { n: 'Optimus Prime', s: 'Transformers', e: '🤖' },
      { n: 'Atticus Finch', s: 'O Sol é para Todos', e: '⚖️' },
      { n: 'Samwise Gamgee', s: 'Senhor dos Anéis', e: '🌿' },
      { n: 'T\'Challa', s: 'Marvel', e: '🐾' },
      { n: 'Nelson Mandela', s: 'Vida Real', e: '✊' },
      { n: 'MLK Jr.', s: 'Vida Real', e: '🕊️' },
      { n: 'Barack Obama', s: 'Vida Real', e: '🏛️' },
      { n: 'Malala Yousafzai', s: 'Vida Real', e: '📚' }
    ]
  },

  cacador: {
    name: 'Caçador', emoji: '🏹', color: '#16a085', mbti: 'ISTP',
    compat: ['ISTP', 'ISFP', 'INTJ'], tagline: 'O Fantasma da Floresta',
    desc: 'Não precisa de aprovação para agir — nem de plateia. Lê o ambiente como texto e age no momento exato, sem excesso.',
    bf: { O: 40, C: 65, E: 5, A: 20, N: 2 },
    traits: ['Preciso', 'Autossuficiente', 'Observador', 'Pragmático', 'Resiliente'],
    subclasses: [
      { name: 'Assassino', trait: 'A', dir: 'low', th: 15, tagline: 'Eficiência Letal',
        desc: 'Zero empatia operacional. A missão é absoluta e o método é cirúrgico.',
        diagnostico: 'Amabilidade mínima com alta conscienciosidade — máquina humana de execução. Eficiente mas emocionalmente árido.' },
      { name: 'Rastreador', trait: 'O', dir: 'high', th: 70, tagline: 'Lê a Natureza como Texto',
        desc: 'Conecta padrões invisíveis no ambiente. Encontra o que ninguém sabia que estava perdido.',
        diagnostico: 'Alta abertura em perfil silencioso — a combinação gera percepção quase sobrenatural do ambiente, mas pode levar a misticismo excessivo.' },
      { name: 'Sentinela', trait: 'E', dir: 'high', th: 45, tagline: 'Caçador que Protege',
        desc: 'Opera sozinho mas a serviço do grupo. O perímetro é seu domínio.',
        diagnostico: 'Extroversão moderada em perfil autossuficiente — funciona em equipe quando necessário sem perder a independência.' }
    ],
    doss: {
      weapon: 'Execução precisa e resiliência emocional — você opera sob pressão com um silêncio que os outros confundem com frieza mas é maestria.',
      heel: 'Isolamento funcional: sua competência extrema cria uma barreira invisível.',
      party: 'Você é o parceiro mais confiável mas o mais difícil de conhecer. Busque Bardos para comunicar o processo.',
      quest: 'Compartilhe um processo ou fraqueza com alguém de confiança esta semana.',
      guild: { name: 'Guilda dos Artífices', icon: '🏹', sub: 'Realista · Investigativo', careers: ['Engenharia', 'Cirurgia', 'Análise de Segurança', 'Programação', 'Ciências Forenses'] },
      diagnostico_clinico: 'Eixo hipotálamo-pituitária-adrenal com calibração atípica — seu corpo simplesmente não produz a mesma quantidade de cortisol que os outros em situações de estresse. Isso não é coragem; é bioquímica.',
      a_sombra: 'O Caçador imaturo é o Esquizóide Funcional: tão competente sozinho que nem percebe que parou de precisar de pessoas — e quando percebe, esqueceu como conectar.',
      curiosidade_psicologica: 'Seu perfil tem a menor pontuação de neuroticismo entre todas as classes. Na prática: você é a pessoa mais difícil de perturbar na sala — e também a mais difícil de ler.',
      par_romantico: 'Atrai Bardos e Ninjas — quem traz cor ao seu silêncio e quem entende sem palavras. É destruído por Clérigos sufocantes que interpretam seu silêncio como rejeição.',
      probabilidade_erro: 'Se este resultado parece errado, talvez você tenha respondido como quem gostaria de ser — tranquilo e imperturbável. Mas há nervosismo real que você não admitiu.'
    },
    chars: [
      { n: 'Levi Ackerman', s: 'Attack on Titan', e: '🗡️' },
      { n: 'Killua Zoldyck', s: 'Hunter x Hunter', e: '⚡' },
      { n: 'Itachi Uchiha', s: 'Naruto', e: '🪶' },
      { n: 'Riza Hawkeye', s: 'Fullmetal Alchemist', e: '🔫' },
      { n: 'Batman', s: 'DC Comics', e: '🦇' },
      { n: 'Hawkeye', s: 'Marvel', e: '🏹' },
      { n: 'Geralt of Rivia', s: 'The Witcher', e: '⚔️' },
      { n: 'Arya Stark', s: 'Game of Thrones', e: '🗡️' },
      { n: 'Allison Argent', s: 'Teen Wolf', e: '🏹' },
      { n: 'Toph Beifong', s: 'Avatar', e: '🪨' },
      { n: 'Megumi Fushiguro', s: 'Jujutsu Kaisen', e: '🐕' },
      { n: 'Giyu Tomioka', s: 'Demon Slayer', e: '💧' },
      { n: 'Shota Aizawa', s: 'My Hero Academia', e: '🧣' },
      { n: 'John Wick', s: 'John Wick', e: '🔫' },
      { n: 'Legolas', s: 'Senhor dos Anéis', e: '🏹' },
      { n: 'Ellie Williams', s: 'The Last of Us', e: '🔪' },
      { n: 'Jill Valentine', s: 'Resident Evil', e: '🔫' },
      { n: 'Clint Eastwood', s: 'Vida Real', e: '🎬' },
      { n: 'Simone Biles', s: 'Vida Real', e: '🤸' },
      { n: 'Valentina Shevchenko', s: 'Vida Real', e: '🥊' }
    ]
  },

  necromante: {
    name: 'Necromante', emoji: '💀', color: '#7d3c98', mbti: 'INTJ',
    compat: ['INTJ', 'INTP', 'ENTJ'], tagline: 'O Arquiteto do Inevitável',
    desc: 'Enquanto outros veem o presente, você já calculou três futuros à frente. Domina sistemas com precisão cirúrgica.',
    bf: { O: 88, C: 95, E: 6, A: 3, N: 58 },
    traits: ['Estratégico', 'Implacável', 'Visionário', 'Autônomo', 'Exigente'],
    subclasses: [
      { name: 'Tirano', trait: 'E', dir: 'high', th: 50, tagline: 'Controle Absoluto',
        desc: 'Liderança autocrática. Não pede permissão — assume o comando.',
        diagnostico: 'Extroversão em perfil de controle — o raro Necromante que lidera de frente, não das sombras. Mais perigoso, mais visível.' },
      { name: 'Filósofo da Morte', trait: 'O', dir: 'high', th: 92, tagline: 'Fascinado pela Mortalidade',
        desc: 'Explora os limites da existência com curiosidade científica. A morte é data, não tabu.',
        diagnostico: 'Abertura extrema em perfil analítico-frio — gera mentes que revolucionam campos inteiros, mas assustam todos ao redor.' },
      { name: 'Puppet Master', trait: 'A', dir: 'low', th: 10, tagline: 'Manipulação como Arte',
        desc: 'Controla pessoas como peças no tabuleiro. Cada interação é calculada.',
        diagnostico: 'Amabilidade quase zero com alta conscienciosidade — o manipulador mais eficiente possível. Sem culpa, sem desperdício.' }
    ],
    doss: {
      weapon: 'Visão sistêmica de longo prazo — você enxerga implicações de terceira ordem que outros ignoram.',
      heel: 'Solidão estratégica: você afasta aliados pela frieza e acaba executando planos sem base de apoio.',
      party: 'Você produz resultados extraordinários mas raramente cria legado. Busque Paladinos para o lado humano.',
      quest: 'Escolha um aliado próximo e pergunte genuinamente: "Como você está?" — e ouça sem analisar.',
      guild: { name: 'Guilda dos Arquitetos', icon: '💀', sub: 'Investigativo · Empreendedor', careers: ['Estratégia Corporativa', 'Investimentos', 'Pesquisa Avançada', 'Tecnologia', 'Direito Internacional'] },
      diagnostico_clinico: 'Córtex pré-frontal dorsolateral dominante — a região do planejamento estratégico e controle executivo. Sua mente opera como um supercomputador de cenários, constantemente rodando simulações.',
      a_sombra: 'O Necromante imaturo é o Sociopata Funcional: tão eficiente em usar pessoas que nem percebe que deixou de vê-las como humanas. O controle total é a prisão perfeita.',
      curiosidade_psicologica: 'Seu perfil é o mais correlacionado com os traços da Tríade Sombria (Maquiavelismo, Narcisismo, Psicopatia). Antes de se assustar: os mesmos traços em dose moderada criam os melhores cirurgiões e estrategistas.',
      par_romantico: 'Atrai Clérigos e Monges — quem humaniza e quem entende a solidão. É destruído por outro Necromante: dois controladores disputando o trono criam destruição mútua garantida.',
      probabilidade_erro: 'Se este resultado parece incorreto, é provável que você tenha projetado a imagem do estrategista frio para impressionar o algoritmo. Vulnerabilidade não é fraqueza.'
    },
    chars: [
      { n: 'Light Yagami', s: 'Death Note', e: '📓' },
      { n: 'Aizen Sōsuke', s: 'Bleach', e: '🌸' },
      { n: 'Lelouch vi Britannia', s: 'Code Geass', e: '👁️' },
      { n: 'Peter Hale', s: 'Teen Wolf', e: '🕷️' },
      { n: 'Thanos', s: 'Marvel', e: '💎' },
      { n: 'Magneto', s: 'X-Men', e: '🧲' },
      { n: 'Walter White', s: 'Breaking Bad', e: '🧪' },
      { n: 'Ozymandias', s: 'Watchmen', e: '🦉' },
      { n: 'Makima', s: 'Chainsaw Man', e: '🔴' },
      { n: 'Sukuna', s: 'Jujutsu Kaisen', e: '👹' },
      { n: 'Muzan Kibutsuji', s: 'Demon Slayer', e: '🌙' },
      { n: 'Sauron', s: 'Senhor dos Anéis', e: '👁️' },
      { n: 'Palpatine', s: 'Star Wars', e: '⚡' },
      { n: 'Tywin Lannister', s: 'Game of Thrones', e: '🦁' },
      { n: 'Hannibal Lecter', s: 'Silêncio dos Inocentes', e: '🍷' },
      { n: 'Voldemort', s: 'Harry Potter', e: '🐍' },
      { n: 'Deucalion', s: 'Teen Wolf', e: '🐺' },
      { n: 'Napoleon Bonaparte', s: 'Vida Real', e: '👑' },
      { n: 'Maquiavel', s: 'Vida Real', e: '🏛️' },
      { n: 'Elon Musk', s: 'Vida Real', e: '🚀' },
      { n: 'Catarina, a Grande', s: 'Vida Real', e: '👑' }
    ]
  },

  samurai: {
    name: 'Samurai', emoji: '⩩️', color: '#8B4513', mbti: 'ISTJ',
    compat: ['ISTJ', 'ESTJ', 'ISFJ'], tagline: 'A Honra como Espinha Dorsal',
    desc: 'Seu código não é externo — está gravado na alma. Não precisa de aprovação para fazer o que é certo.',
    bf: { O: 8, C: 98, E: 20, A: 58, N: 5 },
    traits: ['Íntegro', 'Disciplinado', 'Leal', 'Metódico', 'Inabalável'],
    subclasses: [
      { name: 'Ronin', trait: 'A', dir: 'low', th: 35, tagline: 'Código Pessoal, Sem Mestre',
        desc: 'Segue seu próprio código, não o de outros. Disciplina solitária.',
        diagnostico: 'Baixa amabilidade com alta conscienciosidade — disciplina sem lealdade a grupo cria o lobo solitário mais eficiente possível.' },
      { name: 'Shogun', trait: 'E', dir: 'high', th: 60, tagline: 'Autoridade Tradicional',
        desc: 'Líder pelo exemplo e pela tradição. Autoridade que emana da consistência.',
        diagnostico: 'Extroversão em perfil disciplinado — o líder tradicional que inspira pelo exemplo, não pelo discurso.' },
      { name: 'Asceta', trait: 'O', dir: 'low', th: 12, tagline: 'Simplicidade Radical',
        desc: 'Elimina tudo que não é essencial. Pureza de propósito absoluta.',
        diagnostico: 'Abertura mínima com conscienciosidade máxima — a mente mais focada e restrita possível. Produtividade extrema, criatividade zero.' }
    ],
    doss: {
      weapon: 'Consistência que se torna uma promessa — quando você diz algo, acontece.',
      heel: 'Rigidez de código: pode sacrificar relacionamentos por não adaptar suas regras a contextos novos.',
      party: 'Você é a estrutura que outros precisam mas raramente agradecem. Busque Bardos para flexibilidade.',
      quest: 'Identifique UMA regra pessoal que você nunca questionou. Teste quebrá-la deliberadamente esta semana.',
      guild: { name: 'Guilda dos Guardiões', icon: '⩩️', sub: 'Convencional · Realista', careers: ['Direito', 'Contabilidade', 'Medicina Cirúrgica', 'Forças Armadas', 'Magistratura'] },
      diagnostico_clinico: 'Gânglios basais com ativação consistente — a região do hábito e da rotina. Seu cérebro é literalmente construído para consistência, o que explica tanto a confiabilidade quanto a rigidez.',
      a_sombra: 'O Samurai imaturo é o Fundamentalista: transforma código pessoal em lei universal e pune quem diverge. A disciplina vira opressão quando perde a compaixão.',
      curiosidade_psicologica: 'Você é estatisticamente a classe mais confiável para cumprir prazos — e a menos provável de mudar de ideia quando confrontada com evidências contrárias.',
      par_romantico: 'Atrai Bardos e Monges — a criatividade que falta e a profundidade que complementa. É destruído por Ladinos que zombam das regras que definem sua identidade.',
      probabilidade_erro: 'Se este resultado parece errado, considere: você respondeu como sua mente disciplinada acha que deveria, ou como você realmente é nos momentos em que ninguém cobra nada?'
    },
    chars: [
      { n: 'Gyomei Himejima', s: 'Demon Slayer', e: '🪨' },
      { n: 'Chris Argent', s: 'Teen Wolf', e: '🔫' },
      { n: 'Ned Stark', s: 'Game of Thrones', e: '⚔️' },
      { n: 'The Punisher', s: 'Marvel', e: '💀' },
      { n: 'Jin', s: 'Samurai Champloo', e: '🗡️' },
      { n: 'Stannis Baratheon', s: 'Game of Thrones', e: '⚔️' },
      { n: 'Erwin Smith', s: 'Attack on Titan', e: '🏇' },
      { n: 'Kyojuro Rengoku', s: 'Demon Slayer', e: '🔥' },
      { n: 'Tenya Iida', s: 'My Hero Academia', e: '🏃' },
      { n: 'Noritoshi Kamo', s: 'Jujutsu Kaisen', e: '🩸' },
      { n: 'Boromir', s: 'Senhor dos Anéis', e: '🛡️' },
      { n: 'Obi-Wan Kenobi', s: 'Star Wars', e: '⚔️' },
      { n: 'Drax', s: 'Marvel', e: '🗡️' },
      { n: 'Jin Sakai', s: 'Ghost of Tsushima', e: '🏯' },
      { n: 'Marcus Fenix', s: 'Gears of War', e: '⚔️' },
      { n: 'George Washington', s: 'Vida Real', e: '🏛️' },
      { n: 'Angela Merkel', s: 'Vida Real', e: '🇩🇪' },
      { n: 'Marcus Aurelius', s: 'Vida Real', e: '📜' },
      { n: 'Miyamoto Musashi', s: 'Vida Real', e: '⩩️' }
    ]
  },

  ninja: {
    name: 'Ninja', emoji: '🥷', color: '#1a252f', mbti: 'INFJ',
    compat: ['INFJ', 'INTJ', 'INFP'], tagline: 'A Sombra com Propósito',
    desc: 'Você enxerga padrões que os outros não veem e age onde ninguém espera. Existe para que o resultado certo aconteça.',
    bf: { O: 90, C: 78, E: 5, A: 65, N: 72 },
    traits: ['Intuitivo', 'Estratégico', 'Determinado', 'Empático', 'Sigiloso'],
    subclasses: [
      { name: 'Sicário', trait: 'A', dir: 'low', th: 30, tagline: 'Missão Acima de Tudo',
        desc: 'Frieza calculada a serviço da missão. Empatia é luxo que a missão não permite.',
        diagnostico: 'Baixa amabilidade em perfil intuitivo — detecta fraquezas alheias e as explora sem hesitação. Operador sombrio eficiente.' },
      { name: 'Profeta', trait: 'O', dir: 'high', th: 95, tagline: 'Visão além da Visão',
        desc: 'Intui futuros possíveis com precisão assustadora. Nem sempre consegue explicar como sabe.',
        diagnostico: 'Abertura extrema em perfil intuitivo — conecta padrões em nível subconsciente. Pode parecer místico, mas é pattern-matching acelerado.' },
      { name: 'Fantasma', trait: 'E', dir: 'low', th: 5, tagline: 'Invisibilidade Total',
        desc: 'Solidão como poder absoluto. Ninguém sabe que você existe até que seja tarde demais.',
        diagnostico: 'Extroversão mínima em perfil já introvertido — isolamento profundo que pode ser tanto maestria quanto patologia.' }
    ],
    doss: {
      weapon: 'Síntese intuitiva e missão de propósito — você conecta o que não está conectado e age com convicção silenciosa.',
      heel: 'Hipervigilância intuitiva: enxerga padrões de traição onde não existem.',
      party: 'Você é o parceiro mais profundo — mas raramente acessível. Busque Bardos para externalizar o interno.',
      quest: 'Compartilhe UMA intuição que você guardou por achar que ninguém entenderia.',
      guild: { name: 'Guilda das Sombras', icon: '🥷', sub: 'Artístico · Investigativo', careers: ['Psicologia', 'Consultoria Estratégica', 'Diplomacia', 'Escrita', 'Pesquisa Comportamental'] },
      diagnostico_clinico: 'Ínsula anterior hiperativa — a região da interoceptividade. Você sente o que está acontecendo antes de entender cognitivamente. Isso é intuição neurocientificamente explicada.',
      a_sombra: 'O Ninja imaturo é o Paranoico Profético: confunde hipersensibilidade com clarividência e cria conspirações internas complexas baseadas em "pressentimentos" que são na verdade projeções.',
      curiosidade_psicologica: 'INFJs são o tipo MBTI mais raro (1-2% da população). Na prática: você provavelmente passou a vida inteira se sentindo "diferente" sem saber por quê. Agora sabe.',
      par_romantico: 'Atrai Paladinos e Caçadores — quem compartilha valores profundos e quem entende o silêncio. É destruído por Bardos caóticos que confundem profundidade com drama.',
      probabilidade_erro: 'Se este resultado parece errado, considere: Ninjas são mestres em se esconder — inclusive de testes de personalidade. Talvez você tenha respondido como ninguém.'
    },
    chars: [
      { n: 'Kira Yukimura', s: 'Teen Wolf', e: '⚡' },
      { n: 'Alan Deaton', s: 'Teen Wolf', e: '🌿' },
      { n: 'Itachi Uchiha (adulto)', s: 'Naruto', e: '🪶' },
      { n: 'Norman', s: 'The Promised Neverland', e: '🧠' },
      { n: 'Daredevil', s: 'Marvel', e: '🎯' },
      { n: 'Sasuke Uchiha', s: 'Naruto', e: '⚡' },
      { n: 'Violet Evergarden', s: 'Violet Evergarden', e: '💌' },
      { n: 'Emiya Kiritsugu', s: 'Fate/Zero', e: '🔫' },
      { n: 'Severus Snape', s: 'Harry Potter', e: '🖤' },
      { n: 'Kakashi Hatake', s: 'Naruto', e: '📖' },
      { n: 'Maki Zenin', s: 'Jujutsu Kaisen', e: '🗡️' },
      { n: 'Shinobu Kocho', s: 'Demon Slayer', e: '🦋' },
      { n: 'Shoto Todoroki', s: 'My Hero Academia', e: '🔥' },
      { n: 'Michael Corleone', s: 'O Poderoso Chefão', e: '🌿' },
      { n: 'V', s: 'V de Vingança', e: '🎭' },
      { n: 'Yor Forger', s: 'Spy x Family', e: '🌹' },
      { n: 'Lady Diana', s: 'Vida Real', e: '💐' },
      { n: 'Carl Jung', s: 'Vida Real', e: '🧠' },
      { n: 'Dostoévski', s: 'Vida Real', e: '📖' },
      { n: 'Nikola Tesla', s: 'Vida Real', e: '⚡' }
    ]
  },

  monge: {
    name: 'Monge', emoji: '🌿', color: '#7f8c8d', mbti: 'INFP',
    compat: ['INFP', 'INFJ', 'ISFP'], tagline: 'A Paz como Forma de Poder',
    desc: 'Você carrega um universo interior mais vasto do que qualquer mapa. Sua força é transformar sofrimento em sabedoria.',
    bf: { O: 94, C: 10, E: 8, A: 92, N: 85 },
    traits: ['Contemplativo', 'Idealista', 'Empático', 'Criativo', 'Introspectivo'],
    subclasses: [
      { name: 'Eremita', trait: 'E', dir: 'low', th: 5, tagline: 'Sabedoria do Deserto',
        desc: 'Isolamento total como caminho de descoberta. O silêncio é a resposta.',
        diagnostico: 'Extroversão mínima com alta abertura — a mente mais rica do mundo trancada numa torre sem janelas. Genialidade silenciosa ou solidão patológica.' },
      { name: 'Bodhisattva', trait: 'A', dir: 'high', th: 93, tagline: 'Compaixão Universal',
        desc: 'Sofre pela humanidade inteira. O sofrimento alheio é literalmente insuportável.',
        diagnostico: 'Amabilidade máxima com alto neuroticismo — absorve a dor do mundo sem filtro. Compaixão que pode destruir.' },
      { name: 'Herege', trait: 'O', dir: 'high', th: 97, tagline: 'Questiona até o Sagrado',
        desc: 'Nada é inquestionável. A busca por verdade transcende qualquer dogma.',
        diagnostico: 'Abertura extrema que dissolve todas as certezas — brilhante para filosofia, paralisante para decisões práticas.' }
    ],
    doss: {
      weapon: 'Profundidade empática e síntese simbólica — você transforma experiências em sabedoria.',
      heel: 'Impotência idealista: o fosso entre como o mundo é e como deveria ser pode paralisar completamente.',
      party: 'Você oferece profundidade que poucos encontram. Busque Guerreiros para ancoragem prática.',
      quest: 'Comprometa-se com UMA ação imperfeita no mundo externo esta semana — sem esperar o timing ideal.',
      guild: { name: 'Guilda da Alma', icon: '🌿', sub: 'Artístico · Social', careers: ['Psicoterapia', 'Filosofia', 'Escrita Literária', 'Arte', 'Espiritualidade Aplicada'] },
      diagnostico_clinico: 'Rede de modo padrão com conectividade extraordinária entre amígdala e córtex pré-frontal — sente profundamente E processa profundamente. Resultado: a mente que nunca descansa.',
      a_sombra: 'O Monge imaturo é o Profeta Inerte: tanta sabedoria acumulada e zero ação no mundo. Transforma contemplação em procrastinação existencial e chama isso de "esperar o momento certo".',
      curiosidade_psicologica: 'INFPs são a classe com maior probabilidade de se identificar com "alma velha". Na neurociência: seu cérebro processa emoções com mais profundidade temporal — literalmente sente coisas "de mais tempo atrás".',
      par_romantico: 'Atrai Guerreiros e Necromantes — a ação que falta e a visão que complementa. É destruído por Ladinos impacientes que não entendem por que você precisa de tanto tempo para decidir.',
      probabilidade_erro: 'Se este resultado parece errado, você pode ter respondido como quem já encontrou a paz — não como quem ainda está desesperadamente buscando.'
    },
    chars: [
      { n: 'Frodo Baggins', s: 'Senhor dos Anéis', e: '💍' },
      { n: 'Shinji Ikari', s: 'Neon Genesis Evangelion', e: '🤖' },
      { n: 'Kaneki Ken', s: 'Tokyo Ghoul', e: '☠' },
      { n: 'Luke Skywalker', s: 'Star Wars', e: '⚔️' },
      { n: 'Mob', s: 'Mob Psycho 100', e: '🫧' },
      { n: 'Po', s: 'Kung Fu Panda', e: '🐼' },
      { n: 'Crona', s: 'Soul Eater', e: '🖤' },
      { n: 'Simon', s: 'Gurren Lagann', e: '🌀' },
      { n: 'Satomi Ito', s: 'Teen Wolf', e: '🧘' },
      { n: 'Tamaki Amajiki', s: 'My Hero Academia', e: '🌟' },
      { n: 'Nezuko Kamado', s: 'Demon Slayer', e: '🎋' },
      { n: 'Choso', s: 'Jujutsu Kaisen', e: '🩸' },
      { n: 'Luna Lovegood', s: 'Harry Potter', e: '🌙' },
      { n: 'Hodor', s: 'Game of Thrones', e: '🚪' },
      { n: 'Wall-E', s: 'Wall-E', e: '🤖' },
      { n: 'Totoro', s: 'Meu Vizinho Totoro', e: '🌳' },
      { n: 'Newt Scamander', s: 'Animais Fantásticos', e: '🧳' },
      { n: 'J.R.R. Tolkien', s: 'Vida Real', e: '📖' },
      { n: 'Vincent van Gogh', s: 'Vida Real', e: '🌻' },
      { n: 'Frida Kahlo', s: 'Vida Real', e: '🎨' },
      { n: 'Kurt Cobain', s: 'Vida Real', e: '🎸' }
    ]
  }
};

// ── 9 RACES (Hardware Cognitivo) ────────────────────────────
// Embasamentos referem-se a CONSTRUTOS e instrumentos reais de
// triagem/pesquisa — nunca a diagnóstico. Os campos "fantasma" e
// "curiosidade" são narrativa especulativa, sinalizada como tal.
export const RACES = {
  elfo: {
    name: 'Elfo', emoji: '🧝', color: '#9b59b6',
    tagline: 'Inteligência Fluida Pura',
    desc: 'Mente focada em padrões abstratos e visão de longo prazo. Raciocínio rápido que parece magia.',
    cogProfile: { QI: 92, Proj: 45, Foco: 70, Imp: 15, IE: 55 },
    embasamento: 'Inteligência fluida (Gf, Cattell) — Matrizes Progressivas de Raven / WAIS-IV: raciocínio abstrato e resolução de problemas novos',
    arquitetura: 'Processamento paralelo de padrões abstratos. Alta velocidade em raciocínio dedutivo, baixa tolerância para tarefas repetitivas. Memória de trabalho expandida.',
    fantasma: 'Sob estresse severo: dissociação intelectual — a mente se desconecta do corpo e opera em modo puramente lógico, ignorando sinais físicos de exaustão.',
    curiosidade: 'Em um teste projetivo, você seria aquele que enxerga a estrutura geométrica da mancha antes de enxergar qualquer imagem.',
    neurodiv: { tipo: 'Perfil compatível com Altas Habilidades', escala: 'Referencial: Dabrowski / WISC-V', desc: 'Sobre-excitabilidade intelectual e pensamento arborescente' }
  },
  anao: {
    name: 'Anão', emoji: '⛏️', color: '#8B4513',
    tagline: 'Foco Sustentado Implacável',
    desc: 'Produtividade implacável. Mente blindada contra distrações, capaz de suportar pressão repetitiva sem perder qualidade.',
    cogProfile: { QI: 55, Proj: 25, Foco: 96, Imp: 20, IE: 40 },
    embasamento: 'Atenção sustentada e controle inibitório — Teste d2-R / CPT (Continuous Performance Test): resistência à fadiga mental e à distração',
    arquitetura: 'Foco serial profundo. Processa uma coisa de cada vez com precisão absoluta. Troca de contexto é lenta mas a profundidade compensa.',
    fantasma: 'Sob estresse severo: rigidez obsessiva — incapaz de parar mesmo quando o corpo pede, levando a somatização crônica (dores, tensão, exaustão física).',
    curiosidade: 'No teste Palográfico, você seria aquele com os traços mais regulares e consistentes da sala inteira — o avaliador checaria se não é uma máquina.',
    neurodiv: null
  },
  tiefling: {
    name: 'Tiefling', emoji: '😈', color: '#9b2335',
    tagline: 'Profundidade Projetiva',
    desc: 'Mente altamente projetiva, complexa e carregada de dualidade emocional. Lê o mundo através do que está escondido.',
    cogProfile: { QI: 65, Proj: 95, Foco: 35, Imp: 55, IE: 70 },
    embasamento: 'Pensamento divergente (Guilford / Torrance-TTCT) — fluência associativa, originalidade e processamento emocional não-linear',
    arquitetura: 'Processamento subconsciente dominante. Conecta padrões emocionais antes da consciência registrar. Alta criatividade associativa, baixo controle executivo.',
    fantasma: 'Sob estresse severo: emergência de conteúdo sombrio — emoções reprimidas rompem a superfície de forma caótica. Pode parecer "dois eus" coexistindo.',
    curiosidade: 'No Rorschach, você veria movimento onde outros veem estática — literalmente percebe dinâmica emocional em imagens que outros acham neutras.',
    neurodiv: { tipo: 'Pensamento Divergente acentuado', escala: 'TTCT (Torrance)', desc: 'Fluência associativa atípica e processamento emocional não-linear' }
  },
  humano: {
    name: 'Humano', emoji: '🧑', color: '#34495e',
    tagline: 'Adaptabilidade Social Suprema',
    desc: 'Capacidade de mascarar, adaptar e sobreviver. Resiliência social máxima.',
    cogProfile: { QI: 60, Proj: 50, Foco: 55, Imp: 45, IE: 85 },
    embasamento: 'Inteligência emocional como habilidade (Mayer & Salovey / MSCEIT) — percepção, uso e regulação de emoções; adaptação social',
    arquitetura: 'Processamento social avançado. Lê ambientes humanos como texto e adapta comportamento em tempo real. Camaleão cognitivo.',
    fantasma: 'Sob estresse severo: perda de identidade — tanto tempo sendo o que os outros precisam que não sabe mais quem é. Despersonalização funcional.',
    curiosidade: 'No MMPI-2, suas escalas de validade seriam as mais equilibradas — o que pode significar saúde mental ou que você é bom demais em parecer saudável.',
    neurodiv: { tipo: 'Traços obsessivo-funcionais', escala: 'OCI-R (triagem)', desc: 'Necessidade de rituais, controle inibitório extremo e intolerância ao erro' }
  },
  orc: {
    name: 'Orc', emoji: '🔥', color: '#e74c3c',
    tagline: 'Processamento Cinético',
    desc: 'A impulsividade não é burrice — é processamento cinético e reatividade de curtíssimo prazo sob ameaça.',
    cogProfile: { QI: 40, Proj: 30, Foco: 25, Imp: 95, IE: 35 },
    embasamento: 'Impulsividade — BIS-11 (Barratt) / UPPS-P / ASRS-18 (OMS): impulsividade motora, urgência e atenção',
    arquitetura: 'Processamento reativo ultra-rápido. Tempo de reação excepcional, mas planejamento de longo prazo prejudicado. O cérebro prioriza ação imediata sobre deliberação.',
    fantasma: 'Sob estresse severo: escalada impulsiva — ação sem filtro que pode destruir relacionamentos e oportunidades em segundos. Arrependimento vem depois, sempre.',
    curiosidade: 'No ASRS-18, seus scores de hiperatividade motora fariam o avaliador perguntar se você tomou café. Você não tomou — seu cérebro É o café.',
    neurodiv: { tipo: 'Traços compatíveis com TDAH', escala: 'ASRS-18 (triagem, OMS)', desc: 'Hiperfoco sob pressão, déficit de atenção sustentada, processamento cinético' }
  },
  draconato: {
    name: 'Draconato', emoji: '🐉', color: '#f39c12',
    tagline: 'Inteligência Emocional Estratégica',
    desc: 'Inteligência emocional avançada com uso deliberado. Lê e influencia emoções como um instrumento — sem deixar de senti-las.',
    cogProfile: { QI: 70, Proj: 60, Foco: 60, Imp: 40, IE: 90 },
    embasamento: 'MSCEIT (Mayer-Salovey-Caruso) — os quatro ramos da IE: perceber, usar, compreender e gerenciar emoções',
    arquitetura: 'Duplo processamento emocional: sente E calcula ao mesmo tempo. Capaz de genuína empatia e manipulação estratégica simultaneamente.',
    fantasma: 'Sob estresse severo: ativação da Tríade Sombria — o lado manipulador assume e a empatia genuína é desligada como mecanismo de defesa.',
    curiosidade: 'No MSCEIT, você seria o raro caso que pontua alto tanto em "perceber emoções" quanto em "gerenciar emoções alheias". A linha entre empatia e manipulação é biologicamente fina em você.',
    neurodiv: null
  },

  elfo_astral: {
    name: 'Elfo Astral', emoji: '🤖', color: '#5dade2',
    tagline: 'Sistematização Extrema',
    desc: 'Mente que processa o mundo como sistema de regras. Precisão analítica excepcional, modelagem social intuitiva baixa. Não é falta de empatia — é um canal diferente.',
    cogProfile: { QI: 90, Proj: 15, Foco: 95, Imp: 5, IE: 12 },
    embasamento: 'Teoria Empatia-Sistematização (Baron-Cohen) — AQ-10 como triagem: sistematização, atenção a detalhes e cognição social',
    arquitetura: 'Processamento serial hiper-focado. Detecta padrões em sistemas complexos que outros ignoram. Baixo filtro para estímulos sensoriais. Comunicação literal e direta.',
    fantasma: 'Sob estresse severo: sobrecarga sensorial e shutdown — o sistema fecha. Pode parecer distância emocional, mas é proteção neurológica.',
    curiosidade: 'No AQ-10, suas respostas sobre "preferir rotina" e "notar detalhes" tenderiam ao limiar de triagem — o que indica avaliação profissional, nunca diagnóstico por quiz.',
    neurodiv: { tipo: 'Traços compatíveis com TEA', escala: 'AQ-10 (triagem)', desc: 'Sistematização extrema, hiperfoco temático, cognição social por lógica em vez de intuição' }
  },

  gnomo: {
    name: 'Gnomo', emoji: '⚡', color: '#2ecc71',
    tagline: 'Dupla Excepcionalidade — 2e',
    desc: 'O paradoxo mais raro: inteligência superior coexistindo com déficit de foco severo. Resolve o que ninguém resolve e perde as chaves todo dia.',
    cogProfile: { QI: 88, Proj: 80, Foco: 18, Imp: 82, IE: 52 },
    embasamento: 'Dupla excepcionalidade (2e): AH/SD + TDAH — WISC-V (dispersão entre índices) / ASRS-18',
    arquitetura: 'Processamento arborescente acelerado. O cérebro conecta áreas distantes em milissegundos (daí o QI alto) mas não consegue sustentar atenção linear (daí o Foco baixo). Hiperfoco seletivo sob interesse genuíno.',
    fantasma: 'Sob estresse severo: paralisia criativa — tantas ideias simultâneas que nenhuma sai. O brilhantismo vira tormento quando a entrega é exigida.',
    curiosidade: 'No WISC-V, sua dispersão entre subtestes seria enorme — muito acima da média em alguns, muito abaixo em outros. Psicólogos chamam isso de "perfil desigual" — a assinatura da 2e.',
    neurodiv: { tipo: 'Perfil compatível com Dupla Excepcionalidade (2e)', escala: 'WISC-V / ASRS-18 (triagem)', desc: 'Superdotação coexistindo com TDAH — o gênio que procrastina genialmente' }
  },

  vampiro: {
    name: 'Vampiro', emoji: '🧛', color: '#6c3483',
    tagline: 'Tríade Sombria Adaptativa',
    desc: 'Lê emoções com precisão cirúrgica e usa esse mapa para influenciar. A empatia existe — mas como ferramenta, não como sentimento espontâneo.',
    cogProfile: { QI: 78, Proj: 88, Foco: 68, Imp: 10, IE: 96 },
    embasamento: 'SD3 — Short Dark Triad (Jones & Paulhus, 2014) / MSCEIT — maquiavelismo subclínico e inteligência emocional instrumental',
    arquitetura: 'Processamento emocional dual: sente E calcula simultaneamente, mas o cálculo domina. Alta IE como scanner social. Baixíssima impulsividade — cada ação é deliberada.',
    fantasma: 'Sob estresse severo: desativação da empatia funcional — o modo frio assume e relações tornam-se puramente instrumentais. Dano relacional muitas vezes irreparável.',
    curiosidade: 'No PCL-R de Hare, você marcaria alto em "charme superficial" e "ausência de remorso" sem necessariamente ser um criminoso — a Tríade Sombria em dose subclinical é estatisticamente comum em líderes de alto desempenho.',
    neurodiv: { tipo: 'Traços da Tríade Sombria adaptativa', escala: 'SD3 (pesquisa)', desc: 'Maquiavelismo funcional, charme calculado e frieza emocional como estratégia' }
  }
};

// ── PERSONALITY QUESTIONS (Big Five) ────────────────────────
// 60 standard (12 per dim) + 6 binary dilemmas = 66 total
export const QUESTIONS_PERSONALITY = [
  // ── ABERTURA (O) ── 12 perguntas
  { dim: 'O', q: 'Você encontra um tomo com teorias mágicas radicais nunca testadas. O que sente?', ph: '📚 Abertura', opts: [
    { t: 'Excitação pura — ideias radicais precisam ser exploradas', bf: { O: 3, C: -1 } },
    { t: 'Interesse cauteloso — analiso antes de me engajar', bf: { O: 1, C: 1 } },
    { t: 'Ceticismo — prefiro o que já foi comprovado', bf: { O: -2, C: 2 } },
    { t: 'Indiferença — me concentro no que é prático', bf: { O: -3, C: 1 } }
  ]},
  { dim: 'O', q: 'Uma cidade nunca mapeada aparece no horizonte. Como você a encara?', ph: '🗺️ Exploração', opts: [
    { t: 'Mergulho de cabeça — o desconhecido é onde a vida acontece', bf: { O: 3, E: 1 } },
    { t: 'Observo e planejo antes de entrar', bf: { O: 1, C: 2 } },
    { t: 'Sigo pelos caminhos mais seguros que encontrar', bf: { O: -2, N: 1 } },
    { t: 'Prefiro rotas conhecidas — o familiar é mais eficiente', bf: { O: -3, C: 2 } }
  ]},
  { dim: 'O', q: 'Como você descreveria sua vida interior — devaneios, fantasias, pensamentos?', ph: '🔮 Interior', opts: [
    { t: 'Rica e complexa — passo horas em mundos que só eu vejo', bf: { O: 3 } },
    { t: 'Curiosa e ativa — penso muito em problemas reais', bf: { O: 1, C: 1 } },
    { t: 'Focada e prática — não costumo fantasiar', bf: { O: -2, C: 2 } },
    { t: 'Estável e direta — minha mente funciona no concreto', bf: { O: -3, N: -1 } }
  ]},
  { dim: 'O', q: 'Um debate filosófico profundo sobre a natureza da realidade surge na taverna.', ph: '🎭 Ideias', opts: [
    { t: 'Entro de cabeça — esse tipo de conversa me energiza', bf: { O: 3, E: 1 } },
    { t: 'Participo com interesse seletivo', bf: { O: 1 } },
    { t: 'Ouço mas prefiro assuntos práticos', bf: { O: -2 } },
    { t: 'Me retiro — filosofia sem aplicação me cansa', bf: { O: -3, C: 1 } }
  ]},
  { dim: 'O', q: 'A guilda propõe um método radicalmente novo e não testado para a missão.', ph: '💡 Inovação', opts: [
    { t: 'Defendo com entusiasmo — métodos novos criam vantagens', bf: { O: 3, E: 1 } },
    { t: 'Apoio após avaliar os riscos com cuidado', bf: { O: 1, C: 2 } },
    { t: 'Prefiro adaptar o que já sabemos que funciona', bf: { O: -2, C: 1 } },
    { t: 'Me oponho — experiências comprovadas existem por razão', bf: { O: -3, C: 2 } }
  ]},
  { dim: 'O', q: 'Um artista convida seu grupo para uma performance experimental muito incomum.', ph: '🎨 Arte', opts: [
    { t: 'Aceito com empolgação — experiências incomuns me fascinam', bf: { O: 3, E: 1 } },
    { t: 'Vou com curiosidade aberta', bf: { O: 2 } },
    { t: 'Vou para não desanimar o grupo, mas não é minha praia', bf: { O: -1, A: 1 } },
    { t: 'Recuso — não sinto atração por esse tipo de coisa', bf: { O: -3 } }
  ]},
  { dim: 'O', q: 'Ao aprender algo novo, como você prefere abordar o tema?', ph: '📖 Aprendizado', opts: [
    { t: 'Mergulho fundo e exploro tangentes inesperadas', bf: { O: 3 } },
    { t: 'Busco entender o essencial e aprofundo onde faz sentido', bf: { O: 1, C: 1 } },
    { t: 'Foco direto no que preciso saber para aplicar logo', bf: { O: -2, C: 2 } },
    { t: 'Aprendo só o mínimo necessário para cumprir a tarefa', bf: { O: -3, C: 1 } }
  ]},
  { dim: 'O', q: 'Sua guilda tem uma tradição secular. Você discorda que ela ainda faz sentido.', ph: '⚖️ Tradição', opts: [
    { t: 'Proponho mudança — tradições sem propósito atual são âncoras', bf: { O: 3, E: 1 } },
    { t: 'Sugiro revisão respeitosa — adaptação é saudável', bf: { O: 2, A: 1 } },
    { t: 'Respeito a tradição mesmo discordando', bf: { O: -2, A: 2 } },
    { t: 'Sigo sem questionar — tradições existem por razões que não entendemos', bf: { O: -3, C: 2 } }
  ]},
  { dim: 'O', q: 'Como você se sente quando sua rotina é completamente quebrada sem aviso?', ph: '🔄 Rotina', opts: [
    { t: 'Energizado — novas circunstâncias me estimulam', bf: { O: 3, N: -1 } },
    { t: 'Desafiado mas adaptável', bf: { O: 1, N: -1 } },
    { t: 'Desconfortável — prefiro previsibilidade', bf: { O: -2, N: 1 } },
    { t: 'Muito perturbado — minha produtividade cai significativamente', bf: { O: -3, N: 2 } }
  ]},
  { dim: 'O', q: 'Uma estética artística completamente estranha ao seu gosto é apresentada como genial.', ph: '🎭 Estética', opts: [
    { t: 'Fico curioso — quero entender o que os outros enxergam nela', bf: { O: 3, A: 1 } },
    { t: 'Respeito sem necessariamente apreciar', bf: { O: 1, A: 2 } },
    { t: 'Mantenho minha própria estética — gosto não é negociável', bf: { O: -1 } },
    { t: 'Discordo diretamente', bf: { O: -2, A: -2 } }
  ]},
  { dim: 'O', q: 'Você tem um problema sem solução conhecida. O que você faz?', ph: '🧩 Criatividade', opts: [
    { t: 'Explore soluções completamente fora do padrão', bf: { O: 3 } },
    { t: 'Pesquiso se já foi resolvido por alguém e adapto', bf: { O: 1, C: 1 } },
    { t: 'Aplico o método mais testado e confiável disponível', bf: { O: -2, C: 2 } },
    { t: 'Resolvo dentro do que já sei e funciona', bf: { O: -3, C: 2 } }
  ]},
  { dim: 'O', q: 'Ao viajar por territórios desconhecidos, o que mais chama sua atenção?', ph: '🌍 Mundo', opts: [
    { t: 'Culturas, línguas, crenças — cada lugar tem algo novo', bf: { O: 3, A: 1 } },
    { t: 'A arquitetura e o modo de vida das pessoas', bf: { O: 2 } },
    { t: 'Recursos, rotas e oportunidades estratégicas', bf: { O: -1, C: 2 } },
    { t: 'Diferenças em relação ao que conheço — e por que prefiro o familiar', bf: { O: -2 } }
  ]},

  // ── CONSCIENCIOSIDADE (C) ── 12 perguntas
  { dim: 'C', q: 'Como você prepara sua equipe antes de uma missão de alto risco?', ph: '📋 Planejamento', opts: [
    { t: 'Plano detalhado com contingências para cada cenário', bf: { C: 3, O: 1 } },
    { t: 'Divido tarefas claras e verifico o equipamento', bf: { C: 2 } },
    { t: 'Dou diretrizes gerais e confio nos instintos da equipe', bf: { C: -1, E: 1 } },
    { t: 'Improviso no momento — planos excessivos criam rigidez', bf: { C: -3, O: 1 } }
  ]},
  { dim: 'C', q: 'Uma promessa que você fez conflita com uma oportunidade inesperada e lucrativa.', ph: '🤝 Compromisso', opts: [
    { t: 'A promessa é sagrada — honro meu compromisso sem hesitar', bf: { C: 3, A: 2 } },
    { t: 'Cumpro a promessa mas negocio uma saída aceitável', bf: { C: 2, A: 1 } },
    { t: 'Avalio qual é a escolha mais importante neste momento', bf: { C: -1, O: 1 } },
    { t: 'A oportunidade não espera — peço desculpas depois', bf: { C: -3, E: 1 } }
  ]},
  { dim: 'C', q: 'Seu aliado diz: "planejar demais mata a espontaneidade". Você responde...', ph: '⏱️ Método', opts: [
    { t: 'Discordo — improvisação sem base é imprudência disfarçada', bf: { C: 3, N: -1 } },
    { t: 'Concordo parcialmente — equilíbrio é o ideal', bf: { C: 1 } },
    { t: 'Concordo — adaptabilidade supera qualquer plano', bf: { C: -2, O: 1 } },
    { t: 'Concordo plenamente — espontaneidade é minha maior força', bf: { C: -3, E: 1 } }
  ]},
  { dim: 'C', q: 'Você percebe um erro pequeno no plano da guilda que outros ignoraram.', ph: '🔍 Detalhe', opts: [
    { t: 'Corrijo imediatamente — detalhes determinam o resultado', bf: { C: 3 } },
    { t: 'Menciono com cuidado para não atrasar o grupo', bf: { C: 2, A: 1 } },
    { t: 'Só menciono se o erro parecer crítico', bf: { C: 0 } },
    { t: 'Deixo passar — perfeccionismo cria mais problemas', bf: { C: -2, O: 1 } }
  ]},
  { dim: 'C', q: 'Como você mantém seus pertences durante uma longa campanha?', ph: '🏗️ Organização', opts: [
    { t: 'Tudo tem lugar definido — desordem externa cria caos mental', bf: { C: 3 } },
    { t: 'Organizado no essencial, flexível no resto', bf: { C: 1 } },
    { t: 'Caótico mas funcional — sei onde está tudo, do meu jeito', bf: { C: -2, O: 1 } },
    { t: 'Mínima organização — energia melhor gasta em outras coisas', bf: { C: -3, O: 1 } }
  ]},
  { dim: 'C', q: 'Você tem uma missão com prazo impossível mas a qualidade está comprometida.', ph: '⚡ Entrega', opts: [
    { t: 'Faço o extra para entregar com a qualidade correta', bf: { C: 3 } },
    { t: 'Negocio o prazo ou reduzo escopo sem sacrificar o padrão', bf: { C: 2, E: 1 } },
    { t: 'Entrego o que for possível no prazo dado', bf: { C: 0 } },
    { t: 'Mando o que tem — feito é melhor que perfeito', bf: { C: -3, E: 1 } }
  ]},
  { dim: 'C', q: 'Como você lida com objetivos de longo prazo — meses ou anos à frente?', ph: '🎯 Longo prazo', opts: [
    { t: 'Decomponho em milestones semanais e monitoro rigorosamente', bf: { C: 3 } },
    { t: 'Tenho o objetivo claro e reviso periodicamente', bf: { C: 2 } },
    { t: 'Sigo intuitivamente — objetivos rígidos me travam', bf: { C: -2, O: 1 } },
    { t: 'Raramente planejo além de algumas semanas', bf: { C: -3, O: 1 } }
  ]},
  { dim: 'C', q: 'Você está em meio a trabalho concentrado e alguém interrompe com algo não urgente.', ph: '🎯 Foco', opts: [
    { t: 'Protocolo claro: não interrompa durante trabalho focado', bf: { C: 3, A: -1 } },
    { t: 'Atendo rapidamente e retorno ao foco', bf: { C: 2 } },
    { t: 'Atendo com prazer — interrupções fazem parte da vida', bf: { C: -1, E: 1, A: 1 } },
    { t: 'Fluo com o que aparecer', bf: { C: -3, E: 1 } }
  ]},
  { dim: 'C', q: 'Antes de tomar uma decisão importante, o que você precisa?', ph: '⚖️ Decisão', opts: [
    { t: 'Todas as informações disponíveis e contingências mapeadas', bf: { C: 3, N: -1 } },
    { t: 'Informações principais e um momento de reflexão', bf: { C: 2 } },
    { t: 'Uma impressão geral — confio nos meus instintos', bf: { C: -1, O: 1 } },
    { t: 'Nada além do momento — boas decisões emergem da ação', bf: { C: -3, O: 1 } }
  ]},
  { dim: 'C', q: 'Você assume uma tarefa e no meio percebe que vai tomar o dobro do tempo estimado.', ph: '⏳ Persistência', opts: [
    { t: 'Renegocio prazos e termino com a qualidade devida', bf: { C: 3 } },
    { t: 'Persisto até o fim — começar e não terminar não é opção', bf: { C: 2, N: -1 } },
    { t: 'Avalio se vale o esforço e posso reduzir escopo', bf: { C: 0, O: 1 } },
    { t: 'Abandono se o custo ultrapassar o valor', bf: { C: -3, O: 1 } }
  ]},
  { dim: 'C', q: 'Seu espaço de trabalho reflete quem você é?', ph: '🏠 Espaço', opts: [
    { t: 'Sim — organizado, funcional, tudo em seu lugar', bf: { C: 3 } },
    { t: 'Relativamente organizado com algumas concessões ao caos', bf: { C: 1 } },
    { t: 'Caótico para os olhos de outros, funcional para mim', bf: { C: -2, O: 1 } },
    { t: 'Caótico — e honestamente, isso não me incomoda', bf: { C: -3 } }
  ]},
  { dim: 'C', q: 'Como você se sente quando alguém muda os planos no último momento?', ph: '🔀 Mudança', opts: [
    { t: 'Frustrado — planejei por razão e mudanças tardias têm custo', bf: { C: 3, N: 1 } },
    { t: 'Ligeiramente desconfortável mas adapto sem drama', bf: { C: 1 } },
    { t: 'Neutro — planos são ponto de partida, não contratos', bf: { C: -1 } },
    { t: 'Indiferente ou até animado — mudança traz novidades', bf: { C: -3, O: 1 } }
  ]},

  // ── EXTROVERSÃO (E) ── 12 perguntas
  { dim: 'E', q: 'A guilda organiza um banquete para duzentos guerreiros. Como você se sente?', ph: '🍺 Social', opts: [
    { t: 'Energizado — esse ambiente é onde me sinto mais vivo', bf: { E: 3, N: -1 } },
    { t: 'Confortável — gosto de socializar com moderação', bf: { E: 1 } },
    { t: 'Sobrecarregado — muito barulho drena minha energia', bf: { E: -2, N: 1 } },
    { t: 'Exausto só de imaginar', bf: { E: -3 } }
  ]},
  { dim: 'E', q: 'O grupo precisa urgentemente de um líder para a fase crítica da missão.', ph: '👥 Liderança', opts: [
    { t: 'Me ofereço prontamente — liderança é onde performo melhor', bf: { E: 3, A: 1 } },
    { t: 'Aceito se necessário mas prefiro dividir a responsabilidade', bf: { E: 1, A: 1 } },
    { t: 'Prefiro apoiar outro líder com minha expertise', bf: { E: -1, C: 1 } },
    { t: 'Evito ativamente — prefiro operar de forma independente', bf: { E: -3 } }
  ]},
  { dim: 'E', q: 'Após uma batalha exaustiva e vitoriosa, o que você mais precisa?', ph: '⚡ Energia', opts: [
    { t: 'Celebrar com o grupo — a energia coletiva me restaura', bf: { E: 3 } },
    { t: 'Um tempo com poucos aliados próximos', bf: { E: 1 } },
    { t: 'Um pouco de conversa, mas bastante de solidão', bf: { E: -1 } },
    { t: 'Solidão total — só assim recarrego completamente', bf: { E: -3 } }
  ]},
  { dim: 'E', q: 'Você precisa discursar para centenas de pessoas antes da batalha decisiva.', ph: '🎤 Expressão', opts: [
    { t: 'Sinto adrenalina positiva — me ilumino nessa situação', bf: { E: 3, N: -1 } },
    { t: 'Preparo bem e entrego com confiança', bf: { E: 1, C: 2 } },
    { t: 'Cumpro, mas preferia que outro falasse', bf: { E: -1, N: 1 } },
    { t: 'A ideia me causa ansiedade real', bf: { E: -3, N: 2 } }
  ]},
  { dim: 'E', q: 'Uma cidade nova, cheia de estranhos. Seu primeiro instinto é...', ph: '🏙 Cidade', opts: [
    { t: 'Me apresentar e começar a criar conexões', bf: { E: 3, A: 1 } },
    { t: 'Explorar ativamente, interagindo quando faz sentido', bf: { E: 1, O: 1 } },
    { t: 'Observar de longe antes de qualquer interação', bf: { E: -2, O: 1 } },
    { t: 'Evitar aglomerações e buscar um canto tranquilo', bf: { E: -3 } }
  ]},
  { dim: 'E', q: 'Em conversas em grupo, qual é seu papel natural?', ph: '💬 Grupo', opts: [
    { t: 'Animador e conector — mantenho a energia alta', bf: { E: 3, A: 1 } },
    { t: 'Participante ativo que também sabe escutar', bf: { E: 1 } },
    { t: 'Observador que contribui quando tem algo importante', bf: { E: -2 } },
    { t: 'Ouvinte silencioso — prefiro processar a falar', bf: { E: -3, O: 1 } }
  ]},
  { dim: 'E', q: 'Você está sozinho há vários dias numa missão de exploração. Como se sente?', ph: '🏝️ Solidão', opts: [
    { t: 'Inquieto — preciso de contato humano para funcionar', bf: { E: 3, N: 1 } },
    { t: 'Tolerável por algum tempo, mas logo começo a sentir falta', bf: { E: 1 } },
    { t: 'Confortável — o silêncio tem um valor que aprecio', bf: { E: -2, N: -1 } },
    { t: 'Revigorante — solidão é onde me recomponho', bf: { E: -3, N: -1 } }
  ]},
  { dim: 'E', q: 'Quando você tem uma descoberta empolgante, qual é seu impulso imediato?', ph: '💡 Expressão', opts: [
    { t: 'Contar para todos imediatamente', bf: { E: 3, A: 1 } },
    { t: 'Contar para as pessoas mais próximas', bf: { E: 1, A: 1 } },
    { t: 'Processar internamente primeiro', bf: { E: -2 } },
    { t: 'Guardar para mim', bf: { E: -3, N: 1 } }
  ]},
  { dim: 'E', q: 'Como você prefere receber reconhecimento por um trabalho excelente?', ph: '🏆 Reconhecimento', opts: [
    { t: 'Publicamente — ser reconhecido na frente do grupo me motiva', bf: { E: 3, N: -1 } },
    { t: 'Uma palavra sincera do líder é suficiente', bf: { E: 1, A: 1 } },
    { t: 'Prefiro reconhecimento discreto', bf: { E: -2 } },
    { t: 'O resultado em si é suficiente — não preciso de reconhecimento externo', bf: { E: -3, N: -1 } }
  ]},
  { dim: 'E', q: 'Você tem que passar uma tarde num ambiente barulhento cheio de desconhecidos.', ph: '🪩 Ambiente', opts: [
    { t: 'Aproveito — esse tipo de ambiente me estimula', bf: { E: 3 } },
    { t: 'Suporto bem e até encontro momentos bons', bf: { E: 1 } },
    { t: 'Aguento mas fico aliviado quando termina', bf: { E: -1, N: 1 } },
    { t: 'Me esgota significativamente', bf: { E: -3, N: 1 } }
  ]},
  { dim: 'E', q: 'Qual é a sua relação com o silêncio em ambientes sociais?', ph: '🤫 Silêncio', opts: [
    { t: 'Fico desconfortável — quero preencher', bf: { E: 3 } },
    { t: 'Neutro — silêncio é normal', bf: { E: 0 } },
    { t: 'Aprecio — nem toda conversa precisa de ruído', bf: { E: -2 } },
    { t: 'Prefiro silêncio a conversa superficial', bf: { E: -3, O: 1 } }
  ]},
  { dim: 'E', q: 'Como você prefere missões — em grupo grande, dupla ou solo?', ph: '🎯 Formato', opts: [
    { t: 'Grupo — a sinergia coletiva cria resultados superiores', bf: { E: 3, A: 1 } },
    { t: 'Dupla — melhor equilíbrio', bf: { E: 1 } },
    { t: 'Solo com ponto de contato', bf: { E: -2, C: 1 } },
    { t: 'Solo — variáveis que não controlo são riscos', bf: { E: -3, C: 1 } }
  ]},

  // ── AMABILIDADE (A) ── 12 perguntas
  { dim: 'A', q: 'Um inimigo derrotado jaz a seus pés e implora por misericórdia.', ph: '❤️ Misericórdia', opts: [
    { t: 'Concedo — todo ser carrega a possibilidade de redenção', bf: { A: 3, O: 1 } },
    { t: 'Analiso o contexto antes de decidir', bf: { A: 1, C: 1 } },
    { t: 'Prendo ou neutralizo — sem crueldade desnecessária', bf: { A: -1, C: 1 } },
    { t: 'Ameaças eliminadas não voltam — hesitação tem custo', bf: { A: -3, N: -1 } }
  ]},
  { dim: 'A', q: 'Seu aliado está cometendo um erro que vai prejudicá-lo seriamente.', ph: '🗣️ Honestidade', opts: [
    { t: 'Digo a verdade com cuidado — o bem-estar dele é prioridade', bf: { A: 3 } },
    { t: 'Digo diretamente, mesmo que doa um pouco', bf: { A: 1, E: 1 } },
    { t: 'Aguardo o momento certo para abordar', bf: { A: 1, C: 1 } },
    { t: 'Deixo que descubra por conta — é o caminho dele', bf: { A: -2, E: -1 } }
  ]},
  { dim: 'A', q: 'Dois membros do grupo entram em conflito sério que ameaça a coesão.', ph: '⚖️ Conflito', opts: [
    { t: 'Medeio ativamente — a unidade é responsabilidade de todos', bf: { A: 3, E: 1 } },
    { t: 'Ouço cada lado com profundidade e imparcialidade', bf: { A: 2, E: -1 } },
    { t: 'Dou minha opinião direta sobre quem está errado', bf: { A: -1, E: 1 } },
    { t: 'Deixo que resolvam — intervenção gera dependência', bf: { A: -3, O: 1 } }
  ]},
  { dim: 'A', q: 'Você discorda profundamente de uma decisão do líder, mas o grupo já aceitou.', ph: '🤝 Cooperação', opts: [
    { t: 'Apoio — harmonia do grupo supera minha opinião individual', bf: { A: 3 } },
    { t: 'Expresso minha discordância e então coopero', bf: { A: 1, E: 1 } },
    { t: 'Coopero minimamente', bf: { A: -1 } },
    { t: 'Ajo como acho certo — grupos que erram pagam o preço', bf: { A: -3, E: 1 } }
  ]},
  { dim: 'A', q: 'Um viajante ferido no caminho pede ajuda, mas sua missão é urgente.', ph: '🤲 Ajuda', opts: [
    { t: 'Ajudo completamente — a vida humana sempre tem prioridade', bf: { A: 3, C: -1 } },
    { t: 'Estabilizo e chamo socorro antes de prosseguir', bf: { A: 2, C: 1 } },
    { t: 'Indico o caminho mais próximo para ajuda e sigo', bf: { A: 1, C: 2 } },
    { t: 'A missão não pode esperar — cada um tem seu destino', bf: { A: -3, C: 1 } }
  ]},
  { dim: 'A', q: 'Como você lida quando seu interesse pessoal conflita com o do grupo?', ph: '🎯 Prioridade', opts: [
    { t: 'O grupo vem primeiro — interesse pessoal é secundário', bf: { A: 3 } },
    { t: 'Busco equilíbrio que funcione para os dois lados', bf: { A: 1, E: 1 } },
    { t: 'Depende da magnitude', bf: { A: -1, O: 1 } },
    { t: 'Priorizo meu objetivo — fui honesto sobre isso', bf: { A: -3, C: 1 } }
  ]},
  { dim: 'A', q: 'Você e um aliado disputam os únicos recursos para concluir a missão.', ph: '⚔️ Competição', opts: [
    { t: 'Cedo ou divido — a relação vale mais', bf: { A: 3 } },
    { t: 'Negocio uma divisão justa', bf: { A: 2, E: 1 } },
    { t: 'Argumento com lógica — o mais capaz deve ter os recursos', bf: { A: -2, C: 1 } },
    { t: 'Tomo o que preciso — missão é missão', bf: { A: -3, N: -1 } }
  ]},
  { dim: 'A', q: 'Um aliado que você não gosta muito está claramente em dificuldade emocional.', ph: '🫂 Empatia', opts: [
    { t: 'Me aproximo espontaneamente — dificuldade supera desentendimento', bf: { A: 3 } },
    { t: 'Ofereço ajuda de forma discreta e respeitosa', bf: { A: 2 } },
    { t: 'Dou espaço — cada um resolve do seu jeito', bf: { A: -1 } },
    { t: 'Não me envolvo — relações difíceis têm limites', bf: { A: -3 } }
  ]},
  { dim: 'A', q: 'Como você dá feedback quando precisa apontar falhas graves?', ph: '📝 Feedback', opts: [
    { t: 'Com muito cuidado — o impacto emocional importa', bf: { A: 3 } },
    { t: 'Claro e direto, mas com respeito', bf: { A: 1, E: 1 } },
    { t: 'Direto ao ponto — a pessoa precisa da verdade', bf: { A: -1, C: 1 } },
    { t: 'Com brutal honestidade — suavizar prejudica', bf: { A: -3, E: 1 } }
  ]},
  { dim: 'A', q: 'Você alcança uma vitória que dependeu muito da contribuição de um aliado.', ph: '🏆 Crédito', opts: [
    { t: 'Destaco a contribuição do aliado antes do reconhecimento próprio', bf: { A: 3, E: 1 } },
    { t: 'Compartilho o crédito naturalmente', bf: { A: 2 } },
    { t: 'Cada um recebe o que lhe cabe — incluindo eu', bf: { A: 0 } },
    { t: 'A vitória foi conquistada — detalhes são secundários', bf: { A: -2 } }
  ]},
  { dim: 'A', q: 'Alguém tenta manipulá-lo com apelo emocional para um favor injusto.', ph: '🎭 Manipulação', opts: [
    { t: 'Cedo com compaixão — fico com dúvida sobre quem está necessitado', bf: { A: 2, N: 1 } },
    { t: 'Ouço com cuidado e separo o emocional do que é justo', bf: { A: 1, C: 1 } },
    { t: 'Identifico a manipulação e mantenho minha posição', bf: { A: -1, E: 1 } },
    { t: 'Corto o jogo imediatamente', bf: { A: -3, N: -1 } }
  ]},
  { dim: 'A', q: 'Como você age quando tem informação que dá vantagem competitiva sobre aliados?', ph: '📊 Informação', opts: [
    { t: 'Compartilho — informação guardada corrói a confiança', bf: { A: 3 } },
    { t: 'Compartilho quando é relevante para todos', bf: { A: 2 } },
    { t: 'Compartilho seletivamente', bf: { A: -1 } },
    { t: 'Guardo — vantagem informacional é poder legítimo', bf: { A: -3, O: 1 } }
  ]},

  // ── NEUROTICISMO (N) ── 12 perguntas
  { dim: 'N', q: 'A missão falhou. Você foi o responsável pela decisão errada.', ph: '💔 Falha', opts: [
    { t: 'Processo rapidamente e foco em como corrigir', bf: { N: -3, C: 1 } },
    { t: 'O peso é real, mas sei que fracasso faz parte', bf: { N: -1, O: 1 } },
    { t: 'Me sinto responsável por um tempo antes de seguir', bf: { N: 2, A: 1 } },
    { t: 'Me machuca profundamente — passo dias reprocessando', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Seu destino é completamente incerto. Os próximos meses serão imprevisíveis.', ph: '🌊 Incerteza', opts: [
    { t: 'Vejo potencial — incerteza é onde oportunidades se escondem', bf: { N: -3, O: 2 } },
    { t: 'Me preparo e aceito o que não posso controlar', bf: { N: -1, C: 2 } },
    { t: 'A incerteza pesa, mas aprendi a funcionar assim', bf: { N: 1 } },
    { t: 'É paralisante — minha mente entra em loop negativo', bf: { N: 3, O: -1 } }
  ]},
  { dim: 'N', q: 'O grupo te olha esperando uma decisão em segundos numa crise total.', ph: '🔥 Pressão', opts: [
    { t: 'Respiro fundo e decido com frieza — pressão me afina', bf: { N: -3, C: 1 } },
    { t: 'A responsabilidade pesa, mas ajo com determinação', bf: { N: 1, C: 2 } },
    { t: 'Sinto o peso mas empurro — depois processo', bf: { N: 2 } },
    { t: 'Fico paralisado por instantes antes de agir', bf: { N: 3, E: -1 } }
  ]},
  { dim: 'N', q: 'Como você lida com pensamentos preocupantes antes de dormir?', ph: '🌙 Pensamentos', opts: [
    { t: 'Durmo sem dificuldade — separo o que posso controlar', bf: { N: -3 } },
    { t: 'Às vezes penso mais, mas em geral durmo bem', bf: { N: -1 } },
    { t: 'Com certa frequência fico ruminando por bastante tempo', bf: { N: 2 } },
    { t: 'Com muita frequência — minha mente não desliga', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Algo inesperado sabota seu plano perfeito no momento crítico.', ph: '⚡ Imprevisto', opts: [
    { t: 'Adapto sem drama — planos são guias, não contratos', bf: { N: -3, O: 1 } },
    { t: 'Fico frustrado por alguns minutos, depois sigo', bf: { N: 0 } },
    { t: 'Me desestabilizo mas consigo me recompor', bf: { N: 2 } },
    { t: 'Sinto um colapso momentâneo', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Como você se sente geralmente antes de uma batalha decisiva?', ph: '⚔️ Véspera', opts: [
    { t: 'Calmo e focado — o que vier, lido quando vier', bf: { N: -3, C: 1 } },
    { t: 'Ligeiramente tenso mas confiante', bf: { N: -1, C: 2 } },
    { t: 'Ansioso mas funcional — uso a tensão como combustível', bf: { N: 2, E: 1 } },
    { t: 'Muito ansioso — pensamentos sobre o que pode dar errado dominam', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Alguém que você respeita critica seu trabalho de forma dura e pública.', ph: '🛡️ Crítica', opts: [
    { t: 'Processo a crítica de forma racional e extraio o útil', bf: { N: -3, O: 1 } },
    { t: 'Doe por um momento mas logo avalio com objetividade', bf: { N: -1, C: 1 } },
    { t: 'Fico abalado por um tempo', bf: { N: 2 } },
    { t: 'Me afeta profundamente — crítica pública é especialmente difícil', bf: { N: 3, E: -1 } }
  ]},
  { dim: 'N', q: 'Qual é a frequência com que você revive situações passadas?', ph: '🔄 Ruminação', opts: [
    { t: 'Raramente — analiso, extraio a lição e sigo', bf: { N: -3, C: 1 } },
    { t: 'Às vezes, mas sem me prender', bf: { N: -1 } },
    { t: 'Com frequência — situações passadas voltam automaticamente', bf: { N: 2 } },
    { t: 'Muito frequentemente — minha mente revisita erros facilmente', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Várias coisas importantes são incertas ao mesmo tempo na sua vida.', ph: '🌀 Caos', opts: [
    { t: 'Funciono bem — caos externo raramente abala meu equilíbrio', bf: { N: -3, C: 1 } },
    { t: 'É desafiador mas consigo manter a funcionalidade', bf: { N: -1 } },
    { t: 'Minha performance cai e preciso de mais esforço', bf: { N: 2 } },
    { t: 'Tenho dificuldade real — caos acumulado me sobrecarrega', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Alguém próximo está passando por momento emocionalmente muito intenso.', ph: '🧲 Contágio', opts: [
    { t: 'Consigo apoiar sem absorver a emoção', bf: { N: -3, A: 2 } },
    { t: 'Me afeto um pouco mas mantenho perspectiva', bf: { N: -1, A: 2 } },
    { t: 'Absorvo bastante da emoção alheia', bf: { N: 2, A: 2 } },
    { t: 'Me afeto muito — emoções alheias entram em mim', bf: { N: 3, A: 2 } }
  ]},
  { dim: 'N', q: 'Como descreveria a variação do seu humor ao longo de um dia difícil?', ph: '🎢 Humor', opts: [
    { t: 'Estável — circunstâncias externas raramente afetam', bf: { N: -3 } },
    { t: 'Varia moderadamente mas volta ao equilíbrio', bf: { N: -1 } },
    { t: 'Varia bastante — dias difíceis têm altos e baixos', bf: { N: 2 } },
    { t: 'Varia muito — posso estar ótimo e completamente diferente horas depois', bf: { N: 3 } }
  ]},
  { dim: 'N', q: 'Você está prestes a fazer algo importante que pode dar muito errado.', ph: '💓 Físico', opts: [
    { t: 'Sem reação notável — meu sistema nervoso lida silenciosamente', bf: { N: -3, C: 1 } },
    { t: 'Leve tensão que desaparece quando a ação começa', bf: { N: -1 } },
    { t: 'Reações físicas perceptíveis que me acompanham', bf: { N: 2 } },
    { t: 'Reações físicas intensas — coração acelerado, tensão muscular', bf: { N: 3 } }
  ]},

  // ── PERGUNTAS IPSATIVAS (zero desejabilidade social) ────────
  { dim: 'E', q: 'A missão fracassou. O líder sumiu e dezessete pessoas olham para você esperando uma direção. Você não planejou isso.', ph: '⚡ Liderança', opts: [
    { t: 'Assumo o comando imediatamente. Análise vem depois — agora precisa de ação.', bf: { E: 3, C: -1, Imp: 2 } },
    { t: 'Identifico quem tem mais experiência e proponho que ele lidere, oferecendo suporte.', bf: { E: 1, A: 2, C: 1 } },
    { t: 'Faço perguntas ao grupo para mapear recursos e habilidades antes de qualquer decisão.', bf: { E: -1, C: 3, QI: 1 } },
    { t: 'Foco na minha função específica. Liderança improvisada cria mais caos.', bf: { E: -2, C: 2, N: 1 } },
    { t: 'Processo o fracasso internamente. Não consigo guiar outros enquanto ainda estou processando o que deu errado.', bf: { E: -3, N: 3, Imp: -2 }, isSkip: true }
  ]},
  { dim: 'E', q: 'Um nobre humilha publicamente um servo inocente na sua frente. Trinta pessoas assistem em silêncio.', ph: '👁️ Confronto', opts: [
    { t: 'Confronto o nobre diretamente. Humilhação pública exige resposta pública.', bf: { E: 3, A: 2, N: -1 } },
    { t: 'Crio uma distração inteligente que encerra a situação sem confronto direto.', bf: { E: 1, O: 2, C: 2 } },
    { t: 'Anoto mentalmente e reporto às autoridades competentes depois — com evidências.', bf: { E: -1, C: 2, N: 1 } },
    { t: 'Aproximo-me do servo discretamente depois e ofereço suporte real.', bf: { E: -1, A: 3, IE: 1 } },
    { t: 'Uso informação que tenho sobre o nobre para forçar o fim da humilhação de forma indireta.', bf: { E: 1, A: -2, IE: 3, N: -1 } },
    { t: 'Olho para outro lado. Confrontar nobreza tem custos que não posso pagar agora.', bf: { E: -3, N: 2, A: -1 }, isSkip: true }
  ]},
  { dim: 'C', q: 'Sua guilda recebeu uma missão com prazo impossível. Para cumprir, você precisaria ou violar protocolos de segurança ou entregar um trabalho incompleto.', ph: '⏳ Prazo Crítico', opts: [
    { t: 'Renegocio o prazo. Resultado comprometido compromete a reputação — prefiro a tensão da negociação.', bf: { C: 3, E: 1, A: -1 } },
    { t: 'Completo o que consigo com máxima qualidade e entrego parcialmente com relatório honesto.', bf: { C: 2, A: 2, E: -1 } },
    { t: 'Improviso dentro do prazo. Perfeição é inimiga da entrega — versão boa agora vale mais que perfeita depois.', bf: { C: -2, O: 2, Imp: 2 } },
    { t: 'Terceirizo silenciosamente parte do trabalho e apresento como nosso. Resultado é o que importa.', bf: { C: -3, A: -2, IE: 2, N: -1 } },
    { t: 'Informo o cliente do problema e aguardo nova instrução sem tomar nenhuma ação unilateral.', bf: { C: -1, N: 2, E: -2, Imp: -2 }, isSkip: true }
  ]},
  { dim: 'C', q: 'Você descobriu que um método proibido pela guilda resolveria o problema de centenas de pessoas. A proibição existe por razões burocráticas, não éticas.', ph: '📜 Regras vs Resultado', opts: [
    { t: 'Sigo a regra. Não sou juiz das normas — sou executor. Minha consistência é meu valor central.', bf: { C: 3, O: -2, A: -1 } },
    { t: 'Aplico o método e assino embaixo. Se a regra é burocrática, a responsabilidade moral é minha.', bf: { C: -2, A: 3, N: 2 } },
    { t: 'Inicio formalmente o processo de revisão da regra antes de qualquer ação — dentro do sistema.', bf: { C: 2, E: 1, O: 1 } },
    { t: 'Aplico discretamente sem registrar. Bons resultados pedem perdão, não permissão.', bf: { C: -3, O: 2, IE: 2, N: -1 } },
    { t: 'Consulto três seniors antes de decidir qualquer coisa. Decisões assim precisam de cobertura.', bf: { C: 1, A: 1, E: -1 } },
    { t: 'Documento o dilema em relatório interno e não ajo. Não é minha função resolver contradições sistêmicas.', bf: { C: 1, E: -2, N: 1, Imp: -3 }, isSkip: true }
  ]},
  { dim: 'A', q: 'Um mercador aliado foi pego roubando para pagar o tratamento médico da filha. A punição padrão é exílio severo. O conselho exige seu voto.', ph: '⚖️ Dilema Moral', opts: [
    { t: 'A lei é o pilar da civilização. Voto pelo exílio, mas pago o tratamento da menina do meu bolso.', bf: { C: 3, A: -1, QI: 1 } },
    { t: 'O contexto justifica a exceção. Voto por um perdão silencioso para não expor a guilda.', bf: { A: 3, C: -2, IE: 1 } },
    { t: 'Chantageio o conselho com segredos que tenho deles para forçar a absolvição.', bf: { A: -3, IE: 3, N: -2 } },
    { t: 'Voto pelo exílio, mas ofereço recrutar o mercador secretamente como informante da rede subterrânea.', bf: { O: 2, A: -2, Proj: 2 } },
    { t: 'Me abstenho. Isso é política interna e não fui contratado para julgar a vida privada dos outros.', bf: { E: -3, N: 1, Imp: -2, IE: -1 }, isSkip: true }
  ]},
  { dim: 'A', q: 'Um parceiro de longa data sabotou sua missão por inveja. Você descobriu. Ele não sabe que você sabe.', ph: '🗡️ Traição', opts: [
    { t: 'Confronto diretamente. Relacionamentos não sobrevivem a traições que não são nomeadas.', bf: { A: -1, E: 2, N: 1 } },
    { t: 'Ofereço uma "última chance" anônima — faço perguntas que deixam claro que sei, sem acusar.', bf: { A: 1, IE: 3, O: 1 } },
    { t: 'Perdoo silenciosamente. A pessoa provavelmente está sofrendo mais do que eu.', bf: { A: 3, N: -1, C: -1 } },
    { t: 'Guardo a informação. Um inimigo que se acredita aliado é o adversário mais controlável.', bf: { A: -3, IE: 3, N: -2, C: 2 } },
    { t: 'Reporto formalmente à guilda. Traição é risco coletivo, não questão pessoal.', bf: { A: -1, C: 2, E: 1 } },
    { t: 'Afasto-me gradualmente sem explicação. Confronto direto me paralisa e eu preciso de distância.', bf: { A: 1, E: -3, N: 2 }, isSkip: true }
  ]},
  { dim: 'N', q: 'Você falhou. A missão que parecia definir sua identidade colapsou por um erro seu. Silêncio ao redor.', ph: '💀 Fracasso', opts: [
    { t: 'Analiso o erro imediatamente. Fracasso sem análise é fracasso desperdiçado.', bf: { N: -2, C: 2, O: 1 } },
    { t: 'Permito sentir o peso completamente antes de qualquer análise. Primeiro o luto, depois a lição.', bf: { N: 2, A: 1, O: 2 } },
    { t: 'Comunico o fracasso ao grupo e proponho próximos passos imediatamente.', bf: { N: -1, E: 2, C: 1 } },
    { t: 'Identifico quem mais contribuiu para o fracasso. A responsabilidade raramente é individual.', bf: { N: -2, A: -2, IE: 2 } },
    { t: 'Isolo-me até que a intensidade do sentimento passe. Não consigo funcionar quando estou assim.', bf: { N: 3, E: -3, Imp: -2 }, isSkip: true }
  ]},
  { dim: 'N', q: 'No meio da batalha você percebe que seu plano tem uma falha crítica. Mudar agora expõe o grupo. Não mudar também.', ph: '⚔️ Pressão Total', opts: [
    { t: 'Adapto em tempo real sem comunicar — execução limpa é mais segura que debate em campo de batalha.', bf: { N: -3, C: 2, Imp: 2 } },
    { t: 'Sinalizo discretamente para meu parceiro mais próximo e ajustamos juntos em segundos.', bf: { N: -1, E: 2, A: 1 } },
    { t: 'Executo o plano original. Mudanças sob pressão geram mais caos do que falhas previstas.', bf: { N: -2, C: 3, A: -1 } },
    { t: 'Peço para alguém que confio que tome a decisão — eu sustento qualquer escolha que fizer.', bf: { N: 2, E: -2, A: 1 } },
    { t: 'A ansiedade me paralisa por segundos críticos — percebo mas o corpo não responde.', bf: { N: 3, Imp: -3, E: -2 }, isSkip: true }
  ]},

  // ── DILEMAS BINÁRIOS ── 6 perguntas extremas
  { dim: 'A', type: 'binary', q: '⚡ Dilema da Alma', ph: '⚡ Dilema', opts: [
    { ico: '⚔️', lbl: 'O Código Acima de Tudo', t: 'Você elimina um aliado que traiu o grupo para salvar a própria família. Traição é traição — sem exceções.', bf: { A: -3, C: 3, N: -2 } },
    { ico: '❤️', lbl: 'Família Acima do Código', t: 'Você entende e perdoa — família sempre vem primeiro, e qualquer um de nós teria feito o mesmo.', bf: { A: 3, C: -2, N: 1 } }
  ]},
  { dim: 'N', type: 'binary', q: '⚡ O Cálculo Impossível', ph: '⚡ Dilema', opts: [
    { ico: '⚖️', lbl: 'O Bem Maior', t: 'Você destrói um vilão poderoso, sabendo que 100 inocentes morrerão como consequência.', bf: { N: -2, A: -2, C: 2 } },
    { ico: '🛡️', lbl: 'A Linha que Não Cruza', t: 'Você não faz. Não existe cálculo que justifique sacrificar inocentes.', bf: { A: 3, N: 2, C: 1 } }
  ]},
  { dim: 'O', type: 'binary', q: '⚡ Maestria ou Amplitude?', ph: '⚡ Dilema', opts: [
    { ico: '⬇️', lbl: 'Aprofunda', t: '5 minutos para decidir: você aprofunda uma habilidade que já domina. Maestria supera novidade.', bf: { O: -2, C: 3 } },
    { ico: '🌍', lbl: 'Explora', t: '5 minutos para decidir: você aprende algo completamente novo. Amplitude mantém você relevante.', bf: { O: 3, C: -2 } }
  ]},
  { dim: 'E', type: 'binary', q: '⚡ O Custo da Missão', ph: '⚡ Dilema', opts: [
    { ico: '🔥', lbl: 'Você Avança', t: 'A missão exige liderar publicamente um esforço de alto risco com visibilidade máxima.', bf: { E: 3, N: -1 } },
    { ico: '🌑', lbl: 'Você Opera nas Sombras', t: 'A missão exige que outra pessoa seja a face pública enquanto você executa por trás.', bf: { E: -3, C: 1 } }
  ]},
  { dim: 'C', type: 'binary', q: '⚡ Certeza vs. Oportunidade', ph: '⚡ Dilema', opts: [
    { ico: '📋', lbl: 'Plano Primeiro', t: 'Você só age quando tem plano sólido, recursos mapeados e riscos calculados.', bf: { C: 3, O: -1, N: -1 } },
    { ico: '⚡', lbl: 'Age Primeiro', t: 'Você entra e descobre o que precisa no caminho. Planos perfeitos não existem.', bf: { C: -3, O: 2, N: 1 } }
  ]},
  { dim: 'A', type: 'binary', q: '⚡ Lealdade ou Verdade?', ph: '⚡ Dilema', opts: [
    { ico: '🤝', lbl: 'Lealdade', t: 'Seu aliado está publicamente errado. Você o defende — traí-lo em público é pior.', bf: { A: 3, C: 1 } },
    { ico: '⚖️', lbl: 'Verdade', t: 'Você o corrige publicamente com respeito. A verdade protege mais que a lealdade cega.', bf: { A: -1, O: 2, N: -1 } }
  ]},

  // ── QUESTÕES IPSATIVAS ANTI-DESEJABILIDADE SOCIAL ──────────
  // Nenhuma opção é moralmente superior.
  // Opções de alto A/C têm custo real embutido na narrativa.
  // Opções de baixo A/C são enquadradas como racionais e auto-protetoras.

  { dim: 'A', q: 'Você descobre que seu aliado mais próximo roubou do tesouro da guilda — não por ganância, mas para pagar o tratamento médico do filho. O mestre da guilda pede um relatório de lealdade hoje. Você...', ph: '🔒 Traição Necessária', opts: [
    { t: 'Reporto tudo com exatidão. As regras existem por razão — proteger exceções destrói o sistema para todos', bf: { C: 3, A: -3 } },
    { t: 'Cubro para ele, assumindo o risco pessoalmente caso seja descoberto. Lealdade tem preço — e estou disposto a pagá-lo', bf: { A: 3, N: 2, C: -2 } },
    { t: 'Aviso antes de reportar, dando 48h para ele se entregar sozinho. Cumpro minha obrigação sem destruir a relação', bf: { C: 2, A: 1 } },
    { t: 'Uso a informação para negociar uma posição melhor para mim dentro da guilda. Por que eu deveria pagar pelo erro dele?', bf: { A: -3, C: 1, N: 1 } },
    { t: 'Finjo que não vi. Não tenho condições emocionais de tomar essa decisão', bf: { N: 3, C: -2 }, isSkip: true }
  ]},

  { dim: 'C', q: 'Sua missão é destruir um depósito de armas inimigo. Inteligência confirma: a explosão matará 3 civis que não podem ser evacuados a tempo. Sem destruir o depósito, 200 soldados morrerão na ofensiva da próxima semana. Você...', ph: '⚖️ Aritmética Moral', opts: [
    { t: 'Executo como planejado. Três mortes para salvar duzentas é uma equação que qualquer comandante racional resolve da mesma forma', bf: { C: 3, A: -3, N: -1 } },
    { t: 'Cancelo e busco outra solução. Não existe missão que justifique matar diretamente inocentes — mesmo que o custo seja enorme', bf: { A: 3, C: -3, N: 1 } },
    { t: 'Atraso a missão para tentar evacuar os civis, mesmo que isso reduza a probabilidade de sucesso da operação', bf: { A: 2, C: -1, N: 2 } },
    { t: 'Executo, mas repasso a decisão para o comando superior. Cumprir ordens e transferir a responsabilidade moral é a saída mais funcional', bf: { C: 1, A: -1, N: -1 } },
    { t: 'Recuso a missão inteiramente. Não vou carregar isso, independente das consequências táticas', bf: { N: 3, A: 1, C: -3 }, isSkip: true }
  ]},

  { dim: 'E', q: 'Você resolveu sozinho o problema que salvou toda a campanha. Mas seu comandante carismático está recebendo todo o crédito publicamente, na frente de centenas de pessoas. Corrigir o registro vai constrangê-lo e criar tensão no grupo. Você...', ph: '🏆 O Crédito Roubado', opts: [
    { t: 'Corrijo o registro na hora. Se eu não defendo minha própria realidade, ninguém fará — e mentiras institucionalizadas criam cultura tóxica', bf: { E: 3, A: -2, C: 1 } },
    { t: 'Deixo passar publicamente, mas converso com ele em particular. A harmonia do grupo vale mais que reconhecimento pessoal agora', bf: { A: 2, E: -1, C: 1 } },
    { t: 'Absorvo a injustiça em silêncio. Quem realmente importa já sabe a verdade — eu não preciso de palco', bf: { A: 3, E: -2, N: 1 } },
    { t: 'Deixo a narrativa se solidificar, mas registro a dívida social. Na hora certa, cobro com juros', bf: { A: -2, C: 2, N: -1 } },
    { t: 'Saio de cena. Ambientes que recompensam quem grita mais alto não merecem meu talento', bf: { E: -3, N: 2 }, isSkip: true }
  ]},

  { dim: 'N', q: 'Você testemunhou um nobre poderoso cometer um crime grave. Testemunhar publicamente destruiria o culpado — mas ele controla o sustento da sua família e pode agir com represálias. A vítima não tem outra testemunha. Você...', ph: '⚔️ A Testemunha', opts: [
    { t: 'Testemunho publicamente, aceitando as consequências. Se cada pessoa fizer o cálculo da conveniência, nenhum sistema de justiça sobrevive', bf: { A: 2, C: 2, N: 3 } },
    { t: 'Testemunho de forma anônima, protegendo minha família mas contribuindo o que posso', bf: { C: 2, A: 1, N: 1 } },
    { t: 'Negocio garantias de segurança antes de qualquer depoimento. Heroísmo sem proteção é imprudência — não virtude', bf: { C: 2, A: -1, N: -1 } },
    { t: 'Fico em silêncio. Preservar a minha família não é covardia — é responsabilidade com quem realmente depende de mim', bf: { A: -2, N: -2, C: 1 } },
    { t: 'Documento tudo em segredo e espero o momento certo. Agir agora seria queimar o único trunfo que tenho', bf: { C: 1, A: -1, N: -1 }, isSkip: true }
  ]},

  { dim: 'O', q: 'Você encontrou prova de que o rei — amado, eficaz, o único mantendo o reino unido — não é quem diz ser. Toda a sua legitimidade é uma mentira construída há décadas. Revelar isso agora colapsa o reino. Esconder preserva a ordem, mas perpetua a fraude. Você...', ph: '👑 O Segredo do Rei', opts: [
    { t: 'Revelo tudo. A estabilidade construída sobre mentira não é estabilidade — é uma bomba com timer desconhecido', bf: { O: 3, A: -1, C: 1 } },
    { t: 'Confronto o rei em privado e negocio uma transição de poder ordenada. A verdade pode ser gerenciada sem caos', bf: { C: 3, A: 1, O: 1 } },
    { t: 'Entrego para um conselho de confiança e me retiro da decisão. Responsabilidade difusa é mais segura que heroísmo solitário', bf: { C: 2, A: 1, N: -1 } },
    { t: 'Entero a prova para sempre. Alguns fatos não servem ninguém. O rei funciona — isso é o que importa', bf: { O: -3, A: -1, C: -1 } },
    { t: 'Guardo como alavancagem permanente. Informação é poder — e poder bem usado move mais que verdade mal revelada', bf: { A: -3, N: 1, C: 2 } }
  ]}
];

// ── COGNITIVE QUESTIONS (Race scoring) ──────────────────────
// 30 itens (6 por dimensão), balanceados em direção: cada dimensão
// tem opções que pontuam alto E baixo, reduzindo aquiescência.
export const QUESTIONS_COGNITIVE = [
  // QI Fluido (6 perguntas)
  { dim: 'QI', q: 'Quando confrontado com um problema complexo nunca visto, sua mente...', ph: '🧠 Raciocínio', opts: [
    { t: 'Decompõe em partes menores e encontra padrões — instintivamente', bf: { QI: 3 } },
    { t: 'Busca analogias com problemas que já resolveu', bf: { QI: 1, Foco: 1 } },
    { t: 'Sente a resposta antes de formalizá-la logicamente', bf: { Proj: 2, QI: -1 } },
    { t: 'Age primeiro e entende o problema resolvendo-o na prática', bf: { Imp: 2, QI: -2 } }
  ]},
  { dim: 'QI', q: 'Em uma discussão técnica, você naturalmente...', ph: '🔬 Análise', opts: [
    { t: 'Identifica falhas lógicas que outros não percebem', bf: { QI: 3, IE: -1 } },
    { t: 'Conecta a discussão com o impacto humano e emocional', bf: { IE: 3, QI: -1 } },
    { t: 'Foco nos detalhes práticos e na execução', bf: { Foco: 2 } },
    { t: 'Trago uma perspectiva completamente diferente que ninguém considerou', bf: { Proj: 2, QI: 1 } }
  ]},
  { dim: 'QI', q: 'Jogos de estratégia e quebra-cabeças lógicos para você são...', ph: '♟️ Lógica', opts: [
    { t: 'Meu habitat natural — penso em movimentos à frente naturalmente', bf: { QI: 3 } },
    { t: 'Interessantes quando envolvo outros no processo', bf: { IE: 2, QI: 1 } },
    { t: 'Entediantes — prefiro desafios físicos ou sociais', bf: { Imp: 2, QI: -2 } },
    { t: 'Funcionam melhor quando posso usar intuição em vez de lógica pura', bf: { Proj: 2 } }
  ]},
  { dim: 'QI', q: 'Quando aprende um sistema novo (jogo, software, idioma), você...', ph: '📐 Sistemas', opts: [
    { t: 'Mapeia a estrutura subjacente antes de usar — quero entender as regras', bf: { QI: 3, Foco: 1 } },
    { t: 'Pratico repetidamente até dominar pela memória muscular', bf: { Foco: 3, QI: -1 } },
    { t: 'Experimento de tudo e descubro fazendo, sem manual', bf: { Imp: 2, Proj: 1 } },
    { t: 'Peço para alguém me ensinar e aprendo pela interação', bf: { IE: 2 } }
  ]},
  { dim: 'QI', q: 'Um enigma rúnico guarda a porta: os símbolos mudam segundo uma regra oculta. O grupo espera.', ph: '🧩 Padrões', opts: [
    { t: 'Vejo a regra após observar duas ou três transições — padrões saltam aos meus olhos', bf: { QI: 3 } },
    { t: 'Testo hipóteses uma a uma até achar a que encaixa', bf: { QI: 1, Foco: 1 } },
    { t: 'Tento combinações na prática até a porta ceder', bf: { Imp: 2, QI: -1 } },
    { t: 'Chamo quem é bom nisso — meu valor está em outra coisa', bf: { QI: -2, IE: 1 } }
  ]},
  { dim: 'QI', q: 'Explicam-lhe um mecanismo complexo uma única vez, depressa, sem repetir.', ph: '⚙️ Abstração', opts: [
    { t: 'Reconstruo o modelo inteiro de cabeça e já aponto onde ele vai falhar', bf: { QI: 3 } },
    { t: 'Capto o essencial; o resto eu aprendo operando', bf: { QI: 1, Imp: 1 } },
    { t: 'Preciso ver funcionando passo a passo algumas vezes', bf: { QI: -2, Foco: 2 } },
    { t: 'Entendo melhor conversando — pergunto até o modelo se formar', bf: { QI: -1, IE: 1 } }
  ]},
  // Pensamento Divergente (6 perguntas)
  { dim: 'Proj', q: 'Quando olha para uma obra de arte abstrata, você...', ph: '🎨 Percepção', opts: [
    { t: 'Vê imagens, histórias e emoções que outros não percebem', bf: { Proj: 3 } },
    { t: 'Analisa a técnica e composição com olhar estrutural', bf: { QI: 2, Proj: -1 } },
    { t: 'Sinto algo mas não consigo articular o quê', bf: { Proj: 2, IE: 1 } },
    { t: 'Não me afeta — arte abstrata não comunica nada pra mim', bf: { Proj: -3, Foco: 1 } }
  ]},
  { dim: 'Proj', q: 'Seus sonhos noturnos tendem a ser...', ph: '🌙 Sonhos', opts: [
    { t: 'Vívidos, simbólicos e frequentemente significativos', bf: { Proj: 3 } },
    { t: 'Presentes mas sem importância especial', bf: { Proj: 0 } },
    { t: 'Raros — raramente lembro dos meus sonhos', bf: { Proj: -2, Foco: 1 } },
    { t: 'Intensos e emocionais — acordei perturbado mais de uma vez', bf: { Proj: 2, IE: 1 } }
  ]},
  { dim: 'Proj', q: 'Quando conhece alguém novo, o que você percebe primeiro?', ph: '👁️ Leitura', opts: [
    { t: 'O que não está sendo dito — tensões, inseguranças, máscaras', bf: { Proj: 3, IE: 1 } },
    { t: 'A dinâmica de poder e posição social', bf: { IE: 2, QI: 1 } },
    { t: 'Dados concretos — nome, profissão, contexto', bf: { Foco: 2, Proj: -2 } },
    { t: 'A energia geral — se me sinto confortável ou não', bf: { Proj: 1, IE: 1 } }
  ]},
  { dim: 'Proj', q: 'Você já teve "pressentimentos" que se confirmaram sem explicação lógica?', ph: '🔮 Intuição', opts: [
    { t: 'Frequentemente — e aprendi a confiar neles', bf: { Proj: 3 } },
    { t: 'Algumas vezes, mas não sei se é coincidência', bf: { Proj: 1 } },
    { t: 'Raramente — prefiro dados a pressentimentos', bf: { Proj: -2, QI: 2 } },
    { t: 'Nunca — isso não faz parte da minha experiência', bf: { Proj: -3, Foco: 1 } }
  ]},
  { dim: 'Proj', q: 'Dão-lhe um tijolo e pedem todos os usos possíveis em um minuto.', ph: '🧱 Divergência', opts: [
    { t: 'Listo dezenas — de peso de porta a instrumento de percussão; as ideias não param', bf: { Proj: 3 } },
    { t: 'Cinco ou seis usos práticos e sólidos', bf: { Proj: -1, Foco: 1 } },
    { t: 'Travo — minha mente procura o uso CERTO, não vários', bf: { Proj: -3, Foco: 2 } },
    { t: 'Subverto a tarefa: pergunto por que alguém precisaria disso', bf: { Proj: 2, Imp: 1 } }
  ]},
  { dim: 'Proj', q: 'Duas ideias de áreas completamente diferentes se conectam na sua mente...', ph: '🔗 Associação', opts: [
    { t: 'O tempo todo — analogias inesperadas são meu modo padrão de pensar', bf: { Proj: 3 } },
    { t: 'Às vezes, quando estou relaxado ou distraído', bf: { Proj: 1 } },
    { t: 'Raramente — penso dentro do assunto em questão', bf: { Proj: -2, Foco: 1 } },
    { t: 'Conecto, mas só se houver utilidade prática imediata', bf: { Proj: -1, QI: 1 } }
  ]},
  // Foco (6 perguntas)
  { dim: 'Foco', q: 'Em uma tarefa repetitiva que exige atenção constante por horas, você...', ph: '🎯 Atenção', opts: [
    { t: 'Entro em flow e mantenho qualidade do início ao fim', bf: { Foco: 3 } },
    { t: 'Funciono bem por um tempo, depois preciso de pausas', bf: { Foco: 1 } },
    { t: 'Minha mente vaga rapidamente — preciso de estímulo variado', bf: { Foco: -2, Imp: 1 } },
    { t: 'Tédio me paralisa — tarefas repetitivas drenam minha energia', bf: { Foco: -3, Imp: 2 } }
  ]},
  { dim: 'Foco', q: 'Quantas abas/projetos/conversas você consegue gerenciar simultaneamente?', ph: '🔀 Multi-tarefa', opts: [
    { t: 'Prefiro UMA coisa por vez com profundidade total', bf: { Foco: 3, Imp: -2 } },
    { t: 'Duas ou três, desde que sejam relacionadas', bf: { Foco: 1 } },
    { t: 'Muitas — minha mente funciona melhor com múltiplos estímulos', bf: { Foco: -2, Imp: 2 } },
    { t: 'Perco o controle facilmente com múltiplas demandas', bf: { Foco: -1, Proj: 1 } }
  ]},
  { dim: 'Foco', q: 'Quando está lendo algo importante e uma notificação aparece, você...', ph: '📱 Distração', opts: [
    { t: 'Ignoro completamente até terminar — foco é sagrado', bf: { Foco: 3 } },
    { t: 'Verifico rapidamente e volto sem perder o fio', bf: { Foco: 1 } },
    { t: 'Verifico e às vezes me perco em outra coisa', bf: { Foco: -2, Imp: 1 } },
    { t: 'Não resisto — a curiosidade vence toda vez', bf: { Foco: -3, Imp: 2 } }
  ]},
  { dim: 'Foco', q: 'Ao final de um dia produtivo, como você se sente?', ph: '🔋 Energia', opts: [
    { t: 'Satisfeito e ainda com energia — consistência me alimenta', bf: { Foco: 3 } },
    { t: 'Cansado mas realizado', bf: { Foco: 1 } },
    { t: 'Exausto — manter foco por horas cobra um preço alto', bf: { Foco: -1, Imp: 1 } },
    { t: 'Depende — se foi interessante, tenho energia sobrando', bf: { Imp: 2, Foco: -2 } }
  ]},
  { dim: 'Foco', q: 'Vigília noturna: quatro horas observando um portão onde nada acontece.', ph: '🌃 Vigília', opts: [
    { t: 'Mantenho atenção estável as quatro horas — varredura disciplinada', bf: { Foco: 3 } },
    { t: 'Crio um ritual de checagem para não dispersar', bf: { Foco: 2 } },
    { t: 'Minha mente viaja; volto quando algo se move', bf: { Foco: -2, Proj: 1 } },
    { t: 'Invento estímulo ou troco de posto — imobilidade me consome', bf: { Foco: -3, Imp: 2 } }
  ]},
  { dim: 'Foco', q: 'No meio de um ritual que exige concentração total, gritos de comemoração explodem lá fora.', ph: '🔕 Filtro', opts: [
    { t: 'Nem registro — quando estou dentro, o mundo desliga', bf: { Foco: 3 } },
    { t: 'Registro, incomoda, mas sustento o ritual até o fim', bf: { Foco: 1 } },
    { t: 'Perco o fio e preciso recomeçar a sequência', bf: { Foco: -2 } },
    { t: 'Vou ver a comemoração — o ritual pode esperar', bf: { Foco: -3, Imp: 2 } }
  ]},
  // Impulsividade (6 perguntas)
  { dim: 'Imp', q: 'Uma oportunidade arriscada aparece de repente. Sua primeira reação é...', ph: '⚡ Impulso', opts: [
    { t: 'Agir imediatamente — a janela pode fechar', bf: { Imp: 3 } },
    { t: 'Avaliar rapidamente os prós e contras (30 segundos)', bf: { Imp: 1, QI: 1 } },
    { t: 'Pedir mais informações antes de decidir', bf: { Imp: -2, Foco: 1 } },
    { t: 'Deixar passar se não há tempo para análise adequada', bf: { Imp: -3, Foco: 2 } }
  ]},
  { dim: 'Imp', q: 'Com que frequência você faz algo e depois pensa "por que eu fiz isso?"', ph: '🤔 Reflexão', opts: [
    { t: 'Quase nunca — penso antes de agir', bf: { Imp: -3, Foco: 2 } },
    { t: 'Raramente — mas quando acontece, a lição fica', bf: { Imp: -1 } },
    { t: 'Com certa frequência — meu corpo age antes da mente', bf: { Imp: 2 } },
    { t: 'Frequentemente — vivo no presente e processo depois', bf: { Imp: 3 } }
  ]},
  { dim: 'Imp', q: 'Em situação de perigo físico imediato, seu corpo...', ph: '🏃 Reação', opts: [
    { t: 'Reage instantaneamente — reflexos rápidos são meu forte', bf: { Imp: 3 } },
    { t: 'Congela por um segundo e depois age com precisão', bf: { Foco: 2, Imp: -1 } },
    { t: 'Analiso a situação rapidamente antes de me mover', bf: { QI: 2, Imp: -2 } },
    { t: 'Sinto as emoções intensamente antes de qualquer ação', bf: { Proj: 2, IE: 1 } }
  ]},
  { dim: 'Imp', q: 'Em relação a compras por impulso, hobbies novos e mudanças de plano...', ph: '🎲 Espontaneidade', opts: [
    { t: 'Minha vida é um turbilhão de decisões instantâneas — e adoro', bf: { Imp: 3 } },
    { t: 'Tenho meus momentos, mas no geral sou controlado', bf: { Imp: 1 } },
    { t: 'Muito raro — prefiro pensar antes de qualquer decisão', bf: { Imp: -2, Foco: 1 } },
    { t: 'Quase nunca — sou extremamente deliberado em tudo', bf: { Imp: -3, Foco: 2 } }
  ]},
  { dim: 'Imp', q: 'Uma ponte de corda balança sobre o abismo. O guia ainda confere os nós.', ph: '🌉 Espera', opts: [
    { t: 'Já estou atravessando — esperar confere o quê?', bf: { Imp: 3 } },
    { t: 'Atravesso primeiro, mas só depois do sinal do guia', bf: { Imp: 1 } },
    { t: 'Espero a checagem completa e atravesso com calma', bf: { Imp: -2, Foco: 1 } },
    { t: 'Refaço a checagem do guia eu mesmo antes de pisar', bf: { Imp: -3, Foco: 2 } }
  ]},
  { dim: 'Imp', q: 'A recompensa agora — ou o triplo depois de uma lua de espera?', ph: '⏳ Recompensa', opts: [
    { t: 'Agora — o futuro é promessa, o presente é fato', bf: { Imp: 3 } },
    { t: 'Agora, se eu tiver uso imediato; senão, espero', bf: { Imp: 1 } },
    { t: 'O triplo — esperar é fácil quando a conta é óbvia', bf: { Imp: -2, QI: 1 } },
    { t: 'O triplo, e ainda negocio juros pela paciência', bf: { Imp: -3, IE: 1 } }
  ]},
  // IE - Inteligência Emocional (6 perguntas)
  { dim: 'IE', q: 'Numa sala cheia de pessoas, você consegue "ler" quem está...', ph: '🎭 Leitura Social', opts: [
    { t: 'Sim — percebo tensões, alianças e emoções ocultas em minutos', bf: { IE: 3, Proj: 1 } },
    { t: 'Percebo o óbvio — quem está feliz, irritado ou desconfortável', bf: { IE: 1 } },
    { t: 'Só percebo quando alguém expressa diretamente', bf: { IE: -2 } },
    { t: 'Não — emoções alheias não são meu radar natural', bf: { IE: -3, QI: 1 } }
  ]},
  { dim: 'IE', q: 'Quando precisa convencer alguém de algo importante, você...', ph: '🎯 Influência', opts: [
    { t: 'Adapto minha abordagem ao perfil emocional da pessoa — automaticamente', bf: { IE: 3 } },
    { t: 'Uso argumentos lógicos e dados', bf: { QI: 2, IE: -1 } },
    { t: 'Insisto com persistência e energia', bf: { Imp: 2, IE: 0 } },
    { t: 'Mostro pelo exemplo — ações falam mais que palavras', bf: { Foco: 2, IE: 0 } }
  ]},
  { dim: 'IE', q: 'Quando alguém está mentindo ou escondendo algo, você geralmente...', ph: '🔍 Detecção', opts: [
    { t: 'Percebo imediatamente — microexpressões e tom de voz me entregam tudo', bf: { IE: 3, Proj: 1 } },
    { t: 'Sinto que algo está errado mas nem sempre consigo identificar', bf: { IE: 1, Proj: 1 } },
    { t: 'Só percebo com evidências concretas', bf: { IE: -2, QI: 1 } },
    { t: 'Tendo a confiar demais nas pessoas', bf: { IE: -1 } }
  ]},
  { dim: 'IE', q: 'Como você lida com as suas próprias emoções intensas?', ph: '🧘 Autorregulação', opts: [
    { t: 'Identifico, nomeio e gerencio conscientemente — tenho um vocabulário emocional amplo', bf: { IE: 3 } },
    { t: 'Sinto intensamente mas consigo não agir impulsivamente na maioria das vezes', bf: { IE: 1, Imp: -1 } },
    { t: 'Às vezes sou pego de surpresa pelas minhas próprias reações', bf: { IE: -1, Imp: 1 } },
    { t: 'Prefiro não explorar emoções — racionalizo e sigo em frente', bf: { IE: -2, QI: 1 } }
  ]},
  { dim: 'IE', q: 'Dois aliados dizem "está tudo bem", mas a tensão na mesa é palpável.', ph: '🌡️ Clima', opts: [
    { t: 'Percebi antes de sentarem — e sei até quem cedeu na discussão', bf: { IE: 3, Proj: 1 } },
    { t: 'Percebo que algo está estranho, sem saber exatamente o quê', bf: { IE: 1 } },
    { t: 'Se dizem que está tudo bem, sigo o que foi dito', bf: { IE: -2 } },
    { t: 'Só noto quando alguém finalmente explode', bf: { IE: -3, Foco: 1 } }
  ]},
  { dim: 'IE', q: 'Você precisa dar uma notícia devastadora a um companheiro de jornada.', ph: '💬 Entrega', opts: [
    { t: 'Calibro tom, momento e palavras à pessoa — e fico para segurar a reação', bf: { IE: 3 } },
    { t: 'Digo com honestidade e o melhor tato que consigo', bf: { IE: 1 } },
    { t: 'Digo direto e completo — rodeios só prolongam a dor', bf: { IE: -1, Foco: 1 } },
    { t: 'Peço a alguém mais habilidoso que transmita', bf: { IE: -2 } }
  ]}
];

// ── CAT CONFIGURATION ───────────────────────────────────────
export const CAT_CONFIG = {
  // Fases de PERSONALIDADE. A fase 1 (20 itens) cobre as 5 dims em round-robin;
  // as seguintes usam seleção adaptativa pela dimensão mais discriminante.
  phaseSizes: [20, 10, 10],
  // Critério de parada por fase: P(classe top-1) estimada por Monte Carlo
  // posterior. Encerra a personalidade ao fim da fase se P >= threshold.
  stopProbs: [0.85, 0.80, 0.75],
  maxPersonality: 40,
  // Bloco COGNITIVO garantido após a personalidade convergir (2 itens por
  // dimensão). Sem ele, quizzes que convergem cedo terminavam com zero dados
  // cognitivos — e todas as raças empatavam (bug "todo mundo é Elfo").
  cogBlock: 10,
  maxQuestions: 50
};

// ── METODOLOGIA & LIMITAÇÕES (seção do dossiê) ──────────────
export const METHODOLOGY = [
  {
    icon: '🧮',
    title: 'Como os números são calculados',
    body: 'Cada dimensão é a média das suas respostas naquele traço (com regularização bayesiana — estimativas só ficam extremas com evidência repetida). Sua classe é o arquétipo mais próximo do seu perfil por uma distância que combina direção (o padrão dos traços) e magnitude (a intensidade deles). As porcentagens do ranking são probabilidades reais: somam 100% e foram calibradas por simulação — quando o algoritmo diz 90%, ele acerta ~90% das vezes em teste com perfis conhecidos.'
  },
  {
    icon: '🎯',
    title: 'O quiz adaptativo (CAT)',
    body: 'O teste escolhe a próxima pergunta pela dimensão que mais separa seus dois arquétipos rivais no momento — e para quando a probabilidade do líder passa do limiar da fase (85%/80%/75%). Por isso quizzes diferentes têm tamanhos diferentes: mais perguntas significam que seu perfil é genuinamente mais ambíguo, não que o teste falhou. Ao final, um bloco fixo de 10 perguntas mede o hardware cognitivo (raça).'
  },
  {
    icon: '📚',
    title: 'Base científica',
    body: 'O modelo de personalidade é o Big Five (Costa & McCrae; Soto & John, BFI-2) — o framework com maior suporte empírico em psicologia da personalidade. As dimensões cognitivas referenciam construtos de pesquisa reais: inteligência fluida (Cattell/Raven), pensamento divergente (Guilford/Torrance), atenção sustentada (d2/CPT), impulsividade (BIS-11/UPPS-P) e inteligência emocional como habilidade (Mayer-Salovey/MSCEIT). O MBTI é exibido como tradução cultural por correlação empírica (McCrae & Costa, 1989) — é menos preciso que o Big Five e deve ser lido como apelido, não como medida.'
  },
  {
    icon: '⚠️',
    title: 'O que este teste NÃO é',
    body: 'Isto é uma ferramenta de autoconhecimento e entretenimento — não é avaliação psicológica, não diagnostica nada e não substitui profissionais. As "neurodivergências" detectadas são perfis de resposta compatíveis com padrões descritos em instrumentos de TRIAGEM (ASRS-18, AQ-10, OCI-R); triagem positiva significa apenas "vale investigar com um profissional". Autorrelato tem limites conhecidos: você responde como se vê, e isso inclui pontos cegos.'
  }
];
