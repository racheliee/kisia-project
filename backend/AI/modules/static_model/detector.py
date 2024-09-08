import fasttext
import esprima

class StaticDetector:
  def __init__(self, model_path):
    self.model = fasttext.load_model(model_path)
    
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
    preds = []
    for script in scripts:
      pred = self.__predict(script)
      preds.append(pred)
    return preds