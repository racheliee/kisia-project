from flask import Flask, request, jsonify
import modules.url_check as url_check
import logging
from dotenv import load_dotenv
from flask_cors import CORS
import time

load_dotenv()  # Load environment variables

app = Flask(__name__)
cors = CORS(app)

logging.basicConfig(level=logging.DEBUG)


@app.route('/url/ai', methods=['POST'])
def check_url():
    # sleep for 10 seconds
    time.sleep(10)

    data = request.get_json()

    if data is None:
        return jsonify({
            "statusCode": 400,
            "message": "Invalid request"
        })

    url = data.get('url')

    if url is None:
        return jsonify({
            "statusCode": 400,
            "message": "No URL provided"
        })

    logging.info(f"Checking URL: {url}")
    
    try:
        result = url_check.check_url()
        logging.info(f"Result: {result}")
        return jsonify({  # todo: fix result
            "statusCode": 200,
            "message": "Successfully completed URL check",
            "data": {
                "url": url,
                "isMalicious": result.get('isMalicious', False), # assume result is a dict with key 'isMalicious'
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
