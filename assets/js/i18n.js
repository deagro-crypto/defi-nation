/**
 * Internationalization (i18n) system for DeAgro Digital Nexus
 * Supports Portuguese (pt) and English (en)
 */

const translations = {
    pt: {
        // Navigation
        nav_ai_banking: "IA em Banking",
        nav_blockchain: "Blockchain", 
        nav_synergy: "Sinergia",
        nav_regulation: "Regulação",
        nav_insights: "Insights",
        nav_podcast: "Podcast",

        // Hero Section
        hero_title: "O Nexus Digital",
        hero_subtitle: "que Transforma Finanças",
        hero_description: "Explore como IA, Blockchain e Criptomoedas estão convergindo para revolucionar o setor financeiro e criar novas oportunidades no agronegócio e em outras indústrias.",
        hero_btn_insights: "Explorar Insights",
        hero_btn_podcast: "Ouvir Podcast",

        // Executive Summary
        executive_summary_title: "Resumo Executivo",
        executive_summary_text: "A convergência estratégica de IA, blockchain e criptomoedas está impulsionando oportunidades sem precedentes para eficiência operacional, engajamento personalizado de clientes e gestão robusta de riscos no setor financeiro.",

        // AI Banking Section
        ai_banking_title: "O Papel Fundamental da IA no Banking Moderno",
        ai_banking_description: "A IA está transformando fundamentalmente como as instituições financeiras operam, desde o fortalecimento da gestão de riscos até a criação de experiências hiperpersonalizadas para clientes.",

        // Charts
        chart_ai_impact_title: "Impacto da IA nas Funções Bancárias",
        chart_ai_impact_subtitle: "Executivos identificam detecção de fraudes, cibersegurança e KYC/AML como áreas onde a IA oferece maior valor de negócio.",
        chart_ai_impact_footer: "Percentual de executivos que acreditam que a IA oferece maior impulso ao valor de negócio em funções bancárias críticas.",
        chart_talent_gap_title: "Lacuna de Talentos em IA",
        chart_talent_gap_subtitle: "Apesar do impulso para IA, uma deficiência significativa de expertise dificulta sua adoção em toda a empresa.",
        chart_talent_gap_footer: "Áreas de maior deficiência de expertise identificadas pelos executivos.",

        // Statistics
        stat_stress_testing: "Priorizam Testes de Stress",
        stat_stress_description: "Para identificar proativamente fraquezas do modelo antes da implantação",
        stat_real_time: "Exigem Controles em Tempo Real",
        stat_real_time_description: "Para monitoramento contínuo e prevenção de \"drift\" ou \"alucinação\"",

        // Blockchain Section
        blockchain_title: "Blockchain: Remodelando a Infraestrutura Financeira",
        blockchain_description: "Como um ledger descentralizado e imutável, a tecnologia blockchain fornece uma nova base de confiança e eficiência para serviços financeiros essenciais.",

        // Blockchain Cards
        cross_border_title: "Pagamentos Transfronteiriços",
        cross_border_description: "Transações internacionais quase instantâneas e de baixo custo.",
        trade_finance_title: "Financiamento de Comércio",
        trade_finance_description: "Acordos mais rápidos, baratos e com menos erros.",
        asset_tokenization_title: "Tokenização de Ativos",
        asset_tokenization_description: "Maior liquidez e propriedade fracionária.",
        digital_identity_title: "Identidade Digital",
        digital_identity_description: "KYC/AML mais eficiente e seguro.",
        smart_contracts_title: "Contratos Inteligentes",
        smart_contracts_description: "Automação de processos financeiros complexos.",
        audit_compliance_title: "Auditoria e Compliance",
        audit_compliance_description: "Trilhas de auditoria imutáveis e transparentes.",

        // Synergy Section
        synergy_title: "A Confluência: Uma Sinergia Fundamental",
        synergy_description: "O verdadeiro poder emerge quando IA e blockchain são integrados. O blockchain fornece dados verificáveis e à prova de adulteração que a IA precisa para ser confiável e ética, enquanto a IA aprimora a eficiência e segurança do blockchain.",
        synergy_ai_title: "Inteligência Artificial",
        synergy_ai_description: "Fornece inteligência, automação e detecção de padrões em tempo real.",
        synergy_blockchain_title: "Blockchain",
        synergy_blockchain_description: "Oferece uma 'camada de confiança' com dados imutáveis, verificáveis e à prova de adulteração.",
        synergy_outcomes_title: "Principais Resultados Sinérgicos",
        outcome_data_integrity_title: "Integridade de Dados para IA:",
        outcome_data_integrity_desc: "Garante que modelos de IA sejam treinados com dados precisos e confiáveis.",
        outcome_fraud_detection_title: "Detecção Aprimorada de Fraudes:",
        outcome_fraud_detection_desc: "IA identifica padrões suspeitos em tempo real, enquanto blockchain fornece trilha de auditoria inalterável.",
        outcome_autonomous_ops_title: "Operações Autônomas:",
        outcome_autonomous_ops_desc: "Agentes de IA podem interagir com contratos inteligentes para automatizar tarefas financeiras complexas.",
        outcome_immutable_audits_title: "Auditorias Imutáveis de IA:",
        outcome_immutable_audits_desc: "Cria um registro à prova de adulteração das decisões de IA, crucial para conformidade regulatória.",

        // Regulation Section
        regulation_title: "Navegando o Cenário Regulatório em Evolução",
        regulation_description: "Reguladores globais estão se movendo da observação para a ação, criando frameworks baseados em princípios para equilibrar inovação com estabilidade financeira e proteção ao consumidor.",
        regulation_us_title: "Estados Unidos",
        regulation_us_description: "Momentum bipartidário para supervisão abrangente, especialmente para stablecoins (exigindo respaldo total e conformidade AML/CFT).",
        regulation_europe_title: "Europa",
        regulation_europe_description: "Implementação do framework Markets in Crypto-Assets (MiCA) fornece regras claras e harmonizadas para aumentar a confiança institucional.",
        regulation_global_title: "Órgãos Globais (FMI, BIS)",
        regulation_global_description: "Foco em avaliar o impacto da IA na estabilidade financeira, experimentando com CBDCs e moldando regulamentações futuras.",
        regulation_trends_title: "Tendências Gerais",
        regulation_trends_description: "Demanda por modelos de IA auditáveis e com mitigação de viés, além de frameworks mais robustos de privacidade de dados.",

        // Gemini Section
        gemini_title: "✨ Insights Powered by Gemini ✨",
        gemini_subtitle: "Aproveite a IA para aprofundar sua compreensão e gerar novas ideias.",
        gemini_concept_title: "Explorador de Conceitos",
        gemini_concept_placeholder: "ex: KYC, AML ou Tokenização de Ativos",
        gemini_explain_btn: "Explicar Conceito",
        gemini_concept_prompt: "Digite um conceito acima para obter uma explicação powered by IA.",
        gemini_podcast_title: "Gerador de Ideias para Podcast",
        gemini_podcast_btn: "Gerar Ideias para Podcast",
        gemini_podcast_prompt: "Clique no botão acima para obter ideias frescas para podcast!",

        // Podcast Section
        podcast_title: "🎧 Podcast: IA, Blockchain e Cripto no Setor Financeiro",
        podcast_subtitle: "Ouça nossa análise completa sobre a confluência que remodela bancos e desafia o futuro.",
        podcast_lang_pt: "🇧🇷 Português",
        podcast_lang_en: "🇺🇸 English",
        podcast_current_title: "A Confluência Que Remodela Bancos e Desafia o Futuro",
        podcast_current_description: "Uma análise profunda sobre como IA, Blockchain e Criptomoedas estão transformando o setor financeiro e criando novas oportunidades de investimento.",
        podcast_not_supported: "Seu navegador não suporta o elemento de áudio.",
        podcast_episode_title: "A Confluência Que Remodela Bancos e Desafia o Futuro",
        podcast_episode_description: "Uma análise profunda sobre como IA, Blockchain e Criptomoedas estão transformando o setor financeiro e criando novas oportunidades de investimento."
    },

    en: {
        // Navigation
        nav_ai_banking: "AI in Banking",
        nav_blockchain: "Blockchain",
        nav_synergy: "Synergy", 
        nav_regulation: "Regulation",
        nav_insights: "Insights",
        nav_podcast: "Podcast",

        // Hero Section
        hero_title: "The Digital Nexus",
        hero_subtitle: "Transforming Finance",
        hero_description: "Explore how AI, Blockchain, and Cryptocurrencies are converging to revolutionize the financial sector and create new opportunities in agribusiness and beyond.",
        hero_btn_insights: "Explore Insights",
        hero_btn_podcast: "Listen to Podcast",

        // Executive Summary
        executive_summary_title: "Executive Summary",
        executive_summary_text: "The strategic convergence of AI, blockchain, and cryptocurrencies is driving unprecedented opportunities for operational efficiency, personalized customer engagement, and robust risk management in the financial sector.",

        // AI Banking Section
        ai_banking_title: "AI's Fundamental Role in Modern Banking",
        ai_banking_description: "AI is fundamentally transforming how financial institutions operate, from strengthening risk management to creating hyper-personalized customer experiences.",

        // Charts
        chart_ai_impact_title: "AI Impact on Banking Functions",
        chart_ai_impact_subtitle: "Executives identify fraud detection, cybersecurity, and KYC/AML as areas where AI offers the greatest business value.",
        chart_ai_impact_footer: "Percentage of executives who believe AI offers the greatest boost to business value in critical banking functions.",
        chart_talent_gap_title: "AI Talent Gap",
        chart_talent_gap_subtitle: "Despite the push for AI, a significant expertise deficiency hinders its enterprise-wide adoption.",
        chart_talent_gap_footer: "Areas of greatest expertise deficiency identified by executives.",

        // Statistics
        stat_stress_testing: "Prioritize Stress Testing",
        stat_stress_description: "To proactively identify model weaknesses before deployment",
        stat_real_time: "Require Real-Time Controls",
        stat_real_time_description: "For continuous monitoring and prevention of 'drift' or 'hallucination'",

        // Blockchain Section
        blockchain_title: "Blockchain: Reshaping Financial Infrastructure",
        blockchain_description: "As a decentralized and immutable ledger, blockchain technology provides a new foundation of trust and efficiency for essential financial services.",

        // Blockchain Cards
        cross_border_title: "Cross-Border Payments",
        cross_border_description: "Near-instantaneous and low-cost international transactions.",
        trade_finance_title: "Trade Finance",
        trade_finance_description: "Faster, cheaper agreements with fewer errors.",
        asset_tokenization_title: "Asset Tokenization",
        asset_tokenization_description: "Greater liquidity and fractional ownership.",
        digital_identity_title: "Digital Identity",
        digital_identity_description: "More efficient and secure KYC/AML.",
        smart_contracts_title: "Smart Contracts",
        smart_contracts_description: "Automation of complex financial processes.",
        audit_compliance_title: "Audit and Compliance",
        audit_compliance_description: "Immutable and transparent audit trails.",

        // Synergy Section
        synergy_title: "The Confluence: A Fundamental Synergy",
        synergy_description: "True power emerges when AI and blockchain are integrated. Blockchain provides verifiable and tamper-proof data that AI needs to be trustworthy and ethical, while AI enhances blockchain's efficiency and security.",
        synergy_ai_title: "Artificial Intelligence",
        synergy_ai_description: "Provides intelligence, automation, and real-time pattern detection.",
        synergy_blockchain_title: "Blockchain",
        synergy_blockchain_description: "Offers a 'trust layer' with immutable, verifiable, and tamper-proof data.",
        synergy_outcomes_title: "Key Synergistic Results",
        outcome_data_integrity_title: "Data Integrity for AI:",
        outcome_data_integrity_desc: "Ensures AI models are trained with accurate and reliable data.",
        outcome_fraud_detection_title: "Enhanced Fraud Detection:",
        outcome_fraud_detection_desc: "AI identifies suspicious patterns in real-time, while blockchain provides an unalterable audit trail.",
        outcome_autonomous_ops_title: "Autonomous Operations:",
        outcome_autonomous_ops_desc: "AI agents can interact with smart contracts to automate complex financial tasks.",
        outcome_immutable_audits_title: "Immutable AI Audits:",
        outcome_immutable_audits_desc: "Creates a tamper-proof record of AI decisions, crucial for regulatory compliance.",

        // Regulation Section
        regulation_title: "Navigating the Evolving Regulatory Landscape",
        regulation_description: "Global regulators are moving from observation to action, creating principle-based frameworks to balance innovation with financial stability and consumer protection.",
        regulation_us_title: "United States",
        regulation_us_description: "Bipartisan momentum for comprehensive oversight, especially for stablecoins (requiring full backing and AML/CFT compliance).",
        regulation_europe_title: "Europe",
        regulation_europe_description: "Implementation of the Markets in Crypto-Assets (MiCA) framework provides clear and harmonized rules to increase institutional confidence.",
        regulation_global_title: "Global Bodies (IMF, BIS)",
        regulation_global_description: "Focus on assessing AI's impact on financial stability, experimenting with CBDCs and shaping future regulations.",
        regulation_trends_title: "General Trends",
        regulation_trends_description: "Demand for auditable AI models with bias mitigation, plus more robust data privacy frameworks.",

        // Gemini Section
        gemini_title: "✨ Insights Powered by Gemini ✨",
        gemini_subtitle: "Leverage AI to deepen your understanding and generate new ideas.",
        gemini_concept_title: "Concept Explorer",
        gemini_concept_placeholder: "e.g., KYC, AML, or Asset Tokenization",
        gemini_explain_btn: "Explain Concept",
        gemini_concept_prompt: "Type a concept above to get an AI-powered explanation.",
        gemini_podcast_title: "Podcast Ideas Generator",
        gemini_podcast_btn: "Generate Podcast Ideas",
        gemini_podcast_prompt: "Click the button above to get fresh podcast ideas!",

        // Podcast Section
         podcast_title: "🎧 Podcast: AI, Blockchain and Crypto in Financial Sector",
        podcast_subtitle: "Listen to our complete analysis of the confluence that reshapes banks and challenges the future.",
        podcast_lang_pt: "🇧🇷 Português",
        podcast_lang_en: "🇺🇸 English",
        podcast_current_title: "The Confluence That Reshapes Banks and Challenges the Future",
        podcast_current_description: "A deep analysis of how AI, Blockchain, and Cryptocurrencies are transforming the financial sector and creating new investment opportunities.",
        podcast_not_supported: "Your browser does not support the audio element.",
        podcast_episode_title: "The Confluence That Reshapes Banks and Challenges the Future",
        podcast_episode_description: "A deep analysis of how AI, Blockchain, and Cryptocurrencies are transforming the financial sector and creating new investment opportunities."
    }
};

