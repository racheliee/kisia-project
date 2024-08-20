// 전역 변수
const loader = document.querySelector(".loader"); // 로딩 인디케이터 접근

document.addEventListener("DOMContentLoaded", function () {
  // chrome.storage.local에서 click_url 데이터를 가져옴
  chrome.storage.local.get("click_url", function (result) {
    if (result.click_url) {
      // JSON.parse를 통해 원래의 URL 형태로 변환 후 출력
      var linkUrl = JSON.parse(result.click_url);
      document.getElementById("url").textContent = linkUrl;

      // 해당 url 서버로 바디로 보내고 서버 로딩 시간 만큼 로딩 바 돌리기
      loader.style.display = "block";

      // 서버로 URL 전송
      fetch("http://52.79.111.30:51507/index.php", {
        // 서버의 엔드포인트 주소
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: linkUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          responseData = data;
          var serverRecData = responseData;
          // console.log(serverRecData); // 콘솔에 응답 데이터 출력

          chrome.storage.local.set({ serverData: JSON.stringify(data) }, () => {
            // 저장 완료 후 동작 실행
            loader.style.display = "none";

            if (
              serverRecData.data.source === 0 ||
              serverRecData.data.source === 1
            ) {
              if (serverRecData.data.isMalicious) {
                window.location.href = "/page/1st_detected.html";
              } else {
                window.location.href = "/page/1st_undetected.html";
              }
            } else {
              window.location.href = "/page/1st_undetected.html";
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);

          loader.style.display = "none";
        });
    } else {
      document.getElementById("url").textContent = "No URL saved!";
      alert("No URL saved!");
    }
  });
});
