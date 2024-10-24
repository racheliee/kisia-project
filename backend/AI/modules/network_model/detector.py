import joblib
import logging
import colorlog
import pandas as pd
import ipaddress
import os
import subprocess

# Configure logger for Flow Detector (Cyan)
flow_detector_handler = colorlog.StreamHandler()
flow_detector_formatter = colorlog.ColoredFormatter(
    "%(log_color)s[Flow Detector]%(reset)s: %(message)s",
    log_colors={
        'INFO': 'yellow',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'DEBUG': 'cyan',
    }
)

flow_detector_handler.setFormatter(flow_detector_formatter)
flow_detector_logger = colorlog.getLogger('flow_detector_logger')
flow_detector_logger.addHandler(flow_detector_handler)
flow_detector_logger.setLevel(logging.DEBUG)
flow_detector_logger.propagate = False  # Prevent double messages


class FlowDetector:
    def __init__(self, model_path):
        try:
            # Load the XGBoost model using joblib
            self.model = joblib.load(model_path)
            flow_detector_logger.info(
                f"Model successfully loaded from {model_path}")
        except FileNotFoundError:
            flow_detector_logger.error(f"Model file not found: {model_path}")
            return
        
    def run_url(url):
        # Use tcpdump to capture traffic for a specific URL (domain)
        pcap_file = "capture.pcap"
        interface = "en0"  # Adjust the network interface as needed
        flow_detector_logger.info(f"Running tcpdump to capture traffic to/from {url}")
        
        # Run tcpdump command to capture traffic to/from the URL
        try:
            subprocess.run(
                ["tcpdump", "-i", interface, "-w", pcap_file, f"host {url}"],
                check=True
            )
            flow_detector_logger.info(f"Successfully captured traffic to {pcap_file}")
        except subprocess.CalledProcessError:
            flow_detector_logger.error(f"Failed to run tcpdump on {url}")
            return None
        
        # Convert the .pcap file to a CSV using flow-stats.py
        flow_stats_script = "./flow-stats.py"
        csv_output = "./flow_statistics.csv"
        try:
            subprocess.run(
                ["python3", flow_stats_script, pcap_file, csv_output],
                check=True
            )
            flow_detector_logger.info(f"Successfully converted {pcap_file} to {csv_output}")
        except subprocess.CalledProcessError:
            flow_detector_logger.error(f"Failed to run flow-stats.py on {pcap_file}")
            return None

        return csv_output

    def __preprocess(self, df):
        # df.drop(columns=['Flow ID'], inplace=True)

        cols_to_int64 = 'Src Port,Protocol,Flow Duration,Total Fwd Packet,Total Bwd packets'
        int64_list = cols_to_int64.split(',')
        df[int64_list] = df[int64_list].astype('int64')

        df['Timestamp'] = pd.to_datetime(
            df['Timestamp'], format='%d/%m/%Y %H:%M:%S')
        df['Timestamp'] = df['Timestamp'].dt.strftime('%H:%M:%S')
        df['Time_Seconds'] = (
            pd.to_datetime(df['Timestamp'], format='%H:%M:%S').dt.hour * 3600 +
            pd.to_datetime(df['Timestamp'], format='%H:%M:%S').dt.minute * 60 +
            pd.to_datetime(df['Timestamp'], format='%H:%M:%S').dt.second
        )
        
        df.drop(columns=['Timestamp'], inplace=True)
        
        def ip_to_int(ip):
            return int(ipaddress.IPv4Address(ip))

        df['Source IP'] = df['Source IP'].apply(ip_to_int)
        df['Destination IP'] = df['Destination IP'].apply(ip_to_int)
        return df

    def __predict(self, data):
        predictions = self.model.predict(data)
        probabilities = self.model.predict_proba(data)[:, 1]
        results = []
        for pred, prob in zip(predictions, probabilities):
            result = {
                "prediction": "malicious" if pred == 1 else "benign",  # 'malicious' if pred == 1, else 'benign'
                "confidence": prob  # Probability for the predicted class
            }
            results.append(result)
        
        return results

    def predict(self, url):
        csv_file = self.run_url(url)
        if not csv_file:
            flow_detector_logger.error("No CSV generated from pcap. Exiting.")
            return None
        
        # Load the CSV file containing flow statistics
        flow_detector_logger.info(f"Loading data from {csv_file}")
        df = pd.read_csv(csv_file)

        # Preprocess the data
        features = self.__preprocess(df)

        # Perform predictions
        flow_detector_logger.info(
            f"Running model inference on {len(df)} rows of flow data")
        predictions = self.__predict(features)

        return predictions
