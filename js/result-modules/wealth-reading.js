/**
 * Palm Destiny Analysis - Wealth Analysis Module
 * Generate wealth-related palm analysis results
 */

/**
 * Generate wealth reading
 * @param {Object} features - Palm features
 * @param {string} age - User age range
 * @param {string} gender - User gender
 * @return {string} Wealth reading result
 */
function generateWealthReading(features, age, gender) {
    // Get palm features
    const palmShape = features.palmShape;
    const pinkyRatio = features.fingerLengths.pinky / features.fingerLengths.middle;
    const headLineShape = features.lineQualities.headLine.shape;
    
    // Wealth acquisition ability
    let wealthAcquisition = '';
    
    if (palmShape === 'Square' && pinkyRatio > 0.85) {
        wealthAcquisition = 'You have the ability to systematically plan and manage wealth, combined with excellent communication and business acumen, making you suitable for wealth acquisition through business operations or investments.';
    } else if (palmShape === 'Square') {
        wealthAcquisition = 'Your organizational ability and planning skills make you good at managing finances, suitable for accumulating wealth through stable investments and career development.';
    } else if (pinkyRatio > 0.85) {
        wealthAcquisition = 'Your communication ability and social intelligence are important channels for wealth acquisition, suitable for creating wealth opportunities through sales, negotiation, or building extensive networking.';
    } else if (palmShape === 'Rectangular' && headLineShape === 'Rising') {
        wealthAcquisition = 'Your creativity and innovative thinking can be important sources of wealth acquisition, suitable for financial returns through creative projects, inventions, or artistic creations.';
    } else {
        wealthAcquisition = 'Your wealth acquisition methods are diverse and flexible, possibly creating income through multiple channels and skill combinations.';
    }
    
    // Financial attitude
    let financialAttitude = '';
    
    if (headLineShape === 'Horizontal') {
        financialAttitude = 'You have rational and systematic thinking about finances, good at analyzing risks and returns, which helps make wise financial decisions.';
    } else if (headLineShape === 'Down') {
        financialAttitude = 'You have keen attention to financial details, good at optimizing daily expenses and management, which helps effectively utilize resources.';
    } else {
        financialAttitude = 'You have innovative thinking about finances, may be willing to try new types of investments or wealth growth methods, but need to balance risk and innovation.';
    }
    
    // Age stage advice
    let ageAdvice = '';
    
    if (age === 'under18' || age === '18-25') {
        ageAdvice = 'This stage is key for establishing financial awareness and habits. It is recommended to learn basic financial knowledge, develop saving habits, and start small investment attempts.';
    } else if (age === '26-35') {
        ageAdvice = 'This is an acceleration period for wealth accumulation. It is recommended to balance short-term goals and long-term planning, such as housing, investment, and retirement preparation, while improving career income capabilities.';
    } else if (age === '36-45') {
        ageAdvice = 'This is a critical period for wealth management. It is recommended to optimize investment portfolios, balance risks, and may need to consider family financial planning and education expenses.';
    } else if (age === '46-60') {
        ageAdvice = 'This is an important stage for retirement preparation. It is recommended to assess retirement needs, adjust investment strategies, and consider asset preservation and inheritance planning.';
    } else {
        ageAdvice = 'This stage focuses on the reasonable use and transfer of wealth. It is recommended to ensure financial security while considering how to use wealth to improve quality of life and achieve personal value.';
    }
    
    // Gender perspective advice
    let genderAdvice = '';
    if (gender === 'female') {
        genderAdvice = 'As a woman, you may face special financial considerations such as career interruptions or longer life expectancy. It is recommended to establish independent financial identity and planning to ensure long-term financial security.';
    }
    
    // Combine complete reading
    return `${wealthAcquisition} ${financialAttitude} ${ageAdvice} ${genderAdvice}`;
}

// Export function
window.generateWealthReading = generateWealthReading; 