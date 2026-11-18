// Startup Idea Generator Engine: Quantum (Algorithmic) + Neural (Gemini AI)

const QUANTUM_DATA = {
    names: [
        { prefix: "Solana", root: "Babka", suffix: "DAO" },
        { prefix: "Kebab", root: "Chain", suffix: "3.0" },
        { prefix: "Neuro", root: "Drist", suffix: "AI" },
        { prefix: "ProofOf", root: "Sleep", suffix: "Protocol" },
        { prefix: "Borsch", root: "Rollup", suffix: "L2" },
        { prefix: "Tinder", root: "ForGopniks", suffix: ".eth" },
        { prefix: "Zk", root: "Pelmeni", suffix: "Network" },
        { prefix: "Hamster", root: "Kombat", suffix: "Arbitrage" },
        { prefix: "Alco", root: "Oracle", suffix: "DePIN" },
        { prefix: "Doshirak", root: "Yield", suffix: "Farm" },
        { prefix: "GigaChad", root: "Stake", suffix: "Labs" },
        { prefix: "Lada", root: "Metaverse", suffix: "Global" },
        { prefix: "Crypto", root: "Kvas", suffix: "Liquidity" },
        { prefix: "Pivko", root: "Swap", suffix: "DEX" },
        { prefix: "Banya", root: "Consensus", suffix: "Core" },
        { prefix: "Grandma", root: "Arbitrage", suffix: "Ventures" },
        { prefix: "CatNip", root: "Hyperdrive", suffix: "X" },
        { prefix: "SnoopDogg", root: "L3", suffix: "Vibe" },
        { prefix: "DeFi", root: "Garlic", suffix: "Vault" },
        { prefix: "Ochko", root: "Validator", suffix: "Node" }
    ],
    tickers: [
        "$BABKA", "$KEBAB", "$DRIST", "$PELMEN", "$SHAU", "$SLEEP",
        "$DOSHA", "$KVAS", "$PIVKO", "$GOP", "$CHAD", "$SCAM",
        "$HOODLE", "$ZXC", "$BORSCH", "$LADA", "$BANYA", "$HYPE"
    ],
    stages: [
        "🔥 PRE-SEED: $69,420,000 FDV",
        "🚀 SERIES A: $420,000,000 (Оплачено бутербродами)",
        "💎 SEED ROUND: $13,370,000 (В долг у мамы)",
        "⚡ STEALTH MODE: $999,000,000 (Никто не знает, что мы делаем)",
        "🦄 UNICORN: $1,000,000,000 (Оценка по версии чата в Telegram)",
        "🚨 EXIT SCAM READY: $88,000,000"
    ],
    taglines: [
        "«Если это выглядит как скам, звучит как скам и пахнет шаурмой — значит, это будущее финансов.»",
        "«Переводим бабушек через дорогу по смарт-контрактам на Layer-3 с нулевым разглашением.»",
        "«Майнинг мем-коинов силой храпа и частотой пульса при просмотре хорроров на ночь.»",
        "«Децентрализованный авто-майнинг на микроволновках соседей через домашний Wi-Fi.»",
        "«Первый в мире AI-сомелье для быстрорастворимой лапши с консенсусом Proof-of-Mayonnaise.»",
        "«NFT-сертификаты на занятую очередь в поликлинике с динамическим роялти участковому терапевту.»",
        "«Tinder для дворовых голубей с автоматическим свопом хлебных крошек на Solana.»",
        "«Стейкинг тоски и депрессии перед сессией с гарантированной ликвидацией деканатом.»",
        "«Голосование в DAO за то, кто сегодня моет сковородку после жареной картошки.»",
        "«Zk-Rollup для маршруток: передача за проезд валидируется за 0.0001 секунды без сдачи.»"
    ],
    problems: [
        "Традиционная финансовая система Уолл-Стрит не позволяет заложить гараж дяди Толи под смарт-контракт на шаурму.",
        "Человечество тратит до 8 часов в сутки на сон, не получая за это ни единого крипто-токена в стейкинг-пул.",
        "Бабушки у подъезда осуждают людей абсолютно бесплатно, упуская колоссальную монетизацию социальной репутации.",
        "При покупке шаурмы на вокзале нет криптографического ZK-доказательства, что мясо не лаяло вчера в полночь.",
        "Миллионы хомяков ежедневно стирают пальцы об экраны смартфонов, но не могут купить себе даже пачку виртуальных сухариков.",
        "Студенты впадают в депрессию перед сессией вместо того, чтобы токенизировать свои панические атаки на DEX.",
        "Люди стоят в очереди в МФЦ по 4 часа, пока блокчейн простаивает без валидации талончиков с буквой «Б».",
        "Коты орут в 4 часа утра без токеномики и не генерируют ликвидность в DeFi-секторе."
    ],
    solutions: [
        "Запуск DePIN-сети умных лавочек с биометрическим консенсусом Proof-of-Kvas и мгновенным шардингом сплетен.",
        "Внедрение алгоритма ZK-Proof-of-Garlic для валидации чесночного соуса без раскрытия секретного рецепта Ашота.",
        "Стейкинг храпа через смарт-часы: чем громче и мелодичнее храпишь, тем выше APY в пуле ликвидности $SLEEP.",
        "Автономный AI-агент, который за 0.001 SOL круглосуточно доказывает свою правоту в комментариях ВКонтакте.",
        "Квантовый блокчейн на базе старых стиральных машин 'Малютка' с пропускной способностью 10,000 TPS (Tashil Per Second).",
        "Динамические NFT-талоны к врачу: их можно продать на OpenSea за 5 минут до приема с наценкой в 300%.",
        "Токенизация мурчания кошек в синтетические активы с автоматическим выкупом вискаса по смарт-контракту.",
        "Суверенный Layer-2 роллап для шашлыка: угли раздуваются транзакциями валидаторов в реальном времени."
    ],
    tokenomicsPatterns: [
        [
            { label: "Фаундерам на билет в Дубай и желтый Lambo", percent: 65 },
            { label: "Маркетинг у крипто-инфлюенсеров", percent: 20 },
            { label: "Судебные издержки и взятки SEC", percent: 14 },
            { label: "Аирдроп комьюнити (вестинг 99 лет)", percent: 1 }
        ],
        [
            { label: "Пул ликвидности на покупку шаурмы", percent: 50 },
            { label: "Команде разработчиков (школьникам)", percent: 30 },
            { label: "Резервный фонд на случай Rug Pull", percent: 15 },
            { label: "Дроп холдерам $BABKA", percent: 5 }
        ],
        [
            { label: "Взятка нейросети, чтобы не захватила мир", percent: 45 },
            { label: "Закупка пива и чипсов для хакатона", percent: 35 },
            { label: "Аудит смарт-контракта у гадалки", percent: 15 },
            { label: "Сжигание токенов в реальном костре", percent: 5 }
        ]
    ],
    backers: [
        "Andreessen Horowitz's Hamster Ventures",
        "Илон Маск (случайно нажал ретвит в 4:19 утра)",
        "Фонд Развития Гаражного Кооператива «Заря»",
        "Vitalik Buterin's Anime Pillow DAO",
        "Павел Дуров (мысленно поддержал, качая пресс)",
        "Фонд Деда Максима и Кот Борис Capital",
        "Sequoia Capital's Janitor",
        "Tiger Global (перепутали тикер с Apple)"
    ],
    audits: [
        "🛡️ 100% Уязвимый (Бэкдор оставлен специально для фаундера) — CertiK No-Cap",
        "🛡️ Проверено бабкой у подъезда: 'Наркоманы, но график зеленый'",
        "🛡️ Аудит пройден в бане с валидаторами под шашлычок — 0 критических уязвимостей",
        "🛡️ Код написан первокурсником в трамвае за банку энергетика — ScamShield Certified",
        "🛡️ Смарт-контракт настолько запутан, что даже хакеры отказались его взламывать"
    ],
    tagsPool: [
        ["#Web3", "#Solana", "#DePIN", "#AI-Hype", "#ProofOfSleep"],
        ["#DeFi", "#Layer3", "#ZK-Kebab", "#MemeFi", "#ExitScam"],
        ["#GrandmaDAO", "#Crypto", "#Staking", "#1000x", "#PumpIt"],
        ["#HamsterFi", "#TonEco", "#Airdrop", "#SmartContract", "#Degens"]
    ]
};

