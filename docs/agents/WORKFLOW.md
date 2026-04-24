# AI Collaboration Workflow

## Current Team

- Claude Code: planner and reviewer
- Antigravity / Nano Banana: designer and visual prototyper
- Codex: implementation engineer

## Recommended Order

1. Claude refines the MVP plan from GitHub Issue #1.
2. Antigravity creates a feasible visual direction from the refined plan.
3. Codex implements the app foundation and core loop.
4. Claude reviews the implementation PR.
5. Antigravity reviews the running UI and suggests small visual fixes.
6. Codex applies fixes and verifies the app.

## Shared Source Of Truth

Use GitHub Issue #1 and these repo documents:

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/design/DESIGN_BRIEF.md`
- `docs/agents/CLAUDE_GUIDE.md`
- `docs/agents/ANTIGRAVITY_GUIDE.md`
- `docs/agents/CODEX_GUIDE.md`

## Handoff Rule

Every agent should leave a short handoff note with:

- What changed or was decided
- What should happen next
- Any risks or open questions

## Scope Rule

For v0.1, keep the product focused on:

- Four daily tasks
- Completing tasks
- Restoring the town visually
- Saving progress locally

Everything else is a later milestone.
