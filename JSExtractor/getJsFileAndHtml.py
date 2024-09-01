import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import random
import datetime
import os
import csv
import sys

def generate_filename():
    today = datetime.datetime.today().strftime('%Y%m%d')
    random_number = random.randint(100000, 999999)  
    return f"{today}_{random_number}.js"

def save_js_content(content, directory, csv_writer):
    filename = generate_filename()
    filepath = os.path.join(directory, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    single_line_content = content.replace("\n", " ").replace("\r", " ")  # 줄바꿈 제거
    csv_writer.writerow([single_line_content])
    
    return filepath

def scrape_and_save_js_files(url, directory="js_files", csv_filename="js_contents.csv"):
    # 폴더가 없으면 만들기
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    # CSV 파일 생성
    with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        
        # URL에서 HTML 페이지 가져오기
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
    
        # <script> 태그에서 내부 JavaScript 코드 저장 및 CSV에 기록
        for script in soup.find_all('script'):
            if script.string:  # <script> 태그 내에 JS 코드가 직접 있는 경우
                js_code = script.string
                filepath = save_js_content(js_code, directory, csv_writer)
                print(f"Saved inline JS to {filepath}")
            elif script.get('src'):  # <script src="..."> 형태인 경우
                src_url = urljoin(url, script['src'])
                js_response = requests.get(src_url)
                if js_response.status_code == 200:
                    filepath = save_js_content(js_response.text, directory, csv_writer)
                    print(f"Downloaded JS from {src_url} and saved to {filepath}")

if len(sys.argv) > 1:  
    argument = sys.argv[1]
    scrape_and_save_js_files(argument)
else:
    print("사용법 python [파일이름] [URL]")