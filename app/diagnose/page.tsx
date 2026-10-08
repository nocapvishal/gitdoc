"use client";

import { useEffect, useState } from "react";
import {
  calculateHealthScore,
  HealthScore,
} from "@/lib/scoring";

import {
  generateRoast,
  generateRescuePlan,
  RescueItem,
} from "@/lib/insights";

type Profile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  size: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string | null;
  updated_at: string;
};

type GitHubResponse = {
  profile: Profile;
  repositories: Repo[];
};

export default function DiagnosePage() {
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [score, setScore] = useState<HealthScore | null>(null);
  const [error, setError] = useState("");

  const [roast, setRoast] = useState<string[]>([]);
  const [rescue, setRescue] = useState<RescueItem[]>([]);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  if (!username) {
    setError("No GitHub username provided.");
    return;
  }

  const safeUsername = username;

  async function analyze() {
    try {
      const response = await fetch(
        `/api/github?username=${encodeURIComponent(safeUsername)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to analyze GitHub.");
      }

      setData(result);

      const health = calculateHealthScore(result);

      setScore(health);
      setRoast(generateRoast(result, health));
setRescue(generateRescuePlan(result, health));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  }

  analyze();
}, []);
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Diagnosis failed
          </h1>

          <p className="mt-3 text-zinc-500">{error}</p>

          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Try again
          </a>
        </div>
      </main>
    );
  }

  if (!data || !score) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-400" />

          <p className="text-sm text-zinc-500">
            Scanning GitHub...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="/" className="text-xl font-semibold">
          GitDoc
        </a>

        <a
          href={data.profile.html_url}
          target="_blank"
          className="text-sm text-zinc-500 hover:text-white"
        >
          View GitHub ↗
        </a>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        {/* Profile */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={data.profile.avatar_url}
            alt={data.profile.login}
            className="h-20 w-20 rounded-2xl border border-white/10"
          />

          <div>
            <p className="text-sm text-violet-400">
              GitHub diagnosis
            </p>

            <h1 className="mt-1 text-4xl font-semibold">
              @{data.profile.login}
            </h1>

            <p className="mt-2 text-zinc-500">
              {data.profile.bio || "No bio. Your GitHub is keeping secrets."}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm text-zinc-500">
              GitHub Health Score
            </p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-7xl font-semibold tracking-tight">
                {score.total}
              </span>

              <span className="mb-3 text-zinc-600">
                /100
              </span>
            </div>

            <div className="mt-4 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-300">
              {score.level}
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400"
                style={{ width: `${score.total}%` }}
              />
            </div>
          </div>

          {/* Breakdown */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm text-zinc-500">
              Score breakdown
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <ScoreBar
                label="Profile"
                score={score.profile}
                max={20}
              />

              <ScoreBar
                label="Projects"
                score={score.projects}
                max={30}
              />

              <ScoreBar
                label="Documentation"
                score={score.documentation}
                max={20}
              />

              <ScoreBar
                label="Activity"
                score={score.activity}
                max={15}
              />

              <ScoreBar
                label="Presentation"
                score={score.presentation}
                max={15}
              />
            </div>
          </div>
        </div>

        {/* Recruiter scan */}
<div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
    <div>
      <p className="text-sm font-medium text-violet-400">
        30-SECOND RECRUITER SCAN
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        What would a recruiter notice?
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
        A simulated first impression based on the public signals
        visible on your GitHub profile.
      </p>
    </div>

    <div
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
        score.total >= 75
          ? "bg-emerald-400/10 text-emerald-300"
          : score.total >= 50
          ? "bg-yellow-400/10 text-yellow-300"
          : "bg-red-400/10 text-red-300"
      }`}
    >
      {score.total >= 75
        ? "SHORTLIST"
        : score.total >= 50
        ? "MAYBE"
        : "NOT YET"}
    </div>
  </div>

  {/* Recruiter impression */}
  <div className="mt-8 rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-6">
    <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
      First impression
    </p>

    <p className="mt-3 text-lg leading-8 text-zinc-200">
      {score.total >= 75
        ? "Your profile communicates enough evidence of strong projects and consistent development to make a recruiter keep looking."
        : score.total >= 50
        ? "There is evidence of real development work here, but the profile needs more polish before it feels recruiter-ready."
        : "There is evidence that you build things, but your GitHub does not yet communicate enough polish or consistency to confidently shortlist you."}
    </p>
  </div>

  {/* Recruiter questions */}
  <div className="mt-6 grid gap-4 md:grid-cols-3">
    <RecruiterMetric
      label="Would I keep browsing?"
      value={
        score.total >= 75
          ? "YES"
          : score.total >= 50
          ? "MAYBE"
          : "BARELY"
      }
    />

    <RecruiterMetric
      label="Would I open a repo?"
      value={
        data.repositories.length > 0
          ? "YES"
          : "NO"
      }
    />

    <RecruiterMetric
      label="Portfolio signal"
      value={
        score.total >= 75
          ? "STRONG"
          : score.total >= 50
          ? "DEVELOPING"
          : "WEAK"
      }
    />
  </div>

  {/* What works / red flags */}
  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <Insight
      title="What catches my attention"
      items={score.strengths}
    />

    <Insight
      title="What makes me hesitate"
      items={score.weaknesses}
      danger
    />
  </div>

  {/* Biggest concern */}
  <div className="mt-6 rounded-2xl border border-orange-400/10 bg-orange-400/[0.03] p-6">
    <p className="text-xs font-medium uppercase tracking-wider text-orange-300">
      Biggest concern
    </p>

    <p className="mt-3 text-base leading-7 text-zinc-300">
      {score.weaknesses.length > 0
        ? score.weaknesses[0]
        : "Nothing immediately concerning stands out."}
    </p>
  </div>
</div>


{/* 🔥 ROAST — ADD THIS */}
<div className="mt-6 rounded-3xl border border-orange-400/10 bg-orange-400/[0.03] p-8">
  <div>
    <p className="text-sm text-orange-300">
      THE ROAST 🔥
    </p>

    <h2 className="mt-2 text-2xl font-semibold">
      You asked for honesty.
    </h2>

    <p className="mt-2 text-sm text-zinc-500">
      Everything below is based on actual signals from your GitHub.
    </p>
  </div>

  <div className="mt-6 space-y-3">
    {roast.map((line, index) => (
      <div
        key={index}
        className="rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-zinc-300"
      >
        <span className="mr-3 text-orange-400">
          {String(index + 1).padStart(2, "0")}
        </span>

        {line}
      </div>
    ))}
  </div>
</div>


{/* 🚑 RESCUE PLAN — ADD THIS */}
<div className="mt-6 rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-8">
  <p className="text-sm text-emerald-300">
    THE RESCUE PLAN 🚑
  </p>

  <h2 className="mt-2 text-2xl font-semibold">
    Here's how you fix it.
  </h2>

  <div className="mt-6 space-y-4">
    {rescue.map((item, index) => (
      <div
        key={index}
        className="rounded-2xl border border-white/5 bg-black/20 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-sm text-emerald-300">
            {index + 1}
          </div>

          <div>
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              {item.problem}
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              <span className="text-emerald-300">
                Fix:
              </span>{" "}
              {item.action}
            </p>

            <p className="mt-3 text-xs text-zinc-600">
              Expected impact: {item.impact}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
{/* Projects */}
<div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
    <div>
      <p className="text-sm text-blue-400">
        YOUR PROJECTS
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        What a recruiter can actually see
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Your public repositories, inspected one by one.
      </p>
    </div>

    <span className="text-sm text-zinc-600">
      {data.repositories.length} repositories
    </span>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {data.repositories.map((repo) => (
      <div
        key={repo.name}
        className="group rounded-2xl border border-white/5 bg-black/20 p-6 transition hover:border-white/10 hover:bg-white/[0.04]"
      >
        {/* Project header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">
              {repo.name}
            </h3>

            {repo.language && (
              <p className="mt-1 text-xs text-violet-400">
                {repo.language}
              </p>
            )}
          </div>

          {repo.archived && (
            <span className="shrink-0 rounded-full bg-yellow-400/10 px-2 py-1 text-xs text-yellow-300">
              Archived
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 min-h-[48px] text-sm leading-6 text-zinc-400">
          {repo.description || "No description. Recruiters have to guess what this does."}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-zinc-500">
          <span>
            ⭐ {repo.stargazers_count}
          </span>

          <span>
            🍴 {repo.forks_count}
          </span>

          {repo.topics.length > 0 && (
            <span>
              🏷 {repo.topics.length} topics
            </span>
          )}
        </div>

        {/* Quality signals */}
        <div className="mt-5 flex flex-wrap gap-2">
          {repo.description ? (
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              ✓ Description
            </span>
          ) : (
            <span className="rounded-full bg-red-400/10 px-3 py-1 text-xs text-red-300">
              × No description
            </span>
          )}

          {repo.homepage ? (
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              ✓ Live demo
            </span>
          ) : (
            <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
              ! No demo
            </span>
          )}

          {repo.topics.length > 0 ? (
            <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
              ✓ Topics
            </span>
          ) : (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-500">
              No topics
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            View repository ↗
          </a>

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
            >
              Live demo ↗
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

{/* Stats */}
<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
  <Stat
    label="Repositories"
    value={data.profile.public_repos}
  />

  <Stat
    label="Followers"
    value={data.profile.followers}
  />

  <Stat
    label="Following"
    value={data.profile.following}
  />

  <Stat
    label="Languages"
    value={
      new Set(
        data.repositories
          .map((r) => r.language)
          .filter(Boolean)
      ).size
    }
  />
</div>
      </section>
    </main>
  );
}

function ScoreBar({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const percentage = (score / max) * 100;

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>

        <span className="text-zinc-600">
          {score}/{max}
        </span>
      </div>

      <div className="h-2 rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-white/60"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function Insight({
  title,
  items,
  danger = false,
}: {
  title: string;
  items: string[];
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/20 p-5">
      <h3
        className={`text-sm font-medium ${
          danger ? "text-red-300" : "text-emerald-300"
        }`}
      >
        {title}
      </h3>

      <div className="mt-4 space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 text-sm leading-6 text-zinc-400"
            >
              <span>{danger ? "×" : "✓"}</span>
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-600">
            Nothing obvious here.
          </p>
        )}
      </div>
    </div>
  );
}


function RecruiterMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/20 p-5">
      <p className="text-xs text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
      <p className="text-xs text-zinc-600">{label}</p>

      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}