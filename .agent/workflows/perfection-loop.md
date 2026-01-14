---
description: Iterative perfection loop for MemPal - continuously improve until 10/10 quality
---

# MemPal Perfection Loop

This workflow drives continuous iteration on the MemPal 3D Notes App until every aspect reaches perfection.

## How to Use
Run this workflow by saying: `/perfection-loop` or "iterate on MemPal"

---

## Phase 1: Visual Quality Check (Character & Environment)

### Character Evaluation
Rate each aspect 1-10, then fix anything below 8:

- [ ] **Proportions**: Does the character look balanced and appealing?
- [ ] **Colors**: Are colors vibrant, harmonious, and stylized?
- [ ] **Face**: Are eyes expressive? Does the face have personality?
- [ ] **Animations**: Is walking smooth? Is idle natural? Add bounce/squash-stretch?
- [ ] **Clothing Details**: Are there enough visual details (buttons, patterns, accessories)?

**If any < 8**: Redesign that aspect, test in browser, re-evaluate.

### Environment Evaluation
- [ ] **Furniture Polish**: Does each piece look finished? Add more details (knobs, textures, decorations)?
- [ ] **Lighting Mood**: Is the room cozy? Try different color temperatures.
- [ ] **Floor/Walls**: Are textures interesting? Consider patterns, baseboards, crown molding.
- [ ] **Decorations**: Are there enough props? (posters, plants, clocks, photos, toys)
- [ ] **Windows**: Do they feel like real windows? Add curtains, light rays?

**If any < 8**: Add/improve that element, verify visually, re-evaluate.

---

## Phase 2: Notes System Quality Check

### Note UI Evaluation
- [ ] **Appearance**: Does the note modal look premium? (shadows, rounded corners, animations)
- [ ] **Typography**: Is the font readable and stylish?
- [ ] **Colors**: Does the UI match the 3D environment's style?
- [ ] **Animations**: Does it open/close smoothly? Add scale/fade transitions?
- [ ] **Responsiveness**: Does it look good on different screen sizes?

### Note Features Evaluation
- [ ] **Basic CRUD**: Can you create, read, update, delete notes reliably?
- [ ] **Rich Text**: Can you bold, italic, add lists, headers?
- [ ] **Categories/Tags**: Can notes be organized?
- [ ] **Search**: Can you find notes quickly?
- [ ] **Timestamps**: Are creation/edit times shown?
- [ ] **Auto-save**: Do notes save automatically?
- [ ] **Undo/Redo**: Can you revert changes?

**If any missing**: Implement it, test thoroughly, re-evaluate.

---

## Phase 3: Interaction & UX Quality Check

### Controls Evaluation
- [ ] **Movement Feel**: Is WASD movement smooth and responsive?
- [ ] **Camera**: Can you zoom in/out? Orbit around character?
- [ ] **Collision**: Does the character stop at walls properly?
- [ ] **Interaction Prompt**: Is "Press E" clear and visible?
- [ ] **Keyboard Shortcuts**: Escape closes note? Tab navigates?

### Feedback Evaluation
- [ ] **Sound Effects**: Footsteps? UI clicks? Ambient room sounds?
- [ ] **Visual Feedback**: Hover effects on furniture? Selection highlight?
- [ ] **Loading States**: Is there a loading indicator?
- [ ] **Error Handling**: What happens if something fails?

**If any missing**: Add the feature, test it, re-evaluate.

---

## Phase 4: Feature Completeness Check

### Core Features
- [ ] Multiple rooms (expandable house)
- [ ] Character customization (colors, accessories)
- [ ] Day/night cycle or lighting modes
- [ ] Settings menu (volume, controls, graphics)
- [ ] Tutorial/onboarding for first-time users
- [ ] Pause menu

### Advanced Features
- [ ] Cloud sync (optional backend)
- [ ] Export notes to file
- [ ] Import notes
- [ ] Themes (different room styles)
- [ ] Achievements/gamification
- [ ] Mobile touch controls

**Prioritize based on impact**: Implement highest-impact missing features first.

---

## Phase 5: Performance & Polish

### Performance Check
- [ ] **FPS**: Is it 60fps? If not, optimize geometry, reduce shadows.
- [ ] **Load Time**: Does it load in < 3 seconds?
- [ ] **Memory**: No memory leaks? Check DevTools.
- [ ] **Bundle Size**: Is the JS bundle reasonable?

### Polish Check
- [ ] **Favicon**: Is there a custom app icon?
- [ ] **Title/Meta**: Good SEO tags?
- [ ] **PWA**: Can it be installed as an app?
- [ ] **Accessibility**: Keyboard navigable? Screen reader friendly?

---

## Iteration Loop

```
REPEAT UNTIL ALL SCORES >= 9:
  1. Run through all phases above
  2. Identify lowest-scoring items
  3. Fix ONE item at a time
  4. Test in browser
  5. Re-score that item
  6. Commit if improved
  7. Move to next lowest item
```

### After Each Iteration
- Update `task.md` with completed items
- Update `walkthrough.md` with new features
- Take screenshots of improvements
- Ask user for feedback on specific changes

---

## Quick Commands

| Command | Action |
|---------|--------|
| `/check-character` | Evaluate character visuals |
| `/check-environment` | Evaluate room/furniture |
| `/check-notes` | Evaluate notes system |
| `/check-ux` | Evaluate controls/feedback |
| `/add-feature [name]` | Implement a specific feature |
| `/polish [area]` | Focus polish on one area |
| `/full-audit` | Run complete quality audit |

---

## Success Criteria (10/10 App)

The app is complete when:
- [ ] Every visual element is polished and intentional
- [ ] All core features work flawlessly
- [ ] Sound and feedback make it feel alive
- [ ] Performance is silky smooth
- [ ] A new user can figure it out without instructions
- [ ] You would be proud to show it to anyone
