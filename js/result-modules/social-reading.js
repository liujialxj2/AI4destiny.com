/**
 * Palm Destiny Analysis - Social Network Analysis Module
 * Generate social network-related palm analysis results
 */

/**
 * Generate social network reading
 * @param {Object} features - Palm features
 * @return {string} Social network reading result
 */
function generateSocialReading(features) {
    // Get palm features
    const palmShape = features.palmShape;
    const heartLineLength = features.lineQualities.heartLine.length;
    const fingerSpacing = features.fingerSpacing;
    const pinkyLength = features.fingerLengths.pinky / features.fingerLengths.middle;
    
    // Social style
    let socialStyle = '';
    
    if (palmShape === 'Rectangular' && heartLineLength === 'Long') {
        socialStyle = 'Your social style is outgoing and inclusive. You excel at connecting with various types of people, feel comfortable in social settings, and create a pleasant atmosphere.';
    } else if (palmShape === 'Square' && heartLineLength === 'Short') {
        socialStyle = 'Although your social style is rather reserved, you emphasize quality over quantity, tend to develop a few deep friendships, and value sincere and substantial communication.';
    } else if (pinkyLength > 0.85) {
        socialStyle = 'You have excellent communication skills and social intelligence, able to keenly understand others\' needs and emotions, suitable for functioning in environments requiring interpersonal interaction.';
    } else {
        socialStyle = 'Your social approach is balanced and moderate, able to adjust your social intensity according to the occasion, enjoying both group activities and valuing time alone.';
    }
    
    // Interpersonal relationship mode
    let relationshipMode = '';
    
    if (fingerSpacing === 'Wide') {
        relationshipMode = 'You maintain a certain openness and independence in social interactions, appreciate a diverse network of relationships, are not bound by tradition or convention, and enjoy exploring different types of social connections.';
    } else if (fingerSpacing === 'Close') {
        relationshipMode = 'You focus on building close social circles, are very loyal and committed to those close to you, may tend to deeply interact with like-minded people, forming a united small group.';
    } else if (fingerSpacing === 'Uneven') {
        relationshipMode = 'Your social network may present a multi-layered structure, with different social circles in different areas of life, able to flexibly adjust your role in various social environments.';
    } else {
        relationshipMode = 'Your social network is balanced and stable, having both depth and breadth, able to maintain intimate relationships while also accepting new social possibilities.';
    }
    
    // Social energy and needs
    let socialEnergy = '';
    
    if (palmShape === 'Rectangular' && fingerSpacing === 'Wide') {
        socialEnergy = 'You have high social energy and needs, may enjoy being the center of social activities, gain energy through interaction with people, suitable for active social environments and team collaboration.';
    } else if (palmShape === 'Square' && fingerSpacing === 'Close') {
        socialEnergy = 'Your social energy is focused and measured, you may prefer planned social activities and deep conversations, prolonged casual socializing may drain your energy.';
    } else {
        socialEnergy = 'Your social needs are balanced and flexible, able to adjust social investment according to your state and external environment, enjoying social pleasures while respecting the need for personal recovery time.';
    }
    
    // Social development advice
    let socialAdvice = '';
    
    if (pinkyLength < 0.75 && heartLineLength === 'Short') {
        socialAdvice = 'You may consider consciously expanding your social skills and network, trying to participate in more group activities or interest communities, which will help increase life opportunities and support systems.';
    } else if (pinkyLength > 0.85 && heartLineLength === 'Shallow') {
        socialAdvice = 'You have excellent social abilities, but may need to pay attention to the depth of emotional investment and genuine connection, ensuring that social interactions are not just superficial but also meet emotional needs.';
    } else if (fingerSpacing === 'Close' && palmShape === 'Rectangular') {
        socialAdvice = 'You may have some internal conflicts in your social approach. It is recommended to find a way to balance independence and the need for intimacy, allowing yourself to present different social aspects in different situations.';
    } else {
        socialAdvice = 'Continue to maintain your balanced social approach, adjust your social network according to changes in life stages, value relationships that can support and inspire each other, while also maintaining an open attitude towards new connections.';
    }
    
    // Combine complete reading
    return `${socialStyle} ${relationshipMode} ${socialEnergy} ${socialAdvice}`;
}

// Export function
window.generateSocialReading = generateSocialReading; 