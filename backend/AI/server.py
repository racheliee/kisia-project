from flask import Flask, request, jsonify
import modules.url_checker as url_checker
import logging

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
    
    result = url_checker.check_url(url)
    
    # return result