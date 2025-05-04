/**
 * Palm Destiny Analysis - User Interface Controller
 * Manages user interface interaction logic
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize upload box drag-and-drop effect
    initUploadBoxDragDrop();
    
    // Initialize upload button interaction
    initUploadButton();
    
    // Initialize analysis process animation effects
    initAnalysisAnimations();
    
    // Initialize result viewing area interaction
    initResultsInteraction();
    
    // Add navigation interaction enhancement
    enhanceNavigation();
    
    // Add page loading animation
    addPageLoadingAnimation();
    
    // Initialize How It Works section interaction
    initHowItWorksInteractions();
});

/**
 * Initialize upload box drag-and-drop effect
 */
function initUploadBoxDragDrop() {
    const uploadBox = document.getElementById('uploadBox');
    
    // Add drag-and-drop state classes
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    uploadBox.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        // Main processing logic is implemented in main.js
    });
    
    // Add ripple effect
    uploadBox.classList.add('ripple');
}

/**
 * Initialize upload button interaction
 */
function initUploadButton() {
    const uploadBtn = document.querySelector('.upload-btn');
    const cameraBtn = document.getElementById('openCameraBtn');
    const captureBtn = document.getElementById('capturePalmBtn');
    const analyzeBtn = document.getElementById('startAnalysisBtn');
    
    // Add ripple effect
    [uploadBtn, cameraBtn, captureBtn, analyzeBtn].forEach(btn => {
        if (btn) btn.classList.add('ripple');
    });
    
    // Add magical glow effect
    analyzeBtn.classList.add('mystical-glow');
}

/**
 * Initialize analysis process animation effects
 */
function initAnalysisAnimations() {
    // Get progress bar and status elements
    const analysisProgress = document.getElementById('analysisProgress');
    const detectionStatus = document.getElementById('detectionStatus');
    
    // Observe changes to analysisProgress class
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (analysisProgress.classList.contains('analyzing')) {
                    // When analysis begins, add status text change animation
                    animateStatusText(detectionStatus);
                }
            }
        });
    });
    
    observer.observe(analysisProgress, { attributes: true });
}

/**
 * Add animation effect to status text
 * @param {HTMLElement} element - Status text element
 */
function animateStatusText(element) {
    // Status text change array
    const statusTexts = [
        'Preparing analysis...',
        'Detecting palm features...',
        'Analyzing palm lines...',
        'Interpreting life line...',
        'Interpreting head line...',
        'Interpreting heart line...',
        'Generating destiny interpretation...',
        'Analysis complete'
    ];
    
    // Display different status texts in sequence
    statusTexts.forEach((text, index) => {
        setTimeout(() => {
            element.textContent = text;
            element.classList.add('blink');
            
            setTimeout(() => {
                element.classList.remove('blink');
            }, 300);
        }, index * 500);
    });
}

/**
 * Initialize result viewing area interaction
 */
function initResultsInteraction() {
    // Get palm line elements
    const palmLines = document.querySelectorAll('.palm-markers path');
    
    // Get tab buttons and content panels
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Add click events to tabs, highlighting corresponding palm lines
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update panel display (already implemented in main.js)
            
            // Remove highlight effect from all palm lines
            palmLines.forEach(line => line.classList.remove('highlight-line'));
            
            // Add highlight effect to corresponding palm lines based on tab type
            const tabId = this.getAttribute('data-tab');
            
            if (tabId === 'palmLinesTab') {
                // In "Core Palm Lines" tab, display all palm lines
                highlightPalmLine('life-line');
                highlightPalmLine('head-line');
                highlightPalmLine('heart-line');
                
                // Add click events to each palm line section
                const palmLineSections = document.querySelectorAll('.palm-line-section');
                palmLineSections.forEach((section, index) => {
                    section.addEventListener('mouseenter', function() {
                        // First remove all highlights
                        palmLines.forEach(line => line.classList.remove('highlight-line'));
                        
                        // Highlight corresponding palm line based on index
                        if (index === 0) {
                            highlightPalmLine('life-line');
                        } else if (index === 1) {
                            highlightPalmLine('head-line');
                        } else if (index === 2) {
                            highlightPalmLine('heart-line');
                        }
                    });
                    
                    section.addEventListener('mouseleave', function() {
                        // Highlight all palm lines after mouse leaves
                        highlightPalmLine('life-line');
                        highlightPalmLine('head-line');
                        highlightPalmLine('heart-line');
                    });
                });
            }
        });
    });
    
    // Add interaction effects to destiny cards
    const destinyCards = document.querySelectorAll('.destiny-card');
    destinyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
}

/**
 * Highlight specific palm line
 * @param {string} lineClass - Palm line CSS class name
 */
function highlightPalmLine(lineClass) {
    const line = document.querySelector('.' + lineClass);
    if (line) {
        line.classList.add('highlight-line');
    }
}

/**
 * Enhance navigation interaction
 */
