"use client"

import { useEffect, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

type AuthMode = "sign-in" | "sign-up"

type AuthErrorLike = {
  code?: string
  message?: string
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.89c2.27-2.09 3.53-5.17 3.53-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.89-3c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.73-2.08-6.67-4.88H1.24v3.02C3.22 21.31 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.33 14.37A7.2 7.2 0 0 1 4.95 12c0-.83.14-1.63.38-2.37V6.61H1.24A11.96 11.96 0 0 0 0 12c0 1.91.45 3.71 1.24 5.39l4.09-3.02z"
      />
      <path
        fill="#EA4335"
        d="M12 4.4c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.94 1 15.24 0 12 0 7.31 0 3.22 2.69 1.24 6.61l4.09 3.02c.94-2.8 3.57-5.23 6.67-5.23z"
      />
    </svg>
  )
}

function getAuthErrorMessage(error: unknown): string {
  const authError =
    error && typeof error === "object" ? (error as AuthErrorLike) : undefined

  switch (authError?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "That email and password don’t match. Please try again."
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with that email already exists."
    case "EMAIL_NOT_VERIFIED":
      return "Please verify your email before signing in."
    case "PROVIDER_NOT_FOUND":
      return "Google sign-in isn’t configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env."
    case "CLIENT_ID_AND_SECRET_REQUIRED":
      return "Google sign-in isn’t configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env."
    default:
      return authError?.message ?? "Something went wrong. Please try again."
  }
}

function FieldShell({
  id,
  label,
  icon,
  children,
}: {
  id: string
  label: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="group flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 transition-colors focus-within:border-[#6c5dff]/70 focus-within:bg-white/[0.06]">
        <span className="text-zinc-500 transition-colors group-focus-within:text-[#948bff]">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {children}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const isSignUp = mode === "sign-up"
  const { data: session, isPending: isSessionPending } = authClient.useSession()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [isGooglePending, setIsGooglePending] = useState(false)

  const busy = isPending || isGooglePending
  const isSignedIn = Boolean(session?.user)
  const title = isSignUp ? "Create your HireLoop account" : "Welcome back"
  const description = isSignUp
    ? "Save roles, track applications and get matched with curated jobs."
    : "Pick up your job search where you left off."
  const alternateHref = isSignUp ? "/sign-in" : "/sign-up"
  const alternateLabel = isSignUp
    ? "Already have an account? Sign in"
    : "New here? Create an account"

  useEffect(() => {
    if (!isSessionPending && isSignedIn) {
      router.replace("/")
    }
  }, [isSessionPending, isSignedIn, router])

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (isSignUp && !trimmedName) {
      setError("Please enter your full name.")
      return
    }

    if (!trimmedEmail) {
      setError("Please enter your email.")
      return
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.")
      return
    }

    setIsPending(true)
    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: trimmedName,
            email: trimmedEmail,
            password,
          })
        : await authClient.signIn.email({
            email: trimmedEmail,
            password,
          })

      if ("error" in result && result.error) {
        setError(getAuthErrorMessage(result.error))
        return
      }

      router.push("/")
    } catch (authError) {
      setError(getAuthErrorMessage(authError))
    } finally {
      setIsPending(false)
    }
  }

  async function handleGoogleAuth() {
    setError(null)
    setIsGooglePending(true)

    try {
      const callbackURL = new URL("/", window.location.origin).toString()
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: window.location.href,
      })

      if ("error" in result && result.error) {
        setError(getAuthErrorMessage(result.error))
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError))
    } finally {
      setIsGooglePending(false)
    }
  }

  if (isSessionPending || isSignedIn) {
    return (
      <div
        role="status"
        aria-label={isSignedIn ? "Redirecting to home" : "Checking your session"}
        className="h-64 w-full animate-pulse rounded-3xl border border-white/10 bg-[#1f1f1f]"
      />
    )
  }

  return (
    <section
      aria-labelledby="auth-heading"
      className="w-full rounded-3xl border border-white/10 bg-[#1f1f1f]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col items-center text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#948bff]">
          {isSignUp ? "Start your search" : "Welcome back"}
        </p>
        <h1
          id="auth-heading"
          className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h1>
        <p className="mt-2 max-w-sm text-pretty text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleAuth}
        disabled={busy}
        className="mt-7 h-12 w-full rounded-xl border-white/10 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08] hover:text-white"
      >
        {isGooglePending ? (
          <Loader2 aria-hidden="true" className="animate-spin" />
        ) : (
          <GoogleIcon className="size-5" />
        )}
        Continue with Google
      </Button>

      <div className="my-6">
        <Divider>or continue with {isSignUp ? "email" : "password"}</Divider>
      </div>

      {error ? (
        <div
          id="auth-error"
          role="alert"
          className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleEmailAuth}>
        {isSignUp ? (
          <FieldShell id="name" label="Full name" icon={<User className="size-5" strokeWidth={1.75} />}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "auth-error" : undefined}
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={busy}
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </FieldShell>
        ) : null}

        <FieldShell id="email" label="Email" icon={<Mail className="size-5" strokeWidth={1.75} />}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "auth-error" : undefined}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </FieldShell>

        <FieldShell id="password" label="Password" icon={<Lock className="size-5" strokeWidth={1.75} />}>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder={isSignUp ? "Create a password" : "Enter your password"}
            required
            minLength={8}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "auth-error" : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((value) => !value)}
            disabled={busy}
            className="text-zinc-500 transition-colors hover:text-zinc-200 disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="size-5" strokeWidth={1.75} />
            ) : (
              <Eye aria-hidden="true" className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </FieldShell>

        {isSignUp ? (
          <p className="text-xs leading-5 text-zinc-500">
            Use at least 8 characters for your password.
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={busy}
          className="h-12 w-full rounded-xl bg-[#5b4bff] text-white shadow-[0_0_24px_rgba(91,75,255,0.3)] hover:bg-[#6c5dff]"
        >
          {isPending ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : null}
          {isPending
            ? isSignUp
              ? "Creating account..."
              : "Signing in..."
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        <Link
          href={alternateHref}
          className="font-medium text-[#948bff] transition-colors hover:text-[#b3acff]"
        >
          {alternateLabel}
        </Link>
      </p>
    </section>
  )
}
