/**
 * Palm Destiny Analysis - Results Generator Main Module
 * Generate and display palm analysis results
 */

// Module-level variables
let generateCareerReading;
let generateWealthReading;
let generateHealthReading;
let generateLoveReading;
let generateSocialReading;
let generateWisdomReading;
let generatePotentialReading;
let displayAnalysisResults;

// Initialize functionality, try to load modules
function initResultGenerator() {
    try {
        // Try to load functions from modules
        // If modules can't be loaded, use mock data
        if (typeof window.resultModules !== 'undefined') {
            generateCareerReading = window.resultModules.generateCareerReading;
            generateWealthReading = window.resultModules.generateWealthReading;
            generateHealthReading = window.resultModules.generateHealthReading;
            generateLoveReading = window.resultModules.generateLoveReading;
            generateSocialReading = window.resultModules.generateSocialReading;
            generateWisdomReading = window.resultModules.generateWisdomReading;
            generatePotentialReading = window.resultModules.generatePotentialReading;
            displayAnalysisResults = window.resultModules.displayAnalysisResults;
        } else {
            // Use mock functionality
            console.log('Using built-in destiny interpretation generator');
            setupMockFunctions();
        }
    } catch (error) {
        console.error('Results generator initialization failed, using alternative:', error);
        setupMockFunctions();
    }
}

/**
 * Set up mock functions as alternatives
 */
function setupMockFunctions() {
    // Simple generator functions as alternatives
    generateCareerReading = function() {
        return "Your palm lines show that you will have stable career development, leadership abilities, and are suitable for management and organizational work.";
    };
    
    generateWealthReading = function() {
        return "Your wealth line shows good financial status, but you need to pay attention to savings and investments.";
    };
    
    generateHealthReading = function() {
        return "Your overall health condition is stable, but you should pay attention to proper rest and maintain a balanced lifestyle.";
    };
    
    generateLoveReading = function() {
        return "In relationships, you value sincerity and loyalty, and will meet a partner who shares your values.";
    };
    
    generateSocialReading = function() {
        return "You have good social skills, easily connect with people, and have a stable and reliable circle of friends.";
    };
    
    generateWisdomReading = function() {
        return "Your thinking is flexible and profound, with strong learning abilities and creativity.";
    };
    
    generatePotentialReading = function() {
        return "You have great development potential, especially in creativity and interpersonal relationships, with a promising future.";
    };
    
    // Function to display analysis results
    displayAnalysisResults = function(results) {
        console.log('Displaying analysis results', results);
        
        // Get original feature data
        const features = results.originalFeatures || {
            palmShape: 'Oval',
            palmWidth: 0.5,
            fingerLengths: {
                thumb: 0.15,
                index: 0.2,
                middle: 0.22,
                ring: 0.2,
                pinky: 0.15
            },
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
            palmLines: {
                lifeLine: [
                    { x: 0.3, y: 0.5 },
                    { x: 0.35, y: 0.55 },
                    { x: 0.4, y: 0.6 }
                ],
                headLine: [
                    { x: 0.35, y: 0.45 },
                    { x: 0.4, y: 0.45 },
                    { x: 0.45, y: 0.45 }
                ],
                heartLine: [
                    { x: 0.35, y: 0.4 },
                    { x: 0.4, y: 0.4 },
                    { x: 0.45, y: 0.4 }
                ]
            }
        };
        
        // Update key findings
        const keyFindingsList = document.getElementById('keyFindingsList');
        if (keyFindingsList) {
            keyFindingsList.innerHTML = '';
            
            // Add some mock key findings
            const findings = [
                'Your life line is long and clear, indicating good health',
                'Head line shows creative thinking and good analytical skills',
                'Heart line indicates you are open and sincere in emotions',
                'Finger ratio indicates balanced ability development'
            ];
            
            findings.forEach(finding => {
                const li = document.createElement('li');
                li.textContent = finding;
                keyFindingsList.appendChild(li);
            });
        }
        
        // Update analysis text
        document.getElementById('lifeLineAnalysis').textContent = generateHealthReading();
        document.getElementById('headLineAnalysis').textContent = generateWisdomReading();
        document.getElementById('heartLineAnalysis').textContent = generateLoveReading();
        
        // Update destiny overview
        const destinyAreas = [
            { id: 'careerDestiny', content: generateCareerReading() },
            { id: 'wealthDestiny', content: generateWealthReading() },
            { id: 'healthDestiny', content: generateHealthReading() },
            { id: 'loveDestiny', content: generateLoveReading() },
            { id: 'socialDestiny', content: generateSocialReading() },
            { id: 'wisdomDestiny', content: generateWisdomReading() },
            { id: 'potentialDestiny', content: generatePotentialReading() }
        ];
        
        destinyAreas.forEach(area => {
            const destinyCard = document.getElementById(area.id);
            if (destinyCard) {
                const destinyContent = destinyCard.querySelector('.destiny-content');
                if (destinyContent) {
                    destinyContent.textContent = area.content;
                }
                
                // Set styles directly, not dependent on animation classes
                destinyCard.style.opacity = '1';
                destinyCard.style.transform = 'none';
                
                // Add card-reveal class, but won't cause problems when saving images
                if (!destinyCard.classList.contains('card-reveal')) {
                    destinyCard.classList.add('card-reveal');
                }
            }
        });
        
        // Update analyzed image
        const analyzedPalmImage = document.getElementById('analyzedPalmImage');
        const palmPreview = document.getElementById('palmPreview');
        if (analyzedPalmImage && palmPreview) {
            analyzedPalmImage.src = palmPreview.src;
        }
        
        // Update analysis process information
        updateAnalysisProcessInfo(features);
    };
}

