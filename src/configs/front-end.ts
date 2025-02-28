export default {
  title: '前端开发',
  style: 'stagger',
  list: [
    {
      title: 'Svelte | 通过控制论增强的 Web 应用程序',
      stars: 5,
      link: 'https://svelte.dev/',
      desc: 'Svelte 是一个现代 JavaScript 框架，用于构建高效的用户界面。与传统框架不同，Svelte 在构建时而非运行时进行工作，将组件编译为高效的原生 JavaScript 代码。其特点包括无需虚拟 DOM、响应式设计和简洁的语法。开发者在编写 Svelte 组件时，可以使用类似 HTML 的语法和内联的 CSS，提升开发效率和代码可读性。Svelte 通过减少框架的运行时开销，实现了更快的加载速度和更高的性能，非常适合构建高性能的现代 Web 应用。'
    },
    {
      title: 'Astro | 内容驱动网站的网络框架',
      link: 'https://astro.build/',
      desc: 'Astro 是一个用于构建快速静态网站的现代 JavaScript 框架。它的独特之处在于默认生成静态 HTML，每个页面仅加载必要的 JavaScript，减少了不必要的客户端脚本，提升了性能。Astro 支持多种前端框架（如 React、Vue、Svelte 等），允许开发者在同一个项目中混合使用不同框架的组件。其组件化架构和零 JavaScript 默认输出，使其特别适合内容驱动的网站和博客。Astro 的目标是通过优化构建和运行时性能，提供卓越的用户体验和开发者体验。'
    },
    {
      title: 'React | 适用于 Web 和 Native UI 库',
      link: 'https://react.dev/',
      desc: 'React 是由 Facebook 开发的一个用于构建用户界面的开源 JavaScript 库。它主要用于构建单页应用（SPA），通过组件化的方式提高开发效率和代码复用性。React 使用虚拟 DOM 来提升性能，通过局部更新减少实际 DOM 操作。其核心概念包括组件、状态和属性，使得开发者可以构建复杂且可维护的 UI。React 拥有强大的生态系统和社区支持，结合 Redux、React Router 等库，可以实现复杂的前端应用。其声明式编程风格使得代码更具可读性和可维护性。'
    },
    {
      title: 'Vue | 渐进式 JavaScript 框架',
      link: 'https://cn.vuejs.org/',
      desc: 'Vue 是由尤雨溪开发的渐进式 JavaScript 框架，用于构建用户界面和单页应用（SPA）。其核心特点是采用声明式渲染和组件化开发，简化了复杂应用的构建。Vue 的响应式数据绑定系统和指令使得数据与视图保持同步。通过模板语法和计算属性，开发者可以直观地描述 UI 逻辑。Vue 还提供了 Vue Router 和 Vuex（Pinia），用于路由管理和状态管理，构建复杂应用时尤为方便。其学习曲线平缓，文档详尽，适合从小型项目到大型应用的各种场景。'
    },
    {
      title: '小程序 | 即点即用轻量级应用',
      link: 'https://mp.weixin.qq.com/cgi-bin/wx',
      desc: '小程序是一种无需下载安装即可使用的轻量级应用，由微信、支付宝等平台推出。用户通过扫一扫或搜索即可打开小程序，提供类似原生应用的体验。小程序具有体积小、加载快、开发成本低等优点，适用于轻量级服务和即时应用场景。开发者使用简化的框架进行开发，支持常用的前端技术，如 HTML、CSS、JavaScript。小程序还提供丰富的 API 接口，支持支付、地图、文件上传等功能。其广泛应用于电商、社交、工具和服务等领域，极大地丰富了用户的移动互联网体验。'
    },
    {
      title: '快应用 | 即点即用轻量级应用',
      link: 'https://www.quickapp.cn/',
      desc: '快应用是由多家手机厂商（如华为、小米、OPPO、vivo 等）联合推出的轻量级应用形态。无需安装，即点即用，提供类似原生应用的性能和体验。快应用基于统一的标准和技术栈，使用 JavaScript、CSS 和 HTML 进行开发，支持丰富的原生接口。它具有加载速度快、占用存储少、开发成本低等优点。快应用主要用于解决用户对轻量级、高频次使用场景的需求，如新闻、购物、支付、出行等。其开放的生态系统和广泛的厂商支持，使其成为移动互联网应用的重要组成部分。'
    },
    {
      title: 'Electron | 构建跨平台桌面应用',
      stars: 5,
      link: 'https://www.electronjs.org/',
      desc: 'Electron 是一个开源框架，由 GitHub 开发，允许使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用。它结合了 Chromium 和 Node.js，提供了丰富的 API，使开发者能创建高性能的桌面应用程序。Electron 支持自动更新、系统托盘集成、本地文件访问等功能，常用于开发如 Visual Studio Code、Slack 和 Discord 等应用。其跨平台特性和强大的社区支持使其成为桌面应用开发的热门选择。'
    },
    {
      title: 'Puppeteer | Chrome 的 Node.js API',
      link: 'https://pptr.dev/',
      desc: 'Puppeteer 是一个由 Google 开发的 Node.js 库，提供了一个高级 API 来控制无头版的 Chrome 或 Chromium，或者全版浏览器。它主要用于自动化测试、网页抓取、生成截图和 PDF、爬虫、自动化表单提交等任务。Puppeteer 通过 DevTools 协议直接与浏览器通信，使用户能够精确地模拟和控制浏览器行为，进行高效的端到端测试。其强大的功能和灵活性使其在开发和测试中广受欢迎。'
    },
    {
      title: 'MDX | 组件时代的 Markdown',
      link: 'https://mdxjs.com/',
      desc: 'MDX 是一种创新的文档格式，允许在 Markdown 中无缝嵌入 JSX。它结合了 Markdown 的简洁性和 JSX 的灵活性，使得在长篇内容中使用交互式组件变得简单高效。MDX 支持导入和嵌入各种组件，如图表或警告框，极大地增强了文档的交互性和丰富度。它与 React、Svelte 和 Vue 等框架兼容，并可与 Webpack 和 Rollup 等打包工具集成。这种格式特别适合需要在文档中嵌入复杂交互元素的项目，如技术文档、教程或交互式博客。'
    },
    {
      title: 'TailwindCSS | 实用优先的 CSS 框架',
      stars: 5,
      link: 'https://tailwindcss.com/',
      desc: 'Tailwind CSS 是一个功能强大的实用优先的 CSS 框架。它不提供预定义的组件，而是提供了一系列低级实用工具类，开发者可以通过这些类快速构建自定义的设计。其主要特点包括原子化设计、即时预览和深度可定制性。开发者无需离开 HTML，即可快速调整样式，显著提升开发效率。此外，Tailwind CSS 支持配置文件，允许全局定制设计系统。其优化的生产构建流程能够移除未使用的 CSS，确保最终代码包的最小化，适合构建性能优异的现代 Web 应用。'
    },
    {
      title: 'Sass | 增强的 CSS 预处理器',
      link: 'https://sass-lang.com/',
      desc: 'Sass（Syntactically Awesome Style Sheets）是一个增强的 CSS 预处理器，提供了变量、嵌套规则、混合宏和函数等高级功能，使 CSS 开发更加高效和可维护。Sass 通过简化和结构化样式代码，帮助开发者编写模块化和可重用的 CSS。它有两种语法：缩进语法（Sass）和 SCSS 语法，后者与传统 CSS 兼容。Sass 还支持条件语句和循环，极大地增强了样式表的灵活性和动态性。同类型工具还有：Less、Stylus 以及 PostCss，其中 Sass 最为流行。'
    },
    {
      title: 'Vite | 下一代前端工具',
      stars: 5,
      link: 'https://vitejs.dev/',
      desc: 'Vite 是一个现代化的前端构建工具，由 Vue.js 的作者尤雨溪开发。Vite 的设计目标是提供极快的开发体验和构建速度。它通过原生 ES 模块（ESM）在浏览器中加载模块，实现了即时的热模块替换（HMR），使得开发者能够快速查看代码改动。Vite 采用 Rollup 进行生产环境打包，确保了构建效率和优化效果。其内置了 TypeScript、JSX、CSS 等多种文件类型的支持，同时也支持 Vue、React 等框架的插件生态。Vite 的配置简单灵活，非常适合现代前端开发。'
    },
    {
      title: 'Rollup | JavaScript 模块打包器',
      link: 'https://rollupjs.org/',
      desc: 'Rollup 是一个 JavaScript 模块打包工具，专注于生成更小、更高效的代码。它支持 ES6 模块，并通过静态分析代码依赖关系来实现树摇优化，从而删除未使用的代码。Rollup 的插件系统强大且灵活，支持各种代码转换和优化，如 Babel 转换、代码压缩等。它生成的包可以以多种格式输出（如 CommonJS、ES模块和 UMD），适用于构建现代前端库和应用程序，如 React、Vue 和 Angular 的核心库。'
    },
    {
      title: 'Yarn | JavaScript 包管理工具',
      link: 'https://yarnpkg.com/',
      desc: 'Yarn 是由 Facebook 开发的 JavaScript 包管理工具，旨在改进 npm 的依赖管理。它提供高效、可靠的依赖安装，通过并行下载加快速度，使用离线缓存保证一致性。Yarn 支持确定性依赖树，确保不同环境中的依赖版本一致。它还具有增强的安全性和更好的错误处理能力，帮助开发团队在大型项目中更高效地协作。Yarn 的命令与 npm 类似，易于上手，是前端开发中常用的工具。'
    },
    {
      title: 'Pnpm | 高效的 JavaScript 包管理工具',
      link: 'https://pnpm.io/',
      desc: 'Pnpm 是一种高效的 JavaScript 包管理工具，专注于节省磁盘空间和加快安装速度。与其他包管理器不同，pnpm 通过硬链接和符号链接实现去重，确保每个版本的包只在硬盘上存储一次，从而大幅减少磁盘使用量。pnpm 的独特架构使其能在大项目中快速、可靠地安装依赖，避免常见的依赖冲突问题。pnpm 兼容 npm 和 Yarn 的大部分命令，易于迁移和使用。'
    },
    {
      title: 'Lerna | 快速、现代的构建系统',
      link: 'https://lerna.js.org/',
      desc: 'Lerna 是一个快速、现代的构建系统，用于从同一存储库管理和发布多个 JavaScript/TypeScript 包。它提供高效的任务运行、包发布和依赖管理功能，支持并行执行命令、高级缓存和分布式执行，显著提高构建效率。Lerna 配置简单，与 npm 脚本兼容，广泛应用于大型项目。通过统一的工具集，Lerna 简化了多包仓库的开发、测试和部署流程，提高团队生产力。'
    },
  ]
}