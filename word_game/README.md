# Word Bubble Pop

영어 단어 학습을 위한 인터랙티브 버블 팝핑 게임입니다.

## 게임 방법
- 화면에 떠다니는 버블들 중에서 영단어와 그 뜻이 맞는 쌍을 찾아주세요
- 첫 번째 버블을 터치하고, 그에 맞는 짝을 찾아 터치하세요
- 맞는 쌍을 찾으면 +10점을 획득합니다
- 틀린 쌍을 선택하면 실수 카운트가 증가합니다
- 3번의 실수가 허용되며, 그 이상이면 게임이 종료됩니다
- 제한 시간은 3분입니다

## 기술 스택
- Frontend: HTML, CSS, JavaScript, Phaser.js
- Backend: Python, Flask
- 배포: Render.com

## 로컬에서 실행하기

1. 저장소 클론:
```bash
git clone <your-repository-url>
cd word_game
```

2. 의존성 설치:
```bash
pip install -r requirements.txt
```

3. 서버 실행:
```bash
python app.py
```

4. 브라우저에서 http://localhost:5000 접속

## 배포 방법

1. [Render.com](https://render.com)에 가입하고 새 웹 서비스 생성
2. GitHub 저장소 연결
3. 다음 설정으로 배포:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
