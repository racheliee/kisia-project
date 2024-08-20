// // 클래스 이름으로 모든 버튼을 선택합니다.
// var buttons = document.getElementsByClassName("redirectButton");

// // 각 버튼에 클릭 이벤트 리스너를 추가합니다.
// for (var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", function () {
//     window.location.href = "/page/ai_checking.html"; // 여기에 원하는 URL을 입력하세요.
//   });
// }

document
  .querySelector(".redirectButton")
  .addEventListener("click", function () {
    // chrome.storage.local의 모든 데이터를 지웁니다.
    window.location.href = "/page/ai_checking.html";
  });
