from flask import Flask, request, jsonify
import modules.url_check as url_check
import logging
from dotenv import load_dotenv

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

@app.route('url/ai', method=['POST'])
def check_url():
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
    
    result = url_check.check_url(url)
    
    #  todo: fix result
    return jsonify({
        "statusCode": 200,
        "message": "Successfully completed url_check",
        "isMalicious": True
    })
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)