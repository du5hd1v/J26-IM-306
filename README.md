# Kadhai - Component 1 vertical slice

An accessible, bilingual React prototype for the interactive narrative architecture described in the KADHAI Component 1 implementation field guide (J26-IM-306).

This is a **local demonstration**, not a participant-research system. All narrative and checkpoint copy is explicitly placeholder content. The app does not collect or submit participant data.

## Included

- Tamil/English interface toggle
- Welcome and consent-placeholder screens
- Path A: three fixed, sequential placeholder scenes
- Path B: a gamified hotspot mission, XP progress, unlockable badges, two branches, and a shared rejoin scene
- Pure reducer-based narrative engine with explicit validation errors
- Keyboard-friendly controls and responsive layouts
- Mock introduction checkpoint
- Engine tests for transitions, invalid IDs, hotspot deduplication, and branch rejoining

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test and build

```bash
npm test
npm run build
```

## Demo checklist

1. Switch between English and Tamil on the welcome screen.
2. Continue through the local demo consent notice.
3. Select Path A and confirm there are no hotspots or choices.
4. Complete all three Path A scenes and reach the checkpoint.
5. Return home, select Path B, and confirm routes remain locked until the hotspot is discovered.
6. Confirm XP and badges unlock once per action, both choices rejoin, and the journey ends at 100 XP.
7. Select a demo rating and confirm the completion summary.

## Outstanding work

- Replace all placeholder narrative with culturally reviewed copy and approved translations.
- Add a formal scene-graph validator and split definitions by condition.
- Integrate reviewed Component 2-4 image, motion, and audio manifests with fallbacks.
- Add approved pre/post instruments and four segment checkpoints only after supervisor review.
- Design and review a protected research API after ethics approval; do not use browser storage as the study database.
- Complete accessibility, browser/device, performance, privacy, and end-to-end pilot testing.
