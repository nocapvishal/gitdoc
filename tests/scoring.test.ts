import { describe, expect, it } from "vitest";
import { calculateHealthScore } from "../lib/scoring";

describe("calculateHealthScore", () => {
  it("returns a score between 0 and 100", () => {
    const result = calculateHealthScore({
      profile: {
        login: "testuser",
        name: "Test User",
        avatar_url: "",
        bio: "Developer",
        html_url: "https://github.com/testuser",
        followers: 10,
        following: 5,
        public_repos: 3,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
      repositories: [
        {
          name: "project-one",
          description: "A useful project",
          html_url: "https://github.com/testuser/project-one",
          homepage: "https://example.com",
          language: "TypeScript",
          stargazers_count: 2,
          forks_count: 1,
          topics: ["typescript"],
          created_at: "2025-01-01T00:00:00Z",
          updated_at: "2026-01-01T00:00:00Z",
          pushed_at: "2026-01-01T00:00:00Z",
          size: 100,
          fork: false,
          archived: false,
        },
      ],
    });

   expect(result.total).toBeGreaterThanOrEqual(0);
expect(result.total).toBeLessThanOrEqual(100);
  });

  it("returns a valid health level", () => {
    const result = calculateHealthScore({
      profile: {
        login: "emptyuser",
        name: null,
        avatar_url: "",
        bio: null,
        html_url: "https://github.com/emptyuser",
        followers: 0,
        following: 0,
        public_repos: 0,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
      repositories: [],
    });

    expect([
      "Critical",
      "Needs Attention",
      "Developing",
      "Strong",
      "Recruiter Ready",
    ]).toContain(result.level);
  });
});