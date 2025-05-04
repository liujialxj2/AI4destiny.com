/**
 * Palm Destiny Analysis - Health Analysis Module
 * Generate health-related palm analysis results
 */

/**
 * Generate health reading
 * @param {Object} features - Palm features
 * @param {string} age - User age range
 * @param {string} gender - User gender
 * @return {string} Health reading result
 */
function generateHealthReading(features, age, gender) {
    // Get palm features
    const lifeLineDepth = features.lineQualities.lifeLine.depth;
    const lifeLineLength = features.lineQualities.lifeLine.length;
    const lifeLineCurve = features.lineQualities.lifeLine.curve;
    
    // Basic health condition
    let healthBase = '';
    
    if (lifeLineDepth === 'Deep' && lifeLineLength === 'Long') {
        healthBase = 'Your life line is deep, long, and clear, indicating that you have a good health foundation and vitality, with strong physical fitness and good recovery ability.';
    } else if (lifeLineDepth === 'Deep') {
        healthBase = 'Your life line is deep and prominent, indicating that you have stronger vitality and recovery ability, with a good physical foundation.';
    } else if (lifeLineLength === 'Long') {
        healthBase = 'Your life line is long and extended, indicating your lasting vitality and potential for health and longevity, but you need to maintain good habits.';
    } else {
        healthBase = 'Your life line shows that your health condition may be more sensitive, requiring more attention to body signals and healthcare measures.';
    }
    
    // Lifestyle advice
    let lifestyleAdvice = '';
    
    if (lifeLineCurve === 'Curved') {
        lifestyleAdvice = 'You are suited for an active lifestyle, with regular exercise and social activities being beneficial to your health. Maintaining vitality and a positive attitude is an important factor in your health.';
    } else if (lifeLineCurve === 'Straight') {
        lifestyleAdvice = 'You are suited for a regular and stable lifestyle, with planned health management and regular check-ups being important for you. Establishing good daily habits is the foundation of your health.';
    } else {
        lifestyleAdvice = 'Your health may be more affected by life changes, and the ability to flexibly adjust your lifestyle and cope with stress is important for you. Maintaining balance and adaptability is key to health.';
    }
    
    // Age-specific health advice
    let ageHealthAdvice = '';
    
    if (age === 'under18') {
        ageHealthAdvice = 'Adolescence is a critical time to establish healthy habits. It is recommended to focus on a balanced diet, adequate rest, active participation in sports, and building a good foundation for physical and mental health.';
    } else if (age === '18-25') {
        ageHealthAdvice = 'This age group may face academic or work pressure. It is recommended to maintain regular routines, moderate exercise, pay attention to mental health, and avoid over-reliance on stimulants.';
    } else if (age === '26-35') {
        ageHealthAdvice = 'This is a critical period for career development and also for consolidating healthy habits. It is recommended to maintain a healthy diet while working busy schedules, exercise regularly, and start paying attention to health check-ups.';
    } else if (age === '36-45') {
        ageHealthAdvice = 'Metabolism begins to change in this age group. It is recommended to pay attention to weight management, increase strength training, focus on cardiovascular health, and maintain a positive and optimistic attitude to cope with stress.';
    } else if (age === '46-60') {
        ageHealthAdvice = 'At this stage, more attention needs to be paid to the prevention of chronic diseases. It is recommended to have regular comprehensive check-ups, adjust diet to reduce high fat and sugar, persist in suitable exercise methods, and pay attention to bone health.';
    } else {
        ageHealthAdvice = 'At this stage, health is the foundation for enjoying life. It is recommended to stay socially active, persist in gentle and effective exercise, pay attention to balanced nutrition intake, and maintain a positive mental state.';
    }
    
    // Gender-specific health advice
    let genderHealthAdvice = '';
    
    if (gender === 'female') {
        genderHealthAdvice = 'As a woman, you may need to pay extra attention to hormone balance, bone health, and mental health. It is recommended to have regular targeted check-ups and pay attention to self-care knowledge.';
    } else if (gender === 'male') {
        genderHealthAdvice = 'As a man, you may need to pay extra attention to cardiovascular health, prostate health, and stress management. It is recommended to have regular check-ups and maintain appropriate intensity of physical exercise.';
    }
    
    // Combine complete reading
    return `${healthBase} ${lifestyleAdvice} ${ageHealthAdvice} ${genderHealthAdvice}`;
}

// Export function
window.generateHealthReading = generateHealthReading; 