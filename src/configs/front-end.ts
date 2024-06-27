export default {
  title: '前端开发',
  style: 'stagger',
  list: [
    {
      title: 'Svelte | 通过控制论增强的 Web 应用程序',
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
      title: 'TailwindCSS | 实用优先的 CSS 框架',
      link: 'https://tailwindcss.com/',
      desc: 'Tailwind CSS 是一个功能强大的实用优先的 CSS 框架。它不提供预定义的组件，而是提供了一系列低级实用工具类，开发者可以通过这些类快速构建自定义的设计。其主要特点包括原子化设计、即时预览和深度可定制性。开发者无需离开 HTML，即可快速调整样式，显著提升开发效率。此外，Tailwind CSS 支持配置文件，允许全局定制设计系统。其优化的生产构建流程能够移除未使用的 CSS，确保最终代码包的最小化，适合构建性能优异的现代 Web 应用。'
    },
    {
      title: 'Vite | 下一代前端工具',
      link: 'https://vitejs.dev/',
      desc: 'Vite 是一个现代化的前端构建工具，由 Vue.js 的作者尤雨溪开发。Vite 的设计目标是提供极快的开发体验和构建速度。它通过原生 ES 模块（ESM）在浏览器中加载模块，实现了即时的热模块替换（HMR），使得开发者能够快速查看代码改动。Vite 采用 Rollup 进行生产环境打包，确保了构建效率和优化效果。其内置了 TypeScript、JSX、CSS 等多种文件类型的支持，同时也支持 Vue、React 等框架的插件生态。Vite 的配置简单灵活，非常适合现代前端开发。'
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
      title: 'Node.js | 在任何地方运行 JavaScript',
      link: 'https://nodejs.org/',
      desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，用于构建高性能的服务器端应用。它采用事件驱动、非阻塞 I/O 模型，使其在处理并发连接时表现出色，适合构建实时应用，如聊天、流媒体等。Node.js 拥有强大的包管理器 npm，提供丰富的第三方模块，简化了开发流程。其单线程架构通过事件循环机制实现高效资源利用。Node.js 兼容多种操作系统，并支持现代 JavaScript 语法，广泛应用于 Web 开发、API 服务和微服务架构。'
    },
    {
      title: 'Deno | 下一代 JavaScript 运行时',
      link: 'https://deno.com/',
      desc: 'Deno 是现代 JavaScript 和 TypeScript 运行时。其设计目标是解决 Node.js 的一些痛点，诸如包管理、安全性和模块系统。Deno 内置 TypeScript 支持，无需额外配置，采用 ES 模块（ESM）代替 CommonJS 模块。Deno 具有默认安全性，要求显式权限授予，防止未经授权的文件、网络和环境访问。其包管理采用 URL 导入，无需集中式注册表。Deno 提供了现代化的标准库和简洁的命令行工具，适合构建高效、安全的服务器端应用。'
    },
  ]
}