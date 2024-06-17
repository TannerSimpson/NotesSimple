/*import { getWordFrequency, displayWordFrequency } from './highlights.js';

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
    form.addEventListener('submit', switchToSummaryTab);
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

    // Send text to the server for summarization
    const response = await fetch('/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: originalText })
    });

    const data = await response.json();
    summaryText = data.summary;
    summaryTabPanel.innerHTML = summaryText; // Display the summary in the summary tab panel

}

function switchToHighlightsTab() {
    switchTab(highlightsTabButton, highlightsTabPanel);
    updateWordCount();
}

function switchToOriginalTab() {
    switchTab(originalTabButton, originalTabPanel);
    textarea.value = originalText; // Update textarea with original text
    updateWordCount(); // Update word count
}

function switchToSummaryTab() {
    switchTab(summaryTabButton, summaryTabPanel);
    updateWordCount();
}

function switchToInsightsTab() {
    switchTab(insightsTabButton, insightsTabPanel);
    updateWordCount();
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

mainFacade();*/

import { getWordFrequency, displayWordFrequency } from './highlights.js';

// Select the necessary elements
const textarea = document.getElementById('comment');
const wordCountDisplay = document.getElementById('word-count-displayed');
const form = document.getElementById('text-form');
const originalTabButton = document.getElementById('headlessui-tabs-tab-:r0:');
const highlightsTabButton = document.getElementById('headlessui-tabs-tab-:r1:');
const summaryTabButton = document.getElementById('headlessui-tabs-tab-:r5:');
const insightsTabButton = document.getElementById('headlessui-tabs-tab-:r8:');

let originalText = ""; // Variable to store the original text
let highlightsText = ""; // Variable to store the word cloud text
let summaryText = ""; // Variable to store the summary text
let insightsText = ""; // Variable to store the insights text

function mainFacade() {
    // Calls word count function and ties to text area input
    textarea.addEventListener('input', updateWordCount);
    form.addEventListener('submit', handleSubmit, switchToSummaryTab);
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

    // Send text to the server for summarization
    const response = await fetch('/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: originalText })
    });

    const data = await response.json();
    summaryText = data.summary;
}

function switchToHighlightsTab() {
    textarea.value = highlightsText; // Update textarea with highlights text
    updateWordCount(); // Update word count
}

function switchToOriginalTab() {
    textarea.value = originalText; // Update textarea with original text
    updateWordCount(); // Update word count
}

function switchToSummaryTab() {
    textarea.value = summaryText; // Update textarea with summary text
    updateWordCount(); // Update word count
}

function switchToInsightsTab() {
    textarea.value = insightsText; // Update this with the actual insights text
    updateWordCount(); // Update word count
}

mainFacade();

