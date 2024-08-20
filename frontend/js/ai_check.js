document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader"); // 로딩 인디케이터 접근

  chrome.storage.local.get("click_url", function (result) {
    if (result.click_url) {
      let linkUrl;
      try {
        linkUrl = JSON.parse(result.click_url); // URL 파싱
        document.getElementById("last_url").textContent = linkUrl;
      } catch (error) {
        console.error("Error parsing URL:", error);
        return; // 파싱 오류 시 함수 종료
      }

      loader.style.display = "block"; // 로더 표시

      fetch("http://52.79.111.30:51507/index.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          const serverRecData = data; // 응답 데이터

          if (serverRecData.data && serverRecData.data.isMalicious) {
            window.location.href = "/page/ai_detected.html";
          } else {
            window.location.href = "/page/ai_undetected.html";
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          loader.style.display = "none"; // 오류 발생 시 로더 숨김
        });
    }
  });
});
