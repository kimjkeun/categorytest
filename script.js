// 질문 데이터
const questions = [
    {
        question: "새로운 사람을 만났을 때 당신은?",
        options: [
            "적극적으로 먼저 다가가 대화를 시작한다",
            "상대방이 먼저 다가올 때까지 기다린다",
            "공통 친구를 통해 자연스럽게 친해진다",
            "상황을 보며 천천히 알아간다"
        ]
    },
    {
        question: "친구와 연락할 때 주로 어떤 방식을 선호하나요?",
        options: [
            "수시로 일상적인 대화를 주고받는다",
            "중요한 일이 있을 때만 연락한다",
            "재미있는 밈이나 영상을 공유하며 대화를 시작한다",
            "직접 만나서 이야기하는 것을 선호한다"
        ]
    },
    {
        question: "친구의 생일이 다가올 때 당신은?",
        options: [
            "깜짝 파티를 준비한다",
            "정성스러운 선물과 편지를 준비한다",
            "단체 카톡방에서 다같이 축하한다",
            "조용히 1:1로 축하 메시지를 보낸다"
        ]
    },
    {
        question: "친구와 의견이 다를 때 당신은?",
        options: [
            "직접적으로 내 의견을 말한다",
            "상대방의 의견을 먼저 더 들어본다",
            "적당한 타협점을 찾으려 노력한다",
            "불편한 상황을 피하고 넘어간다"
        ]
    },
    {
        question: "친구가 약속에 늦었을 때 당신은?",
        options: [
            "정확한 도착 시간을 물어보며 기다린다",
            "다른 할 일을 하면서 느긋하게 기다린다",
            "약간의 불만을 표현한다",
            "다음부터는 일찍 나오라고 농담으로 이야기한다"
        ]
    },
    {
        question: "친구가 이별의 아픔을 겪을 때 당신은?",
        options: [
            "함께 있어주며 이야기를 들어준다",
            "맛있는 음식을 사주며 위로한다",
            "새로운 활동을 제안하며 기분 전환을 시킨다",
            "시간이 해결해줄 거라고 조언한다"
        ]
    },
    {
        question: "친구가 시험/면접에서 떨어졌다고 할 때 당신은?",
        options: [
            "다음 기회를 위한 구체적인 조언을 한다",
            "실패는 성공의 어머니라고 위로한다",
            "함께 기분 전환할 수 있는 활동을 제안한다",
            "조용히 옆에서 응원한다"
        ]
    },
    {
        question: "친구가 성공했을 때 당신의 반응은?",
        options: [
            "진심으로 축하하고 자랑스러워한다",
            "축하 파티를 제안한다",
            "어떻게 성공했는지 구체적으로 물어본다",
            "담담하게 축하한다"
        ]
    },
    {
        question: "친구와 함께 있을 때 가장 즐거운 순간은?",
        options: [
            "맛있는 음식을 먹으며 수다 떨 때",
            "함께 새로운 활동에 도전할 때",
            "조용히 각자 할 일을 하며 시간을 보낼 때",
            "서로의 고민을 나누고 조언할 때"
        ]
    },
    {
        question: "친구가 조언을 구할 때 당신은?",
        options: [
            "객관적인 해결책을 제시한다",
            "공감하며 감정적인 지지를 해준다",
            "비슷한 경험을 공유하며 위로한다",
            "다양한 관점에서 상황을 분석해준다"
        ]
    },
    {
        question: "주말에 갑자기 친구가 만나자고 할 때 당신은?",
        options: [
            "계획에 없던 일이라도 즐겁게 나간다",
            "이미 계획이 있다면 거절한다",
            "기분과 상황에 따라 결정한다",
            "다른 친구들도 부르자고 제안한다"
        ]
    },
    {
        question: "친구의 비밀을 알게 됐을 때 당신은?",
        options: [
            "절대 비밀을 지킨다",
            "친구의 허락 하에 도움이 될 만한 사람에게만 공유한다",
            "매우 친한 친구에게만 말한다",
            "비밀이 부담스러워 모른척한다"
        ]
    }
];