function enhanceNavigation() {
    // Add transition effect to navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
        
        // Click to add active effect
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active', 'pulse'));
            this.classList.add('active');
        });
    });
    
    // Update active navigation item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Add page loading animation
 */
function addPageLoadingAnimation() {
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    pageTransition.appendChild(loader);
    document.body.appendChild(pageTransition);
    
    // Hide loading animation after page load completes
    window.addEventListener('load', function() {
        setTimeout(function() {
            pageTransition.classList.add('loaded');
            
            // 2 seconds later remove element
            setTimeout(function() {
                pageTransition.remove();
                
                // Start entry animation
                startEntryAnimations();
            }, 500);
        }, 1000);
    });
}

/**
 * Start page entry animation
 */
function startEntryAnimations() {
    // Animate elements one by one
    animateElement('.hero-content', 'slide-in-left', 0);
    animateElement('.hero-image', 'slide-in-right', 200);
    
    animateElement('.section-title', 'fade-in', 400);
    
    const features = document.querySelectorAll('.feature-card');
    features.forEach((feature, index) => {
        animateElement(feature, 'scale-in', 600 + index * 100);
    });
}

/**
 * Animate element
 * @param {string|Element} selector - CSS selector or DOM element
 * @param {string} animationClass - Animation CSS class name
 * @param {number} delay - Delay time (milliseconds)
 */
function animateElement(selector, animationClass, delay) {
    setTimeout(() => {
        const elements = typeof selector === 'string' ? 
                        document.querySelectorAll(selector) : 
                        [selector];
        
        elements.forEach(el => {
            el.classList.add(animationClass);
        });
    }, delay);
}

/**
 * Create and add palm markers
 * @param {Array} landmarks - Hand key point array
 */
function createPalmMarkers(landmarks) {
    try {
        // Get or create palm-markers container
        let markersContainer = document.querySelector('.palm-markers');
        if (!markersContainer) {
            console.log('Create new .palm-markers element');
            
            // Try to find result image container
            const resultImageContainer = document.querySelector('.result-palm-image') || document.querySelector('.palm-image-container');
            if (resultImageContainer) {
                // Create markers container
                markersContainer = document.createElement('div');
                markersContainer.className = 'palm-markers';
                markersContainer.style.position = 'absolute';
                markersContainer.style.top = '0';
                markersContainer.style.left = '0';
                markersContainer.style.width = '100%';
                markersContainer.style.height = '100%';
                markersContainer.style.pointerEvents = 'none';
                
                // Add to image container
                resultImageContainer.style.position = 'relative';
                resultImageContainer.appendChild(markersContainer);
            } else {
                console.error('Cannot find result image container element');
                return;
            }
        }
    
    // Clear existing markers
        markersContainer.innerHTML = '';
        
        // Check if landmarks data is valid
        if (!isValidLandmarksData(landmarks)) {
            console.log('Using static palm markers instead of invalid key point data');
            createStaticPalmMarkers(markersContainer);
            return;
        }
    
        // Get reference image
        const img = document.getElementById('analyzedPalmImage') || 
                    document.getElementById('markedPalmImage') || 
                    document.getElementById('palmPreview');
        
        if (!img) {
            console.error('No reference image element found');
            createStaticPalmMarkers(markersContainer);
            return;
        }
        
        // Ensure image is fully loaded before creating markers
        const createMarkersWithRetry = (retryCount = 0, maxRetries = 3) => {
            try {
                // Get image container size
                const containerWidth = markersContainer.clientWidth;
                const containerHeight = markersContainer.clientHeight;
                
                if (containerWidth === 0 || containerHeight === 0) {
                    if (retryCount < maxRetries) {
                        console.log(`Container size is 0, delaying retry (${retryCount + 1}/${maxRetries})`);
                        setTimeout(() => createMarkersWithRetry(retryCount + 1, maxRetries), 100);
                        return;
                    } else {
                        console.error('Container size is 0, reached maximum retry count');
                    }
                }
                
                // Get actual image size (natural size)
                const naturalWidth = img.naturalWidth || 400;
                const naturalHeight = img.naturalHeight || 600;
                
                // Get image display size
                const displayWidth = img.clientWidth || containerWidth;
                const displayHeight = img.clientHeight || containerHeight;
                
                console.log(`Image size - Container: ${containerWidth}x${containerHeight}, Display: ${displayWidth}x${displayHeight}, Original: ${naturalWidth}x${naturalHeight}`);
                
                // Use display size, not original size
                const imgWidth = displayWidth;
                const imgHeight = displayHeight;
                
                console.log(`Final reference image size used: ${imgWidth}x${imgHeight}`);
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
                svg.setAttribute('viewBox', `0 0 ${imgWidth} ${imgHeight}`);
                // Ensure SVG aligns perfectly with image - use same object-fit strategy
                svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
                svg.style.pointerEvents = 'none';
                
                // Add markers for analysis
                for (let i = 0; i < landmarks.length; i++) {
                    // Check coordinate validity
                    if (!landmarks[i] || typeof landmarks[i].x !== 'number' || typeof landmarks[i].y !== 'number' ||
                        isNaN(landmarks[i].x) || isNaN(landmarks[i].y)) {
                        console.warn(`Skipping invalid key point ${i}`);
                        continue;
                    }
                    
                    try {
                        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        
                        // Convert normalized coordinates (0-1) to pixel coordinates, considering image display method
                        const x = landmarks[i].x * imgWidth;
                        const y = landmarks[i].y * imgHeight;
                        
                        point.setAttribute('cx', x);
                        point.setAttribute('cy', y);
                        point.setAttribute('r', '3');
                        point.setAttribute('fill', 'rgba(156, 15, 95, 0.6)');
                        point.setAttribute('stroke', 'rgba(156, 15, 95, 0.8)');
                        point.setAttribute('stroke-width', '1');
                        point.classList.add('landmark-point');
                        point.style.animationDelay = (i * 0.05) + 's';
                        
                        // Add hover text
                        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                        title.textContent = `Point ${i}`;
                        point.appendChild(title);
                        
                        svg.appendChild(point);
                    } catch (pointError) {
                        console.error(`Error adding key point ${i}:`, pointError);
                    }
                }
                
                // Add palm line paths - pass image size for coordinate conversion
                try {
                    createPalmLinePaths(svg, landmarks, imgWidth, imgHeight);
                } catch (pathError) {
                    console.error('Error creating palm line paths:', pathError);
                    createStaticPalmLinePaths(svg, imgWidth, imgHeight);
                }
                
                // Add SVG to markers container
                markersContainer.appendChild(svg);
                
                // Add palm line legend
                createPalmLineLegend(markersContainer);
            } catch (error) {
                console.error('Error creating markers:', error);
                createStaticPalmMarkers(markersContainer);
            }
        };
        
        // Check if image is loaded
        if (img.complete && img.naturalWidth > 0) {
            console.log('Image loaded, creating markers directly');
            // Delay one frame to ensure DOM is updated
            setTimeout(() => createMarkersWithRetry(), 50);
        } else {
            console.log('Image not loaded, waiting for load before creating markers');
            img.onload = () => {
                console.log('Image loaded, creating markers');
                // Delay one frame to ensure image is fully rendered
                setTimeout(() => createMarkersWithRetry(), 50);
            };
        }
        
    } catch (error) {
        console.error('Error creating palm markers:', error);
        
        try {
            const container = document.querySelector('.palm-markers');
            if (container) {
                createStaticPalmMarkers(container);
            }
        } catch (fallbackError) {
            console.error('Static palm markers creation also failed:', fallbackError);
        }
    }
}

