export type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  size: number;
  fork: boolean;
  archived: boolean;
};

export type GitHubData = {
  profile: GitHubProfile;
  repositories: GitHubRepo[];
};

export type HealthScore = {
  total: number;
  profile: number;
  projects: number;
  documentation: number;
  activity: number;
  presentation: number;
  level: string;
  strengths: string[];
  weaknesses: string[];
};

export function calculateHealthScore(data: GitHubData): HealthScore {
  const { profile, repositories } = data;

  /*
   * PROFILE — 20 points
   */

  let profileScore = 0;

  if (profile.name) profileScore += 5;
  if (profile.bio) profileScore += 7;
  if (profile.avatar_url) profileScore += 4;
  if (profile.following > 0) profileScore += 2;
  if (profile.followers > 0) profileScore += 2;

  /*
   * PROJECTS — 30 points
   */

  const realRepos = repositories.filter(
    (repo) => !repo.fork && !repo.archived
  );

  let projectsScore = 0;

  if (realRepos.length >= 1) projectsScore += 8;
  if (realRepos.length >= 3) projectsScore += 5;
  if (realRepos.length >= 5) projectsScore += 5;
  if (realRepos.length >= 8) projectsScore += 2;

  const substantialRepos = realRepos.filter(
    (repo) => repo.size > 100
  );

  if (substantialRepos.length >= 1) projectsScore += 5;
  if (substantialRepos.length >= 3) projectsScore += 5;

  /*
   * DOCUMENTATION — 20 points
   */

  let documentationScore = 0;

  const reposWithDescription = realRepos.filter(
    (repo) => repo.description?.trim()
  );

  const reposWithDemo = realRepos.filter(
    (repo) => repo.homepage?.trim()
  );

  const reposWithTopics = realRepos.filter(
    (repo) => repo.topics && repo.topics.length > 0
  );

  if (reposWithDescription.length > 0) {
    documentationScore += 8;
  }

  if (
    reposWithDescription.length === realRepos.length &&
    realRepos.length > 0
  ) {
    documentationScore += 4;
  }

  if (reposWithDemo.length > 0) {
    documentationScore += 4;
  }

  if (reposWithTopics.length > 0) {
    documentationScore += 4;
  }

  /*
   * ACTIVITY — 15 points
   */

  let activityScore = 0;

  const now = new Date();

  const recentlyUpdated = realRepos.filter((repo) => {
    if (!repo.pushed_at) return false;

    const pushed = new Date(repo.pushed_at);

    const days =
      (now.getTime() - pushed.getTime()) /
      (1000 * 60 * 60 * 24);

    return days <= 30;
  });

  const updatedRecently = realRepos.filter((repo) => {
    const updated = new Date(repo.updated_at);

    const days =
      (now.getTime() - updated.getTime()) /
      (1000 * 60 * 60 * 24);

    return days <= 90;
  });

  if (recentlyUpdated.length >= 1) activityScore += 8;
  if (recentlyUpdated.length >= 2) activityScore += 4;
  if (updatedRecently.length >= 2) activityScore += 3;

  /*
   * PRESENTATION — 15 points
   */

  let presentationScore = 0;

  const namedRepos = realRepos.filter(
    (repo) =>
      repo.name.length >= 4 &&
      !["test", "testing", "project", "new", "demo"].includes(
        repo.name.toLowerCase()
      )
  );

  const reposWithStars = realRepos.filter(
    (repo) => repo.stargazers_count > 0
  );

  if (namedRepos.length > 0) presentationScore += 5;
  if (reposWithStars.length > 0) presentationScore += 4;
  if (profile.public_repos <= 20) presentationScore += 3;
  if (realRepos.length > 0) presentationScore += 3;

  /*
   * TOTAL
   */

  const total = Math.min(
    100,
    profileScore +
      projectsScore +
      documentationScore +
      activityScore +
      presentationScore
  );

  let level = "Critical";

  if (total >= 90) level = "Recruiter Ready";
  else if (total >= 75) level = "Strong";
  else if (total >= 60) level = "Developing";
  else if (total >= 40) level = "Needs Attention";

  /*
   * STRENGTHS
   */

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (profile.avatar_url) {
    strengths.push("Profile has a visible avatar.");
  }

  if (realRepos.length > 0) {
    strengths.push(
      `${realRepos.length} original public project${
        realRepos.length === 1 ? "" : "s"
      } found.`
    );
  }

  if (reposWithDescription.length > 0) {
    strengths.push(
      `${reposWithDescription.length} project${
        reposWithDescription.length === 1 ? "" : "s"
      } have descriptions.`
    );
  }

  if (reposWithDemo.length > 0) {
    strengths.push("At least one project has a live/demo link.");
  }

  /*
   * WEAKNESSES
   */

  if (!profile.bio) {
    weaknesses.push("Your profile has no bio.");
  }

  if (!profile.name) {
    weaknesses.push("Your real/display name is missing.");
  }

  if (realRepos.length < 3) {
    weaknesses.push(
      "You have very few public projects to showcase."
    );
  }

  if (reposWithDescription.length < realRepos.length) {
    weaknesses.push(
      "Some repositories have no description."
    );
  }

  if (reposWithDemo.length < realRepos.length) {
    weaknesses.push(
      "Most projects don't have a live demo link."
    );
  }

  if (reposWithTopics.length === 0 && realRepos.length > 0) {
    weaknesses.push(
      "None of your repositories use GitHub topics."
    );
  }

  if (recentlyUpdated.length === 0) {
    weaknesses.push(
      "No project has been pushed to in the last 30 days."
    );
  }

  return {
    total,
    profile: profileScore,
    projects: projectsScore,
    documentation: documentationScore,
    activity: activityScore,
    presentation: presentationScore,
    level,
    strengths,
    weaknesses,
  };
}