// 현재 질문 인덱스
let currentQuestionIndex = 0;
// 사용자의 답변을 저장할 배열
let userAnswers = [];

// DOM 요소들
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.querySelector('.progress');

// 결과 유형 정의
const resultTypes = {
    "분위기 메이커형": {
        type: "분위기 메이커형",
        description: "당신은 모임의 중심이 되어 모두를 즐겁게 만드는 재치있는 친구입니다. 뛰어난 유머 감각과 긍정적인 에너지로 주변 사람들을 행복하게 만들며, 어색한 분위기를 자연스럽게 풀어내는 능력이 있습니다. 새로운 사람들과도 쉽게 어울리며, 모임에서 대화를 이끌어가는 것을 즐깁니다. 당신의 밝은 에너지는 친구들에게 큰 힘이 되며, 함께 있으면 시간 가는 줄 모르게 즐거운 시간을 보낼 수 있습니다.",
        personalityTraits: [
            {
                title: "긍정적 성향",
                description: "밝고 낙천적인 성격으로 주변을 활기차게 만듭니다."
            },
            {
                title: "사교성",
                description: "새로운 사람들과 쉽게 어울리고 관계를 만드는 것을 즐깁니다."
            },
            {
                title: "유머러스함",
                description: "재치있는 농담과 이야기로 분위기를 즐겁게 만듭니다."
            }
        ],
        communicationStyle: [
            {
                title: "활발한 대화",
                description: "대화를 주도하고 다양한 주제로 이야기를 이끌어갑니다."
            },
            {
                title: "분위기 조성",
                description: "모임의 분위기를 파악하고 적절한 대화 주제를 선택합니다."
            },
            {
                title: "포용적 태도",
                description: "모든 사람이 대화에 참여할 수 있도록 배려합니다."
            }
        ],
        strengths: [
            {
                title: "분위기 메이킹",
                description: "어색한 상황을 자연스럽게 풀어내는 능력이 뛰어납니다."
            },
            {
                title: "관계 형성",
                description: "다양한 성향의 사람들과 좋은 관계를 만들 수 있습니다."
            },
            {
                title: "긍정적 영향",
                description: "주변 사람들에게 긍정적인 에너지를 전파합니다."
            }
        ],
        weaknesses: [
            {
                title: "깊이 있는 대화 부족",
                description: "때로는 가벼운 대화에 치중하여 깊이 있는 대화가 부족할 수 있습니다."
            },
            {
                title: "과도한 사교성",
                description: "조용히 하고 싶어하는 사람의 성향을 간과할 수 있습니다."
            }
        ]
    },
    "신중한 조언가형": {
        type: "신중한 조언가형",
        description: "당신은 깊이 있는 통찰력으로 친구들에게 현명한 조언을 해주는 신중한 친구입니다. 문제의 본질을 정확히 파악하고, 객관적인 시각에서 최선의 해결책을 제시하는 능력이 뛰어납니다. 경청하는 자세와 분석적인 사고로 실질적인 도움을 주며, 친구들이 어려운 상황에서 올바른 결정을 내릴 수 있도록 도와줍니다. 당신의 조언은 항상 신중하고 깊이 있어 친구들에게 큰 신뢰를 받고 있습니다.",
        personalityTraits: [
            {
                title: "분석적 사고",
                description: "상황을 객관적으로 분석하고 최선의 해결책을 찾습니다."
            },
            {
                title: "신중함",
                description: "성급한 판단을 피하고 깊이 있게 생각합니다."
            },
            {
                title: "책임감",
                description: "한 번 맡은 일은 끝까지 책임지고 수행합니다."
            }
        ],
        communicationStyle: [
            {
                title: "경청하는 자세",
                description: "상대방의 이야기를 끝까지 듣고 이해하려 노력합니다."
            },
            {
                title: "논리적 대화",
                description: "근거를 바탕으로 명확하게 의견을 전달합니다."
            },
            {
                title: "건설적 피드백",
                description: "상대방의 발전을 위한 구체적인 조언을 제공합니다."
            }
        ],
        strengths: [
            {
                title: "신뢰성",
                description: "믿음직한 조언과 일관된 태도로 신뢰를 얻습니다."
            },
            {
                title: "문제해결력",
                description: "복잡한 상황에서도 명확한 해결책을 제시합니다."
            },
            {
                title: "통찰력",
                description: "상황의 본질을 파악하고 핵심을 짚어냅니다."
            }
        ],
        weaknesses: [
            {
                title: "과도한 신중함",
                description: "때로는 결정을 내리는 데 시간이 너무 오래 걸릴 수 있습니다."
            },
            {
                title: "감정적 거리",
                description: "논리적 접근으로 인해 감정적 공감이 부족할 수 있습니다."
            }
        ]
    },
    "감성적 지원가형": {
        type: "감성적 지원가형",
        description: "당신은 친구의 감정을 섬세하게 이해하고 공감하는 따뜻한 마음을 가진 친구입니다. 상대방의 미묘한 감정 변화도 놓치지 않고 캐치하며, 진심 어린 위로와 지지로 힘이 되어줍니다. 친구가 힘들 때 곁에서 함께 울어주고, 기쁠 때 진심으로 기뻐해주는 당신의 모습은 많은 이들에게 위로가 됩니다. 감정적인 지지뿐만 아니라, 상황을 함께 해결하려 노력하는 당신의 모습은 진정한 친구의 표본이 됩니다.",
        personalityTraits: [
            {
                title: "공감능력",
                description: "타인의 감정을 깊이 이해하고 함께 공감합니다."
            },
            {
                title: "섬세함",
                description: "작은 감정의 변화도 놓치지 않고 세심하게 살핍니다."
            },
            {
                title: "포용력",
                description: "편견 없이 모든 이의 이야기를 받아들입니다."
            }
        ],
        communicationStyle: [
            {
                title: "감정적 지지",
                description: "상대방의 감정에 공감하며 정서적 지원을 제공합니다."
            },
            {
                title: "따뜻한 경청",
                description: "판단하지 않고 이야기를 들어주며 공감합니다."
            },
            {
                title: "진심 어린 대화",
                description: "진정성 있는 대화로 신뢰 관계를 형성합니다."
            }
        ],
        strengths: [
            {
                title: "정서적 지원",
                description: "힘든 상황에서 진정한 위로가 되어줍니다."
            },
            {
                title: "신뢰 구축",
                description: "진심 어린 태도로 깊은 신뢰 관계를 형성합니다."
            },
            {
                title: "갈등 해소",
                description: "감정적 중재로 관계의 어려움을 해소합니다."
            }
        ],
        weaknesses: [
            {
                title: "감정 과몰입",
                description: "때로는 타인의 감정에 과도하게 영향을 받을 수 있습니다."
            },
            {
                title: "객관성 부족",
                description: "감정에 치우쳐 현실적 조언이 부족할 수 있습니다."
            }
        ]
    },
    "열정적 모험가형": {
        type: "열정적 모험가형",
        description: "당신은 새로운 도전을 즐기고 친구들에게 영감을 주는 열정적인 친구입니다. 활기찬 에너지와 창의적인 아이디어로 친구들의 삶을 풍성하게 만듭니다.",
        personalityTraits: [
            {
                title: "도전정신",
                description: "새로운 경험과 도전을 두려워하지 않습니다."
            },
            {
                title: "창의성",
                description: "독창적인 아이디어와 새로운 관점을 제시합니다."
            },
            {
                title: "열정",
                description: "모든 일에 열정적으로 임하며 에너지가 넘칩니다."
            }
        ],
        communicationStyle: [
            {
                title: "영감을 주는 대화",
                description: "창의적인 아이디어와 새로운 관점을 공유합니다."
            },
            {
                title: "적극적 소통",
                description: "자신의 생각과 감정을 열정적으로 표현합니다."
            },
            {
                title: "동기부여",
                description: "친구들에게 도전할 용기와 영감을 줍니다."
            }
        ],
        strengths: [
            {
                title: "창의적 문제해결",
                description: "새로운 시각으로 문제를 해결합니다."
            },
            {
                title: "동기부여",
                description: "주변 사람들에게 도전 정신을 불어넣습니다."
            },
            {
                title: "적응력",
                description: "변화하는 상황에 빠르게 적응합니다."
            }
        ],
        weaknesses: [
            {
                title: "변덕스러움",
                description: "때로는 너무 빠른 변화로 주변을 혼란스럽게 할 수 있습니다."
            },
            {
                title: "현실성 부족",
                description: "이상적인 생각에 치우쳐 현실을 간과할 수 있습니다."
            }
        ]
    },
    "든든한 지원자형": {
        type: "든든한 지원자형",
        description: "당신은 친구들의 곁에서 실질적인 도움을 주는 믿음직한 친구입니다. 안정감 있는 성격으로 어려울 때 의지할 수 있는 든든한 버팀목이 되어주며, 필요한 순간에 실제적인 해결책과 지원을 아끼지 않습니다. 약속을 철저히 지키고 책임감 있게 행동하여 신뢰를 쌓으며, 친구의 성장과 발전을 위해 적극적으로 도움을 제공합니다. 당신의 실용적이고 안정적인 성격은 주변 사람들에게 큰 신뢰와 안정감을 줍니다.",
        personalityTraits: [
            {
                title: "책임감",
                description: "맡은 일을 끝까지 책임지고 완수합니다."
            },
            {
                title: "신뢰성",
                description: "한결같은 태도로 친구들의 신뢰를 얻습니다."
            },
            {
                title: "실용성",
                description: "실질적인 도움과 해결책을 제공합니다."
            }
        ],
        communicationStyle: [
            {
                title: "차분한 대화",
                description: "안정감 있는 태도로 대화를 이끌어갑니다."
            },
            {
                title: "실용적 조언",
                description: "현실적이고 실천 가능한 조언을 제공합니다."
            },
            {
                title: "일관된 소통",
                description: "변함없는 태도로 신뢰를 쌓아갑니다."
            }
        ],
        strengths: [
            {
                title: "실질적 지원",
                description: "필요한 순간에 실제적인 도움을 제공합니다."
            },
            {
                title: "안정감",
                description: "변함없는 태도로 안정감을 줍니다."
            },
            {
                title: "신뢰성",
                description: "약속을 지키고 책임감 있게 행동합니다."
            }
        ],
        weaknesses: [
            {
                title: "융통성 부족",
                description: "때로는 너무 원칙적이어서 유연성이 부족할 수 있습니다."
            },
            {
                title: "과도한 책임감",
                description: "자신의 한계를 넘어서는 책임을 지려 할 수 있습니다."
            }
        ]
    },
    "충실한 동반자형": {
        type: "충실한 동반자형",
        description: "당신은 변함없이 친구의 곁을 지키는 신뢰할 수 있는 친구입니다. 오랜 시간이 지나도 한결같은 마음으로 우정을 지켜내며, 어떤 상황에서도 친구를 위해 헌신하는 모습을 보여줍니다. 깊이 있는 대화를 나누며 서로를 더 깊이 이해하려 노력하고, 친구의 성장과 행복을 진심으로 응원합니다. 당신의 진정성 있는 태도와 변함없는 지지는 오랫동안 지속되는 깊은 우정을 만들어냅니다.",
        personalityTraits: [
            {
                title: "충실함",
                description: "관계에 대한 깊은 헌신과 충실함을 보여줍니다."
            },
            {
                title: "일관성",
                description: "변함없는 태도로 안정적인 관계를 유지합니다."
            },
            {
                title: "신뢰성",
                description: "약속과 믿음을 중요하게 여깁니다."
            }
        ],
        communicationStyle: [
            {
                title: "진정성 있는 대화",
                description: "진심을 담아 대화하며 신뢰를 쌓습니다."
            },
            {
                title: "경청하는 자세",
                description: "친구의 이야기를 끝까지 들어주고 이해합니다."
            },
            {
                title: "안정적인 소통",
                description: "일관된 태도로 편안한 대화를 이끌어갑니다."
            }
        ],
        strengths: [
            {
                title: "관계 유지",
                description: "오랜 시간 동안 변함없는 우정을 지켜냅니다."
            },
            {
                title: "정서적 안정",
                description: "안정적인 태도로 신뢰를 형성합니다."
            },
            {
                title: "헌신",
                description: "친구를 위해 진심으로 헌신합니다."
            }
        ],
        weaknesses: [
            {
                title: "변화에 대한 두려움",
                description: "새로운 변화를 받아들이는 것을 어려워할 수 있습니다."
            },
            {
                title: "과도한 의존",
                description: "때로는 관계에 지나치게 의존할 수 있습니다."
            }
        ]
    }
};

