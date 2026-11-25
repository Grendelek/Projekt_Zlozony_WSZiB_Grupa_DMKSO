import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Projekt DormTech</p>
        <h1 className="mt-2 text-3xl font-semibold text-black">
          DormTech - panel usterek (szkielet)
        </h1>
        <p className="mt-4 text-zinc-600">
          To jest strona startowa szkieletu. Z tego miejsca przejdziesz do logowania
          i do panelu.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-full bg-black px-5 text-white"
          >
            Zaloguj się
          </Link>
          <Link
            href="/dashboard"
            className="flex h-11 items-center justify-center rounded-full border border-black/10 px-5"
          >
            Panel
          </Link>
          <Link
            href="/api/health"
            className="flex h-11 items-center justify-center rounded-full border border-black/10 px-5"
          >
            Sprawdź /api/health
          </Link>
        </div>

        <h2 className="mt-8 text-lg font-semibold text-black">
          Co działa w Sprincie 1
        </h2>
        <ul className="mt-2 list-disc pl-5 text-zinc-600">
          <li>Strona startowa - szkielet</li>
          <li>Logowanie Auth.js z rolą w sesji</li>
          <li>Healthcheck /api/health - status bazy danych</li>
        </ul>

        <p className="mt-8 text-sm text-zinc-500">
          Dokumentacja projektu jest w folderze docs w repozytorium.
        </p>
      </div>
    </main>
  );
}