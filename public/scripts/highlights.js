// Select the necessary elements
const highlightsTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');

// Function to calculate word frequency
function getWordFrequency(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 30);
}

// Function to display word frequency
function displayWordFrequency(wordFrequency) {
    // Sort word frequency array in descending order based on word count
    wordFrequency.sort((a, b) => b[1] - a[1]);
    
    // Generate HTML for displaying word frequency
    const highlightsPanelContent = wordFrequency.map(([word, count]) => `<p>${word}: ${count}</p>`).join('\n');
    
    // Display HTML in word count panel
    highlightsTabPanel.innerHTML = highlightsPanelContent;
}

export { getWordFrequency, displayWordFrequency };