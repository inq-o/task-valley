# GitHub Issue: Build Task Valley MVP v0.1

## Goal

Build a small Next.js MVP where completing real-life daily tasks restores a pixel village.

## Roles

- Claude Code: product planner and reviewer
- Antigravity / Nano Banana: designer and visual prototyper
- Codex: implementation engineer

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- localStorage for v0.1 persistence

## MVP Scope

- 4 daily task slots:
  - Exercise
  - Study
  - Coding
  - Rest
- Completing tasks gives energy to matching town zones.
- Pixel town visually brightens as progress increases.
- State persists locally at first.
- No login, backend, database, or AI API calls in v0.1.

## Acceptance Criteria

- First load shows a dark village and four default tasks.
- Completing a task marks it complete and updates the matching town zone.
- Refreshing the page keeps the task and town state.
- UI works on desktop and mobile.
- TypeScript types cover task and town state.

## Instructions For Claude Code

Create or refine the PRD, user flow, acceptance criteria, and implementation task breakdown. Keep the first version small and implementable.

## Instructions For Antigravity / Nano Banana

Create the visual direction for the MVP: first screen layout, pixel village mood, color palette, town growth states, and onboarding feel. Keep it feasible for a Next.js/Tailwind implementation.

## Instructions For Codex

Implement the MVP according to `AGENTS.md`, `docs/product/PRD.md`, and `docs/design/DESIGN_BRIEF.md`.
