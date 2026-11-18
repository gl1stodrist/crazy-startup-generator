// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D WebGL Scene
    const scene = new Cyber3DScene('webgl-canvas-container');

    // State
    let currentStartup = null;
    let isGenerating = false;
    let walletConnected = false;
    let walletAddress = null;
    let favorites = JSON.parse(localStorage.getItem('delusion_favorites') || '[]');

    // DOM Elements
    const btnGenerate = document.getElementById('btn-generate');
    const startupCard = document.getElementById('startup-card');
    const cardWrapper = document.getElementById('card-wrapper');
    const cursorGlow = document.getElementById('cursor-glow');
    
    // Header elements
    const btnWallet = document.getElementById('btn-wallet');
    const walletText = document.getElementById('wallet-text');
    const btnAudio = document.getElementById('btn-audio');
    const btnSettings = document.getElementById('btn-settings');
    const btnHistory = document.getElementById('btn-history');

    // Startup Card Elements
    const startupName = document.getElementById('startup-name');
    const startupTicker = document.getElementById('startup-ticker');
    const startupStage = document.getElementById('startup-stage');
    const startupTagline = document.getElementById('startup-tagline');
    const pitchProblem = document.getElementById('pitch-problem');
    const pitchSolution = document.getElementById('pitch-solution');
    const tokenomicsBar = document.getElementById('tokenomics-bar');
    const tokenomicsLegend = document.getElementById('tokenomics-legend');
    const pitchBackers = document.getElementById('pitch-backers');
    const pitchAudit = document.getElementById('pitch-audit');
    const pitchTags = document.getElementById('pitch-tags');
    const sourceBadge = document.getElementById('source-badge');

    // Action buttons
    const btnCopy = document.getElementById('btn-copy');
    const btnInvest = document.getElementById('btn-invest');
    const btnShareTg = document.getElementById('btn-share-tg');
    const btnShareX = document.getElementById('btn-share-x');
    const btnFav = document.getElementById('btn-fav');

    // Modals
    const modalWallet = document.getElementById('modal-wallet');
    const modalInvest = document.getElementById('modal-invest');
    const modalSettings = document.getElementById('modal-settings');
    const modalHistory = document.getElementById('modal-history');

    // Settings elements
    const inputApiKey = document.getElementById('input-api-key');
    const btnSaveKey = document.getElementById('btn-save-key');
    const modeBtns = document.querySelectorAll('.mode-btn');

    // Custom Cursor Glow Follower
    window.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 3D Card Tilt Effect on Mouse Move
    if (cardWrapper && startupCard) {
        cardWrapper.addEventListener('mousemove', (e) => {
            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 12;

            startupCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        cardWrapper.addEventListener('mouseleave', () => {
            startupCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    // Sound toggle
    if (btnAudio) {
        btnAudio.addEventListener('click', () => {
            const enabled = window.cyberAudio.toggle();
            btnAudio.innerHTML = enabled ? '🔊' : '🔇';
            showToast(enabled ? 'Звуковые эффекты включены' : 'Звук отключен');
            if (enabled) window.cyberAudio.playClick();
        });
    }

    // Toast Notifications
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // Render Startup Data into UI
    function renderStartup(data) {
        currentStartup = data;

        startupName.textContent = data.name;
        startupTicker.textContent = data.ticker;
        startupStage.textContent = data.stage;
        startupTagline.textContent = data.tagline;
        pitchProblem.textContent = data.problem;
        pitchSolution.textContent = data.solution;
        pitchBackers.textContent = data.backers;
        pitchAudit.textContent = data.audit;
        sourceBadge.innerHTML = `<span>⚡</span> ${data.source}`;

        // Tokenomics Bar & Legend
        tokenomicsBar.innerHTML = '';
        tokenomicsLegend.innerHTML = '';
        const colors = ['#00f0ff', '#9d4edd', '#ff007a', '#00ff88', '#ffd700'];

        if (Array.isArray(data.tokenomics)) {
            data.tokenomics.forEach((item, idx) => {
                const color = colors[idx % colors.length];
                
                // Bar slice
                const slice = document.createElement('div');
                slice.className = 'tokenomics-slice';
                slice.style.width = `${item.percent}%`;
                slice.style.backgroundColor = color;
                slice.title = `${item.label}: ${item.percent}%`;
                tokenomicsBar.appendChild(slice);

                // Legend item
                const legend = document.createElement('div');
                legend.className = 'legend-item';
                legend.innerHTML = `
                    <div class="legend-color" style="background-color: ${color}"></div>
                    <span><strong>${item.percent}%</strong> ${item.label}</span>
                `;
                tokenomicsLegend.appendChild(legend);
            });
        }

        // Tags
        pitchTags.innerHTML = '';
        if (Array.isArray(data.tags)) {
            data.tags.forEach(tag => {
                const badge = document.createElement('span');
                badge.className = 'tag-badge';
                badge.textContent = tag;
                pitchTags.appendChild(badge);
            });
        }

        // Update favorite button state
        updateFavButton();
    }

    // Generate Idea Action
    async function handleGenerate() {
        if (isGenerating) return;
        isGenerating = true;

        window.cyberAudio.playGenerate();
        scene.triggerBoost();

        btnGenerate.disabled = true;
        btnGenerate.innerHTML = '<span>⚡ КВАНТОВЫЙ СИНТЕЗ...</span>';
        startupCard.style.opacity = '0.4';
        startupCard.style.filter = 'blur(4px)';

        try {
            const data = await window.startupGenerator.generate();
            renderStartup(data);
            window.cyberAudio.playSuccess();
        } catch (err) {
            console.error(err);
            showToast('Ошибка генерации, переключено на резервный алгоритм', 'error');
            const fallback = window.startupGenerator.generateQuantum();
            renderStartup(fallback);
        } finally {
            startupCard.style.opacity = '1';
            startupCard.style.filter = 'none';
            btnGenerate.disabled = false;
            btnGenerate.innerHTML = '<span>🎲 СГЕНЕРИРОВАТЬ СТАРТАП</span><div class="btn-glow"></div>';
            isGenerating = false;
        }
    }

    btnGenerate.addEventListener('click', handleGenerate);

    // Mode Switcher Buttons (Quantum vs Neural)
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            window.startupGenerator.setMode(mode);
            window.cyberAudio.playClick();
            showToast(`Активирован: ${mode === 'neural' ? '🧠 Режим Gemini AI' : '⚡ Квантовый генератор'}`);
        });
    });

    // Copy Pitch Deck
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();

            const pitchText = `🚀 СТАРТАП: ${currentStartup.name} (${currentStartup.ticker})
${currentStartup.stage}

💬 «${currentStartup.tagline}»

🎯 ПРОБЛЕМА:
${currentStartup.problem}

💡 РЕШЕНИЕ:
${currentStartup.solution}

📊 ТОКЕНОМИКА:
${currentStartup.tokenomics ? currentStartup.tokenomics.map(t => `• ${t.percent}% — ${t.label}`).join('\n') : ''}

👑 ВЕДУЩИЕ ИНВЕСТОРЫ: ${currentStartup.backers}
🛡️ АУДИТ: ${currentStartup.audit}
🏷️ ${currentStartup.tags ? currentStartup.tags.join(' ') : ''}

🌐 Сгенерировано на DELUSION.DAO — Web3 Генератор Бредовых Стартапов`;

            navigator.clipboard.writeText(pitchText).then(() => {
                showToast('📋 Питч скопирован в буфер обмена!');
                window.cyberAudio.playSuccess();
            }).catch(() => {
                showToast('Не удалось скопировать', 'error');
            });
        });
    }

    // Share to Telegram
    if (btnShareTg) {
        btnShareTg.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();
            const text = encodeURIComponent(`Глянь какой бредовый Web3-стартап я нашел: ${currentStartup.name} (${currentStartup.ticker})! «${currentStartup.tagline}» 😂`);
            const url = encodeURIComponent(window.location.href);
            window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
        });
    }

    // Share to X (Twitter)
    if (btnShareX) {
        btnShareX.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();
            const text = encodeURIComponent(`Just invested all my savings into ${currentStartup.name} (${currentStartup.ticker})! 🚀
«${currentStartup.tagline}»

Built on @delusion_dao Web3!`);
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        });
    }

    // Favorites Logic
    function updateFavButton() {
        if (!btnFav || !currentStartup) return;
        const isFav = favorites.some(f => f.name === currentStartup.name);
        btnFav.innerHTML = isFav ? '❤️ В избранном' : '🤍 В избранное';
        btnFav.style.color = isFav ? 'var(--neon-pink)' : '';
    }

    if (btnFav) {
        btnFav.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();
            const idx = favorites.findIndex(f => f.name === currentStartup.name);
            if (idx >= 0) {
                favorites.splice(idx, 1);
                showToast('Удалено из избранного');
            } else {
                favorites.unshift(currentStartup);
                if (favorites.length > 30) favorites.pop();
                showToast('❤️ Добавлено в избранное!');
            }
            localStorage.setItem('delusion_favorites', JSON.stringify(favorites));
            updateFavButton();
        });
    }

    // Invest Modal & Simulation
    if (btnInvest) {
        btnInvest.addEventListener('click', () => {
            window.cyberAudio.playClick();
            openModal(modalInvest);
            document.getElementById('invest-token-sym').textContent = currentStartup ? currentStartup.ticker : '$HYPE';
        });
    }

    const btnConfirmInvest = document.getElementById('btn-confirm-invest');
    if (btnConfirmInvest) {
        btnConfirmInvest.addEventListener('click', () => {
            window.cyberAudio.playCash();
            btnConfirmInvest.disabled = true;
            btnConfirmInvest.textContent = '⏳ Минтинг транзакции в L2...';

            setTimeout(() => {
                closeModal(modalInvest);
                btnConfirmInvest.disabled = false;
                btnConfirmInvest.textContent = 'Подтвердить инвестицию';

                // Confetti blast!
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#00f0ff', '#ff007a', '#00ff88', '#ffd700']
                    });
                }

                showToast(`🎉 Успешно! Вы инвестировали 10 ETH в ${currentStartup ? currentStartup.ticker : 'стартап'}!`);
            }, 1200);
        });
    }

    // Wallet Connect Logic
    if (btnWallet) {
        btnWallet.addEventListener('click', () => {
            window.cyberAudio.playClick();
            if (!walletConnected) {
                openModal(modalWallet);
            } else {
                showToast(`Подключен: ${walletAddress}`);
            }
        });
    }

    document.querySelectorAll('.wallet-option').forEach(opt => {
        opt.addEventListener('click', () => {
            window.cyberAudio.playSuccess();
            closeModal(modalWallet);

            // Generate fake web3 address
            const randHex = Math.random().toString(16).substring(2, 6);
            walletAddress = `0x71C...${randHex}`;
            walletConnected = true;

            btnWallet.classList.add('connected');
            walletText.textContent = `${walletAddress} (420.69 $DEL)`;
            showToast(`Кошелек успешно подключен: ${walletAddress}`);

            // Confetti
            if (typeof confetti === 'function') {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.2 } });
            }
        });
    });

    // Settings Modal (API Key)
    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            window.cyberAudio.playClick();
            if (inputApiKey) {
                inputApiKey.value = window.startupGenerator.apiKey || '';
            }
            openModal(modalSettings);
        });
    }

    if (btnSaveKey) {
        btnSaveKey.addEventListener('click', () => {
            window.cyberAudio.playClick();
            const key = inputApiKey.value.trim();
            window.startupGenerator.setApiKey(key);
            closeModal(modalSettings);
            showToast('✅ Gemini API ключ сохранен в локальном хранилище!');
        });
    }

    // History Modal
    if (btnHistory) {
        btnHistory.addEventListener('click', () => {
            window.cyberAudio.playClick();
            renderHistoryList();
            openModal(modalHistory);
        });
    }

    function renderHistoryList() {
        const container = document.getElementById('history-list');
        if (!container) return;
        container.innerHTML = '';

        if (favorites.length === 0) {
            container.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px;">Нет сохраненных стартапов. Нажмите «В избранное», чтобы сохранить!</div>';
            return;
        }

        favorites.forEach(item => {
            const row = document.createElement('div');
            row.className = 'wallet-option';
            row.innerHTML = `
                <div class="wallet-opt-left">
                    <span style="color: var(--neon-cyan); font-weight: 700;">${item.ticker}</span>
                    <span>${item.name}</span>
                </div>
                <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;">Открыть</button>
            `;
            row.querySelector('button').addEventListener('click', () => {
                closeModal(modalHistory);
                renderStartup(item);
                window.cyberAudio.playClick();
            });
            container.appendChild(row);
        });
    }

    // Modal Helpers
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('open');
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('open');
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal(backdrop);
        });
    });

    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) closeModal(modal);
        });
    });

    // Keyboard ESC to close modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
        }
    });

    // First auto-generation on launch!
    handleGenerate();
});
