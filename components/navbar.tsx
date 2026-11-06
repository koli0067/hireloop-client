import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import logo from "@/app/images/logo.png"
import { NavbarAuth } from "@/components/navbar-auth"

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {links.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={
            mobile
              ? "rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              : "text-[13px] text-white/85 transition-colors hover:text-white"
          }
        >
          {label}
        </Link>
      ))}
    </>
  )
}

export function Navbar() {
  return (
    <header className="mx-auto w-full max-w-[1440px]">
      <nav
        aria-label="Main navigation"
        className="flex min-h-[60px] items-center justify-between rounded-2xl bg-[#1f1f1f] px-5 py-2.5 sm:px-6"
      >
        <Link href="/" aria-label="Hireloop home" className="shrink-0">
          <Image
            src={logo}
            alt="Hireloop"
            priority
            className="h-8 w-auto"
            sizes="150px"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavigationLinks />
          <span aria-hidden="true" className="h-5 w-px bg-white/15" />
          <NavbarAuth />
        </div>

        <details className="group relative md:hidden">
          <summary
            aria-label="Toggle navigation menu"
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </summary>
          <div className="absolute right-0 top-12 z-10 flex min-w-52 flex-col gap-1 rounded-xl border border-white/10 bg-[#242424] p-2 shadow-xl">
            <NavigationLinks mobile />
            <span aria-hidden="true" className="my-1 h-px bg-white/10" />
            <NavbarAuth mobile />
          </div>
        </details> 
      </nav>
    </header>
  )
}
