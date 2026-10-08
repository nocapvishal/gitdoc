## Assumptions

GitDoc makes the following assumptions:

- The GitHub username provided by the user is publicly accessible.
- The analysis is based only on information available through the public GitHub API.
- Repository presentation signals such as descriptions, topics, and demo links are useful indicators of portfolio quality.
- A GitHub profile is a portfolio signal, not a complete representation of a developer's technical ability.
- The Health Score is intended to provide consistent and explainable feedback rather than predict hiring outcomes.
- GitHub popularity metrics such as followers and stars should not dominate the assessment because they do not directly represent a developer's technical capability.

## Chosen Challenge Vertical

**GitHub Roast and Rescue**

GitDoc addresses the challenge of giving a messy GitHub profile the honest feedback it deserves.

The solution combines GitHub profile analysis, deterministic scoring, recruiter-oriented feedback, a humorous roast, and an actionable rescue plan.


GitDoc

Your GitHub has symptoms. We have the diagnosis.

GitDoc is a GitHub profile health-check tool built for the GitHub
Roast and Rescue challenge.

It takes a public GitHub username, analyzes the profile and public
repositories, and turns the raw GitHub data into three things:

Diagnosis → Recruiter Perspective → Roast → Rescue

Instead of relying on vague advice, GitDoc gives users an explainable,
deterministic assessment based on signals that can actually be observed
from their public GitHub profile.

What GitDoc Does

Enter a GitHub username and GitDoc:

Fetches the user's public GitHub profile and repositories.

Calculates a GitHub Health Score out of 100.

Breaks the score into understandable categories.

Generates a 30-second recruiter scan.

Produces a funny but respectful GitHub roast based on actual
profile signals.

Creates an actionable Rescue Plan explaining what should be
improved.

Shows the user's repositories with useful quality signals such as
descriptions, languages, topics, stars, forks, and live demos.

The goal is simple:

Make GitHub improvement understandable, honest, and actionable.

Core Idea

A GitHub profile is often treated as a simple collection of
repositories.

GitDoc treats it more like a candidate's public technical portfolio.

The flow

GitHub Username
       ↓
Public GitHub Data
       ↓
Profile + Repository Analysis
       ↓
Health Score
       ↓
30-Second Recruiter Scan
       ↓
Roast
       ↓
Rescue Plan

Health Score

GitDoc uses a deterministic scoring system so that the same GitHub data
produces the same assessment.

The score is divided into five areas:

Category           Weight

Profile                20
Projects               30
Documentation          20
Activity               15
Presentation           15
Total         100

Score levels

  Score Diagnosis

  0--39 Critical
 40--59 Needs Attention
 60--74 Developing
 75--89 Strong
90--100 Recruiter Ready

The scoring deliberately avoids treating follower count or popularity as
the main measure of technical quality.

The focus is on signals that a developer can actually improve.

Recruiter Scan

GitDoc includes a simulated 30-second recruiter scan.

It answers questions such as:

Would I keep browsing?

Would I open a repository?

What is the overall portfolio signal?

What immediately catches my attention?

What makes me hesitate?

What is the biggest concern?

The purpose isn't to pretend to predict an actual recruiter's decision.
It is a compact way of showing how a public GitHub profile may come
across during a quick review.

The Roast

The roast is generated from the profile's actual signals.

For example, if a profile has repositories without descriptions, GitDoc
can point that out instead of generating a random insult.

The roast is designed to be:

Funny

Specific

Respectful

Based on real profile data

Useful enough to lead into the rescue plan

The joke should target the profile, not the person.

The Rescue Plan

Every diagnosis should lead to an action.

GitDoc generates a prioritized rescue plan containing:

The problem

Why it matters

What to do about it

The expected impact

This turns the product from a simple "GitHub roast" into a practical
improvement tool.

Repository Analysis

GitDoc displays public repositories and highlights useful signals
including:

Repository name

