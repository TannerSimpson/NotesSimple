// Function to count words
const countWords = () => {
    const textarea = document.getElementById("enter-notes");
    // Get the text content of the textarea and trim leading/trailing spaces
    const text = textarea.value.trim();
    // Split the text into an array of words using regular expression
    // The regular expression /\s+/ matches one or more whitespace characters
    // Filter out empty strings to count only words with actual characters
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    return wordCount;
};

// Function to display the word count
const displayWordCount = () => {
    const wordCount = countWords();
    const wordCountDisplay = document.getElementById("word-count-results");
    // Update the text content of the span to display the word count
    wordCountDisplay.textContent = "Word count: " + wordCount;
};

// Function to be called when the submit button is clicked
const submitButtonClick = () => {
    displayWordCount();
};
const submitButton = document.getElementById("submit");
// Assign the submitButtonClick function to the button's onclick event
submitButton.onclick = submitButtonClick;