// Claude API 관련 코드 임시 제거
/*
const claudeApiKey = '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';

async function getClaudeAnalysis(result, additional = false) {
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': claudeApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                messages: [{
                    role: "user",
                    content: `친구 유형 테스트 결과를 바탕으로 맞춤형 조언을 제공해주세요:
                    유형: ${result.type}
                    특징: ${result.description}
                    ${additional ? '추가적인 조언을 부탁드립니다.' : ''}`
                }],
                model: "claude-3-sonnet-20240229",
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('API 요청 실패');
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Claude API 오류:', error);
        return null;
    }
}

// AI 조언 업데이트 함수
async function updateAIAdvice(resultData) {
    const advice = await getClaudeAnalysis(resultData);
    if (advice) {
        document.querySelector('.general-advice').textContent = advice;
    } else {
        document.querySelector('.general-advice').textContent = 
            "현재 AI 조언을 불러올 수 없습니다. 나중에 다시 시도해주세요.";
    }
}

// 추가 조언 요청 버튼 이벤트 리스너
document.querySelector('.more-advice-btn').addEventListener('click', async () => {
    const currentType = document.getElementById('result-type').textContent;
    const resultData = friendTypes[currentType];
    const advice = await getClaudeAnalysis(resultData, true);
    if (advice) {
        document.querySelector('.general-advice').textContent = advice;
    }
});
*/

