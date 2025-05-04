/**
 * Palm Destiny Analysis - Career Analysis Module
 * Generate career-related palm analysis results
 */

/**
 * Generate career reading
 * @param {Object} features - Palm features
 * @param {string} age - User age range
 * @param {string} gender - User gender
 * @return {string} Career reading result
 */
function generateCareerReading(features, age, gender) {
    // Get palm features
    const palmShape = features.palmShape;
    const headLineShape = features.lineQualities.headLine.shape;
    const lifeLineDepth = features.lineQualities.lifeLine.depth;
    const thumbRatio = features.fingerLengths.thumb / features.fingerLengths.middle;
    
    // Basic career tendency interpretation
    let careerBase = '';
    
    if (palmShape === 'Square') {
        careerBase = 'You are suited for careers that require organization and systematic thinking, such as engineering, scientific research, management, or law. You are planned in your approach, attentive to details, and able to effectively organize resources and teams.';
    } else if (palmShape === 'Rectangular') {
        careerBase = 'You are suited for creative and expressive careers, such as arts, design, writing, or performance. Your imagination and innovation ability are your career advantages, enabling you to propose novel ideas and solutions.';
    } else {
        careerBase = 'You are suited for careers requiring good interpersonal relationships and communication skills, such as education, consulting, sales, or service industries. You are good at understanding others\' needs and can adapt flexibly to various situations.';
    }
    
    // Thinking style influence
    let thinkingStyle = '';
    
    if (headLineShape === 'Rising') {
        thinkingStyle = 'Your creative thinking enables you to innovate and pioneer, suitable for taking on groundbreaking work or tasks in the initiation phase of projects.';
    } else if (headLineShape === 'Horizontal') {
        thinkingStyle = 'Your clear logical thinking makes you good at analysis and planning, suitable for work requiring systematic thinking and strategic planning.';
    } else {
        thinkingStyle = 'Your practical thinking style makes you good at solving real problems, suitable for work requiring efficient execution and practical operations.';
    }
    
    // Execution ability assessment
    let execution = '';
    
    if (lifeLineDepth === 'Deep' && thumbRatio > 0.5) {
        execution = 'Your strong willpower and excellent execution ability enable you to continuously invest energy in long-term goals, which is an important factor in your career success.';
    } else if (lifeLineDepth === 'Deep' || thumbRatio > 0.5) {
        execution = 'You have good execution ability and endurance, able to persistently advance your work, but sometimes may need to adjust your pace to maintain sustainability.';
    } else {
        execution = 'Your working style is flexible and adaptable, but you may need to improve task continuity and completion rate, establishing more systematic working methods.';
    }
    
    // Age-specific and gender-specific advice
    let ageGenderAdvice = '';
    
    if (age === 'under18') {
        ageGenderAdvice = 'In the early stages of career development, it is recommended that you try different fields to find directions that match your characteristics, and emphasize the cultivation of basic skills.';
    } else if (age === '18-25') {
        ageGenderAdvice = 'This is a critical period for establishing career foundations. It is recommended to balance professional depth and breadth, while developing interpersonal networks to pave the way for future development.';
    } else if (age === '26-35') {
        if (gender === 'female') {
            ageGenderAdvice = 'This is the golden period of career development, and you may also face choices between work and family balance. It is recommended to find a balance point suitable for yourself and focus on establishing unique professional advantages.';
        } else {
            ageGenderAdvice = 'This is an acceleration period for career development. It is recommended to delve deep into professional fields while expanding management and leadership capabilities to prepare for mid-career transitions.';
        }
    } else if (age === '36-45') {
        ageGenderAdvice = 'This is a career maturity period. You may have accumulated rich experience. It is recommended to think about how to use experience to create greater value, while starting to cultivate and guide the new generation of talent.';
    } else if (age === '46-60') {
        ageGenderAdvice = 'This is a career harvest period. It is recommended to use your experience and wisdom, consider how to pass on knowledge, and prepare for late-career planning.';
    } else {
        ageGenderAdvice = 'At this stage, you have rich life experience and can consider how to share your professional knowledge and experience, or turn to consulting, guidance, or volunteer services.';
    }
    
    // Combine complete reading
    return `${careerBase} ${thinkingStyle} ${execution} ${ageGenderAdvice}`;
}

// Export function
window.generateCareerReading = generateCareerReading; 