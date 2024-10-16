import pandas as pd
from scapy.all import rdpcap
import datetime

# Load PCAP file using Scapy
def process_pcap(file_path):
    packets = rdpcap(file_path)
    
    # List to store packet information
    packet_stats = []
    
    # Previous packet time (for calculating time delta)
    prev_packet_time = None
    
    for packet in packets:
        if 'IP' in packet and 'TCP' in packet:
            # Extract basic packet details
            source_ip = packet['IP'].src
            destination_ip = packet['IP'].dst
            source_port = packet['TCP'].sport
            destination_port = packet['TCP'].dport
            protocol = packet['IP'].proto
            timestamp = packet.time
            packet_len = len(packet)
            
            # Time delta (time difference between this packet and the previous packet)
            if prev_packet_time is not None:
                time_delta = timestamp - prev_packet_time
            else:
                time_delta = 0  # No previous packet
            
            prev_packet_time = timestamp
            
            # TCP flags
            flags = packet['TCP'].flags
            
            # TCP sequence number
            seq_number = packet['TCP'].seq
            
            # TCP acknowledgment number
            ack_number = packet['TCP'].ack if 'ack' in packet['TCP'].flags else None
            
            # TCP window size
            window_size = packet['TCP'].window
            
            # TTL (Time To Live)
            ttl = packet['IP'].ttl
            
            # Store packet information in dictionary
            packet_data = {
                "Source IP": source_ip,
                "Source Port": source_port,
                "Destination IP": destination_ip,
                "Destination Port": destination_port,
                "Protocol": protocol,
                "Timestamp": datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S'),
                "Packet Length": packet_len,
                "Time Delta": time_delta,
                "TTL": ttl,
                "TCP Flags": str(flags),
                "TCP Sequence Number": seq_number,
                # "TCP Acknowledgment Number": ack_number,
                "TCP Window Size": window_size
            }

            # Append packet data to the list
            packet_stats.append(packet_data)
    
    return packet_stats

# Main function
def main(pcap_file, output_csv):
    packet_stats = process_pcap(pcap_file)
    
    # Convert to DataFrame and save to CSV
    df = pd.DataFrame(packet_stats)
    df.to_csv(output_csv, index=False)
    print(f"Packet statistics saved to {output_csv}")

# Example usage
if __name__ == "__main__":
    pcap_file = 'models/network_model/capture.pcap'  # Path to your PCAP file
    output_csv = 'packet_statistics.csv'  # Output CSV file
    main(pcap_file, output_csv)
