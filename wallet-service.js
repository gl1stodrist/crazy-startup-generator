// Multi-Wallet Integration & TRON Protocol Manager for Loft Capital
// Target Syndicate Vault: TVKNb8MWNfxue3dQJxKB9oXT5h9Y88PYb5

class WalletService {
    constructor() {
        this.targetTronAddress = 'TVKNb8MWNfxue3dQJxKB9oXT5h9Y88PYb5';
        this.connectedWallet = null;
        this.walletType = null; // 'tronlink', 'metamask', 'phantom', 'custom'
        this.address = null;
    }

    getTargetAddress() {
        return this.targetTronAddress;
    }

    // Check availability of provider extensions
    checkProviders() {
        return {
            tronLink: typeof window.tronWeb !== 'undefined' || typeof window.tronLink !== 'undefined',
            metaMask: typeof window.ethereum !== 'undefined',
            phantom: typeof window.solana !== 'undefined' && window.solana.isPhantom
        };
    }

    // Connect TronLink
    async connectTronLink() {
        try {
            if (window.tronLink) {
                const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
                if (res.code === 200 && window.tronWeb && window.tronWeb.defaultAddress.base58) {
                    this.address = window.tronWeb.defaultAddress.base58;
                    this.walletType = 'tronlink';
                    this.connectedWallet = 'TronLink (TRON)';
                    return { success: true, address: this.address, wallet: 'TronLink' };
                }
            } else if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                this.address = window.tronWeb.defaultAddress.base58;
                this.walletType = 'tronlink';
                this.connectedWallet = 'TronLink (TRON)';
                return { success: true, address: this.address, wallet: 'TronLink' };
            }
            throw new Error('TronLink не найден или не авторизован');
        } catch (e) {
            console.warn('TronLink connect error:', e);
            throw e;
        }
    }

    // Connect MetaMask / EVM
    async connectMetaMask() {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts && accounts.length > 0) {
                    this.address = accounts[0];
                    this.walletType = 'metamask';
                    this.connectedWallet = 'MetaMask (EVM)';
                    return { success: true, address: this.address, wallet: 'MetaMask' };
                }
            }
            throw new Error('MetaMask не найден');
        } catch (e) {
            console.warn('MetaMask connect error:', e);
            throw e;
        }
    }

    // Connect Phantom (Solana)
    async connectPhantom() {
        try {
            if (window.solana && window.solana.isPhantom) {
                const resp = await window.solana.connect();
                this.address = resp.publicKey.toString();
                this.walletType = 'phantom';
                this.connectedWallet = 'Phantom (Solana)';
                return { success: true, address: this.address, wallet: 'Phantom' };
            }
            throw new Error('Phantom не найден');
        } catch (e) {
            console.warn('Phantom connect error:', e);
            throw e;
        }
    }

    // Simulate / Connect Manual Wallet
    connectSimulated(walletName) {
        const randHex = Math.random().toString(16).substring(2, 6);
        this.address = `T9x...${randHex}`;
        this.walletType = 'simulated';
        this.connectedWallet = walletName || 'Private Vault';
        return { success: true, address: this.address, wallet: this.connectedWallet };
    }

    // Send real TRON transaction via TronLink if available
    async sendTronTransaction(amountTrx) {
        if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
            throw new Error('TronLink не подключен');
        }

        const sunAmount = Math.floor((parseFloat(amountTrx) || 10) * 1000000); // 1 TRX = 1,000,000 SUN
        const tx = await window.tronWeb.trx.sendTransaction(this.targetTronAddress, sunAmount);
        return tx;
    }

    // Generate QR Code URL for the TRON address
    getQrCodeUrl(amount = '') {
        const data = amount ? `tron:${this.targetTronAddress}?amount=${amount}` : this.targetTronAddress;
        return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data)}&bgcolor=1f2026&color=e0b589&margin=10`;
    }
}

window.walletService = new WalletService();
