from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import AutoTokenizer, pipeline
from urllib.parse import urlparse

tokenizer = AutoTokenizer.from_pretrained("./url_based/url_tokenizer")
model = ORTModelForSequenceClassification.from_pretrained("./url_based/url_detector")

classifier = pipeline(
    task="text-classification",
    model=model,
    tokenizer=tokenizer,
    top_k=None,
)

def predict(url):
  domain = urlparse(url).netloc
  return classifier(domain)