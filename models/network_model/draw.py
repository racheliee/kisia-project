import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
import seaborn as sns
from sklearn.metrics import confusion_matrix

def draw_kde(df: pd.DataFrame, prob: str, label: str):
  plt.figure(figsize=(8, 6))
  sns.kdeplot(df[df[label] == 0][prob], color='red', shade=True, label='Benign')
  sns.kdeplot(df[df[label] == 1][prob], color='blue', shade=True, label='Malicious')
  plt.title('KDE')
  plt.xlabel('Probability')
  plt.ylabel('Density')
  plt.legend()
  plt.grid(True)
  plt.show()

def draw_histogram(df: pd.DataFrame, prob: str, label: str):
  plt.figure(figsize=(8, 6))
  plt.hist(df[df[label] == 0][prob], alpha=0.5, label=f'Benign', bins=10)
  plt.hist(df[df[label] == 1][prob], alpha=0.5, label=f'Malicious', bins=10)
  plt.title('Histogram')
  plt.xlabel('Probability')
  plt.ylabel('Frequency')
  plt.legend()
  plt.grid(True)
  plt.show()

def draw_bar(df: pd.DataFrame, prob: str, label: str):
  
  avg_prob = df.groupby(label)[prob].mean()

  plt.figure(figsize=(8, 6))
  avg_prob.plot(kind='bar', color=['red', 'blue'], edgecolor='black')
  plt.title('Bar graph')
  plt.xlabel('Label')
  plt.ylabel('Average Probability')
  plt.grid(True)
  plt.show()

def draw_heatmap(df: pd.DataFrame, prob: str, label: str):
  
  df['pred'] = df[prob].apply(lambda x: 1 if x >= 0.5 else 0)
  cm = confusion_matrix(df[label], df['pred'])

  plt.figure(figsize=(6, 5))
  sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False, xticklabels=[0, 1], yticklabels=[0, 1])
  plt.title('Confusion Matrix Heatmap')
  plt.xlabel('Prediction')
  plt.ylabel('True Label')
  plt.show()


def draw_scatter(df: pd.DataFrame, prob: str, label: str):
  df_0 = df[df[label] == 0]
  df_1 = df[df[label] == 1]

  plt.figure(figsize=(8, 3))
  plt.scatter(df_0[prob], [0] * len(df_0), c='#FF6F61', label='Benign', marker='o', edgecolor='black', s=100)
  plt.scatter(df_1[prob], [1] * len(df_1), c='#6B5B95', label='Malicious', marker='x', edgecolor='black', s=100)
  
  plt.title('Dot Scatter', fontsize=14)
  plt.xlabel('Probability', fontsize=12)
  plt.ylabel('Label', fontsize=12)
  plt.yticks([0, 1], ['Benign', 'Malicious'], fontsize=10)
  plt.axvline(x=0.5, color='green', linestyle='--', label='Threshold 0.5')
  plt.grid(True, linestyle='--', alpha=0.7)
  plt.legend(fontsize=10)
  plt.show()

def draw_boxplot(df: pd.DataFrame, prob: str, label: str):
  df['pred'] = df[label].replace({0: 'benign', 1: 'malicious'})
  
  plt.figure(figsize=(8, 6))
  sns.boxplot(x='pred', y=prob, data=df, palette='Set2', linewidth=2, width=0.6)
  
  plt.title('Boxplot', fontsize=14)
  plt.xlabel('Label', fontsize=12)
  plt.ylabel('Probability', fontsize=12)
  plt.grid(True, linestyle='--', alpha=0.7)
  plt.show()

def evaluate(fp):
  df = pd.read_csv(fp)
  print(df.sample(5))
  
  draw_kde(df, 'prob', 'label')
  draw_bar(df, 'prob', 'label')
  draw_histogram(df, 'prob', 'label')
  draw_scatter(df, 'prob', 'label')
  draw_boxplot(df, 'prob', 'label')
  draw_heatmap(df, 'prob', 'label')

'''
dataframe의 열 이름이 'prob', 'label' 이어야 함
'''
evaluate('./models/network_model/predictions.csv')