/**
 * Check if landmarks data is valid
 * @param {Array} landmarks - Hand key point array
 * @return {boolean} Whether valid
 */
function isValidLandmarksData(landmarks) {
    if (!landmarks || !Array.isArray(landmarks) || landmarks.length < 21) {
        console.warn(`Invalid landmarks data: ${landmarks ? 'length=' + landmarks.length : 'undefined'}`);
        return false;
    }
    
    // Check if at least half of the key points are valid
    let validCount = 0;
    for (let i = 0; i < landmarks.length; i++) {
        if (landmarks[i] && 
            typeof landmarks[i].x === 'number' && 
            typeof landmarks[i].y === 'number' && 
            !isNaN(landmarks[i].x) && 
            !isNaN(landmarks[i].y) &&
            landmarks[i].x >= 0 && landmarks[i].x <= 1 &&
            landmarks[i].y >= 0 && landmarks[i].y <= 1) {
            validCount++;
        }
    }
    
    const isValid = validCount >= landmarks.length / 2;
    if (!isValid) {
        console.warn(`Valid key point count insufficient: ${validCount}/${landmarks.length}`);
    }
    
    return isValid;
}

/**
 * Create palm line paths
 * @param {SVGElement} svg - SVG element
 * @param {Array} landmarks - Hand key point array
 * @param {number} imgWidth - Image width (pixels)
 * @param {number} imgHeight - Image height (pixels)
 */
