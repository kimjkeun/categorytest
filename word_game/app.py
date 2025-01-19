from flask import Flask, render_template, jsonify
import random
import json

app = Flask(__name__)

# 샘플 단어 데이터
WORDS = [
    {"word": "apple", "meaning": "사과", "category": "fruit"},
    {"word": "banana", "meaning": "바나나", "category": "fruit"},
    {"word": "cat", "meaning": "고양이", "category": "animal"},
    {"word": "dog", "meaning": "개", "category": "animal"},
    {"word": "elephant", "meaning": "코끼리", "category": "animal"},
    {"word": "book", "meaning": "책", "category": "object"},
    {"word": "computer", "meaning": "컴퓨터", "category": "technology"},
    {"word": "phone", "meaning": "전화기", "category": "technology"},
    {"word": "water", "meaning": "물", "category": "nature"},
    {"word": "sun", "meaning": "태양", "category": "nature"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/words')
def get_words():
    # 랜덤하게 5쌍의 단어를 선택
    selected_words = random.sample(WORDS, 5)
    # 단어와 의미를 분리하여 섞기
    word_bubbles = []
    meaning_bubbles = []
    
    for word in selected_words:
        word_bubbles.append({"id": word["word"], "text": word["word"], "type": "word"})
        meaning_bubbles.append({"id": word["word"], "text": word["meaning"], "type": "meaning"})
    
    # 두 리스트를 합치고 섞기
    all_bubbles = word_bubbles + meaning_bubbles
    random.shuffle(all_bubbles)
    
    return jsonify(all_bubbles)

if __name__ == '__main__':
    app.run(debug=True)
