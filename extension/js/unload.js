document.querySelector('.exitButton').addEventListener('click', function() {
  // chrome.storage.local의 모든 데이터를 지웁니다.
  chrome.storage.local.clear(function() {
    console.log('모든 데이터가 삭제되었습니다.');
  });

  // 팝업 창을 닫습니다.
  window.close();
});
