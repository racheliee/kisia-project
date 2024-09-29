chrome.runtime.onInstalled.addListener(() => {
  // Context menu 생성
  chrome.contextMenus.create({
    id: "sendUrl",
    title: "Send Link URL to Popup",
    contexts: ["link"],
  });

    // Extension 아이콘 클릭 시 test_page.html 열기
    chrome.action.onClicked.addListener(() => {
      chrome.tabs.create({ url: 'test_page.html' });
    });

  
  // Context menu 클릭 이벤트 처리
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendUrl" && info.linkUrl) {
      // sessionStorage 대신 chrome.storage.local 사용
      chrome.storage.local.set(
        { click_url: JSON.stringify(info.linkUrl) },
        () => {
          chrome.action.openPopup(); // 팝업 열기
        }
      );
    } else {
      console.error("No valid link URL found.");
    }
  });
});
