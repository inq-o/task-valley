# Task Valley 에이전트 인계 가이드

## 핵심 규칙

**모든 에이전트는 작업을 끝낼 때, 다음 에이전트가 컨텍스트 없이 바로 이어받을 수 있는 프롬프트를 남겨야 합니다.**

이 프롬프트는 PR 본문의 **"Handoff Prompt For Next Agent"** 섹션에 작성합니다.  
PR이 없는 경우(계획 문서만 작성한 경우 등)에는 해당 문서 하단 **"## 다음 단계"** 섹션에 작성합니다.

인계 프롬프트 없이 작업을 완료했다고 간주하지 않습니다.

---

## 인계 프롬프트 작성 원칙

좋은 인계 프롬프트는 다음 조건을 만족합니다.

1. **역할 선언** — 첫 줄에 "당신은 Task Valley의 [역할]입니다."로 시작합니다.
2. **현재 상황** — 직전 에이전트가 무엇을 완료했는지, 앱/문서의 현재 상태를 2~3줄로 설명합니다.
3. **읽어야 할 문서** — 반드시 읽어야 할 파일 목록을 명시합니다. 항상 최신 파일을 포함합니다.
4. **구체적인 작업 지시** — "구현해 주세요"가 아니라 무엇을 어떻게 해야 하는지 명시합니다.
5. **완료 기준** — 작업이 끝났다고 판단할 수 있는 인수 조건을 나열합니다.
6. **하지 말 것** — 이 시점에서 범위를 벗어날 수 있는 항목을 명시합니다.

---

## 흐름별 인계 프롬프트

### Claude → Antigravity

Claude가 계획 문서를 완성한 후 Antigravity에게 디자인을 요청할 때 사용합니다.

**양식:**

```
당신은 Task Valley의 디자이너이자 비주얼 프로토타이퍼입니다.

## 현재 상황
- Claude가 MVP v0.1 구현 계획을 완성했습니다.
- 기술 스택, 타입 모델, 컴포넌트 구조, 기능 분해, 인수 조건이 확정되었습니다.
- 임시 컬러 팔레트가 MVP_PLAN_V01.md에 있지만, 이 팔레트는 당신의 산출물로 교체됩니다.
- 아직 코드는 없습니다. 당신의 산출물이 나와야 Codex가 구현을 시작합니다.

## 읽어야 할 문서
- AGENTS.md
- docs/product/PRD.md
- docs/product/MVP_PLAN_V01.md
- docs/design/DESIGN_BRIEF.md
- GitHub Issue #1

## 당신의 작업
docs/design/DESIGN_PROPOSAL_V01.md 파일을 작성해 주세요.

포함할 항목:
1. 데스크톱 레이아웃 방향 (1024px 이상, 마을+과제 2열)
2. 모바일 레이아웃 방향 (390px 기준, 마을 먼저 1열)
3. 컬러 팔레트 (Tailwind 커스텀 토큰 형식으로, tailwind.config.js에 바로 쓸 수 있게)
4. 마을 구역별 비주얼 메모 (훈련장/도서관/작업장/공원이 CSS 블록으로 어떻게 구분되는지)
5. stage 0~3 상태 차이 (각 단계에서 무엇이 바뀌는지, Tailwind class 기준)
6. Codex 구현 메모 (가장 중요한 구현 우선순위와 피해야 할 것)

## 완료 기준
- docs/design/DESIGN_PROPOSAL_V01.md 파일이 생성되었다
- 컬러 팔레트가 tailwind.config.js에 바로 붙여넣을 수 있는 형식이다
- Codex가 이 문서만 보고 CSS 클래스 결정을 내릴 수 있다
- 이미지 에셋 없이 CSS 블록으로 구현 가능한 방향이다

## 하지 말 것
- 복잡한 이미지 에셋이나 스프라이트 파이프라인이 필요한 디자인을 제안하지 마세요
- 인벤토리, 캐릭터, 온보딩 화면 등 v0.1 비범위 항목의 디자인은 하지 마세요
- 마케팅 랜딩 페이지나 SaaS 대시보드처럼 보이는 방향은 피하세요
- 문서 작성 이외에 코드 파일은 수정하지 마세요
```

---

### Antigravity → Codex

Antigravity가 디자인 산출물을 완성한 후 Codex에게 구현을 요청할 때 사용합니다.

**양식:**

