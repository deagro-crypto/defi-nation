// DeAgro Digital Nexus - Gemini Integration

/**
 * Initialize Gemini functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeGeminiFeatures();
});

/**
 * Initialize all Gemini-powered features
 */
function initializeGeminiFeatures() {
    setupConceptExplainer();
    setupPodcastIdeaGenerator();
}

/**
 * Setup concept explainer functionality
 */
function setupConceptExplainer() {
    const input = document.getElementById('conceptInput');
    const button = document.getElementById('explainConceptBtn');
    const output = document.getElementById('conceptOutput');
    const spinner = document.getElementById('explainSpinner');

    if (!input || !button || !output || !spinner) return;

    utils.safeAddEventListener(button, 'click', async () => {
        const concept = input.value.trim();
        if (!concept) {
            showError(output, 'Por favor, digite um conceito para explicar.');
            return;
        }

        await explainConcept(concept, output, button, spinner);
    });

    utils.safeAddEventListener(input, 'keypress', (e) => {
        if (e.key === 'Enter') {
            button.click();
        }
    });
}

/**
 * Setup podcast idea generator functionality
 */
function setupPodcastIdeaGenerator() {
    const button = document.getElementById('generatePodcastIdeasBtn');
    const output = document.getElementById('podcastOutput');
    const spinner = document.getElementById('podcastSpinner');

    if (!button || !output || !spinner) return;

    utils.safeAddEventListener(button, 'click', async () => {
        await generatePodcastIdeas(output, button, spinner);
    });
}

/**
 * Explain a concept using Gemini API
 * @param {string} concept - Concept to explain
 * @param {HTMLElement} output - Output element
 * @param {HTMLElement} button - Button element
 * @param {HTMLElement} spinner - Spinner element
 */
async function explainConcept(concept, output, button, spinner) {
    try {
        // Check rate limiting
        if (!window.apiConfig.checkRateLimit('gemini')) {
            showError(output, 'Muitas solicitações. Tente novamente em alguns minutos.');
            return;
        }

        // Get API key
        let apiKey = window.apiConfig.getApiKey('gemini');
        if (!apiKey) {
            apiKey = await window.apiConfig.promptForApiKey('gemini');
            if (!apiKey) {
                showError(output, 'API key necessária para usar esta funcionalidade.');
                return;
            }
        }

        // Show loading state
        setLoadingState(button, spinner, true);
        output.innerHTML = '<div class="loading-state">Gerando explicação...</div>';

        // Prepare prompt with current language
        const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
        const promptConfig = window.apiConfig.API_CONFIG.gemini.prompts[currentLang] || window.apiConfig.API_CONFIG.gemini.prompts.pt;
        const prompt = promptConfig.conceptExplainer + '\n\n' + concept;

        // Make API request
        const response = await makeGeminiRequest(apiKey, prompt);
        
        if (response.success) {
            output.innerHTML = utils.formatText(response.text);
        } else {
            showError(output, response.error || 'Erro ao gerar explicação.');
        }

    } catch (error) {
        console.error('Erro ao explicar conceito:', error);
        showError(output, 'Erro inesperado. Verifique sua conexão e tente novamente.');
    } finally {
        setLoadingState(button, spinner, false);
    }
}

/**
 * Generate podcast ideas using Gemini API
 * @param {HTMLElement} output - Output element
 * @param {HTMLElement} button - Button element
 * @param {HTMLElement} spinner - Spinner element
 */
async function generatePodcastIdeas(output, button, spinner) {
    try {
        // Check rate limiting
        if (!window.apiConfig.checkRateLimit('gemini')) {
            showError(output, 'Muitas solicitações. Tente novamente em alguns minutos.');
            return;
        }

        // Get API key
        let apiKey = window.apiConfig.getApiKey('gemini');
        if (!apiKey) {
            apiKey = await window.apiConfig.promptForApiKey('gemini');
            if (!apiKey) {
                showError(output, 'API key necessária para usar esta funcionalidade.');
                return;
            }
        }

        // Show loading state
        setLoadingState(button, spinner, true);
        output.innerHTML = '<div class="loading-state">Gerando ideias para podcast...</div>';

        // Prepare prompt with current language
        const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
        const promptConfig = window.apiConfig.API_CONFIG.gemini.prompts[currentLang] || window.apiConfig.API_CONFIG.gemini.prompts.pt;

        // Make API request
        const response = await makeGeminiRequest(apiKey, promptConfig.podcastIdeas);
        
        if (response.success) {
            output.innerHTML = utils.formatText(response.text);
        } else {
            showError(output, response.error || 'Erro ao gerar ideias para podcast.');
        }

    } catch (error) {
        console.error('Erro ao gerar ideias para podcast:', error);
        showError(output, 'Erro inesperado. Verifique sua conexão e tente novamente.');
    } finally {
        setLoadingState(button, spinner, false);
    }
}

/**
 * Make request to Gemini API
 * @param {string} apiKey - API key
 * @param {string} prompt - Prompt text
 * @returns {Promise<Object>} - Response object
 */