function createPalmLinePaths(svg, landmarks, imgWidth, imgHeight) {
    // Palm line display is disabled
    console.log('Palm line path creation disabled');
    return;
    
    // The following code will not execute
    try {
        // Check if key point data is valid
        if (!landmarks || landmarks.length < 21) {
            console.warn('Hand key point data incomplete, using static example instead');
            createStaticPalmLinePaths(svg, imgWidth, imgHeight);
            return;
        }
        
        // Hand key point index constants
        const WRIST = 0;          // Wrist
        const THUMB_CMC = 1;      // Thumb metacarpal
        const THUMB_MCP = 2;      // Thumb MCP
        const THUMB_IP = 3;       // Thumb IP
        const THUMB_TIP = 4;      // Thumb tip
        const INDEX_MCP = 5;      // Index MCP
        const INDEX_PIP = 6;      // Index proximal interphalangeal
        const INDEX_DIP = 7;      // Index distal interphalangeal
        const INDEX_TIP = 8;      // Index tip
        const MIDDLE_MCP = 9;     // Middle MCP
        const MIDDLE_PIP = 10;    // Middle proximal interphalangeal
        const MIDDLE_DIP = 11;    // Middle distal interphalangeal
        const MIDDLE_TIP = 12;    // Middle tip
        const RING_MCP = 13;      // Ring MCP
        const RING_PIP = 14;      // Ring proximal interphalangeal
        const RING_DIP = 15;      // Ring distal interphalangeal
        const RING_TIP = 16;      // Ring tip
        const PINKY_MCP = 17;     // Pinky MCP
        const PINKY_PIP = 18;     // Pinky proximal interphalangeal
        const PINKY_DIP = 19;     // Pinky distal interphalangeal
        const PINKY_TIP = 20;     // Pinky tip
        
        // Check validity of each key point
        const criticalPoints = [WRIST, THUMB_CMC, INDEX_MCP, MIDDLE_MCP, RING_MCP, PINKY_MCP];
        for (const index of criticalPoints) {
            // Check if these key points are valid
            if (!isValidCoordinate(landmarks[index])) {
                console.warn(`Key point ${index} invalid, using static example instead`);
                createStaticPalmLinePaths(svg, imgWidth, imgHeight);
                return;
            }
        }
        
        console.log('Creating palm line paths, all key points valid');
        
        try {
            // Convert coordinates function - Convert 0-1 range coordinates to pixel coordinates
            const toPixel = (point) => ({
                x: point.x * imgWidth,
                y: point.y * imgHeight
            });
            
            // Life line: Curve from wrist to thumb metacarpal area
            const lifeLinePoints = [
                toPixel(landmarks[WRIST]),
                toPixel({
                    x: landmarks[WRIST].x * 0.7 + landmarks[THUMB_CMC].x * 0.3, 
                    y: landmarks[WRIST].y * 0.7 + landmarks[THUMB_CMC].y * 0.3
                }),
                toPixel({
                    x: landmarks[WRIST].x * 0.5 + landmarks[THUMB_CMC].x * 0.5, 
                    y: landmarks[WRIST].y * 0.5 + landmarks[THUMB_CMC].y * 0.5
                }),
                toPixel({
                    x: landmarks[WRIST].x * 0.3 + landmarks[THUMB_CMC].x * 0.7, 
                    y: landmarks[WRIST].y * 0.3 + landmarks[THUMB_CMC].y * 0.7
                }),
                toPixel(landmarks[THUMB_CMC])
            ];
            
            // Verify all calculated points
            if (!validatePixelPoints(lifeLinePoints)) {
                throw new Error('Life line path point calculation error');
            }
            
            // Head line: Across palm middle
            const headLinePoints = [
                toPixel({
                    x: landmarks[PINKY_MCP].x * 0.9 + landmarks[WRIST].x * 0.1, 
                    y: landmarks[PINKY_MCP].y * 0.9 + landmarks[WRIST].y * 0.1
                }),
                toPixel({
                    x: (landmarks[PINKY_MCP].x + landmarks[RING_MCP].x) / 2, 
                    y: (landmarks[PINKY_MCP].y + landmarks[RING_MCP].y) / 2
                }),
                toPixel({
                    x: (landmarks[RING_MCP].x + landmarks[MIDDLE_MCP].x) / 2, 
                    y: (landmarks[RING_MCP].y + landmarks[MIDDLE_MCP].y) / 2
                }),
                toPixel({
                    x: (landmarks[MIDDLE_MCP].x + landmarks[INDEX_MCP].x) / 2, 
                    y: (landmarks[MIDDLE_MCP].y + landmarks[INDEX_MCP].y) / 2
                }),
                toPixel({
                    x: landmarks[INDEX_MCP].x * 0.8 + landmarks[MIDDLE_MCP].x * 0.2, 
                    y: landmarks[INDEX_MCP].y * 0.8 + landmarks[MIDDLE_MCP].y * 0.2
                })
            ];
            
            // Verify all calculated points
            if (!validatePixelPoints(headLinePoints)) {
                throw new Error('Head line path point calculation error');
            }
            
            // Heart line: Across palm upper
            const heartLinePoints = [
                toPixel({
                    x: landmarks[PINKY_MCP].x * 1.05, 
                    y: landmarks[PINKY_MCP].y * 0.9 + landmarks[WRIST].y * 0.1
                }),
                toPixel({
                    x: landmarks[PINKY_MCP].x, 
                    y: landmarks[PINKY_MCP].y * 0.85 + landmarks[WRIST].y * 0.15
                }),
                toPixel({
                    x: (landmarks[PINKY_MCP].x + landmarks[RING_MCP].x) / 2, 
                    y: ((landmarks[PINKY_MCP].y + landmarks[RING_MCP].y) / 2) * 0.85 + landmarks[WRIST].y * 0.15
                }),
                toPixel({
                    x: (landmarks[RING_MCP].x + landmarks[MIDDLE_MCP].x) / 2, 
                    y: ((landmarks[RING_MCP].y + landmarks[MIDDLE_MCP].y) / 2) * 0.85 + landmarks[WRIST].y * 0.15
                }),
                toPixel({
                    x: landmarks[MIDDLE_MCP].x * 0.75 + landmarks[INDEX_MCP].x * 0.25, 
                    y: landmarks[MIDDLE_MCP].y * 0.85 + landmarks[WRIST].y * 0.15
                })
            ];
            
            // Verify all calculated points
            if (!validatePixelPoints(heartLinePoints)) {
                throw new Error('Heart line path point calculation error');
            }
            
            // Create paths
            const lifeLinePath = createSmoothPixelPath(lifeLinePoints);
            const headLinePath = createSmoothPixelPath(headLinePoints);
            const heartLinePath = createSmoothPixelPath(heartLinePoints);
            
            // Create path elements
            const lifeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            lifeLine.setAttribute('d', lifeLinePath);
            lifeLine.setAttribute('stroke', 'rgba(212, 175, 55, 0.8)');
            lifeLine.setAttribute('stroke-width', '3');
            lifeLine.setAttribute('fill', 'none');
            lifeLine.setAttribute('class', 'palm-line life-line');
            lifeLine.setAttribute('data-line-type', 'life-line');
            
            const headLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            headLine.setAttribute('d', headLinePath);
            headLine.setAttribute('stroke', 'rgba(75, 0, 130, 0.8)');
            headLine.setAttribute('stroke-width', '3');
            headLine.setAttribute('fill', 'none');
            headLine.setAttribute('class', 'palm-line head-line');
            headLine.setAttribute('data-line-type', 'head-line');
            
            const heartLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            heartLine.setAttribute('d', heartLinePath);
            heartLine.setAttribute('stroke', 'rgba(156, 15, 95, 0.8)');
            heartLine.setAttribute('stroke-width', '3');
            heartLine.setAttribute('fill', 'none');
            heartLine.setAttribute('class', 'palm-line heart-line');
            heartLine.setAttribute('data-line-type', 'heart-line');
            
            // Add animation effect
            lifeLine.setAttribute('stroke-dasharray', '1000');
            lifeLine.setAttribute('stroke-dashoffset', '1000');
            lifeLine.style.animation = 'dash 2s ease-in-out forwards';
            lifeLine.style.animationDelay = '0.5s';
            
            headLine.setAttribute('stroke-dasharray', '1000');
            headLine.setAttribute('stroke-dashoffset', '1000');
            headLine.style.animation = 'dash 2s ease-in-out forwards';
            headLine.style.animationDelay = '1s';
            
            heartLine.setAttribute('stroke-dasharray', '1000');
            heartLine.setAttribute('stroke-dashoffset', '1000');
            heartLine.style.animation = 'dash 2s ease-in-out forwards';
            heartLine.style.animationDelay = '1.5s';
            
            // Add paths to SVG
            svg.appendChild(lifeLine);
            svg.appendChild(headLine);
            svg.appendChild(heartLine);
            
            // Add reference points for debugging
            //addReferencePoints(svg, imgWidth, imgHeight);
            
        } catch (error) {
            console.error('Error creating palm line paths:', error);
            createStaticPalmLinePaths(svg, imgWidth, imgHeight);
        }
    } catch (error) {
        console.error('Error creating palm line paths:', error);
        createStaticPalmLinePaths(svg, imgWidth, imgHeight);
    }
}

