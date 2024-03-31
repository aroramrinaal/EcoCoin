// popup.js
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('check').addEventListener('click', function() {
      // Update status text
      document.getElementById('status').textContent = 'Scanning the page...';
  
      // Query the active tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let activeTab = tabs[0];
        
        // Inject the script into the current tab
        chrome.scripting.executeScript({
          target: {tabId: activeTab.id},
          func: changeBackgroundColor,
        }, () => {
          // Once the script has been injected, update the status text
          document.getElementById('status').textContent = 'Page scanned. Eco-friendly options are now highlighted!';
        });
      });
    });
  });
