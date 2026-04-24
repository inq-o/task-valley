# Task Valley MVP v0.1 — 구현 계획

작성자: Claude Code (기획자/리뷰어)  
기준 문서: AGENTS.md, PRD.md, DESIGN_BRIEF.md, GitHub Issue #1

---

## 1. 사용자 흐름

```
앱 접속
  └─ localStorage 확인
       ├─ 첫 접속 → 기본 상태 생성 (어두운 마을 + 과제 4개)
       └─ 재접속 → 저장된 상태 로드
            └─ 날짜가 바뀌었으면 → 과제 완료 상태만 초기화 (마을 에너지는 유지)

메인 화면 표시
  ├─ 상태 바: 오늘 날짜 / 마을 레벨 / 연속 달성일
  ├─ 도트 마을: 4개 구역 (각 구역은 현재 성장 단계를 시각적으로 표시)
  └─ 과제 목록: 4개 슬롯 (운동 / 공부 / 코딩 / 휴식)

과제 완료
  └─ 완료 버튼 클릭
       ├─ 과제 완료 처리 (완료 상태 = true)
       ├─ 해당 카테고리 구역 totalCompletions + 1
       ├─ 구역 progress 재계산 (0~100%)
       ├─ 마을 전체 회복률 재계산
       ├─ localStorage 저장
       └─ 마을 구역 즉시 시각 업데이트 (opacity 변화)
```

**핵심 감각:** 버튼을 누르는 순간 마을이 바뀐다. 딜레이 없이.

---

## 2. 확정 결정 사항

PRD와 디자인 브리프에 명시되지 않아 구현 전 결정이 필요한 항목을 아래와 같이 확정합니다.

### 과제 슬롯
- v0.1에서 과제 제목은 고정값입니다. 사용자가 편집할 수 없습니다.
- 기본 과제 목표 수치와 단위는 아래와 같습니다.

| 카테고리 | 제목 | 목표 | 단위 |
|----------|------|------|------|
| exercise | 오늘의 운동 | 30 | 분 |
| study | 오늘의 공부 | 1 | 시간 |
| coding | 오늘의 코딩 | 1 | 커밋 |
| rest | 오늘의 휴식 | 30 | 분 |

### 일일 초기화
- 앱 로드 시 localStorage의 `lastActiveDate`와 오늘 날짜(`YYYY-MM-DD`)를 비교합니다.
- 날짜가 다르면 과제 `completed` 플래그만 `false`로 초기화합니다.
- 마을 구역 `totalCompletions`와 `progress`는 초기화하지 않습니다.

### 마을 구역 7일 성장 로직

각 구역은 `totalCompletions` 누적값으로 `progress`(0~100)를 계산합니다.  
7일 연속 완료 시 해당 구역이 100% 회복됩니다.

**계산식:**
```
progress = Math.min(Math.round((totalCompletions / 7) * 100), 100)
```

**진행 예시:**

| totalCompletions | progress | 시각 상태 |
|-----------------|----------|-----------|
| 0 | 0% | 완전히 어두움 (opacity 0) |
| 1 | 14% | 첫 불빛 |
| 2 | 29% | |
| 3 | 43% | |
| 4 | 57% | 절반 넘어서 밝아지는 느낌 |
| 7 | 100% | 완전히 밝음 (opacity 1) |
| 7 초과 | 100% | 상한 고정 |

- progress는 한 번 오르면 내려가지 않습니다.
- `village_lit.png` 오버레이의 `opacity`가 `progress / 100` 값과 직접 연결됩니다.

### 마을 전체 회복률
- `level = Math.round(4개 구역 progress 평균)` (0 ~ 100)
- UI에는 `{level}% 회복` 형태로 표시합니다.
- 4개 구역을 모두 14일 완료하면 100%가 됩니다.

### 연속 달성일 (streak)
- 하루에 4개 과제를 모두 완료하면 streak + 1.
- 하루라도 모두 완료하지 못하면 streak 초기화.
- v0.1에서는 단순 표시만 합니다. 보상 UI는 없습니다.

### 컬러 팔레트 (Antigravity 산출물 전 임시 기본값)
Codex가 블로킹 없이 구현할 수 있도록 아래를 기본값으로 사용합니다.  
Antigravity 디자인 산출물이 나오면 이 색을 교체합니다.

| 용도 | 값 |
|------|----|
| 배경 | `#0f0f1a` |
| stage 0 구역 | `#1a1a2e` |
| stage 1 구역 | `#2a2a3d` (희미한 창문 불빛 amber 점 1개) |
| stage 2 구역 | `#3d3020` (따뜻한 어두운 황토색) |
| stage 3 구역 | `#5c4a1e` (밝은 황토색, 창문 여러 개 lit) |
| 텍스트 (일반) | `#e8e8f0` |
| 텍스트 (보조) | `#8888aa` |
| 완료 강조 | `#f59e0b` (amber) |
| 미완료 과제 테두리 | `#3a3a5c` |
| 완료 과제 테두리 | `#f59e0b` |

