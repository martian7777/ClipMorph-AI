# Technical Specification & Implementation Roadmap: Video Processing Platform

## 1. System Architecture Overview

The platform uses a microservices-inspired architecture designed for scalable asynchronous video processing:

-   **Frontend:** Next.js (App Router) client handling user interface, direct direct-to-cloud resumable uploads, and real-time status updates via Server-Sent Events (SSE) or WebSockets.
-   **API Gateway & BFF (Backend for Frontend):** Next.js API Routes authenticating requests, managing quotas, and routing to processing services.
-   **Video Ingestion Service:** Handles incoming streams from direct uploads (S3/GCS), YouTube integration (yt-dlp), or Cloud Storage (Google Drive/Dropbox APIs).
-   **Processing Pipeline (Event-Driven):** 
    -   *Message Broker:* RabbitMQ or AWS SQS / GCP PubSub to handle the queueing of long-running video jobs to prevent request timeouts.
    -   *Worker Nodes:* GPU-accelerated instances (e.g., AWS EC2 G4/G5 or Lambda/Cloud Run for lightweight steps) running FFmpeg for chunking and audio stripping.
-   **AI Services Layer:**
    -   *Long to Shorts Engine:* Uses a multimodal LLM (like Gemini 1.5 Pro) or specialized Vision models + audio transcript analysis to detect high-engagement moments, peaks in energy, and topic changes.
    -   *AI Captions:* Uses Whisperv3 (OpenAI) or Gemini audio models for high-accuracy, 99+ language transcription with word-level timestamps.
    -   *AI Writer/Content Gen:* Uses LLMs (Gemini/GPT-4) to ingest transcripts and output SEO blogs, show notes, and social media hooks.

## 2. Database Schema (PostgreSQL / Relational)

Using an ORM like Prisma or Drizzle with PostgreSQL:

**`User`**
-   `id` (UUID), `email`, `name`, `createdAt`, `updatedAt`
-   `credits` (Int): Usage tracking
-   `subscriptionTier` (Enum: FREE, PRO, ENTERPRISE)

**`Workspace / BrandKit`**
-   `id`, `userId` (FK)
-   `name` (e.g., "aliza's Space")
-   `brandColors` (JSON: primary, secondary)
-   `customFonts` (JSON), `logoUrl` (String)

**`Project (Video Container)`**
-   `id`, `workspaceId` (FK)
-   `title` (String), `status` (Enum: UPLOADING, PROCESSING, DONE, FAILED)
-   `originalVideoUrl` (String), `duration` (Float)
-   `transcript` (JSON)

**`DerivedClip (Shorts)`**
-   `id`, `projectId` (FK)
-   `title`, `summary` (String), `viralScore` (Int 0-100)
-   `videoUrl` (String), `thumbnailUrl` (String)
-   `startTime` (Float), `endTime` (Float)
-   `captionsConfig` (JSON: styling, font, color)

**`ContentDraft (AI Writer)`**
-   `id`, `projectId` (FK)
-   `type` (Enum: BLOG, SHOW_NOTE, TWEET, LINKEDIN_POST)
-   `content` (Text), `seoScore` (Int)

## 3. API Design

RESTful APIs built into Next.js App Router (`/app/api/...`):

**Video Ingestion:**
-   `POST /api/projects/upload`: Request pre-signed URL for direct cloud upload.
-   `POST /api/projects/import`: Pass `youtubeUrl` or `cloudLink`. Initiates background download and returns job ID.

**Processing Webhooks:**
-   `POST /api/webhooks/video-processing`: Internal webhook called by worker nodes to update step progress (e.g., 20% -> Transcribing).

**AI Features APIs:**
-   `POST /api/projects/{id}/extract-clips`: Triggers the Long-to-Shorts analysis.
-   `GET /api/projects/{id}/captions`: Retrieves VTT/SRT for the video or specific clip.
-   `POST /api/projects/{id}/generate-content`: Triggers AI Writer. Payload specifies `type` (e.g., `["BLOG", "LINKEDIN"]`).

