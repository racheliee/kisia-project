import os
import subprocess
import joblib
import pandas as pd
import logging
import colorlog

logging.basicConfig(level=logging.DEBUG)


class DynamicDetector:
    def __init__(self, model_path):
        try:
            self.model = joblib.load(model_path)
            logging.info(
                f"[Dynamic Model]: Model successfully loaded from {model_path}")
        except FileNotFoundError:
            logging.error(
                f"[Dynamic Model]: Model file not found: {model_path}")
            return

    # 분석할 폴더 경로 설정
    def __filepath(self, js_folder_path):
        # 스크립트 실행 전에 폴더 내의 파일 목록을 저장
        self.folder_path = os.path.join(js_folder_path, self.filename)
        self.initial_files = set(os.listdir(self.folder_path))

        # 폴더 내의 파일 목록을 읽고, 파일명을 기준으로 정렬
        self.files = sorted(os.listdir(self.folder_path))

    # Jalangi2를 사용하여 JavaScript 파일을 분석
    def __preprocess(self, base_folder_path, jalangi_path):
        for file in self.files:  # 파일을 하나씩 분석하고 에러를 처리
            if file.endswith(".js"):  # JavaScript 파일만 분석
                file_path = os.path.join(self.folder_path, file)
                logging.info(f"[Dynamic Model]: Analyzing {file_path}...")

                full_jalangi_path = os.path.join(
                    base_folder_path, jalangi_path)  # full path to jalangi2
                js_analysis_path = os.path.join(os.path.dirname(
                    __file__), "js-analysis.js")  # full path to js-analysis.js

                # Execute Jalangi2 command (needs to run in node v12)
                command = f"npx -p node@12 node {full_jalangi_path} --inlineIID --inlineSource --analysis {js_analysis_path} {file_path}"
                result = subprocess.run(
                    command, shell=True, capture_output=True, text=True)

                # 에러 발생 시 에러 메시지 저장
                if result.returncode != 0:
                    logging.error(f"[Dynamic Model]: Error analyzing {file_path}")
                else:
                    logging.info(f"[Dynamic Model]: {file_path} analyzed successfully!")

    def __predict(self):
        # CSV 파일을 불러오기
        try:
            csv_path = "./analysis_results.csv"  # csv file created in the main folder
            df = pd.read_csv(csv_path)
            logging.info(f"[Dynamic Model]: CSV file loaded successfully: {csv_path}")
        except FileNotFoundError:
            logging.error(f"[Dynamic Model]: CSV file not found: {csv_path}")
            return []

        # 모델로 파일명을 분석하여 예측 수행
        # 2번째 열부터 11번째 열까지의 데이터만 추출
        data = df.iloc[:, 1:11].values  # 첫 번째 열을 제외하고, 두 번째부터 열 번째까지 선택

        # 모델로 예측 수행
        predictions = []
        for row in data:
            row_reshaped = [row]  # 모델에 넣을 형식으로 데이터를 변형 (2차원 리스트)
            prediction = self.model.predict(row_reshaped)[0]  # 예측 결과
            confidence = max(self.model.predict_proba(
                row_reshaped)[0])  # confidence 값
            predictions.append({
                'prediction': prediction,
                'confidence': confidence
            })

        return predictions


    # 스크립트 실행 후 새로 생성된 파일들을 찾아서 삭제
    def __del_file(self):
        # 스크립트 실행 후 폴더 내의 파일 목록을 가져옴
        final_files = set(os.listdir(self.folder_path))
        for file in final_files - self.initial_files:
            file_path = os.path.join(self.folder_path, file)
            os.remove(file_path)

        os.remove("./analysis_results.csv") # remove the csv file
        logging.info("[Dynamic Model]: Files deleted successfully!")

    # js_files is the default name mentioned in getJs.py
    def predict(self, filename="js_files", base_folder_path="backend/AI", js_folder_path="backend/AI/js_script_files", jalangi_path="node_modules/jalangi2/src/js/commands/jalangi.js"):
        self.filename = filename
        self.__filepath(js_folder_path)

        self.__preprocess(base_folder_path, jalangi_path)
        pred = self.__predict()
        self.__del_file()

        return pred
