import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

class URLDetector:
  def __init__(self, model_path, device=None):
    self.model = DistilBertForSequenceClassification.from_pretrained(model_path)
    self.tokenizer = DistilBertTokenizer.from_pretrained(model_path)
    self.device = device if device else torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    self.model.to(self.device)
    self.model.eval()
    
  def preprocess(self, url, max_length=512):
    return self.tokenizer(url, truncation=True, padding=True, max_length=max_length, return_tensors="pt")
  
  def predict(self, url):
    inputs = self.preprocess(url).to(self.device)
    
    with torch.no_grad():
      outputs = self.model(**inputs)
      probs = torch.softmax(outputs.logits, dim=-1)
      pred = torch.argmax(probs, dim=-1).item()
      
    return {
      "url": url,
      "prediction": "malicious" if pred == 1 else "benign",
      "confidence": probs[0, pred].item()
    }