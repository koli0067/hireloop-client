import Image from "next/image"
import { Briefcase, Building2, MapPin, Search, Star } from "lucide-react"
import globe from "@/app/images/globe.png"

const trending = ["Product Designer", "AI Engineering", "DevOps Engineer"]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Search, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-hidden pt-12 sm:pt-16 lg:pt-40"
    >
      {/* Decorative radial glow behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[12%] -z-10 size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,75,255,0.16),transparent_70%)] blur-3xl"
      />

      {/* Announcement badge */}
      <div className="flex w-full items-center justify-center gap-3">
        <span
          aria-hidden="true"
          className="hidden h-px w-24 bg-gradient-to-r from-transparent to-white/20 sm:block"
        />
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#2a2a2a] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <Briefcase
            aria-hidden="true"
            className="size-4 fill-[#ff7a1a] text-[#ff7a1a]"
            strokeWidth={1.5}
          /> 
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[11px]">
            50,000+{" "}
            <span className="text-white/45">New Jobs This Month</span>
          </span>
        </div>
        <span
          aria-hidden="true"
          className="hidden h-px w-24 bg-gradient-to-l from-transparent to-white/20 sm:block"
        />
      </div>

      <h1
        id="hero-heading"
        className="mt-7 max-w-4xl text-balance text-center text-[2.65rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
      >
        Find Your Dream Job Today
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-center text-sm leading-6 text-zinc-400 sm:text-base">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role — faster.
      </p>

      {/* Search bar — presentational only for now */}
      <div
        role="search"
        aria-label="Search jobs (preview)"
        className="mt-7 flex w-full max-w-[680px] flex-col rounded-2xl border border-white/[0.14] bg-[#1f1f1f] p-2 shadow-[0_14px_45px_rgba(0,0,0,0.35)] focus-within:border-[#6c5dff]/60 focus-within:ring-4 focus-within:ring-[#5b4bff]/20 sm:h-14 sm:flex-row sm:items-stretch sm:rounded-[16px] sm:p-1"
      >
        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-4 text-zinc-500 transition-colors focus-within:text-zinc-300 sm:h-full">
          <Search aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
          <span className="sr-only">Job title, skill or company</span>
          <input
            type="text"
            name="query"
            placeholder="Job title, skill or company"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </label>

        <span
          aria-hidden="true"
          className="mx-3 h-px bg-white/10 sm:mx-0 sm:my-auto sm:h-7 sm:w-px"
        />

        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-4 text-zinc-500 transition-colors focus-within:text-zinc-300 sm:h-full">
          <MapPin aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
          <span className="sr-only">Location or Remote</span>
          <input
            type="text"
            name="location"
            placeholder="Location or Remote"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </label>

        <button
          type="button"
          aria-label="Search jobs"
          className="mt-2 flex h-12 shrink-0 items-center justify-center rounded-xl bg-[#5b4bff] px-6 text-white shadow-[0_0_24px_rgba(91,75,255,0.45)] transition-colors hover:bg-[#6c5dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#948bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f] sm:mt-0 sm:h-12 sm:w-14 sm:px-0"
        >
          <Search aria-hidden="true" className="size-5" strokeWidth={2} />
        </button>
      </div>

      {/* Trending positions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] text-zinc-500">
        <span className="mr-1 text-zinc-500">Trending Position:</span>
        {trending.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Cropped globe artwork — the asset's top magenta glow is hidden by translation */}
      <div className="relative mt-1 h-[430px] w-full max-w-[1320px] overflow-hidden sm:h-[520px] lg:h-[600px]">
        <Image
          src={globe}
          alt=""
          priority
          sizes="(min-width: 1280px) 1320px, 100vw"
          className="absolute left-0 top-0 h-auto w-full -translate-y-[38%] select-none"
        />
        {/* Blend the crop seam into the page background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent"
        />
        {/* Bottom fade behind the stat cards */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent"
        />
        <p className="absolute inset-x-4 top-[42%] mx-auto w-fit text-balance text-center text-[1.15rem] font-light leading-tight text-white/80 sm:top-[48%] sm:text-2xl lg:top-[50%] lg:text-[1.7rem]">
          Assisting over{" "}
          <span className="font-medium text-white">15,000 job seekers</span>
          <br className="hidden sm:block" /> find their dream positions.
        </p>
      </div>

      {/* Stat cards overlapping the bottom of the globe */}
      <div className="relative z-10 -mt-36 grid w-full max-w-[1216px] grid-cols-2 gap-3 px-1 sm:-mt-44 sm:gap-4 sm:px-0 lg:-mt-48 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.12] bg-[#242424]/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-6"
          >
            <Icon
              aria-hidden="true"
              className="size-4 text-zinc-300 sm:size-5"
              strokeWidth={1.5}
            />
            <p className="mt-2.5 text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              {value}
            </p>
            <p className="mt-1.5 text-[11px] text-zinc-400 sm:mt-2 sm:text-sm">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="h-10 sm:h-14 lg:h-16" />
    </section>
  )
}
