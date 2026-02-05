# Photos Folder

Place your photos here and reference them in the config.

## How to use:
1. Add your photos to this folder (e.g., `us.jpg`, `photo1.jpg`, etc.)
2. Edit `src/context/ConfigContext.jsx`
3. Update the photo paths:

```javascript
main_photo: "/photos/us.jpg",
gallery_photos: [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg"
],
```

## Recommended:
- Use square or landscape photos for best results
- Keep file sizes under 500KB for fast loading
- Supported formats: JPG, PNG, WebP
