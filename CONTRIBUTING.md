# 🤝 Contributing to WebMuseum

Thank you for your interest in contributing to **WebMuseum**!

WebMuseum is an open-source digital museum dedicated to exploring the history and evolution of the Internet.

Our goal is to create an engaging educational experience while building a welcoming community of developers, designers, students, and technology enthusiasts.

We appreciate contributions of all sizes — whether it's fixing a small bug, improving the design, adding educational content, or introducing a completely new idea.

**Every contribution matters.**

---

## 🌟 Ways to Contribute

There are many ways to help improve WebMuseum.

| Contribution | Description |
|---|---|
| 🐛 Bug Reports | Identify and report problems. |
| ✨ New Features | Suggest useful new functionality. |
| 🎨 UI/UX Improvements | Improve the visual experience. |
| 📱 Responsive Design | Improve mobile and tablet layouts. |
| 📚 Educational Content | Help expand Internet history content. |
| ⚡ Performance | Improve application performance. |
| 📖 Documentation | Improve guides and documentation. |

You don't need to be an expert developer to contribute!

## 🚀 Getting Started

Before making changes, set up the project locally.

### Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- A GitHub account
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 1. Fork the repository

Navigate to the WebMuseum GitHub repository and click the **Fork** button.

This creates your own copy of the project.

### 2. Clone your fork

Replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR-USERNAME/WebMuseum.git
```

### 3. Navigate into the project

```bash
cd WebMuseum
```

### 4. Install dependencies

```bash
npm install
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 6. Create a new branch

Always work on a separate branch instead of directly modifying `main`.

```bash
git checkout -b feat/your-feature-name
```

---

## 🌿 Branch Naming Convention

Use descriptive branch names so that contributions are easy to understand.

| Prefix | Purpose | Example |
|---|---|---|
| `feat/` | New features | `feat/new-timeline` |
| `fix/` | Bug fixes | `fix/mobile-layout` |
| `docs/` | Documentation | `docs/update-readme` |
| `style/` | Styling changes | `style/navigation-design` |
| `refactor/` | Code improvements | `refactor/components` |
| `perf/` | Performance improvements | `perf/image-loading` |

---

## 💻 Development Guidelines

To keep WebMuseum maintainable, please follow these guidelines:

1. Write clean, readable, and maintainable code.
2. Use meaningful variable and component names.
3. Follow the existing project structure and coding conventions.
4. Avoid unnecessary dependencies.
5. Make sure new features work across different screen sizes.
6. Avoid introducing unrelated changes.
7. Keep the user experience consistent with WebMuseum's visual identity.
8. Do not commit credentials, API keys, or private environment variables.

### Before submitting your changes

Run the production build:

```bash
npm run build
```

Make sure it completes successfully.

Also test your changes locally and check that existing functionality has not been broken.

---

## 📝 Commit Message Guidelines

Use clear and descriptive commit messages.

We recommend the Conventional Commits format:

```text
type: short description
```

Examples:

```bash
git commit -m "feat: add new historical timeline section"
```

```bash
git commit -m "fix: improve mobile navigation"
```

```bash
git commit -m "docs: update project documentation"
```

```bash
git commit -m "style: improve museum landing page"
```

Common types:

- `feat` — New functionality.
- `fix` — Bug fixes.
- `docs` — Documentation changes.
- `style` — Visual and formatting changes.
- `refactor` — Code restructuring.
- `perf` — Performance improvements.

---

## 🔀 Submitting a Pull Request

Once your changes are ready:

### 1. Stage your changes

```bash
git add .
```

### 2. Commit your changes

```bash
git commit -m "feat: describe your contribution"
```

### 3. Push your branch

```bash
git push origin your-branch-name
```

### 4. Open a Pull Request

Navigate to the original WebMuseum repository on GitHub.

Click **New Pull Request** and select your branch.

### 5. Describe your contribution

Your pull request should include:

- A clear title.
- What you changed.
- Why you made the changes.
- Screenshots for visual changes, where applicable.
- Any relevant issue references.

### Pull Request Checklist

Before submitting, make sure:

- [ ] My changes follow the project's coding conventions.
- [ ] I tested my changes locally.
- [ ] `npm run build` completes successfully.
- [ ] I haven't committed unnecessary files.
- [ ] I haven't included credentials or secrets.
- [ ] My pull request has a clear description.
- [ ] Screenshots are included for relevant visual changes.

Please be patient while maintainers review your contribution.

---

## 🐛 Reporting Bugs

Found something that isn't working correctly?

Please open a GitHub Issue and include:

- A clear description of the problem.
- Steps to reproduce it.
- Expected behavior.
- Actual behavior.
- Browser and device information, if relevant.
- Screenshots or screen recordings, if useful.

Please check existing issues before opening a duplicate report.

## 💡 Suggesting Features

Have an idea that could make WebMuseum better?

We would love to hear it!

When suggesting a feature, explain:

1. What you would like to introduce.
2. Why it would be useful.
3. How it could improve the museum experience.
4. Any examples or references that help explain your idea.

You can submit feature suggestions through GitHub Issues.

---

## 💬 Community Guidelines

We want WebMuseum to remain a friendly and welcoming open-source project.

Please:

- Be respectful to other contributors.
- Welcome beginners and new developers.
- Provide constructive feedback.
- Be patient during reviews.
- Respect different opinions and approaches.
- Keep discussions focused on improving the project.

Harassment, discrimination, and disrespectful behavior are not acceptable.

---

## ❤️ Acknowledgements

Thank you for taking the time to contribute to WebMuseum!

Whether you're submitting your first pull request or helping improve the project regularly, your efforts are appreciated.

Open source grows because people work together.

**Let's make exploring Internet history an even better experience.**

<br/>

<div align="center">

**WebMuseum — Explore the Evolution of the Internet.**

[🌐 Visit WebMuseum](https://webmuseum.vercel.app/)

Made with ❤️ for the open-source community.

</div>
