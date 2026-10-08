# GitDoc

> **Your GitHub has symptoms. We have the diagnosis.**

GitDoc is a GitHub profile health-check tool built for the **GitHub Roast & Rescue** challenge.

Enter a public GitHub username and GitDoc analyzes the profile and repositories to turn raw GitHub data into:

**GitHub Data → Health Score → Recruiter Scan → Roast → Rescue Plan**

The goal is simple:

> **Make GitHub improvement understandable, honest, and actionable.**

---

## 🚀 Live Demo

**Live Application:**
https://gitdoc-seven.vercel.app

**GitHub Repository:**
https://github.com/nocapvishal/gitdoc

---

## ✨ Features

* 🔍 Analyze any public GitHub profile
* ❤️ Explainable **0–100 GitHub Health Score**
* 📊 Category-based portfolio assessment
* 👀 **30-Second Recruiter Scan**
* 🔥 Personalized GitHub roast based on actual profile signals
* 🛠️ Actionable **Rescue Plan**
* 📁 Repository quality analysis
* 📝 Documentation and metadata analysis
* 🔗 Repository and live-demo links
* ⚡ Fast, lightweight MVP architecture
* 🔐 GitHub token kept server-side
* 🚫 No database required
* 🚫 No GitDoc account required

---

# 🎯 The Problem

Developers often spend months building projects but their GitHub profile doesn't communicate that work effectively.

A recruiter may only spend a short amount of time scanning a profile.

They might see:

* repositories without descriptions
* unfinished or abandoned projects
* missing documentation
* unclear project purpose
* weak profile presentation
* no demo links
* inconsistent repository metadata

The developer may have good technical skills, but their public portfolio doesn't communicate them clearly.

GitDoc focuses on the gap between:

> **"I have projects."**

and

> **"My GitHub clearly communicates that I can build things."**

---

# 💡 The Solution

GitDoc treats a GitHub profile as a **public technical portfolio**, rather than simply a collection of repositories.

It analyzes observable GitHub signals and converts them into four useful outputs:

### 1. Diagnosis

A deterministic GitHub Health Score identifies strengths and weaknesses.

### 2. Recruiter Perspective

A simulated 30-second recruiter scan shows how the profile may appear during a quick review.

### 3. Roast

A funny but respectful roast highlights actual weaknesses in the profile.

### 4. Rescue

An actionable improvement plan explains what to fix and why it matters.

The roast gets attention.

**The rescue plan creates value.**

---

# 🔄 How GitDoc Works

```text
GitHub Username
       │
       ▼
Public GitHub Data
       │
       ▼
Profile + Repository Analysis
       │
       ▼
Deterministic Scoring Engine
       │
       ├── Health Score
       ├── Strengths
       └── Weaknesses
       │
       ▼
Insight Engine
       │
       ├── Recruiter Scan
       ├── Roast
       └── Rescue Plan
       │
       ▼
Diagnosis Dashboard
```

---

# ❤️ GitHub Health Score

GitDoc uses a **deterministic scoring system**.

The same GitHub data produces the same assessment.

The score is divided into five categories:

| Category      |  Weight |
| ------------- | ------: |
| Profile       |      20 |
| Projects      |      30 |
| Documentation |      20 |
| Activity      |      15 |
| Presentation  |      15 |
| **Total**     | **100** |

## Score Levels

|      Score | Diagnosis          |
| ---------: | ------------------ |
| **90–100** | 🟢 Recruiter Ready |
|  **75–89** | 🔵 Strong          |
|  **60–74** | 🟡 Developing      |
|  **40–59** | 🟠 Needs Attention |
|   **0–39** | 🔴 Critical        |

The scoring deliberately avoids making follower count or repository popularity the dominant factor.

The focus is on signals developers can actually improve.

---

# 👀 30-Second Recruiter Scan

GitDoc includes a simulated recruiter-style first impression.

It answers questions such as:

