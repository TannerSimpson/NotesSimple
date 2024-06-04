// Import the SummarizerManager from the node-summarizer package
let SummarizerManager = require("node-summarizer").SummarizerManager;

//example text
let text_to_summarize = " ";

// Number of sentences you want in the summary
let number_of_sentences = 5;

// Initialize the SummarizerManager object
let Summarizer = new SummarizerManager(text_to_summarize, number_of_sentences);

// Get the summary using the frequency method
let frequencySummary = Summarizer.getSummaryByFrequency();
console.log("Frequency Summary:");
console.log(frequencySummary.summary);

// Get the reduction percentage as a string for frequency summary
let frequencyReduction = Summarizer.getFrequencyReduction();
console.log("Frequency Reduction Percentage:");
console.log(frequencyReduction.reduction);

// Get the reduction percentage as a decimal for frequency summary
let frequencyReductionAsDec = Summarizer.getFrequencyReductionAsDec();
console.log("Frequency Reduction Percentage (Decimal):");
console.log(frequencyReductionAsDec.dec_reduction);

// Get the summary using the TextRank method
Summarizer.getSummaryByRank().then((rankSummary) => {
    console.log("TextRank Summary:");
    console.log(rankSummary.summary);

    // Get the reduction percentage as a string for TextRank summary
    Summarizer.getRankReduction().then((rankReduction) => {
        console.log("TextRank Reduction Percentage:");
        console.log(rankReduction.reduction);
    });

    // Get the reduction percentage as a decimal for TextRank summary
    Summarizer.getRankReductionAsDec().then((rankReductionAsDec) => {
        console.log("TextRank Reduction Percentage (Decimal):");
        console.log(rankReductionAsDec.dec_reduction);
    });
});

// Get the sentiment value of the text
let sentiment = Summarizer.getSentiment();
console.log("Sentiment Value:");
console.log(sentiment);