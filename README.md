# Mailto Link Generator

A small, static website that helps people generate correct `mailto:` links for websites, docs, and buttons.

It supports:
- Optional recipient (`to`)
- Subject
- Body
- CC
- BCC
- URL-safe encoding using `encodeURIComponent()`
- RFC 6068-style query parameters

No backend. No tracking. No data collection.

## Project structure

- `docs/index.html`
- `docs/styles.css`
- `docs/app.js`
- `LICENSE` (MIT)

## GitHub Pages setup (`/docs`)

1. Push this repository to GitHub.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
4. Save.
5. Wait for GitHub Pages to publish, then open the site URL shown in Pages settings.

## How to use

1. Choose a mode:
   - **Privacy mode (fake email)**
   - **Use my email**
2. Fill in the fields.
3. Optionally enable **Add signature placeholder**.
4. Copy the generated mailto URL or click **Open email client**.
5. Use the generated HTML snippet if you want to embed the link in a web page.

## Privacy mode

Privacy mode always uses a fake recipient (`example@example.com`) and shows a warning that the address must be replaced before sending.

This is useful when you want to share examples publicly without exposing a real email address.

## Limitations

- Mailto behavior depends on the user’s default email app/client.
- Some clients ignore or handle advanced fields differently.
- Long message bodies may be truncated by some clients.
- Email validation is intentionally simple (contains `@`, dot after `@`, and no spaces).
- `Reply-To` is intentionally not supported because it is not reliably handled across clients in `mailto:` links.

## Notes about encoding

- Query values are encoded with `encodeURIComponent()`.
- New lines in the body are preserved through URL encoding.
- The HTML snippet escapes `&` as `&amp;` inside `href`.


## Safety, responsibility, and “don’t do what you can’t do”

This project is meant to be **safe and silly**. Use it responsibly.

- Only use it on repositories you own or are authorized to operate on.
- Do not use it to harass, spam, track, or impersonate others.
- If you don’t understand what a workflow/app does, **don’t run it** on production repos.
- If you’re unsure, ask someone who knows GitHub Actions/security to review it first.

## Disclaimer (no warranty)

This repository is provided **“AS IS”**, without warranty of any kind.  
You assume all risks related to using, modifying, or deploying anything from this repo.  
See the `LICENSE` file for details.

## Attribution

If you use this project and want to credit it, a link is appreciated:

https://consulting-eberle.de


