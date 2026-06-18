# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api-delete-note.spec.ts >> Login Tests - PassTheNote >> Valid Login should navigate to Dashboard
- Location: pages\LoginPage.ts:20:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://passthenote.app/login", waiting until "load"

```

```
Error: browserContext.close: Target page, context or browser has been closed
```