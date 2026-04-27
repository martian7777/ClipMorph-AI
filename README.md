# AI Video Repurposer

A powerful Next.js application that leverages AI to automatically identify viral moments in your long-form videos and generate short, engaging clips ready for social media platforms like TikTok, YouTube Shorts, and Instagram Reels.

## Features

- **Automated Clip Generation:** Upload a video or provide a YouTube link, and the system simulates processing the video to automatically cut out highlight moments.
- **Viral Highlights Scoring:** Each clip is scored to predict its viral potential.
- **Smart Framing:** Auto-frames the clips into a 9:16 portrait ratio, ideal for modern short-form video consumption.
- **AI Notes and Takeaways:** Generates show notes, key takeaways, and structured timestamps from the video's content.
- **Local Browser Rendering:** Download your generated clips directly from your browser, rendered locally.
- **Project Management:** Keep track of uploaded projects, manage your workflow, and handle drafts all through a central dashboard.
- **Clip Editing:** Fine-tune the start and end times or rewrite titles for each generated short.
- **Sleek UI:** A responsive, polished UI built with Tailwind CSS and Next.js App Router.

## Technologies

- Next.js (App Router)
- React
- Tailwind CSS
- Frame/Canvas Video Manipulation API
- Context API (for State Management)
- Lucide React (Icons)

## Setup and Installation

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```