```
당신은 Task Valley의 개발자입니다.

## 현재 상황
- Claude가 구현 계획(docs/product/MVP_PLAN_V01.md)을 완성했습니다.
- Antigravity가 디자인 산출물(docs/design/DESIGN_PROPOSAL_V01.md)을 완성했습니다.
- 아직 Next.js 프로젝트가 없습니다. 지금이 첫 구현 시작 시점입니다.
- 컬러 팔레트는 DESIGN_PROPOSAL_V01.md에 tailwind.config.js 형식으로 정의되어 있습니다.

## 읽어야 할 문서
- AGENTS.md
- docs/product/MVP_PLAN_V01.md        ← 타입, 컴포넌트 구조, F1~F8 인수 조건
- docs/design/DESIGN_PROPOSAL_V01.md  ← 컬러, 레이아웃, 비주얼 상태
- docs/process/REVIEW_CHECKLIST.md    ← Claude 리뷰 기준

## 당신의 작업
Next.js + TypeScript + Tailwind CSS로 MVP v0.1을 구현하고 PR을 올려 주세요.

구현 순서 (MVP_PLAN_V01.md F1~F8 기준):
1. F1: 프로젝트 초기화 (create-next-app, 보일러플레이트 정리)
2. F2: 타입 정의 및 초기 상태 (types/index.ts, DEFAULT_TASKS, createInitialState)
3. F3: localStorage 서비스 (lib/storage.ts — loadState, saveState, handleDateReset)
4. F4: useDailyState 훅 (hooks/useDailyState.ts + lib/village.ts 순수 함수)
5. F5~F7: 컴포넌트 구현 (StatusBar, VillageZone, TaskItem)
6. F8: 메인 레이아웃 (app/page.tsx, 반응형)

PR 본문에는 반드시 .github/PULL_REQUEST_TEMPLATE.md 형식을 따르고,
"Handoff Prompt For Next Agent" 섹션에 Claude 리뷰 요청 프롬프트를 작성하세요.

## 완료 기준
- npm run typecheck, lint, build 모두 통과
- 브라우저에서 핵심 흐름 동작 확인:
  - 첫 접속 시 어두운 마을 + 과제 4개
  - 완료 버튼 클릭 즉시 마을 구역 변화
  - 새로고침 후 상태 유지
- 데스크톱(1024px)과 모바일(390px) 레이아웃 확인
- PR 본문 형식 완성 (Handoff Prompt 포함)

## 하지 말 것
- 백엔드, 인증, 데이터베이스를 추가하지 마세요
- AI API 호출을 넣지 마세요
- 과제 5번째 슬롯이나 편집 기능을 추가하지 마세요
- 인벤토리, 상점, NPC, 온보딩 화면을 추가하지 마세요
- localStorage를 SSR 방어 없이 직접 접근하지 마세요
```

---

### Codex → Claude (리뷰 요청)

Codex가 구현을 완료하고 PR을 올린 후 Claude에게 리뷰를 요청할 때 사용합니다.  
PR 본문의 "Handoff Prompt For Next Agent" 섹션에 아래 양식을 작성합니다.

**양식:**

```
당신은 Task Valley의 기획자이자 리뷰어입니다.

## 현재 상황
- Codex가 MVP v0.1 첫 구현 PR을 올렸습니다.
- PR #[번호]: [PR 제목]
- 구현된 기능: [F1~F8 중 이번에 구현된 항목 나열]
- 현재 앱 상태: [로컬에서 동작하는지, CI 통과 여부 등]

## 읽어야 할 문서
- docs/process/REVIEW_CHECKLIST.md  ← 리뷰 기준
- docs/product/MVP_PLAN_V01.md      ← 타입/AC 기준
- PR diff

## 당신의 작업
docs/process/REVIEW_CHECKLIST.md의 모든 항목을 순서대로 확인하고 PR 리뷰를 남겨 주세요.

통과하지 못한 항목은 PR 코멘트에 파일명:라인번호와 함께 구체적으로 적어 주세요.
모든 항목이 통과하면 Approve하고 Merge해 주세요.

## 완료 기준
- REVIEW_CHECKLIST.md의 모든 섹션 확인 완료
- 통과 항목과 미통과 항목이 명확히 기록됨
- Approve 또는 Request Changes 결정이 내려짐
- Approve인 경우: 다음 작업(Antigravity UI 조정 또는 다음 기능 구현)을 위한 Handoff Prompt 작성

## 하지 말 것
- 리뷰 범위를 벗어난 새 기능을 직접 구현하지 마세요
- 범위를 벗어난 기능을 Codex에게 추가로 요청하지 마세요
- Antigravity 디자인 방향을 뒤집는 피드백을 주지 마세요 (명확한 구현 문제가 없다면)
```

---

## 인계 흐름 요약

```
Claude
  │  계획 완성 → Antigravity에게 handoff
  ▼
Antigravity
  │  디자인 산출물 완성 → Codex에게 handoff
  ▼
Codex
  │  구현 PR 올림 → PR 본문에 Claude handoff 포함
  ▼
Claude
  │  PR 리뷰 → Approve 시 다음 handoff 작성
  ▼
(반복 또는 다음 마일스톤)
```

각 단계에서 handoff 프롬프트가 없으면 다음 에이전트는 작업을 시작할 수 없습니다.
