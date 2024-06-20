// Select the necessary elements
const highlightsTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');

// Function to calculate word frequency
function getWordFrequency(text) {
    const ignoreWords = ["and", "or", "but", "nor", "for", "so", "yet", "I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs", "the", "to", "a", "in", "of", "on", "too", "s", "is", "not", "about", "after", "above", "at", "by", "beside", "just", "most", "more", "less", "least", "with", "from", "that", "as", "this", "those", "huge", "big", "large", "small", "little"];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency = {};

    words.forEach(word => {
        if (!ignoreWords.includes(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    return Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 30);
}

// Function to display word frequency
function displayWordFrequency(wordFrequency) {
    // Sort word frequency array in descending order based on word count
    wordFrequency.sort((a, b) => b[1] - a[1]);

    // Generate HTML for displaying word frequency with appropriate font sizes
    const highlightsPanelContent = wordFrequency.map(([word, count], index) => {
        let fontSize;
        switch (index) {
            case 0:
                fontSize = 40;
                break;
            case 1:
                fontSize = 34;
                break;
            case 2:
                fontSize = 28;
                break;
            case 3:
                fontSize = 24;
                break;
            case 4:
                fontSize = 20;
                break;
            default:
                fontSize = 16;
        }
        return `<p style="font-size:${fontSize}px;"><strong>${word}</strong></p>`;
    }).join('\n');

    // Display HTML in word count panel
    highlightsTabPanel.innerHTML = highlightsPanelContent;
}

export { getWordFrequency, displayWordFrequency };
