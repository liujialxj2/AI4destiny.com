/**
 * Palm Destiny Analysis - Wisdom Analysis Module
 * Generate wisdom-related palm analysis results
 */

/**
 * Generate wisdom reading
 * @param {Object} features - Palm features
 * @return {string} Wisdom reading result
 */
function generateWisdomReading(features) {
    // Get palm features
    const headLineShape = features.lineQualities.headLine.shape;
    const headLineLength = features.lineQualities.headLine.length;
    const headLineDepth = features.lineQualities.headLine.depth;
    const indexFingerRatio = features.fingerLengths.index / features.fingerLengths.middle;
    
    // Thinking style
    let thinkingStyle = '';
    
    if (headLineShape === 'Rising' && headLineLength === 'Long') {
        thinkingStyle = 'Your thinking is creative and imaginative, good at finding new solutions to problems, with a jumping and multi-dimensional thinking style, able to connect knowledge from different fields to generate new insights.';
    } else if (headLineShape === 'Horizontal' && headLineLength === 'Long') {
        thinkingStyle = 'Your thinking is clear and organized, good at logical analysis and systematic thinking, able to break down complex problems and identify key factors, building effective solutions.';
    } else if (headLineShape === 'Descending' && headLineDepth === 'Deep') {
        thinkingStyle = 'Your thinking is deep and focused, good at deep thinking and understanding complex concepts, with keen observation of details, able to identify key points that others might overlook.';
    } else if (headLineLength === 'Short') {
        thinkingStyle = 'Your thinking is direct and efficient, focusing on practical applications and results, able to make quick decisions and take action, performing excellently in situations requiring decisive action.';
    } else {
        thinkingStyle = 'Your thinking is balanced and flexible, able to adjust thinking methods according to the context, integrating intuition and logic, maintaining adaptability in solving different types of problems.';
    }
    
    // Learning style
    let learningStyle = '';
    
    if (headLineDepth === 'Deep' && headLineLength === 'Long') {
        learningStyle = 'You are suited for deep learning and research, like to thoroughly understand concepts and principles, your learning process may be more systematic and comprehensive, focusing on establishing connections between knowledge and overall frameworks.';
    } else if (headLineShape === 'Rising') {
        learningStyle = 'You tend towards exploratory learning, enjoying acquiring knowledge through practice and experience, having a strong interest in innovative learning methods and interdisciplinary content, enjoying the process of discovering new insights.';
    } else if (headLineShape === 'Descending') {
        learningStyle = 'You are suited for focused and practical learning, consolidating knowledge through hands-on operation and application, emphasizing skill mastery and solving practical problems, with clear and specific learning goals.';
    } else {
        learningStyle = 'Your learning style is balanced and adaptive, able to choose suitable strategies according to the learning content, maintaining a good balance between theoretical learning and practical application.';
    }
    
    // Decision-making style
    let decisionStyle = '';
    
    if (indexFingerRatio > 0.95 && headLineShape === 'Rising') {
        decisionStyle = 'In decision-making, you emphasize innovation and possibility, willing to try new methods and ideas, maintaining an open attitude when facing unknown situations, brave in exploring different choices.';
    } else if (indexFingerRatio > 0.95) {
        decisionStyle = 'In decision-making, you have confidence and initiative, willing to take responsibility and risks, able to quickly make judgments and take action.';
    } else if (indexFingerRatio < 0.85) {
        decisionStyle = 'In decision-making, you may be more cautious and thoughtful, valuing information collection and considering multiple factors, pursuing safe and reliable choices.';
    } else {
        decisionStyle = 'Your decision-making style balances decisiveness and prudence, able to adjust the depth of the decision-making process according to the importance of the situation.';
    }
    
    // Wisdom development advice
    let wisdomAdvice = '';
    
    if (headLineShape === 'Rising' && headLineDepth === 'Shallow') {
        wisdomAdvice = 'It is recommended that you cultivate more structured thinking habits, transforming ideas into feasible plans through recording and organizing thoughts. Participate more in team collaboration to complement your creativity with others\' systematic thinking.';
    } else if (headLineShape === 'Horizontal' && headLineDepth === 'Deep') {
        wisdomAdvice = 'It is recommended that you try more interdisciplinary learning and creative activities, expand thinking boundaries, increase flexibility and innovative perspectives. Regularly step out of analytical thinking and try intuitive and emotional decision-making approaches.';
    } else if (headLineShape === 'Descending') {
        wisdomAdvice = 'It is recommended that you cultivate a more macro thinking perspective, enhance abstract thinking abilities through reading and learning. Try theoretical learning and conceptual tasks, balancing the knowledge structure of practice and theory.';
    } else {
        wisdomAdvice = 'Continue to maintain your balanced thinking style, regularly reflect on your learning and thinking habits, consciously develop weaker cognitive areas to make your wisdom more comprehensive.';
    }
    
    // Combine complete reading
    return `${thinkingStyle} ${learningStyle} ${decisionStyle} ${wisdomAdvice}`;
}

// Export function
window.generateWisdomReading = generateWisdomReading; 