---

## 3. 타입 모델

Codex가 구현할 TypeScript 타입의 기준입니다.

```ts
type TaskCategory = 'exercise' | 'study' | 'coding' | 'rest'

interface Task {
  id: TaskCategory
  title: string
  targetValue: number
  unit: string
  completed: boolean
}

interface VillageZone {
  category: TaskCategory
  totalCompletions: number
  progress: number   // 0-100, calcProgress(totalCompletions)로 계산
}

interface VillageState {
  zones: VillageZone[]
  level: number      // 0-100, 4개 구역 progress 평균
  streak: number
  lastActiveDate: string  // 'YYYY-MM-DD'
}

interface DailyState {
  tasks: Task[]
  village: VillageState
}
```

> **변경 이력:** `VillageStage(0|1|2|3)` 타입과 `stage` 필드를 제거하고 연속형 `progress(0-100)`로 교체했습니다. (14일 성장 로직 반영)

---

## 4. 컴포넌트 구조

```
app/page.tsx
├── StatusBar          — 날짜 / Lv.{level} / 연속 {streak}일
├── VillageMap         — 4개 VillageZone 배치
│   └── VillageZone    — category prop, stage prop → 시각 상태 렌더링
└── TaskList           — 4개 TaskItem 배치
    └── TaskItem       — task prop, onComplete callback
```

상태는 단일 커스텀 훅 `useDailyState()`에서 관리합니다.

```ts
// hooks/useDailyState.ts
// 반환값:
// { tasks, village, completeTask(category: TaskCategory) }
```

도메인 로직은 순수 함수로 분리합니다.

```ts
// lib/village.ts
// calcProgress(totalCompletions): number   ← calcStage 대체
// calcLevel(zones): number                 ← 0-100 평균으로 변경
// applyCompletion(state, category): DailyState

// lib/storage.ts
// STORAGE_KEY = 'task-valley:v0.1.1:daily-state'  ← 스키마 변경으로 버전 bump
// loadState(): DailyState | null
// saveState(state: DailyState): void
// handleDateReset(state: DailyState, today: string): DailyState
```

---

## 5. 기능 분해 및 인수 조건

### F1 — 프로젝트 초기화
- [ ] `npx create-next-app` (TypeScript, Tailwind, App Router)
- [ ] 불필요한 보일러플레이트 제거
- [ ] `tsconfig.json` strict 모드 확인

**AC:** `npm run dev` 실행 시 빈 화면이 에러 없이 표시된다.

---

### F2 — 타입 및 초기 상태 정의
- [ ] 위 타입 모델을 `types/index.ts`에 정의
- [ ] `DEFAULT_TASKS` 상수 정의 (4개 기본 과제)
- [ ] `createInitialState()` 함수 작성

**AC:** TypeScript 타입 체크(`tsc --noEmit`)가 통과한다.

---

### F3 — localStorage 서비스
- [ ] `loadState()`: localStorage에서 파싱, 실패 시 null 반환
- [ ] `saveState()`: 직렬화 후 저장
- [ ] `handleDateReset()`: 날짜 비교 후 task completed 초기화

**AC:**
- 저장 후 새로고침 시 동일 상태가 복원된다.
- localStorage가 비어 있으면 초기 상태가 생성된다.
- 날짜가 다르면 task completed는 false로 초기화되고, village는 유지된다.

---

### F4 — useDailyState 훅
- [ ] 마운트 시 localStorage 로드 + 날짜 초기화 처리
- [ ] `completeTask(category)` 구현: task 완료 → zone 업데이트 → level 재계산 → streak 업데이트 → 저장
- [ ] 이미 완료된 과제는 두 번 처리되지 않도록 방어

**AC:**
- `completeTask('exercise')` 호출 시 exercise 구역 totalCompletions가 1 증가한다.
- 같은 과제를 두 번 눌러도 totalCompletions가 1 이상 증가하지 않는다.

---

### F5 — StatusBar 컴포넌트
- [ ] 오늘 날짜 표시 (예: `2026년 4월 24일`)
- [ ] 마을 레벨 표시 (`Lv. 0`)
- [ ] 연속 달성일 표시 (`0일 연속`)

**AC:** 상태 변경 시 레벨과 연속일이 즉시 업데이트된다.

---

### F6 — VillageZone 컴포넌트
- [ ] stage 0~3에 따라 다른 시각 상태를 CSS 블록으로 표현
- [ ] 구역 이름 표시 (훈련장 / 도서관 / 작업장 / 공원)
- [ ] stage 3은 stage 0보다 명확히 밝고 따뜻하게 보여야 함

**AC:**
- stage 0과 stage 3의 배경색 차이가 눈에 띄게 다르다.
- stage가 오를 때 transition이 있으면 좋지만 없어도 AC 통과 (v0.1 선택 사항).

---

