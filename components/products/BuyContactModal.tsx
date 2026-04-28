
// task5 project adjust

// optimize code detail
"use client"  [edited]

import { useMemo, useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { useSupabaseAuth } from "@/lib/supabase/useSupabaseAuth"
import { getPublicEnv } from "@/lib/env"

export function BuyContactModal({
  open,
  onClose,
  title,
  categorySlug,
  productId,
  defaultMessage
}: {
  open: boolean
  onClose: () => void
  title: string
  categorySlug: string
  productId: string | null
  defaultMessage: string
}) {
  const { supabase, session } = useSupabaseAuth()
  const { contactPhone } = getPublicEnv()
  const [message, setMessage] = useState(defaultMessage)
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const smsHref = useMemo(() => {
    const body = encodeURIComponent(message)
    const digits = contactPhone.replace(/[^\d+]/g, "")
    return `sms:${digits}?&body=${body}`
  }, [contactPhone, message])

  async function saveInquiry() {
    if (!supabase) return
    setStatus("saving")
    await supabase.from("inquiries").insert({
      user_id: session?.user.id ?? null,
      product_id: productId,
      category_slug: categorySlug,
      message
    })
    setStatus("saved")
  }

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-700">
          We keep it simple. Call or text Paula to check availability and set up
          pickup.
        </p>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-medium">Phone</p>
          <p className="mt-1 font-mono text-sm">{contactPhone}</p>
        </div>

        <label className="text-sm font-medium">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-farm-700 focus:ring-2 focus:ring-farm-700/20"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => window.open(smsHref)}>
            Open text message
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={async () => {
              await saveInquiry()
            }}
            disabled={status === "saving" || !supabase}
            title={
              supabase
                ? "Save inquiry"
                : "Configure Supabase to save inquiries"
            }
          >
            {status === "saved" ? "Saved" : status === "saving" ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}