import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background text-foreground font-sans">
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-tight">CareerLoop</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              Theme System Ready
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="group" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-24 px-8 mx-auto sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left my-8">
          <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-foreground">
            CareerLoop Theme System
          </h1>
          <p className="max-w-lg text-base leading-7 text-muted-foreground">
            Dark, light, and system themes are powered by{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
              next-themes
            </code>{" "}
            and Base UI Nova design tokens. Use the theme toggles in the header to switch between modes.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm text-primary-foreground font-medium transition-colors hover:bg-primary/90 md:w-auto"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
          <a
            className="flex h-10 w-full items-center justify-center rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:bg-muted md:w-auto"
            href="https://github.com/pacocoursey/next-themes"
            target="_blank"
            rel="noopener noreferrer"
          >
            next-themes Docs
          </a>
        </div>
      </main>
    </div>
  );
}

