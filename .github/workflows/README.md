# 🚀 PassTheNote Automation Framework  
### End‑to‑End UI + API Automation using Playwright, TypeScript, POM, Allure & GitHub Actions CI/CD

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Allure](https://img.shields.io/badge/Allure-Reporting-purple)
![CI](https://img.shields.io/badge/GitHub-Actions-blue)

---

## 📌 Project Overview

This repository contains a complete automation framework for testing the  
**PassTheNote** application using:

- Playwright (UI + API testing)
- TypeScript
- Page Object Model (POM)
- Allure Reports with History
- GitHub Actions CI/CD
- E2E + API + CRUD test suites

The framework is designed to be scalable, maintainable, and enterprise‑ready.

---

## 🏗️ Tech Stack

| Layer | Technology |
|------|------------|
| UI Automation | Playwright (Chromium, Firefox, WebKit) |
| API Automation | Playwright API Testing |
| Language | TypeScript |
| Architecture | Page Object Model (POM) |
| Reporting | Allure Reports + History |
| CI/CD | GitHub Actions |
| Test Runner | Playwright Test |

---

## 📂 Folder Structure




pass-the-note-automation/
│
├── pages/                     # Page Object Model classes
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── NotesPage.ts
│
├── tests/
│   ├── auth/                  # Login tests
│   │   └── login.spec.ts
│   ├── notes/                 # CRUD tests
│   │   ├── create-note.spec.ts
│   │   ├── edit-note.spec.ts
│   │   └── delete-note.spec.ts
│   ├── api/                   # API + UI hybrid tests
│   │   └── api-delete-note.spec.ts
│   └── e2e/                   # Full workflow tests
│       └── notes-e2e.spec.ts
│
├── playwright.config.ts       # Global Playwright configuration


---

## Run all tests
bash
npx playwright test
Run a specific test file
bash
npx playwright test tests/notes/edit-note.spec.ts
Run tests in headed mode
bash
npx playwright test --headed

Allure Reporting
Generate Allure Report
bash
allure generate allure-results --clean -o allure-report
Open Allure Report
bash
allure open allure-report
I Workflow File
Code
.github/workflows/playwright.yml
Live Allure Report (after first CI run)
Code
https://<your-username>.github.io/<your-repo-name>/





👤 Author
Nakshatra Lohani  
Test Analyst & QA Specialist
15+ years of experience in QA, Automation & Training
Contribute / Fork / Star
If you find this framework useful, feel free to:

⭐ Star the repo

🍴 Fork it

🛠️ Submit improvements