/**
 * Check if coordinate point is valid
 * @param {Object} point - Coordinate point
 * @return {boolean} Whether valid
 */
function isValidCoordinate(point) {
    return point && 
           typeof point.x === 'number' && 
           typeof point.y === 'number' && 
           !isNaN(point.x) && 
           !isNaN(point.y) &&
           point.x >= 0 && point.x <= 1 &&
           point.y >= 0 && point.y <= 1;
}

/**
 * Verify all calculated pixel points are valid
 * @param {Array} points - Pixel point array
 * @return {boolean} Whether all valid
 */
function validatePixelPoints(points) {
    if (!points || !Array.isArray(points) || points.length < 2) {
        console.warn('Invalid point array or point count insufficient');
        return false;
    }
    
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (!point || 
            typeof point.x !== 'number' || 
            typeof point.y !== 'number' || 
            isNaN(point.x) || 
            isNaN(point.y) ||
            point.x < 0 || 
            point.y < 0) {
            console.warn(`Point ${i} coordinate invalid: x=${point?.x}, y=${point?.y}`);
            return false;
        }
    }
    
    return true;
}

/**
 * Create smooth path string (using pixel coordinates)
 * @param {Array} points - Pixel coordinate point array
 * @return {string} SVG path string
 */
function createSmoothPixelPath(points) {
    if (!points || points.length < 2) return '';
    
    // Format coordinate values as fixed decimal places
    function formatCoord(value) {
        return value.toFixed(2);
    }
    
    let pathData = `M ${formatCoord(points[0].x)} ${formatCoord(points[0].y)}`;
    
    for (let i = 1; i < points.length - 1; i++) {
        const xc = ((points[i].x + points[i + 1].x) / 2);
        const yc = ((points[i].y + points[i + 1].y) / 2);
        
        pathData += ` Q ${formatCoord(points[i].x)} ${formatCoord(points[i].y)}, ${formatCoord(xc)} ${formatCoord(yc)}`;
    }
    
    if (points.length > 1) {
        const last = points[points.length - 1];
        pathData += ` L ${formatCoord(last.x)} ${formatCoord(last.y)}`;
    }
    
    return pathData;
}

