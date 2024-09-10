import fasttext
import esprima
import logging
import colorlog

# Configure logger for Static Model (Green)
static_handler = colorlog.StreamHandler()
static_formatter = colorlog.ColoredFormatter(
    "%(log_color)s[Static Model]%(reset)s: %(message)s",
    log_colors={
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'DEBUG': 'cyan',
    }
)
static_handler.setFormatter(static_formatter)
static_logger = colorlog.getLogger('static_logger')
static_logger.addHandler(static_handler)
static_logger.setLevel(logging.DEBUG)
static_logger.propagate = False  #to prevent double messages

class StaticDetector:
  def __init__(self, model_path):
    try:
      self.model = fasttext.load_model(model_path)
      static_logger.info(f"Model successfully loaded from {model_path}")
    except FileNotFoundError:
      static_logger.error(f"Model file not found: {model_path}")
      return
    
  def __parse(self, script):
    try:
      return esprima.parseScript(script)
    except:
      try:
        return esprima.parseModule(script)
      except:
        return None

  def __dfs(self, ast):
    stack = [ast]
    tokens = []

    while stack:
      node = stack.pop()
      if isinstance(node, esprima.nodes.Node):
        if hasattr(node, 'type'):
          tokens.append(node.type)

        for _, value in reversed(list(vars(node).items())):
          if isinstance(value, list):
            for item in reversed(value):
              if isinstance(item, esprima.nodes.Node):
                stack.append(item)
          elif isinstance(value, esprima.nodes.Node):
            stack.append(value)

    return tokens
  
  def __tokenize(self, script):
    ast = self.__parse(script)
    tokens = self.__dfs(ast)
    return tokens
  
  def __predict(self, script):
    tokens = self.__tokenize(script)
    if not tokens:
      return None
    pred = self.model.predict(' '.join(tokens))
    return {
      'prediction': pred[0][0].replace('__label__', ''),
      'confidence': pred[1][0]
    }
  
  def predict(self, scripts):
    static_logger.info(f"Running static model on {len(scripts)} js files")
    preds = []
    for script in scripts:
      pred = self.__predict(script)
      preds.append(pred)
    return preds