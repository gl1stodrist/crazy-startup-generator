// Полноценная Реляционная База Данных для Loft Capital & Syndicate
// Поддержка постоянного хранения в LocalStorage/IndexedDB, фильтрации, поиска и экспорта JSON

class SyndicateDatabase {
    constructor() {
        this.STORAGE_KEY_INVESTORS = 'loft_syndicate_investors_v2';
        this.STORAGE_KEY_TRANSACTIONS = 'loft_syndicate_transactions_v2';
        this.STORAGE_KEY_PORTFOLIO = 'loft_syndicate_portfolio_v2';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.STORAGE_KEY_INVESTORS)) {
            const initialInvestors = [
                {
                    id: 'tx_001',
                    name: 'Швейцарский Семейный Офис «Geneva Alpha»',
                    wallet: 'TVKNb8MWNfxue3dQJxKB9oXT5h9Y88PYb5',
                    amountUSDT: 250000,
                    startup: 'PelmeniAlert Pro (Умная Кастрюля)',
                    category: 'Кухня & Гастрономия',
                    tier: 'Генеральный Синдикат',
                    verified: true,
                    txHash: '4f8a9b2c3d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a',
                    date: '18 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 5
                },
                {
                    id: 'tx_002',
                    name: 'Венчурный Клуб «Патриаршие Пруды»',
                    wallet: 'TXz94jLmQ81aPweRtYuIoPaSdFgHjKlZxc',
                    amountUSDT: 125000,
                    startup: 'Аренда Кота Для Ревности Ex-Cat',
                    category: 'Отношения & Жизнь',
                    tier: 'Институционал',
                    verified: true,
                    txHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
                    date: '17 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 24
                },
                {
                    id: 'tx_003',
                    name: 'Инвестиционный Фонд Деда Максима',
                    wallet: 'TLm58xQweRtYuIoPaSdFgHjKlZxcVbnM12',
                    amountUSDT: 69420,
                    startup: 'Скамейка с Бабушками DePIN',
                    category: 'Двор & Город',
                    tier: 'Частный Ангел',
                    verified: true,
                    txHash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
                    date: '16 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 48
                },
                {
                    id: 'tx_004',
                    name: 'Гаражный Кооператив «Заря-Капитал»',
                    wallet: 'TCw33kPweRtYuIoPaSdFgHjKlZxcVbnM77',
                    amountUSDT: 45000,
                    startup: 'Лазерная Шаурма ShauMaster L2',
                    category: 'Кухня & Гастрономия',
                    tier: 'Синдикат Района',
                    verified: false,
                    txHash: '7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
                    date: '15 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 72
                },
                {
                    id: 'tx_005',
                    name: 'Синдикат Уставших Программистов',
                    wallet: 'TQq12dPweRtYuIoPaSdFgHjKlZxcVbnM99',
                    amountUSDT: 30000,
                    startup: 'Симулятор Работы PretendWork SaaS',
                    category: 'Офис & Карьера',
                    tier: 'Частный Ангел',
                    verified: true,
                    txHash: '3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d',
                    date: '14 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 96
                },
                {
                    id: 'tx_006',
                    name: 'Анонимный Холдер $TRX',
                    wallet: 'TVK...PYb',
                    amountUSDT: 15500,
                    startup: 'Монетизация Храпа SnoozeCoin',
                    category: 'Безумные Гаджеты',
                    tier: 'Ангел-Инвестор',
                    verified: true,
                    txHash: '2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a',
                    date: '12 Ноября 2026',
                    timestamp: Date.now() - 3600000 * 120
                }
            ];
            this.saveInvestors(initialInvestors);
        }
    }

    // Получить всех инвесторов
    getInvestors(filter = 'all', searchQuery = '') {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_INVESTORS);
            let list = raw ? JSON.parse(raw) : [];

            // Фильтр по сумме
            if (filter === 'large') {
                list = list.filter(i => i.amountUSDT >= 100000);
            } else if (filter === 'medium') {
                list = list.filter(i => i.amountUSDT >= 30000 && i.amountUSDT < 100000);
            } else if (filter === 'angel') {
                list = list.filter(i => i.amountUSDT < 30000);
            }

            // Поисковый запрос
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                list = list.filter(i => 
                    i.name.toLowerCase().includes(q) || 
                    i.startup.toLowerCase().includes(q) ||
                    i.wallet.toLowerCase().includes(q)
                );
            }

            // Сортировка по сумме убывания
            return list.sort((a, b) => b.amountUSDT - a.amountUSDT);
        } catch (e) {
            console.error('Ошибка чтения БД инвесторов:', e);
            return [];
        }
    }

    saveInvestors(investors) {
        localStorage.setItem(this.STORAGE_KEY_INVESTORS, JSON.stringify(investors));
    }

    // Добавить новую запись инвестиции
    addInvestment(name, wallet, amountUSDT, startupName, category, txHash = '') {
        const investors = this.getInvestors('all');
        const cleanAmount = parseFloat(amountUSDT) || 1000;

        let tier = 'Ангел-Инвестор';
        if (cleanAmount >= 100000) tier = 'Генеральный Синдикат';
        else if (cleanAmount >= 50000) tier = 'Институционал';
        else if (cleanAmount >= 20000) tier = 'Синдикат Района';

        const record = {
            id: 'tx_' + Date.now(),
            name: name.trim() || 'Инкогнито Инвестор',
            wallet: wallet || 'TVKNb8MWNfxue3dQJxKB9oXT5h9Y88PYb5',
            amountUSDT: cleanAmount,
            startup: startupName || 'Перспективный Стартап',
            category: category || 'Общий Сектор',
            tier: tier,
            verified: Boolean(txHash && txHash.length >= 8),
            txHash: txHash.trim() || 'Внутренний Ордер Синдиката',
            date: 'Сегодня',
            timestamp: Date.now()
        };

        investors.unshift(record);
        this.saveInvestors(investors);
        return record;
    }

    // Получить статистику базы данных
    getStats() {
        const investors = this.getInvestors('all');
        const totalCapital = investors.reduce((acc, i) => acc + (i.amountUSDT || 0), 0);
        const avgCheck = investors.length > 0 ? Math.round(totalCapital / investors.length) : 0;
        const topInvestor = investors.length > 0 ? investors[0].name : 'Нет данных';

        return {
            totalCapital,
            count: investors.length,
            avgCheck,
            topInvestor
        };
    }

    // Экспорт базы данных в JSON файл
    exportJSON() {
        const data = {
            syndicateName: "LOFT CAPITAL PARTNERS",
            exportDate: new Date().toISOString(),
            stats: this.getStats(),
            investors: this.getInvestors('all')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `loft_capital_database_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Сброс базы к начальным данным
    resetToDefault() {
        localStorage.removeItem(this.STORAGE_KEY_INVESTORS);
        this.init();
    }
}

window.syndicateDB = new SyndicateDatabase();
