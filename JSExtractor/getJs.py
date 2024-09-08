import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import random
import os
import sys
import subprocess
from datetime import datetime

def generate_foldername():
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    random_number = random.randint(10000000, 99999999)
    return f"{current_time}_{random_number}"

def formatting_with_prettier(filepath):
    try:
        subprocess.run(['prettier', '--write', filepath], check=True)
    except subprocess.CalledProcessError:
        print(f"Prettier error in {filepath}")

def save_js_content(content, directory, count):
    filename = f"{directory}_{count}.js"
    filepath = os.path.join(directory, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    formatting_with_prettier(filepath)
    
    return filepath

def scrape_and_save_js_files(url, directory="js_files"):
    if not os.path.exists(directory):
        os.makedirs(directory)

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("URL is not valid.")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')
    count = 1  # 파일 카운트 시작
    
    for script in soup.find_all('script'):
        if script.string:
            js_code = script.string
            filepath = save_js_content(js_code, directory, count)
            print(f"{url} -> {filepath}")
            count += 1
        elif script.get('src'):
            src_url = urljoin(url, script['src'])
            try:
                js_response = requests.get(src_url)
                js_response.raise_for_status()
                filepath = save_js_content(js_response.text, directory, count)
                print(f"{src_url} -> {filepath}")
                count += 1
            except requests.exceptions.RequestException:
                print(f"Error from {src_url}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        foldername = generate_foldername()
        scrape_and_save_js_files(url, foldername)
    else:
        print("Usage: python [filename].py [URL]")