async function makeGeminiRequest(apiKey, prompt) {
    const config = window.apiConfig.API_CONFIG.gemini;
    const url = `${config.baseUrl}/models/${config.model}:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: config.maxTokens,
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            if (response.status === 401) {
                // Invalid API key
                window.apiConfig.clearApiKey('gemini');
                return {
                    success: false,
                    error: 'API key inválida. Por favor, configure uma API key válida.'
                };
            } else if (response.status === 429) {
                return {
                    success: false,
                    error: 'Limite de taxa excedido. Tente novamente mais tarde.'
                };
            } else {
                return {
                    success: false,
                    error: errorData.error?.message || `Erro HTTP: ${response.status}`
                };
            }
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return {
                success: true,
                text: data.candidates[0].content.parts[0].text
            };
        } else {
            return {
                success: false,
                error: 'Resposta inválida da API.'
            };
        }

    } catch (error) {
        console.error('Erro na requisição para Gemini:', error);
        return {
            success: false,
            error: 'Erro de conexão. Verifique sua internet e tente novamente.'
        };
    }
}

/**
 * Set loading state for button and spinner
 * @param {HTMLElement} button - Button element
 * @param {HTMLElement} spinner - Spinner element
 * @param {boolean} loading - Loading state
 */
function setLoadingState(button, spinner, loading) {
    if (loading) {
        button.disabled = true;
        spinner.style.display = 'inline-block';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        spinner.style.display = 'none';
        button.style.opacity = '1';
    }
}

/**
 * Show error message in output element
 * @param {HTMLElement} output - Output element
 * @param {string} message - Error message
 */
function showError(output, message) {
    output.innerHTML = `
        <div style="color: #DC3545; padding: 1rem; border: 1px solid #F5C6CB; background: #F8D7DA; border-radius: 6px;">
            <strong>Erro:</strong> ${message}
        </div>
    `;
}

/**
 * Show API key management interface
 */
function showApiKeyManager() {
    const currentKey = window.apiConfig.getApiKey('gemini');
    const hasKey = !!currentKey;
    
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
            max-width: 600px;
            width: 90%;
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        ">
            <h3 style="margin-bottom: 1rem; color: #3A5A40;">Gerenciar API Key do Gemini</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <p style="color: #495057; margin-bottom: 1rem;">
                    ${hasKey ? 'API key configurada com sucesso!' : 'Nenhuma API key configurada.'}
                </p>
                
                ${hasKey ? `
                    <div style="background: #D4EDDA; border: 1px solid #C3E6CB; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong>Status:</strong> Conectado
                    </div>
                ` : `
                    <div style="background: #F8D7DA; border: 1px solid #F5C6CB; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong>Status:</strong> Não conectado
                    </div>
                `}
                
                <details style="margin-bottom: 1rem;">
                    <summary style="cursor: pointer; color: #0077B6;">Como obter uma API key do Gemini?</summary>
                    <div style="padding: 1rem; background: #F8F9FA; border-radius: 6px; margin-top: 0.5rem;">
                        <ol style="margin: 0; padding-left: 1.5rem;">
                            <li>Acesse <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: #0077B6;">Google AI Studio</a></li>
                            <li>Faça login com sua conta Google</li>
                            <li>Clique em "Create API Key"</li>
                            <li>Copie a API key gerada</li>
                            <li>Cole aqui no campo abaixo</li>
                        </ol>
                    </div>
                </details>
            </div>
            
            <input type="password" id="newApiKeyInput" placeholder="Cole sua nova API key aqui..." style="
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #CED4DA;
                border-radius: 6px;
                margin-bottom: 1rem;
                font-family: monospace;
            " ${hasKey ? '' : 'autofocus'}>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                ${hasKey ? `
                    <button id="clearBtn" style="
                        padding: 0.5rem 1rem;
                        border: 1px solid #DC3545;
                        background: white;
                        color: #DC3545;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Remover</button>
                ` : ''}
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
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const input = modal.querySelector('#newApiKeyInput');
    const saveBtn = modal.querySelector('#saveBtn');
    const cancelBtn = modal.querySelector('#cancelBtn');
    const clearBtn = modal.querySelector('#clearBtn');
    
    const cleanup = () => {
        document.body.removeChild(modal);
    };
    
    saveBtn.addEventListener('click', () => {
        const apiKey = input.value.trim();
        if (apiKey) {
            window.apiConfig.setApiKey('gemini', apiKey);
            // Show success message
            showSuccessMessage('API key salva com sucesso!');
        }
        cleanup();
    });
    
    cancelBtn.addEventListener('click', cleanup);
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            window.apiConfig.clearApiKey('gemini');
            showSuccessMessage('API key removida.');
            cleanup();
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cleanup();
    });
}

/**
 * Show success message
 * @param {string} message - Success message
 */
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #D4EDDA;
        color: #155724;
        border: 1px solid #C3E6CB;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 3000);
}

// Export functions for global use
window.gemini = {
    explainConcept,
    generatePodcastIdeas,
    showApiKeyManager
};
