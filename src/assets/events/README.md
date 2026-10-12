# Event photos and details

For each event, put images in `src/assets/events/<event-slug>/`.
The event slug is its Markdown filename without `.md`.

Example: `content/events/cyber-ai-tips-career-development.md` uses
`src/assets/events/cyber-ai-tips-career-development/`.
The flyer is already there as `01-flyer.jpeg`. Add `02-photo.jpg`,
`03-photo.jpg`, etc. to choose the slideshow order. Supported formats:
JPG, JPEG, PNG, WebP, and GIF. Folder photos are attached automatically
when the site rebuilds. One image stays still; multiple images fade every
4.5 seconds. Hover or keyboard focus pauses playback. There are image
selectors and a pause button; reduced-motion preferences disable autoplay.

Edit event details in the matching Markdown file: title, quoted date
(`"2026-10-13"`), time, location, excerpt, tags, and registrationUrl.
`imageFit: "contain"` shows the whole flyer; `"cover"` fills the thumbnail.
The excerpt appears on the card; the Markdown body stores additional details.

Alternatively, use `/admin` → Events & Announcements → an event →
Thumbnail slideshow photos to upload images. These uploads are stored in
`public/images/uploads/` and saved in the event's `gallery` list. A cover
image appears first, then gallery images, then automatic folder photos.
