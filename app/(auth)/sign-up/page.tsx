import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Create account | HireLoop",
  description: "Create your HireLoop account and find your dream job faster.",
}

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />
}
