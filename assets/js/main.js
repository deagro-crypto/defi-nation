/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all application components
 */
function initializeApp() {
    initializeHeader();
    initializeSmoothScroll()
    initializeBlockchainCards();
    initializeScrollAnimations();
    initializeAudioPlayer();
    setupEventListeners();
}

/**
 * Initialize header scroll behavior
 */
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', utils.debounce(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10));
}

/**
 * Initialize blockchain use cases cards with i18n support
 */
function initializeBlockchainCards() {
    const container = document.getElementById('blockchain-use-cases');
    if (!container) return;

    const blockchainUseCases = [
        {
            icon: '💳',
            titleKey: 'cross_border_title',
            descriptionKey: 'cross_border_description',
            details: 'Eliminação de intermediários tradicionais, redução de custos de 40-80% e liquidação em minutos ao invés de dias. Ideal para remessas e comércio internacional.'
        },
        {
            icon: '📄',
            titleKey: 'trade_finance_title',
            descriptionKey: 'trade_finance_description',
            details: 'Automatização de cartas de crédito, redução de tempo de processamento de semanas para horas, e maior transparência na cadeia de suprimentos.'
        },
        {
            icon: '💎',
            titleKey: 'asset_tokenization_title',
            descriptionKey: 'asset_tokenization_description',
            details: 'Conversão de ativos físicos em tokens digitais, permitindo investimentos fracionários em imóveis, arte, commodities e outros ativos tradicionalmente ilíquidos.'
        },
        {
            icon: '🏦',
            titleKey: 'digital_identity_title',
            descriptionKey: 'digital_identity_description',
            details: 'Verificação de identidade uma única vez, compartilhamento seguro entre instituições, redução de custos de compliance e melhor experiência do cliente.'
        },
        {
            icon: '📊',
            titleKey: 'smart_contracts_title',
            descriptionKey: 'smart_contracts_description',
            details: 'Execução automática de acordos quando condições são atendidas, redução de custos operacionais e eliminação de disputas contratuais.'
        },
        {
            icon: '🔒',
            titleKey: 'audit_compliance_title',
            descriptionKey: 'audit_compliance_description',
            details: 'Registro permanente de todas as transações, facilitação de auditorias regulatórias e redução de riscos de fraude e lavagem de dinheiro.'
        }
    ];

    // Function to render cards with current language
    function renderCards() {
        const currentLang = getCurrentLanguage();
        container.innerHTML = blockchainUseCases.map((useCase, index) => `
            <div class="blockchain-card" data-index="${index}">
                <div class="blockchain-card-icon">${useCase.icon}</div>
                <h3 data-i18n="${useCase.titleKey}">${t(useCase.titleKey)}</h3>
                <div class="blockchain-card-description" data-i18n="${useCase.descriptionKey}">${t(useCase.descriptionKey)}</div>
                <div class="blockchain-card-details">${useCase.details}</div>
            </div>
        `).join('');

        // Add click handlers for cards
        container.querySelectorAll('.blockchain-card').forEach(card => {
            utils.safeAddEventListener(card, 'click', () => {
                // Remove active class from all cards
                container.querySelectorAll('.blockchain-card').forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                card.classList.add('active');
            });
        });
    }

    // Initial render
    renderCards();

    // Re-render when language changes
    window.addEventListener('languageChanged', renderCards);
}

/**
 * Initialize scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .blockchain-card, .stat-card, .chart-wrapper').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize audio player
 */
function initializeAudioPlayer() {
    const audioPlayer = document.getElementById('podcast-audio');
    if (!audioPlayer) return;

    // Add custom controls if needed
    audioPlayer.addEventListener('loadstart', () => {
        console.log('Audio loading started');
    });

    audioPlayer.addEventListener('canplay', () => {
        console.log('Audio can start playing');
    });

    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio error:', e);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        utils.safeAddEventListener(mobileMenuToggle, 'click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileMenuToggle.textContent = isOpen ? '✕' : '☰';
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            utils.safeAddEventListener(link, 'click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        utils.safeAddEventListener(document, 'click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        utils.safeAddEventListener(anchor, 'click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero section buttons
    const insightsBtn = document.querySelector('[data-i18n="hero_btn_insights"]');
    const podcastBtn = document.querySelector('[data-i18n="hero_btn_podcast"]');

    if (insightsBtn) {
        utils.safeAddEventListener(insightsBtn, 'click', (e) => {
            e.preventDefault();
            document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (podcastBtn) {
        utils.safeAddEventListener(podcastBtn, 'click', (e) => {
            e.preventDefault();
            document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Get current language from localStorage or default to 'pt'
 */
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'pt';
}

/**
 * Translation helper function
 */
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || key;
}

