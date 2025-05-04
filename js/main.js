/**
 * Palm Destiny Analysis - Main Logic File
 * Contains global functionality, initialization, and event listeners for the website
 */

// Execute after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loading animation
    initPageTransition();
    
    // Initialize navigation bar interaction
    initNavigation();
    
    // Initialize palm analysis functionality
    initPalmAnalysis();
    
    // Initialize result display area switching
    initResultTabs();
    
    // Initialize animation effects
    initAnimations();
});

/**
 * Initialize page loading animation
 */
function initPageTransition() {
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    pageTransition.appendChild(loader);
    document.body.appendChild(pageTransition);
    
    // Hide loading animation after page loading is complete
    window.addEventListener('load', function() {
        setTimeout(function() {
            pageTransition.classList.add('loaded');
            
            // Remove element after 2 seconds
            setTimeout(function() {
                pageTransition.remove();
            }, 1000);
        }, 500);
    });
}

/**
 * Initialize navigation bar interaction
 */
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a, .nav-cta-button, .mobile-cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // If on mobile, close menu after clicking
                if (window.innerWidth <= 768) {
                    const mainNav = document.querySelector('.main-nav');
                    const menuToggle = document.getElementById('menuToggle');
                    
                    if (mainNav && menuToggle) {
                        mainNav.classList.remove('nav-open');
                        menuToggle.classList.remove('open');
                    }
                }
            }
        });
    });
    
    // Highlight current area in navigation bar when scrolling
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
    
    // Mobile navigation menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            mainNav.classList.toggle('nav-open');
        });
    }
    
    // Auto hide/show navigation bar when scrolling
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down and not near the top
                header.classList.add('nav-hidden');
            } else {
                // Scrolling up or near the top
                header.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop;
        } else {
            // Desktop version always visible
            header.classList.remove('nav-hidden');
        }
    });
    
    // Mobile fixed button scroll display logic
    const mobileCTAButton = document.querySelector('.mobile-cta-button');
    if (mobileCTAButton && window.innerWidth <= 768) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const analysisSection = document.getElementById('analysis');
            const heroSection = document.getElementById('home');
            
            if (!analysisSection || !heroSection) return;
            
            // Hide button when scrolled to analysis section, otherwise show it
            if (scrollTop >= (analysisSection.offsetTop - window.innerHeight/2) || 
                scrollTop <= (heroSection.offsetHeight / 2)) {
                mobileCTAButton.style.opacity = '0';
                mobileCTAButton.style.pointerEvents = 'none';
            } else {
                mobileCTAButton.style.opacity = '1';
                mobileCTAButton.style.pointerEvents = 'auto';
            }
        });
    }
}

/**
 * Initialize palm analysis functionality
 */
