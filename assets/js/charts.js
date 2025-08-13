// DeAgro Digital Nexus - Charts Configuration

/**
 * Initialize all charts when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Listen for language changes
    window.addEventListener('languageChanged', function(event) {
        updateChartLabels();
    });
});

/**
 * Initialize all charts
 */
function initializeCharts() {
    initAIImpactChart();
    initTalentGapChart();
}

/**
 * Initialize AI Impact Chart
 */
function initAIImpactChart() {
    const ctx = document.getElementById('aiImpactChart');
    if (!ctx) return;

    // Store chart instance globally for language updates
    window.charts = window.charts || {};

    const data = {
        labels: [
            'Detecção de fraudes',
            'Cibersegurança',
            'KYC, AML',
            'Risco de crédito e precificação',
            'Atendimento ao cliente',
            'Gestão de portfólio',
            'Trading algorítmico'
        ],
        datasets: [{
            label: 'Impacto da IA (%)',
            data: [65, 58, 52, 45, 38, 32, 28],
            backgroundColor: [
                '#0077B6',
                '#00A1E4',
                '#3A5A40',
                '#588157',
                '#DAA520',
                '#F2D091',
                '#c4d0dbff'
            ],
            borderColor: '#FFFFFF',
            borderWidth: 2,
            borderRadius: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#3f4543ff',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 4,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
                        const suffix = currentLang === 'pt' ? '% dos executivos' : '% of executives';
                        return context.parsed.x + suffix;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 70,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: '#495057',
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#495057',
                    font: {
                        size: 11
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };

    window.charts.aiImpact = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

/**
 * Initialize Talent Gap Chart - CORRECTED VERSION
 */
function initTalentGapChart() {
    const ctx = document.getElementById('talentGapChart');
    if (!ctx) return;

    // Store chart instance globally for language updates
    window.charts = window.charts || {};

    const data = {
        labels: ['Validação de modelos', 'Controle de riscos'],
        datasets: [{
            label: 'Percentual de Executivos',
            data: [63, 48],
            backgroundColor: [
                '#DAA520',  // DeAgro gold
                '#3A5A40'   // DeAgro green
            ],
            borderColor: '#FFFFFF',
            borderWidth: 2,
            borderRadius: 6
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Horizontal bars for better label readability
        plugins: {
            legend: {
                display: false, // Display legend for clarity
                position: 'bottom',
                labels: {
                    color: '#2c2e30ff',
                    font: {
                        size: 12
                    },
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: '#3f4543ff',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 4,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
                        const labelText = currentLang === 'pt' ? 'Percentual de Executivos' : 'Percentage of Executives';
                        return labelText + ': ' + context.parsed.x + '%';
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 70,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: '#495057',
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#495057',
                    font: {
                        size: 12
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };

    window.charts.talentGap = new Chart(ctx, {
        type: 'bar', // Changed from 'doughnut' to 'bar'
        data: data,
        options: options
    });
}

/**
 * Update chart labels when language changes
 */
function updateChartLabels() {
    if (!window.charts) return;

    const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'pt';
    
    // Update AI Impact Chart
    if (window.charts.aiImpact) {
        const aiLabels = currentLang === 'pt' ? [
            'Detecção de fraudes',
            'Cibersegurança',
            'KYC, AML',
            'Risco de crédito e precificação',
            'Atendimento ao cliente',
            'Gestão de portfólio',
            'Trading algorítmico'
        ] : [
            'Fraud detection',
            'Cybersecurity',
            'KYC, AML',
            'Credit risk and pricing',
            'Customer service',
            'Portfolio management',
            'Algorithmic trading'
        ];
        
        window.charts.aiImpact.data.labels = aiLabels;
        
        // Update tooltip callback
        window.charts.aiImpact.options.plugins.tooltip.callbacks.label = function(context) {
            const suffix = currentLang === 'pt' ? '% dos executivos' : '% of executives';
            return context.parsed.x + suffix;
        };
        
        window.charts.aiImpact.update();
    }

    // Update Talent Gap Chart
    if (window.charts.talentGap) {
        const talentLabels = currentLang === 'pt' ? 
            ['Validação de modelos', 'Controle de riscos'] :
            ['Model validation', 'Risk control'];
            
        const datasetLabel = currentLang === 'pt' ? 
            'Percentual de Executivos' : 
            'Percentage of Executives';
        
        window.charts.talentGap.data.labels = talentLabels;
        window.charts.talentGap.data.datasets[0].label = datasetLabel;
        
        // Update tooltip callback
        window.charts.talentGap.options.plugins.tooltip.callbacks.label = function(context) {
            const labelText = currentLang === 'pt' ? 'Percentual de Executivos' : 'Percentage of Executives';
            return labelText + ': ' + context.parsed.x + '%';
        };
        
        window.charts.talentGap.update();
    }
}

/**
 * Chart color schemes based on DeAgro palette
 */
const chartColors = {
    primary: '#3A5A40',
    primaryLight: '#588157',
    secondary: '#DAA520',
    secondaryLight: '#F2D091',
    accent: '#0077B6',
    accentLight: '#00A1E4',
    neutral: '#CED4DA',
    dark: '#495057'
};

/**
 * Get gradient for charts
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} color1 - Start color
 * @param {string} color2 - End color
 * @returns {CanvasGradient} - Gradient object
 */
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

/**
 * Animate chart on scroll
 */
function animateChartsOnScroll() {
    const charts = document.querySelectorAll('.chart-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    charts.forEach(chart => {
        observer.observe(chart);
    });
}

/**
 * Resize charts when window is resized
 */
window.addEventListener('resize', function() {
    if (window.charts) {
        Object.values(window.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
});

// Initialize chart animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateChartsOnScroll);

// Export for use in other modules
window.charts = window.charts || {};
window.updateChartLabels = updateChartLabels;

window.charts.initializeCharts = initializeCharts;
window.charts.initAIImpactChart = initAIImpactChart;
window.charts.initTalentGapChart = initTalentGapChart;
window.charts.chartColors = chartColors;
window.charts.createGradient = createGradient;