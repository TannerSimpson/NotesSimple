/*
// Import the SummarizerManager from the node-summarizer package
let SummarizerManager = require("node-summarizer").SummarizerManager;

//example text
let text_to_summarize = " ";

// Number of sentences you want in the summary
let number_of_sentences = 5;

// Initialize the SummarizerManager object
let Summarizer = new SummarizerManager(text_to_summarize, number_of_sentences);

function getFrequencySummary(text_to_summarize) {
    // Get the summary using the frequency method
    let frequencySummary = Summarizer.getSummaryByFrequency();
    console.log("Frequency Summary:");
    console.log(frequencySummary.summary);
};

function getRankSummary(text_to_summarize) {
// Get the summary using the TextRank method
Summarizer.getSummaryByRank().then((rankSummary) => {
    console.log("TextRank Summary:");
    console.log(rankSummary.summary);
});
};

function displayFrequencySummary() {

}

function displayRankSummary() {
    
}

export {getFrequencySummary, getRankSummary, displayFrequencySummary, displayRankSummary};*/

// let SummarizerManager = require("node-summarizer").SummarizerManager;
const SummarizerManager = require("../src/SummarizerManager");
// const { SummarizerManager } = require("./src/SummarizerManager");


function getFrequencySummary(text_to_summarize) {
    let number_of_sentences = 5; 
    let Summarizer = new SummarizerManager(text_to_summarize, number_of_sentences);
    let frequencySummary = Summarizer.getSummaryByFrequency();
    return frequencySummary.summary;
}

function getRankSummary(text_to_summarize) {
    let number_of_sentences = 5; 
    let Summarizer = new SummarizerManager(text_to_summarize, number_of_sentences);
    return Summarizer.getSummaryByRank().then((rankSummary) => {
        return rankSummary.summary;
    });
}

function displayFrequencySummary(summary) {
    const summaryPanel = document.getElementById('headlessui-tabs-panel-:r7:');
    summaryPanel.innerHTML = `<h2>Frequency Summary</h2><p>${summary}</p>`;
}

function displayRankSummary(summary) {
    const summaryPanel = document.getElementById('headlessui-tabs-panel-:r7:');
    summaryPanel.innerHTML += `<h2>Rank Summary</h2><p>${summary}</p>`;
}

export { getFrequencySummary, getRankSummary, displayFrequencySummary, displayRankSummary };
