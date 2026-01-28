

## Plan: Add Video Poster Image

---

### Summary

Add a poster/thumbnail image for the video section that displays before the video starts playing. This provides a better user experience by showing a relevant preview instead of a black frame.

---

### Changes Required

| Task | Type | Description |
|------|------|-------------|
| 1 | Files | Copy uploaded poster image to public folder |
| 2 | Component | Update video element with poster attribute |

---

### Task 1: Copy Poster Image to Public Folder

Copy the uploaded poster image to the public folder alongside the video:

`user-uploads://baederberg-preview.jpg` → `public/videos/erklaerungsvideo-poster.jpg`

---

### Task 2: Update VideoSection Component

Modify `src/components/VideoSection.tsx` to use the poster image:

**Current (line 38-39):**
```tsx
preload="metadata"
poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
```

**Updated:**
```tsx
preload="metadata"
poster="/videos/erklaerungsvideo-poster.jpg"
```

---

### Result

- The video will display the animated illustration (couple dreaming of their new bathroom) as a preview thumbnail
- Users will see this image until they click play
- The play button overlay will appear on top of the poster image
- Better visual appeal and context for what the video is about

