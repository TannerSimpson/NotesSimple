// Select the necessary elements
const textarea = document.getElementById('comment');
const wordCountDisplay = document.getElementById('word-count-displayed');
const form = document.querySelector('form');
const originalTabButton = document.getElementById('headlessui-tabs-tab-:r0:');
const outputTabButton = document.getElementById('headlessui-tabs-tab-:r1:');
const originalTabPanel = document.getElementById('headlessui-tabs-panel-:r2:');
const outputTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');

let originalText = ""; // Variable to store the original text
let outputText = ""; // Variable to store the output text

// Add event listeners
textarea.addEventListener('input', updateWordCount);
form.addEventListener('submit', handleSubmit);
originalTabButton.addEventListener('click', switchToOriginalTab);
outputTabButton.addEventListener('click', switchToOutputTab);

// Function to update the word count
function updateWordCount() {
    const text = textarea.value;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    wordCountDisplay.textContent = `Word Count: ${wordCount}`;
}

function handleSubmit(event) {
    event.preventDefault();
    originalText = textarea.value; // Store the original text
    const wordFrequency = getWordFrequency(originalText);
    displayWordFrequency(wordFrequency);
    outputText = outputTabPanel.textContent; // Store the output text
    switchToOutputTab();
}

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
    const outputPanelContent = wordFrequency.map(([word, count]) => `<p>${word}: ${count}</p>`).join('\n');
    
    // Display HTML in output panel
    outputTabPanel.innerHTML = outputPanelContent;
}

// Function to switch to the output tab
function switchToOutputTab() {
    originalTabButton.setAttribute('aria-selected', 'false');
    originalTabButton.setAttribute('tabindex', '-1');
    originalTabButton.classList.replace('aih', 'alm');
    originalTabButton.classList.replace('axu', 'axq');

    outputTabButton.setAttribute('aria-selected', 'true');
    outputTabButton.setAttribute('tabindex', '0');
    outputTabButton.classList.replace('alm', 'aih');
    outputTabButton.classList.replace('axq', 'axu');

    originalTabPanel.setAttribute('aria-hidden', 'true');
    originalTabPanel.setAttribute('tabindex', '-1');
    originalTabPanel.removeAttribute('data-selected');

    outputTabPanel.removeAttribute('aria-hidden');
    outputTabPanel.setAttribute('tabindex', '0');
    outputTabPanel.setAttribute('data-selected', '');

    textarea.value = outputText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

// Function to switch to the original tab
function switchToOriginalTab() {
    originalTabButton.setAttribute('aria-selected', 'true');
    originalTabButton.setAttribute('tabindex', '0');
    originalTabButton.classList.replace('alm', 'aih');
    originalTabButton.classList.replace('axq', 'axu');

    outputTabButton.setAttribute('aria-selected', 'false');
    outputTabButton.setAttribute('tabindex', '-1');
    outputTabButton.classList.replace('aih', 'alm');
    outputTabButton.classList.replace('axu', 'axq');

    outputTabPanel.setAttribute('aria-hidden', 'true');
    outputTabPanel.setAttribute('tabindex', '-1');
    outputTabPanel.removeAttribute('data-selected');

    originalTabPanel.removeAttribute('aria-hidden');
    originalTabPanel.setAttribute('tabindex', '0');
    originalTabPanel.setAttribute('data-selected', '');

    textarea.value = originalText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

// Initial word count update
updateWordCount();