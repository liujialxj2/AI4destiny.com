/**
 * Palm Destiny Analysis - Internationalization Module
 * Handles language loading
 */

// Define available languages
const supportedLanguages = ['en-US'];
const defaultLanguage = 'en-US';

// Current language
let currentLang = defaultLanguage;

// Define inline translations to avoid CORS issues when loading local files
const inlineTranslations = {
    // English translations
    'en-US': {
        // Add your English translations here
        "nav": {
            "home": "Home",
            "about": "About",
            "features": "Features",
            "analysis": "Analysis",
            "contact": "Contact"
        },
        "home": {
            "title": "Palm Destiny Analysis",
            "subtitle": "Discover Your Future Through Modern Palm Reading",
            "cta": "Start My Palm Analysis"
        },
        "analysis": {
            "title": "Palm Analysis",
            "uploadTitle": "Upload Your Palm Image",
            "uploadDesc": "Drag & drop your palm image here or click to browse",
            "orText": "OR",
            "cameraTitle": "Use Camera",
            "cameraButton": "Open Camera",
            "captureButton": "Capture",
            "infoTitle": "Your Information",
            "ageLabel": "Age Range",
            "genderLabel": "Gender",
            "focusLabel": "Area of Interest",
            "startButton": "Start Analysis",
            "resetButton": "New Analysis",
            "saveButton": "Save My Analysis Report",
            "shareButton": "Share My Analysis Results"
        },
        "results": {
            "process": "Analysis Process",
            "palmLines": "Core Palm Lines",
            "destiny": "Destiny Overview",
            "lifeLineTab": "Life Line",
            "headLineTab": "Head Line",
            "heartLineTab": "Heart Line",
            "careerTab": "Career",
            "wealthTab": "Wealth",
            "healthTab": "Health",
            "loveTab": "Love",
            "socialTab": "Social",
            "wisdomTab": "Wisdom",
            "potentialTab": "Potential"
        }
    }
};

// Initialize language
document.addEventListener('DOMContentLoaded', function() {
    // Set language to English
    setLanguage(defaultLanguage);
    
    // Language switcher has been removed
});

/**
 * Set the site language
 * @param {string} lang - Language code to set
 */
function setLanguage(lang) {
    if (!supportedLanguages.includes(lang)) {
        console.warn(`Language ${lang} is not supported, using default`);
        lang = defaultLanguage;
    }
    
    // Save current language
    currentLang = lang;
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Use inline translations instead of fetching
    window.translations = inlineTranslations[lang] || inlineTranslations[defaultLanguage];
    
    // Apply translations
    applyTranslations();
    
    // Update UI to reflect language
    document.documentElement.lang = lang;
}

/**
 * Apply translations to the page
 */
function applyTranslations() {
    if (!window.translations) {
        console.error('No translations available');
        return;
    }
    
    // Apply translations to elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(window.translations, key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Apply translations to elements with data-i18n-placeholder attribute
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(window.translations, key);
        
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Apply translations to elements with data-i18n-title attribute
    const titles = document.querySelectorAll('[data-i18n-title]');
    titles.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = getNestedTranslation(window.translations, key);
        
        if (translation) {
            element.title = translation;
        }
    });
}

/**
 * Get nested translation using dot notation
 * @param {Object} obj - Translation object
 * @param {string} path - Dot notation path (e.g., 'nav.home')
 * @return {string|null} Translation or null if not found
 */
function getNestedTranslation(obj, path) {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return null;
        }
    }
    
    return typeof result === 'string' ? result : null;
}

// Language switcher has been removed

// Export functions
window.i18n = {
    setLanguage,
    getCurrentLanguage: () => currentLang,
    translate: (key) => getNestedTranslation(window.translations || {}, key)
}; 