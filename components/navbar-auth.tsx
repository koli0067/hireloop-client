"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, LogOut } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

function GetStartedButton() {
  return (
    <Button
      render={<Link href="/sign-up" />}
      nativeButton={false}
      className="h-10 rounded-xl bg-[#5b4bff] px-5 text-sm text-white shadow-[0_0_18px_rgba(91,75,255,0.2)] hover:bg-[#6c5dff]"
    >
      Get Started
    </Button>
  )
}

function UserAvatar({
  name,
  email,
}: {
  name?: string | null
  email?: string | null
}) {
  const initial = (name?.trim() || email?.trim() || "?")
    .charAt(0)
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#5b4bff]/20 text-sm font-semibold text-[#b3acff]"
    >
      {initial}
    </span>
  )
}

export function NavbarAuth({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await authClient.signOut()
      router.refresh()
    } finally {
      setIsSigningOut(false)
    }
  }

  if (isPending) {
    return mobile ? (
      <div aria-hidden="true" className="h-16 animate-pulse rounded-xl bg-white/5" />
    ) : (
      <div aria-hidden="true" className="h-10 w-48 animate-pulse rounded-xl bg-white/5" />
    )
  }

  const user = session?.user

  if (!user) {
    if (mobile) {
      return (
        <>
          <Link
            href="/sign-in"
            className="rounded-md px-3 py-2 text-sm font-medium text-[#948bff] transition-colors hover:bg-white/5"
          >
            Sign In
          </Link>
          <GetStartedButton />
        </>
      )
    }

    return (
      <>
        <Link
          href="/sign-in"
          className="text-sm font-medium text-[#7468ff] transition-colors hover:text-[#948bff]"
        >
          Sign In
        </Link>
        <GetStartedButton />
      </>
    )
  }

  const displayName = user.name?.trim() || "HireLoop user"
  const email = user.email ?? ""

  if (mobile) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <UserAvatar name={displayName} email={email} />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-white">
              {displayName}
            </span>
            <span className="mt-0.5 truncate text-xs text-zinc-400">
              {email}
            </span>
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="h-11 w-full justify-start rounded-xl border-white/10 bg-white/[0.04] px-3 text-sm text-zinc-200 hover:bg-white/[0.08] hover:text-white"
        >
          {isSigningOut ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : (
            <LogOut aria-hidden="true" className="size-4" />
          )}
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2.5">
        <UserAvatar name={displayName} email={email} />
        <span className="flex max-w-44 flex-col leading-tight">
          <span className="truncate text-sm font-medium text-white">
            {displayName}
          </span>
          <span className="mt-0.5 truncate text-xs text-zinc-400">{email}</span>
        </span>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleSignOut}
        disabled={isSigningOut}
        aria-label="Sign out"
        className="h-10 rounded-xl border-white/10 bg-white/[0.04] px-4 text-sm text-zinc-200 hover:bg-white/[0.08] hover:text-white"
      >
        {isSigningOut ? (
          <Loader2 aria-hidden="true" className="animate-spin" />
        ) : (
          <LogOut aria-hidden="true" className="size-4" />
        )}
        Sign Out
      </Button>
    </div>
  )
}
