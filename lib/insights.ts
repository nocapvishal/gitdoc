import { GitHubData, HealthScore } from "./scoring";

export type RescueItem = {
  title: string;
  problem: string;
  action: string;
  impact: string;
};

export function generateRoast(
  data: GitHubData,
  score: HealthScore
): string[] {
  const roasts: string[] = [];

  const repos = data.repositories.filter(
    (repo) => !repo.fork && !repo.archived
  );

  if (!data.profile.bio) {
    roasts.push(
      "Your GitHub bio is empty. Even your profile doesn't know what you do."
    );
  }

  if (repos.length <= 2) {
    roasts.push(
      `${repos.length} public projects. Your GitHub portfolio is currently more of a trailer than a movie.`
    );
  }

  const undocumented = repos.filter(
    (repo) => !repo.description
  );

  if (undocumented.length > 0) {
    roasts.push(
      `${undocumented.length} project${
        undocumented.length === 1 ? "" : "s"
      } have no description. Apparently the code is expected to introduce itself.`
    );
  }

  const noDemo = repos.filter(
    (repo) => !repo.homepage
  );

  if (noDemo.length > 0) {
    roasts.push(
      `You built ${noDemo.length} project${
        noDemo.length === 1 ? "" : "s"
      } but ${
        noDemo.length === 1 ? "it has" : "they have"
      } no demo link. Trust me, recruiters aren't compiling your repo for fun.`
    );
  }

  if (score.activity === 0) {
    roasts.push(
      "Your GitHub activity has gone so quiet that the contribution graph is basically meditating."
    );
  }

  if (data.profile.followers === 0) {
    roasts.push(
      "Zero followers isn't a crime. But right now your GitHub has no social proof doing any heavy lifting."
    );
  }

  if (score.total < 50) {
    roasts.push(
      "The good news: there's plenty of room for improvement. The bad news: GitDoc found it immediately."
    );
  }

  return roasts.slice(0, 5);
}

export function generateRescuePlan(
  data: GitHubData,
  score: HealthScore
): RescueItem[] {
  const repos = data.repositories.filter(
    (repo) => !repo.fork && !repo.archived
  );

  const rescue: RescueItem[] = [];

  if (!data.profile.bio) {
    rescue.push({
      title: "Write a recruiter-friendly bio",
      problem: "Your profile has no bio.",
      action:
        "Write one sentence explaining what you build, your strongest technologies, and what you're currently looking for.",
      impact: "+5–7 profile points",
    });
  }

  const undocumented = repos.filter(
    (repo) => !repo.description
  );

  if (undocumented.length > 0) {
    rescue.push({
      title: "Describe every serious project",
      problem: `${undocumented.length} repository${
        undocumented.length === 1 ? "" : "ies"
      } lack a description.`,
      action:
        "Add a one-line description explaining the problem, technology used, and what makes the project interesting.",
      impact: "+4–8 documentation points",
    });
  }

  const noDemo = repos.filter(
    (repo) => !repo.homepage
  );

  if (noDemo.length > 0) {
    rescue.push({
      title: "Put your projects on display",
      problem:
        "Most projects don't have a live demo link.",
      action:
        "Deploy your strongest project and add its URL to the GitHub repository homepage field.",
      impact: "+4 presentation points",
    });
  }

  if (score.activity === 0) {
    rescue.push({
      title: "Show recent activity",
      problem:
        "None of your public projects were pushed recently.",
      action:
        "Continue developing one flagship project and push meaningful improvements instead of creating another unfinished repository.",
      impact: "+8–15 activity points",
    });
  }

  if (repos.length < 3) {
    rescue.push({
      title: "Build one flagship project",
      problem:
        "Your portfolio currently has very few public projects.",
      action:
        "Build one polished, deployed project with a strong README instead of creating several small unfinished repositories.",
      impact: "+5–10 project points",
    });
  }

  if (score.total < 75) {
    rescue.push({
      title: "Make your best project impossible to miss",
      problem:
        "A recruiter has very little time to understand your strongest work.",
      action:
        "Pin your strongest repository and make its README immediately show the problem, solution, tech stack, screenshots and live demo.",
      impact: "Higher recruiter confidence",
    });
  }

  return rescue.slice(0, 5);
}