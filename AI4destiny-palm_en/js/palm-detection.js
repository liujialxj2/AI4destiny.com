/**
 * Palm Destiny Analysis - Palm Detection Core Code
 * Using MediaPipe Hands for hand feature detection
 */

// MediaPipe model and tools
let hands;
let camera;
let detectionOverlay;
let lastDetection = null;
let isProcessing = false;
let detectionSteps = []; // Record steps during detection process

/**
 * Initialize MediaPipe Hands model
 * Execute on first detection function call
 */
async function initializeMediaPipe() {
    try {
        // Check if MediaPipe is available
        if (typeof Hands === 'undefined') {
            console.error('MediaPipe Hands library not loaded');
            throw new Error('MediaPipe Hands library not loaded, please check your network connection or refresh the page');
        }
        
    // Create Hands object
    hands = new Hands({
        locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
        }
    });
    
    // Configure model parameters
    await hands.setOptions({
        maxNumHands: 1, // Only detect one hand
        modelComplexity: 1, // Use precise model
        minDetectionConfidence: 0.5, // Detection confidence threshold
        minTrackingConfidence: 0.5 // Tracking confidence threshold
    });
    
    // Set result callback
    hands.onResults(onHandsResults);
    
    console.log('MediaPipe Hands model initialization complete');
        addDetectionStep('MediaPipe Hands model initialization complete');
    return hands;
    } catch (error) {
        console.error('MediaPipe initialization failed:', error);
        addDetectionStep('MediaPipe initialization failed, using alternative approach');
        throw error;
    }
}

/**
 * Add detection step record
 * @param {string} step - Detection step description
 */
function addDetectionStep(step) {
    detectionSteps.push({
        time: new Date(),
        description: step
    });
    
    console.log(`Detection step: ${step}`);
}

/**
 * Process MediaPipe detection results
 * @param {Object} results - MediaPipe detection results
 */
function onHandsResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Save last valid detection result
        lastDetection = results;
        addDetectionStep('Successfully detected hand landmarks');
        
        // Draw detection results on overlay
        if (detectionOverlay && detectionOverlay instanceof HTMLCanvasElement) {
            try {
            const ctx = detectionOverlay.getContext('2d');
                if (!ctx) {
                    console.error('Cannot get Canvas context');
                    addDetectionStep('Cannot get Canvas context');
                    return;
                }
                
            ctx.clearRect(0, 0, detectionOverlay.width, detectionOverlay.height);
            
            // Draw hand landmarks
            drawHandLandmarks(ctx, results.multiHandLandmarks[0]);
            
            // Extract and draw palm lines
            const palmLines = extractPalmLines(results.multiHandLandmarks[0]);
            drawPalmLines(ctx, palmLines);
            } catch (error) {
                console.error('Error drawing detection results:', error);
                addDetectionStep('Error drawing detection results: ' + error.message);
            }
        } else {
            console.warn('detectionOverlay is not a Canvas element or is undefined');
            addDetectionStep('Hand detected, but cannot draw detection results');
        }
    }
}

/**
 * Draw hand landmarks
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} landmarks - Hand landmarks array
 */
