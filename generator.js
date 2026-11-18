// Loft Venture Syndicate - Confidential Investment Memo Generator
// Supports both Quantum Core (Offline) and Gemini 2.5 Flash (Online)

const LOFT_SYNDICATE_DATA = {
    names: [
        { prefix: "Solana", root: "Babka", suffix: "Consortium" },
        { prefix: "KebabChain", root: "Infrastructure", suffix: "L2" },
        { prefix: "ProofOfSleep", root: "Protocol", suffix: "Capital" },
        { prefix: "ZkPelmeni", root: "Fabric", suffix: "Network" },
        { prefix: "Grandma", root: "Arbitrage", suffix: "Syndicate" },
        { prefix: "Doshirak", root: "Yield", suffix: "Optimizer" },
        { prefix: "Borsch", root: "Rollup", suffix: "Core" },
        { prefix: "NeuroDrist", root: "Intelligence", suffix: "Ventures" },
        { prefix: "AlcoOracle", root: "DePIN", suffix: "Global" },
        { prefix: "GigaChad", root: "Staking", suffix: "Institutional" },
        { prefix: "Lada", root: "Metaverse", suffix: "Securities" },
        { prefix: "CryptoKvas", root: "Liquidity", suffix: "Fund" },
        { prefix: "PivkoSwap", root: "Prime", suffix: "Brokerage" },
        { prefix: "Banya", root: "Consensus", suffix: "Group" },
        { prefix: "CatNip", root: "Hyperdrive", suffix: "Holdings" }
    ],
    tickers: [
        "$BABKA", "$KEBAB", "$SLEEP", "$PELMEN", "$DOSHA", "$BORSCH",
        "$DRIST", "$KVAS", "$PIVKO", "$CHAD", "$LADA", "$BANYA", "$HYPE"
    ],
    stages: [
        "SERIES SEED: $69,420,000 POST-MONEY VALUATION",
        "SERIES A: $420,000,000 (LEAD: ANDREESSEN HOROWITZ’S HAMSTER)",
        "GROWTH ROUND: $1,000,000,000 (CONFIDENTIAL CONSORTIUM)",
        "INSTITUTIONAL SYNDICATE: $13,370,000 ALLOCATION",
        "MEZZANINE PRE-IPO: $888,000,000 EVALUATION"
    ],
    taglines: [
        "«Институциональная токенизация неэффективных бытовых процессов с математически доказанной нулевой целесообразностью.»",
        "«Интеграция бабушек у подъезда в децентрализованный ончейн-консилиум с правом вето и консенсусом Proof-of-Bench.»",
        "«Монетизация фаз глубокого сна и храпа через децентрализованный ликвидный стейкинг токенов $SLEEP.»",
        "«Первый суверенный DePIN-протокол для верификации чесночного соуса без раскрытия формулы (ZK-Proof-of-Garlic).»",
        "«Перенос прав владения гаражами в кооперативе 'Заря' в динамические RWA-активы на Layer-3.»",
        "«Алгоритмический AI-сомелье для быстрорастворимой лапши с автоматическим ребалансированием специй на DEX.»",
        "«Секьюритизация панических атак студентов перед защитой диплома в высокорисковые синтетические деривативы.»"
    ],
    problems: [
        "Традиционный венчурный капитал не позволяет заложить гараж дяди Толи под залог смарт-контракта на шаурму в рамках Базель III.",
        "Человеческий капитал теряет свыше 2,800 часов в год во время сна, не обеспечивая при этом институциональную доходность в пулах ликвидности.",
        "Социальный капитал бабушек у подъезда не монетизируется, несмотря на 99.8% точность устного предиктивного анализа прохожих.",
        "Рынок уличного питания объемом $40B страдает от отсутствия криптографического ZK-аудита происхождения мясных субпродуктов.",
        "Студенты старших курсов испытывают экзистенциальный кризис в изоляции от распределенных реестров и глобального кредитования."
    ],
    solutions: [
        "Развертывание суверенного Layer-2 роллапа с консенсусом Proof-of-Kvas и мгновенным клирингом бытовых транзакций.",
        "Внедрение протокола ZK-Proof-of-Garlic для ончейн-верификации качества соуса Ашота с нулевым разглашением рецептуры.",
        "Стейкинг биометрических колебаний храпа: автоматический налог на бессонницу и выплата дивидендов держателям пула $SLEEP.",
        "DePIN-сеть умных лавочек с биометрической идентификацией и автоматическим распределением роялти за сплетни.",
        "Квантовый валидатор на базе стиральных машин 'Малютка' с частотой 10,000 TPS (Transactions Per Second)."
    ],
    tokenomics: [
        [
            { label: "Основателям синдиката (активы в Дубае)", percent: 65 },
            { label: "Институциональный маркетинг и лоббирование", percent: 20 },
            { label: "Резервный фонд на споры с регуляторами", percent: 14 },
            { label: "Публичный аирдроп розничным инвесторам (вестинг 99 лет)", percent: 1 }
        ],
        [
            { label: "Пул ликвидности для выкупа шаурмы", percent: 55 },
            { label: "Команде количественных аналитиков", percent: 25 },
            { label: "Страховой фонд на случай ликвидации", percent: 15 },
            { label: "Держателям облигаций $BABKA", percent: 5 }
        ],
        [
            { label: "Инфраструктурный фонд серверов и питания", percent: 50 },
            { label: "Выплаты юридическим советникам в Женеве", percent: 30 },
            { label: "Аудит безопасности в закрытом банном клубе", percent: 15 },
            { label: "Сжигание избыточной массы токенов", percent: 5 }
        ]
    ],
    backers: [
        "Syndicate Alpha Partners & Hamster Ventures",
        "Elon Musk Family Office (Confidential Late-Night Retweet)",
        "Патриаршие Angels Club & Кот Борис Capital",
        "Фонд Развития Гаражных Инноваций Купчино",
        "Vitalik Buterin Anime Pillow Memorial DAO",
        "Geneva Private Wealth & Дед Максим Holdings"
    ],
    audits: [
        "🛡️ Проведен закрытый аудит: 100% институциональная уязвимость (CertiK No-Cap Verified)",
        "🛡️ Заверен старшим консилиумом подъезда №4: «Надежный инструмент с умеренной волатильностью»",
        "🛡️ Соответствие стандартам безопасности: Бэкдор сохранен для экстренного вывода ликвидности фаундерами",
        "🛡️ Сертифицировано швейцарским бюро ScamShield Private: Риск ликвидации 99.9%"
    ],
    tags: [
        ["#Institutional", "#DePIN", "#Layer2", "#RWA", "#ZeroKnowledge"],
        ["#SyndicateSeed", "#Solana", "#YieldOptimization", "#Arbitrage"],
        ["#PrivateEquity", "#AutonomousAI", "#Staking", "#HedgeFund"]
    ]
};

