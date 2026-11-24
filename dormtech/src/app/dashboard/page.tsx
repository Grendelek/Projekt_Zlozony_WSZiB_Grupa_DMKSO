import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">Panel DormTech</h1>
      <p className="mt-4">Zalogowano jako: {session.user.name ?? session.user.email}</p>
      <p>Rola: {session.user.role === "ADMIN" ? "Administrator" : "Mieszkaniec"}</p>
      <p className="mt-4 text-sm">To podstawa logowania. Obsługa zgłoszeń zostanie dodana w kolejnych zadaniach.</p>
      <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}>
        <button type="submit" className="mt-6 rounded bg-gray-900 px-4 py-2 text-white">Wyloguj</button>
      </form>
    </main>
  );
}
