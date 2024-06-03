import { getWordFrequency, displayWordFrequency } from './wordcloud.js';

// Select the necessary elements
const textarea = document.getElementById('comment');
const wordCountDisplay = document.getElementById('word-count-displayed');
const form = document.querySelector('form');
const originalTabButton = document.getElementById('headlessui-tabs-tab-:r0:');
const wordCloudTabButton = document.getElementById('headlessui-tabs-tab-:r1:');
const originalTabPanel = document.getElementById('headlessui-tabs-panel-:r2:');
const wordCloudTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');
const highlightsTabButton = document.getElementById('headlessui-tabs-tab-:r4:');
const highlightsTabPanel = document.getElementById('headlessui-tabs-tab-:r6:');
const summaryTabButton = document.getElementById('headlessui-tabs-tab-:r5:');
const summaryTabPanel = document.getElementById('headlessui-tabs-tab-:r7:');
const insightsTabButton = document.getElementById('headlessui-tabs-tab-:r8:');
const insightsTabPanel = document.getElementById('headlessui-tabs-tab-:r10:');

let originalText = ""; // Variable to store the original text
let wordCloudText = ""; // Variable to store the word cloud text
let highlightsText = ""; // variable to store the highlights text
let SummaryText = "";
let InsightsText = "";

function mainFacade() {

    //calls word count function and ties to text area input
    textarea.addEventListener('input', updateWordCount);
    form.addEventListener('submit', handleSubmit);
    originalTabButton.addEventListener('click', switchToOriginalTab);
    wordCloudTabButton.addEventListener('click', switchToWordCloudTab);
    highlightsTabButton.addEventListener('click', switchToHighlightsTab);
    summaryTabButton.addEventListener('click', switchToSummaryTab);
    insightsTabButton.addEventListener('click', switchToInsightsTab);
};

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
    wordCloudText = wordCloudTabPanel.textContent; // Store the word cloud text
}

function switchToWordCloudTab() {
    originalTabButton.setAttribute('aria-selected', 'false');
    originalTabButton.setAttribute('tabindex', '-1');
    originalTabButton.classList.replace('aih', 'alm');
    originalTabButton.classList.replace('axu', 'axq');

    wordCloudTabButton.setAttribute('aria-selected', 'true');
    wordCloudTabButton.setAttribute('tabindex', '0');
    wordCloudTabButton.classList.replace('alm', 'aih');
    wordCloudTabButton.classList.replace('axq', 'axu');

    originalTabPanel.setAttribute('aria-hidden', 'true');
    originalTabPanel.setAttribute('tabindex', '-1');
    originalTabPanel.removeAttribute('data-selected');

    wordCloudTabPanel.removeAttribute('aria-hidden');
    wordCloudTabPanel.setAttribute('tabindex', '0');
    wordCloudTabPanel.setAttribute('data-selected', '');

    textarea.value = wordCloudText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

// Function to switch to the original tab
function switchToOriginalTab() {
    originalTabButton.setAttribute('aria-selected', 'true');
    originalTabButton.setAttribute('tabindex', '0');
    originalTabButton.classList.replace('alm', 'aih');
    originalTabButton.classList.replace('axq', 'axu');

    wordCloudTabButton.setAttribute('aria-selected', 'false');
    wordCloudTabButton.setAttribute('tabindex', '-1');
    wordCloudTabButton.classList.replace('aih', 'alm');
    wordCloudTabButton.classList.replace('axu', 'axq');

    wordCloudTabPanel.setAttribute('aria-hidden', 'true');
    wordCloudTabPanel.setAttribute('tabindex', '-1');
    wordCloudTabPanel.removeAttribute('data-selected');

    originalTabPanel.removeAttribute('aria-hidden');
    originalTabPanel.setAttribute('tabindex', '0');
    originalTabPanel.setAttribute('data-selected', '');

    textarea.value = originalText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

function switchToHighlightsTab() {
    
}

function switchToSummaryTab() {
    
}

function switchToInsightsTab() {
    
}

mainFacade();



