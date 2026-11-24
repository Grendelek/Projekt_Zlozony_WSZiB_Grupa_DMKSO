"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-lg border border-gray-300 p-6">
      <label className="flex flex-col gap-1">
        E-mail
        <input className="rounded border px-3 py-2" name="email" type="email" required autoComplete="username" />
      </label>
      <label className="flex flex-col gap-1">
        Hasło
        <input className="rounded border px-3 py-2" name="password" type="password" required autoComplete="current-password" />
      </label>
      {state.error ? <p role="alert" className="text-red-600">{state.error}</p> : null}
      <button disabled={pending} className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50" type="submit">
        {pending ? "Logowanie..." : "Zaloguj"}
      </button>
    </form>
  );
}
