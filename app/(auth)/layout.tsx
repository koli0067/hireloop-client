import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-black px-4 text-white sm:px-6">
      {/* Decorative glows echoing the home hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,75,255,0.22),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(91,75,255,0.14),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(91,75,255,0.12),transparent_70%)] blur-3xl"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center py-6 sm:justify-start">
        <Link href="/" aria-label="HireLoop home" className="shrink-0">
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-8 w-auto sm:h-9"
            sizes="160px"
          />
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-md items-center justify-center pb-10">
        {children}
      </div>
    </main>
  )
}
