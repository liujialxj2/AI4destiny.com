/**
 * Palm Destiny Analysis - Potential Analysis Module
 * Generate future potential-related palm analysis results
 */

/**
 * Generate future potential reading
 * @param {Object} features - Palm features
 * @param {string} age - User age range
 * @param {string} focusArea - User focus area
 * @return {string} Future potential reading result
 */
function generatePotentialReading(features, age, focusArea) {
    // Get comprehensive palm features
    const palmShape = features.palmShape;
    const headLineShape = features.lineQualities.headLine.shape;
    const headLineLength = features.lineQualities.headLine.length;
    const lifeLineDepth = features.lineQualities.lifeLine.depth;
    const heartLineDepth = features.lineQualities.heartLine.depth;
    
    // Basic potential assessment
    let potentialBase = '';
    
    if (headLineLength === 'Long' && lifeLineDepth === 'Deep') {
        potentialBase = 'You have lasting focus and tenacious willpower, which are important qualities for achieving long-term goals. Your potential lies in persistently investing time and energy in important areas to ultimately reach a professional level.';
    } else if (headLineShape === 'Rising' && heartLineDepth === 'Deep') {
        potentialBase = 'You combine creativity and emotional intelligence, which is a good foundation for development in humanities, arts, and creative fields. Your potential lies in combining inspiration with genuine emotions to create works or results with depth and resonance.';
    } else if (palmShape === 'Square' && headLineShape === 'Horizontal') {
        potentialBase = 'Your organizational ability and systematic thinking are your significant advantages, which are valuable in management, planning, and scientific fields. Your potential lies in establishing and optimizing systems to improve efficiency and quality.';
    } else {
        potentialBase = 'You have a balanced set of abilities and strong adaptability, enabling you to maintain effectiveness in changing environments. Your potential lies in flexibly using multiple strengths to play a role in comprehensive positions.';
    }
    
    // Development stage advice
    let developmentAdvice = '';
    
    if (age === 'under18' || age === '18-25') {
        developmentAdvice = 'This is an important stage for potential exploration and foundation building. It is recommended to try different fields broadly while deeply developing core advantages. Finding directions that inspire your passion will be an important foundation for future achievements.';
    } else if (age === '26-35') {
        developmentAdvice = 'This is a stage of capability deepening and professional growth. It is recommended to invest more energy in selected fields while beginning to establish a unique professional style or contribution. Regular reflection and direction adjustment are crucial.';
    } else if (age === '36-45') {
        developmentAdvice = 'This is a stage of professional maturity and expanding influence. It is recommended to consider how to transform experience into contributions of greater scope, while also considering knowledge inheritance and nurturing the new generation of talent.';
    } else if (age === '46-60') {
        developmentAdvice = 'This is a stage of wisdom integration and value creation. It is recommended to go beyond existing achievements to consider more transformative or legacy projects, while focusing on personal satisfaction and sense of meaning.';
    } else {
        developmentAdvice = 'This is an important stage for experience sharing and inner development. It is recommended to focus on how to pass on wisdom and values in meaningful ways, while exploring new dimensions of inner growth.';
    }
    
    // Special advice for focus area
    let focusAdvice = '';
    
    if (focusArea === 'career') {
        focusAdvice = 'In terms of career development, your palm indicates that you should focus on how to better match your personal traits with career needs, seeking career paths that can stimulate your full potential, rather than just following conventional tracks.';
    } else if (focusArea === 'wealth') {
        focusAdvice = 'In terms of wealth accumulation, your palm indicates that you may create value by utilizing your unique talents, rather than relying solely on traditional ways of wealth growth. Consider how to convert your advantages into sustainable economic returns.';
    } else if (focusArea === 'health') {
        focusAdvice = 'In terms of health, your palm indicates that maintaining mind-body balance is crucial for realizing your potential. Finding health practices suitable for your energy pattern will support your long-term growth and development.';
    } else if (focusArea === 'love') {
        focusAdvice = 'In terms of emotions, your palm indicates that finding a partner who can understand and support your true self will have a positive impact on your potential development. Genuine emotional connection is an important support system for you.';
    } else if (focusArea === 'social') {
        focusAdvice = 'In terms of social networking, your palm indicates that building quality rather than quantity relationships may be more beneficial for your development. Finding companions who can inspire and support each other will accelerate your growth.';
    } else if (focusArea === 'wisdom') {
        focusAdvice = 'In terms of wisdom development, your palm indicates that integrating different knowledge domains and forming unique insights is an important direction for your growth. Cross-disciplinary exploration will stimulate your innovative potential.';
    }
    
    // Potential challenges and ways to overcome
    let challenges = '';
    
    if (lifeLineDepth === 'Shallow' && headLineLength === 'Long') {
        challenges = 'The challenge you may face is balancing energy and goals. It is recommended to learn energy management techniques, set reasonable progress expectations, and avoid depleting yourself while pursuing long-term goals.';
    } else if (heartLineDepth === 'Deep' && headLineShape === 'Horizontal') {
        challenges = 'The challenge you may face is balancing emotion and rationality. It is recommended to consider both logical analysis and emotional intuition in important decisions, seeking comprehensive solutions that satisfy both.';
    } else if (palmShape === 'Rectangular' && headLineShape === 'Descending') {
        challenges = 'The challenge you may face is balancing creativity and execution. It is recommended to establish systematic methods to transform ideas into reality, and you can seek partners with complementary skills to strengthen project implementation.';
    } else {
        challenges = 'Each person\'s growth path has unique challenges. Regular reflection and self-awareness will help you identify and overcome factors that hinder the expression of your potential. Maintaining an open mindset and willingness to learn are key to continuous development.';
    }
    
    // Combine complete reading
    return `${potentialBase} ${developmentAdvice} ${focusAdvice} ${challenges}`;
}

// Export function
window.generatePotentialReading = generatePotentialReading; 