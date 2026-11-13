import type { APIRoute } from "astro";
import { articles } from "../data/content";

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  return new Response(
    `# CardPress

> CardPress is a mobile Java Card manager for iOS and Android. Connect a compatible programmable smart card directly to the phone over NFC.

CardPress helps users inspect cards, manage card applications and management keys, install bundled or imported CAP files, and verify operation results. Card compatibility depends on the actual card and applet requirements. Android is currently a development preview. Public download links are not available yet.

Compatible applets can enable passkeys, one-time passwords, secret storage and signing. Some require a separate companion client; CardPress is not itself a complete password manager or a website sign-in client. Developers can build their own applets with Java Card tools and import the CAP files into CardPress.

CardPress 是手机上的 Java Card 管理工具，通过 NFC 直接连接兼容卡片。可以安装现有应用，也可以导入自己开发的应用；实际功能取决于卡片、applet 和配套客户端。

The mobile app keeps its management data locally, without an account, analytics or cloud synchronization. This public website serves static HTML in English and Simplified Chinese; JavaScript is not required to read its content. The root URL selects a browser language, while explicit /en/ and /zh/ URLs keep their language.

## Product

- [English website](${url("/en/")}): Product overview, real app screenshots, NFC demonstration and applet examples.
- [中文网站](${url("/zh/")}): 产品介绍、真实截图、NFC 演示与应用场景。

## Learn

${articles.map((article) => `- [${article.en.title}](${url(`/en/learn/${article.slug}/`)}): ${article.en.description}`).join("\n")}

## Policies

- [Privacy policy](${url("/assets/privacy.html")}): Mobile app data, website request logs, language preference and contact information.
- [Terms of use](${url("/assets/terms_conditions.html")}): Authorized card use, irreversible operations, compatibility and third-party licenses.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