/**
 * Update analysis process information
 * @param {Object} features - Palm features
 */
function updateAnalysisProcessInfo(features) {
    // 1. Update analysis steps
    const detectionSteps = document.getElementById('detectionSteps');
    if (detectionSteps) {
        detectionSteps.innerHTML = '';
        
        // Use steps recorded during the actual detection process
        const steps = features.detectionSteps || [
            'Image Preprocessing: Adjust brightness and contrast to enhance palm line clarity',
            'Hand Detection: Use MediaPipe to identify palm area and 21 key points',
            'Palm Line Extraction: Analyze and identify life line, head line, and heart line',
            'Feature Calculation: Measure palm shape, finger length ratio, and palm line features',
            'Data Analysis: Interpret features based on traditional palmistry knowledge',
            'Results Generation: Create personalized destiny reading based on analysis results'
        ];
        
        // If actual step records exist, use them
        if (features.detectionSteps && features.detectionSteps.length > 0) {
            features.detectionSteps.forEach(stepData => {
                const li = document.createElement('li');
                li.textContent = stepData.description;
                detectionSteps.appendChild(li);
            });
        } else {
            // Otherwise use default steps
            steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                detectionSteps.appendChild(li);
            });
        }
    }
    
    // 2. Update palm shape information
    const palmShapeValue = document.getElementById('palmShapeValue');
    const palmShapeDesc = document.getElementById('palmShapeDesc');
    
    if (palmShapeValue && palmShapeDesc) {
        const palmShape = features.palmShape || 'Oval';
        palmShapeValue.textContent = palmShape;
        
        // Provide description based on palm shape
        let description = '';
        switch (palmShape) {
            case 'Square':
                description = 'Indicates practicality and organization, with analytical abilities and firm determination.';
                break;
            case 'Rectangular':
                description = 'Indicates sensitivity, imagination, quick thinking, and often interest in arts.';
                break;
            case 'Conical':
                description = 'Indicates strong intuition, keen observation, rich emotions, and creativity.';
                break;
            case 'Oval':
            default:
                description = 'Indicates a balanced personality, strong adaptability, good communication, and understanding.';
                break;
        }
        
        palmShapeDesc.textContent = description;
    }
    
    // 3. Update finger length ratio information
    const fingerRatiosValue = document.getElementById('fingerRatiosValue');
    const fingerRatiosDesc = document.getElementById('fingerRatiosDesc');
    
    if (fingerRatiosValue && fingerRatiosDesc && features.fingerLengths) {
        // Create finger length ratio display
        const formattedRatios = `Thumb:${(features.fingerLengths.thumb * 100).toFixed(1)}%, ` +
                               `Index:${(features.fingerLengths.index * 100).toFixed(1)}%, ` +
                               `Middle:${(features.fingerLengths.middle * 100).toFixed(1)}%, ` +
                               `Ring:${(features.fingerLengths.ring * 100).toFixed(1)}%, ` +
                               `Pinky:${(features.fingerLengths.pinky * 100).toFixed(1)}%`;
        
        fingerRatiosValue.textContent = formattedRatios;
        
        // Provide description
        let dominant = '';
        const max = Math.max(
            features.fingerLengths.thumb,
            features.fingerLengths.index,
            features.fingerLengths.middle,
            features.fingerLengths.ring,
            features.fingerLengths.pinky
        );
        
        if (max === features.fingerLengths.thumb) dominant = 'Thumb';
        else if (max === features.fingerLengths.index) dominant = 'Index';
        else if (max === features.fingerLengths.middle) dominant = 'Middle';
        else if (max === features.fingerLengths.ring) dominant = 'Ring';
        else dominant = 'Pinky';
        
        fingerRatiosDesc.textContent = `Your ${dominant} finger is more prominent, ` + 
                                      determineFingerRatioMeaning(dominant);
    }
    
    // 4. Update palm line depth, length, and shape information
    if (features.lineQualities) {
        // Palm line depth
        updateLineQuality('lifeLineDepth', features.lineQualities.lifeLine?.depth || 'Medium');
        updateLineQuality('headLineDepth', features.lineQualities.headLine?.depth || 'Medium');
        updateLineQuality('heartLineDepth', features.lineQualities.heartLine?.depth || 'Medium');
        
        // Palm line length
        updateLineQuality('lifeLineLength', features.lineQualities.lifeLine?.length || 'Medium');
        updateLineQuality('headLineLength', features.lineQualities.headLine?.length || 'Medium');
        updateLineQuality('heartLineLength', features.lineQualities.heartLine?.length || 'Medium');
        
        // Palm line shape
        updateLineQuality('lifeLineShape', features.lineQualities.lifeLine?.curve || 'Curved');
        updateLineQuality('headLineShape', features.lineQualities.headLine?.shape || 'Horizontal');
        updateLineQuality('heartLineShape', features.lineQualities.heartLine?.curve || 'Wavy');
    }
    
    // 5. Update marked palm image
    const markedPalmImage = document.getElementById('markedPalmImage');
    const palmPreview = document.getElementById('palmPreview');
    if (markedPalmImage && palmPreview) {
        markedPalmImage.src = palmPreview.src;
        
        // Draw palm lines on Canvas
        const palmLinesCanvas = document.getElementById('palmLinesCanvas');
        if (palmLinesCanvas && features.palmLines) {
            markPalmLines(features);
        }
    }
}