Programming language

Description

Stars

Forks

Topics

Repository link

Live demo link, when available

Whether useful project metadata is present

This makes it easier to identify projects that deserve attention and
projects that need better presentation.

Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

Backend

Next.js API Route

GitHub REST API

Storage / Authentication

No database is required.

No GitDoc account or authentication is required.

GitDoc only needs a public GitHub username to analyze public GitHub
information.

Architecture

Browser
  │
  │ GitHub username
  ▼
Next.js Diagnose Page
  │
  ▼
/api/github
  │
  │ GitHub REST API
  ▼
Public GitHub Data
  │
  ├── Profile
  └── Repositories
        │
        ▼
   Scoring Engine
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
     Dashboard

Project Structure

gitdoc/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts
│   ├── diagnose/
│   │   └── page.tsx
│   ├── page.tsx
│   └── ...
├── lib/
│   ├── insights.ts
│   └── scoring.ts
├── public/
├── .env.example
├── .gitignore
├── package.json
└── README.md

Important files

app/page.tsx

Landing page and GitHub username input.

app/api/github/route.ts

Fetches public GitHub profile and repository information.

lib/scoring.ts

Contains the deterministic GitHub health scoring logic.

lib/insights.ts

Generates the recruiter insights, roast, and rescue-plan content.

app/diagnose/page.tsx

Displays the complete GitDoc diagnosis dashboard.

Getting Started

1. Clone the repository

git clone https://github.com/nocapvishal/gitdoc.git
cd gitdoc

2. Install dependencies

npm install

3. Configure the GitHub token

Create a .env.local file:

GITHUB_TOKEN=your_github_token_here

A GitHub token is used for authenticated GitHub API requests and higher
API rate limits.

Never commit .env.local or expose your token publicly.

The repository includes .env.example as a safe template:

GITHUB_TOKEN=

4. Start the development server

npm run dev

Then open:

http://localhost:3000

Security

GitHub credentials are kept outside the source code using environment
variables.

The actual token should exist only in:

.env.local

.env.local is ignored by Git and should never be pushed to GitHub.

Only the variable name is included in .env.example.

API Data

GitDoc uses publicly available GitHub profile and repository
information.

The application retrieves information such as:

Username

Name

Bio

Avatar

Followers/following

Public repository count

Repository descriptions

Languages

Stars

Forks

Topics

Repository URLs

Live demo URLs

Repository activity timestamps

GitDoc does not require access to private repositories.

Design Philosophy

1. Explainable over mysterious

The user should understand why their score changed.

2. Actionable over judgmental

The roast is entertaining, but the rescue plan is the actual value.

3. Public signals over popularity

A developer shouldn't receive a poor technical assessment simply because
they have few followers.

4. Honest over artificially positive

GitDoc is designed to point out weaknesses rather than give everyone a
meaningless high score.

5. Simple architecture

The MVP intentionally avoids unnecessary infrastructure.

There is no database, user account system, or complicated backend
service.

Limitations

GitDoc analyzes public GitHub information, so it cannot know
everything about a developer.

For example, the score cannot fully measure:

Private projects

Offline work

Actual coding ability

Interview performance

Teamwork

Communication skills

The complete context behind an inactive repository

The Health Score should therefore be treated as a portfolio
diagnostic, not a measurement of someone's ability as a developer.

Why GitDoc?

A developer can spend months building projects and still have a GitHub
profile that communicates very little.

GitDoc focuses on the gap between:

"I have projects."

and

"My GitHub clearly communicates that I can build things."

The product turns that gap into something visible, funny, and fixable.

Hackathon Context

GitDoc was built for the PromptWars x The Prompt Arena -- PU
hackathon challenge:

GitHub Roast and Rescue --- Give a messy GitHub profile the honest
feedback it deserves.

The project focuses on delivering a functional MVP with a clear user
flow:

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

License

This project is provided for hackathon and educational purposes.