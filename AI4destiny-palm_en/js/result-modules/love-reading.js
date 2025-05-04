/**
 * Palm Destiny Analysis - Love Relationship Analysis Module
 * Generate love relationship-related palm analysis results
 */

/**
 * Generate love relationship reading
 * @param {Object} features - Palm features
 * @param {string} age - User age range
 * @param {string} gender - User gender
 * @return {string} Love relationship reading result
 */
function generateLoveReading(features, age, gender) {
    // Get palm features
    const heartLineLength = features.lineQualities.heartLine.length;
    const heartLineDepth = features.lineQualities.heartLine.depth;
    const heartLineShape = features.lineQualities.heartLine.shape;
    const ringFingerRatio = features.fingerLengths.ring / features.fingerLengths.middle;
    
    // Emotional expression style
    let emotionalExpression = '';
    
    if (heartLineLength === 'Long' && heartLineDepth === 'Deep') {
        emotionalExpression = 'You are emotionally rich and express yourself directly, able to honestly express your feelings, tending to be proactive and enthusiastic in relationships.';
    } else if (heartLineLength === 'Long' && heartLineDepth === 'Shallow') {
        emotionalExpression = 'You are emotionally rich but express yourself subtly. Although your inner feelings are profound, you may tend to express care through actions rather than words.';
    } else if (heartLineLength === 'Short' && heartLineDepth === 'Deep') {
        emotionalExpression = 'Your emotions are concentrated and intense, with high quality requirements for intimate relationships, and you may wholeheartedly invest in feelings for specific people.';
    } else {
        emotionalExpression = 'Your emotional expression is balanced and moderate, able to adjust the way and intensity of expression according to the relationship and occasion, focusing on the substance rather than the form of emotions.';
    }
    
    // Relationship pattern
    let relationshipPattern = '';
    
    if (heartLineShape === 'Rising' && ringFingerRatio > 1) {
        relationshipPattern = 'In relationships, you emphasize romance and ideals, pursuing emotional sublimation and spiritual compatibility, longing to grow and explore together with your partner.';
    } else if (heartLineShape === 'Descending') {
        relationshipPattern = 'In relationships, you emphasize practicality and pragmatism, valuing mutual support and daily companionship, expressing love through concrete actions, creating a stable foundation for the relationship.';
    } else if (heartLineShape === 'Wavy') {
        relationshipPattern = 'Your love life may be rich and varied. In relationships, you expect freshness and depth, desire both intimacy and personal space, and need to balance these needs.';
    } else {
        relationshipPattern = 'Your relationship pattern is balanced and stable, able to balance emotion and reason, find balance between giving and receiving, and establish lasting mutual trust.';
    }
    
    // Age-specific love advice
    let ageLoveAdvice = '';
    
    if (age === 'under18') {
        ageLoveAdvice = 'This age stage is a period to understand your emotional needs. It is recommended to focus more on self-growth and establishing a healthy self-cognition, laying the foundation for future relationships.';
    } else if (age === '18-25') {
        ageLoveAdvice = 'This is an important stage of emotional exploration and self-awareness. Trying different types of relationships can help you better understand your needs and boundaries, preparing for long-term relationships.';
    } else if (age === '26-35') {
        ageLoveAdvice = 'At this stage, you may face decisions about establishing long-term relationships or families. It is recommended to focus on the consistency of values and life goals when choosing a partner, while maintaining personal growth space.';
    } else if (age === '36-45') {
        ageLoveAdvice = 'This is a stage of relationship deepening or re-evaluation. You may need to find a balance between family, career, and personal development, focusing on improving relationship quality and growing together.';
    } else if (age === '46-60') {
        ageLoveAdvice = 'Relationships at this stage may face new changes and challenges, such as children becoming independent, caring for parents, or retirement planning. You need to adapt to these transitions with your partner and redefine intimacy.';
    } else {
        ageLoveAdvice = 'Intimate relationships at this stage focus more on companionship, support, and sharing life experiences. It is recommended to focus on the depth of emotional connection and daily small happiness, cherishing the time spent together.';
    }
    
    // Gender-specific advice
    let genderLoveAdvice = '';
    
    if (gender === 'female') {
        genderLoveAdvice = 'As a woman, you may be more sensitive to emotional communication and connection in relationships. It is recommended to maintain this sensitivity while also paying attention to expressing your own needs and setting boundaries, creating an equal and healthy relationship.';
    } else if (gender === 'male') {
        genderLoveAdvice = 'As a man, you may focus more on actions and problem-solving in relationships. It is recommended to develop emotional expression and listening skills at the same time, allowing yourself to show vulnerability and needs, establishing deeper connections.';
    }
    
    // Combine complete reading
    return `${emotionalExpression} ${relationshipPattern} ${ageLoveAdvice} ${genderLoveAdvice}`;
}

// Export function
window.generateLoveReading = generateLoveReading; 