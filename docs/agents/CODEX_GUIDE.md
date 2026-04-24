# Codex 가이드

## 역할

당신은 Task Valley의 개발자입니다.

PRD와 디자인 브리프를 Next.js, TypeScript, Tailwind CSS 기반의 동작하는 MVP로 구현합니다.

## 먼저 읽을 문서

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/design/DESIGN_BRIEF.md`
- `docs/agents/CLAUDE_GUIDE.md`
- `docs/agents/ANTIGRAVITY_GUIDE.md`
- GitHub Issue #1: Task Valley MVP v0.1

## 첫 구현 작업

MVP 앱 기반과 핵심 루프를 구현합니다.

구현 항목:

- Next.js + TypeScript + Tailwind 프로젝트 설정
- 네 개의 일일 과제 슬롯
- 과제와 마을 상태 타입 모델
- 과제 완료 동작
- 마을 구역 에너지 업데이트
- localStorage 저장
- 반응형 첫 화면

## 사용할 프롬프트

```text
당신은 Task Valley의 개발자입니다.

AGENTS.md, docs/product/PRD.md, docs/design/DESIGN_BRIEF.md, docs/agents/CLAUDE_GUIDE.md, docs/agents/ANTIGRAVITY_GUIDE.md, GitHub Issue #1을 읽어 주세요.

Next.js, TypeScript, Tailwind CSS로 MVP v0.1을 구현해 주세요. 저장은 localStorage를 사용합니다. 핵심 루프는 네 개의 일일 과제, 완료 처리, 마을 에너지 업데이트, 눈에 보이는 마을 변화, 새로고침 후 상태 유지입니다. 인증, 백엔드, 데이터베이스, AI API 호출, 큰 게임 시스템은 추가하지 마세요.
```

## 구현 메모

- 가능하면 도메인 로직과 UI를 분리합니다.
- 과제 생성, 완료 처리, 점수 계산, 마을 업데이트에는 타입이 명확한 헬퍼 함수를 사용합니다.
- Antigravity 피드백 후 쉽게 수정할 수 있도록 비주얼 구현은 단순하게 유지합니다.
- localStorage는 클라이언트 환경에서 방어적으로 사용합니다.
- 로그인이나 초기 설정 없이 첫 화면이 바로 의미 있게 보여야 합니다.

## 검증

인계 전 가능한 검사를 실행합니다.

- 타입 체크
- 린트
- 단위 테스트가 있으면 실행
- 수동 브라우저 테스트:
  - 첫 실행 시 어두운 마을과 4개 과제가 보이는가
  - 각 과제를 완료하면 올바른 구역이 변하는가
  - 새로고침 후 진행 상태가 유지되는가
  - 데스크톱과 모바일에서 레이아웃이 겹치지 않는가

## 하지 말 것

- v0.1에 데이터베이스를 추가하지 마세요.
- v0.1에 인증을 추가하지 마세요.
- 제품 런타임에 OpenAI 등 AI API 호출을 넣지 마세요.
- 코드 줄 수 자동 측정을 아직 구현하지 마세요.
- 핵심 루프가 동작하기 전 복잡한 타이머를 구현하지 마세요.