// 시작 버튼 이벤트 리스너
startButton.addEventListener('click', startTest);

// 테스트 시작 함수
function startTest() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    showQuestion();
}

// 질문 표시 함수
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;

    // 선택지 생성
    createOptions(question.options);

    // 진행률 업데이트
    updateProgress();
}

// 선택지 생성 함수
function createOptions(options) {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // 선택지와 인덱스를 함께 저장
    let indexedOptions = options.map((option, index) => ({
        text: option,
        originalIndex: index
    }));
    
    // 선택지 순서를 랜덤으로 섞기
    shuffleArray(indexedOptions);
    
    indexedOptions.forEach((option) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'question-option';
        optionElement.textContent = option.text;
        optionElement.onclick = () => selectOption(option.originalIndex);
        optionsContainer.appendChild(optionElement);
    });
}

// 선택지 선택 함수
function selectOption(index) {
    // 이미 답변했다면 무시
    if (currentQuestionIndex >= questions.length) return;
    
    // 이전 선택 제거
    document.querySelectorAll('.question-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 새로운 선택 표시
    const selectedOption = event.target;
    selectedOption.classList.add('selected');
    
    // 현재 질문에 대한 답변 저장
    userAnswers[currentQuestionIndex] = index;
    
    // 잠시 후 다음 질문으로
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            showResult();
        } else {
            showQuestion();
        }
    }, 500);
}