* Would I keep browsing?
* Would I open a repository?
* What immediately catches my attention?
* What makes me hesitate?
* What is the strongest portfolio signal?
* What is the biggest concern?

The Recruiter Scan is **not intended to predict actual hiring outcomes**.

Instead, it provides a compact way to understand how a public GitHub portfolio may come across during a quick review.

---

# 🔥 The Roast

GitDoc doesn't generate random insults.

The roast is based on actual profile signals.

For example, if a profile contains multiple repositories without descriptions, the roast can call out the missing descriptions.

The roast is designed to be:

* Funny
* Specific
* Respectful
* Based on real profile data
* Useful enough to lead into the rescue plan

The joke targets the **profile**, not the person.

---

# 🛠️ The Rescue Plan

Every diagnosis should lead to an action.

GitDoc generates a prioritized rescue plan explaining:

| Element             | Purpose                                 |
| ------------------- | --------------------------------------- |
| **Problem**         | What is wrong                           |
| **Why it matters**  | Why the issue affects portfolio quality |
| **What to do**      | How to improve it                       |
| **Expected impact** | What improvement the user can expect    |

This transforms GitDoc from a simple GitHub roast into a practical portfolio improvement tool.

---

# 📁 Repository Analysis

GitDoc analyzes publicly available repository information including:

* Repository name
* Programming language
* Description
* Stars
* Forks
* Topics
* Repository URL
* Live demo URL when available
* Repository metadata
* Activity timestamps

This helps identify:

* Projects worth highlighting
* Projects that need better documentation
* Missing metadata
* Presentation weaknesses
* Potentially strong projects that aren't being communicated effectively

---

# 🧠 Design Philosophy

### 1. Explainable over mysterious

Users should understand why their score changed.

### 2. Actionable over judgmental

The roast is entertaining, but the rescue plan is the actual value.

### 3. Public signals over popularity

A developer shouldn't receive a poor technical portfolio assessment simply because they have few followers.

### 4. Honest over artificially positive

GitDoc is designed to identify weaknesses rather than give everyone a meaningless high score.

### 5. Simple architecture

The MVP avoids unnecessary infrastructure.

There is no database, user account system, or complicated backend service.

---

# 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │     Browser     │
                    │ GitHub Username │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Diagnose Page   │
                    │    Next.js      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ /api/github     │
                    │  API Route      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ GitHub REST API │
                    └────────┬────────┘
                             │
                             ▼
              ┌────────────────────────────┐
              │ Public Profile + Repos     │
              └──────────────┬─────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Scoring Engine  │
                    │   scoring.ts    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Insight Engine  │
                    │   insights.ts   │
                    └────────┬────────┘
                             │
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
             Recruiter     Roast      Rescue
               Scan                    Plan
                 │           │           │
                 └───────────┼───────────┘
                             ▼
                    ┌─────────────────┐
                    │   Dashboard     │
                    └─────────────────┘
```

---

# 🧰 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* GitHub REST API

### Testing

* Vitest

### Deployment

* Vercel

### Storage / Authentication

GitDoc does not require:

* A database
* User accounts
* GitDoc authentication

Only a public GitHub username is required.

---

# 📂 Project Structure

```text
gitdoc/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts
│   ├── diagnose/
│   │   └── page.tsx
│   ├── page.tsx
│   └── ...
│
├── lib/
│   ├── insights.ts
│   └── scoring.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Important Files

#### `app/page.tsx`

Landing page and GitHub username input.

#### `app/api/github/route.ts`

Fetches public GitHub profile and repository information.

#### `lib/scoring.ts`

Contains the deterministic GitHub Health Score logic.

#### `lib/insights.ts`

Generates recruiter insights, roast content, and rescue-plan recommendations.

#### `app/diagnose/page.tsx`

Displays the complete GitDoc diagnosis dashboard.

---

# 🛠️ Run Locally

## Requirements

* Node.js
* Git
* GitHub Personal Access Token

## 1. Clone the repository