/**
 * Current language state
 */
let currentLanguage = localStorage.getItem('language') || 'pt';

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLanguage]?.[key] || key;
}

/**
 * Get current language
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Set language and update UI
 */
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updateUI();
        updateTitle();
        updatePlaceholders();
        
        // Close mobile menu if it's open
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (navLinks && mobileMenuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
}

/**
 * Update all UI elements with translations
 */
function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.type === 'text') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
}

/**
 * Update page title based on language
 */
function updateTitle() {
    const titles = {
        pt: "DeAgro Digital Nexus - IA, Blockchain e o Futuro das Finanças",
        en: "DeAgro Digital Nexus - AI, Blockchain and the Future of Finance"
    };
    document.title = titles[currentLanguage] || titles.pt;
}

/**
 * Update placeholders for input elements
 */
function updatePlaceholders() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
}

/**
 * Initialize language system
 */
function initializeI18n() {
    // Set up language selector buttons
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang') || btn.textContent.toLowerCase();
            setLanguage(lang);
            
            // Update active state
            document.querySelectorAll('.language-selector button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Set initial active state
    // Get all buttons within the language-selector
    const languageButtons = document.querySelectorAll('.language-selector button');
    
    // Iterate through the buttons to find the one with the matching text content
    let activeBtn = null;
    languageButtons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang') || button.textContent.trim().toLowerCase();
        if (buttonLang === currentLanguage) {
            activeBtn = button;
        }
    });
    
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Initial UI update
    updateUI();
    updateTitle();
    updatePlaceholders();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeI18n);

