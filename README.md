# 🎭 Playwright Projects Repository

This repository contains multiple Playwright projects developed as part of my learning journey and professional practice in **QA Automation**.

It showcases the evolution from **Playwright fundamentals** to a **scalable, enterprise-ready automation framework**, following real-world best practices.

---

## 📁 Repository Structure

```text
playwright-projects/
├── playwright-course/
├── playwright-enterprise-project/
├── Jenkinsfile
└── README.md
```

Each project includes its own Jenkinsfile and can be executed independently.

## 📘 Project 1: Playwright Course

### 📌 Description
This project contains exercises and examples created while completing a Playwright fundamentals course.
It focuses on understanding the core concepts required to start working with Playwright in a professional environment.

### 📚 Course followed:
👉 https://www.youtube.com/playlist?list=PLeo6Q1inqlOdzwuW6ivlX_95682PfsGGG

### 🧠 Topics covered
- Playwright setup
- Locators and selectors
- Assertions
- Handling waits
- Running tests in multiple browsers
- Basic test organization
- Playwright reports

This project represents the **learning and experimentation phase.**

### ▶️ How to run
```text
cd playwright-course
npm install
npx playwright test
```

## 🧪 Project 2: Playwright Enterprise Automation Framework

### 📌 Description
This is a **production-style automation framework**, designed using **enterprise-level best practices**.

The framework is:
- Scalable
- Maintainable
- Modular
- CI/CD ready

The application under test is **SauceDemo**, used as a demo e-commerce platform.

### 🧱 Architecture & Design
- Page Object Model (POM)
- Data-driven testing
- Custom fixtures
- Authentication via Playwright `storageState`
- Separation of E2E and API tests

### 🧪 Tech Stack
- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)
- Fixtures
- Storage State authentication
- Data-driven testing

### 📂 Project Structure
``` text
playwright-enterprise-project/
├── pageobjects/
├── test-data/
├── fixtures/
├── auth/
├── utils/
├── tests/
│   ├── e2e/
│   └── api/
└── playwright.config.js
```

### 🔐 Authentication Strategy
SauceDemo does not expose authentication APIs.

Authentication is handled by:
- Logging in via UI
- Saving the authenticated session using `storageState`
- Reusing the session across tests

This avoids repeated logins and improves execution speed.

### 🚀 How to run tests
``` text
cd playwright-enterprise-project
npm install
npx playwright test
```

### 📊 Reports
Playwright generates an HTML report after each execution.

To open it:

```
npx playwright show-report
```

### 🤖 CI/CD – Jenkins + Docker Setup
Both projects can be executed using **Jenkins with Docker**.
Each project includes its own `Jenkinsfile`.

## 🐳 Jenkins setup using Docker
### 1️⃣ Build Jenkins image
``` text
docker build --tag docker-in-docker-jenkins .
```

### 2️⃣ Run Jenkins container
``` text
docker run --rm \
  --group-add 0 \
  -v //var/run/docker.sock:/var/run/docker.sock \
  -p 8080:8080 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  docker-in-docker-jenkins
```

## 🔐 Initial Jenkins configuration
Open Jenkins:

``` text
http://localhost:8080/
```

Use the initial admin password

**Install:** 
- suggested plugins
- Additional required plugins:
  - Docker Pipeline
  - Docker
  - HTML Publisher

## ⚙️ Pipeline configuration
If the `Jenkinsfile` is inside a subfolder, configure the pipeline as follows:

``` text
Script Path:
playwright-enterprise-project/Jenkinsfile
```

(Adjust the path depending on the project you want to run.)

## 🎯 Purpose of this Repository
This repository demonstrates:
- My learning path with Playwright
- My ability to design automation frameworks from scratch
- Enterprise-level QA automation practices
- Readiness for professional **QA / SDET roles**

## 💡 Author
**Sayi Quirama**
QA Automation | Playwright | E2E Testing
