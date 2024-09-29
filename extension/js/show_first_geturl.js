document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("click_url", function (result) {
    if (result.click_url) {
      let linkUrl;
      try {
        linkUrl = JSON.parse(result.click_url); // URL 파싱
        document.querySelector(".url-text").textContent = linkUrl;
      } catch (error) {
        console.error("Error parsing URL:", error);
        return; // 파싱 오류 시 함수 종료
      }
    }
  });
});
