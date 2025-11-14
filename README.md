<!-- devfoliox
{
  "title": "DevfolioX",
  "summary": "A minimal, config-driven developer portfolio template built with Next.js and Tailwind CSS.",
  "description": [
    "DevfolioX is a one-page portfolio focused on simplicity, speed, and practical integrations for students and developers.",
    "It centralizes projects, experience, writing, and contact into a single minimal layout while remaining easy to configure and deploy on free hosting."
  ],
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "badges": [
    "https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white",
    "https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white",
    "https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
    "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
    "https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white",
    "https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white",
    "https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white",
    "https://img.shields.io/badge/Google%20Docs-4285F4?style=for-the-badge&logo=google-docs&logoColor=white",
    "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
  ],
  "start": "AUTO",
  "end": "AUTO",
  "auto_inactive_threshold_days": 90,
  "stats_stars": true,
  "stats_forks": true,
  "stats_downloads": true,
  "links": [
    {
      "label": "Demo",
      "href": "https://devfoliox.vercel.app",
      "type": "live"
    },
    {
      "label": "Source",
      "href": "https://github.com/KevinTrinh1227/DevfolioX",
      "type": "github"
    },
    {
      "label": "Download",
      "href": "https://github.com/KevinTrinh1227/DevfolioX/archive/refs/heads/main.zip",
      "type": "download"
    }
  ]
}
-->
<div align="center">

# 👨‍💻 DevfolioX 

A minimal, user-friendly, responsive dev/personal portfolio template that integrates with numerous platforms and offers tons of useful functionality. Built with **Next.js** and **Tailwind CSS**.

