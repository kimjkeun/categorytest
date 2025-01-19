class WordBubbleGame extends Phaser.Scene {
    constructor() {
        super({ key: 'WordBubbleGame' });
    }

    preload() {
        // 이미지 프리로드가 필요없음 (그래픽으로 그릴 예정)
    }

    create() {
        this.initializeGame();
    }

    initializeGame() {
        // 변수 초기화
        this.bubbles = [];
        this.selectedBubble = null;
        this.score = 0;
        this.timeLeft = 180;
        this.mistakes = 0;
        this.gameOver = false;

        // 화면 크기 가져오기
        const width = this.scale.width;
        const height = this.scale.height;

        // 배경 설정
        this.cameras.main.setBackgroundColor('#87CEEB');
        
        // 점수 텍스트 - 크기 조정
        const textSize = Math.min(32, width / 20);
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: `${textSize}px`,
            fill: '#000'
        });

        // 타이머 텍스트
        this.timeText = this.add.text(16, 16 + textSize + 8, 'Time: 3:00', {
            fontSize: `${textSize}px`,
            fill: '#000'
        });

        // 실수 카운터
        this.mistakesText = this.add.text(16, 16 + (textSize + 8) * 2, 'Mistakes: 0/3', {
            fontSize: `${textSize}px`,
            fill: '#000'
        });

        // 타이머 설정
        if (this.gameTimer) {
            this.gameTimer.remove();
        }
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: () => this.updateTimer(),
            callbackScope: this,
            loop: true
        });

        // 단어 로드 및 버블 생성
        this.loadNewWords();
    }

    loadNewWords() {
        fetch('/api/words')
            .then(response => response.json())
            .then(words => {
                this.createBubbles(words);
            });
    }

    createBubbles(words) {
        const width = this.scale.width;
        const height = this.scale.height;
        const bubbleSize = Math.min(45, width / 10); // 화면 크기에 따라 버블 크기 조정

        words.forEach((word, index) => {
            const x = Phaser.Math.Between(bubbleSize, width - bubbleSize);
            const y = Phaser.Math.Between(bubbleSize + 100, height - bubbleSize);
            
            // 그래픽으로 버블 생성
            const bubble = this.add.graphics();
            
            // 그림자
            bubble.fillStyle(0x4a90e2, 0.2);
            bubble.fillCircle(2, 2, bubbleSize);
            
            // 메인 버블
            bubble.lineStyle(2, 0x4a90e2, 1);
            bubble.fillStyle(0xffffff, 0.9);
            bubble.strokeCircle(0, 0, bubbleSize);
            bubble.fillCircle(0, 0, bubbleSize);
            
            // 스프라이트로 변환
            const texture = bubble.generateTexture('bubble' + index, bubbleSize * 2 + 4, bubbleSize * 2 + 4);
            const sprite = this.physics.add.sprite(x, y, 'bubble' + index);
            
            sprite.setInteractive();
            sprite.wordData = word;

            // 텍스트 스타일 개선 - 화면 크기에 따라 폰트 크기 조정
            const fontSize = Math.min(
                word.text.length > 6 ? width / 40 : width / 35,
                word.text.length > 6 ? 18 : 22
            );
            
            const text = this.add.text(x, y, word.text, {
                fontSize: `${fontSize}px`,
                fontFamily: 'Arial, "Malgun Gothic", sans-serif',
                fill: '#000',
                align: 'center',
                fontStyle: 'bold'
            });
            text.setOrigin(0.5);

            // 물리 속성 설정
            sprite.setVelocity(
                Phaser.Math.Between(-30, 30),
                Phaser.Math.Between(-30, 30)
            );
            sprite.setBounce(1, 1);
            sprite.setCollideWorldBounds(true);
            sprite.setDamping(true);
            sprite.setDrag(0.99);

            // 호버/터치 효과
            sprite.on('pointerover', () => {
                sprite.setScale(1.1);
                text.setScale(1.1);
            });
            
            sprite.on('pointerout', () => {
                if (this.selectedBubble !== sprite) {
                    sprite.setScale(1);
                    text.setScale(1);
                }
            });

            // 클릭/터치 이벤트
            sprite.on('pointerdown', () => {
                this.handleBubbleClick(sprite);
            });

            this.bubbles.push({ sprite: sprite, text: text });
            bubble.destroy();
        });
    }

    handleBubbleClick(bubble) {
        if (this.gameOver) return;

        if (!this.selectedBubble) {
            this.selectedBubble = bubble;
            bubble.setTint(0x00ff00);
            bubble.setScale(1.1);
            this.tweens.add({
                targets: bubble,
                angle: { from: -5, to: 5 },
                duration: 100,
                yoyo: true,
                repeat: 2
            });
        } else {
            if (this.selectedBubble.wordData.id === bubble.wordData.id &&
                this.selectedBubble.wordData.type !== bubble.wordData.type) {
                // 매치 성공
                this.score += 10;
                this.scoreText.setText('Score: ' + this.score);
                
                // 성공 효과
                this.showMatchEffect(bubble);
                this.showMatchEffect(this.selectedBubble);
                
                // 버블 제거
                this.removeBubblePair(this.selectedBubble, bubble);
            } else {
                // 매치 실패
                this.mistakes++;
                this.mistakesText.setText(`Mistakes: ${this.mistakes}/3`);
                
                // 실패 효과
                this.showMismatchEffect(bubble);
                this.showMismatchEffect(this.selectedBubble);
                
                if (this.mistakes >= 3) {
                    this.endGame();
                }
            }
            
            // 선택 초기화
            this.selectedBubble.clearTint();
            this.selectedBubble.setScale(1);
            this.selectedBubble = null;
        }
    }

    showMatchEffect(bubble) {
        // 성공 이펙트
        const particles = this.add.particles('bubble' + this.bubbles.length);
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.2, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 500,
            blendMode: 'ADD'
        });
        
        emitter.explode(20, bubble.x, bubble.y);
        this.time.delayedCall(500, () => {
            particles.destroy();
        });
    }

    showMismatchEffect(bubble) {
        // 실패 이펙트
        this.tweens.add({
            targets: bubble,
            alpha: 0.3,
            yoyo: true,
            duration: 100,
            repeat: 3
        });
    }

    removeBubblePair(bubble1, bubble2) {
        // 버블과 텍스트 제거
        this.bubbles = this.bubbles.filter(b => {
            if (b.sprite === bubble1 || b.sprite === bubble2) {
                b.sprite.destroy();
                b.text.destroy();
                return false;
            }
            return true;
        });

        // 모든 버블이 제거되었는지 확인
        if (this.bubbles.length === 0) {
            this.loadNewWords();
        }
    }

    updateTimer() {
        if (this.gameOver) return;

        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);

        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.gameOver = true;
        
        // 타이머 정지
        if (this.gameTimer) {
            this.gameTimer.remove();
        }

        // 모든 버블 비활성화
        this.bubbles.forEach(bubble => {
            bubble.sprite.disableInteractive();
        });

        // 게임오버 텍스트
        const gameOverText = this.add.text(400, 300, 'Game Over!\nFinal Score: ' + this.score, {
            fontSize: '64px',
            fill: '#000',
            align: 'center'
        });
        gameOverText.setOrigin(0.5);

        // 재시작 버튼
        const restartButton = this.add.text(400, 400, 'Click to Restart', {
            fontSize: '32px',
            fill: '#000',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 }
        });
        restartButton.setOrigin(0.5);
        restartButton.setInteractive({ useHandCursor: true });
        
        // 버튼 호버 효과
        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#4a90e2' });
        });
        
        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#000' });
        });
        
        // 재시작 클릭 이벤트
        restartButton.on('pointerdown', () => {
            // 모든 기존 객체 제거
            this.bubbles.forEach(bubble => {
                bubble.sprite.destroy();
                bubble.text.destroy();
            });
            gameOverText.destroy();
            restartButton.destroy();
            
            // 게임 초기화
            this.initializeGame();
        });
    }

    update() {
        // 텍스트 위치 업데이트
        this.bubbles.forEach(bubble => {
            bubble.text.x = bubble.sprite.x;
            bubble.text.y = bubble.sprite.y;
        });
    }
}

// 게임 설정
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: WordBubbleGame
};

// 게임 시작
const game = new Phaser.Game(config);
