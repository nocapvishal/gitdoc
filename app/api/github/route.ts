import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "GitDoc",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "GitHub username is required." },
      { status: 400 }
    );
  }

  try {
    // Get profile
    const userResponse = await fetch(
  `${GITHUB_API}/users/${encodeURIComponent(username)}`,
  {
    headers: githubHeaders,
    cache: "no-store",
  }
);

    if (userResponse.status === 404) {
      return NextResponse.json(
        { error: "GitHub user not found." },
        { status: 404 }
      );
    }

    if (!userResponse.ok) {
  const errorText = await userResponse.text();

  console.error(
    "GitHub profile request failed:",
    userResponse.status,
    errorText
  );

  return NextResponse.json(
    {
      error: `GitHub API returned ${userResponse.status}.`,
      details: errorText,
    },
    { status: userResponse.status }
  );
}

    const user = await userResponse.json();

    // Get public repositories
   const reposResponse = await fetch(
  `${GITHUB_API}/users/${encodeURIComponent(
    username
  )}/repos?per_page=100&sort=updated`,
  {
    headers: githubHeaders,
    cache: "no-store",
  }
);

    if (!reposResponse.ok) {
  const errorText = await reposResponse.text();

  console.error(
    "GitHub repositories request failed:",
    reposResponse.status,
    errorText
  );

  return NextResponse.json(
    {
      error: `GitHub repositories API returned ${reposResponse.status}.`,
      details: errorText,
    },
    { status: reposResponse.status }
  );
}

    const repos = await reposResponse.json();

    return NextResponse.json({
      profile: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        html_url: user.html_url,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },

      repositories: repos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        topics: repo.topics ?? [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        size: repo.size,
        fork: repo.fork,
        archived: repo.archived,
      })),
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while analyzing GitHub." },
      { status: 500 }
    );
  }
}