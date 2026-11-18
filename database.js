// Database Management for Loft Capital & Delusion DAO
// Persistent storage using LocalStorage & IndexedDB with pre-seeded Angel Investors

class InvestorDatabase {
    constructor() {
        this.STORAGE_KEY_INVESTORS = 'loft_capital_investors';
        this.STORAGE_KEY_TRANSACTIONS = 'loft_capital_transactions';
        this.STORAGE_KEY_STARTUPS = 'loft_capital_saved_startups';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.STORAGE_KEY_INVESTORS)) {
            const initialInvestors = [
                {
                    id: 'inv_1',
                    name: 'Syndicate Alpha Partners',
                    address: 'T9y...4b8',
                    amountUSDT: 250000,
                    startup: 'KebabChain 3.0',
                    tier: 'Lead Syndicate',
                    verified: true,
                    date: '18 Ноя 2026'
                },
                {
                    id: 'inv_2',
                    name: 'Патриаршие Angels Club',
                    address: 'TXz...91a',
                    amountUSDT: 120000,
                    startup: 'SolanaBabka DAO',
                    tier: 'Tier-1 Whale',
                    verified: true,
                    date: '17 Ноя 2026'
                },
                {
                    id: 'inv_3',
                    name: 'Satoshi’s Persian Cat',
                    address: 'TVK...PYb',
                    amountUSDT: 69420,
                    startup: 'ProofOfSleep Protocol',
                    tier: 'Angel Investor',
                    verified: true,
                    date: '16 Ноя 2026'
                },
                {
                    id: 'inv_4',
                    name: 'Гаражный Венчурный Фонд',
                    address: 'TLm...77x',
                    amountUSDT: 45000,
                    startup: 'Zk-Pelmeni Network',
                    tier: 'Private Equity',
                    verified: false,
                    date: '15 Ноя 2026'
                },
                {
                    id: 'inv_5',
                    name: 'Anonymous Swiss Family Office',
                    address: 'TCw...33k',
                    amountUSDT: 35000,
                    startup: 'Doshirak Yield Farm',
                    tier: 'Family Office',
                    verified: true,
                    date: '14 Ноя 2026'
                },
                {
                    id: 'inv_6',
                    name: 'Дед Максим Private Wealth',
                    address: 'TQq...12d',
                    amountUSDT: 15500,
                    startup: 'NeuroDrist AI',
                    tier: 'Angel Investor',
                    verified: true,
                    date: '12 Ноя 2026'
                }
            ];
            this.saveInvestors(initialInvestors);
        }
    }

    getInvestors() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_INVESTORS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    saveInvestors(investors) {
        // Sort descending by amount
        investors.sort((a, b) => b.amountUSDT - a.amountUSDT);
        localStorage.setItem(this.STORAGE_KEY_INVESTORS, JSON.stringify(investors));
    }

    addInvestment(name, address, amountUSDT, startupName, txHash = '') {
        const investors = this.getInvestors();
        const cleanAmount = parseFloat(amountUSDT) || 0;
        
        let tier = 'Angel Investor';
        if (cleanAmount >= 100000) tier = 'Lead Syndicate';
        else if (cleanAmount >= 50000) tier = 'Tier-1 Whale';
        else if (cleanAmount >= 10000) tier = 'Private Equity';

        const newRecord = {
            id: 'inv_' + Date.now(),
            name: name.trim() || 'Инкогнито Инвестор',
            address: address ? (address.slice(0, 4) + '...' + address.slice(-4)) : 'TVK...PYb',
            amountUSDT: cleanAmount,
            startup: startupName || 'KebabChain 3.0',
            tier: tier,
            verified: txHash.length > 10,
            txHash: txHash || '',
            date: 'Сегодня'
        };

        investors.push(newRecord);
        this.saveInvestors(investors);

        // Also record to transaction log
        this.logTransaction(newRecord);

        return newRecord;
    }

    logTransaction(tx) {
        try {
            const logs = JSON.parse(localStorage.getItem(this.STORAGE_KEY_TRANSACTIONS) || '[]');
            logs.unshift(tx);
            if (logs.length > 100) logs.pop();
            localStorage.setItem(this.STORAGE_KEY_TRANSACTIONS, JSON.stringify(logs));
        } catch (e) {
            console.error(e);
        }
    }

    getTotalCapital() {
        const investors = this.getInvestors();
        return investors.reduce((sum, inv) => sum + (inv.amountUSDT || 0), 0);
    }
}

window.investorDB = new InvestorDatabase();