/**
 * Create palm line legend
 * @param {HTMLElement} container - Container element
 */
function createPalmLineLegend(container) {
    // Palm line legend display is disabled
    console.log('Palm line legend creation disabled');
    return;
    
    // The following code will not execute
    // Create legend container
    const legend = document.createElement('div');
    legend.className = 'palm-line-legend';
    legend.style.position = 'absolute';
    legend.style.bottom = '10px';
    legend.style.right = '10px';
    legend.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    legend.style.padding = '8px';
    legend.style.borderRadius = '5px';
    legend.style.fontSize = '12px';
    legend.style.display = 'flex';
    legend.style.flexDirection = 'column';
    legend.style.gap = '5px';
    legend.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    // Add legend items
    const items = [
        { color: 'rgba(212, 175, 55, 0.8)', name: 'Life line' },
        { color: 'rgba(75, 0, 130, 0.8)', name: 'Head line' },
        { color: 'rgba(156, 15, 95, 0.8)', name: 'Heart line' }
    ];
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.gap = '5px';
        
        const colorBox = document.createElement('div');
        colorBox.style.width = '20px';
        colorBox.style.height = '3px';
        colorBox.style.backgroundColor = item.color;
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        
        itemDiv.appendChild(colorBox);
        itemDiv.appendChild(nameSpan);
        legend.appendChild(itemDiv);
    });
    
    container.appendChild(legend);
}

/**
 * Create static palm line paths (use when actual detection fails)
 * @param {SVGElement} svg - SVG element
 * @param {number} imgWidth - Image width
 * @param {number} imgHeight - Image height
 */
function createStaticPalmLinePaths(svg, imgWidth, imgHeight) {
    // Static palm line display is disabled
    console.log('Static palm line path creation disabled');
    return;
    
    // The following code will not execute
    try {
        // Life line data points (static example)
        const lifeLineData = "M " + (imgWidth * 0.4) + "," + (imgHeight * 0.7) + 
                          " Q " + (imgWidth * 0.38) + "," + (imgHeight * 0.6) + " " + (imgWidth * 0.35) + "," + (imgHeight * 0.5) + 
                          " T " + (imgWidth * 0.3) + "," + (imgHeight * 0.4) + 
                          " T " + (imgWidth * 0.25) + "," + (imgHeight * 0.3);
        
        // Head line data points (static example)
        const headLineData = "M " + (imgWidth * 0.2) + "," + (imgHeight * 0.5) + 
                          " Q " + (imgWidth * 0.3) + "," + (imgHeight * 0.5) + " " + (imgWidth * 0.4) + "," + (imgHeight * 0.5) + 
                          " T " + (imgWidth * 0.5) + "," + (imgHeight * 0.48) + 
                          " T " + (imgWidth * 0.6) + "," + (imgHeight * 0.46);
        
        // Heart line data points (static example)
        const heartLineData = "M " + (imgWidth * 0.2) + "," + (imgHeight * 0.4) + 
                           " Q " + (imgWidth * 0.3) + "," + (imgHeight * 0.38) + " " + (imgWidth * 0.4) + "," + (imgHeight * 0.36) + 
                           " T " + (imgWidth * 0.5) + "," + (imgHeight * 0.35) + 
                           " T " + (imgWidth * 0.6) + "," + (imgHeight * 0.36);
        
        // Create and add static life line
        const staticLifeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        staticLifeLine.setAttribute('d', lifeLineData);
        staticLifeLine.setAttribute('stroke', 'rgba(212, 175, 55, 0.8)');
        staticLifeLine.setAttribute('stroke-width', '3');
        staticLifeLine.setAttribute('fill', 'none');
        staticLifeLine.setAttribute('class', 'palm-line life-line static');
        staticLifeLine.setAttribute('data-line-type', 'life-line');
        
        // Create and add static head line
        const staticHeadLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        staticHeadLine.setAttribute('d', headLineData);
        staticHeadLine.setAttribute('stroke', 'rgba(75, 0, 130, 0.8)');
        staticHeadLine.setAttribute('stroke-width', '3');
        staticHeadLine.setAttribute('fill', 'none');
        staticHeadLine.setAttribute('class', 'palm-line head-line static');
        staticHeadLine.setAttribute('data-line-type', 'head-line');
        
        // Create and add static heart line
        const staticHeartLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        staticHeartLine.setAttribute('d', heartLineData);
        staticHeartLine.setAttribute('stroke', 'rgba(156, 15, 95, 0.8)');
        staticHeartLine.setAttribute('stroke-width', '3');
        staticHeartLine.setAttribute('fill', 'none');
        staticHeartLine.setAttribute('class', 'palm-line heart-line static');
        staticHeartLine.setAttribute('data-line-type', 'heart-line');
        
        // Add animation effect
        staticLifeLine.setAttribute('stroke-dasharray', '1000');
        staticLifeLine.setAttribute('stroke-dashoffset', '1000');
        staticLifeLine.style.animation = 'dash 2s ease-in-out forwards';
        staticLifeLine.style.animationDelay = '0.5s';
        
        staticHeadLine.setAttribute('stroke-dasharray', '1000');
        staticHeadLine.setAttribute('stroke-dashoffset', '1000');
        staticHeadLine.style.animation = 'dash 2s ease-in-out forwards';
        staticHeadLine.style.animationDelay = '1s';
        
        staticHeartLine.setAttribute('stroke-dasharray', '1000');
        staticHeartLine.setAttribute('stroke-dashoffset', '1000');
        staticHeartLine.style.animation = 'dash 2s ease-in-out forwards';
        staticHeartLine.style.animationDelay = '1.5s';
        
        // Add to SVG
        svg.appendChild(staticLifeLine);
        svg.appendChild(staticHeadLine);
        svg.appendChild(staticHeartLine);
        
        // Add reference points for debugging
        //addReferencePoints(svg, imgWidth, imgHeight);
        
    } catch (error) {
        console.error('Error creating static palm line paths:', error);
    }
}

