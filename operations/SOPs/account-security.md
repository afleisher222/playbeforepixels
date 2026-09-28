# Account security SOP

**Why this matters:** a small online business is most often lost through a hijacked email, domain or payout account, not a product problem. Every platform below pays out money or controls the brand. Tool names and prices are UNVERIFIED; compare them before buying.

**Owners:** F = founder · R = Claude routine.

## 1. The five rules
1. **Use a password manager for every login.** For example 1Password or Bitwarden `[VERIFY pricing]`. Every password is unique and generated. Nothing is reused from personal accounts.
2. **Turn on two-step verification everywhere.** Use passkeys or an authenticator app, not SMS, wherever the platform offers it. For the three crown jewels (the business email, the domain registrar/Cloudflare, and the bank), add a hardware security key if supported, and register **two** keys: one on the key ring, one in the safe place.
3. **Business accounts use business email.** Log in to platforms with a role address on our domain (for example `admin@[BUSINESS DOMAIN]`), never a personal Gmail.
   - The USPTO correspondence email is currently the founder's personal address. Keep it secure and change it to a business address only through USPTO's own form.
   - Keep the domain-email account's recovery options owner-controlled (the founder's phone and the backup codes).
4. **Give people roles, not shared passwords.** The accountant gets the Accountant user in QBO and a staff account in Shopify with reports only. Contractors get the smallest role, removed when their work ends. Nobody ever gets the founder's login.
5. **Automation keys are narrow and revocable.** API tokens live only in the cloud environment's secrets (`ops/SECRETS.md`), with the least scope that works. They are never committed and never pasted into chat. Rotate them yearly, and immediately if exposed.

## 2. Account inventory (R keeps this current; no passwords, ever)

| Account | Login email | 2FA method | Backup codes stored? | Others with access | Money? |
|---|---|---|---|---|---|
| Business email (Workspace or Zoho) | admin@ | security key + app | ☐ | — | Controls every reset |
| Cloudflare (registrar, DNS, Pages) | admin@ | security key + app | ☐ | second admin: [decide] | Domain |
| Bank (business checking + tax reserve) | per bank | bank's strongest | ☐ | A: read-only if offered | **Yes** |
| Business credit card (Chase) | per issuer | issuer's strongest | ☐ | — | **Yes** |
| Shopify | admin@ | app | ☐ | A: staff, reports only | **Yes** |
| Merchant of record | admin@ | app | ☐ | — | **Yes** |
| PayPal Business | admin@ | app | ☐ | — | **Yes** |
| Etsy, TpT, TikTok Shop, Faire | admin@ | app | ☐ | — | **Yes** |
| Amazon KDP, Author Central, Associates | admin@ | app | ☐ | — | **Yes** |
| IngramSpark | admin@ | per platform | ☐ | — | **Yes** |
| POD partner | admin@ | app | ☐ | — | Card on file |
| QuickBooks Online, Link My Books | admin@ | app | ☐ | A: Accountant user | Books |
| Email platform (MailerLite/Kit) | admin@ | app | ☐ | — | List |
| Social accounts and scheduler | admin@ | app | ☐ | — | Brand |
| GitHub (this repository) | per founder | security key or app | ☐ | — | Everything in this repo |
| USPTO.gov account | per founder | USPTO's 2FA / ID verification | ☐ | trademark attorney | Trademark |
| Maryland Business Express / Comptroller | per founder | per portal | ☐ | A | Filings |
| IRS EFTPS | per founder | PIN + password | ☐ | — | Tax payments |
| Password manager | — | master password + key | ☐ (emergency kit) | — | All of the above |

**Where the recovery codes go:** print the recovery codes and the password-manager emergency kit. Keep one copy in a home safe or locked drawer and a second copy in another secure place (for example a safe-deposit box). Never store them in this repository, in email or in chat.

## 3. Crown-jewel settings

**Business email:**
- turn on 2FA enforcement;
- review "less secure app" and third-party app access, removing unused ones;
- alert on new sign-ins;
- block auto-forwarding to outside addresses (a common attacker trick);
- use recovery options owner-controlled (the founder's phone and the backup codes).

**Cloudflare:**
- two admins, where a trusted second person exists; otherwise one admin with two security keys;
- registrar lock ON;
- auto-renew ON with a valid card;
- notifications for DNS changes and login from a new device, where offered.

**Bank:**
- alerts on every outgoing ACH or wire, every login and every change to payees or contact details;
- dual approval for outgoing ACH if the bank offers it;
- a read-only login for the accountant.

**Payout accounts** (Shopify, the MoR, marketplaces): alerts on bank-account changes. A changed payout bank you didn't make means an incident; go to §6.

## 4. Phishing and fraud patterns to expect

- **Trademark "notice" solicitations.** Private companies (for example Markavo, CopyMark and TCLP, per `legal/ENTITY.md`) send official-looking bills. Real USPTO email comes from `@uspto.gov`. Check the status in TSDR yourself, and never pay from a link in an email.
- **"Your store or account is suspended, verify now."** Always log in by typing the address or using the password manager, never through the link.
- **Fake purchase orders.** An "order" from a lookalike district domain asking us to ship first, or to buy goods from a named supplier. Verify the school's domain independently. Nothing ships before a PO from a verified domain, or payment (`school-orders.md` §3).
- **Payment-detail change requests** (a fundraiser group or vendor asking us to send money to a new account): go to §6.
- **Overpayment and refund-to-a-different-card scams.** Refunds go only to the original payment method.
- **Gift-card requests "from the founder" or "from the accountant."** Never. No legitimate request in this business uses gift cards.

## 5. Reviews
- **Quarterly** (`quarterly.md` §4): go through the inventory, 2FA and access; rotate keys older than 12 months; remove finished contractors.
- **Yearly** (`yearly.md`): change the email password, check the recovery codes are readable, remove stale devices and sessions, and consider replacing the hardware keys.

## 6. Incident response (suspected compromise, or a money-routing change you didn't make)

1. **Stop money first.** Log in to the bank directly and freeze outgoing payments if needed. In each payout platform, check the payout bank account.
2. **Secure email:** change the password from a clean device, sign out all sessions, remove unknown forwarding rules and app passwords, and re-check the recovery options.
3. **Secure Cloudflare:** check the DNS records, registrar lock and contacts against the last-known list (R keeps a DNS export in the monthly close).
4. **Revoke API keys** in `ops/SECRETS.md` for any affected platform, and create `ops/PAUSE` so the routines publish nothing.
5. **Verify out of band** any request to change where money goes. For fundraiser groups: a written confirmation from two different officers, sent from the email addresses already on file, before any changed ACH is used. Never act on a phone number or link given in the change request itself.
6. **Record** what happened, when, and what was changed in `ops/APPROVALS.md` (marked SECURITY). No passwords.
7. **Notify** as needed:
   - the bank and card issuer (fraud departments);
   - the affected platform's security team;
   - the accountant (for any money impact);
   - the attorney, if customer data may be exposed. Breach-notification laws may apply.

## 7. Devices and data
- Keep laptop and phone OS updates on automatic, with a screen lock and full-disk encryption (FileVault or BitLocker, or the phone's default).
- No customer data in the repository, in spreadsheets on personal drives, or in chat. Customer data stays inside the platforms that hold it.
- Remove access when a device is lost or replaced: sign it out of email, the password manager and the bank.