/**
 * Update palm line quality display
 * @param {string} elementId - Element ID
 * @param {string} value - Feature value
 */
function updateLineQuality(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Add different CSS classes for different qualities
        element.className = ''; // Clear existing classes
        element.textContent = value;
        
        // Add CSS classes based on value
        if (value.includes('Deep') || value.includes('Long') || 
            value.includes('Curved') || value.includes('Wavy')) {
            element.classList.add('high-quality');
        } else if (value.includes('Shallow') || value.includes('Short') || 
                  value.includes('Straight') || value.includes('Broken')) {
            element.classList.add('low-quality');
        } else {
            element.classList.add('medium-quality');
        }
    }
}

/**
 * Determine meaning based on prominent finger
 * @param {string} finger - Finger name
 * @return {string} Meaning description
 */
function determineFingerRatioMeaning(finger) {
    switch (finger) {
        case 'Thumb':
            return 'indicates strong willpower and outstanding leadership ability.';
        case 'Index':
            return 'indicates a sense of authority, strong decision-making ability, suitable for management roles.';
        case 'Middle':
            return 'indicates strong sense of responsibility, emphasis on balance and justice.';
        case 'Ring':
            return 'indicates strong artistic perception and unique insight into beauty.';
        case 'Pinky':
            return 'indicates excellent communication skills, strong social and expression abilities.';
        default:
            return 'indicates balanced development in all aspects.';
    }
}