/**
 * Create static palm markers (use when no actual detection data)
 * @param {HTMLElement} container - Marker container
 */
function createStaticPalmMarkers(container) {
    try {
        if (!container) {
            console.error('Invalid container element');
            return;
        }
        
        console.log('Creating static palm markers as fallback');
        
        // Get container size
        const containerWidth = container.clientWidth || 400;
        const containerHeight = container.clientHeight || 600;
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        
        // Use simple direct definition path instead of calling function
        try {
            // Improved static palm line - More consistent with palm anatomy
            
            // Life line: Arc from wrist to thumb root
    const lifeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            lifeLine.setAttribute('d', `M ${containerWidth * 0.45} ${containerHeight * 0.75} Q ${containerWidth * 0.44} ${containerHeight * 0.7}, ${containerWidth * 0.43} ${containerHeight * 0.65} Q ${containerWidth * 0.41} ${containerHeight * 0.55}, ${containerWidth * 0.38} ${containerHeight * 0.5} Q ${containerWidth * 0.35} ${containerHeight * 0.45}, ${containerWidth * 0.32} ${containerHeight * 0.42}`);
    lifeLine.setAttribute('stroke', 'rgba(212, 175, 55, 0.8)');
    lifeLine.setAttribute('stroke-width', '3');
    lifeLine.setAttribute('fill', 'none');
            lifeLine.classList.add('draw-line');
            
            // Add title
            const lifeLineTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            lifeLineTitle.textContent = 'Life line';
            lifeLine.appendChild(lifeLineTitle);
            
            svg.appendChild(lifeLine);
            
            // Head line: Across palm middle
    const headLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            headLine.setAttribute('d', `M ${containerWidth * 0.25} ${containerHeight * 0.55} Q ${containerWidth * 0.35} ${containerHeight * 0.53}, ${containerWidth * 0.45} ${containerHeight * 0.51} Q ${containerWidth * 0.55} ${containerHeight * 0.5}, ${containerWidth * 0.65} ${containerHeight * 0.48}`);
    headLine.setAttribute('stroke', 'rgba(75, 0, 130, 0.8)');
    headLine.setAttribute('stroke-width', '3');
    headLine.setAttribute('fill', 'none');
            headLine.classList.add('draw-line');
            headLine.style.animationDelay = '0.4s';
            
            // Add title
            const headLineTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            headLineTitle.textContent = 'Head line';
            headLine.appendChild(headLineTitle);
            
            svg.appendChild(headLine);
            
            // Heart line: Across palm upper
    const heartLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            heartLine.setAttribute('d', `M ${containerWidth * 0.2} ${containerHeight * 0.45} Q ${containerWidth * 0.3} ${containerHeight * 0.43}, ${containerWidth * 0.4} ${containerHeight * 0.42} Q ${containerWidth * 0.5} ${containerHeight * 0.42}, ${containerWidth * 0.6} ${containerHeight * 0.43}`);
    heartLine.setAttribute('stroke', 'rgba(156, 15, 95, 0.8)');
    heartLine.setAttribute('stroke-width', '3');
    heartLine.setAttribute('fill', 'none');
            heartLine.classList.add('draw-line');
            heartLine.style.animationDelay = '0.8s';
            
            // Add title
            const heartLineTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            heartLineTitle.textContent = 'Heart line';
            heartLine.appendChild(heartLineTitle);
            
            svg.appendChild(heartLine);
            
            // Optional: Add some reference points to simulate hand key points
            addReferencePoints(svg, containerWidth, containerHeight);
        } catch (pathError) {
            console.error('Error creating static palm line paths:', pathError);
        }
        
        // Add SVG to container
        container.appendChild(svg);
        
        // Add legend
        try {
            createPalmLineLegend(container);
        } catch (legendError) {
            console.error('Error creating palm line legend:', legendError);
        }
    } catch (error) {
        console.error('Error creating static palm markers:', error);
    }
}

