// Loft Capital & Syndicate - Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize 3D Loft Gallery Scene
    const scene = new LoftGalleryScene('webgl-canvas-container');

    // 2. State
    let currentStartup = null;
    let isGenerating = false;
    let walletConnected = false;
    let currentAddress = null;
    let favorites = JSON.parse(localStorage.getItem('loft_favorites') || '[]');

    // 3. DOM Elements
    const btnGenerate = document.getElementById('btn-generate');
    const memorandumCard = document.getElementById('memorandum-card');
    const memorandumWrapper = document.getElementById('memorandum-wrapper');

    // Header buttons
    const btnConnectWallet = document.getElementById('btn-connect-wallet');
    const walletLabel = document.getElementById('wallet-label');
    const btnAudio = document.getElementById('btn-audio');
    const btnFavorites = document.getElementById('btn-favorites');

    // Startup Card Header & General
    const startupName = document.getElementById('startup-name');
    const startupTicker = document.getElementById('startup-ticker');
    const startupCategory = document.getElementById('startup-category');
    const startupStage = document.getElementById('startup-stage');
    const startupTagline = document.getElementById('startup-tagline');
    const pitchProblem = document.getElementById('pitch-problem');
    const pitchSolution = document.getElementById('pitch-solution');
    const sourceStamp = document.getElementById('source-stamp');

    // KPI Metrics Tiles
    const kpiTam = document.getElementById('kpi-tam');
    const kpiBurn = document.getElementById('kpi-burn');
    const kpiRunway = document.getElementById('kpi-runway');
    const kpiUnit = document.getElementById('kpi-unit');
    const kpiHype = document.getElementById('kpi-hype');

    // SWOT Analysis Elements
    const swotS = document.getElementById('swot-s');
    const swotW = document.getElementById('swot-w');
    const swotO = document.getElementById('swot-o');
    const swotT = document.getElementById('swot-t');

    // Roadmap & Founders Containers
    const roadmapContainer = document.getElementById('roadmap-container');
    const foundersRow = document.getElementById('founders-row');

    // Cap Table & Tags
    const capTableBar = document.getElementById('cap-table-bar');
    const capTableLegend = document.getElementById('cap-table-legend');
    const pitchBackers = document.getElementById('pitch-backers');
    const pitchAudit = document.getElementById('pitch-audit');
    const pitchTags = document.getElementById('pitch-tags');

    // Action buttons
    const btnCopyMemo = document.getElementById('btn-copy-memo');
    const btnInvestNow = document.getElementById('btn-invest-now');
    const btnFav = document.getElementById('btn-fav');
    const btnOpenInvestTop = document.getElementById('btn-open-invest-top');

    // Category Filter Pills
    const filterPills = document.querySelectorAll('.filter-pill[data-filter]');

    // ROI Simulator Elements
    const roiSlider = document.getElementById('roi-slider');
    const roiSliderAmount = document.getElementById('roi-slider-amount');
    const roiResultPayout = document.getElementById('roi-result-payout');
    const roiResultPercent = document.getElementById('roi-result-percent');
    const roiResultPerks = document.getElementById('roi-result-perks');

    // Modals
    const modalWallet = document.getElementById('modal-wallet');
    const modalInvest = document.getElementById('modal-invest');
    const modalHistory = document.getElementById('modal-history');

    // Syndicate Table & Metrics
    const syndicateTableBody = document.getElementById('syndicate-table-body');
    const metricTotalCapital = document.getElementById('metric-total-capital');
    const metricActiveDeals = document.getElementById('metric-active-deals');

    // Invest modal fields
    const qrImage = document.getElementById('qr-image');
    const vaultAddressText = document.getElementById('vault-address-text');
    const btnCopyVaultAddress = document.getElementById('btn-copy-vault-address');
    const inputInvestorName = document.getElementById('input-investor-name');
    const inputInvestAmount = document.getElementById('input-invest-amount');
    const inputTxHash = document.getElementById('input-tx-hash');
    const btnSubmitInvestment = document.getElementById('btn-submit-investment');
    const btnDirectTronLink = document.getElementById('btn-direct-tronlink');

    // Initialize Vault Address in UI
    const targetAddress = window.walletService.getTargetAddress();
    if (vaultAddressText) vaultAddressText.textContent = targetAddress;
    if (qrImage) qrImage.src = window.walletService.getQrCodeUrl();

    // 4. SUBTLE & GENTLE CARD TILT (Reduced drastically as requested)
    if (memorandumWrapper && memorandumCard) {
        memorandumWrapper.addEventListener('mousemove', (e) => {
            const rect = memorandumWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Ultra-subtle tilt: max +/- 1.2 degrees (no drastic movement)
            const rotateX = ((y - centerY) / centerY) * -1.2;
            const rotateY = ((x - centerX) / centerX) * 1.5;
            memorandumCard.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        memorandumWrapper.addEventListener('mouseleave', () => {
            memorandumCard.style.transform = 'perspective(1600px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // 5. Sound SFX Toggle
    if (btnAudio) {
        btnAudio.addEventListener('click', () => {
            const enabled = window.cyberAudio.toggle();
            btnAudio.innerHTML = enabled ? '🔊' : '🔇';
            showToast(enabled ? 'Звуковые сигналы включены' : 'Звук отключен');
            if (enabled) window.cyberAudio.playClick();
        });
    }

    // Toast Notifications
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast-loft';
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // 6. Interactive ROI Calculator Logic
    function updateRoiCalculator() {
        if (!roiSlider) return;
        const deposit = parseFloat(roiSlider.value) || 10000;
        roiSliderAmount.textContent = `$${deposit.toLocaleString()} USDT`;

        // Absurd multiplication formula
        const payout = Math.round(deposit * 14.85);
        const percent = "+1,385%";
        roiResultPayout.textContent = `$${payout.toLocaleString()}`;
        roiResultPercent.textContent = percent;

        // Dynamic perk calculation based on current startup
        if (currentStartup && currentStartup.name.includes('Pelmeni')) {
            roiResultPerks.textContent = `${Math.round(deposit * 0.04)} кг пельменей в квартал`;
        } else if (currentStartup && currentStartup.name.includes('Cat')) {
            roiResultPerks.textContent = `${Math.round(deposit * 0.002)} котиков для сторис`;
        } else if (currentStartup && currentStartup.name.includes('Shau')) {
            roiResultPerks.textContent = `${Math.round(deposit * 0.05)} сырных шаурм в подарок`;
        } else {
            roiResultPerks.textContent = `${Math.round(deposit * 0.03)} часов глубокого сна`;
        }
    }

    if (roiSlider) {
        roiSlider.addEventListener('input', updateRoiCalculator);
    }

    // 7. Render Syndicate Leaderboard Table
    function renderSyndicateLeaderboard() {
        if (!syndicateTableBody) return;
        const investors = window.investorDB.getInvestors();
        syndicateTableBody.innerHTML = '';

        investors.forEach((inv, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="investor-rank">#${index + 1}</td>
                <td>
                    <div class="investor-name-cell">
                        <span>${inv.name}</span>
                        ${inv.verified ? '<span class="badge-verified">VERIFIED</span>' : ''}
                    </div>
                </td>
                <td class="investor-amount">$${inv.amountUSDT.toLocaleString()} USDT</td>
                <td style="color: var(--accent-sand);">${inv.startup}</td>
                <td style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">${inv.date}</td>
            `;
            syndicateTableBody.appendChild(tr);
        });

        const total = window.investorDB.getTotalCapital();
        if (metricTotalCapital) metricTotalCapital.textContent = `$${total.toLocaleString()}`;
        if (metricActiveDeals) metricActiveDeals.textContent = `${investors.length} СИНДИКАТОВ`;
    }

    // 8. Render All Startup Data into UI
    function renderStartup(data) {
        currentStartup = data;

        startupName.textContent = data.name;
        startupTicker.textContent = data.ticker;
        if (startupCategory) startupCategory.textContent = data.category || 'Venture Asset';
        startupStage.textContent = data.stage;
        startupTagline.textContent = data.tagline;
        pitchProblem.textContent = data.problem;
        pitchSolution.textContent = data.solution;
        pitchBackers.textContent = data.backers;
        pitchAudit.textContent = data.audit;

        // KPI Tiles
        if (data.metrics) {
            kpiTam.textContent = data.metrics.tam;
            kpiBurn.textContent = data.metrics.burnRate;
            kpiRunway.textContent = data.metrics.runway;
            kpiUnit.textContent = data.metrics.unitEconomics;
            kpiHype.textContent = data.metrics.hypeIndex;
        }

        // SWOT Matrix
        if (data.swot) {
            swotS.textContent = data.swot.strengths;
            swotW.textContent = data.swot.weaknesses;
            swotO.textContent = data.swot.opportunities;
            swotT.textContent = data.swot.threats;
        }

        // Roadmap Milestones
        if (roadmapContainer && Array.isArray(data.roadmap)) {
            roadmapContainer.innerHTML = '';
            data.roadmap.forEach(step => {
                const box = document.createElement('div');
                box.className = 'roadmap-step';
                box.innerHTML = `
                    <div class="roadmap-step-period">${step.period} // ЭТАП</div>
                    <div class="roadmap-step-text">${step.task}</div>
                `;
                roadmapContainer.appendChild(box);
            });
        }

        // Founders & Management
        if (foundersRow && Array.isArray(data.team)) {
            foundersRow.innerHTML = '';
            data.team.forEach(m => {
                const card = document.createElement('div');
                card.className = 'founder-card';
                card.innerHTML = `
                    <div class="founder-role">${m.role}</div>
                    <div class="founder-name">${m.name}</div>
                    <div class="founder-bio">${m.bio}</div>
                `;
                foundersRow.appendChild(card);
            });
        }

        // Cap Table Progress Bar
        capTableBar.innerHTML = '';
        capTableLegend.innerHTML = '';
        const palette = ['#e0b589', '#c89666', '#8892b0', '#646a7c'];

        if (Array.isArray(data.tokenomics)) {
            data.tokenomics.forEach((item, idx) => {
                const color = palette[idx % palette.length];
                
                const slice = document.createElement('div');
                slice.className = 'cap-table-slice';
                slice.style.width = `${item.percent}%`;
                slice.style.backgroundColor = color;
                slice.title = `${item.label}: ${item.percent}%`;
                capTableBar.appendChild(slice);

                const legend = document.createElement('div');
                legend.className = 'cap-legend-item';
                legend.innerHTML = `
                    <div class="cap-legend-color" style="background-color: ${color}"></div>
                    <span><strong>${item.percent}%</strong> — ${item.label}</span>
                `;
                capTableLegend.appendChild(legend);
            });
        }

        // Tags
        pitchTags.innerHTML = '';
        if (Array.isArray(data.tags)) {
            data.tags.forEach(tag => {
                const item = document.createElement('span');
                item.className = 'tag-item';
                item.textContent = tag;
                pitchTags.appendChild(item);
            });
        }

        updateFavButton();
        updateRoiCalculator();
    }

    // 9. Generate Action
    async function handleGenerate() {
        if (isGenerating) return;
        isGenerating = true;

        window.cyberAudio.playGenerate();
        scene.triggerBoost();

        btnGenerate.disabled = true;
        btnGenerate.innerHTML = '<span>⏳ АНАЛИЗ ИНВЕСТИЦИОННОЙ МОДЕЛИ...</span>';
        memorandumCard.style.opacity = '0.6';

        try {
            const data = window.startupGenerator.generate();
            renderStartup(data);
            window.cyberAudio.playSuccess();
        } catch (err) {
            console.error(err);
        } finally {
            memorandumCard.style.opacity = '1';
            btnGenerate.disabled = false;
            btnGenerate.innerHTML = '<span>СГЕНЕРИРОВАТЬ МЕМОРАНДУМ</span>';
            isGenerating = false;
        }
    }

    btnGenerate.addEventListener('click', handleGenerate);

    // Category Filter Pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const category = pill.dataset.filter;
            window.startupGenerator.setFilter(category);
            window.cyberAudio.playClick();
            handleGenerate();
        });
    });

    // Copy Memorandum
    if (btnCopyMemo) {
        btnCopyMemo.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();

            const memoText = `ИНВЕСТИЦИОННЫЙ МЕМОРАНДУМ [КОНФИДЕНЦИАЛЬНО]
СИНДИКАТ: ${currentStartup.name} (${currentStartup.ticker})
КАТЕГОРИЯ: ${currentStartup.category}
ОЦЕНКА: ${currentStartup.stage}

ТЕЗИС:
${currentStartup.tagline}

ПРОБЛЕМА РЫНКА:
${currentStartup.problem}

РЕШЕНИЕ:
${currentStartup.solution}

ОСНОВНЫЕ МЕТРИКИ:
• TAM: ${currentStartup.metrics ? currentStartup.metrics.tam : ''}
• Burn Rate: ${currentStartup.metrics ? currentStartup.metrics.burnRate : ''}
• Runway: ${currentStartup.metrics ? currentStartup.metrics.runway : ''}

ВЕДУЩИЕ СИНДИКАТЫ: ${currentStartup.backers}
АУДИТ БЕЗОПАСНОСТИ: ${currentStartup.audit}

Официальные реквизиты синдиката (TRON Network USDT/TRX): TVKNb8MWNfxue3dQJxKB9oXT5h9Y88PYb5
Оформлено через LOFT CAPITAL PARTNERS`;

            navigator.clipboard.writeText(memoText).then(() => {
                showToast('📋 Меморандум скопирован в буфер обмена');
                window.cyberAudio.playSuccess();
            }).catch(() => {
                showToast('Ошибка копирования');
            });
        });
    }

    // Favorites
    function updateFavButton() {
        if (!btnFav || !currentStartup) return;
        const isFav = favorites.some(f => f.name === currentStartup.name);
        btnFav.innerHTML = isFav ? '★ В портфеле' : '☆ В портфель';
        btnFav.style.color = isFav ? 'var(--accent-bronze)' : '';
    }

    if (btnFav) {
        btnFav.addEventListener('click', () => {
            if (!currentStartup) return;
            window.cyberAudio.playClick();
            const idx = favorites.findIndex(f => f.name === currentStartup.name);
            if (idx >= 0) {
                favorites.splice(idx, 1);
                showToast('Удалено из портфеля');
            } else {
                favorites.unshift(currentStartup);
                if (favorites.length > 30) favorites.pop();
                showToast('★ Добавлено в инвестиционный портфель');
            }
            localStorage.setItem('loft_favorites', JSON.stringify(favorites));
            updateFavButton();
        });
    }

    // Open Invest Modal
    function openInvestModal() {
        window.cyberAudio.playClick();
        if (inputInvestorName && !inputInvestorName.value && currentAddress) {
            inputInvestorName.value = `Синдикат ${currentAddress}`;
        }
        openModal(modalInvest);
    }

    if (btnInvestNow) btnInvestNow.addEventListener('click', openInvestModal);
    if (btnOpenInvestTop) btnOpenInvestTop.addEventListener('click', openInvestModal);

    // Copy Vault Address
    if (btnCopyVaultAddress) {
        btnCopyVaultAddress.addEventListener('click', () => {
            window.cyberAudio.playClick();
            navigator.clipboard.writeText(targetAddress).then(() => {
                showToast('✅ TRON адрес скопирован в буфер: ' + targetAddress);
                btnCopyVaultAddress.textContent = 'Скопировано!';
                setTimeout(() => btnCopyVaultAddress.textContent = 'Копировать', 2000);
            });
        });
    }

    // Direct TronLink Transfer
    if (btnDirectTronLink) {
        btnDirectTronLink.addEventListener('click', async () => {
            window.cyberAudio.playClick();
            const amount = parseFloat(inputInvestAmount.value) || 10;
            try {
                showToast('⏳ Инициализация транзакции в TronLink...');
                const tx = await window.walletService.sendTronTransaction(amount);
                showToast('🎉 Транзакция отправлена в сеть TRON!');
                if (inputTxHash) inputTxHash.value = tx || 'TronLink-Confirmed';
            } catch (err) {
                showToast('TronLink: ' + (err.message || 'Ошибка транзакции'));
            }
        });
    }

    // Submit Investment to Leaderboard
    if (btnSubmitInvestment) {
        btnSubmitInvestment.addEventListener('click', () => {
            window.cyberAudio.playCash();
            const name = inputInvestorName.value.trim() || 'Инкогнито Инвестор';
            const amount = parseFloat(inputInvestAmount.value) || 5000;
            const txHash = inputTxHash.value.trim();
            const startup = currentStartup ? currentStartup.name : 'PelmeniAlert Smart-Pot';

            window.investorDB.addInvestment(name, currentAddress || targetAddress, amount, startup, txHash);
            renderSyndicateLeaderboard();

            closeModal(modalInvest);

            // Confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#e0b589', '#c89666', '#34d399', '#ffffff']
                });
            }

            showToast(`Успешно! ${name} зафиксирован в Реестре Инвесторов на $${amount.toLocaleString()} USDT!`);
        });
    }

    // Connect Wallet Modal & Actions
    if (btnConnectWallet) {
        btnConnectWallet.addEventListener('click', () => {
            window.cyberAudio.playClick();
            if (!walletConnected) {
                openModal(modalWallet);
            } else {
                showToast(`Подключено: ${currentAddress}`);
            }
        });
    }

    document.querySelectorAll('.wallet-row-item').forEach(row => {
        row.addEventListener('click', async () => {
            const type = row.dataset.wallet;
            window.cyberAudio.playClick();

            try {
                let res;
                if (type === 'tronlink') {
                    res = await window.walletService.connectTronLink();
                } else if (type === 'metamask') {
                    res = await window.walletService.connectMetaMask();
                } else if (type === 'phantom') {
                    res = await window.walletService.connectPhantom();
                } else {
                    res = window.walletService.connectSimulated(row.querySelector('.wallet-row-name').textContent);
                }

                currentAddress = res.address;
                walletConnected = true;
                btnConnectWallet.classList.add('active');
                walletLabel.textContent = `${res.wallet}: ${currentAddress.slice(0, 6)}...`;
                closeModal(modalWallet);
                showToast(`✅ ${res.wallet} успешно подключен!`);
                window.cyberAudio.playSuccess();
            } catch (e) {
                showToast(`Не удалось подключить: ${e.message}`);
            }
        });
    });

    // Favorites / Portfolio Modal
    if (btnFavorites) {
        btnFavorites.addEventListener('click', () => {
            window.cyberAudio.playClick();
            renderFavoritesList();
            openModal(modalHistory);
        });
    }

    function renderFavoritesList() {
        const container = document.getElementById('history-list');
        if (!container) return;
        container.innerHTML = '';

        if (favorites.length === 0) {
            container.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 24px;">В инвестиционном портфеле пока нет проектов.</div>';
            return;
        }

        favorites.forEach(item => {
            const row = document.createElement('div');
            row.className = 'wallet-row-item';
            row.innerHTML = `
                <div>
                    <span style="color: var(--accent-bronze); font-weight: 700;">${item.ticker}</span>
                    <span style="margin-left: 8px;">${item.name}</span>
                </div>
                <button class="btn-loft-secondary" style="padding: 4px 10px; font-size: 0.75rem;">Открыть</button>
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
        if (modal) modal.classList.add('open');
    }
    function closeModal(modal) {
        if (modal) modal.classList.remove('open');
    }

    document.querySelectorAll('.loft-modal-backdrop').forEach(b => {
        b.addEventListener('click', (e) => {
            if (e.target === b) closeModal(b);
        });
    });

    document.querySelectorAll('.btn-close-loft').forEach(btn => {
        btn.addEventListener('click', () => {
            const m = btn.closest('.loft-modal-backdrop');
            if (m) closeModal(m);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.loft-modal-backdrop.open').forEach(closeModal);
        }
    });

    // Initial render
    renderSyndicateLeaderboard();
    handleGenerate();
});
