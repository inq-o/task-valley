# Task Valley MVP PRD

## Summary

Task Valley turns daily self-improvement tasks into a small game loop. Completing real-life tasks sends energy to a dark pixel village, gradually restoring its districts over a 7-day first experience.

## Target User

The first target user is a student, junior developer, or self-improvement user who wants light motivation for exercise, study, coding, and rest without using a heavy productivity system.

## MVP Goal

Build a v0.1 web app that proves this core feeling:

> "When I complete my real task, my village visibly becomes warmer and more alive."

## Core Loop

1. User opens the app and sees a dark pixel village.
2. User sees 4 daily task slots: exercise, study, coding, rest.
3. User completes one or more tasks.
4. The matching village zone immediately brightens.
5. The app saves progress locally.
6. Returning later shows the current town state.

## MVP Features

- Four daily task slots:
  - Exercise
  - Study
  - Coding
  - Rest
- Each task has:
  - Category
  - Title
  - Target value
  - Unit
  - Completed state
- Completion behavior:
  - Exercise: manual completion
  - Study: manual completion in v0.1; timer can be added after core loop works
  - Coding: manual completion in v0.1; code line detection is deferred
  - Rest: manual completion in v0.1; timer can be added after core loop works
- Town state:
  - Overall level
  - Energy per category
  - Current streak
  - Last active date
- Persistence:
  - localStorage only for v0.1

## Non-Goals For v0.1

- User accounts
- Cloud sync
- Database
- AI API features
- Code file analysis
- Full sprite asset pipeline
- Cross-platform desktop packaging

## Acceptance Criteria

- On first load, the user sees a dark village and 4 default tasks.
- Completing a task updates its completed state immediately.
- Completing a task visibly changes the matching town zone.
- Refreshing the page keeps completed tasks and town progress.
- The app works at common desktop and mobile viewport widths.
- The implementation uses Next.js, TypeScript, and Tailwind CSS.
