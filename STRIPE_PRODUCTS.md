# MMAP Stripe Products Reference

Generated: 2026-04-09  
Account: Montessori Makers Group (live mode)

> **Images:** Stripe product images must be publicly hosted URLs and cannot be pushed via API from local files.  
> Upload each image manually: Stripe Dashboard → Products → [product] → Edit → Add image.  
> Image files are in `~/Desktop/MMAP_Purchasing_extracted/`.

---

## Core Tiers

| Product | Stripe Product ID | Stripe Price ID | Billing | Unit Amount | Monthly Min | Metadata | Image File |
|---------|-------------------|-----------------|---------|-------------|-------------|----------|------------|
| MMAP Surveyor | `prod_UJ2GPeRn5CZujI` | `price_1TKQChPGvmx1ACnDShQo8yGR` | Monthly recurring, per-unit | $2.00/student | None | `tier=surveyor` | `1.png` |
| MMAP North Star | `prod_UJ2GWqelUIiZOZ` | `price_1TKQCiPGvmx1ACnDzmJ8R12T` | Monthly recurring, per-unit | $3.00/student | $300 | `tier=north_star` | `2.png` |
| MMAP Mapmaker | `prod_UJ2GNp4gvRDmWJ` | `price_1TKQClPGvmx1ACnDZgo5rdGf` | Monthly recurring, per-unit | $5.00/student | $500 | `tier=mapmaker` | `3.png` |
| MMAP Atlas | `prod_UJ2GEcXXLxs4ld` | `price_1TKQCmPGvmx1ACnDTpDBJzGP` | Monthly recurring, per-unit | $7.00/student | $800 | `tier=atlas` | `4.png` |

> **Quantity at subscription creation** = number of enrolled students.  
> Stripe does not enforce minimums automatically — apply minimum billing logic manually or via invoice line items when creating subscriptions.

---

## Implementation Fee

| Product | Stripe Product ID | Stripe Price ID | Billing | Amount | Metadata | Image File |
|---------|-------------------|-----------------|---------|--------|----------|------------|
| MMAP Implementation Fee | `prod_UJ2GGDK0f1AWOP` | `price_1TKQCnPGvmx1ACnD46ZTMDh9` | One-time | $2,500.00 | `fee_type=implementation` | `5.png` |

> Add manually to the first invoice for North Star, Mapmaker, and Atlas schools. Waived for pilot schools.

---

## Add-On Modules

| Product | Stripe Product ID | Stripe Price ID | Billing | Unit Amount | Monthly Min | Metadata | Image File |
|---------|-------------------|-----------------|---------|-------------|-------------|----------|------------|
| MMAP Finance Engine | `prod_UJ2GP0nb1ziR0m` | `price_1TKQCoPGvmx1ACnDKIhgRmL2` | Monthly recurring, per-unit | $2.00/student | $250 | `addon=finance_engine` | `6.png` |
| MMAP Family Pulse | `prod_UJ2GozZwrzmIt5` | `price_1TKQCpPGvmx1ACnDkXZypGv2` | Monthly recurring, per-unit | $0.50/student | $100 | `addon=family_pulse` | `7.png` |
| MMAP Peace and Restoration | `prod_UJ2GeMVUkqig12` | `price_1TKQCqPGvmx1ACnDA6ZQTYyj` | Monthly recurring, per-unit | $0.50/student | $100 | `addon=peace_restoration` | `8.png` |
| MMAP SMS Broadcasts | `prod_UJ2Gyjmrl1msq6` | `price_1TKQCrPGvmx1ACnDvup56d18` | Monthly recurring, per-unit | $0.50/student | $100 | `addon=sms_broadcasts` | `9.png` |
| MMAP Handbook Templates | `prod_UJ2G3vMV5NZXR2` | `price_1TKQCrPGvmx1ACnDXgxMuVPS` | One-time, flat rate | $0 placeholder | — | `addon=handbook_templates` | `10.png` |

> **Handbook Templates:** Override the $0 placeholder price manually when creating each order.

---

## Quote-Only Products (No Price Created)

| Product | Stripe Product ID | Stripe Price ID | Billing | Metadata | Image File |
|---------|-------------------|-----------------|---------|----------|------------|
| MMAP Assessment Equity Analytics | `prod_UJ2GJnPqNJADcC` | *(none — add custom price per school)* | Quote-only | `addon=assessment_equity_analytics` | `11.png` |
| MMAP API/SIS Integration | `prod_UJ2Gk4QUWoms0T` | *(none — add custom price per school)* | Quote-only | `addon=custom_integration` | `12.png` |

---

## Notes for Manual Subscription Creation

1. **Set quantity = enrolled students** when adding a recurring line item.
2. **Minimums are not Stripe-enforced.** If a school's student count falls below the tier minimum, adjust the quantity manually to meet the minimum billing floor.
3. **Implementation fee:** Add `price_1TKQCnPGvmx1ACnD46ZTMDh9` as a one-time line item on the first invoice for all non-pilot North Star, Mapmaker, and Atlas schools.
4. **Handbook Templates:** Use `prod_UJ2G3vMV5NZXR2` and enter a custom price at invoice creation — do not use the $0 placeholder price directly.
5. **Assessment Equity Analytics / API/SIS Integration:** Create a custom one-time or recurring price directly on the product when quoting.