/**
 * Mark palm lines on palm image
 * @param {Object} features - Palm features
 */
function markPalmLines(features) {
    try {
        // Get palm image and canvas
        const markedPalmImage = document.getElementById('markedPalmImage');
        const palmLinesCanvas = document.getElementById('palmLinesCanvas');
        const resultImageContainer = document.querySelector('.palm-image-container');
        
        if (!markedPalmImage || !palmLinesCanvas || !resultImageContainer) {
            console.error('Cannot find palm image or canvas elements');
            return;
        }
        
        // Set image source (use previously analyzed image)
        const palmPreview = document.getElementById('palmPreview');
        if (palmPreview && palmPreview.src) {
            markedPalmImage.src = palmPreview.src;
        }
        
        // Ensure canvas container uses relative positioning so absolutely positioned canvas overlays the image
        resultImageContainer.style.position = 'relative';
        resultImageContainer.style.overflow = 'hidden';
        
        // 配置掌纹线画布
        palmLinesCanvas.style.position = 'absolute';
        palmLinesCanvas.style.top = '0';
        palmLinesCanvas.style.left = '0';
        palmLinesCanvas.style.width = '100%';
        palmLinesCanvas.style.height = '100%';
        palmLinesCanvas.style.pointerEvents = 'none';
        
        // 创建绘制函数
        const drawOnCanvas = () => {
            try {
                // 确保容器和图像已经渲染完成
                setTimeout(() => {
                    try {
                        // 获取图像容器的尺寸
                        const containerWidth = resultImageContainer.clientWidth;
                        const containerHeight = resultImageContainer.clientHeight;
                        
                        // 如果容器尺寸为0，再次延迟尝试
                        if (containerWidth === 0 || containerHeight === 0) {
                            console.log('容器尺寸为0，等待100ms后重试');
                            setTimeout(drawOnCanvas, 100);
                            return;
                        }
                        
                        // 获取图像的自然尺寸
                        const naturalWidth = markedPalmImage.naturalWidth || 400;
                        const naturalHeight = markedPalmImage.naturalHeight || 600;
                        
                        // 获取图像的实际显示尺寸
                        const displayWidth = markedPalmImage.clientWidth || containerWidth;
                        const displayHeight = markedPalmImage.clientHeight || containerHeight;
                        
                        console.log(`分析过程图像尺寸 - 容器: ${containerWidth}x${containerHeight}, 显示: ${displayWidth}x${displayHeight}, 原始: ${naturalWidth}x${naturalHeight}`);
                        
                        // 调整画布大小以匹配实际显示的图像尺寸
                        palmLinesCanvas.width = displayWidth;
                        palmLinesCanvas.height = displayHeight;
                        
                        const ctx = palmLinesCanvas.getContext('2d');
                        if (!ctx) {
                            console.error('无法获取画布上下文');
                            return;
                        }
                        
                        ctx.clearRect(0, 0, palmLinesCanvas.width, palmLinesCanvas.height);
                        
                        // 检查是否有有效的手部关键点数据
                        const landmarks = features && features.landmarks;
                        const palmLines = features && features.palmLines;
                        
                        let isValidData = false;
                        
                        // 绘制手部关键点 (如果存在)
                        if (landmarks && Array.isArray(landmarks) && landmarks.length > 0) {
                            console.log(`绘制${landmarks.length}个手部关键点`);
                            drawHandLandmarks(ctx, landmarks, palmLinesCanvas.width, palmLinesCanvas.height);
                            isValidData = true;
                        } else {
                            console.warn('没有有效的手部关键点数据');
                        }
                        
                        // 掌纹线代码已禁用
                        console.log('掌纹线绘制功能已禁用');
                        
                        // 如果都没有有效数据，使用静态示例 - 也已禁用
                        if (!isValidData) {
                            console.warn('没有有效的掌纹特征数据，但静态示例绘制已禁用');
                            // drawExamplePalmLines(ctx, palmLinesCanvas.width, palmLinesCanvas.height);
                        }
                        
                        // 掌纹线图例绘制已禁用
                        console.log('掌纹线图例绘制已禁用');
                    } catch (error) {
                        console.error('绘制掌纹线过程中出错:', error);
                    }
                }, 50); // 短暂延迟确保DOM已更新
            } catch (error) {
                console.error('绘制掌纹线时出错:', error);
                // 静态示例绘制已禁用
                console.log('备用掌纹线绘制已禁用');
            }
        };
        
        // 当图片加载完成后绘制掌纹线
        if (markedPalmImage.complete) {
            console.log('分析过程图像已加载完成，直接绘制');
            drawOnCanvas();
        } else {
            console.log('分析过程图像尚未加载完成，等待加载后绘制');
            markedPalmImage.onload = drawOnCanvas;
        }
        
        // 添加图片加载错误处理
        markedPalmImage.onerror = function(error) {
            console.error('加载掌纹图像时出错:', error);
        };
    } catch (error) {
        console.error('标记掌纹线过程中出错:', error);
    }
}

