// Claude API 설정
const CLAUDE_CONFIG = {
    API_KEY: 'your-api-key-here', // 실제 API 키로 교체 필요
    API_ENDPOINT: 'https://api.anthropic.com/v1/messages',
    MODEL: 'claude-3-sonnet-20240229'
};

// 프롬프트 템플릿
const ANALYSIS_PROMPT = `당신은 친구 유형 테스트 결과를 분석하는 전문가입니다. 
다음 정보를 바탕으로 사용자의 친구 관계 스타일에 대해 자세히 분석해주세요:

유형: {type}
답변 패턴: {answers}

다음 항목들에 대해 분석해주세요:
1. 현재 친구 관계의 강점
2. 발전 가능한 부분
3. 이상적인 친구 관계를 위한 구체적인 조언
4. 특히 주의해야 할 상황과 대처 방법
5. 당신과 잘 맞는 친구의 특징

분석은 따뜻하고 건설적인 톤으로 작성해주세요.`;

export { CLAUDE_CONFIG, ANALYSIS_PROMPT };