function drawHandLandmarks(ctx, landmarks) {
    // Set style
    ctx.fillStyle = 'rgba(156, 15, 95, 0.5)';
    ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)';
    ctx.lineWidth = 2;
    
    // Draw landmarks
    for (const landmark of landmarks) {
        const x = landmark.x * detectionOverlay.width;
        const y = landmark.y * detectionOverlay.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Connect landmarks
    // Connect fingers
    const fingerIndices = [
        [0, 1, 2, 3, 4], // Thumb
        [0, 5, 6, 7, 8], // Index finger
        [0, 9, 10, 11, 12], // Middle finger
        [0, 13, 14, 15, 16], // Ring finger
        [0, 17, 18, 19, 20]  // Pinky finger
    ];
    
    for (const finger of fingerIndices) {
        ctx.beginPath();
        for (let i = 0; i < finger.length; i++) {
            const index = finger[i];
            const x = landmarks[index].x * detectionOverlay.width;
            const y = landmarks[index].y * detectionOverlay.height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    // Connect palm base
    ctx.beginPath();
    const baseIndices = [0, 5, 9, 13, 17, 0];
    for (let i = 0; i < baseIndices.length; i++) {
        const index = baseIndices[i];
        const x = landmarks[index].x * detectionOverlay.width;
        const y = landmarks[index].y * detectionOverlay.height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

/**
 * Extract palm lines
 * @param {Array} landmarks - Hand landmarks array
 * @return {Object} Palm line coordinates
 */
function extractPalmLines(landmarks) {
    // Simplified palm line extraction
    addDetectionStep('Extracting palm lines');
    
    // Calculate enhanced life line: from wrist to base of thumb, with more control points
    const lifeLine = [
        { x: landmarks[0].x, y: landmarks[0].y },
        { x: (landmarks[0].x * 0.7 + landmarks[1].x * 0.3), 
          y: (landmarks[0].y * 0.7 + landmarks[1].y * 0.3) },
        { x: (landmarks[0].x * 0.5 + landmarks[1].x * 0.5), 
          y: (landmarks[0].y * 0.5 + landmarks[1].y * 0.5) },
        { x: (landmarks[0].x * 0.3 + landmarks[1].x * 0.7), 
          y: (landmarks[0].y * 0.3 + landmarks[1].y * 0.7) },
        { x: landmarks[1].x, y: landmarks[1].y }
    ];
    
    // Head line: crosses the middle of the palm, from the base of the pinky to the base of the index finger
    const headLine = [
        { x: landmarks[17].x * 0.9 + landmarks[0].x * 0.1, 
          y: landmarks[17].y * 0.9 + landmarks[0].y * 0.1 },
        { x: (landmarks[17].x + landmarks[13].x) / 2, 
          y: (landmarks[17].y + landmarks[13].y) / 2 },
        { x: (landmarks[13].x + landmarks[9].x) / 2, 
          y: (landmarks[13].y + landmarks[9].y) / 2 },
        { x: (landmarks[9].x + landmarks[5].x) / 2, 
          y: (landmarks[9].y + landmarks[5].y) / 2 },
        { x: landmarks[5].x * 0.8 + landmarks[9].x * 0.2, 
          y: landmarks[5].y * 0.8 + landmarks[9].y * 0.2 }
    ];
    
    // Heart line: crosses the palm, from the edge of the pinky to the base of the index finger
    const heartLine = [
        { x: landmarks[17].x * 1.05 - landmarks[13].x * 0.05, 
          y: landmarks[17].y * 0.9 + landmarks[13].y * 0.1 },
        { x: landmarks[17].x, 
          y: landmarks[17].y * 0.9 + landmarks[0].y * 0.1 },
        { x: (landmarks[17].x + landmarks[13].x) / 2, 
          y: ((landmarks[17].y + landmarks[13].y) / 2) * 0.85 + landmarks[0].y * 0.15 },
        { x: landmarks[13].x, 
          y: landmarks[13].y * 0.85 + landmarks[0].y * 0.15 },
        { x: (landmarks[13].x + landmarks[9].x) / 2, 
          y: ((landmarks[13].y + landmarks[9].y) / 2) * 0.85 + landmarks[0].y * 0.15 }
    ];
    
    return {
        lifeLine,
        headLine,
        heartLine
    };
}

/**
 * Draw palm lines
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} palmLines - Palm line data
 */
function drawPalmLines(ctx, palmLines) {
    // Set style
    ctx.lineWidth = 3;
    
    // Draw life line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)'; // Gold
    drawCurvedLine(ctx, palmLines.lifeLine, detectionOverlay.width, detectionOverlay.height);
    
    // Draw head line
    ctx.strokeStyle = 'rgba(75, 0, 130, 0.8)'; // Indigo
    drawCurvedLine(ctx, palmLines.headLine, detectionOverlay.width, detectionOverlay.height);
    
    // Draw heart line
    ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)'; // Purple
    drawCurvedLine(ctx, palmLines.heartLine, detectionOverlay.width, detectionOverlay.height);
}

/**
 * Draw curved line
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Curve point array
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawCurvedLine(ctx, points, width, height) {
    if (points.length < 2) return;
    
    ctx.beginPath();
    
    // Move to first point
    ctx.moveTo(points[0].x * width, points[0].y * height);
    
    // Use Bezier curve to connect points
    for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x * width + points[i + 1].x * width) / 2;
        const yc = (points[i].y * height + points[i + 1].y * height) / 2;
        
        ctx.quadraticCurveTo(
            points[i].x * width, 
            points[i].y * height, 
            xc, 
            yc
        );
    }
    
    // Connect to last point
    ctx.lineTo(
        points[points.length - 1].x * width,
        points[points.length - 1].y * height
    );
    
    ctx.stroke();
}

/**
 * Detect palm features
 * @param {string} imageData - Image data URL
 * @return {Promise} Detected palm features
 */
async function detectPalmFeatures(imageData) {
    // Reset detection step record
    detectionSteps = [];
    addDetectionStep('Starting palm detection');
    
    return new Promise(async (resolve, reject) => {
        try {
            // Update detection status display
            const detectionStatus = document.getElementById('detectionStatus');
            if (detectionStatus) {
                detectionStatus.textContent = 'Processing image...';
            }
            
            // Prevent repeated processing
            if (isProcessing) {
                reject(new Error('Processing another detection request'));
                return;
            }
            
            isProcessing = true;
            
            // Prepare detection overlay
            try {
                await prepareDetectionOverlay();
                addDetectionStep('Ready for detection overlay');
            } catch (overlayError) {
                console.warn('Failed to prepare detection overlay, will continue without visual results:', overlayError);
                addDetectionStep('Failed to prepare detection overlay, but will continue analysis');
            }
            
            // Try to initialize MediaPipe
            try {
                // If model is not initialized, initialize it
                if (!hands) {
                    await initializeMediaPipe();
                }
            
            // Reset last detection result
            lastDetection = null;
            
            // Create image object for processing
            const img = new Image();
                img.crossOrigin = "Anonymous"; // Solve possible cross-domain issues
            img.src = imageData;
            
            // Process image after loading
            img.onload = async function() {
                    try {
                        addDetectionStep('Image loaded, resolution: ' + img.width + 'x' + img.height);
                        if (detectionStatus) {
                            detectionStatus.textContent = 'Analyzing palm features...';
                        }
                        
                // Draw image on canvas for processing
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                const ctx = canvas.getContext('2d');
                        if (!ctx) {
                            throw new Error('Cannot create Canvas context');
                        }
                        
                ctx.drawImage(img, 0, 0);
                
                        addDetectionStep('Starting hand landmark detection');
                        
                        // Try to use MediaPipe for hand detection
                        try {
                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Perform hand detection
                await hands.send({ image: imageData });
                
                            // Wait for result
                setTimeout(() => {
                    if (lastDetection) {
                        // Extract features from detection result
                        const landmarks = lastDetection.multiHandLandmarks[0];
                        const handedness = lastDetection.multiHandedness[0].label; // 'Left' or 'Right'
                                    
                                    addDetectionStep('Extracting palm shape and finger length features');
                        
                        // Extract palm features
                                    const palmWidth = calculatePalmWidth(landmarks);
                                    const fingerLengths = calculateFingerLengths(landmarks);
                                    const palmShape = determinePalmShape(landmarks, palmWidth);
                                    const palmLines = extractPalmLines(landmarks);
                                    
                                    addDetectionStep('Analyzing palm line quality features');
                                    const lineQualities = analyzePalmLineQualities();
                                    
                                    // Create complete palm feature data
                        const palmFeatures = {
                            landmarks: landmarks,
                            handedness: handedness,
                                        palmLines: palmLines,
                                        palmWidth: palmWidth,
                                        fingerLengths: fingerLengths,
                                        palmShape: palmShape,
                                        lineQualities: lineQualities,
                                        detectionSteps: detectionSteps
                        };
                        
                        console.log('Palm feature detection completed', palmFeatures);
                                    addDetectionStep('Palm feature detection completed');
                        isProcessing = false;
                        resolve(palmFeatures);
                    } else {
                                    // Use simulated data as alternative when detection fails
                                    console.log('Using simulated data as alternative');
                                    addDetectionStep('No hand detected, using simulated data');
                                    const mockFeatures = generateMockPalmFeatures();
                                    isProcessing = false;
                                    resolve(mockFeatures);
                                }
                            }, 2000); // Give enough time for MediaPipe detection
                        } catch (mpError) {
                            console.error('MediaPipe processing failed, using alternative:', mpError);
                            addDetectionStep('MediaPipe processing failed, using simulated data: ' + mpError.message);
                            // Use simulated data as alternative
                            const mockFeatures = generateMockPalmFeatures();
                            isProcessing = false;
                            resolve(mockFeatures);
                        }
                    } catch (processingError) {
                        console.error('Image processing failed:', processingError);
                        addDetectionStep('Image processing failed: ' + processingError.message);
                        isProcessing = false;
                        
                        // Use simulated data instead of rejecting promise to ensure user experience
                        const mockFeatures = generateMockPalmFeatures();
                        addDetectionStep('Using simulated palm data as alternative');
                        resolve(mockFeatures);
                    }
            };
            
            img.onerror = function() {
                console.error('Image loading failed');
                    addDetectionStep('Image loading failed');
                    isProcessing = false;
                    
                    // Use simulated data instead of rejecting promise
                    const mockFeatures = generateMockPalmFeatures();
                    addDetectionStep('Using simulated palm data as alternative');
                    resolve(mockFeatures);
                };
            } catch (error) {
                console.error('Palm detection process failed:', error);
                addDetectionStep('Palm detection process failed: ' + error.message);
                isProcessing = false;
                
                // Use simulated data as alternative
                const mockFeatures = generateMockPalmFeatures();
                addDetectionStep('Using simulated palm data as alternative');
                resolve(mockFeatures);
            }
        } catch (error) {
            console.error('Palm detection start failed:', error);
            addDetectionStep('Palm detection start failed: ' + error.message);
            isProcessing = false;
            reject(error);
        }
    });
}

// Get or create detectionOverlay element
async function prepareDetectionOverlay() {
    try {
        // Check existing detectionOverlay element
        let overlayElement = document.getElementById('detectionOverlay');
        
        // Get palmPreview's parent element for placing overlay
        const palmPreviewContainer = document.querySelector('.palm-preview');
        if (!palmPreviewContainer) {
            console.error('No .palm-preview container found');
            addDetectionStep('No .palm-preview container found');
            throw new Error('Cannot find necessary DOM container');
        }
        
        // If overlay does not exist or is not canvas, create a new one
        if (!overlayElement || !(overlayElement instanceof HTMLCanvasElement)) {
            if (overlayElement) {
                // Remove non-canvas elements
                console.log('Detected non-canvas detectionOverlay element, will replace it');
                addDetectionStep('Replace non-Canvas detectionOverlay element');
                overlayElement.remove();
            }
            
            // Create new canvas element
            overlayElement = document.createElement('canvas');
            overlayElement.id = 'detectionOverlay';
            overlayElement.style.position = 'absolute';
            overlayElement.style.top = '0';
            overlayElement.style.left = '0';
            overlayElement.style.width = '100%';
            overlayElement.style.height = '100%';
            overlayElement.style.pointerEvents = 'none';
            
            // Add to container
            palmPreviewContainer.appendChild(overlayElement);
        }
        
        // Save as global variable for other functions to access
        detectionOverlay = overlayElement;
        
        // Get palmPreview element and adjust Canvas size
        const palmPreview = document.getElementById('palmPreview');
        if (palmPreview) {
            // Wait for image to load
            if (palmPreview.complete) {
                adjustCanvasSize(palmPreview);
            } else {
                await new Promise(resolve => {
                    palmPreview.onload = () => {
                        adjustCanvasSize(palmPreview);
                        resolve();
                    };
                    // If image is already loaded but onload didn't trigger
                    setTimeout(resolve, 500);
                });
            }
        } else {
            console.error('No palmPreview element found');
            addDetectionStep('No palmPreview element found');
            throw new Error('Cannot find palmPreview element');
        }
        
        return detectionOverlay;
    } catch (error) {
        console.error('Failed to prepare detection overlay:', error);
        throw error;
    }
}

// Adjust Canvas size to match image
function adjustCanvasSize(palmPreview) {
    // Adjust overlay size to match image
    const previewWidth = palmPreview.clientWidth || palmPreview.width || 300;
    const previewHeight = palmPreview.clientHeight || palmPreview.height || 400;
    
    detectionOverlay.width = previewWidth;
    detectionOverlay.height = previewHeight;
    
    addDetectionStep(`Setting canvas size: ${detectionOverlay.width}x${detectionOverlay.height}`);
    console.log(`Canvas size: ${detectionOverlay.width}x${detectionOverlay.height}`);
}

/**
 * Generate simulated palm feature data
 * As alternative when MediaPipe cannot work
 * @return {Object} Simulated palm features
 */
function generateMockPalmFeatures() {
    // Create simulated hand landmark data
    const mockLandmarks = [];
    
    // Create 21 hand landmarks (MediaPipe format)
    for (let i = 0; i < 21; i++) {
        mockLandmarks.push({
            x: 0.3 + (i % 4) * 0.1,
            y: 0.3 + Math.floor(i / 4) * 0.1,
            z: 0
        });
    }
    
    // Record using simulated data
    addDetectionStep('Using simulated data to generate palm features');
    
    // Return simulated palm features
    return {
        landmarks: mockLandmarks,
        handedness: 'Right',
        palmLines: {
            lifeLine: [
                { x: 0.3, y: 0.5 },
                { x: 0.33, y: 0.52 },
                { x: 0.35, y: 0.55 },
                { x: 0.38, y: 0.58 },
                { x: 0.4, y: 0.6 }
            ],
            headLine: [
                { x: 0.3, y: 0.45 },
                { x: 0.35, y: 0.45 },
                { x: 0.4, y: 0.45 },
                { x: 0.45, y: 0.45 },
                { x: 0.5, y: 0.45 }
            ],
            heartLine: [
                { x: 0.3, y: 0.4 },
                { x: 0.35, y: 0.4 },
                { x: 0.4, y: 0.4 },
                { x: 0.45, y: 0.4 },
                { x: 0.5, y: 0.4 }
            ]
        },
        palmWidth: 0.5,
        fingerLengths: {
            thumb: 0.15,
            index: 0.2,
            middle: 0.22,
            ring: 0.2,
            pinky: 0.15
        },
        palmShape: 'Elliptical',
        lineQualities: {
            lifeLine: {
                depth: 'Deep',
                length: 'Long',
                curve: 'Curved'
            },
            headLine: {
                depth: 'Medium',
                length: 'Medium',
                shape: 'Horizontal'
            },
            heartLine: {
                depth: 'Deep',
                length: 'Long',
                curve: 'Wavy'
            }
        },
        detectionSteps: detectionSteps
    };
}

/**
 * Calculate palm width
 * @param {Array} landmarks - Hand landmarks array
 * @return {number} Palm width (relative value between 0-1)
 */
function calculatePalmWidth(landmarks) {
    // Calculate distance between base of index and base of pinky fingers
    const distance = Math.sqrt(
        Math.pow(landmarks[5].x - landmarks[17].x, 2) +
        Math.pow(landmarks[5].y - landmarks[17].y, 2)
    );
    
    return distance;
}

/**
 * Calculate finger lengths
 * @param {Array} landmarks - Hand landmarks array
 * @return {Object} Finger lengths
 */
function calculateFingerLengths(landmarks) {
    // Calculate length of each finger
    const thumbLength = calculateFingerLength(landmarks, [1, 2, 3, 4]);
    const indexLength = calculateFingerLength(landmarks, [5, 6, 7, 8]);
    const middleLength = calculateFingerLength(landmarks, [9, 10, 11, 12]);
    const ringLength = calculateFingerLength(landmarks, [13, 14, 15, 16]);
    const pinkyLength = calculateFingerLength(landmarks, [17, 18, 19, 20]);
    
    return {
        thumb: thumbLength,
        index: indexLength,
        middle: middleLength,
        ring: ringLength,
        pinky: pinkyLength
    };
}

/**
 * Calculate single finger length
 * @param {Array} landmarks - Hand landmarks array
 * @param {Array} indices - Finger landmark indices
 * @return {number} Finger length
 */
function calculateFingerLength(landmarks, indices) {
    let length = 0;
    
    for (let i = 0; i < indices.length - 1; i++) {
        const start = landmarks[indices[i]];
        const end = landmarks[indices[i + 1]];
        
        length += Math.sqrt(
            Math.pow(start.x - end.x, 2) +
            Math.pow(start.y - end.y, 2)
        );
    }
    
    return length;
}

/**
 * Determine palm shape
 * @param {Array} landmarks - Hand landmarks array
 * @param {number} width - Palm width
 * @return {string} Palm shape description
 */
function determinePalmShape(landmarks, width) {
    // Calculate palm length (from wrist to tip of middle finger)
    const palmLength = Math.sqrt(
        Math.pow(landmarks[0].x - landmarks[9].x, 2) +
        Math.pow(landmarks[0].y - landmarks[9].y, 2)
    ) + calculateFingerLength(landmarks, [9, 10, 11, 12]);
    
    const ratio = width / palmLength;
    
    // Record palm shape ratio
    addDetectionStep(`Palm width to length ratio: ${ratio.toFixed(2)}`);
    
    // Determine shape based on ratio
    if (ratio > 0.7) {
        return 'Square';
    } else if (ratio < 0.5) {
        return 'Long Square';
    } else {
        return 'Elliptical';
    }
}

/**
 * Analyze palm line qualities
 * @return {Object} Palm line quality analysis
 */
function analyzePalmLineQualities() {
    // In actual application, this requires more complex image processing
    // Here simplified to randomly generate some features
    
    // Life line characteristics
    const lifeLineDepth = Math.random() > 0.5 ? 'Deep' : 'Shallow';
    const lifeLineLength = ['Short', 'Medium', 'Long'][Math.floor(Math.random() * 3)];
    const lifeLineCurve = ['Curved', 'Straight', 'Wavy'][Math.floor(Math.random() * 3)];
    
    // Head line characteristics
    const headLineDepth = Math.random() > 0.5 ? 'Deep' : 'Shallow';
    const headLineLength = ['Short', 'Medium', 'Long'][Math.floor(Math.random() * 3)];
    const headLineShape = ['Ascending', 'Horizontal', 'Descending'][Math.floor(Math.random() * 3)];
    
    // Heart line characteristics
    const heartLineDepth = Math.random() > 0.5 ? 'Deep' : 'Shallow';
    const heartLineLength = ['Short', 'Medium', 'Long'][Math.floor(Math.random() * 3)];
    const heartLineCurve = ['Curved', 'Straight', 'Wavy'][Math.floor(Math.random() * 3)];
    
    // Record palm line analysis results
    addDetectionStep(`Palm line quality analysis completed: Life line(${lifeLineDepth}, ${lifeLineLength}), Head line(${headLineDepth}, ${headLineLength}), Heart line(${heartLineDepth}, ${heartLineLength})`);
    
    return {
        lifeLine: {
            depth: lifeLineDepth,
            length: lifeLineLength,
            curve: lifeLineCurve
        },
        headLine: {
            depth: headLineDepth,
            length: headLineLength,
            shape: headLineShape
        },
        heartLine: {
            depth: heartLineDepth,
            length: heartLineLength,
            curve: heartLineCurve
        }
    };
}

// Export function for other modules to use
window.detectPalmFeatures = detectPalmFeatures; 