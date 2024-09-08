import torch
from transformers import DistilBertTokenizer
import onnxruntime as ort #type: ignore

class URLDetector:
  def __init__(self, model_path, tok_path, device=None):
    self.session = ort.InferenceSession(model_path)
    self.tokenizer = DistilBertTokenizer.from_pretrained(tok_path)
    
  def __tokenize(self, url, max_length=512):
    return self.tokenizer(url, truncation=True, padding=True, max_length=max_length, return_tensors="np")
  
  def __predict(self, url):
    inputs = self.__tokenize(url)
    input_ids = inputs["input_ids"]
    outputs = self.session.run(None, {"input_ids": input_ids})
    logits = outputs[0]
    
    probs = torch.softmax(torch.tensor(logits), dim=1)
    pred = torch.argmax(probs, dim=1).item()
    return {
      "prediction": "malicious" if pred == 1 else "benign",  # pred가 1이면 'malicious', 0이면 'benign'
      "confidence": probs[0, pred].item()  # 예측된 클래스에 대한 확률 값
    }    
  
  def predict(self, urls):
    preds = []
    for url in urls:
      url.replace('http://', '').replace('https://', '')
      pred = self.__predict(url)
      preds.append(pred)
    return preds