### F7 — TaskItem 컴포넌트
- [ ] 카테고리, 제목, 목표(수치 + 단위), 완료 버튼 표시
- [ ] 완료 상태일 때 시각적으로 구분 (취소선 또는 불투명도 변경 + 완료 아이콘)
- [ ] 완료 상태에서는 버튼 비활성화

**AC:**
- 완료 전/후 상태가 시각적으로 명확히 구분된다.
- 완료된 과제의 버튼을 다시 눌러도 상태가 바뀌지 않는다.

---

### F8 — 메인 레이아웃 (page.tsx)
- [ ] 데스크톱: 마을(좌) + 과제 목록(우) 2열 배치
- [ ] 모바일: 마을 먼저, 과제 목록 아래 1열 배치
- [ ] 배경색 `#0f0f1a` 전체 화면

**AC:**
- 데스크톱(1024px+)과 모바일(390px)에서 레이아웃이 겹치거나 깨지지 않는다.
- 일반 할 일 앱처럼 보이지 않는다. 마을이 화면의 중심이다.

---

## 6. 비범위 (v0.1에서 하지 않는 것)

아래 항목은 Codex 구현 중 "이거 추가하면 좋을 것 같은데"가 생겨도 추가하지 않습니다.

| 항목 | 이유 |
|------|------|
| 사용자 계정 / 로그인 | v0.1 범위 밖 |
| 클라우드 동기화 / 데이터베이스 | v0.1 범위 밖 |
| AI API 호출 | v0.1 범위 밖 |
| 과제 제목/목표 수치 편집 | v0.1 범위 밖 |
| 코딩 커밋 수 자동 측정 | v0.1 범위 밖 |
| 복잡한 CSS 애니메이션 | 구현 우선순위 아님, 나중에 추가 |
| 온보딩 화면 / 튜토리얼 | v0.1 범위 밖 |
| 인벤토리 / 아이템 / 상점 | v0.1 범위 밖 |
| 알림 / 푸시 | v0.1 범위 밖 |
| 과제 완료 히스토리 뷰 | v0.1 범위 밖 |
| 마을 캐릭터 / NPC | v0.1 범위 밖 |
| 스프라이트 에셋 파이프라인 | v0.1 범위 밖 |
| 5번째 과제 슬롯 | PRD 정의 밖 |

---

## 7. Codex 리뷰 체크리스트

구현 PR을 리뷰할 때 아래를 순서대로 확인합니다.

### 핵심 루프
- [ ] 첫 화면 로드 시 어두운 마을과 4개 과제가 모두 보인다
- [ ] 과제 완료 버튼 클릭 → 해당 구역이 즉시 시각적으로 바뀐다 (딜레이 없음)
- [ ] 새로고침 후 완료 상태와 마을 에너지가 유지된다
- [ ] 날짜가 바뀌면 과제는 초기화되지만 마을 에너지는 유지된다

### 타입 및 로직
- [ ] `tsc --noEmit` 통과
- [ ] `completeTask`가 이미 완료된 과제에 대해 중복 처리하지 않는다
- [ ] `calcProgress`, `calcLevel`, `handleDateReset`이 순수 함수로 분리되어 있다
- [ ] localStorage 접근이 `typeof window !== 'undefined'` 또는 `try/catch`로 방어되어 있다
- [ ] `calcProgress(7)` === 100, `calcProgress(4)` === 57, `calcProgress(0)` === 0

### 비주얼
- [ ] progress 0%일 때 구역이 완전히 어둡고, 100%일 때 완전히 밝다
- [ ] 과제 완료 직후 해당 구역 opacity가 즉시 올라간다 (딜레이 없음)
- [ ] 완료된 과제와 미완료 과제가 시각적으로 구분된다
- [ ] 배경이 어둡고, 마을이 화면의 감정적 중심이다
- [ ] SaaS 대시보드나 마케팅 랜딩 페이지처럼 보이지 않는다

### 반응형
- [ ] 데스크톱 (1024px+) 레이아웃이 깨지지 않는다
- [ ] 모바일 (390px) 레이아웃이 깨지지 않는다

### 범위
- [ ] 백엔드, 인증, 데이터베이스 코드가 없다
- [ ] AI API 호출이 없다
- [ ] v0.1 비범위 항목이 구현되지 않았다

### 코드 품질
- [ ] 도메인 로직(lib/)과 UI(components/)가 분리되어 있다
- [ ] `any` 타입이 없다
- [ ] 불필요한 console.log가 남아 있지 않다

---

## 8. 다음 단계

이 계획 문서가 확정되면 워크플로우 순서는 아래와 같습니다.

1. **Antigravity** — 이 계획과 DESIGN_BRIEF.md를 기준으로 컬러 팔레트, 레이아웃 메모, 구역별 비주얼 상태를 산출합니다. 결과를 `docs/design/` 에 저장합니다.
2. **Codex** — 이 계획 + Antigravity 산출물을 기준으로 F1~F8을 구현하고 PR을 올립니다.
3. **Claude** — 위 리뷰 체크리스트로 PR을 검토합니다.
