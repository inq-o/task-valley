# AI 협업 워크플로우

## 현재 팀

- Claude Code: 기획자 및 리뷰어
- Antigravity / Nano Banana: 디자이너 및 비주얼 프로토타이퍼
- Codex: 개발자

## 추천 순서

1. Claude가 GitHub Issue #1을 기준으로 MVP 계획을 다듬습니다.
2. Antigravity가 다듬어진 계획을 기준으로 구현 가능한 비주얼 방향을 만듭니다.
3. Codex가 앱 기반과 핵심 루프를 구현합니다.
4. Claude가 구현 PR을 리뷰합니다.
5. Antigravity가 실행 화면을 보고 작은 시각/UX 수정안을 제안합니다.
6. Codex가 수정사항을 반영하고 앱을 검증합니다.

## 공통 기준 문서

GitHub Issue #1과 아래 저장소 문서를 기준으로 사용합니다.

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/product/MVP_PLAN_V01.md`
- `docs/design/DESIGN_BRIEF.md`
- `docs/design/DESIGN_PROPOSAL_V01.md`
- `docs/agents/CLAUDE_GUIDE.md`
- `docs/agents/ANTIGRAVITY_GUIDE.md`
- `docs/agents/CODEX_GUIDE.md`

## 인계 규칙

**모든 에이전트는 작업을 끝낼 때 다음 에이전트가 바로 이어받을 수 있는 프롬프트를 남겨야 합니다.**  
이 프롬프트 없이 작업이 완료되었다고 간주하지 않습니다.

- PR이 있는 경우: PR 본문의 "Handoff Prompt For Next Agent" 섹션에 작성합니다.
- PR이 없는 경우: 작성한 문서 하단 "## 다음 단계" 섹션에 작성합니다.

인계 프롬프트 양식과 흐름별 예시는 `docs/process/HANDOFF_GUIDE.md`를 참고합니다.

## 범위 규칙

v0.1은 아래에만 집중합니다.

- 네 개의 일일 과제
- 과제 완료
- 마을의 시각적 회복
- 로컬 진행 상태 저장

그 외 기능은 이후 마일스톤으로 미룹니다.
