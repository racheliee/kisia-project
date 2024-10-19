document.querySelector(".feedback").addEventListener("click", function() {
  chrome.storage.local.get("click_url", function(result) {
    if (result.click_url) {
      var linkUrl = JSON.parse(result.click_url);

      const feedbackData = {
        url: linkUrl,
        predicted: false,
        source: 1
      };

      fetch('http://43.203.239.57:8000/user/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      }).then(response => {
        if (response.ok) {
          console.log('Feedback sent successfully');
          alert('Feedback sent successfully');
        } else {
          console.error('Failed to send feedback');
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  });
});
