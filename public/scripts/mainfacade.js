import { getWordFrequency, displayWordFrequency } from './highlights.js';
import { getFrequencySummary, getRankSummary, displayFrequencySummary, displayRankSummary } from './summary.js';

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
let InsightsText = "";

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

    const text_to_summarize = originalText;
    const frequencySummary = getFrequencySummary(text_to_summarize);
    displayFrequencySummary(frequencySummary);
    getRankSummary(text_to_summarize).then(rankSummary => {
        displayRankSummary(rankSummary);
    });
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

mainFacade();



