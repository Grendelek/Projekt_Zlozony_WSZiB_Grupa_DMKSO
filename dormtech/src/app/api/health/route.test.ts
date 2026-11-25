import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";
import { prisma } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

const mockedQueryRaw = vi.mocked(prisma.$queryRaw);

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("zwraca 200 i OK gdy baza dziala", async () => {
    mockedQueryRaw.mockResolvedValueOnce([{ "?column?": 1 }]);

    const res = await GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      status: "OK",
      db: "connected",
    });
  });

  it("zwraca 500 i ERROR gdy baza niedostepna", async () => {
    mockedQueryRaw.mockRejectedValueOnce(new Error("Connection refused"));

    const res = await GET();

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({
      status: "ERROR",
      db: "disconnected",
      error: "Baza danych niedostępna",
    });
  });
});