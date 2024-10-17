from flask import Flask, request, jsonify
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({
            "statusCode": 400,
            "message": "Bad Request",
            "error": "Missing username or password"
        }), 400

    username = data['username']
    password = data['password']

    # Simulate login behavior
    if username == "example" and password == "example":
        return jsonify({
            "statusCode": 200,
            "message": "Successfully signed in",
            "data": {
                "access_token": "mockAccessToken",
                "refresh_token": "mockRefreshToken"
            }
        }), 200
    elif username != "example":
        return jsonify({
            "message": "loginId is incorrect",
            "error": "Unauthorized",
            "statusCode": 401
        }), 401
    elif password != "example":
        return jsonify({
            "message": "password is incorrect",
            "error": "Unauthorized",
            "statusCode": 401
        }), 401

    return jsonify({
        "statusCode": 500,
        "message": "Unknown error"
    }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

# http://43.203.239.57:3000/