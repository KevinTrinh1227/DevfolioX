<div align="center">

# ✨ DevfolioX

A minimal, user-friendly dev/personal portfolio template that integrates with numerous platforms and offers genuinely useful functionality. Built with **Next.js** and **Tailwind CSS** — minimal UI, easy setup, and plenty of power under the hood.

[![Downloads](https://img.shields.io/github/downloads/KevinTrinh1227/devfoliox/total?style=for-the-badge&logo=github)](#)
[![Stars](https://img.shields.io/github/stars/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)
[![Forks](https://img.shields.io/github/forks/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)
[![Latest Release](https://img.shields.io/github/v/release/KevinTrinh1227/devfoliox?style=for-the-badge&logo=github)](#)

<a href="https://kevintrinh.dev" target="_blank">
  <img
    alt="Screen Shot from 10-03-2023 of landing page."
    width="850px"
    src="https://github.com/KevinTrinh1227/DevfolioX/blob/main/public/images/devfoliox_demo_1.gif"
  >
</a>

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
  <a href="#-features--integrations">Features &amp; Integrations</a> •
  <a href="#-core-sections">Core Sections</a> •
  <a href="#-configuration--setup">Configuration &amp; Setup</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🔍 About

**DevfolioX** is a minimal, config-driven portfolio template built for developers and students who want a clean, professional online presence without a lot of overhead. It centralizes your projects, experience, writing, videos, resume/CV, and contact into a single responsive page.

The template is powered by a few small TypeScript config files, so most updates are made by editing data rather than UI code. It uses **Next.js (App Router)**, **React**, and **Tailwind CSS**, and is designed to be deployed on **Vercel** or **Netlify** as a simple, fully static site for this initial release.

---

## ⚙️ Features & Integrations

- **Minimal one-page layout** – Everything important is visible and reachable via smooth scrolling and a clear navigation bar, with no unnecessary visual noise.
- **Config-driven content** – Core content lives in small config/data files (or is generated via an optional config wizard), so you rarely need to touch UI code.
- **Student- and professional-friendly** – Supports education history, experience, research/publications, open source contributions, and achievements/certifications in a structured way.
- **Inline resume/CV viewer** – View and download Google Docs–backed PDFs directly on the site with visible “last updated” information.
- **Multi-channel contact** – A focused contact form that can send messages to email, Discord, and Telegram using serverless functions.
- **Sponsor support** – Optional Sponsor button that can point to GitHub Sponsors, Patreon, Ko-fi, or similar platforms.
- **Free hosting friendly** – Designed so all logic (including serverless endpoints) runs inside this Next.js project on Vercel or Netlify, with no external backend server required.

**Integrations:**

- **GitHub** – Projects (and optionally stats) can be driven by GitHub repositories and hidden metadata in each repo’s README.
- **Dev.to & Medium** – Recent posts can be pulled in automatically so your writing stays current without manual syncing.
- **YouTube** – Featured and/or latest videos can be embedded with minimal configuration.
- **Google Docs** – Resume and CV PDFs can be generated from Google Docs export URLs so updates are reflected immediately.
- **Email / Discord / Telegram** – Contact form submissions and important events (such as resume views) can be routed to multiple channels.
- **Handshake / Sponsor platforms** – Simple links allow you to surface your Handshake profile and sponsor options (GitHub Sponsors, Patreon, Ko-fi, etc.) without adding complexity for users who do not need them.

All integrations are optional and can be toggled or left unconfigured, keeping DevfolioX flexible for both simple and advanced use cases.

---

## 📚 Core Sections

- **Hero** – A clean introduction with your name, role, concise value statement, primary call-to-action buttons (for example “View Projects” and “Contact Me”), and key social links for quick navigation.
  <details>
    <summary>More about the Hero section</summary>
    <p>
      The Hero section is designed to quickly answer “who is this?” and “what should I click next?”. It typically includes your location or school, a short tagline, and a minimal row of icon links (GitHub, LinkedIn, Dev.to, Medium, YouTube, Handshake, email, etc.). You can optionally include a Sponsor button here to surface your preferred support platform.
    </p>
  </details>

- **About** – A brief personal description, portrait image, and a summarized skills/tech stack list that explains what you build and what you care about.
  <details>
    <summary>More about the About section</summary>
    <p>
      The About section is intentionally short and focused. It highlights your background (for example, CS student, software engineer), your interests (web, systems, AI, etc.), and a set of skill tags grouped by category (Frontend, Backend, DevOps, Tools). It also provides a natural entry point to the resume/CV viewer so visitors can dive deeper if they want to.
    </p>
  </details>

- **Education** – Degree information for one or more schools, including degree/major, minor, dates, relevant coursework, and activities/clubs.
  <details>
    <summary>More about the Education section</summary>
    <p>
      Each education entry can include the school name, degree (such as B.S. in Computer Science), optional minor or emphasis, date range, location, and compact lists of relevant coursework and activities or clubs. This is especially valuable for students and early-career developers whose academic experience is a central part of their story.
    </p>
  </details>

- **Experience** – Internships and jobs presented as concise cards or a timeline, with role, company, dates, and impact-focused bullet points.
  <details>
    <summary>More about the Experience section</summary>
    <p>
      Experience entries are kept short and outcome-oriented, focusing on what you shipped, improved, or learned rather than long lists of responsibilities. The layout avoids heavy visuals so recruiters can quickly scan roles and key achievements.
    </p>
  </details>

- **Achievements & Certifications** – A combined area for certifications, awards, scholarships, and competition results, each with tags and optional proof links.
  <details>
    <summary>More about Achievements & Certifications</summary>
    <p>
      Items can be typed (for example certification, award, scholarship, competition) and include the organization, date, a short description, tags, and a link to a credential, badge, or write-up if available. Grouping these together keeps important recognitions visible without overwhelming the layout.
    </p>
  </details>

- **Research & Publications** – A section for research projects, papers, posters, or talks, with venue, role, short abstract-style description, and links to PDFs, slides, code, or demos.
  <details>
    <summary>More about Research & Publications</summary>
    <p>
      Each research item can include a title, role (such as Undergraduate Researcher or Co-author), venue (conference, symposium, lab), date or date range, tags, and a list of links (paper PDF, slide deck, poster, GitHub repo, demo site). This makes DevfolioX suitable for students and developers who participate in formal research or academic work.
    </p>
  </details>

- **Open Source Contributions** – Highlights open source projects you have contributed to, including what the project is and what you worked on.
  <details>
    <summary>More about Open Source Contributions</summary>
    <p>
      Cards can show the repository (for example owner/repo), a short project description, a summary of your contributions, and links to specific pull requests or issues. This separates your own projects from contributions to external codebases and helps demonstrate collaboration and community involvement.
    </p>
  </details>

- **Projects** – Your own projects, configured via GitHub README metadata, with titles, descriptions, tools, buttons, optional status badges, and optional detail views.
  <details>
    <summary>More about the Projects section</summary>
    <p>
      Project cards can be driven by hidden metadata blocks in each repo’s README. The section supports customizable buttons (Live Demo, GitHub, Docs, Download, etc.), an optional online status indicator for full-stack apps, and “View details” links that render README content on a dedicated page. Redirect helpers (for example <code>/go/[slug]</code>) can be used to track traffic from YouTube descriptions or other external sources.
    </p>
  </details>

- **Blog / Writing** – Shows recent posts from platforms like Dev.to and Medium so your writing stays up to date automatically.
  <details>
    <summary>More about Blog / Writing</summary>
    <p>
      DevfolioX can fetch posts from Dev.to via their public API and from Medium via RSS parsing. Titles, publish dates, and links are displayed in a compact list so visitors can quickly access your technical writing without you duplicating content manually.
    </p>
  </details>

- **YouTube** – Embeds a featured video and/or latest uploads to showcase tutorials, devlogs, or project explanations.
  <details>
    <summary>More about the YouTube section</summary>
    <p>
      You can configure a specific video ID for a featured video or show recent uploads via a playlist or optional data fetching. A simple “View channel” link encourages deeper exploration while keeping the section itself minimal.
    </p>
  </details>

- **Coding Stats** – An optional overview of metrics like GitHub activity, problem-solving stats, or open source contributions.
  <details>
    <summary>More about the Coding Stats section</summary>
    <p>
      The Coding Stats section is intentionally lightweight. It can be driven by manual configuration (for example, numbers you update occasionally) or by optional endpoints that aggregate stats. The goal is to provide a quick sense of activity, not a full analytics dashboard.
    </p>
  </details>

- **Contact** – A simple, focused contact form backed by multi-channel notifications, plus direct links to key profiles or scheduling tools.
  <details>
    <summary>More about the Contact section</summary>
    <p>
      The contact form captures name, email, and message (plus an optional “reason” field). Submissions can trigger email, Discord, and Telegram notifications using serverless functions so you see important messages quickly. The section can also include direct links for email, Telegram, Discord, and optional scheduling via Calendly/Cal.com.
    </p>
  </details>

- **Resume & CV Viewer** – Inline viewing and downloading of your resume and/or CV PDFs, with last-updated metadata.
  <details>
    <summary>More about the Resume & CV viewer</summary>
    <p>
      DevfolioX can treat Google Docs as the source of truth for your resume and CV, exporting them as PDFs on demand. When a visitor clicks “View Resume” or “View CV”, a modal or panel opens an embedded PDF viewer that shows a last updated timestamp and a download button. This keeps the experience within your site while ensuring documents are always current.
    </p>
  </details>

---

  ## 🧩 Configuration & Setup

  DevfolioX is **config-driven**, so you can customize it quickly without rewriting components:

  - Core content such as your name, tagline, socials, section toggles, theme, resume/CV options, and sponsor URL is controlled through a main configuration file.
  - Structured data such as education, experience, achievements, research, and open source work is defined in small, focused config files or modules.
  - Projects can be controlled via hidden metadata blocks in each GitHub repo’s README, allowing you to choose which repos appear and how they are presented.

  ### Local setup

  1. Clone or fork this repository:
     ```bash
     git clone https://github.com/YOUR_GITHUB_USERNAME/devfoliox.git
     cd devfoliox
     ```
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Configure your content:
     - Edit the main config file (for example `siteConfig`) to set your name, socials, section toggles, theme, resume/CV settings, and sponsor URL.
     - Fill out the data files for education, experience, achievements, research, and open source contributions.
     - Optionally add hidden metadata blocks to the README of any GitHub repos you want to feature as projects.
  4. (Optional) Use the config wizard:
     - Start the dev server:
       ```bash
       npm run dev
       ```
     - Open `http://localhost:3000/config` in your browser.
     - Fill out the form to generate a ready-to-paste config snippet.
     - Paste the generated snippet into the main config file.
  5. Run locally:
     ```bash
     npm run dev
     ```
     Then open `http://localhost:3000` to preview your portfolio.

  ### Setup for deployment (Vercel / Netlify)

  Before deploying, ensure that:

  - You have created any necessary environment variables (for example GitHub tokens, email provider keys, Discord webhooks, Telegram bot token) in a `.env.local` file for local testing.
  - The same environment variables are added to your Vercel or Netlify project settings.
  - Optional integrations you do not plan to use are either disabled in config or left unconfigured so they fail gracefully.

  Once local setup is working, follow the deployment steps below.

  ---

  ## 🚀 Deployment

  DevfolioX is built to deploy smoothly on platforms that support Next.js and serverless functions:

  - **Vercel**
    - Push your repository to GitHub (or another supported Git provider).
    - In Vercel, import the repository and allow it to detect the Next.js project.
    - Set any required environment variables in the Vercel project settings.
    - Deploy with the default Next.js settings; API routes and pages will be handled automatically.

  - **Netlify**
    - Push your repository to GitHub (or another supported Git provider).
    - In Netlify, import the repository and choose the Next.js build preset if available.
    - Use a standard Next.js build command, for example:
      ```bash
      npm run build
      ```
    - Ensure environment variables are configured in the Netlify project settings for any integrations you enable.
    - Deploy; Netlify will handle serverless functions and static assets from the build.

  Because both the frontend and serverless API routes are defined inside this project, you do not need a separate backend server. For most students and individual developers, the free tiers of Vercel or Netlify are sufficient to host DevfolioX in production.
