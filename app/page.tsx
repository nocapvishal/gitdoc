"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const handleScan = () => {
    if (!username.trim()) return;

    window.location.href = `/diagnose?username=${encodeURIComponent(
      username.trim()
    )}`;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-bold">
            G
          </div>

          <span className="text-xl font-semibold tracking-tight">
            GitDoc
          </span>
        </div>

        <div className="hidden text-sm text-zinc-500 sm:block">
          GitHub Health Intelligence
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-400 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Recruiter-grade GitHub diagnosis
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          Your GitHub has symptoms.
          <br />

          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            We have the diagnosis.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          See what a recruiter notices in the first 30 seconds.
          Get an honest diagnosis, a little roast, and a clear plan
          to make your GitHub actually hireable.
        </p>

        {/* Input */}
        <div className="mt-12 w-full max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex-row">
            <div className="flex flex-1 items-center px-4">
              <span className="mr-2 text-zinc-600">github.com/</span>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleScan();
                }}
                placeholder="username"
                className="w-full bg-transparent py-3 text-white outline-none placeholder:text-zinc-700"
              />
            </div>

            <button
              onClick={handleScan}
              className="rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
            >
              Diagnose →
            </button>
          </div>

          <p className="mt-3 text-xs text-zinc-600">
            No login required · Public GitHub data only
          </p>
        </div>

        {/* Process */}
        <div className="mt-24 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Step
            number="01"
            title="SCAN"
            description="We inspect your public GitHub profile and repositories."
          />

          <Step
            number="02"
            title="DIAGNOSE"
            description="We measure the signals a recruiter can actually see."
          />

          <Step
            number="03"
            title="RESCUE"
            description="Get prioritized fixes that can make the biggest difference."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        GitDoc · Built for developers who want their GitHub to speak for them.
      </footer>
    </main>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-6 text-left">
      <div className="mb-5 text-xs font-medium text-violet-400">
        {number}
      </div>

      <h3 className="mb-2 text-sm font-semibold tracking-widest">
        {title}
      </h3>

      <p className="text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}