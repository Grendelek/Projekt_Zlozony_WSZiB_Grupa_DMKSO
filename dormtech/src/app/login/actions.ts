"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginState = { error: string };

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Podaj adres e-mail i hasło." };

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    return { error: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      // Do not disclose whether the email exists or which credential is invalid.
      return { error: "Nieprawidłowy adres e-mail lub hasło." };
    }
    throw error; // Includes NEXT_REDIRECT after successful sign-in.
  }
}
