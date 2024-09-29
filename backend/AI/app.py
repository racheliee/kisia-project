from flask import Flask, request, jsonify
from modules.url_model import detector as um
from modules.static_model import detector as sm
from modules.dynamic_model import detector as dm
import modules.getJs as jsextractor
import logging
import colorlog
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Basic Set up ==================================================
load_dotenv()  # Load environment variables

# load weights from env
dynamic_weight = float(os.getenv("DYNAMIC_WEIGHT"))
static_weight = float(os.getenv("STATIC_WEIGHT"))

app = Flask(__name__)
cors = CORS(app)

# Logging =======================================================
app_handler = colorlog.StreamHandler()
app_formatter = colorlog.ColoredFormatter(
    "%(log_color)s[Flask app %(asctime)s]%(reset)s: %(message)s",
    datefmt="%H:%M:%S",
    log_colors={
        'INFO': 'cyan',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'DEBUG': 'cyan',
    }
)
app_handler.setFormatter(app_formatter)
app_logger = logging.getLogger('app_logger')
app_logger.addHandler(app_handler)
app_logger.setLevel(logging.DEBUG)
app_logger.propagate = False  # to prevent double messages


# Load models ====================================================
url_model_path = './modules/url_model/model-q.onnx'
url_tokenizer_path = './modules/url_model/tokenizer'
static_model_path = './modules/static_model/static-model.bin'
dynamic_model_path = './modules/dynamic_model/model_dynamic.pkl'
jalangi_path = 'node_modules/jalangi2/src/js/commands/jalangi.js'

url_model = um.URLDetector(url_model_path, url_tokenizer_path)
static_model = sm.StaticDetector(static_model_path)
dynamic_model = dm.DynamicDetector(dynamic_model_path)

# create folder to store js files =================================
js_storage_path = "js_script_files"  # where all the js files are stored
base_folder = os.path.dirname(
    os.path.abspath(__file__))  # the abs path of app.py

js_path = "js_files"

if not os.path.exists(f"{base_folder}/{js_storage_path}"):
    os.makedirs(f"{base_folder}/{js_storage_path}")

# functions to run each ai model =================================
# extract js files and save them to generated folder


def extract_js_files(url):
    global js_path
    # warning: may have concurrency issues
    js_path = jsextractor.generate_foldername()
    jsextractor.scrape_and_save_js_files(
        url, f"{base_folder}/{js_storage_path}/{js_path}/")  # send abs path

# run url-based model


def run_url_model(url):
    return url_model.predict([url])

# run static model


def run_static_model():
    path = f"{base_folder}/{js_storage_path}/{js_path}/"
    js_list = os.listdir(path)  # returns list of js files in the folder
    entire_js_script = []

    for file in js_list:
        # logging.info(f"Reading file: {file}")
        with open(path + file, 'r') as f:
            entire_js_script.append(f.read())

    return static_model.predict(entire_js_script)

# run dynamic model


def run_dynamic_model():
    return dynamic_model.predict(js_path, base_folder, f"{base_folder}/{js_storage_path}", jalangi_path)

# combine results from all models =================================
def combine_results(urlres, sres, dres):
    # combine dynamic and static results
    # result example: [{'prediction': 'benign', 'confidence': 0.69}, {'prediction': 'benign', 'confidence': 1.0}, {'prediction': 'benign', 'confidence': 0.8694769397269397},...]
    s_d_res = []
    for i in range(len(sres)):
        s_d_res.append(
            dynamic_weight * (dres[i]['confidence'] if dres[i]['prediction'] == 'malicious' else 1 - dres[i]['confidence']) +
            static_weight * (sres[i]['confidence'] if sres[i]['prediction']
                             == 'malicious' else 1 - sres[i]['confidence'])
        )
        
    # combine url and s_d_res
    combined_pred = 0.1 * (urlres[0]['confidence'] if urlres[0]['prediction'] == 'malicious' else 1 - urlres[0]['confidence']) + 0.9 * max(s_d_res)
    
    return combined_pred >= 0.5

# send url to database ============================================
def send_to_database(url, result):
    pass

# endpoint for url ai-check ======================================
@app.route('/url/ai', methods=['POST'])
def process_url():
    data = request.get_json()

    if data is None:  # if no data is provided
        return jsonify({
            "statusCode": 400,
            "message": "Invalid request"
        })

    url = data.get('url')

    if url is None:  # if no url is provided
        return jsonify({
            "statusCode": 400,
            "message": "No URL provided"
        })

    app_logger.info(f"Checking URL: {url}")

    try:
        extract_js_files(url)  # js script extraction
        urlres = run_url_model(url)
        staticres = run_static_model()
        dynamicres = run_dynamic_model()

        app_logger.info(f"URL result: {urlres}")
        app_logger.info(f"Static result: {staticres}")
        app_logger.info(f"Dynamic result: {dynamicres}")

        final_res = combine_results(urlres, staticres, dynamicres)
        
        # todo: send result to database

        return jsonify({  # todo: fix result
            "statusCode": 200,
            "message": "Successfully completed URL check",
            "data": {
                "url": url,
                # assume result is boolean (currently hardcoded to True)
                "isMalicious": final_res,
                "source": 2,
            }
        }), 200
    except Exception as e:
        app_logger.error(f"Error checking url: {e}")
        return jsonify({
            "statusCode": 500,
            "message": "Internal server error"
        }), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
