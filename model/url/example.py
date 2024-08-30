from url_detector import URLDetector

detector = URLDetector('/Users/iseung-u/work/kisia-url-detection/url_detector/model')
url = "section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0"
pred = detector.predict(url)
print(f"{pred['url']}")
print(f"{pred['prediction']}")
print(f"{pred['confidence']}")