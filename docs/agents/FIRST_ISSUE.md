# GitHub Issue: Task Valley MVP v0.1 구현

## 목표

현실의 일일 과제를 완료하면 도트 마을이 회복되는 작은 Next.js MVP를 구현합니다.

## 역할

- Claude Code: 기획자 및 리뷰어
- Antigravity / Nano Banana: 디자이너 및 비주얼 프로토타이퍼
- Codex: 개발자

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- v0.1 저장 방식은 localStorage

## MVP 범위

- 일일 과제 슬롯 4개:
  - 운동
  - 공부
  - 코딩
  - 휴식
- 과제를 완료하면 해당 마을 구역에 에너지가 전달됩니다.
- 도트 마을은 진행도에 따라 시각적으로 밝아집니다.
- 진행 상태는 로컬에 저장됩니다.
- v0.1에는 로그인, 백엔드, 데이터베이스, AI API 호출을 넣지 않습니다.

## 인수 조건

- 첫 실행 시 어두운 마을과 기본 과제 4개가 보입니다.
- 과제를 완료하면 완료 처리되고 해당 마을 구역이 변합니다.
- 새로고침 후에도 과제와 마을 상태가 유지됩니다.
- UI는 데스크톱과 모바일에서 모두 동작합니다.
- 과제와 마을 상태는 TypeScript 타입으로 관리합니다.

## Claude Code 지시

PRD, 사용자 흐름, 인수 조건, 구현 작업 분해를 만들거나 다듬어 주세요. 첫 버전은 작고 구현 가능하게 유지해 주세요.

## Antigravity / Nano Banana 지시

MVP의 비주얼 방향을 만들어 주세요: 첫 화면 레이아웃, 도트 마을 분위기, 컬러 팔레트, 마을 성장 단계, 온보딩 감성. Next.js/Tailwind로 구현 가능한 수준을 유지해 주세요.

## Codex 지시

`AGENTS.md`, `docs/product/PRD.md`, `docs/design/DESIGN_BRIEF.md`를 기준으로 MVP를 구현해 주세요.
