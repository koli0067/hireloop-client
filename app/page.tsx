import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-black px-4 pt-6 sm:px-7">
      <Navbar />
      <Hero />
    </main>
  )
}