[![Downloads](https://img.shields.io/github/downloads/KevinTrinh1227/devfoliox/total?style=for-the-badge&logo=github)](#)
[![Stars](https://img.shields.io/github/stars/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)
[![Forks](https://img.shields.io/github/forks/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)
[![Latest Release](https://img.shields.io/github/v/release/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)

<img
    alt="Screen Shot from 10-03-2023 of landing page."
    width="850px"
    src="https://github.com/KevinTrinh1227/DevfolioX/blob/main/public/images/devfoliox_demo_1.gif">

<details>
  <summary>View more screenshots</summary>
  <p align="center">
    <img src="https://placehold.co/600x400" alt="DevfolioX screenshot 2" /><br/>
    <img src="https://placehold.co/600x400" alt="DevfolioX screenshot 3" /><br/>
    <img src="https://placehold.co/600x400" alt="DevfolioX screenshot 4" />
  </p>
</details>

</div>

---

<p align="center"><strong>Table of Contents</strong></p>
<p align="center">
  <a href="#-about">About</a> •
  <a href="#-features--integrations">Features</a> •
  <a href="#-core-sections">Core Sections</a> •
  <a href="#-configuration--setup">Configuration &amp; Setup</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🌐 What is DevfolioX?

**DevfolioX** is a minimal, config-driven portfolio template built for developers and students who want a clean, professional online presence without a lot of overhead. It centralizes your projects, experience, writing, videos, resume/CV, and contact into a single responsive page.

The template is powered by a few small TypeScript config files, so most updates are made by editing data rather than UI code. It uses **Next.js (App Router)**, **React**, and **Tailwind CSS**, and is designed to be deployed on **Vercel** or **Netlify** as a simple, fully static site for this initial release.

---

## ✨ Features & Integrations

- **Minimal one-page layout** – All key info (intro, projects, experience, contact) is visible with smooth scrolling and a clean navbar.
- **Config-driven content** – Most text, links, and sections live in small JSON/TS config files, so you rarely need to touch UI code.
- **Student & professional ready** – Handles education, experience, projects, research/publications, open source, and awards in a structured way.
- **Inline resume viewer** – View and download a Google Docs–backed PDF directly on the site, with a visible “last updated” timestamp.
- **Multi-channel contact** – A focused contact form that can notify you via email, Discord, and Telegram.
- **Optional sponsor support** – Add a Sponsor button for GitHub Sponsors, Patreon, Ko-fi, etc.
- **Free-hosting friendly** – Built to run entirely on Vercel or Netlify (including API routes) with no separate backend.

**Integrations (all optional):**

- **GitHub** – Drive project cards (and optional stats) from repositories and hidden `<!-- devfoliox {...} -->` metadata in each repo’s README.
- **Dev.to / Medium** – Pull in recent posts so your writing section stays up-to-date automatically.
- **YouTube** – Embed a featured video and/or a small list of recent uploads.
- **Google Docs** – Use a single Google Doc as the source of truth for your resume/CV and export it as a PDF on demand.
- **Email / Discord / Telegram** – Route contact form submissions to one or more channels so you don’t miss messages.
- **Handshake / Sponsor links** – Surface your Handshake profile and sponsor pages with simple config-only links.

All integrations degrade gracefully: if you don’t configure something, the related section or feature simply stays hidden.

---

  ## 📚 Core Sections

  - **Hero** – Quick intro with your name, role, short value statement, and primary call-to-action buttons (e.g. “View Projects”, “Contact”, “Resume”) plus key social icons.
  - **About** – Short bio, what you work on, and a compact skills/tech stack snapshot.
  - **Education** – Schools, degrees, dates, locations, and optional coursework/activities.
  - **Experience** – Internships and jobs with role, company, dates, and impact-focused bullets.
  - **Achievements & Certifications** – Certifications, awards, scholarships, and competitions with tags and optional proof links.
  - **Research & Publications** – Optional section for research projects, posters, talks, and papers with links to PDFs, slides, or code.
  - **Open Source Contributions** – Highlights external repos you’ve contributed to, with links to PRs/issues.
  - **Projects** – Your own repos, configured via hidden README metadata (or config), with titles, descriptions, tools, buttons, GitHub stats, and an optional detailed modal using the README content.
  - **Blog / Writing** – Recent posts from platforms like Dev.to / Medium so your writing stays in sync without manual copying.
  - **YouTube** – Featured video and/or recent uploads to surface tutorials, devlogs, or project walkthroughs.
  - **Coding Stats** – Optional lightweight metrics (e.g. GitHub activity or problem-solving stats) for a quick activity snapshot.
  - **Contact** – Focused contact form with multi-channel notifications, plus direct profile/contact links.
  - **Resume & CV Viewer** – Inline PDF viewer for your resume/CV with “last updated” metadata and a download button.

  ---

  ## 🧩 Configuration & Setup

  DevfolioX is **config-driven**. Most customization is done by editing small config files instead of React components.

  1. **Download DevFolioX**  

     - [Download latest stable release](https://github.com/YOUR_GITHUB_USERNAME/devfoliox/releases/latest) (recommended)
     - Or Clone the repository
       
       ```bash
       git clone https://github.com/KevinTrinh1227/DevfolioX
       ```
       ```bash
       cd devfoliox
       ```
       ```bash
       npm install
       ```

  2. **Set up core site config**

     Update the main site config (for example `config/siteConfig.ts`) with:

     - Your name, tagline, and location
     - Social links (GitHub, LinkedIn, email, etc.)
     - Which sections are enabled/disabled
     - Theme options (if any)
     - Resume/CV viewer settings

  3. **Fill out structured data**

     Edit the config files for your content (file names may vary slightly):

     - `config/education` – degrees, schools, dates
     - `config/experience` – roles, companies, bullet points
     - `config/certifications` / `config/achievements` – awards, certs, competitions
     - `config/research` – research/projects/talks (optional)
     - `config/openSource` – open source contributions (optional)
     - `config/projects.json` – local projects and any GitHub-backed project overrides

  4. **Configure projects**

     For GitHub-backed projects, you can use a hidden block in each repo’s README:

     ```html
     <!-- devfoliox
     {
       "title": "My Project",
       "summary": "Short summary here.",
       "description": ["Longer description paragraph 1.", "Paragraph 2."],
       "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
       "start": "AUTO",
       "end": "AUTO",
       "auto_inactive_threshold_days": 90,
       "stats_stars": true,
       "stats_forks": true,
       "stats_downloads": true,
       "links": [
         { "label": "Live Demo", "href": "https://example.com", "type": "live" },
         { "label": "Source", "href": "https://github.com/you/repo", "type": "github" }
       ],
       "badges": [
         "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"
       ]
     }
     -->
     ```

     The app will read this at build time, pull GitHub stats (if enabled), and use repo metadata (topics, homepage, created/last push dates) to auto-fill dates and details.

  5. **Environment variables (.env.local)**

     Create a `.env.local` file in the project root to enable contact notifications and the resume viewer. Only set the ones you plan to use:

     ```bash
     DISCORD_CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_id/your_webhook_token

     RESUME_GOOGLE_DOC_ID=your_google_doc_id_here

     RESEND_API_KEY=your_resend_api_key_here
     CONTACT_TO_EMAIL=your_destination_email_here
     CONTACT_FROM_EMAIL=your_verified_from_email_here

     TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
     TELEGRAM_CHAT_ID=your_telegram_chat_id_here

     # Optional: higher GitHub API rate limits for stats
     # GITHUB_TOKEN=your_github_personal_access_token_here
     ```

  6. **Run locally**

     ```bash
     npm run dev
     ```

     Then visit `http://localhost:3000` to preview your portfolio.

  ---

  ## 🚀 Deployment

  DevfolioX is a standard Next.js app and can run anywhere that supports Node and Next.js.

  - **Local production build**

    ```bash
    npm run build
    ```
    ```bash
    npm start
    ```
    App runs in production mode, usually on `http://localhost:3000`

<details>
  <summary><strong>How to host DevfolioX for free (Vercel / Netlify)</strong></summary>

  <br />

  ### 🚀 Deploy to Vercel (free)

  1. Push your code to GitHub (or GitLab/Bitbucket).  
  2. Go to Vercel and click **“New Project” → “Import”**.  
  3. Select your `devfoliox` repo; Vercel will auto-detect it as a Next.js app.  
  4. Set the same environment variables from `.env.local` in the Vercel project settings.  
  5. Deploy with the default Next.js settings.

  Vercel will handle:

  - Static assets and server-side rendering  
  - API routes (contact form, resume export)  
  - Automatic redeploys when you push to your main branch  

  ---

  ### 🌐 Deploy to Netlify (free)

  1. Push your code to GitHub (or another supported Git provider).  
  2. In Netlify, click **“Add new site” → “Import an existing project”** and choose your repo.  
  3. Use a standard Next.js build command:

     ```bash
     npm run build
     ```

  4. Set your environment variables in the Netlify site settings.  
  5. Deploy. Netlify will serve the static output and run any serverless functions created by your Next.js config.

</details>
