import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import random
import os
import sys

def generate_filename(base_name):
    random_number = random.randint(100000, 999999)
    return f"{base_name}_{random_number}.js"

def save_js_content(content, directory, base_name):
    filename = generate_filename(base_name)
    filepath = os.path.join(directory, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return filepath

def scrape_and_save_js_files(url, directory="js_files"):
    # no dir -> make dir
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    base_name = urlparse(url).netloc.split('.')[0]

    try:
        response = requests.get(url)
        response.raise_for_status()  # HTTP error check
    except requests.exceptions.RequestException as e:
        print("url is not valid.")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')

    # add try catch
    for script in soup.find_all('script'):
        if script.string:  
            js_code = script.string
            filepath = save_js_content(js_code, directory, base_name)
            print(f"{url} -> {filepath}")
        elif script.get('src'): 
            src_url = urljoin(url, script['src'])
            try:
                js_response = requests.get(src_url)
                js_response.raise_for_status() # HTTP error check
                filepath = save_js_content(js_response.text, directory, base_name)
                print(f"{src_url} -> {filepath}")
            except requests.exceptions.RequestException:
                print(f"Error from {src_url}")

if __name__ == "__main__":
    if len(sys.argv) > 1:  
        url = sys.argv[1]
        scrape_and_save_js_files(url)
    else:
        print("Usage: python [filename].py [URL]")
