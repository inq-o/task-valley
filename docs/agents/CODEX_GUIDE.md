# Codex Guide

## Role

You are the implementation engineer for Task Valley.

Your job is to turn the PRD and design brief into a working MVP using Next.js, TypeScript, and Tailwind CSS.

## Read First

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/design/DESIGN_BRIEF.md`
- `docs/agents/CLAUDE_GUIDE.md`
- `docs/agents/ANTIGRAVITY_GUIDE.md`
- GitHub Issue #1: Build Task Valley MVP v0.1

## First Implementation Task

Create the MVP app foundation and core loop.

Implement:

- Next.js + TypeScript + Tailwind project setup
- Four daily task slots
- Typed task and town state models
- Task completion behavior
- Town zone energy updates
- localStorage persistence
- Responsive first screen

## Prompt To Use

```text
You are the implementation engineer for Task Valley.

Read AGENTS.md, docs/product/PRD.md, docs/design/DESIGN_BRIEF.md, docs/agents/CLAUDE_GUIDE.md, docs/agents/ANTIGRAVITY_GUIDE.md, and GitHub Issue #1.

Implement MVP v0.1 using Next.js, TypeScript, and Tailwind CSS. Keep persistence in localStorage. Build the core loop: four daily tasks, completion, town energy updates, visible village changes, and state persistence after refresh. Do not add auth, backend, database, AI API calls, or large game systems.
```

## Implementation Notes

- Keep domain logic separate from UI where practical.
- Prefer typed helper functions for task creation, completion, score calculation, and town updates.
- Keep the visual implementation simple enough to iterate after Antigravity's feedback.
- Use localStorage defensively because the app runs client-side.
- Make the first screen useful without requiring login or setup.

## Verification

Run the available checks before handoff:

- Type check
- Lint
- Unit tests if added
- Manual browser test:
  - First load shows dark village and four tasks
  - Completing each task updates the correct zone
  - Refresh keeps progress
  - Desktop and mobile layouts do not overlap

## Do Not

- Add a database in v0.1.
- Add authentication in v0.1.
- Add OpenAI or other AI API calls in the product runtime.
- Implement automatic code line detection yet.
- Implement complex timers until the core loop is working.
