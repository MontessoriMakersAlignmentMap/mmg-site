/**
 * ─── INTERNAL PROGRAM CONFIG ─────────────────────────────────────────────────
 *
 * This file is SERVER-SIDE ONLY.
 * Do NOT import from any 'use client' component.
 * Do NOT expose these values in page props, API responses, or client bundles.
 *
 * Intended use: admin tooling, acceptance email generation, internal dashboards.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const INSTITUTE_PROGRAMS = {
  leadershipStudio: {
    name: 'Leadership Studio',
    cohort: 'September 2026 – May 2027',
    price: 1350,

    /**
     * Private Stripe payment link.
     * Send only to accepted applicants via acceptance email.
     * This URL must never appear in public-facing page code.
     */
    stripePaymentLink: 'https://buy.stripe.com/6oU6oJc6k2yI8ITd7X2cg0Q',

    /**
     * Success page shown to participants after enrollment is confirmed.
     * Link from acceptance email after payment.
     */
    successPage: '/institute/leadership-studio/success',
  },

  leadershipIntensive: {
    name: 'Leadership Intensive',
    cohort: 'July 22–24, 2026',
    price: 900,

    /**
     * Public Stripe payment link (self-serve registration — already on public page).
     */
    stripePaymentLink: 'https://buy.stripe.com/9B628t0nCehq1gr2tj2cg0P',

    successPage: null, // direct Stripe-hosted confirmation
  },
} as const