/**
 * 绘制手部关键点
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {Array} landmarks - 手部关键点数组
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawHandLandmarks(ctx, landmarks, width, height) {
    try {
        // 验证参数
        if (!ctx) {
            console.error('绘制手部关键点的参数无效: ctx 为空');
            return;
        }
        
        if (!landmarks || !Array.isArray(landmarks)) {
            console.error('绘制手部关键点的参数无效: landmarks 不是数组');
            return;
        }
        
        if (!width || width <= 0) {
            console.error(`绘制手部关键点的参数无效: width=${width}`);
            width = ctx.canvas.width || 400;
            console.log(`使用画布宽度作为回退: ${width}`);
        }
        
        if (!height || height <= 0) {
            console.error(`绘制手部关键点的参数无效: height=${height}`);
            height = ctx.canvas.height || 600;
            console.log(`使用画布高度作为回退: ${height}`);
        }
        
        console.log('绘制手部关键点：使用Canvas坐标系，画布尺寸=', width, 'x', height);
        
        // 设置样式
        ctx.fillStyle = 'rgba(156, 15, 95, 0.6)';
        ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)';
        ctx.lineWidth = 2;
        
        // 检查landmarks的格式
        if (landmarks.length < 21) {
            console.warn(`手部关键点数据不完整: 只有${landmarks.length}/21个点，跳过绘制`);
            return;
        }
        
        // 验证每个关键点坐标的有效性
        const validLandmarks = landmarks.filter(landmark => 
            landmark && 
            typeof landmark.x === 'number' && 
            typeof landmark.y === 'number' && 
            !isNaN(landmark.x) && 
            !isNaN(landmark.y) &&
            landmark.x >= 0 && landmark.x <= 1 &&
            landmark.y >= 0 && landmark.y <= 1
        );
        
        if (validLandmarks.length < 21) {
            console.warn(`只有${validLandmarks.length}/21个有效关键点，可能导致绘制不完整`);
            
            // 如果有效点太少，直接返回
            if (validLandmarks.length < 15) {
                console.error('有效关键点数量少于15个，放弃绘制');
                return;
            }
        }
        
        // 获取画布对应图像的实际尺寸，用于坐标转换
        const canvasRect = ctx.canvas.getBoundingClientRect();
        const canvasAspectRatio = canvasRect.width / canvasRect.height;
        const imageAspectRatio = width / height;
        
        // 绘制关键点
        for (const landmark of validLandmarks) {
            let x = landmark.x * width; // 使用像素坐标
            let y = landmark.y * height;
            
            // 如果画布与原始图像比例不一致（通常是object-fit: cover导致），进行坐标调整
            if (Math.abs(canvasAspectRatio - imageAspectRatio) > 0.01) {
                // 根据object-fit: cover的行为调整坐标
                if (canvasAspectRatio > imageAspectRatio) {
                    // 宽度扩展，高度保持
                    const scaleFactor = canvasRect.width / width;
                    const offsetY = (height * scaleFactor - canvasRect.height) / 2 / scaleFactor;
                    y = (landmark.y * height) - offsetY;
                } else {
                    // 高度扩展，宽度保持
                    const scaleFactor = canvasRect.height / height;
                    const offsetX = (width * scaleFactor - canvasRect.width) / 2 / scaleFactor;
                    x = (landmark.x * width) - offsetX;
                }
            }
            
            // 确保坐标在画布范围内
            x = Math.max(0, Math.min(width, x));
            y = Math.max(0, Math.min(height, y));
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // 只有当有足够的关键点时才尝试连接
        if (validLandmarks.length >= 21) {
            // 连接手指
            drawConnectingLines(ctx, validLandmarks, width, height);
        } else {
            console.warn('有效关键点不足，跳过连接线绘制');
        }
    } catch (error) {
        console.error('绘制手部关键点时发生错误:', error);
    }
}

/**
 * 绘制手部关键点之间的连接线
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {Array} landmarks - 手部关键点数组
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawConnectingLines(ctx, landmarks, width, height) {
    try {
        // 连接手指
        const fingerIndices = [
            [0, 1, 2, 3, 4], // 拇指
            [0, 5, 6, 7, 8], // 食指
            [0, 9, 10, 11, 12], // 中指
            [0, 13, 14, 15, 16], // 无名指
            [0, 17, 18, 19, 20]  // 小指
        ];
        
        // 获取画布对应图像的实际尺寸，用于坐标转换
        const canvasRect = ctx.canvas.getBoundingClientRect();
        const canvasAspectRatio = canvasRect.width / canvasRect.height;
        const imageAspectRatio = width / height;
        
        // 转换坐标函数，处理object-fit: cover的情况
        const transformCoordinate = (landmark) => {
            let x = landmark.x * width;
            let y = landmark.y * height;
            
            // 如果画布与原始图像比例不一致（通常是object-fit: cover导致），进行坐标调整
            if (Math.abs(canvasAspectRatio - imageAspectRatio) > 0.01) {
                // 根据object-fit: cover的行为调整坐标
                if (canvasAspectRatio > imageAspectRatio) {
                    // 宽度扩展，高度保持
                    const scaleFactor = canvasRect.width / width;
                    const offsetY = (height * scaleFactor - canvasRect.height) / 2 / scaleFactor;
                    y = (landmark.y * height) - offsetY;
                } else {
                    // 高度扩展，宽度保持
                    const scaleFactor = canvasRect.height / height;
                    const offsetX = (width * scaleFactor - canvasRect.width) / 2 / scaleFactor;
                    x = (landmark.x * width) - offsetX;
                }
            }
            
            // 确保坐标在画布范围内
            x = Math.max(0, Math.min(width, x));
            y = Math.max(0, Math.min(height, y));
            
            return { x, y };
        };
        
        for (const finger of fingerIndices) {
            ctx.beginPath();
            for (let i = 0; i < finger.length; i++) {
                const index = finger[i];
                if (index >= landmarks.length) {
                    console.warn(`关键点索引 ${index} 超出范围`);
                    continue;
                }
                
                const point = transformCoordinate(landmarks[index]);
                
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
            ctx.stroke();
        }
        
        // 连接手掌底部
        ctx.beginPath();
        const baseIndices = [0, 5, 9, 13, 17, 0];
        for (let i = 0; i < baseIndices.length; i++) {
            const index = baseIndices[i];
            if (index >= landmarks.length) {
                console.warn(`关键点索引 ${index} 超出范围`);
                continue;
            }
            
            const point = transformCoordinate(landmarks[index]);
            
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
    } catch (error) {
        console.error('绘制连接线时发生错误:', error);
    }
}

/**
 * 绘制掌纹线
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {Object} palmLines - 掌纹线数据
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawPalmLines(ctx, palmLines, width, height) {
    // 不绘制掌纹线，直接返回
    console.log('掌纹线显示已禁用');
    return;
    
    // 以下代码不会执行
    try {
        // 检查参数有效性
        if (!ctx || !palmLines || !width || !height) {
            console.error('绘制掌纹线的参数无效');
            return;
        }
        
        console.log('绘制掌纹线：Canvas尺寸=', width, 'x', height);
        
        // 设置线宽
        ctx.lineWidth = 3;
        
        // 绘制生命线
        if (palmLines.lifeLine && palmLines.lifeLine.length >= 2) {
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)'; // 金色
            drawCurvedLine(ctx, palmLines.lifeLine, width, height);
        } else {
            console.warn('生命线数据无效，跳过绘制');
        }
        
        // 绘制智慧线
        if (palmLines.headLine && palmLines.headLine.length >= 2) {
            ctx.strokeStyle = 'rgba(75, 0, 130, 0.8)'; // 靛青色
            drawCurvedLine(ctx, palmLines.headLine, width, height);
        } else {
            console.warn('智慧线数据无效，跳过绘制');
        }
        
        // 绘制感情线
        if (palmLines.heartLine && palmLines.heartLine.length >= 2) {
            ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)'; // 紫红色
            drawCurvedLine(ctx, palmLines.heartLine, width, height);
        } else {
            console.warn('感情线数据无效，跳过绘制');
        }
    } catch (error) {
        console.error('绘制掌纹线时出错:', error);
        drawFallbackPalmLines(ctx, width, height);
    }
}

/**
 * 绘制备用掌纹线（当正常绘制失败时使用）
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawFallbackPalmLines(ctx, width, height) {
    // 不绘制备用掌纹线，直接返回
    console.log('备用掌纹线显示已禁用');
    return;
    
    // 以下代码不会执行
    try {
        // 设置线宽
        ctx.lineWidth = 3;
        
        // 生命线
        const lifeLine = [
            { x: 0.4, y: 0.7 },
            { x: 0.38, y: 0.6 },
            { x: 0.35, y: 0.5 },
            { x: 0.3, y: 0.4 },
            { x: 0.25, y: 0.3 }
        ];
        
        // 智慧线
        const headLine = [
            { x: 0.2, y: 0.5 },
            { x: 0.3, y: 0.5 },
            { x: 0.4, y: 0.5 },
            { x: 0.5, y: 0.48 },
            { x: 0.6, y: 0.46 }
        ];
        
        // 感情线
        const heartLine = [
            { x: 0.2, y: 0.4 },
            { x: 0.3, y: 0.38 },
            { x: 0.4, y: 0.36 },
            { x: 0.5, y: 0.35 },
            { x: 0.6, y: 0.36 }
        ];
        
        // 绘制示例掌纹线
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
        drawCurvedLine(ctx, lifeLine, width, height);
        
        ctx.strokeStyle = 'rgba(75, 0, 130, 0.8)';
        drawCurvedLine(ctx, headLine, width, height);
        
        ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)';
        drawCurvedLine(ctx, heartLine, width, height);
    } catch (error) {
        console.error('绘制备用掌纹线时出错:', error);
    }
}

/**
 * 绘制曲线
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {Array} points - 曲线点数组
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawCurvedLine(ctx, points, width, height) {
    if (!points || points.length < 2) return;
    
    ctx.beginPath();
    
    // 移动到第一个点
    // 将标准化坐标(0-1)转换为像素坐标
    const x0 = points[0].x * width;
    const y0 = points[0].y * height;
    ctx.moveTo(x0, y0);
    
    // 使用贝塞尔曲线连接各点
    for (let i = 1; i < points.length - 1; i++) {
        // 控制点和终点使用像素坐标
        const x1 = points[i].x * width;
        const y1 = points[i].y * height;
        
        const x2 = ((points[i].x + points[i + 1].x) / 2) * width;
        const y2 = ((points[i].y + points[i + 1].y) / 2) * height;
        
        ctx.quadraticCurveTo(x1, y1, x2, y2);
    }
    
    // 连接到最后一个点
    if (points.length > 1) {
        const lastX = points[points.length - 1].x * width;
        const lastY = points[points.length - 1].y * height;
        ctx.lineTo(lastX, lastY);
    }
    
    ctx.stroke();
}

/**
 * 绘制示例掌纹线（当没有实际检测数据时使用）
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawExamplePalmLines(ctx, width, height) {
    try {
        // 设置线宽
        ctx.lineWidth = 3;
        
        // 改进的静态掌纹线位置 - 更符合手掌解剖结构
        
        // 示例生命线 - 从手腕到拇指根部的弧线
        const lifeLine = [
            { x: 0.45, y: 0.75 }, // 手腕附近
            { x: 0.44, y: 0.70 },
            { x: 0.43, y: 0.65 },
            { x: 0.41, y: 0.55 },
            { x: 0.38, y: 0.50 },
            { x: 0.35, y: 0.45 },
            { x: 0.32, y: 0.42 }  // 拇指根部附近
        ];
        
        // 示例智慧线 - 横跨手掌中部
        const headLine = [
            { x: 0.25, y: 0.55 }, // 小指侧
            { x: 0.35, y: 0.53 },
            { x: 0.45, y: 0.51 },
            { x: 0.55, y: 0.50 },
            { x: 0.65, y: 0.48 }  // 食指侧
        ];
        
        // 示例感情线 - 横跨手掌上部
        const heartLine = [
            { x: 0.20, y: 0.45 }, // 小指侧上方
            { x: 0.30, y: 0.43 },
            { x: 0.40, y: 0.42 },
            { x: 0.50, y: 0.42 },
            { x: 0.60, y: 0.43 }  // 食指/中指之间上方
        ];
        
        // 绘制示例掌纹线
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)'; // 金色
        drawCurvedLine(ctx, lifeLine, width, height);
        
        ctx.strokeStyle = 'rgba(75, 0, 130, 0.8)'; // 靛青色
        drawCurvedLine(ctx, headLine, width, height);
        
        ctx.strokeStyle = 'rgba(156, 15, 95, 0.8)'; // 紫红色
        drawCurvedLine(ctx, heartLine, width, height);
        
        // 可选：绘制一些参考点模拟手部关键点
        drawReferencePoints(ctx, width, height);
    } catch (error) {
        console.error('绘制备用掌纹线时出错:', error);
    }
}

/**
 * 绘制参考点模拟手部关键点（仅用于静态展示）
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawReferencePoints(ctx, width, height) {
    try {
        ctx.fillStyle = 'rgba(156, 15, 95, 0.4)';
        
        // 手腕
        drawPoint(ctx, 0.45, 0.75, width, height);
        
        // 拇指根部
        drawPoint(ctx, 0.32, 0.42, width, height);
        
        // 食指根部
        drawPoint(ctx, 0.65, 0.48, width, height);
        
        // 小指根部
        drawPoint(ctx, 0.25, 0.55, width, height);
    } catch (error) {
        console.error('绘制参考点时出错:', error);
    }
}

/**
 * 绘制单个参考点
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {number} x - X坐标比例 (0-1)
 * @param {number} y - Y坐标比例 (0-1)
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 */
function drawPoint(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.arc(x * width, y * height, 2, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * 生成命运解读结果
 * @param {Object} features - 掌纹特征
 * @param {string} age - 用户年龄段
 * @param {string} gender - 用户性别
 * @param {string} focusArea - 用户关注领域
 * @return {Object} 命运解读结果
 */
function generateDestinyReadings(features, age, gender, focusArea) {
    try {
        // 保存原始特征数据，用于展示分析过程
        const result = {
            originalFeatures: features,
        career: generateCareerReading(features, age, gender),
        wealth: generateWealthReading(features, age, gender),
        health: generateHealthReading(features, age, gender),
        love: generateLoveReading(features, age, gender),
        social: generateSocialReading(features),
        wisdom: generateWisdomReading(features),
        potential: generatePotentialReading(features, age, focusArea)
    };
        
        return result;
    } catch (error) {
        console.error('生成命运解读失败:', error);
        // 返回基本结果
        return {
            originalFeatures: features,
            career: "您的职业发展将稳定向上，有领导潜能。",
            wealth: "财务状况良好，注意平衡收支。",
            health: "整体健康状况稳定，保持良好生活习惯。",
            love: "感情生活和谐，重视真诚交流。",
            social: "社交圈稳定，人际关系融洽。",
            wisdom: "思维敏捷，学习能力强。",
            potential: "未来发展潜力大，多方面能力均衡。"
        };
    }
}

// 初始化结果生成器
initResultGenerator();

// 导出函数给其他模块使用
window.generateDestinyReadings = generateDestinyReadings;
window.displayAnalysisResults = displayAnalysisResults; 