function initPalmAnalysis() {
    // Get necessary DOM elements
    const uploadBox = document.getElementById('uploadBox');
    const palmImageInput = document.getElementById('palmImageInput');
    const openCameraBtn = document.getElementById('openCameraBtn');
    const capturePalmBtn = document.getElementById('capturePalmBtn');
    const cameraPreview = document.getElementById('cameraPreview');
    const userInfoForm = document.getElementById('userInfoForm');
    const previewContainer = document.getElementById('previewContainer');
    const palmPreview = document.getElementById('palmPreview');
    const startAnalysisBtn = document.getElementById('startAnalysisBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    const saveReportBtn = document.getElementById('saveReportBtn');
    const shareResultsBtn = document.getElementById('shareResultsBtn');
    
    // File upload box click event
    uploadBox.addEventListener('click', function() {
        palmImageInput.click();
    });
    
    // File drag-and-drop handling
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
        
        if (e.dataTransfer.files.length > 0) {
            palmImageInput.files = e.dataTransfer.files;
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });
    
    // File input handling
    palmImageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            handleImageUpload(this.files[0]);
        }
    });
    
    // Camera button click event
    openCameraBtn.addEventListener('click', function() {
        // Show video preview
        cameraPreview.style.display = 'block';
        capturePalmBtn.style.display = 'block';
        this.style.display = 'none';
        
        // Request camera access permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    cameraPreview.srcObject = stream;
                })
                .catch(function(error) {
                    console.error('Failed to access camera:', error);
                    alert('Cannot access camera, please check permission settings or try uploading an image.');
                    
                    // Restore button state
                    cameraPreview.style.display = 'none';
                    capturePalmBtn.style.display = 'none';
                    openCameraBtn.style.display = 'block';
                });
        } else {
            alert('Your browser does not support camera functionality. Please try uploading an image.');
            
            // Restore button state
            cameraPreview.style.display = 'none';
            capturePalmBtn.style.display = 'none';
            openCameraBtn.style.display = 'block';
        }
    });
    
    // Capture button click event
    capturePalmBtn.addEventListener('click', function() {
        // Create canvas and take photo
        const canvas = document.createElement('canvas');
        canvas.width = cameraPreview.videoWidth;
        canvas.height = cameraPreview.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas content to image data
        const imageDataUrl = canvas.toDataURL('image/png');
        
        // Stop video stream
        const stream = cameraPreview.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        
        // Process captured image
        palmPreview.src = imageDataUrl;
        palmPreview.onload = function() {
            // Show preview and user information form
            previewContainer.style.display = 'block';
            userInfoForm.style.display = 'block';
            
            // Hide camera-related elements
            cameraPreview.style.display = 'none';
            capturePalmBtn.style.display = 'none';
            openCameraBtn.style.display = 'block';
        };
    });
    
    // Start analysis button click event
    startAnalysisBtn.addEventListener('click', function() {
        // Check if all necessary information is filled
        const userAge = document.getElementById('userAge').value;
        const userGender = document.getElementById('userGender').value;
        const focusArea = document.getElementById('focusArea').value;
        
        if (!userAge || !userGender || !focusArea) {
            alert('Please complete all information before starting analysis.');
            return;
        }
        
        // Call palm detection and analysis function
        startPalmDetection(palmPreview.src, userAge, userGender, focusArea);
    });
    
    // New analysis button click event
    newAnalysisBtn.addEventListener('click', function() {
        // Reset state
        resetAnalysisState();
    });
    
    // Save report button click event
    saveReportBtn.addEventListener('click', function() {
        saveAnalysisReport();
    });
    
    // Share results button click event
    shareResultsBtn.addEventListener('click', function() {
        shareAnalysisResults();
    });
}

/**
 * Handle image upload
 * @param {File} file - Uploaded image file
 */
function handleImageUpload(file) {
    // Check if file is an image
    if (!file.type.match('image.*')) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, etc.)');
        return;
    }
    
    // Create image preview
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const palmPreview = document.getElementById('palmPreview');
        palmPreview.src = e.target.result;
        
        // Show preview and user information form
        document.getElementById('previewContainer').style.display = 'block';
        document.getElementById('userInfoForm').style.display = 'block';
    };
    
    reader.readAsDataURL(file);
}

/**
 * Start palm detection
 * @param {string} imageData - Image data URL
 * @param {string} age - User age range
 * @param {string} gender - User gender
 * @param {string} focusArea - Focus area
 */
function startPalmDetection(imageData, age, gender, focusArea) {
    // Update UI status
    const detectionStatus = document.getElementById('detectionStatus');
    const analysisProgress = document.getElementById('analysisProgress');
    
    detectionStatus.textContent = 'Analyzing your palm...';
    analysisProgress.classList.add('analyzing');
    
    // Use functions from palm-detection.js for palm detection
    detectPalmFeatures(imageData)
        .then(function(features) {
            // Show intermediate status
            detectionStatus.textContent = 'Palm detection completed, generating analysis results...';
            console.log('Detected palm features:', features);
            
            // Save original features for display analysis process
            const originalFeatures = JSON.parse(JSON.stringify(features));
            
            // Use functions from analysis.js to analyze detected features
            return analyzePalmFeatures(features, age, gender, focusArea)
                .then(function(analysisResult) {
                    // Combine features and analysis results
                    const result = {
                        palmFeatures: originalFeatures,  // Save original palm features
                        analysis: analysisResult,
                        userInfo: {
                            age: age,
                            gender: gender,
                            focusArea: focusArea
                        }
                    };
                    
                    // Show analysis results
                    showAnalysisResult(result);
            
                    // Ensure detection overlay is still visible for palm lines display
                    try {
                        const detectionOverlay = document.getElementById('detectionOverlay');
                        if (detectionOverlay) {
                            detectionOverlay.style.display = 'block';
                        }
                    } catch (overlayError) {
                        console.warn('Cannot display detection overlay:', overlayError);
                    }
                    
                    // Mark palm lines
                    try {
                        markPalmLines(originalFeatures);
                    } catch (markError) {
                        console.error('Cannot mark palm lines:', markError);
                    }
                    
                    return result;
            });
        })
        .catch(function(error) {
            // Handle error
            console.error('Palm analysis failed:', error);
            detectionStatus.textContent = 'An error occurred during palm analysis, please try again.';
            analysisProgress.classList.remove('analyzing');
        });
}