class StartupGenerator {
    constructor() {
        this.currentMode = 'quantum'; // 'quantum' or 'neural'
        // API key securely read from localStorage (not committed to public git)
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

    getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    generateQuantum() {
        const nameObj = this.getRandomItem(QUANTUM_DATA.names);
        const name = `${nameObj.prefix}${nameObj.root} ${nameObj.suffix}`;
        const ticker = this.getRandomItem(QUANTUM_DATA.tickers);
        const stage = this.getRandomItem(QUANTUM_DATA.stages);
        const tagline = this.getRandomItem(QUANTUM_DATA.taglines);
        const problem = this.getRandomItem(QUANTUM_DATA.problems);
        const solution = this.getRandomItem(QUANTUM_DATA.solutions);
        const tokenomics = this.getRandomItem(QUANTUM_DATA.tokenomicsPatterns);
        const backers = this.getRandomItem(QUANTUM_DATA.backers);
        const audit = this.getRandomItem(QUANTUM_DATA.audits);
        const tags = this.getRandomItem(QUANTUM_DATA.tagsPool);

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
            source: '⚡ Quantum Chaos Core (Offline)'
        };
    }

    async generateNeural() {
        if (!this.apiKey) {
            throw new Error('API ключ Gemini не установлен');
        }

        const prompt = `Ты — сумасшедший гениальный Web3/AI венчурный фаундер.
Придумай 1 абсолютно бредовый, уморительный, абсурдный стартап на стыке Web3, крипты, AI и российской повседневности (шаурма, гаражи, коты, бабушки, депрессия, маршрутки, мемкоины, стейкинг).

Верни СТРОГО валидный JSON БЕЗ каких-либо пояснений, markdown кавычек или форматирования \`\`\`json.
Формат структуры:
{
  "name": "Название стартапа (на английском или суржике с DAO/L2/AI)",
  "ticker": "$ТИКЕР",
  "stage": "Стадия и абсурдная оценка (например: PRE-SEED: $420M FDV)",
  "tagline": "«Хлесткий смешной слоган стартапа в кавычках»",
  "problem": "Какую абсурдную проблему решает стартап (2 предложения)",
  "solution": "Технологически напыщенное бредовое решение со смарт-контрактами и AI (2 предложения)",
  "tokenomics": [
    {"label": "Фаундерам на Lambo", "percent": 65},
    {"label": "Маркетинг у инфлюенсеров", "percent": 25},
    {"label": "Аирдроп работягам", "percent": 10}
  ],
  "backers": "Название смешного фонда или инвестора",
  "audit": "Смешной статус аудита смарт-контракта",
  "tags": ["#Web3", "#Meme", "#AI", "#DeFi"]
}`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
        
        // Timeout promise
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 1.0,
                        responseMimeType: "application/json"
                    }
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Gemini API error [${response.status}]: ${errText}`);
            }

            const data = await response.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) throw new Error('Пустой ответ от нейросети');

            // Clean json if wrapped in backticks
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);

            parsed.source = '🧠 Gemini 2.5 Flash Neural Engine';
            return parsed;
        } catch (err) {
            clearTimeout(timeoutId);
            console.warn('Neural generation failed, falling back to Quantum:', err);
            const fallback = this.generateQuantum();
            fallback.source = `⚡ Quantum Fallback (${err.message.includes('Failed to fetch') || err.message.includes('503') ? 'Регион/Сеть заблокирована' : 'Автопереключение'})`;
            fallback.neuralError = err.message;
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