/**
 * Add single reference point
 * @param {SVGElement} svg - SVG element
 * @param {number} x - X coordinate (pixels)
 * @param {number} y - Y coordinate (pixels)
 */
function addPoint(svg, x, y) {
    try {
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttribute('cx', x);
        point.setAttribute('cy', y);
        point.setAttribute('r', '1.5');
        point.setAttribute('fill', 'rgba(156, 15, 95, 0.4)');
        svg.appendChild(point);
    } catch (error) {
        console.error('Error adding reference point:', error);
    }
}

/**
 * Initialize How It Works section interaction
 */
function initHowItWorksInteractions() {
    // Initialize result example tab switching
    const demoTabButtons = document.querySelectorAll('.demo-tab-btn');
    const demoTabPanels = document.querySelectorAll('.demo-tab-panel');
    
    demoTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取目标面板ID
            const targetPanelId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            demoTabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 切换面板显示
            demoTabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPanelId) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // 为手掌关键点添加悬停效果
    const jointPoints = document.querySelectorAll('.joint');
    
    jointPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const pointNumber = this.getAttribute('data-point');
            this.style.transform = 'scale(1.5)';
            this.style.backgroundColor = '#d4af37'; // 金色高亮
            
            // 创建点号显示
            if (!document.querySelector('.point-number-' + pointNumber)) {
                const pointLabel = document.createElement('div');
                pointLabel.className = 'point-number-' + pointNumber;
                pointLabel.style.position = 'absolute';
                pointLabel.style.top = '-20px';
                pointLabel.style.left = '0';
                pointLabel.style.backgroundColor = 'rgba(0,0,0,0.7)';
                pointLabel.style.color = '#fff';
                pointLabel.style.padding = '2px 6px';
                pointLabel.style.borderRadius = '4px';
                pointLabel.style.fontSize = '10px';
                pointLabel.style.zIndex = '10';
                pointLabel.textContent = '点' + pointNumber;
                this.appendChild(pointLabel);
            }
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
            
            // 移除点号显示
            const pointNumber = this.getAttribute('data-point');
            const pointLabel = document.querySelector('.point-number-' + pointNumber);
            if (pointLabel) {
                pointLabel.remove();
            }
        });
    });
}

/**
 * 添加静态掌纹线路径
 * @param {SVGElement} svg - SVG元素
 * @param {string} pathData - 路径数据
 * @param {string} color - 线条颜色
 * @param {string} title - 线条标题
 * @param {string} delay - 动画延迟
 */
function addStaticPalmLinePath(svg, pathData, color, title, delay) {
    try {
        console.log(`添加静态掌纹线: ${title}, 路径: ${pathData}`);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.classList.add('draw-line');
        path.style.animationDelay = delay;
        
        const titleElem = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleElem.textContent = title;
        path.appendChild(titleElem);
        
        svg.appendChild(path);
    } catch (error) {
        console.error(`添加静态${title}路径时出错:`, error);
    }
}

/**
 * 添加掌纹线路径
 * @param {SVGElement} svg - SVG元素
 * @param {string} pathData - 路径数据
 * @param {string} color - 线条颜色
 * @param {string} title - 线条标题
 * @param {string} delay - 动画延迟
 */
function addPalmLinePath(svg, pathData, color, title, delay) {
    try {
        // 验证路径数据
        if (!pathData || typeof pathData !== 'string') {
            console.error(`无效的路径数据: ${pathData}`);
            return;
        }
        
        // 创建SVG路径元素
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // 尝试设置路径数据前先进行日志记录
        console.log(`设置路径数据: ${title}, 路径: ${pathData}`);
        
        // 尝试设置路径数据
        try {
            path.setAttribute('d', pathData);
        } catch (pathError) {
            console.error(`设置路径数据时出错: ${pathError.message}, 路径数据: ${pathData}`);
            return;
        }
        
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.classList.add('draw-line');
        path.style.animationDelay = delay;
        
        const titleElem = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleElem.textContent = title;
        path.appendChild(titleElem);
        
        svg.appendChild(path);
    } catch (error) {
        console.error(`添加${title}路径时出错:`, error);
    }
} 