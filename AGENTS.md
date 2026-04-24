# AGENTS.md

## Project

Task Valley is a small self-improvement RPG. Users complete real-life daily tasks to restore a dark pixel village.

## Default Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- localStorage for v0.1 persistence
- Prisma + PostgreSQL in a later milestone

## Agent Roles

### Claude Code: Planner and Reviewer

- Owns product clarity, PRD quality, acceptance criteria, and review comments.
- Should keep the MVP small and prevent scope creep.
- Should review PRs for state bugs, UX regressions, unclear copy, accessibility issues, and missing tests.

### Antigravity / Nano Banana: Designer

- Owns visual direction, layout exploration, pixel village mood, growth states, and onboarding feel.
- Should produce design artifacts that are feasible for a Next.js and Tailwind implementation.
- Should avoid designs that require complex custom animation or large asset pipelines in v0.1.

### Codex: Builder

- Owns implementation, tests, refactoring, and local verification.
- Should follow the PRD and design brief before adding new behavior.
- Should keep changes scoped to the current issue.

## Coding Rules

- Prefer small, typed React components.
- Keep domain logic separate from UI where practical.
- Use clear TypeScript types for tasks, categories, town state, and daily progress.
- Do not add a backend, auth, or database in v0.1 unless the issue explicitly asks for it.
- Do not introduce AI API calls into the product runtime for v0.1.
- Keep UI responsive on desktop and mobile.
- Avoid decorative complexity that makes the first version harder to finish.

## Verification

Before marking work complete, run the available checks:

- Type check
- Lint
- Unit tests, when present
- Manual browser check for the main daily task flow

If a check cannot be run, state why in the PR or final handoff.