```bash
git clone https://github.com/nocapvishal/gitdoc.git
cd gitdoc
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure the GitHub token

Create a `.env.local` file:

```env
GITHUB_TOKEN=your_github_token_here
```

A GitHub token is used for authenticated GitHub API requests and higher API rate limits.

The repository includes `.env.example` as a safe template:

```env
GITHUB_TOKEN=
```

**Never commit `.env.local` or expose your token publicly.**

## 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 🧪 Testing

GitDoc includes automated tests for the core scoring and insight logic.

Run the test suite with:

```bash
npm test
```

The test suite covers core functionality including:

* Health Score calculation
* Score levels
* Roast generation
* Rescue Plan generation

---

# ✅ Production Check

Before deployment, the project can be checked with:

```bash
npm run lint
npm test
npm run build
```

These checks help verify that the application is ready for production deployment.

---

# 🔐 Security

GitDoc follows a simple server-side secret model.

* GitHub tokens are stored in environment variables.
* `.env.local` is excluded from Git.
* The actual token is never included in source code.
* The token is used server-side for GitHub API requests.
* `.env.example` contains only the variable name.
* GitDoc does not store user credentials.
* GitDoc does not require private GitHub repository access.

---

# 📡 GitHub API Data

GitDoc uses publicly available GitHub profile and repository information.

Depending on GitHub API availability, the application can retrieve information such as:

* Username
* Name
* Bio
* Avatar
* Followers
* Following
* Public repository count
* Repository descriptions
* Programming languages
* Stars
* Forks
* Topics
* Repository URLs
* Live demo URLs
* Repository activity timestamps

GitDoc does **not** require access to private repositories.

---

# ⚠️ Limitations

GitDoc analyzes public GitHub information, so it cannot know everything about a developer.

The Health Score cannot fully measure:

* Private projects
* Offline work
* Actual coding ability
* Interview performance
* Teamwork
* Communication skills
* The complete context behind an inactive repository
* Real-world engineering experience

Therefore:

> **The GitHub Health Score is a portfolio diagnostic, not a measurement of someone's ability as a developer.**

Likewise, the Recruiter Scan is a simulation of a quick portfolio review, not a prediction of actual hiring decisions.

---

# 🎯 Challenge Alignment

GitDoc directly addresses the **GitHub Roast & Rescue** challenge.

| Challenge Goal           | GitDoc                          |
| ------------------------ | ------------------------------- |
| Analyze a messy GitHub   | Profile + repository analysis   |
| Give honest feedback     | Deterministic Health Score      |
| Recruiter perspective    | 30-Second Recruiter Scan        |
| Roast the profile        | Signal-based personalized roast |
| Rescue the profile       | Prioritized Rescue Plan         |
| Make feedback actionable | Problem → Why → Action → Impact |

The complete user journey is:

```text
Input GitHub Username
        ↓
Analyze
        ↓
Diagnose
        ↓
Recruiter Scan
        ↓
Roast
        ↓
Rescue
```

---

# 🚀 Why GitDoc?

A developer can build great projects and still have a GitHub profile that communicates very little.

GitDoc makes that problem visible.

Instead of simply saying:

> "Improve your GitHub."

GitDoc explains:

> **What is wrong → Why it matters → How to fix it → What to prioritize.**

The product combines **honest feedback, humor, explainability, and actionable improvement** into one simple workflow.

---

# 🏆 Hackathon Context

GitDoc was built for the:

**PromptWars × The Prompt Arena — PU Hackathon**

### Challenge

**GitHub Roast & Rescue — Give a messy GitHub profile the honest feedback it deserves.**

GitDoc focuses on delivering a functional MVP around the core challenge:

```text
GitHub Profile
      ↓
Diagnosis
      ↓
Health Score
      ↓
Recruiter Perspective
      ↓
Roast
      ↓
Rescue
```

---

# 📜 License

Created for the **PromptWars × The Prompt Arena hackathon** and educational purposes.
