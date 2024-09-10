import os
import subprocess
import csv
import sys
import joblib
import pandas as pd


class DynamicDetector:
    # 분석할 폴더 경로 설정
    def __filepath(self):
        base_folder_path = "backend/AI/js_script_files"

    # 스크립트 실행 전에 폴더 내의 파일 목록을 저장
        self.folder_path = os.path.join(base_folder_path, self.filename)
        self.initial_files = set(os.listdir(self.folder_path))

    # 폴더 내의 파일 목록을 읽고, 파일명을 기준으로 정렬
        self.files = sorted(os.listdir(self.folder_path))

    def __preprocess(self):
        # 파일을 하나씩 분석하고 에러를 처리
        for file in self.files:
            if file.endswith(".js"):  # JavaScript 파일만 분석
                file_path = os.path.join(self.folder_path, file)
                print(f"{file_path} 분석 중...")

                # Jalangi2 명령어 실행
                # warning: watch out for the path to jalangi2 and myanalysis.js
                command = f"node models/dynamic_model/node_modules/jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis models/dynamic_model/Myanalysis.js {file_path}"
                result = subprocess.run(command, shell=True, capture_output=True, text=True)

                # 에러 발생 시 에러 메시지 저장
                if result.returncode != 0:
                    # print(result.stderr)
                    print("에러")
                else:
                    print(f"{file_path} 분석 완료")

    def __predict(self):
        model_path = 'models/dynamic_model/model_dynamic.pkl'  # 모델 파일 경로
        # .pkl 파일에서 모델을 로드
        try:
            model = joblib.load(model_path)
            print("모델이 성공적으로 로드되었습니다.")
        except FileNotFoundError:
            print(f"모델 파일을 찾을 수 없습니다: {model_path}")
            return []

        # CSV 파일을 불러오기
        try:
            csv_path = "./analysis_results.csv"
            df = pd.read_csv(csv_path)
            print(f"CSV 파일이 성공적으로 로드되었습니다: {csv_path}")
        except FileNotFoundError:
            print(f"CSV 파일을 찾을 수 없습니다: {csv_path}")
            return []

        # 모델로 파일명을 분석하여 예측 수행
            # 2번째 열부터 11번째 열까지의 데이터만 추출
        data = df.iloc[:, 1:11].values  # 첫 번째 열을 제외하고, 두 번째부터 열 번째까지 선택

        # 모델로 예측 수행
        predictions = []
        for row in data:
            row_reshaped = [row]  # 모델에 넣을 형식으로 데이터를 변형 (2차원 리스트)
            prediction = model.predict(row_reshaped)[0]  # 예측 결과
            confidence = max(model.predict_proba(
                row_reshaped)[0])  # confidence 값
            predictions.append({
                'prediction': prediction,
                'confidence': confidence
            })

        return predictions
        # predictions = []
        # for filename in df['file']:  # 'file' 열을 기준으로 예측
        #     data = [[filename]]  # 모델 입력 형식에 맞춰 데이터를 준비
        #     prediction = model.predict(data)[0]  # 예측 결과
        #     confidence = max(model.predict_proba(data)[0])  # confidence 값

        #     predictions.append({
        #         'prediction': prediction,
        #         'confidence': confidence
        #     })

        # return predictions

# 스크립트 실행 후 새로 생성된 파일들을 찾아서 삭제
    def __del_file(self):
        # 스크립트 실행 후 폴더 내의 파일 목록을 가져옴
        final_files = set(os.listdir(self.folder_path))
        for file in final_files - self.initial_files:
            file_path = os.path.join(self.folder_path, file)
            os.remove(file_path)
            print(f"새로 생성된 파일 삭제: {file_path}")

        print("스크립트 실행 완료 및 새로 생성된 파일이 삭제되었습니다.")
        os.remove("./analysis_results.csv")

    def predict(self, filename):
        self.filename = filename
        self.__filepath()

        self.__preprocess()
        pred = self.__predict()
        self.__del_file()

        return pred


debug = DynamicDetector()
pred = debug.predict("20240908221750_52505354") # todo: change the filename
print(pred)

# CSV 파일에 에러 기록을 위한 함수
# def log_error_to_csv(file_name, error_message):
#     csv_headers = ["File", "Error Message"]
#     csv_content = [file_name, error_message.replace('"', '""')]

#     try:
#         file_exists = os.path.exists(error_log_path)
#         with open(error_log_path, 'a', newline='') as csvfile:
#             writer = csv.writer(csvfile)
#             if not file_exists:
#                 writer.writerow(csv_headers)  # 파일이 없을 경우 헤더를 작성
#             writer.writerow(csv_content)
#         print(f"{file_name}의 에러가 기록되었습니다.")
#     except Exception as e:
#         print("CSV 파일 저장 중 에러 발생:", e)
        # return(base_folder_path, error_log_path, folder_path, initial_files, files)