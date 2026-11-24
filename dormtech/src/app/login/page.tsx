import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="mx-auto w-full max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold">DormTech</h1>
      <p className="mb-6">Zaloguj się do panelu zgłoszeń usterek.</p>
      <LoginForm />
    </main>
  );
}
