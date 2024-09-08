from flask import Flask, request, jsonify
from modules.url_model import detector as um
from modules.static_model import detector as sm
import modules.getJs as jsextractor
import logging
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Basic Set up ==================================================
load_dotenv()  # Load environment variables

app = Flask(__name__)
cors = CORS(app)

logging.basicConfig(level=logging.DEBUG)

# Load models ====================================================
url_model_path = './modules/url_model/model-q.onnx'
url_tokenizer_path = './modules/url_model/tokenizer'
static_model_path = './modules/static_model/static-model.bin'

url_model = um.URLDetector(url_model_path, url_tokenizer_path)
static_model = sm.StaticDetector(static_model_path)

# create folder to store js files =================================
js_storage_path = "js_script_files" # where all the js files are stored
base_folder = os.path.dirname(os.path.abspath(__file__)) # the abs path of app.py

js_path = "js_files"

if not os.path.exists(f"{base_folder}/{js_storage_path}"):
    os.makedirs(f"{base_folder}/{js_storage_path}")

# functions to run each ai model =================================
# extract js files and save them to generated folder
def extract_js_files(url):
    global js_path
    js_path = jsextractor.generate_foldername() # warning: may have concurrency issues
    jsextractor.scrape_and_save_js_files(url, f"{base_folder}/{js_storage_path}/{js_path}/") # send abs path

# run url-based model
def run_url_model(url):
    return url_model.predict([url])

def run_static_model():
    path = js_base_path + js_path
    logging.info(f"Path: {path}")
    js_list = os.listdir(path) # returns list of js files in the folder
    entire_js_script = []
    
    for file in js_list:
        logging.info(f"Reading file: {file}")

        with open(path + file, 'r') as f:
            entire_js_script.append(f.read())
    
    logging.info(f"Running static model on {len(entire_js_script)} js files")
    return static_model.predict(entire_js_script)

def run_dynamic_model():
    pass
    
# endpoint for url ai-check ======================================
@app.route('/url/ai', methods=['POST'])
def process_url():
    data = request.get_json()

    if data is None: # if no data is provided
        return jsonify({
            "statusCode": 400,
            "message": "Invalid request"
        })

    url = data.get('url')

    if url is None: # if no url is provided
        return jsonify({
            "statusCode": 400,
            "message": "No URL provided"
        })

    logging.info(f"Checking URL: {url}")
    
    try:
        extract_js_files(url) # js script extraction
        urlres = run_url_model(url)
        # staticres = run_static_model()
        # dynamicres = url_model.check_dynamic()
        
        # final_res = urlres and staticres
        
        return jsonify({  # todo: fix result
            "statusCode": 200,
            "message": "Successfully completed URL check",
            "data": {
                "url": url,
                "isMalicious": True, # assume result is boolean (currently hardcoded to True)
                "source": 2,
            }
        }), 200
    except Exception as e:
        logging.error(f"Error checking url: {e}")
        return jsonify({
            "statusCode": 500,
            "message": "Internal server error"
        }), 500




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
