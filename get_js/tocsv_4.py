import os
import pandas as pd

def save_files_to_csv(directory):
    # 디렉토리 내의 모든 파일 목록
    files = os.listdir(directory)
    
    # 결과를 저장할 리스트 생성
    data = []
    
    # 각 파일을 순회하며 내용 읽기
    for file in files:
        file_path = os.path.join(directory, file)
        with open(file_path, 'r', encoding='utf-8') as file:
            # 파일의 모든 내용을 한 줄로 읽기
            content = file.read().replace('\n', '')  # 모든 줄바꿈을 제거하여 한 줄로 만듦
            data.append({'code': content})  # 데이터를 리스트에 추가
    
    # 리스트를 데이터프레임으로 변환
    df = pd.DataFrame(data)
    
    # 결과를 CSV 파일로 저장
    df.to_csv('output.csv', index=False, encoding='utf-8')

# 함수 호출 예
save_files_to_csv('./dynamic_temps')