// 진행률 업데이트
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.querySelector('.progress-bar-fill').style.width = `${progress}%`;
}

// 결과 표시 함수
async function showResult() {
    const resultData = calculateResult();
    const type = resultData.type;
    const resultType = resultTypes[type];
    if (!resultType) {
        console.error('결과 데이터를 찾을 수 없습니다:', type);
        return;
    }
    
    // 기본 결과 표시
    document.getElementById('result-type').textContent = resultType.type || '';
    document.getElementById('result-description').textContent = resultType.description || '';
    
    // 성격 특성 목록 표시
    const personalityTraitsListEl = document.getElementById('personality-traits-list');
    if (resultType.personalityTraits && Array.isArray(resultType.personalityTraits)) {
        personalityTraitsListEl.innerHTML = resultType.personalityTraits.map(trait => `
            <li>
                <div class="personality-trait-title">${trait.title || ''}</div>
                <div class="personality-trait-description">${trait.description || ''}</div>
            </li>
        `).join('');
    } else {
        personalityTraitsListEl.innerHTML = '<li>성격 특성 정보가 없습니다.</li>';
    }

    // 의사소통 스타일 목록 표시
    const communicationListEl = document.getElementById('communication-style-list');
    if (resultType.communicationStyle && Array.isArray(resultType.communicationStyle)) {
        communicationListEl.innerHTML = resultType.communicationStyle.map(style => `
            <li>
                <div class="communication-style-title">${style.title || ''}</div>
                <div class="communication-style-description">${style.description || ''}</div>
            </li>
        `).join('');
    } else {
        communicationListEl.innerHTML = '<li>의사소통 스타일 정보가 없습니다.</li>';
    }

    // 강점 목록 표시
    const strengthsListEl = document.getElementById('strengths-list');
    if (resultType.strengths && Array.isArray(resultType.strengths)) {
        strengthsListEl.innerHTML = resultType.strengths.map(strength => {
            if (typeof strength === 'string') {
                return `<li>${strength}</li>`;
            } else {
                return `
                    <li>
                        <span class="strength-title">${strength.title || ''}</span>
                        <p>${strength.description || ''}</p>
                    </li>
                `;
            }
        }).join('');
    } else {
        strengthsListEl.innerHTML = '<li>강점 정보가 없습니다.</li>';
    }

    // 약점 목록 표시
    const weaknessesListEl = document.getElementById('weaknesses-list');
    if (resultType.weaknesses && Array.isArray(resultType.weaknesses)) {
        weaknessesListEl.innerHTML = resultType.weaknesses.map(weakness => {
            if (typeof weakness === 'string') {
                return `<li>${weakness}</li>`;
            } else {
                return `
                    <li>
                        <span class="weakness-title">${weakness.title || ''}</span>
                        <p>${weakness.description || ''}</p>
                    </li>
                `;
            }
        }).join('');
    } else {
        weaknessesListEl.innerHTML = '<li>보완할 점 정보가 없습니다.</li>';
    }

    // 유형별 이미지 설정
    const typeImage = document.getElementById('type-illustration');
    if (resultType.type) {
        typeImage.src = `images/characters/${resultType.type.toLowerCase().replace(/ /g, '-')}.png`;
        typeImage.alt = resultType.type;
    }

    // 화면 전환
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('result-screen').classList.add('active');
}

