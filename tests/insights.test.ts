import { describe, expect, it } from "vitest";
import {
  generateRoast,
  generateRescuePlan,
} from "../lib/insights";
import { HealthScore } from "../lib/scoring";

const score: HealthScore = {
  total: 42,
  level: "Needs Attention",
  profile: 10,
  projects: 12,
  documentation: 8,
  activity: 7,
  presentation: 5,
  strengths: [],
  weaknesses: [],
};

const data = {
  profile: {
    login: "testuser",
    name: null,
    avatar_url: "",
    bio: null,
    html_url: "https://github.com/testuser",
    followers: 0,
    following: 1,
    public_repos: 1,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  repositories: [
    {
      name: "my-project",
      description: null,
      html_url: "https://github.com/testuser/my-project",
      homepage: null,
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      topics: [],
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
      pushed_at: "2026-01-01T00:00:00Z",
      size: 100,
      fork: false,
      archived: false,
    },
  ],
};

describe("GitDoc insights", () => {
  it("generates roast lines", () => {
    const roast = generateRoast(data, score);

    expect(roast.length).toBeGreaterThan(0);
    expect(roast.length).toBeLessThanOrEqual(5);
    expect(roast.every((line) => typeof line === "string")).toBe(true);
  });

  it("generates a rescue plan", () => {
    const rescue = generateRescuePlan(data, score);

    expect(rescue.length).toBeGreaterThan(0);
    expect(rescue.length).toBeLessThanOrEqual(5);

    expect(rescue[0]).toHaveProperty("title");
    expect(rescue[0]).toHaveProperty("problem");
    expect(rescue[0]).toHaveProperty("action");
    expect(rescue[0]).toHaveProperty("impact");
  });
});