/**
 * Initialize result tab switching
 */
function initResultTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get target panel ID
            const targetPanelId = this.getAttribute('data-tab');
            
            // Update button status
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Switch panel display
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPanelId) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize animation effects
 */
function initAnimations() {
    // Listen for scroll events, add fade-in animation
    const animatedElements = document.querySelectorAll('.feature-card, .section-title, .about-content, .destiny-card');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Execute only once
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Add observer
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Reset analysis state
 */
function resetAnalysisState() {
    // Hide results container
    document.getElementById('resultsContainer').style.display = 'none';
    
    // Reset preview and user information
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('userInfoForm').style.display = 'none';
    
    // Reset progress bar
    const analysisProgress = document.getElementById('analysisProgress');
    analysisProgress.classList.remove('analyzing');
    
    // Reset status text
    document.getElementById('detectionStatus').textContent = 'Ready for analysis';
    
    // Reset form
    document.getElementById('userAge').value = '';
    document.getElementById('userGender').value = '';
    document.getElementById('focusArea').value = '';
    
    // Clear image preview
    document.getElementById('palmPreview').src = '';
    
    // Scroll to analysis section
    document.getElementById('analysis').scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * Save analysis report
 */
function saveAnalysisReport() {
    // Get results container
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Use html2canvas library to convert results to image
    if (typeof html2canvas !== 'undefined') {
        // Create loading animation
        const loadingEl = document.createElement('div');
        loadingEl.className = 'report-loading';
        loadingEl.innerHTML = `
            <div class="report-loading-content">
                <div class="report-loading-spinner"></div>
                <div>Generating your palm destiny analysis report...</div>
                <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">Please wait, this may take a few seconds</div>
            </div>
        `;
        document.body.appendChild(loadingEl);
        
        // Short delay to ensure DOM updates
        setTimeout(() => {
            // Create a temporary container to save combined content of all tab pages
            const reportContainer = document.createElement('div');
            reportContainer.className = 'full-report-container';
            reportContainer.style.width = '100%';
            reportContainer.style.maxWidth = '800px';
            reportContainer.style.margin = '0 auto';
            reportContainer.style.padding = '30px';
            reportContainer.style.backgroundColor = '#151520';
            reportContainer.style.boxSizing = 'border-box';
            reportContainer.style.borderRadius = '15px';
            reportContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            reportContainer.style.color = '#e8e8e8';
            
            // Add report title
            const reportHeader = document.createElement('div');
            reportHeader.style.textAlign = 'center';
            reportHeader.style.marginBottom = '30px';
            reportHeader.style.padding = '20px';
            reportHeader.style.background = 'linear-gradient(135deg, #3a2d79 0%, #9c0f5f 100%)';
            reportHeader.style.borderRadius = '10px';
            reportHeader.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            reportHeader.innerHTML = `
                <h2 style="color: #ffffff; margin-bottom: 15px; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">✨ Palm Destiny Analysis Complete Report ✨</h2>
                <p style="color: #f0f0f0; font-size: 16px;">Generated time: ${new Date().toLocaleString()}</p>
            `;
            reportContainer.appendChild(reportHeader);
            
            // Get all tab page contents
            const tabPanels = document.querySelectorAll('.tab-panel');
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            // Execute cloning and adding for each tab page
            tabPanels.forEach((panel, index) => {
                // Get corresponding tab button text
                let tabTitle = "Palm Analysis";
                if (index < tabButtons.length) {
                    tabTitle = tabButtons[index].textContent.trim();
                }
                
                // Create tab title
                const sectionTitle = document.createElement('div');
                sectionTitle.style.background = 'linear-gradient(135deg, #3a2d79 0%, #4e3c91 100%)';
                sectionTitle.style.color = '#fff';
                sectionTitle.style.padding = '15px 20px';
                sectionTitle.style.borderRadius = '8px';
                sectionTitle.style.marginTop = '40px';
                sectionTitle.style.marginBottom = '20px';
                sectionTitle.style.fontWeight = 'bold';
                sectionTitle.style.fontSize = '22px';
                sectionTitle.style.textShadow = '0 1px 3px rgba(0,0,0,0.3)';
                sectionTitle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                sectionTitle.style.display = 'flex';
                sectionTitle.style.alignItems = 'center';
                sectionTitle.innerHTML = `<span style="margin-right: 10px;">🔮</span>${tabTitle}`;
                reportContainer.appendChild(sectionTitle);
                
                // Clone tab page content
                const panelClone = panel.cloneNode(true);
                
                // Modify cloned content style to make it visible
                panelClone.classList.add('active');
                panelClone.style.display = 'block';
                panelClone.style.opacity = '1';
                panelClone.style.visibility = 'visible';
                panelClone.style.position = 'relative';
                panelClone.style.transform = 'none';
                panelClone.style.backgroundColor = '#222230';
                panelClone.style.padding = '25px';
                panelClone.style.borderRadius = '10px';
                panelClone.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                panelClone.style.marginBottom = '30px';
                panelClone.style.color = '#e0e0e0';
                
                // Special handling for cards in destiny overview panel to ensure they are fully visible
                if (panel.id === 'destinyTab') {
                    const destinyCards = panelClone.querySelectorAll('.destiny-card');
                    destinyCards.forEach(card => {
                        // Remove all animation-related styles and classes
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                        card.style.animation = 'none';
                        card.style.animationDelay = '0s';
                        
                        // Modify style to ensure content is visible - no need to declare again, will modify more styles below
                        
                        // Add suitable print style
                        card.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
                        card.style.border = 'none';
                        // Add different background colors to cards
                        const cardIndex = Array.from(destinyCards).indexOf(card);
                        const bgColors = [
                            'linear-gradient(135deg, #3a2d79 0%, #4e3c91 100%)',
                            'linear-gradient(135deg, #9c0f5f 0%, #b52c78 100%)',
                            'linear-gradient(135deg, #346cb0 0%, #5088c7 100%)',
                            'linear-gradient(135deg, #9c4e0f 0%, #b76e2c 100%)',
                            'linear-gradient(135deg, #1f6e6e 0%, #328a8a 100%)',
                            'linear-gradient(135deg, #6e1f6e 0%, #8a328a 100%)',
                            'linear-gradient(135deg, #505050 0%, #6e6e6e 100%)'
                        ];
                        card.style.background = bgColors[cardIndex % bgColors.length];
                        card.style.padding = '20px';
                        card.style.borderRadius = '10px';
                        card.style.marginBottom = '20px';
                        
                        // Destiny title enhancement
                        const titleDiv = card.querySelector('.destiny-title');
                        if (titleDiv) {
                            titleDiv.style.color = '#ffffff';
                            titleDiv.style.fontSize = '20px';
                            titleDiv.style.fontWeight = 'bold';
                            titleDiv.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
                            titleDiv.style.marginBottom = '15px';
                            titleDiv.style.borderBottom = '2px solid rgba(255,255,255,0.3)';
                            titleDiv.style.paddingBottom = '8px';
                        }
                        
                        // Destiny content enhancement
                        const contentDiv = card.querySelector('.destiny-content');
                        if (contentDiv) {
                            contentDiv.style.color = '#ffffff';
                            contentDiv.style.fontSize = '16px';
                            contentDiv.style.lineHeight = '1.6';
                            contentDiv.style.fontWeight = '500';
                            contentDiv.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
                        }
                    });
                    
                    // Optimize destiny overview grid layout for printing
                    const destinyGrid = panelClone.querySelector('.destiny-grid');
                    if (destinyGrid) {
                        destinyGrid.style.display = 'grid';
                        destinyGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                        destinyGrid.style.gap = '25px';
                        destinyGrid.style.padding = '10px';
                        destinyGrid.style.margin = '10px 0 20px 0';
                    }
                    
                    // If odd number of cards, last one occupies full row
                    const cardCount = destinyCards.length;
                    if (cardCount % 2 !== 0) {
                        const lastCard = destinyCards[cardCount - 1];
                        if (lastCard) {
                            lastCard.style.gridColumn = '1 / span 2';
                            lastCard.style.maxWidth = '75%';
                            lastCard.style.margin = '0 auto 20px auto';
                        }
                    }
                }
                
                // Enhance specific module styles
                
                // Enhance analysis process module
                const processTab = reportContainer.querySelector('#processTab');
                if (processTab) {
                    // Detection steps enhancement
                    const stepsList = processTab.querySelector('.steps-list');
                    if (stepsList) {
                        const steps = stepsList.querySelectorAll('li');
                        steps.forEach((step, index) => {
                            step.style.color = '#ffebb5';
                            step.style.marginBottom = '12px';
                            step.style.fontWeight = '500';
                            step.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
                            step.style.position = 'relative';
                            step.style.paddingLeft = '10px';
                            step.style.borderLeft = '3px solid rgba(156, 15, 95, 0.5)';
                            step.style.paddingTop = '5px';
                            step.style.paddingBottom = '5px';
                        });
                    }
                    
                    // Detection parameters enhancement
                    const params = processTab.querySelectorAll('.parameter-group');
                    params.forEach(param => {
                        param.style.backgroundColor = 'rgba(45, 45, 55, 0.9)';
                        param.style.border = '1px solid rgba(156, 15, 95, 0.15)';
                        param.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.25)';
                        param.style.borderRadius = '8px';
                        param.style.padding = '15px';
                        param.style.marginBottom = '15px';
                        
                        const title = param.querySelector('h5');
                        if (title) {
                            title.style.color = '#ffd78e';
                            title.style.fontWeight = '600';
                            title.style.textShadow = '0 0 6px rgba(255, 215, 142, 0.3)';
                            title.style.marginBottom = '15px';
                            title.style.borderBottom = '1px solid rgba(255, 215, 142, 0.3)';
                            title.style.paddingBottom = '8px';
                        }
                        
                        const values = param.querySelectorAll('.parameter-value');
                        values.forEach(value => {
                            value.style.color = '#c2e6ff';
                            value.style.fontWeight = '600';
                            value.style.textShadow = '0 0 4px rgba(194, 230, 255, 0.3)';
                        });
                    });
                }
                
                // Enhance core palm module
                const linesTab = reportContainer.querySelector('#linesTab');
                if (linesTab) {
                    // Palm analysis text enhancement
                    const analysisSections = linesTab.querySelectorAll('.palm-line-section');
                    analysisSections.forEach(section => {
                        section.style.backgroundColor = 'rgba(45, 45, 55, 0.9)';
                        section.style.border = '1px solid rgba(156, 15, 95, 0.15)';
                        section.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.25)';
                        section.style.borderRadius = '8px';
                        section.style.padding = '15px';
                        section.style.marginBottom = '15px';
                        
                        const title = section.querySelector('h4');
                        if (title) {
                            title.style.color = '#ffd78e';
                            title.style.fontWeight = '600';
                            title.style.textShadow = '0 0 6px rgba(255, 215, 142, 0.3)';
                            title.style.marginBottom = '15px';
                            title.style.borderBottom = '1px solid rgba(255, 215, 142, 0.3)';
                            title.style.paddingBottom = '8px';
                        }
                        
                        const analysis = section.querySelector('.analysis-text');
                        if (analysis) {
                            analysis.style.color = '#e8e8e8';
                            analysis.style.lineHeight = '1.8';
                            analysis.style.fontStyle = 'italic';
                            analysis.style.padding = '10px';
                            analysis.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                            analysis.style.borderRadius = '5px';
                            analysis.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.2)';
                        }
                    });
                }
                
                // Add to report container
                reportContainer.appendChild(panelClone);
            });
            
            // Add separator and footer
            const footer = document.createElement('div');
            footer.style.marginTop = '40px';
            footer.style.borderTop = '1px solid rgba(255,255,255,0.1)';
            footer.style.paddingTop = '25px';
            footer.style.paddingBottom = '10px';
            footer.style.textAlign = 'center';
            footer.style.color = '#a0a0a0';
            footer.style.fontSize = '14px';
            footer.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <span style="font-size: 18px; margin-right: 5px;">✨</span>
                    © Palm Destiny Analysis System - For more detailed readings, please visit our website
                    <span style="font-size: 18px; margin-left: 5px;">✨</span>
                </div>
                <div style="color: #777; font-size: 12px;">Generated on ${new Date().toLocaleDateString()}</div>
            `;
            reportContainer.appendChild(footer);
            
            // Temporary add to document (but not visible), to generate image
            reportContainer.style.position = 'absolute';
            reportContainer.style.left = '-9999px';
            document.body.appendChild(reportContainer);
            
            // Global text style optimization for readability
            const allParagraphs = reportContainer.querySelectorAll('p, .text-content, li, .parameter-description, .demo-meaning, .demo-reading, .small-text, .analysis-text');
            allParagraphs.forEach(p => {
                p.style.color = '#e0e0e0';
                p.style.lineHeight = '1.6';
            });
            
            const allHeadings = reportContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
            allHeadings.forEach(h => {
                h.style.color = '#ffffff';
                h.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
            });
            
            const allLinks = reportContainer.querySelectorAll('a');
            allLinks.forEach(a => {
                a.style.color = '#ff9eb7';
                a.style.textDecoration = 'none';
            });
            
            const allTables = reportContainer.querySelectorAll('table');
            allTables.forEach(table => {
                table.style.borderCollapse = 'collapse';
                table.style.width = '100%';
                table.style.margin = '15px 0';
                table.style.border = '1px solid rgba(255,255,255,0.1)';
                
                const allCells = table.querySelectorAll('th, td');
                allCells.forEach(cell => {
                    cell.style.border = '1px solid rgba(255,255,255,0.1)';
                    cell.style.padding = '12px';
                    cell.style.color = '#e0e0e0';
                });
                
                const allHeaders = table.querySelectorAll('th');
                allHeaders.forEach(header => {
                    header.style.backgroundColor = 'rgba(156, 15, 95, 0.25)';
                    header.style.color = '#ffffff';
                    header.style.fontWeight = 'bold';
                });
            });
            
            // Add an extra delay to ensure all content is fully rendered
            setTimeout(() => {
                // Generate report image
                html2canvas(reportContainer, {
                    scale: 2, // Increase clarity
                    logging: false, // Disable logging
                    allowTaint: true, // Allow cross-domain images
                    useCORS: true, // Use CORS to load cross-domain images
                    backgroundColor: '#ffffff', // Set background color
                    windowWidth: 800, // Set window width
                    windowHeight: reportContainer.scrollHeight, // Set window height
                }).then(canvas => {
                    // Remove temporary container from document
                    document.body.removeChild(reportContainer);
                    
                    // Remove loading animation
                    document.body.removeChild(loadingEl);
                    
                    try {
                        // Convert to image and download
                        const imageData = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = imageData;
                        link.download = 'Palm Destiny Analysis Complete Report_' + new Date().toISOString().slice(0, 10) + '.png';
                        link.click();
                        
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.style.position = 'fixed';
                        successMsg.style.bottom = '20px';
                        successMsg.style.left = '50%';
                        successMsg.style.transform = 'translateX(-50%)';
                        successMsg.style.backgroundColor = '#4CAF50';
                        successMsg.style.color = 'white';
                        successMsg.style.padding = '10px 20px';
                        successMsg.style.borderRadius = '4px';
                        successMsg.style.zIndex = '9999';
                        successMsg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                        successMsg.textContent = 'Complete report saved successfully!';
                        document.body.appendChild(successMsg);
                        
                        setTimeout(() => {
                            document.body.removeChild(successMsg);
                        }, 3000);
                    } catch (error) {
                        console.error('Error saving image data:', error);
                        alert('Error saving report, please try again.');
                    }
                }).catch(error => {
                    // Try to remove temporary container from document
                    try {
                        document.body.removeChild(reportContainer);
                    } catch (e) {
                        console.error('Error removing temporary container:', e);
                    }
                    
                    // Remove loading animation
                    document.body.removeChild(loadingEl);
                    
                    // Show error message
                    console.error('Error saving report:', error);
                    alert('Error saving report, please try again.');
                });
            }, 1000); // Add 1 second delay to ensure all content is fully rendered
        }, 100);
    } else {
        // Show loading message
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'report-loading';
        loadingMsg.innerHTML = `
            <div class="report-loading-content">
                <div class="report-loading-spinner"></div>
                <div>Loading necessary components...</div>
                <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">First use may take longer</div>
            </div>
        `;
        document.body.appendChild(loadingMsg);
        
        console.warn('html2canvas library not loaded, cannot save report.');
        
        // Try dynamic loading of html2canvas library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = function() {
            // Remove loading message
            document.body.removeChild(loadingMsg);
            
            // Show success message and prompt user to try again
            const successMsg = document.createElement('div');
            successMsg.style.position = 'fixed';
            successMsg.style.top = '50%';
            successMsg.style.left = '50%';
            successMsg.style.transform = 'translate(-50%, -50%)';
            successMsg.style.backgroundColor = '#4CAF50';
            successMsg.style.color = 'white';
            successMsg.style.padding = '20px';
            successMsg.style.borderRadius = '10px';
            successMsg.style.zIndex = '9999';
            successMsg.style.maxWidth = '300px';
            successMsg.style.textAlign = 'center';
            successMsg.innerHTML = `
                <div style="margin-bottom: 10px; font-weight: bold;">Component loading completed</div>
                <div>Please click "Save My Analysis Report" button again</div>
            `;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 5000);
        };
        script.onerror = function() {
            // Remove loading message
            document.body.removeChild(loadingMsg);
            
            // Show error message
            alert('Cannot load necessary components, please check network connection and try again.');
        };
        document.head.appendChild(script);
    }
}

/**
 * Share analysis results
 */
function shareAnalysisResults() {
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'My Palm Destiny Analysis Results',
            text: 'Check out my palm destiny analysis results, learn about my destiny path!',
            url: window.location.href
        })
        .catch(error => console.error('Share failed:', error));
    } else {
        // Backup option: Copy link to clipboard
        const dummyInput = document.createElement('input');
        document.body.appendChild(dummyInput);
        dummyInput.value = window.location.href;
        dummyInput.select();
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
        
        alert('Link copied to clipboard, you can manually share with friends!');
    }
}

/**
 * Show palm analysis results
 * @param {Object} result - Object containing palm features and analysis results
 */
function showAnalysisResult(result) {
    try {
        // Use functions from result-generator.js to generate analysis results
        displayAnalysisResults(result.analysis);
        
        // Handle hand key points and palm lines display
        try {
            // Check if palm features data is valid
            if (result.palmFeatures && result.palmFeatures.landmarks) {
                console.log('Passing key point data to UI controller...');
                // Pass key point information to createPalmMarkers function in UI controller
                createPalmMarkers(result.palmFeatures.landmarks);
            } else {
                console.warn('No valid hand key point data, using static example');
                // If no key point data, use default display
                createPalmMarkers(null);
            }
            
            // Try marking palm lines
            try {
                console.log('Marking palm lines...');
                markPalmLines(result.palmFeatures);
            } catch (markError) {
                console.error('Error marking palm lines:', markError);
            }
        } catch (uiError) {
            console.error('Error displaying palm UI elements:', uiError);
        }
        
        // Show results container
        document.getElementById('resultsContainer').style.display = 'block';
        
        // Update status
        const detectionStatus = document.getElementById('detectionStatus');
        const analysisProgress = document.getElementById('analysisProgress');
        if (detectionStatus) detectionStatus.textContent = 'Analysis completed';
        if (analysisProgress) analysisProgress.classList.remove('analyzing');
        
        // Scroll to results area
        document.getElementById('resultsContainer').scrollIntoView({
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error displaying analysis results:', error);
        
        // Show basic results
        const detectionStatus = document.getElementById('detectionStatus');
        const analysisProgress = document.getElementById('analysisProgress');
        if (detectionStatus) detectionStatus.textContent = 'Analysis completed, but there was an issue displaying results';
        if (analysisProgress) analysisProgress.classList.remove('analyzing');
        
        document.getElementById('resultsContainer').style.display = 'block';
    }
} 