// 결과 공유 함수
function shareResult() {
    const result = calculateResult();
    const shareText = `나의 친구 유형 테스트 결과:\n${result.type}\n\n테스트 해보기 👉`;
    
    if (navigator.share) {
        navigator.share({
            title: '나의 친구 유형 테스트',
            text: shareText,
            url: window.location.href
        })
        .catch(error => {
            console.log('공유 실패:', error);
            alert('결과를 복사했습니다! 원하는 곳에 붙여넣어 공유하세요.');
            copyToClipboard(shareText + window.location.href);
        });
    } else {
        alert('결과를 복사했습니다! 원하는 곳에 붙여넣어 공유하세요.');
        copyToClipboard(shareText + window.location.href);
    }
}

// 클립보드 복사 함수
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// 카카오톡 SDK 초기화
function initializeKakao() {
    if (window.Kakao) {
        if (!Kakao.isInitialized()) {
            Kakao.init('6cea03176eadeb287f4ed7dd11ab687e'); // 여기에 실제 앱 키를 넣어주세요
        }
    }
}

// 카카오톡 공유하기
function shareToKakao() {
    if (!window.Kakao) {
        console.error('Kakao SDK가 로드되지 않았습니다.');
        return;
    }

    const result = calculateResult();
    const resultType = resultTypes[result.type];

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '나의 친구 유형 테스트 결과',
            description: `나는 "${result.type}" 유형입니다.\n${resultType.description.substring(0, 100)}...`,
            imageUrl: window.location.origin + `/images/characters/${result.type.toLowerCase().replace(/ /g, '-')}.png`,
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
        buttons: [
            {
                title: '테스트 하러가기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        ],
    });
}

