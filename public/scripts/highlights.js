'use strict';

// Function to fetch and display the definition of a word
function getShortDef(word) {
  console.log('Fetching definition for:', word); // Log the word being fetched
  const API_BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
  const APIkey = '?key=02cbb064-d9af-461a-8d16-30dadea354c2';

  const url = API_BASE_URL + word + APIkey;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data); // Log the full response
      if (Array.isArray(data) && data.length > 0 && data[0].shortdef && data[0].shortdef.length > 0) {
        const definition = data[0].shortdef[0];
        displayDefinition(word, definition);
      } else {
        displayDefinition(word, 'Definition not found');
      }
    })
    .catch(error => console.log('Error fetching definition:', error));
}

// Function to display the definition in the highlights section
function displayDefinition(word, definition) {
    console.log('Displaying definition for:', word);
  
    // Create a text node for the definition
    const definitionTextNode = document.createTextNode(`: ${definition}`);
  
    // Find the parent element of the clicked word
    const wordElem = document.querySelector(`.clickable-word[data-word="${word}"]`);
    if (wordElem) {
      // Append the definition text node after the clicked word
      wordElem.parentNode.insertBefore(definitionTextNode, wordElem.nextSibling);
    } else {
      console.error('Clicked word element not found');
    }
  }

// Function to calculate word frequency
function getWordFrequency(text) {
  const ignoreWords = ["and", "or", "but", "nor", "for", "so", "yet", "I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs", "the", "to", "a", "in", "of", "on", "too", "s", "is", "not", "about", "after", "above", "at", "by", "beside", "just", "most", "more", "less", "least", "with", "from", "that", "as", "this", "those", "huge", "big", "large", "small", "little", "an"];
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
    const highlightsTabPanel = document.getElementById('headlessui-tabs-panel-:r3:');
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
      return `<p style="font-size:${fontSize}px;"><strong class="clickable-word" data-word="${word}">${word}</strong></p>`;
    }).join('\n');
  
    highlightsTabPanel.innerHTML = highlightsPanelContent;
  
    // Add event listeners to words
    document.querySelectorAll('.clickable-word').forEach(wordElem => {
      wordElem.addEventListener('click', (event) => {
        const clickedWord = event.target.dataset.word;
        console.log('Word clicked:', clickedWord);
        getShortDef(clickedWord);
      });
    });
  }

export { getWordFrequency, displayWordFrequency, getShortDef };