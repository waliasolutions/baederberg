

## Plan: Replace External Video with Local Video File

---

### Summary

Replace the external video URL with a locally hosted video file to ensure reliable playback and eliminate dependency on the external server.

---

### Changes Required

| Task | Type | Description |
|------|------|-------------|
| 1 | Files | Copy uploaded video to public folder |
| 2 | Component | Update video source URL in VideoSection |

---

### Task 1: Copy Video to Public Folder

Copy the uploaded video file to the public folder for direct URL access:

`user-uploads://Erklaerungsvideo_Baederber_web.mp4` → `public/videos/erklaerungsvideo.mp4`

Using the public folder is appropriate here because:
- Video files are typically large and shouldn't be bundled with JavaScript
- Direct URL access allows for streaming and better browser caching
- HTML5 video elements work best with static URLs

---

### Task 2: Update VideoSection Component

Modify `src/components/VideoSection.tsx` to use the local video path:

**Before (line 43-46):**
```tsx
<source
  src="https://www.baederberg.ch/wp-content/uploads/2022/06/Erklaerungsvideo_Baederber_web.mp4"
  type="video/mp4"
/>
```

**After:**
```tsx
<source
  src="/videos/erklaerungsvideo.mp4"
  type="video/mp4"
/>
```

---

### Benefits

- Video loads from your own server (faster, more reliable)
- No dependency on external URL availability
- Better control over video quality and compression
- Improved SEO (self-hosted assets)

