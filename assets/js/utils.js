// DeAgro Digital Nexus - Utility Functions

/**
 * Scroll to a specific section smoothly
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Wrap long labels for Chart.js
 * @param {string} label - The label to wrap
 * @param {number} maxWidth - Maximum width before wrapping
 * @returns {string|string[]} - Wrapped label
 */
function wrapLabels(label, maxWidth = 16) {
    if (typeof label !== 'string') return label;
    if (label.length <= maxWidth) return label;

    const words = label.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine += ' ' + word;
        }
    });
    lines.push(currentLine.trim());
    return lines;
}

/**
 * Tooltip title callback for Chart.js
 * @param {Array} tooltipItems - Tooltip items from Chart.js
 * @returns {string} - Formatted title
 */
function tooltipTitleCallback(tooltipItems) {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    return Array.isArray(label) ? label.join(' ') : label;
}

/**
 * Common chart options for consistency
 */
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: tooltipTitleCallback
            },
            backgroundColor: '#344E41',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
            displayColors: false,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: '#495057'
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#495057'
            }
        }
    }
};

/**
 * Show loading state for an element
 * @param {HTMLElement} element - Element to show loading state
 * @param {string} loadingText - Text to show while loading
 */
function showLoading(element, loadingText = 'Carregando...') {
    element.innerHTML = `<div class="loading-state">${loadingText}</div>`;
    element.classList.add('loading');
}

/**
 * Hide loading state for an element
 * @param {HTMLElement} element - Element to hide loading state
 */
function hideLoading(element) {
    element.classList.remove('loading');
}

/**
 * Format text with basic markdown-like formatting
 * @param {string} text - Text to format
 * @returns {string} - Formatted HTML
 */
function formatText(text) {
    if (!text) return '';
    
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Animate number counting up
 * @param {HTMLElement} element - Element containing the number
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in milliseconds
 */
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

/**
 * Add event listener with error handling
 * @param {HTMLElement} element - Element to add listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
function safeAddEventListener(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, (e) => {
            try {
                handler(e);
            } catch (error) {
                console.error('Event handler error:', error);
            }
        });
    }
}

/**
 * Get CSS custom property value
 * @param {string} property - CSS custom property name
 * @returns {string} - Property value
 */
function getCSSCustomProperty(property) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(property)
        .trim();
}

// Export functions for use in other modules
window.utils = {
    scrollToSection,
    wrapLabels,
    tooltipTitleCallback,
    commonChartOptions,
    showLoading,
    hideLoading,
    formatText,
    debounce,
    isInViewport,
    animateNumber,
    safeAddEventListener,
    getCSSCustomProperty
};