class StartupGenerator {
    constructor() {
        this.currentMode = 'quantum';
        this.apiKey = localStorage.getItem('gemini_api_key') || '';
        this.modelName = 'gemini-2.5-flash';
    }

    setMode(mode) {
        this.currentMode = mode;
    }

    setApiKey(key) {
        this.apiKey = key.trim();
        localStorage.setItem('gemini_api_key', this.apiKey);
    }

    getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    generateQuantum() {
        const nameObj = this.getRandom(LOFT_SYNDICATE_DATA.names);
        const name = `${nameObj.prefix} ${nameObj.root} ${nameObj.suffix}`;
        const ticker = this.getRandom(LOFT_SYNDICATE_DATA.tickers);
        const stage = this.getRandom(LOFT_SYNDICATE_DATA.stages);
        const tagline = this.getRandom(LOFT_SYNDICATE_DATA.taglines);
        const problem = this.getRandom(LOFT_SYNDICATE_DATA.problems);
        const solution = this.getRandom(LOFT_SYNDICATE_DATA.solutions);
        const tokenomics = this.getRandom(LOFT_SYNDICATE_DATA.tokenomics);
        const backers = this.getRandom(LOFT_SYNDICATE_DATA.backers);
        const audit = this.getRandom(LOFT_SYNDICATE_DATA.audits);
        const tags = this.getRandom(LOFT_SYNDICATE_DATA.tags);

        return {
            name,
            ticker,
            stage,
            tagline,
            problem,
            solution,
            tokenomics,
            backers,
            audit,
            tags,
            source: 'Квантовый Аналитический Модуль (Offline)'
        };
    }

    async generateNeural() {
        if (!this.apiKey) {
            throw new Error('Ключ Gemini API не настроен в хранилище');
        }

        const prompt = `Ты — старший партнер элитного швейцарского венчурного фонда Loft Capital. 
Твоя задача: составить ультра-серьезный, деловой, институциональный инвестиционный меморандум для АБСУРДНОГО, смешного Web3/AI стартапа на стыке технологий и российского быта (шаурма, бабушки, гаражи, сон, депрессия, маршрутки).
Тон: подчеркнуто серьезный, сухой, деловой и пафосный финансовый язык, отчего идея звучит еще смешнее.

Верни СТРОГО валидный JSON без markdown форматирования:
{
  "name": "Название стартапа (на английском/суржике с Consortium/L2/Capital)",
  "ticker": "$ТИКЕР",
  "stage": "Институциональная оценка (например: SERIES A: $120,000,000 POST-MONEY VALUATION)",
  "tagline": "«Афористичный деловой слоган в кавычках»",
  "problem": "Институциональная формулировка абсурдной проблемы (2 предложения на деловом языке)",
  "solution": "Высокопарное решение на блокчейне, ZK-Rollups и AI (2 предложения)",
  "tokenomics": [
    {"label": "Основателям на активы в Дубае", "percent": 65},
    {"label": "Институциональный маркетинг", "percent": 25},
    {"label": "Аирдроп розничным участникам", "percent": 10}
  ],
  "backers": "Название солидного, но смешного фонда/инвестора",
  "audit": "Статус аудита на деловом языке",
  "tags": ["#PrivateEquity", "#Web3", "#Institutional"]
}`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.95,
                        responseMimeType: "application/json"
                    }
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Gemini API error: ${errText}`);
            }

            const data = await response.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);

            parsed.source = 'Нейросетевой Меморандум Gemini 2.5 Flash';
            return parsed;
        } catch (err) {
            clearTimeout(timeoutId);
            console.warn('Neural generation error, fallback to Quantum:', err);
            const fallback = this.generateQuantum();
            fallback.source = 'Квантовый Модуль (Резервный Режим)';
            return fallback;
        }
    }

    async generate() {
        if (this.currentMode === 'neural') {
            return await this.generateNeural();
        }
        return this.generateQuantum();
    }
}

window.startupGenerator = new StartupGenerator();
