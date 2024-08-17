---
title: 建站小结
slug: blog_summary
date: 2024-05-24T00:45:00+08:00
cover:
  image: 01.avif
  alt: Github Pages
tags: 
  - 技术
  - Hugo
---
博客的初次搭建花费了我大约两周的闲暇时间，不得不说搭建一个个人博客既简单又复杂：简单在琳琅满目的成熟框架、让人眼花缭乱的主题和事无巨细的教程，让搭建博客这项工作变得低代码化、模块化，而不是我所认知的一人加一个代码编辑器；复杂在各种细小的配置、多如牛毛的个性化修改项，可以让我调整到天昏地暗。

当然博客最终的成品基于个人写作平台的定位，还是一切从简了。

## 关于Hugo
搭建博客的第一步自然是选择一个现成的网站框架，毕竟我作为低代码选手，凭借现有知识从头构建一个网站不太现实，也太过消耗时间和精力。

优秀的静态网站框架很多，在我短暂了解后得知的主流框架有以下这些：
- [Jekyll](https://jekyllrb.com/)
- [Hexo](https://hexo.io/)
- [Hugo](https://gohugo.io/)
- [docsify](https://docsify.js.org/#/)
- [Vuepress](https://vuepress.vuejs.org/zh/)

最终我选择了Hugo作为我的博客框架，它的优势正如文档所写
>Hugo is a static site generator written in Go, optimized for speed and designed for flexibility. 
>
>Hugo是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。

Hugo提供了各个平台的二进制文件，在安装上相当友好，甚至可以说没有安装过程，毕竟只要下载并解压缩就可以开始博客搭建之旅了，而其他的框架基本上都需要从配置依赖环境开始。在我的电脑上安装一个只完成单一工作的语言环境，这样的要求让我有些抗拒，也让我的硬盘有些抗拒。

![Hugo](02.avif "Hugo")

Hugo在教程的数量上也占据着优势，毕竟作为一个小有名气的框架，用户数量多，编写教程的群体也更加庞大。一些小众的网页框架可能有它们的过人之处，但是没有足够的教程支撑，仅凭一份晦涩的文档，很难吸引到没有经验的新手用户。

至于Hugo官方提到的“简单、易用、高效、易扩展、快速部署”，个人感觉反而不是很明显，毕竟我也没有使用过其他的静态网站生成器，无法构成对比。

## 关于PaperMod
主题是一种十分个性化的选择，Hugo官方罗列的大部分主题，我都觉得挺好看。

最终建站选择了[PaperMod](https://github.com/adityatelange/hugo-PaperMod)，是因为这个主题在各种教程中出现的几率很高，甚至有很多关于PaperMod这个主题的教程，这些教程给我的建站带来了很多便利，毕竟只需要全盘接受教程的教导，不需要进行额外的操作。

![PaperMod](03.avif "PaperMod")

抛开教程带来的便利性，PaperMod本身也是一款好看的主题，它干净简洁，旨在带来像纸张一样的写作和阅读感受，契合动画观后感的文章类型。
>A simple, clean, flexible Hugo theme.
>
>The goal of this project is to add more features and customization to [the og theme](https://github.com/nanxiaobei/hugo-paper).

事实上，PaperMod只是看上去简单，它的背后也有复杂的功能，可以供我随意设置，将PaperMod布置成我想要的样子，颇费一番功夫。

## 关于Fuse.js
[Fuse.js](https://www.fusejs.io/)是来自PaperMod的推荐，它也作为PaperMod默认的搜索库
>Powerful, lightweight fuzzy-search library, with zero dependencies.

使用Fuse.js是一个较为现实的选择，其他的商业搜索解决方案或多或少会有我不能接受的问题，例如广告、网络连通性问题或是必须使用数据库。

相比之下，Fuse.js设置简单，不需要任何账号和外部依赖，即可实现搜索功能，没有任何附加广告，也无需担心网络环境。我认为这是一种相对完美的解决方案。即使以后我可能会更换博客的主题和框架，Fuse.js作为搜索解决方案也会保留，直到拥有它所有优点的继任者出现。

## 关于giscus
评论区是我在建设博客时非常关心的功能，因为我想要让读者能随意的表达自己的观点，而不是仅仅在屏幕后阅读我的感想。

评论系统的解决方案也非常的多，不过我能够选择的方案只有依托Github，因为其他的方案会有同商业搜索解决方案的问题：
>例如广告、网络连通性问题或是必须使用数据库。

依托Github的评论系统大多分成两派：一派利用的是Github的Issues功能，而另外一派使用的是Github的Discussions功能。我选择了后者中的代表[giscus](https://github.com/giscus/giscus)，Issues更应该是Github系统中用来反馈问题的区域，利用Discussions作为评论区起码看上去更加规范。

giscus背靠Github，做到了免费和Markdown支持，是一款优秀的评论系统。美中不足的是需要评论者使用Github账号登录，当然这种要求无可厚非，因为本质上评论者就是在Github的Discussions中发言。

## 关于CC BY-NC-SA 4.0
既然是由我创作的文章，那么我理应享有一定的权利，当然我不希望将自己的文章束之高阁，所以在考察了知识共享许可协议之后，我选择使用[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans)，这个许可保障了我的署名和非商业性使用要求，让所有人都能够自由的使用我的文章，我想这对我的文章是百利而无一害的。

知识共享许可协议和开源许可证一样，都是自我约束性的条款，不具有法律效力。当遇到侵权行为时，我能做的只有在道德上谴责。尽管如此，我仍然要在博客上注明知识共享许可协议，起码这是对我自己的警醒和约束，让我规范自己的行为。

## 相关教程
感谢以下的教程，指导我完成博客的建设。在这里做一些记录，说不定以后还能再次用到，再次翻看也多有裨益。

发布于第三方知识平台（如知乎、简书等）的教程不再赘述，因为可以通过搜索引擎快速得到，收录的价值并不高。刊登在个人博客上的教程如同标本，需要我细心收集欣赏，它们有着更高的收藏价值。
### 官方文档
- [Home · adityatelange/hugo-PaperMod Wiki](https://github.com/adityatelange/hugo-PaperMod/wiki)
- [Homepage - Creative Commons](https://creativecommons.org/)
- [Hugo Documentation | Hugo](https://gohugo.io/documentation/)
- [Fuse.js | Fuse.js](https://www.fusejs.io/)
- [giscus](https://giscus.app/zh-CN)
### 个人博客文章
- [关于博客搭建 – Wenhui's Rotten Pen](https://www.wenhui.space/docs/04-build-blog-site/)
- [建站日志 - 合集 | Leehow的小站](https://www.haoyep.com/collections/%E5%BB%BA%E7%AB%99%E6%97%A5%E5%BF%97/)
- [Hugo | 🚀 田少晗的个人博客](https://www.shaohanyun.top/tags/hugo/)
- [博客搭建 | Sulv's Blog](https://www.sulvblog.cn/tags/%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA/)
- [Hugo | Cassius's Blog](https://www.yuweihung.com/tags/hugo/)
- [Blog | ZHENG Zi'ou](https://orianna-zzo.github.io/tags/blog/)
- [Hugo · 叶寻的博客](https://cyrusyip.org/zh-cn/tags/hugo/)
- [建站笔记 | loyayz](https://loyayz.com/website/)
- [Hugo | 图南博客](https://tunan.org/tags/hugo/)
- [hugo · Andbible](https://www.andbible.com/tags/hugo/)
- [技术 · 群青流星](https://www.karlukle.site/tags/%E6%8A%80%E6%9C%AF/)
- [Hugo](https://tricks.one/tags/hugo/)
- [Hugo+PaperMod 双语博客搭建 Home-Info+Profile Mode - YUNYI BLOG](https://www.yunyitang.me/hugo-papermod-blog/)
- [Hugo + GitHub Action，搭建你的博客自动发布系统 · Pseudoyu](https://www.pseudoyu.com/zh/2022/05/29/deploy_your_blog_using_hugo_and_github_action/)
- [How to Enable Giscus Comments System in Hugo | Jason Lyu](https://12x.me/posts/2023-04-18-hugo-giscus/)
- [利用 Favicon 为 Hugo 静态站点添加图标 - Bright's Blog](https://ibrights.github.io/post/blog20210527/)
- [Hugo + PaperMod搭建技术博客 | Kunyang's Blog](https://kyxie.github.io/zh/blog/tech/papermod/)
- [博客的发展简史和框架简介 | 槿呈Goidea](https://justgoidea.com/posts/2023-056/)
- [Hugo添加短代码 | 阿波尔的博客](https://www.zaqizaba.xyz/posts/hugo%E6%B7%BB%E5%8A%A0%E7%9F%AD%E4%BB%A3%E7%A0%81/)

## Hugo+PaperMod之后？
正如前文所述，Fuse.js、giscus和CC BY-NC-SA 4.0已经是目前于我而言最标准的解决方案，如无意外是不会被替代的。能够更换的组件自然就是博客框架Hugo和博客主题PaperMod。

Hugo框架下的博客主题很有可能在未来被我更换，毕竟在Hugo的设计下，更换主题是一件很简单的事情，更换主题也是一件激励我继续维护博客的积极的事。

至于博客框架，目前我最想尝试的是稍微小众的[Zola](https://www.getzola.org/)。
>A fast static site generator in a single binary with everything built-in.

Zola的其他特性暂且不论，它有着一个显著的特点——使用[Rust](https://www.rust-lang.org/)编写！
>Full 🦀 Rust 🔥 Which 🚀 Is Memory 🦀 Safe 🔥 Unlike 🚀 C++ 🦀 Which 🔥 Is 🚀 Not 🦀 Memory 🔥 Safe

事实上我不是Rust的使用者，甚至不是从事代码相关的人员，但是我很乐意尝试这门新兴编程语言的产品，去验证Rust所说的高性能和可靠性。Rust的这些特性对我这位愿意尝试新兴事物的科技爱好者具有巨大的吸引力。