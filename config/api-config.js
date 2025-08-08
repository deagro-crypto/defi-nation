// DeAgro Digital Nexus - API Configuration

/**
 * API Configuration
 * This file contains configuration for external APIs used in the application
 */

const API_CONFIG = {
    // Gemini API Configuration
    gemini: {
        // API key should be set as environment variable or user input
        apiKey: null,
        baseUrl: 'https://generativelanguage.googleapis.com/v1',
        model: 'gemini-1.5-flash',
        maxTokens: 1000,
        temperature: 0.7,
        
        // Rate limiting
        requestsPerMinute: 60,
        lastRequestTime: 0,
        requestCount: 0,
        
        // Default prompts - multilingual
        prompts: {
            pt: {
                conceptExplainer: `Você é um especialista em tecnologia financeira e finanças com conhecimento amplo em
                Finanças Descentralizadas (DeFi) e criptoativos. 
                Explique o seguinte conceito de forma clara e concisa, focando em sua aplicação 
                no setor financeiro. Responda em português brasileiro. 
                Use até 500 palavras.`,
                
                podcastIdeas: `Você é um especialista em conteúdo sobre tecnologia financeira, 
                IA, blockchain e finanças descentralizadas (DeFi). Gere 5 ideias criativas e relevantes para episódios 
                de podcast sobre a convergência de IA, blockchain e criptomoedas no setor financeiro, 
                com foco especial em aplicações na confluência entre o contexto do mundo atual e a luta
                para a descentralização financeira e independência financeira das pessoas contra o sistema atual.
                Para cada ideia, forneça:
                1. Título do episódio
                2. Breve descrição (2-3 frases)
                3. Principais pontos a serem abordados
                
                Responda em português brasileiro.`
            },
            en: {
                conceptExplainer: `You are an expert in financial technology and finance with extensive knowledge in
                Decentralized Finance (DeFi) and crypto assets. 
                Explain the following concept clearly and concisely, focusing on its application 
                in the financial sector. Respond in English. 
                Use up to 500 words.`,

                podcastIdeas: `You are an expert in content about financial technology, 
                AI, blockchain and decentralized finance (DeFi). Generate 5 creative and relevant ideas for podcast episodes 
                about the convergence of AI, blockchain and cryptocurrencies in the financial sector, 
                with special focus on applications in the confluence between the current world context and the fight
                for financial decentralization and people's financial independence against the current system.
                For each idea, provide:
                1. Episode title
                2. Brief description (2-3 sentences)
                3. Main points to be addressed
                
                Respond in English.`
            }
        }
    },
    
    // Other APIs can be added here
    // Example: news API, market data API, etc.
};

/**
 * Check if API key is configured
 * @param {string} service - Service name (e.g., 'gemini')
 * @returns {boolean} - True if API key is configured
 */
function isApiKeyConfigured(service) {
    return API_CONFIG[service] && API_CONFIG[service].apiKey;
}

/**
 * Set API key for a service
 * @param {string} service - Service name
 * @param {string} apiKey - API key
 */
function setApiKey(service, apiKey) {
    if (API_CONFIG[service]) {
        API_CONFIG[service].apiKey = apiKey;
        localStorage.setItem(`${service}_api_key`, apiKey);
    }
}

/**
 * Get API key from localStorage or prompt user
 * @param {string} service - Service name
 * @returns {string|null} - API key or null
 */
function getApiKey(service) {
    // First check if already set in config
    if (API_CONFIG[service] && API_CONFIG[service].apiKey) {
        return API_CONFIG[service].apiKey;
    }
    
    // Check localStorage
    const storedKey = localStorage.getItem(`${service}_api_key`);
    if (storedKey) {
        API_CONFIG[service].apiKey = storedKey;
        return storedKey;
    }
    
    return null;
}

/**
 * Check rate limiting for API requests
 * @param {string} service - Service name
 * @returns {boolean} - True if request is allowed
 */
function checkRateLimit(service) {
    const config = API_CONFIG[service];
    if (!config) return false;
    
    const now = Date.now();
    const oneMinute = 60 * 1000;
    
    // Reset counter if more than a minute has passed
    if (now - config.lastRequestTime > oneMinute) {
        config.requestCount = 0;
        config.lastRequestTime = now;
    }
    
    // Check if we've exceeded the limit
    if (config.requestCount >= config.requestsPerMinute) {
        return false;
    }
    
    config.requestCount++;
    return true;
}

/**
 * Prompt user for API key
 * @param {string} service - Service name
 * @returns {Promise<string|null>} - API key or null if cancelled
 */
function promptForApiKey(service) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
            ">
                <h3 style="margin-bottom: 1rem; color: #3A5A40;">Configurar API Key</h3>
                <p style="margin-bottom: 1.5rem; color: #495057;">
                    Para usar as funcionalidades de IA, você precisa configurar sua API key do ${service.charAt(0).toUpperCase() + service.slice(1)}.
                </p>
                <input type="password" id="apiKeyInput" placeholder="Cole sua API key aqui..." style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #CED4DA;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                    font-family: monospace;
                ">
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button id="cancelBtn" style="
                        padding: 0.5rem 1rem;
                        border: 1px solid #CED4DA;
                        background: white;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Cancelar</button>
                    <button id="saveBtn" style="
                        padding: 0.5rem 1rem;
                        border: none;
                        background: #3A5A40;
                        color: white;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Salvar</button>
                </div>
                <p style="font-size: 0.8rem; color: #6C757D; margin-top: 1rem;">
                    Sua API key será armazenada localmente no seu navegador.
                </p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = modal.querySelector('#apiKeyInput');
        const saveBtn = modal.querySelector('#saveBtn');
        const cancelBtn = modal.querySelector('#cancelBtn');
        
        input.focus();
        
        const cleanup = () => {
            document.body.removeChild(modal);
        };
        
        saveBtn.addEventListener('click', () => {
            const apiKey = input.value.trim();
            if (apiKey) {
                setApiKey(service, apiKey);
                cleanup();
                resolve(apiKey);
            }
        });
        
        cancelBtn.addEventListener('click', () => {
            cleanup();
            resolve(null);
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveBtn.click();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cleanup();
                resolve(null);
            }
        });
    });
}

/**
 * Clear stored API key
 * @param {string} service - Service name
 */
function clearApiKey(service) {
    if (API_CONFIG[service]) {
        API_CONFIG[service].apiKey = null;
    }
    localStorage.removeItem(`${service}_api_key`);
}

// Export configuration and functions
window.apiConfig = {
    API_CONFIG,
    isApiKeyConfigured,
    setApiKey,
    getApiKey,
    checkRateLimit,
    promptForApiKey,
    clearApiKey
};