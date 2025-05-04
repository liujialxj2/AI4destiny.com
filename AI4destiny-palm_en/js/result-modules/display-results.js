/**
 * Palm Destiny Analysis - Results Display Module
 * Display palm analysis results
 */

/**
 * Display analysis results
 * @param {Object} analysisResults - Analysis results object
 */
function displayAnalysisResults(analysisResults) {
    console.log('Displaying analysis results', analysisResults);
    
    // Display analyzed image
    const analyzedPalmImage = document.getElementById('analyzedPalmImage');
    analyzedPalmImage.src = document.getElementById('palmPreview').src;
    
    // Display key findings
    const keyFindingsList = document.getElementById('keyFindingsList');
    keyFindingsList.innerHTML = '';
    
    analysisResults.keyFindings.forEach(finding => {
        const li = document.createElement('li');
        li.textContent = finding;
        li.classList.add('reveal-text');
        keyFindingsList.appendChild(li);
    });
    
    // Display life line analysis
    const lifeLineAnalysis = document.getElementById('lifeLineAnalysis');
    lifeLineAnalysis.innerHTML = '';
    
    const lifeLineContent = document.createElement('div');
    lifeLineContent.innerHTML = `
        <p>${analysisResults.lineAnalysis.lifeLine.general}</p>
        <p>${analysisResults.lineAnalysis.lifeLine.health}</p>
        <p>${analysisResults.lineAnalysis.lifeLine.vitality}</p>
        <p>${analysisResults.lineAnalysis.lifeLine.challenges}</p>
    `;
    lifeLineAnalysis.appendChild(lifeLineContent);
    
    // Display head line analysis
    const headLineAnalysis = document.getElementById('headLineAnalysis');
    headLineAnalysis.innerHTML = '';
    
    const headLineContent = document.createElement('div');
    headLineContent.innerHTML = `
        <p>${analysisResults.lineAnalysis.headLine.thinking}</p>
        <p>${analysisResults.lineAnalysis.headLine.learning}</p>
        <p>${analysisResults.lineAnalysis.headLine.decisions}</p>
        <p>${analysisResults.lineAnalysis.headLine.career}</p>
    `;
    headLineAnalysis.appendChild(headLineContent);
    
    // Display heart line analysis
    const heartLineAnalysis = document.getElementById('heartLineAnalysis');
    heartLineAnalysis.innerHTML = '';
    
    const heartLineContent = document.createElement('div');
    heartLineContent.innerHTML = `
        <p>${analysisResults.lineAnalysis.heartLine.emotions}</p>
        <p>${analysisResults.lineAnalysis.heartLine.relationships}</p>
        <p>${analysisResults.lineAnalysis.heartLine.love}</p>
        <p>${analysisResults.lineAnalysis.heartLine.balance}</p>
    `;
    heartLineAnalysis.appendChild(heartLineContent);
    
    // Display destiny overview
    const destinyAreas = [
        { id: 'careerDestiny', content: analysisResults.destinyReadings.career },
        { id: 'wealthDestiny', content: analysisResults.destinyReadings.wealth },
        { id: 'healthDestiny', content: analysisResults.destinyReadings.health },
        { id: 'loveDestiny', content: analysisResults.destinyReadings.love },
        { id: 'socialDestiny', content: analysisResults.destinyReadings.social },
        { id: 'wisdomDestiny', content: analysisResults.destinyReadings.wisdom },
        { id: 'potentialDestiny', content: analysisResults.destinyReadings.potential }
    ];
    
    destinyAreas.forEach(area => {
        const destinyCard = document.getElementById(area.id);
        const destinyContent = destinyCard.querySelector('.destiny-content');
        destinyContent.textContent = area.content;
        destinyCard.classList.add('card-reveal');
    });
    
    // Add animation effects
    setTimeout(() => {
        // Animation for key findings
        const findings = document.querySelectorAll('.reveal-text');
        findings.forEach((finding, index) => {
            setTimeout(() => {
                finding.classList.add('active');
            }, index * 300);
        });
        
        // Animation for destiny cards
        document.querySelectorAll('.destiny-card').forEach(card => {
            card.classList.add('card-reveal');
        });
    }, 500);
}

// Export function
window.displayAnalysisResults = displayAnalysisResults; 