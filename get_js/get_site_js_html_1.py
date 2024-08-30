import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import sys

def download_file(url, session, save_path='.'):
    # URL에서 파일 이름 추출, 쿼리 파라미터 제거
    local_filename = url.split('/')[-1].split('?')[0]
    if not local_filename or '/' in local_filename:
        local_filename = 'index.html'
    
    local_filepath = os.path.join(save_path, local_filename)
    if not os.path.exists(local_filepath):
        try:
            with session.get(url, stream=True) as r:
                r.raise_for_status()
                with open(local_filepath, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
            print(f"Downloaded and saved {local_filename} to {save_path}")
        except requests.RequestException as e:
            print(f"Failed to download {url}: {e}")
    return local_filepath

def get_all_resources(url):
    # 세션 시작
    with requests.Session() as session:
        response = session.get(url)
        response.raise_for_status()
        
        # 도메인을 기반으로 저장 경로 생성
        domain = url.split('//')[-1].split('/')[0]
        save_path = os.path.join('.', domain)
        os.makedirs(save_path, exist_ok=True)
        
        # 메인 페이지의 HTML을 파일로 저장
        html_path = os.path.join(save_path, 'index.html')
        with open(html_path, 'w', encoding='utf-8') as file:
            file.write(response.text)
        print(f"Saved HTML source to {html_path}")
        
        # HTML 내 모든 script 및 link 태그 파싱
        soup = BeautifulSoup(response.text, 'html.parser')
        resources = [tag.get('src') or tag.get('href') for tag in soup.find_all(['script', 'link']) if tag.get('src') or tag.get('href')]
        
        # 각 리소스를 다운로드
        for resource in resources:
            full_url = urljoin(url, resource)
            download_file(full_url, session, save_path)

        # 필요 없는 파일 제거
        clean_unnecessary_files(save_path)

def clean_unnecessary_files(save_path):
    # 지정된 폴더 내의 파일을 검사하여 조건에 맞지 않는 파일 삭제
    for file in os.listdir(save_path):
        file_path = os.path.join(save_path, file)
        if re.search(r'\.js($|\?)', file) or file == 'index.html':
            continue
        os.remove(file_path)
        print(f"Deleted: {file_path}")
    os.rename(save_path, 'site_js')


def main():
    if len(sys.argv) > 1:
        main_url = sys.argv[1]
        get_all_resources(main_url)
    else:
        print("No URL provided. Usage: python script_name.py <URL>")

if __name__ == "__main__":
    main()
