/*import { getWordFrequency, displayWordFrequency } from './highlights.js';
import { getAndDisplaySummary } from './summary.js';

// Select the necessary elements
const textarea = document.getElementById('comment');
const wordCountDisplay = document.getElementById('word-count-displayed');
const form = document.querySelector('form');
const originalTabButton = document.getElementById('headlessui-tabs-tab-:r0:');
const highlightsTabButton = document.getElementById('headlessui-tabs-tab-:r1:');
const originalTabPanel = document.getElementById('headlessui-tabs-panel-:r2:');
const highlightsTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');
const summaryTabButton = document.getElementById('headlessui-tabs-tab-:r5:');
const summaryTabPanel = document.getElementById('headlessui-tabs-tab-:r7:');
const insightsTabButton = document.getElementById('headlessui-tabs-tab-:r8:');
const insightsTabPanel = document.getElementById('headlessui-tabs-tab-:r10:');

let originalText = ""; // Variable to store the original text
let highlightsText = ""; // Variable to store the word cloud text
let SummaryText = "";
// let InsightsText = "";

function mainFacade() {

    //calls word count function and ties to text area input
    textarea.addEventListener('input', updateWordCount);
    form.addEventListener('submit', handleSubmit);
    originalTabButton.addEventListener('click', switchToOriginalTab);
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
    highlightsText = highlightsTabPanel.textContent; // Store the word cloud text

}

function switchToHighlightsTab() {
    originalTabButton.setAttribute('aria-selected', 'false');
    originalTabButton.setAttribute('tabindex', '-1');
    originalTabButton.classList.replace('aih', 'alm');
    originalTabButton.classList.replace('axu', 'axq');

    highlightsTabButton.setAttribute('aria-selected', 'true');
    highlightsTabButton.setAttribute('tabindex', '0');
    highlightsTabButton.classList.replace('alm', 'aih');
    highlightsTabButton.classList.replace('axq', 'axu');

    originalTabPanel.setAttribute('aria-hidden', 'true');
    originalTabPanel.setAttribute('tabindex', '-1');
    originalTabPanel.removeAttribute('data-selected');

    highlightsTabPanel.removeAttribute('aria-hidden');
    highlightsTabPanel.setAttribute('tabindex', '0');
    highlightsTabPanel.setAttribute('data-selected', '');

    textarea.value = highlightsText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

// Function to switch to the original tab
function switchToOriginalTab() {
    originalTabButton.setAttribute('aria-selected', 'true');
    originalTabButton.setAttribute('tabindex', '0');
    originalTabButton.classList.replace('alm', 'aih');
    originalTabButton.classList.replace('axq', 'axu');

    highlightsTabButton.setAttribute('aria-selected', 'false');
    highlightsTabButton.setAttribute('tabindex', '-1');
    highlightsTabButton.classList.replace('aih', 'alm');
    highlightsTabButton.classList.replace('axu', 'axq');

    highlightsTabPanel.setAttribute('aria-hidden', 'true');
    highlightsTabPanel.setAttribute('tabindex', '-1');
    highlightsTabPanel.removeAttribute('data-selected');

    originalTabPanel.removeAttribute('aria-hidden');
    originalTabPanel.setAttribute('tabindex', '0');
    originalTabPanel.setAttribute('data-selected', '');

    textarea.value = originalText; // Update original textarea with original text
    updateWordCount(); // Update word count when switching back to original tab
}

function switchToSummaryTab() {
    originalTabButton.setAttribute('aria-selected', 'false');
    originalTabButton.setAttribute('tabindex', '-1');
    originalTabButton.classList.replace('aih', 'alm');
    originalTabButton.classList.replace('axu', 'axq');

    summaryTabButton.setAttribute('aria-selected', 'true');
    summaryTabButton.setAttribute('tabindex', '0');
    summaryTabButton.classList.replace('alm', 'aih');
    summaryTabButton.classList.replace('axq', 'axu');

    originalTabPanel.setAttribute('aria-hidden', 'true');
    originalTabPanel.setAttribute('tabindex', '-1');
    originalTabPanel.removeAttribute('data-selected');

    summaryTabPanel.removeAttribute('aria-hidden');
    summaryTabPanel.setAttribute('tabindex', '0');
    summaryTabPanel.setAttribute('data-selected', '');

    updateWordCount();
}

function switchToInsightsTab() {
    
}

mainFacade();*/

import { getWordFrequency, displayWordFrequency } from './highlights.js';
import { getAndDisplaySummary } from './summary.js';

// Select the necessary elements
const textarea = document.getElementById('comment');
const wordCountDisplay = document.getElementById('word-count-displayed');
const form = document.getElementById('text-form');
const originalTabButton = document.getElementById('headlessui-tabs-tab-:r0:');
const highlightsTabButton = document.getElementById('headlessui-tabs-tab-:r1:');
const summaryTabButton = document.getElementById('headlessui-tabs-tab-:r5:');
const insightsTabButton = document.getElementById('headlessui-tabs-tab-:r8:');

const originalTabPanel = document.getElementById('headlessui-tabs-panel-:r2:');
const highlightsTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');
const summaryTabPanel = document.getElementById('headlessui-tabs-panel-:r7:');
const insightsTabPanel = document.getElementById('headlessui-tabs-panel-:r10:');

let originalText = ""; // Variable to store the original text
let highlightsText = ""; // Variable to store the word cloud text
let summaryText = ""; // Variable to store the summary text

function mainFacade() {
    // Calls word count function and ties to text area input
    textarea.addEventListener('input', updateWordCount);
    form.addEventListener('submit', handleSubmit);
    originalTabButton.addEventListener('click', switchToOriginalTab);
    highlightsTabButton.addEventListener('click', switchToHighlightsTab);
    summaryTabButton.addEventListener('click', switchToSummaryTab);
    insightsTabButton.addEventListener('click', switchToInsightsTab);
}

function updateWordCount() {
    const text = textarea.value;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    wordCountDisplay.textContent = `Word Count: ${wordCount}`;
}

async function handleSubmit(event) {
    event.preventDefault();
    originalText = textarea.value; // Store the original text

    const wordFrequency = getWordFrequency(originalText);
    displayWordFrequency(wordFrequency);
    highlightsText = highlightsTabPanel.textContent; // Store the word cloud text

    // Get and display summary
    summaryText = await getAndDisplaySummary(originalText);
    summaryTabPanel.innerHTML = summaryText; // Display the summary in the summary tab panel
}

function switchToHighlightsTab() {
    switchTab(highlightsTabButton, highlightsTabPanel);
}

function switchToOriginalTab() {
    switchTab(originalTabButton, originalTabPanel);
    textarea.value = originalText; // Update textarea with original text
    updateWordCount(); // Update word count
}

function switchToSummaryTab() {
    switchTab(summaryTabButton, summaryTabPanel);
}

function switchToInsightsTab() {
    switchTab(insightsTabButton, insightsTabPanel);
}

function switchTab(tabButton, tabPanel) {
    document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
        tab.classList.replace('aih', 'alm');
        tab.classList.replace('axu', 'axq');
    });

    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('tabindex', '-1');
        panel.removeAttribute('data-selected');
        panel.style.display = 'none';
    });

    tabButton.setAttribute('aria-selected', 'true');
    tabButton.setAttribute('tabindex', '0');
    tabButton.classList.replace('alm', 'aih');
    tabButton.classList.replace('axq', 'axu');

    tabPanel.removeAttribute('aria-hidden');
    tabPanel.setAttribute('tabindex', '0');
    tabPanel.setAttribute('data-selected', '');
    tabPanel.style.display = 'block';
}

mainFacade();