// URL에서 결과 파라미터 읽기
function getResultFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultType = decodeURIComponent(urlParams.get('result') || '');
    
    // 정확한 타입 매칭
    const foundType = Object.keys(resultTypes).find(type => type === resultType);
    if (foundType) {
        return foundType;
    }
    return null;
}

// 페이지 로드 시 URL 파라미터 확인
document.addEventListener('DOMContentLoaded', () => {
    const resultFromURL = getResultFromURL();
    if (resultFromURL) {
        currentQuestionIndex = questions.length; // 모든 질문을 완료한 것으로 처리
        showResult(resultFromURL);
    }
    
    // 카카오톡 초기화
    initializeKakao();
    
    // 시작 버튼
    document.getElementById('start-btn').addEventListener('click', startTest);
    
    // 공유 버튼들
    const kakaoShareBtn = document.getElementById('kakao-share-btn');
    if (kakaoShareBtn) {
        kakaoShareBtn.addEventListener('click', () => {
            try {
                shareToKakao();
            } catch (error) {
                console.error('카카오톡 공유 중 오류:', error);
                showToast('카카오톡 공유 중 오류가 발생했습니다.');
            }
        });
    }
    
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            try {
                copyLink();
            } catch (error) {
                console.error('링크 복사 중 오류:', error);
                showToast('링크 복사 중 오류가 발생했습니다.');
            }
        });
    }
});

// 링크 복사하기
function copyLink() {
    const result = calculateResult();
    const url = new URL(window.location.href);
    url.searchParams.set('result', result.type);
    const shareUrl = url.toString();
    
    if (navigator.clipboard && window.isSecureContext) {
        // navigator.clipboard API 사용 (HTTPS 환경)
        navigator.clipboard.writeText(shareUrl)
            .then(() => showToast('결과 링크가 복사되었습니다!'))
            .catch(() => showToast('링크 복사에 실패했습니다.'));
    } else {
        // 대체 방법 (HTTP 환경)
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showToast('결과 링크가 복사되었습니다!');
        } catch (err) {
            console.error('링크 복사 실패:', err);
            showToast('링크 복사에 실패했습니다.');
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// 카카오톡 공유하기
function shareToKakao() {
    if (!window.Kakao) {
        console.error('Kakao SDK가 로드되지 않았습니다.');
        return;
    }

    const result = calculateResult();
    const resultType = resultTypes[result.type];
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('result', result.type);

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '나의 친구 유형 테스트 결과',
            description: `나는 "${result.type}" 유형입니다.\n${resultType.description.substring(0, 100)}...`,
            imageUrl: window.location.origin + `/images/characters/${result.type.toLowerCase().replace(/ /g, '-')}.png`,
            link: {
                mobileWebUrl: shareUrl.toString(),
                webUrl: shareUrl.toString(),
            },
        },
        buttons: [
            {
                title: '테스트 하러가기',
                link: {
                    mobileWebUrl: window.location.origin + window.location.pathname,
                    webUrl: window.location.origin + window.location.pathname,
                },
            },
            {
                title: '결과 보기',
                link: {
                    mobileWebUrl: shareUrl.toString(),
                    webUrl: shareUrl.toString(),
                },
            }
        ],
    });
}

