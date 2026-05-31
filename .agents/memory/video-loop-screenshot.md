---
name: Verifying looping videos in screenshots
description: How to capture a non-first scene of a looping video-js artifact
---

The app-preview screenshot tool reloads the page, so a looping video-js artifact always restarts at scene 0 — you can never catch a later scene by retrying.

**How to apply:** To visually verify a later scene, temporarily reorder the keys in `SCENE_DURATIONS` (in `VideoTemplate.tsx`) so the scene you want is first, screenshot, then revert. Scene order is driven by the key order of that object.

**Why:** Saved multiple wasted screenshot attempts that all caught scene 0.
