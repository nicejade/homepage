<p align="center">
  <a href="https://www.niceshare.site/" target="_blank">
    <img width="120"
    src="https://github.com/nicejade/homepage/blob/main/public/favicon.svg?raw=true">
  </a>
</p>

<h1 align="center">Homepage</h1>

<div align="center">
  <strong>
    Based on Astro, Starlight, Svelte, Markdown, MDX, TailwindCSS, TypeScript built personal homepage, Fast, accessible, and easy-to-use, Highly customizable .
  </strong>
</div>

<div align="center">
  <a href="https://nodejs.org/en/" target="_blank">
    <img src="https://img.shields.io/badge/node-%3E%3D%2016.0.0-green.svg" alt="Node Version">
  </a>
  <a href="https://github.com/nicejade/homepage">
    <img src="https://img.shields.io/github/license/nicejade/homepage" alt="LICENSE">
  </a>
  <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://aboutme.lovejade.cn/?utm_source=github.com">
    <img src="https://img.shields.io/badge/Author-nicejade-%23a696c8.svg" alt="Author nicejade">
  </a>
</div>

### English | [中文](https://www.niceshare.site/about)

## 🧱 Project Structure

```bash
.
├── public/
├── src/
│   ├── assets/
│   ├── configs
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

Your link configuration is in the `src/configs` directory, which is your main focus, especially if you have no additional requirements for the page style.

## 🏹 How to use ?

```bash
# clone project
git clone https://github.com/nicejade/homepage.git
cd homepage

# install dependencies
pnpm i

pnpm start
```

Then you only need to modify the configuration according to your own needs; The main documents involved: `astro.config.mjs`、`src/configs`、`src/content/docs/*.mdx`.

## 🚀 How to Deploy?

[Homepage](https://github.com/nicejade/homepage) is a project built entirely as a static website, without the need for complex backend logic or database operations. You can choose different deployment methods based on your personal preferences, such as using static website hosting services like GitHub Pages, Cloudflare, Netlify, CDN and cloud storage services, Docker containers, or virtual hosts/shared hosts. I recommend using GitHub Pages and Cloudflare as they offer free services, have a simple deployment process, and support HTTPS.

## Customization

Since this project is built on [Starlight](https://starlight.astro.build/), [Homepage](https://github.com/nicejade/homepage) is highly customizable, with support for custom themes, custom CSS & JS (Choose your favorite js && CSS framework), custom layouts, formatting, localization and more. See [Starlight docs](https://starlight.astro.build/zh-cn/getting-started/) for more information.

## Special Thanks

During the development of this project, we relied on and benefited from the following excellent open-source technologies and tools (not exhaustive). They not only provided powerful functionalities but also facilitated efficient development and stable operation of the project.

- [Astro](https://astro.build/): As a static site generator, Astro allows developers to build websites using various popular front-end frameworks and markup languages. It also optimizes the loading speed and performance of websites through its islands architecture.
- [Starlight](https://starlight.astro.build/zh-cn/getting-started/): As a documentation theme based on Astro, Starlight offers a suite of out-of-the-box features designed specifically for documentation websites, including clear navigation, theme color configuration, and internationalization support.
- [Svelte](https://svelte.dev/): An innovative front-end framework that compiles templates into efficient JavaScript code during the build process, thereby reducing the runtime size and improving performance.
- [Markdown](https://www.markdownguide.org/): A concise markup language that allows developers to write content in a readable and writable text format, which is then converted into HTML.
- [MDX](https://mdxjs.com/): lets you use JSX in your markdown content. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components a blast.
- [TailwindCSS](https://tailwindcss.com/): A CSS framework that provides a large number of utility classes, enabling developers to quickly build responsive and customized UI designs.
- [TypeScript](https://www.typescriptlang.org/): A a superset of JavaScript that introduces a static type system, helping developers improve the quality and development efficiency of the code when building large applications.

## License

[Homepage](https://github.com/nicejade/homepage) is released under the [MIT License](http://opensource.org/licenses/MIT).

Copyright (c) 2024-present，[清风明月轩](https://www.thebettersites.com/) .