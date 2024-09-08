import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from static_model import detector as sd
from url_model import detector as ud

url_model_path = 'url_model/model-q.onnx'
url_tokenizer_path = 'url_model/tokenizer'
static_model_path = 'static_model/model.bin'

app = Flask(__name__)
staticDetector = sd.StaticDetector(static_model_path)
urlDetector = ud.URLDetector(url_model_path, url_tokenizer_path)

@app.route('/')
def home():
  return "Model Prediction API is running"

@app.route('/predictURL', methods=['POST'])
def predictURL():
  files = request.files.getlist('files[]')
  urls = []
  for file in files:
    print(file.filename)
    url = file.read().decode('utf-8')
    urls.append(url)
  preds = urlDetector.predict(urls)
  return jsonify(preds)

@app.route('/predictJS', methods=['POST'])
def predictJS():
  files = request.files.getlist('files[]')
  scripts = []
  for file in files:
    print(file.filename)
    script = file.read().decode('utf-8')
    scripts.append(script)
  preds = staticDetector.predict(scripts)
  return jsonify(preds)

if __name__ == '__main__':
  app.run(debug=True)