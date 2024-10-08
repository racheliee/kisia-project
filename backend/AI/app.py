from flask import Flask, request, jsonify
import psycopg2
import numpy as np
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


# Database Connection ===========================================
try:
    db_conn = psycopg2.connect(
        host=(os.getenv("DB_HOST")),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
except:
    app_logger.error("Error connecting to the database")

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

    preds = static_model.predict(entire_js_script)
    
    return [p for p in preds if p is not None]


# run dynamic model
def run_dynamic_model():
    preds = dynamic_model.predict(js_path, base_folder, f"{base_folder}/{js_storage_path}", jalangi_path)
    return [p for p in preds if p is not None]


# combine results from all models =================================
def combine_results(urlres, sres, dres):
    # combine dynamic and static results
    # result example: [{'prediction': 'benign', 'confidence': 0.69}, {'prediction': 'benign', 'confidence': 1.0}, {'prediction': 'benign', 'confidence': 0.8694769397269397},...]

    # 정적 모델과 동적 모델의 js 분석 결과 갯수가 다를 수 있어서 보류
    # s_d_res = []
    # for i in range(len(sres)):
    #     s_d_res.append(
    #         dynamic_weight * (dres[i]['confidence'] if dres[i]['prediction'] == 'malicious' else 1 - dres[i]['confidence']) +
    #         static_weight * (sres[i]['confidence'] if sres[i]['prediction']
    #                          == 'malicious' else 1 - sres[i]['confidence'])
    #     )

    # combine url and s_d_res
    # combined_pred = 0.1 * (urlres[0]['confidence'] if urlres[0]['prediction']
    #                        == 'malicious' else 1 - urlres[0]['confidence']) + 0.9 * max(s_d_res)
    
    # url, static, dynamic 결과가 비어있으면 False, 0.0 반환
    if not urlres or not sres or not dres:
        app_logger.error("Error combining results: Empty results")
        return False, 0.0

    # confidence 최대 값으로 prediction 결정
    s_max = max(sres, key=lambda x: x['confidence'])
    d_max = max(dres, key=lambda x: x['confidence'])

    s_conf = s_max['confidence'] if s_max['prediction'] == 'malicious' else 1 - \
        s_max['confidence']
    d_conf = d_max['confidence'] if d_max['prediction'] == 'malicious' else 1 - \
        d_max['confidence']

    combined_pred = 0.1 * (urlres[0]['confidence'] if urlres[0]['prediction'] == 'malicious' else 1 -
                           urlres[0]['confidence']) + 0.9 * (dynamic_weight * d_conf + static_weight * s_conf)

    app_logger.info(f"Combined prediction: {combined_pred}")

    return combined_pred >= 0.5, combined_pred


# send url to database ============================================
def get_confidence_range(confidence_score):
    confidence_score = max(0.0, min(1.0, confidence_score))

    lower_bound = int(confidence_score * 10) / 10.0
    upper_bound = lower_bound + 0.1

    return f"[{lower_bound:.1f}-{upper_bound:.1f})"


def send_to_database(url, final_res, confidence_score, urlres, staticres, dynamicres):
    # get the final results of the models
    url_aggregated = True if urlres[0]['prediction'] == 'malicious' else False

    # choose the maximum confidence score and take its prediction
    static_aggregated = True if max(staticres, key=lambda x: x['confidence'])['prediction'] == 'malicious' else False
    dynamic_aggregated = True if max(dynamicres, key=lambda x: x['confidence'])['prediction'] == 'malicious' else False

    app_logger.info(f"Final results: URL: {url_aggregated}, Static: {static_aggregated}, Dynamic: {dynamic_aggregated}")

    # Convert numpy.bool_ to Python bool (if necessary)
    final_res = bool(final_res) if isinstance(final_res, np.bool_) else final_res
    url_aggregated = bool(url_aggregated) if isinstance(url_aggregated, np.bool_) else url_aggregated
    static_aggregated = bool(static_aggregated) if isinstance(static_aggregated, np.bool_) else static_aggregated
    dynamic_aggregated = bool(dynamic_aggregated) if isinstance(dynamic_aggregated, np.bool_) else dynamic_aggregated

    # url query
    sql_url_query = """
    INSERT INTO "Url" (url, "isMalicious", "detectedBy", "urlResult", "staticResult", "dynamicResult", "accessCount", "confidenceScore", "createdAt", "updatedAt")
    VALUES (%s, %s, 'AI_MODEL', %s, %s, %s, 1, %s, NOW(), NOW())
    ON CONFLICT (url)
    DO UPDATE SET
        "isMalicious" = EXCLUDED."isMalicious",
        "detectedBy" = EXCLUDED."detectedBy",
        "urlResult" = EXCLUDED."urlResult",
        "staticResult" = EXCLUDED."staticResult",
        "dynamicResult" = EXCLUDED."dynamicResult",
        "confidenceScore" = EXCLUDED."confidenceScore",
        "accessCount" = "Url"."accessCount" + 1,
        "updatedAt" = NOW();
    """
    
    # confidence score hit rate query
    sql_hitrate_query = """
    INSERT INTO "ConfidenceHitRate" ("confidenceRange", "count", "updatedAt")
    VALUES (%s, 1, NOW())
    ON CONFLICT ("confidenceRange")
    DO UPDATE SET
        "count" = "ConfidenceHitRate"."count" + 1,
        "updatedAt" = NOW();
    """
    
    cur = db_conn.cursor()

    cur.execute(sql_url_query, (url, final_res, url_aggregated, static_aggregated, dynamic_aggregated, confidence_score))
    cur.execute(sql_hitrate_query, (get_confidence_range(confidence_score),))
    db_conn.commit()
    cur.close()

    app_logger.info("Url saved to the database and confidence hit rate updated")


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

        final_res, confidence_score = combine_results(
            urlres, staticres, dynamicres)

        final_res = bool(final_res) if isinstance(
            final_res, np.bool_) else final_res

        send_to_database(url, final_res, confidence_score,
                         urlres, staticres, dynamicres)  # save to the database

        return jsonify({
            "statusCode": 200,
            "message": "Successfully completed URL check",
            "data": {
                "url": url,
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
