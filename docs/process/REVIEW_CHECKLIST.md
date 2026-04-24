# Task Valley PR 리뷰 체크리스트

리뷰어: Claude Code  
적용 범위: 모든 구현 PR (Codex → Claude 인계 시점)

---

## 사용 방법

PR을 받으면 아래 항목을 위에서 아래로 순서대로 확인합니다.  
통과하지 못한 항목은 PR 코멘트로 구체적인 위치(파일:라인)와 함께 남깁니다.  
모든 항목이 통과되어야 Merge 승인입니다.

---

## 1. 핵심 루프

가장 먼저 확인합니다. 이것이 깨지면 다른 항목은 의미 없습니다.

- [ ] 첫 화면 로드 시 어두운 마을과 과제 4개가 모두 보인다
- [ ] 과제 완료 버튼 클릭 즉시(딜레이 없이) 해당 마을 구역이 시각적으로 바뀐다
- [ ] 새로고침 후 완료 상태와 마을 에너지가 유지된다
- [ ] 날짜가 바뀌면 과제 completed는 초기화되고, 마을 zone stage는 유지된다
- [ ] 이미 완료된 과제를 다시 클릭해도 totalCompletions가 중복 증가하지 않는다

## 2. 타입 및 도메인 로직

- [ ] `tsc --noEmit` 오류 없음
- [ ] `any` 타입 사용 없음
- [ ] `TaskCategory`, `Task`, `VillageZone`, `VillageState`, `DailyState` 타입이 MVP_PLAN_V01.md 명세와 일치한다
- [ ] `calcStage`, `calcLevel`, `handleDateReset`이 순수 함수로 `lib/`에 분리되어 있다
- [ ] `completeTask` 로직이 UI 컴포넌트 안에 인라인으로 섞여 있지 않다

## 3. localStorage

- [ ] localStorage 접근이 `typeof window !== 'undefined'` 또는 `try/catch`로 방어되어 있다
- [ ] SSR 환경(Next.js)에서 하이드레이션 에러가 발생하지 않는다
- [ ] 저장 데이터 스키마가 타입 명세와 일치한다 (파싱 실패 시 초기값으로 폴백)

## 4. 비주얼

- [ ] stage 0(버려진)과 stage 3(활기) 구역의 색 차이가 눈에 띈다
- [ ] 완료된 과제와 미완료 과제가 시각적으로 명확히 구분된다 (opacity 또는 취소선 + 테두리 색)
- [ ] 완료된 과제의 버튼이 비활성화 상태로 보인다
- [ ] 전체 배경이 어둡다 (`#0f0f1a`)
- [ ] 마을이 과제 목록보다 시각적으로 우선순위가 높아 보인다
- [ ] SaaS 대시보드 또는 마케팅 랜딩 페이지처럼 보이지 않는다
- [ ] 과제 슬롯에 과도한 `rounded-lg` 이상의 모서리나 두꺼운 그림자가 없다

## 5. 반응형

- [ ] 데스크톱(1024px+): 마을(좌 60~70%) + 과제 목록(우 30~40%) 2열 레이아웃
- [ ] 모바일(390px): 마을 먼저, 과제 목록 아래 1열 레이아웃
- [ ] 두 환경 모두 요소가 겹치거나 잘리지 않는다

## 6. 범위

PR에 아래 항목이 포함되어 있으면 즉시 반려합니다.

- [ ] 백엔드, API 라우트, 데이터베이스 코드 없음
- [ ] 인증(auth) 코드 없음
- [ ] AI API 호출 없음 (OpenAI, Anthropic 등)
- [ ] v0.1 비범위 항목(인벤토리, 상점, NPC, 온보딩 화면, 캐릭터 커스터마이즈 등) 없음
- [ ] 과제 5번째 슬롯 없음

## 7. 코드 품질

- [ ] `lint` 오류 없음
- [ ] 불필요한 `console.log` 없음
- [ ] 컴포넌트 파일이 단일 책임을 가진다 (마을 로직이 과제 컴포넌트 안에 없음 등)
- [ ] 주석이 "what"이 아닌 "why"를 설명한다 (또는 주석 없음)

## 8. PR 형식

- [ ] PR 본문에 Summary, Changes, Verification, Screenshots or UI Notes, Handoff Prompt For Next Agent, Risks / Open Questions 섹션이 모두 있다
- [ ] Handoff Prompt가 다음 에이전트가 바로 복사해서 쓸 수 있는 수준으로 작성되어 있다
- [ ] Verification 항목 중 실행하지 못한 항목은 이유가 명시되어 있다

---

## 반려 기준

아래 중 하나라도 해당하면 반려 (Request Changes)합니다.

1. 핵심 루프 섹션에서 미통과 항목이 있는 경우
2. `tsc --noEmit` 또는 `lint` 실패
3. v0.1 범위를 벗어난 기능이 포함된 경우
4. localStorage가 SSR에서 안전하지 않게 사용된 경우
5. Handoff Prompt가 빠진 경우

---

## 승인 후 액션

PR 승인 시 다음 에이전트에게 PR 본문의 **Handoff Prompt For Next Agent** 섹션을 그대로 전달합니다.