// 토스트 메시지 표시
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}

// 결과를 이미지로 저장하는 함수
async function saveAsImage() {
    try {
        // 이미지 저장 중임을 알리는 토스트 메시지
        showToast('이미지를 생성하는 중입니다...');
        
        // 결과 섹션의 스타일을 임시로 조정
        const resultSection = document.querySelector('.result-container');
        const originalPosition = resultSection.style.position;
        resultSection.style.position = 'relative';
        
        // 공유 버튼 숨기기
        const shareButtons = document.querySelector('.share-buttons');
        const originalDisplay = shareButtons.style.display;
        shareButtons.style.display = 'none';

        // html2canvas 옵션
        const options = {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            onclone: function(clonedDoc) {
                // 클론된 문서의 스타일 조정
                const clonedResult = clonedDoc.querySelector('.result-container');
                if (clonedResult) {
                    clonedResult.style.padding = '20px';
                    clonedResult.style.margin = '0';
                    clonedResult.style.width = 'auto';
                }
            }
        };

        // 이미지 생성
        const canvas = await html2canvas(resultSection, options);
        
        // 원래 스타일 복구
        resultSection.style.position = originalPosition;
        shareButtons.style.display = originalDisplay;

        // 이미지 저장
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = '나의_친구_유형_테스트_결과.png';
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('이미지가 저장되었습니다!');
    } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
        showToast('이미지 저장에 실패했습니다. 다시 시도해주세요.');
        
        // 에러 발생 시 스타일 복구
        const resultSection = document.querySelector('.result-container');
        const shareButtons = document.querySelector('.share-buttons');
        if (resultSection) resultSection.style.position = 'relative';
        if (shareButtons) shareButtons.style.display = 'flex';
    }
}

// 결과 계산 함수
function calculateResult() {
    // 답변 패턴 분석
    let patterns = {
        "분위기 메이커형": 0,
        "신중한 조언가형": 0,
        "감성적 지원가형": 0,
        "든든한 지원자형": 0,
        "충실한 동반자형": 0
    };
    
    // 각 답변에 따른 성향 점수 계산
    userAnswers.forEach((answer, index) => {
        switch(answer) {
            case 0: // 적극적/외향적 답변
                patterns["분위기 메이커형"] += 2;
                patterns["든든한 지원자형"] += 1;
                break;
            case 1: // 신중/논리적 답변
                patterns["신중한 조언가형"] += 2;
                patterns["충실한 동반자형"] += 1;
                break;
            case 2: // 감성적/공감적 답변
                patterns["감성적 지원가형"] += 2;
                patterns["든든한 지원자형"] += 1;
                break;
            case 3: // 관찰자/독립적 답변
                patterns["충실한 동반자형"] += 2;
                patterns["신중한 조언가형"] += 1;
                break;
        }
    });
    
    // 가장 높은 점수의 성향 찾기
    let maxScore = -1;
    let resultType = "든든한 지원자형"; // 기본값
    
    for (const [type, score] of Object.entries(patterns)) {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    }
    
    return {
        type: resultType,
        patterns: patterns
    };
}

// 테스트 다시하기 함수
function restartTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// 배열을 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
