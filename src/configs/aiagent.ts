export default {
  title: '智能代理',
  style: 'stagger',
  list: [
    {
      title: 'MCP | 模型上下文协议',
      link: 'https://modelcontextprotocol.io/',
      stars: 5,
      desc: 'MCP（Model Context Protocol，MCP）是一个开放协议，旨在标准化应用程序向大型语言模型（LLM）提供上下文信息的方式。类似于 USB-C 为设备提供标准化连接，MCP 为 AI 应用程序与不同数据源和工具之间的连接提供了统一标准。通过 MCP，开发者可以利用现有的预构建集成，灵活切换 LLM 提供商，并遵循最佳实践确保数据在自身基础设施内的安全。这使得在 LLM 之上构建代理和复杂工作流更加高效。'
    },
    {
      title: 'AGENTS.md | 用于指导编码代理的简单、开放的格式',
      link: 'https://agents.md/',
      stars: 5,
      desc: 'AGENTS.md 是由 OpenAI 等组织发起的一个开源、通用 Markdown 格式，用来为 AI 编程“智能体”（coding agents）提供项目专属指南。简单来说，如果把 README.md 当成人类开发者的入门文档，那 AGENTS.md 就是“给 AI 的 README”。其主要作用包括：告诉 AI 如何安装依赖、运行测试、遵守代码风格、执行 lint、构建与部署流程、提交流程、安全约定等，无须人为重复说明即可安心执行任务。'
    },
    {
      title: 'MCP Servers | 最大的 MCP Servers 集合',
      link: 'https://mcp.so/',
      stars: 5,
      desc: 'MCP Servers 是基于模型上下文协议（Model Context Protocol）的系统，旨在为 AI 客户端提供上下文、工具和提示。 这些服务器可以公开数据源，如文档、数据库和 API 集成，允许 AI 助手以安全的方式访问实时信息。MCP 服务器通过标准化协议与客户端建立简单的客户端-服务器架构连接，确保安全的 1:1 通信。 它们可以共享资源、公开工具以及提供提示，同时保持清晰的系统边界以确保安全性。'
    },
    {
      title: 'Awesome MCP Servers | MCP Servers 集合',
      link: 'https://mcpservers.org/',
      desc: 'MCP Servers 是基于模型上下文协议（Model Context Protocol，MCP）的服务器集合，旨在扩展大型语言模型（LLM）的功能，使其能够安全地与本地和远程资源进行交互。 这些服务器通过标准化协议，向 LLM 提供工具和数据访问能力，增强其处理复杂任务的能力。通过 MCP Servers，开发者可以构建更强大的 AI 应用，实现与各种数据源和工具的无缝集成，满足多样化的业务需求。'
    },
    {
      title: 'Cline | MCP 应用商店',
      link: 'https://cline.bot/mcp-marketplace',
      stars: 3,
      desc: 'MCP Marketplace 是 Cline 推出的应用商店，旨在简化 MCP 服务器的发现、安装和管理过程。通过该平台，用户可以轻松浏览并一键安装各种 MCP 服务器，扩展 Cline 的功能。对于 MCP 服务器开发者，Cline 提供了一个标准化的提交流程。开发者可以将自己的 MCP 服务器提交到 MCP Marketplace，经过审核后，数以千计的开发者可以通过 Marketplace 发现并一键安装这些服务器。'
    },
    {
      title: 'LangChain | 可推理的应用程序',
      link: 'https://www.langchain.com/',
      stars: 5,
      desc: 'LangChain 是一个旨在将大型语言模型（LLM）集成到应用程序中的软件框架。它为开发者提供了构建具备推理能力的上下文感知应用的工具，能够利用公司的数据和 API，确保应用的灵活性和可扩展性。其主要产品包括：LangChain、LangGraph、LangSmith，支持多种编程语言，包括 Python 和 JavaScript，适用于文档分析、摘要生成、聊天机器人和代码分析等多种应用场景。'
    },
    {
      title: 'AutoGPT | 构建、部署和运行 AI 代理',
      link: 'https://agpt.co/',
      stars: 5,
      desc: 'AutoGPT 是一个开源项目，基于 GPT-4 构建，旨在让 AI 代理自主执行任务，无需用户持续输入。它能够设定目标并自动生成、调整任务，调用外部 API 进行互联网搜索、数据分析、代码编写等操作。AutoGPT 适用于自动化工作流、内容生成和商业决策等领域。通过强化记忆和自主决策，它比传统聊天 AI 具备更强的自主性。项目在 Github 开源，获得 173K+ Star。'
    },
    {
      title: 'CrewAI | 领先多代理平台',
      link: 'https://www.crewai.com/',
      desc: 'CrewAI 是一个全新开发的轻量级、高速 Python 框架，专注于协调扮演不同角色的自主 AI 代理。它完全独立于其他代理框架，如 LangChain，提供高层次的简洁性和精确的底层控制，适合创建适用于各种场景的自主 AI 代理。CrewAI 通过促进协作智能，使多个代理能够无缝协作，解决复杂任务。开发者可以使用 CrewAI 构建和部署 AI 代理，以提升业务流程和决策制定。'
    },
    {
      title: 'MetaGPT | 多代理框架',
      link: 'https://www.deepwisdom.ai/',
      desc: 'MetaGPT 是一个多代理框架，旨在模拟软件公司的运作，将 LLM 分配为不同角色，如产品经理、架构师、项目经理和工程师等。用户只需提供一句话的需求，MetaGPT 即可生成用户故事、竞争分析、需求文档、数据结构、API 设计等。 其核心理念是将标准操作程序（SOP）应用于由 LLM 组成的团队，以实现自然语言编程。其长期目标是实现自我进化，包括自我训练、微调、优化和更新。'
    },
    {
      title: 'Mem0 | 人工智能代理的 Memory',
      link: 'https://mem0.ai/',
      desc: 'Mem0（发音为“mem-zero”）是一个为 AI 助手和代理提供智能记忆层的开源项目，旨在增强个性化的 AI 交互体验。 通过记住用户偏好并适应个体需求，Mem0 可应用于客户支持聊天机器人、AI 助手和自主系统等领域。 此外，Mem0 提供了 Chrome 扩展程序，使 ChatGPT、Claude 和 Perplexity 等 AI 助手共享上下文，提升交互的个性化和效率。 '
    },
    {
      title: 'Dify | GenAI 应用的创新引擎',
      link: 'https://dify.ai/',
      desc: 'Dify 是一个开源的大语言模型（LLM）应用开发平台，融合了后端即服务（Backend as Service）和 LLMOps 的理念，旨在帮助开发者和非技术人员快速构建生产级的生成式 AI 应用。平台提供了丰富的应用模板和编排框架，使用户能够基于大型语言模型快速构建生成式 AI 应用，将创意转化为现实。Dify 提供了可视化的提示词编排和数据集嵌入功能，零代码即可快速构建对话机器人或 AI 助手。 '
    },
    {
      title: 'Agno | 用于构建多模式代理的轻量级库',
      link: 'https://docs.agno.com/',
      desc: 'Agno 是一个轻量级的开源库，旨在构建具备记忆、知识和工具的多模态 AI 代理。 它支持处理文本、图像、音频和视频等多种数据类型，允许根据需要为代理添加记忆和知识库。Agno 设计简洁、速度快，且与模型无关，适用于各种应用场景。开发者可以利用 Agno 构建具有不同角色和个性的 AI 代理，提升用户体验。此外，Agno 提供了丰富的示例和文档，帮助用户快速上手。'
    },
    {
      title: 'PraisonAI | 可用于生产的多 AI 代理框架',
      link: 'https://docs.praison.ai/',
      desc: 'PraisonAI 是一个生产就绪的多 AI 代理框架，旨在创建 AI 代理来自动化和解决从简单任务到复杂挑战的问题。 它提供了低代码解决方案，简化了多代理大型语言模型（LLM）系统的构建和管理，强调简洁性、定制化和高效的人机协作。PraisonAI 结合了 PraisonAI Agents、AutoGen 和 CrewAI，具备自我反思能力，提升了代理的自主性和适应性。该框架支持多模态数据处理，适用于各种应用场景。'
    },
  ]
}