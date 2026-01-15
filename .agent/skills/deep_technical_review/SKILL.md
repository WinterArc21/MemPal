---
name: Deep Technical Review
description: Comprehensive analysis of codebase logic, security, performance, and design.
---

# Deep Technical Review Skill

Use this skill to perform a deep-dive audit of the current codebase. This is not a "quick check" but a thorough analysis intended to raise the quality bar to "Production Ready" (10/10).

## 1. Static Analysis & Code Hygiene
- **Dependencies**: Review `package.json` for unused, redundant, or outdated packages.
- **Linting**: Run `npm run lint` if available. Analyze findings.
- **Project Structure**: Evaluate file organization. Are components, stores, and hooks logically separated?
- **Types**: Check for excessive use of `any` or loose typing in TypeScript.

## 2. Logical Integrity
- **State Management (Zustand/Context)**:
    - Check for race conditions in async actions.
    - Verify strict immutability in state updates (e.g., proper spread operators).
    - Ensure selectors are optimized to prevent unnecessary re-renders.
- **React Lifecycle**:
    - Audit `useEffect` dependencies.
    - Look for potential infinite loops or stale closures.
    - Verify cleanup functions are present for listeners/subscriptions (especially in `Overlay.tsx` and 3D interactions).
- **Event Handling**:
    - Verify robust event propagation management (`stopPropagation`, `preventDefault`).
    - Check for "ghost clicks" or overlapping interaction zones (Z-index issues).

## 3. Security & Safety
- **Data Persistence**: verify save logic is robust against crashes (e.g. `try/catch` wrappers, save-on-unmount).
- **Input Validation**: Ensure user input (Note Title/Content) is sanitized or handled safely.
- **Secrets**: Scan for accidental hardcoded API keys or credentials.
- **DOM Safety**: check for `dangerouslySetInnerHTML` usage.

## 4. Performance & Optimization
- **3D Scene (R3F)**:
    - Inspect `useFrame` loops: are they lean?
    - Check for heavy computations in render loops.
    - Verify geometry/material reuse (instancing).
- **React Rendering**:
    - Identify components that might re-render too often.
    - Suggest `useMemo`/`useCallback` where expensive calculations occur.
- **Bundle Size**: Check imports (e.g., importing full `lucide-react` vs specific icons).

## 5. Design & User Experience (UX)
- **Aesthetics**:
    - Evaluate color palette consistency (Theme adherence).
    - Check typography hierarchy.
    - Review spacing and layout balance.
- **Interactivity**:
    - verifying hover states, active states, and focus rings.
    - **Animation**: Are transitions smooth? Do they enhance or distract?
- **Empty States**: Are they helpful and actionable?
- **Feedback**: Does the user get confirmation actions (toasts, saved indicators)?

## 6. Output Artifact
- Create a `deep_review_[date].md` artifact.
- Structure it by:
    - **Critical Issues** (Must Fix immediately)
    - **Warnings** (Potential bugs)
    - **Optimizations** (Performance/Code Cleanliness)
    - **Design Polish** (Visual improvements)
- Provide specific code snippets and file paths for every finding.
