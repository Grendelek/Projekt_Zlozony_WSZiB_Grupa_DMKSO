import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "OK",
      db: "connected",
    });
  } catch {
    return NextResponse.json(
      {
        status: "ERROR",
        db: "disconnected",
        error: "Baza danych niedostępna",
      },
      { status: 500 }
    );
  }
}