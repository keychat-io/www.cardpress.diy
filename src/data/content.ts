export const languages = ["zh", "en"] as const;
export type Language = (typeof languages)[number];
export const copy = {
  zh: {
    nav: ["使用场景", "App 界面", "Learn", "下载"],
    skip: "跳到正文",
    tagline: "随身一张卡，开启更多可能",
    hero: "让一张卡，成为你的数字钥匙",
    intro:
      "用 CardPress 连接兼容的 Java Card。让安全登录、二步验证与秘密存储，成为触手可及的日常。",
    ios: "iOS 下载状态",
    android: "Android 开发预览",
    explore: "看看它能做什么",
    demo: "17e 演示",
    demoNote: "iPhone 17e 实录 · 英文界面",
    playVideo: "播放短片",
    pauseVideo: "暂停短片",
    openDemo: "观看完整演示",
    mediaDisclosure: "无声实录，等待过程已剪短；剪辑时长不代表实际操作耗时。",
    transcript: "演示内容",
    mediaTranscript:
      "浏览卡片与 Applet，确认安装 Passkey，通过 NFC 安装并核验 Installed 结果，然后查看卡片能力和选择卡片外观。这是应用安装与管理演示，并非网站登录演示。",
    interfaceLanguage: "iPhone 17e 真实截图 · 英文界面 · 2026-11-13",
    photo: "AI 处理的卡片外观示例，不代表已核实型号或兼容性。",
    photoAlt: "白色智能卡与金色接触芯片的外观示例，经过 AI 处理",
    scenesTitle: "小小一张卡，装下日常的安心。",
    scenesIntro: "从你想做的事开始，为卡片选择合适的应用。",
    scenarios: [
      {
        title: "Passkey 安全登录",
        benefit: "登录时，把你的卡变成随身的安全钥匙。",
        visual: "Passkey",
        detail:
          "需要兼容的 FIDO2 Applet，以及支持外置安全密钥的网站、系统和浏览器；安装后还需自检与 PIN 配置。",
        symbol: "↗",
      },
      {
        title: "二步验证",
        benefit: "为重要账户，多加一道由你掌握的验证。",
        visual: "••• •••",
        detail:
          "兼容的 OATH / OTP Applet 配合 CardPress 的相关工具使用；账户服务也需支持相应验证方式。",
        symbol: "✳",
      },
      {
        title: "密码与秘密存储",
        benefit: "为重要秘密，准备一个可以握在手里的地方。",
        visual: "••••••••",
        detail:
          "例如 SeedKeeper：需要配套 Applet 与客户端初始化和管理内容；目录收录与支持安装不代表 CardPress 内置完整密码库。",
        symbol: "◇",
      },
    ],
    screensTitle: "你的卡片，一目了然。",
    screensIntro: "从了解一张卡，到发现新的可能，管理过程清楚、有序。",
    screens: ["卡片管理首页", "卡片详情页", "Applet 列表"],
    screenCaptions: [
      "你的卡片，一目了然",
      "看看这张卡能为你做什么",
      "为你的卡片发现更多可能",
    ],
    pending: "真实界面素材待补充",
    preview: "开发预览占位 · 非 App 截图",
    galleryHint: "可横向滑动，或使用下方分页；点击截图放大查看。",
    close: "关闭",
    zoom: "查看",
    startTitle: "从一张卡开始。",
    steps: [
      [
        "准备兼容卡片",
        "选择支持 NFC、可以自行管理的 Java Card，并向供应商确认管理密钥和配置。",
      ],
      [
        "下载 CardPress",
        "先查看适用系统与当前发布状态，准备一部支持 NFC 的手机。",
      ],
      [
        "配置需要的应用",
        "按兼容性选择 Applet，完成安装及所需初始化，再用于你的日常场景。",
      ],
    ],
    learnTitle: "了解一点，就能走得更远。",
    learnIntro: "不用先成为智能卡专家。三条路径，按你的好奇心出发。",
    downloadTitle: "下一把数字钥匙，在你手里。",
    downloadIntro: "先确认设备与卡片，再开始使用。",
    iosStatus: "iOS · 公开下载链接待确认",
    iosBody:
      "iOS 18 或更新版本，支持 NFC 的 iPhone。此预览站尚未配置已核实的 App Store 或 TestFlight 链接。",
    androidStatus: "Android · 开发预览",
    androidBody:
      "最低 Android 8.0，需 NFC / IsoDep。Pixel 8 已完成基础读卡至保存卡片验证；认证清单与写卡仍待指定硬件验收，暂无已核实公开下载渠道。",
    faqTitle: "开始之前，你可能想知道",
    faq: [
      [
        "需要哪种卡？",
        "需要支持 NFC 的兼容 Java Card 开发卡，并拥有管理权限及正确密钥。普通门禁卡、银行卡或身份证不能当作可自行管理的开发卡。",
      ],
      [
        "需要额外读卡器吗？",
        "支持的手机和兼容 NFC 卡可直接通信，无需额外读卡器。只有接触式接口的卡不能用手机 NFC 读取。",
      ],
      [
        "卡片需要充电吗？",
        "兼容的无源 NFC 卡在靠近手机时从射频场获取能量，不需要电池。通信时请保持卡片位置稳定。",
      ],
      [
        "安装 Applet 后就能直接用吗？",
        "不一定。部分 Applet 需要设置 PIN、初始化，或使用配套客户端。被目录收录不等于所有手机、卡片和操作都已验证。",
      ],
      [
        "卡片丢了怎么办？",
        "恢复能力取决于 Applet 和服务。开始前设置账户备用登录方式，并按应用说明保管备份；卸载 Applet 可能永久删除其中的数据。",
      ],
    ],
    footer: "一张卡，更多可能。",
    sources: "来源与延伸阅读",
    back: "返回 Learn",
    read: "开始了解",
    home: "首页",
    rights: "CardPress。第三方名称与资料归各自权利人所有。",
    learn: "Learn · 从这里开始",
  },
  en: {
    nav: ["Use cases", "The app", "Learn", "Download"],
    skip: "Skip to content",
    tagline: "One card. Everyday possibilities.",
    hero: "Turn a card into your digital key.",
    intro:
      "Connect a compatible Java Card with CardPress. Bring secure sign-in, two-step verification and secret storage into everyday reach.",
    ios: "iOS availability",
    android: "Android preview",
    explore: "Explore the possibilities",
    demo: "17e demo",
    demoNote: "Recorded on iPhone 17e · English interface",
    playVideo: "Play short clip",
    pauseVideo: "Pause short clip",
    openDemo: "Watch the full demo",
    mediaDisclosure:
      "Silent recording; waiting time shortened. Edited duration is not an operation-speed claim.",
    transcript: "What the demo shows",
    mediaTranscript:
      "Browse cards and applets, confirm Passkey installation, install over NFC and verify the Installed result, then inspect card capabilities and choose a card style. This demonstrates app installation and management, not website sign-in.",
    interfaceLanguage:
      "Real iPhone 17e screenshots · English interface · 2026-11-13",
    photo:
      "AI-processed appearance example; not verified model identification or compatibility evidence.",
    photoAlt:
      "AI-processed appearance example of a white smart card with gold contacts",
    scenesTitle: "A little card. A little more peace of mind.",
    scenesIntro:
      "Start with what you want to do. Choose the right applet for your card.",
    scenarios: [
      {
        title: "Sign in with a passkey",
        benefit: "Make your card a security key you can carry.",
        visual: "Passkey",
        detail:
          "Requires a compatible FIDO2 applet and a website, OS and browser that support external security keys. Complete the separate self-check and PIN setup after installation.",
        symbol: "↗",
      },
      {
        title: "Two-step verification",
        benefit: "Add another verification step to important accounts.",
        visual: "••• •••",
        detail:
          "Use a compatible OATH / OTP applet with the relevant CardPress tools. The account service must support the corresponding verification method.",
        symbol: "✳",
      },
      {
        title: "Passwords & secrets",
        benefit: "Give important secrets a place you can hold.",
        visual: "••••••••",
        detail:
          "For example, SeedKeeper requires its applet and a companion client for initialization and content management. Catalog inclusion and installation support do not mean a complete built-in CardPress password vault.",
        symbol: "◇",
      },
    ],
    screensTitle: "Your cards. Clearly organized.",
    screensIntro:
      "From understanding a card to finding new possibilities, keep management clear and considered.",
    screens: ["Card collection", "Card details", "Applet library"],
    screenCaptions: [
      "Your cards at a glance",
      "See what this card can do",
      "Discover more possibilities for your card",
    ],
    pending: "Approved app capture needed",
    preview: "Development placeholder · not an app screenshot",
    galleryHint:
      "Swipe horizontally or use the page controls. Select a screenshot to enlarge it.",
    close: "Close",
    zoom: "View",
    startTitle: "Start with one card.",
    steps: [
      [
        "Choose a compatible card",
        "Get an NFC-capable Java Card you can administer. Confirm management keys and configuration with its supplier.",
      ],
      [
        "Get CardPress",
        "Check system requirements and current availability. Have an NFC-capable phone ready.",
      ],
      [
        "Set up your apps",
        "Choose a compatible applet, install it and complete its initialization before using it day to day.",
      ],
    ],
    learnTitle: "A little knowledge goes a long way.",
    learnIntro:
      "No smart-card expertise required. Follow your curiosity along three short paths.",
    downloadTitle: "Your next digital key starts here.",
    downloadIntro: "Check your phone and card before getting started.",
    iosStatus: "iOS · Public link pending verification",
    iosBody:
      "iOS 18 or later on an NFC-capable iPhone. This preview site has no verified App Store or TestFlight link configured.",
    androidStatus: "Android · Development preview",
    androidBody:
      "Android 8.0 minimum, with NFC / IsoDep. A Pixel 8 basic card read reached Save Card; authenticated inventory and writes still need designated hardware acceptance. No verified public download channel is available here.",
    faqTitle: "Before you begin",
    faq: [
      [
        "What kind of card do I need?",
        "A compatible NFC Java Card development card, with management access and the correct keys. Ordinary access badges, payment cards and identity cards are not freely manageable development cards.",
      ],
      [
        "Do I need a separate reader?",
        "Supported phones communicate directly with compatible NFC cards. No separate reader is needed for that connection. Contact-only cards cannot be read through phone NFC.",
      ],
      [
        "Does the card need charging?",
        "A compatible passive NFC card draws power from the phone’s radio field when held nearby. No battery is needed. Keep the card steady during communication.",
      ],
      [
        "Is an installed applet ready to use?",
        "Not necessarily. An applet may need a PIN, initialization or a companion client. Catalog inclusion does not establish compatibility with every phone, card or operation.",
      ],
      [
        "What if I lose the card?",
        "Recovery depends on the applet and service. Set up a backup sign-in method and follow the app’s backup guidance before relying on it. Uninstalling an applet may permanently delete its data.",
      ],
    ],
    footer: "One card. More possibilities.",
    sources: "Sources & further reading",
    back: "Back to Learn",
    read: "Explore",
    home: "Home",
    rights:
      "CardPress. Third-party names and materials belong to their respective owners.",
    learn: "Learn · Start here",
  },
};
export const articles = [
  {
    slug: "java-card",
    zh: {
      title: "认识 Java Card",
      description: "一张卡、一个小程序，以及手机如何把它们连接起来。",
      sections: [
        [
          "卡片里的小程序",
          "Java Card 是一种运行在智能卡等安全芯片上的应用平台。卡片中可以有多个 Applet，每个 Applet 提供具体功能，例如身份验证或秘密存储。具体能力取决于芯片、系统、配置和应用。",
        ],
        [
          "手机与卡片，怎样合作？",
          "手机与 CardPress ⇄ NFC ⇄ 卡片中的 Applet。手机提供 NFC 连接；CardPress 发起支持的管理或使用操作；卡片运行 Applet，按它的规则处理请求。",
        ],
        [
          "不用充电的小伙伴",
          "无源 NFC 卡从手机产生的射频场获取工作能量。靠近才能通信，移开后连接结束；卡片不需要电池。稳定贴合有助于完成操作。",
        ],
        [
          "每个角色，各司其职",
          "Java Card 提供应用运行环境，GlobalPlatform 定义卡片应用管理的相关机制。它们不是 CardPress 的合作或认证声明，也不意味着任何卡都能安装任何应用。",
        ],
      ],
    },
    en: {
      title: "Meet Java Card",
      description:
        "A card, a tiny application, and the phone that connects them.",
      sections: [
        [
          "Small apps inside a card",
          "Java Card is an application platform for smart cards and other secure chips. A card can host multiple applets, each providing a specific function such as authentication or secret storage. Capabilities depend on the chip, system, configuration and applet.",
        ],
        [
          "How your phone connects",
          "Phone and CardPress ⇄ NFC ⇄ applet inside the card. The phone supplies the NFC connection. CardPress requests supported management or usage operations. The card runs the applet and handles requests according to its rules.",
        ],
        [
          "No battery to charge",
          "A passive NFC card gets operating power from the phone’s radio field. It communicates while nearby and disconnects when removed, without a battery. Holding it steady helps an operation complete.",
        ],
        [
          "Different roles, working together",
          "Java Card provides the application runtime. GlobalPlatform defines mechanisms for card application management. These references imply no CardPress partnership or certification, and do not mean every app runs on every card.",
        ],
      ],
    },
    sources: [
      ["Oracle · Java Card", "https://www.oracle.com/java/java-card/"],
      [
        "GlobalPlatform · Card Specification",
        "https://globalplatform.org/specs-library/card-specification/",
      ],
      ["Apple · Core NFC", "https://developer.apple.com/documentation/corenfc"],
    ],
  },
  {
    slug: "getting-started",
    zh: {
      title: "选卡与开始使用",
      description: "选对卡片，准备好手机，再配置你需要的应用。",
      sections: [
        [
          "先确认管理权限",
          "向供应商确认是支持 NFC 的 Java Card 开发卡，并确认正确管理密钥、配置和所需 Applet 的兼容性。J3R180 和 J3R452 是可进一步了解的型号示例，不是所有供应商配置的兼容性承诺。",
        ],
        [
          "读卡与管理不同",
          "基本读卡不等于已经获得管理权限。安装、卸载与密钥管理需要适当权限。不要尝试管理不属于你或未获授权的发行卡。",
        ],
        [
          "从一个场景开始",
          "想用 Passkey，先确认服务支持外置安全密钥，再核对 FIDO2 Applet 的条件。想存密码或秘密，先阅读配套客户端和备份要求。安装与初始化是不同步骤。",
        ],
        [
          "留好恢复的余地",
          "先为账户设置备用登录方式，妥善保管密钥和必要备份。卸载可能删除数据；如果写入中断且结果不确定，先查看操作记录及恢复指引，不要盲目重复。",
        ],
      ],
    },
    en: {
      title: "Choose a card & get started",
      description:
        "Find the right card, prepare your phone, then configure the apps you need.",
      sections: [
        [
          "Confirm management access first",
          "Ask the supplier for an NFC-capable Java Card development card, correct management keys and configuration, and compatibility with your intended applet. J3R180 and J3R452 are models to explore, not a promise that every supplier configuration is compatible.",
        ],
        [
          "Reading is not management",
          "A basic read does not grant management access. Installation, removal and key management need appropriate authorization. Do not manage issuer-owned cards without permission.",
        ],
        [
          "Begin with one use case",
          "For passkeys, confirm the service supports external security keys, then check the FIDO2 applet requirements. For passwords and secrets, read the companion client and backup requirements first. Installation and initialization are separate steps.",
        ],
        [
          "Keep a recovery route",
          "Set up alternative account sign-in and keep keys and required backups safely. Removal can delete data. If a write is interrupted and its result is uncertain, consult operation history and recovery guidance before retrying.",
        ],
      ],
    },
    sources: [
      [
        "Java Card Explorer · Cards",
        "https://java-card-explorer.vercel.app/cards",
      ],
      [
        "FIDO Alliance · Specifications",
        "https://fidoalliance.org/specifications/",
      ],
      [
        "GlobalPlatform · Card Specification",
        "https://globalplatform.org/specs-library/card-specification/",
      ],
    ],
  },
  {
    slug: "explore",
    zh: {
      title: "进一步探索",
      description: "从简明课程到开源 Applet，找到下一步的方向。",
      sections: [
        [
          "想系统认识这个世界？",
          "Java Card Explorer 提供课程、术语与卡片资料。它是独立的外部学习资源，打开后将离开本站。",
        ],
        [
          "发现 Applet 与配套工具",
          "Explorer 的 Applet 目录和 CROCS 的开源清单可以帮助发现项目。请分别核实项目维护状态、许可、支持卡片与客户端要求，目录收录不是 CardPress 的支持承诺。",
        ],
        [
          "理解兼容性的边界",
          "JCAlgTest 的数据可用于了解被测试卡片的算法能力，但单项算法支持不等于应用可安装，也不代表特定供应商配置或手机的实际表现。",
        ],
        [
          "区分三件事",
          "被市场或目录收录、可由 CardPress 安装、可在 CardPress 内直接操作，是三种不同能力。以具体 Applet 的说明和经过验证的设备条件为准。",
        ],
      ],
    },
    en: {
      title: "Explore further",
      description:
        "From short lessons to open-source applets, find your next direction.",
      sections: [
        [
          "Want a broader introduction?",
          "Java Card Explorer offers lessons, terminology and card information. It is an independent external learning resource; its links take you outside this site.",
        ],
        [
          "Discover applets and companion tools",
          "Explorer’s applet directory and the CROCS open-source list help you find projects. Check maintenance, licensing, card compatibility and client requirements separately. Listing is not a CardPress support commitment.",
        ],
        [
          "Understand compatibility limits",
          "JCAlgTest data helps describe algorithm capabilities of tested cards. Algorithm support alone does not prove applet installation, a particular supplier configuration or real phone behavior.",
        ],
        [
          "Keep three capabilities separate",
          "Being listed in a catalog, being installable with CardPress and being directly usable inside CardPress are different capabilities. Follow the specific applet guidance and verified device conditions.",
        ],
      ],
    },
    sources: [
      [
        "Java Card Explorer · Learn",
        "https://java-card-explorer.vercel.app/learn",
      ],
      [
        "Java Card Explorer · Applets",
        "https://java-card-explorer.vercel.app/applets",
      ],
      [
        "JCAlgTest · Algorithm support",
        "https://www.fi.muni.cz/~xsvenda/jcalgtest/table.html",
      ],
      [
        "CROCS · Java Card curated list",
        "https://github.com/crocs-muni/javacard-curated-list",
      ],
    ],
  },
];
