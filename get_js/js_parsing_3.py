import re
import os
import random
import datetime

input_dir = './site_js'  # 수정된 부분: 입력 경로를 /test 디렉토리로 설정
output_dir = 'code_splitter_result_forder'
os.makedirs(output_dir, exist_ok=True)

def inside_string_or_comment(text, index):
    """ 주석 또는 문자열 내부인지 검사 """
    for match in re.finditer(r'"[^"\\]*(?:\\.[^"\\]*)*"|\'[^\'\\]*(?:\\.[^\'\\]*)*\'|//[^\n]*|/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', text):
        if match.start() <= index < match.end():
            return True
    return False

def extract_functions(js_code):
    """ 강화된 함수 추출 로직 """
    functions = []
    function_pattern = re.compile(r'function\s+(\w+)\s*\((.*?)\)\s*{', re.S)
    matches = function_pattern.finditer(js_code)

    for match in matches:
        start_index = match.start()
        func_name = match.group(1)
        params = match.group(2)
        nested = 1
        i = match.end()
        while nested > 0 and i < len(js_code):
            if js_code[i] == '{' and not inside_string_or_comment(js_code, i):
                nested += 1
            elif js_code[i] == '}' and not inside_string_or_comment(js_code, i):
                nested -= 1
            i += 1
        if nested == 0:
            body = js_code[match.end():i-1]
            functions.append((func_name, params, body))
        else:
            print(f"Error: Function '{func_name}' has unbalanced braces and was not saved.")
    return functions

def generate_file_name():
    date_str = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_str = ''.join(random.choices('0123456789abcdef', k=16))
    return f"{date_str}_{random_str}.js"

def save_as_separate_file(function_name, parameters, body):
    module_code = f"function {function_name}({parameters}) {{\n{body}\n}}"
    file_name = generate_file_name()
    with open(os.path.join(output_dir, file_name), 'w') as f:
        f.write(module_code)

def separate_js_code(file_path):
    with open(file_path, 'r') as file:
        js_code = file.read()

    functions = extract_functions(js_code)
    for name, params, body in functions:
        save_as_separate_file(name, params, body)

# 추가된 부분: /test 디렉토리 내 모든 파일에 대해 함수 실행
for filename in os.listdir(input_dir):
    full_path = os.path.join(input_dir, filename)
    if os.path.isfile(full_path):
        separate_js_code(full_path)
