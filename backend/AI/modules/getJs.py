import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import random
import os
import sys
import subprocess
from datetime import datetime
import logging
import colorlog
from typing import Final

# Configure logger for JS Scraper (Yellow)
js_scraper_handler = colorlog.StreamHandler()
js_scraper_formatter = colorlog.ColoredFormatter(
    "%(log_color)s[Extracting JS]%(reset)s: %(message)s",
    log_colors={
        'INFO': 'cyan',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'DEBUG': 'cyan',
    }
)
js_scraper_handler.setFormatter(js_scraper_formatter)
js_scraper_logger = colorlog.getLogger('js_scraper_logger')
js_scraper_logger.addHandler(js_scraper_handler)
js_scraper_logger.setLevel(logging.DEBUG)
js_scraper_logger.propagate = False  #to prevent double messages

cwd: Final[str] = os.getcwd()

def generate_foldername():
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    random_number = random.randint(10000000, 99999999)
    js_scraper_logger.info(f"Generated folder name: {current_time}_{random_number}")
    return f"{current_time}_{random_number}"


# formats the js file using Prettier
def formatting_with_prettier(filepath):
    # comeback: check why prettier only works in the js_script_files directory
    os.chdir('./js_script_files')

    try:
        # logging.info(f"Formatting {filepath} with Prettier")
        subprocess.run(['npx', '-p', 'node@14', 'prettier', '--write', filepath], check=True)
        os.chdir(cwd)  # return to the original directory
    except subprocess.CalledProcessError:
        js_scraper_logger.error(f"Prettier error in {filepath}")
        os.chdir(cwd)  # return to the original directory

# helper function to save js content to a file
def save_js_content(content, directory, count):
    dir_name = directory.split('/')[-2]
    # logging.info(f"Saving js content to {dir_name}")
    filename = f"{dir_name}_{count}.js"
    filepath = os.path.join(directory, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    formatting_with_prettier(filepath)

    return filepath


# scrape the js files from the given url and save them to the directory
# receives absolute path of the directory to save the js files
def scrape_and_save_js_files(url, directory="../js_script_files/js_files"):
    js_scraper_logger.info(f"Scraping {url} and saving js files to {directory}")

    if not os.path.exists(directory):
        os.makedirs(directory)

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        js_scraper_logger.error("URL is not valid.")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    count = 1  # 파일 카운트 시작

    for script in soup.find_all('script'):
        if script.string:
            js_code = script.string
            filepath = save_js_content(js_code, directory, count)
            # logging.info(f"{url} -> {filepath}")
            count += 1
        elif script.get('src'):
            src_url = urljoin(url, script['src'])
            try:
                js_response = requests.get(src_url)
                js_response.raise_for_status()
                filepath = save_js_content(js_response.text, directory, count)
                # logging.info(f"{src_url} -> {filepath}")
                count += 1
            except requests.exceptions.RequestException:
                js_scraper_logger.error(f"Error from {src_url}")
                
    js_scraper_logger.info(f"Extracted {count} js files from {url}")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        js_scraper_logger.info(f"Scraping JS files from {url}")
        foldername = generate_foldername()
        scrape_and_save_js_files(url, foldername)
    else:
        js_scraper_logger.warning("Usage: python [filename].py [URL]")
