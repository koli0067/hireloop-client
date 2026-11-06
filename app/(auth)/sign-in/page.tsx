import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
  description: "Sign in to HireLoop to continue your job search.",
}

export default function SignInPage() {
  return <AuthForm mode="sign-in" />
}
