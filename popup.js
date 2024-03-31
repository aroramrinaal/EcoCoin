// popup.js
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('check').addEventListener('click', function() {
    // Update status text
    document.getElementById('status').style.display = 'block';
    document.getElementById('status').textContent = 'Scanning the page...';

    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];

      // Check if it's not a chrome:// URL
      if (!activeTab.url.startsWith('chrome://')) {
        // Execute a script to search for the word "sustainability"
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: searchForKeyword, // Function to execute
          args: ['sustainability'] // Arguments for the function
        }, (results) => {
          // If the word is found, let the user know
          if (results && results[0] && results[0].result) {
            document.getElementById('status').textContent = 'The word "sustainability" was found on the page!';
          } else {
            document.getElementById('status').textContent = 'The word "sustainability" was not found on the page.';
          }
        });
      }
    });
  });
});

// Function to search for a keyword on the page
function searchForKeyword(keyword) {
  const regex = new RegExp(keyword, 'i'); // Case insensitive search
  const bodyText = document.body.innerText;
  return regex.test(bodyText);
}
