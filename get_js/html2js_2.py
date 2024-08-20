import os
from bs4 import BeautifulSoup
import random
import datetime

# HTML 파일 읽기
with open('./site_js/index.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# BeautifulSoup 객체 생성
soup = BeautifulSoup(html_content, 'html.parser')

# 모든 <script> 태그 찾기
scripts = soup.find_all('script')

# 스크립트 태그가 포함된 텍스트를 각각의 파일로 저장
for index, script in enumerate(scripts):
    if script.string:  # script 태그 내에 텍스트가 있는 경우에만 처리
        # 현재 날짜시간과 랜덤 문자열 생성
        current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        random_string = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=16))
        filename = f"{current_time}_{random_string}.js"
        
        # 파일 저장 경로 설정
        filepath = os.path.join('./site_js/', filename)
        
        # 파일 쓰기
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(script.string)
    
os.remove('./site_js/index.html')

print("스크립트 파일이 저장되었습니다.")
