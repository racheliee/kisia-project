## Datasets
- [TII-SSRC-23 Dataset](https://www.kaggle.com/datasets/daniaherzalla/tii-ssrc-23)
  - Network traffic for intrusion detection research.
  - The TII-SSRC-23 dataset offers a comprehensive collection of network traffic patterns, meticulously compiled to support the development and research of Intrusion Detection Systems (IDS). It presents a dual structure: one part provides a tabular representation of extracted features in CSV format, while the other offers raw network traffic data for each type of traffic in PCAP files.
- [Trojan Detection](https://www.kaggle.com/datasets/subhajournal/trojan-detection)
  - Detection of Trojan Traffic using Binary Classification
  - In today's technologically advanced world, the threat of cyberattacks has become a significant concern for individuals, businesses, and governments alike. One of the most insidious types of attacks is the Trojan horse, a malicious software that disguises itself as a harmless file or program. Detecting and preventing these attacks is crucial to maintaining the security of our digital systems. The Trojan horse can penetrate the system or network when they are invited by the users unknowingly through the visiting of unknown and malicious websites or installing the software. So, Trojan horse can be better understood and realized by monitoring the network and capturing the network packet. The present dataset contains the malicious (Trojan category) and benign network packets which can be used to detect Trojan horse.


## Obtaining packets from url
```
tcpdump -i en0 -w capture.pcap host example.com
```
- resulting file: `capture.pcap`
- In order to obtain flow statistics use `flow-stats.py` script.
  - resulting file: `flow-statistics.csv`
- In order to obtain packet statistics use `packet-stats.py` script.
  - resulting file: `packet-statistics.csv`
- Run `capture.py` script to 

## Model training