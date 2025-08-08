/**
 * DeAgro Digital Nexus - Podcast Bilíngue
 * Gerencia a troca entre versões PT e EN do podcast
 */

class PodcastManager {
    constructor() {
        this.audioElement = null;
        this.sourceElement = null;
        this.currentLang = 'pt';
        this.currentTime = 0;
        this.isPlaying = false;
        
        this.podcastFiles = {
            pt: 'assets/media/podcast-pt.mp3',
            en: 'assets/media/podcast-en.mp3'
        };
        
        this.init();
    }
    
    init() {
        // Aguarda o DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPodcast());
        } else {
            this.setupPodcast();
        }
    }
    
    setupPodcast() {
        this.audioElement = document.getElementById('podcastAudio');
        this.sourceElement = document.getElementById('podcastSource');
        
        if (!this.audioElement || !this.sourceElement) {
            console.warn('Elementos de podcast não encontrados');
            return;
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Sincronizar com o idioma atual do site
        this.syncWithSiteLanguage();
        
        // Setup audio event listeners
        this.setupAudioListeners();
    }
    
    setupEventListeners() {
        // Botões de idioma do podcast
        const podcastLangButtons = document.querySelectorAll('.podcast-lang-btn');
        podcastLangButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchPodcastLanguage(lang);
            });
        });
        
        // Escutar mudanças no idioma principal do site
        document.addEventListener('languageChanged', (e) => {
            this.syncWithSiteLanguage();
        });
    }
    
    setupAudioListeners() {
        // Salvar posição atual quando o áudio for pausado ou parado
        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
        });
        
        this.audioElement.addEventListener('play', () => {
            this.isPlaying = true;
        });
        
        this.audioElement.addEventListener('pause', () => {
            this.isPlaying = false;
        });
        
        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentTime = 0;
        });
    }
    
    switchPodcastLanguage(lang) {
        if (lang === this.currentLang) return;
        
        // Salvar estado atual
        this.currentTime = this.audioElement.currentTime;
        this.isPlaying = !this.audioElement.paused;
        
        // Mostrar loading
        this.setLoadingState(true);
        
        // Trocar arquivo de áudio
        this.sourceElement.src = this.podcastFiles[lang];
        this.audioElement.load();
        
        // Aguardar carregamento
        this.audioElement.addEventListener('canplay', () => {
            // Restaurar posição (se possível)
            if (this.currentTime > 0) {
                this.audioElement.currentTime = this.currentTime;
            }
            
            // Restaurar estado de reprodução
            if (this.isPlaying) {
                this.audioElement.play().catch(console.error);
            }
            
            // Atualizar UI
            this.updateLanguageButtons(lang);
            this.currentLang = lang;
            
            // Remover loading
            this.setLoadingState(false);
            
            console.log(`Podcast switched to ${lang}`);
        }, { once: true });
    }
    
    updateLanguageButtons(activeLang) {
        const buttons = document.querySelectorAll('.podcast-lang-btn');
        buttons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === activeLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    setLoadingState(loading) {
        const buttons = document.querySelectorAll('.podcast-lang-btn');
        buttons.forEach(btn => {
            if (loading) {
                btn.classList.add('loading');
            } else {
                btn.classList.remove('loading');
            }
        });
    }
    
    syncWithSiteLanguage() {
        // Obter idioma atual do site
        const currentSiteLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
        
        // Se o podcast não está no mesmo idioma, sincronizar
        if (currentSiteLang !== this.currentLang) {
            this.switchPodcastLanguage(currentSiteLang);
        }
    }
    
    // Método público para ser chamado quando o idioma do site mudar
    onSiteLanguageChange(newLang) {
        this.switchPodcastLanguage(newLang);
    }
}

// Instanciar o gerenciador de podcast
let podcastManager;

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        podcastManager = new PodcastManager();
    });
} else {
    podcastManager = new PodcastManager();
}

// Exportar para uso global
window.podcastManager = podcastManager;