## 4. Frontend Component Hierarchy & Page Structure

**Layout:**
-   `RootLayout` (Providers: Auth, QueryClient, Theme)
    -   `AppLayout` (Grid: Sidebar + Main Content Area)
        -   `Sidebar` (Navigation)
            -   `WorkspaceSwitcher` ("aliza's Space")
            -   `NavLinks` (Home, Projects, Drafts, etc.)
            -   `CreditTracker` (Progress bar for credits)
        -   `MainContent` (Page specific)

**Key Pages:**
-   `/dashboard`: Home view, recent projects grid, quick upload drag-and-drop zone.
-   `/projects/[id]`: Project workspace.
    -   `VideoPlayer` (Left/Top)
    -   `ClipGallery` (Grid of generated shorts with viral scores)
    -   `ContentSidebar` (Tabs: Captions, AI Writer, Export Settings)
-   `/brand-kits`: Manage fonts, colors, and logos.

**UI/UX Specs:**
-   The design uses a "rounded card-based layout" which implies ample border radius (Tailwind `rounded-2xl` or `rounded-3xl`) within a padded main frame.
-   The sidebar is dark (`bg-zinc-900`) to increase focus on the light, vibrant main content area (`bg-zinc-50`).
-   Accent colors are implemented using `bg-gradient-to-r from-purple-600 to-pink-500` for primary call-to-actions.

## 5. User Workflow

1.  **Auth & Entry:** User lands on `/dashboard` and sees "aliza's Space" and their available credit limits.
2.  **Ingestion:** User clicks "New Project" (Gradient Button). A modal prompts for File Upload (Drag/Drop) or URL pasting.
3.  **Processing State:** UI routes immediately to the project shell (`/projects/[id]`). A skeleton loader and SSE progress bar indicates "Extracting audio...", "Transcribing...", "Finding hooks...".
4.  **Review:** Platform curates 3-5 clips. User clicks a clip to preview it with automatically burn-in subtitles.
5.  **Edit/Refine:** User can select a clip and adjust the caption styling using their Brand Kit options.
6.  **AI Writing:** User clicks "AI Writer" tab, selects "Blog Post", and text streams in based on the video's transcript.
7.  **Delivery:** User hits "Get clips in 1 click" to download the finalized MP4s and export text to clipboard.

## 6. Integration Points

-   **Cloud Storage:** AWS S3 or Google Cloud Storage for raw video and intermediate assets. Requires CDN (e.g., Cloudflare) for fast global playback in the Next.js `VideoPlayer`.
-   **YouTube Data API v3:** For validating URLs and `yt-dlp` for server-side downloading (ensure compliance with ToS / fair use policies).
-   **Authentication:** NextAuth.js / Auth.js with Google, GitHub, and Email providers.
-   **Payments/Credits:** Stripe Billing (webhooks sync credits to database).

## 7. Scalability & Performance Considerations

-   **Heavy Computation Isolation:** Video encoding (FFmpeg) and model inference MUST not run on the Next.js web server. Always offload to scalable worker clusters.
-   **Chunking:** Transcribing massive files can cause OOM errors. Audio must be chunked (e.g., 10-minute segments) and processed in parallel before reducing results.
-   **Video Playback:** Serve proxy versions (e.g., 720p H.264) for in-browser editing to avoid buffering massive 4K raw uploads.
-   **State Management:** Use optimistic updates and React Query (`@tanstack/react-query`) for snappy UX when renaming clips or saving drafts.

## 8. Security and Data Privacy

-   **Pre-Signed URLs:** File uploads should go directly from browser to S3 via pre-signed URLs to protect server bandwidth and hide bucket credentials.
-   **Tenant Isolation:** Database RLS (Row Level Security) (if using Supabase) or strict Prisma ORM scoping to ensure users cannot query `Project` rows belonging to another `Workspace`.
-   **Data Retention:** Implement automated lifecycle policies on cloud buckets to delete raw video assets after 30 days of inactivity to control costs.
