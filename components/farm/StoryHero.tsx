
// code updated randomly

/* minor adjust */

// update log: auto edit 01
"use client"

import Image from "next/image"
import { ButtonLink } from "@/components/ui/Button"
import { useEffect, useState } from "react"

export function StoryHero() {
  const [isDay, setIsDay] = useState<boolean | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    setIsDay(hour >= 6 && hour < 18)
  }, [])

  const hoursBackground =
    isDay === null
      ? "/photos/background.jpg"
      : isDay
        ? "/photos/background.jpg"
        : "/photos/background1.jpg"

  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-sm font-medium text-farm-800">
          Texas family farm · Eggs · Woodcraft · Skincare
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A warm marketplace built around our family and the land we care for.
        </h1>
        <p className="mt-4 max-w-prose text-base text-zinc-700">
          Paula is a mom of 10 and grandma to 11. She founded the Rushing
          homeschool and runs Paula’s farm business with a full-house kind of
          warmth. Eggs come straight from the coop, woodcraft comes from the
          family shop, and Lisa’s skincare connects to our natural, small-batch
          way of life.
        </p>
        <div className="mt-5 max-w-prose rounded-2xl border border-zinc-200 bg-white/70 p-4 text-sm text-zinc-700">
          Business hours: 7:00 AM – 10:00 PM
        </div>
        <div
          className="mt-5 h-40 max-w-prose overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900/20 bg-cover bg-center sm:h-52"
          style={{ backgroundImage: `url(${hoursBackground})` }}
        >
          <div className="flex h-full flex-col justify-end bg-gradient-to-r from-zinc-950/75 to-zinc-950/20 p-5 text-white">
            <p className="text-sm font-semibold">Business hours</p>
            <p className="mt-1 text-sm text-white/90">
              Mornings use background · Evenings use background1
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/products">Browse products</ButtonLink>
          <ButtonLink href="/products/eggs" variant="secondary">
            See today’s eggs
          </ButtonLink>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <Image
          src="/photos/Home.jpg"
          alt="Paula’s farm home"
          width={1200}
          height={900}
          className="h-[320px] w-full object-cover sm:h-[420px]"
          priority
        />
      </div>
    </section>
  )
}
