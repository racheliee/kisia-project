import pandas as pd
from scapy.all import rdpcap
from collections import defaultdict
import datetime

# Function to calculate IAT and other flow statistics
def calculate_flow_stats(packets, source_ip):
    fwd_packets, bwd_packets = [], []
    fwd_lengths, bwd_lengths = [], []
    fwd_times, bwd_times = [], []
    
    for packet in packets:
        packet_len = len(packet)
        packet_time = packet.time
        if packet['IP'].src == source_ip:
            fwd_packets.append(packet)
            fwd_lengths.append(packet_len)
            fwd_times.append(packet_time)
        else:
            bwd_packets.append(packet)
            bwd_lengths.append(packet_len)
            bwd_times.append(packet_time)
    
    return fwd_packets, bwd_packets, fwd_lengths, bwd_lengths, fwd_times, bwd_times

# Load PCAP file using Scapy
def process_pcap(file_path):
    packets = rdpcap(file_path)
    
    # Dictionary to store flow information
    flows = defaultdict(list)

    # Group packets into flows by Flow ID (5-tuple: src IP, src port, dst IP, dst port, protocol)
    for packet in packets:
        if 'IP' in packet and 'TCP' in packet:
            flow_id = f"{packet['IP'].src}-{packet['TCP'].sport}-{packet['IP'].dst}-{packet['TCP'].dport}-{packet['IP'].proto}"
            flows[flow_id].append(packet)
    
    return flows

# Process each flow and calculate metrics
def extract_flow_statistics(flows):
    flow_stats = []
    
    for flow_id, packets in flows.items():
        # Basic flow details
        source_ip = packets[0]['IP'].src
        destination_ip = packets[0]['IP'].dst
        source_port = packets[0]['TCP'].sport
        destination_port = packets[0]['TCP'].dport
        protocol = packets[0]['IP'].proto
        start_time = packets[0].time
        end_time = packets[-1].time
        flow_duration = (end_time - start_time) * 1000  # in milliseconds
        
        # Calculate forward and backward packets, lengths, and times
        fwd_packets, bwd_packets, fwd_lengths, bwd_lengths, fwd_times, bwd_times = calculate_flow_stats(packets, source_ip)

        # Total forward and backward packets
        total_fwd_packets = len(fwd_packets)
        total_bwd_packets = len(bwd_packets)
        total_fwd_len = sum(fwd_lengths)
        total_bwd_len = sum(bwd_lengths)

        # Forward packet length statistics
        fwd_len_max = max(fwd_lengths) if fwd_lengths else 0
        fwd_len_min = min(fwd_lengths) if fwd_lengths else 0
        fwd_len_mean = sum(fwd_lengths) / len(fwd_lengths) if fwd_lengths else 0
        fwd_len_std = pd.Series(fwd_lengths).std() if len(fwd_lengths) > 1 else 0

        # Backward packet length statistics
        bwd_len_max = max(bwd_lengths) if bwd_lengths else 0
        bwd_len_min = min(bwd_lengths) if bwd_lengths else 0
        bwd_len_mean = sum(bwd_lengths) / len(bwd_lengths) if bwd_lengths else 0
        bwd_len_std = pd.Series(bwd_lengths).std() if len(bwd_lengths) > 1 else 0

        # Flow bytes and packets per second
        flow_bytes_per_sec = (total_fwd_len + total_bwd_len) / flow_duration * 1000 if flow_duration > 0 else 0
        flow_packets_per_sec = (total_fwd_packets + total_bwd_packets) / flow_duration * 1000 if flow_duration > 0 else 0

        # Calculate forward and backward IAT (Inter Arrival Time)
        fwd_iat = [fwd_times[i] - fwd_times[i-1] for i in range(1, len(fwd_times))] if len(fwd_times) > 1 else [0]
        bwd_iat = [bwd_times[i] - bwd_times[i-1] for i in range(1, len(bwd_times))] if len(bwd_times) > 1 else [0]
        fwd_iat_mean = pd.Series(fwd_iat).mean() if fwd_iat else 0
        bwd_iat_mean = pd.Series(bwd_iat).mean() if bwd_iat else 0

        # Store flow statistics in dictionary
        flow_data = {
            # "Flow ID": flow_id,
            "Source IP": source_ip,
            "Source Port": source_port,
            "Destination IP": destination_ip,
            "Destination Port": destination_port,
            "Protocol": protocol,
            "Timestamp": datetime.datetime.fromtimestamp(start_time).strftime('%d/%m/%Y %H:%M:%S'),
            "Flow Duration": flow_duration,
            "Total Fwd Packets": total_fwd_packets,
            "Total Backward Packets": total_bwd_packets,
            "Total Length of Fwd Packets": total_fwd_len,
            "Total Length of Bwd Packets": total_bwd_len,
            "Fwd Packet Length Max": fwd_len_max,
            "Fwd Packet Length Min": fwd_len_min,
            "Fwd Packet Length Mean": fwd_len_mean,
            "Fwd Packet Length Std": fwd_len_std,
            "Bwd Packet Length Max": bwd_len_max,
            "Bwd Packet Length Min": bwd_len_min,
            "Bwd Packet Length Mean": bwd_len_mean,
            "Bwd Packet Length Std": bwd_len_std,
            "Flow Bytes/s": flow_bytes_per_sec,
            "Flow Packets/s": flow_packets_per_sec,
            "Fwd IAT Mean": fwd_iat_mean,
            "Bwd IAT Mean": bwd_iat_mean
        }

        # Append flow data to list
        flow_stats.append(flow_data)
    
    return flow_stats

# Main function
def main(pcap_file, output_csv):
    flows = process_pcap(pcap_file)
    flow_stats = extract_flow_statistics(flows)
    
    # Convert to DataFrame and save to CSV
    df = pd.DataFrame(flow_stats)
    df.to_csv(output_csv, index=False)
    print(f"Flow statistics saved to {output_csv}")

# Example usage
if __name__ == "__main__":
    pcap_file = './models/network_model/capture.pcap'  # Path to your PCAP file
    output_csv = 'flow_statistics.csv'  # Output CSV file
    main(pcap_file, output_csv)
