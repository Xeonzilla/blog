---
title: Hugo中的AVIF与累积布局偏移（CLS）
slug: hugo_avif_cls
date: 2024-07-29T14:24:00+08:00
cover:
  image: 01.avif
tags: 
  - 技术
  - Hugo
draft: true
---
## CLS的伪解决方案
### 何谓CLS
Google的PageSpeed Insights报告中展示了四大维度的指标：`FCP`、`LCP`、`TBT`、`CLS`。其中，CLS是指Cumulative Layout Shift，即累积布局偏移。
>Cumulative Layout Shift (CLS) 是一项稳定的 Core Web Vitals 指标。它是一项以用户为中心的重要指标，用于衡量视觉稳定性，因为它有助于量化用户遇到意外布局偏移的频率，而较低的 CLS 有助于确保网页带来愉悦的体验。
> 
>意外的布局偏移可能会在很多方面影响用户体验，例如，如果文本突然移动，导致用户在阅读时失去位置，或让用户点击错误的链接或按钮。在某些情况下，这可能会造成严重损害。
>
>![累积布局偏移](02.avif "累积布局偏移")
>
>当以异步方式加载资源，或将 DOM 元素动态添加到网页中的现有内容之前时，通常会发生网页内容意外移动。导致布局偏移的原因可能包括尺寸未知的图片或视频、呈现的字体大于或小于其初始后备尺寸，或者是会自行动态调整大小的第三方广告或微件。

简单来说，CLS是网站设计时应该避免的问题。在Hugo中，一般需要利用[利用响应式图片（Responsive images）](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)、[页面束（Page bundles）](https://gohugo.io/content-management/page-bundles/)、[图像渲染挂钩（Image render hooks）](https://gohugo.io/render-hooks/images/)和[图像处理（Image processing）](https://gohugo.io/content-management/image-processing/)等工具或处理方法。

在我的“伪解决方案”中，主要借助了HTML和CSS的特性，不依赖于Hugo的图像处理。

### 方案展示
#### render-image.html
首先需要在Hugo站点目录`layouts/_default/_markup`路径下，创建名为`render-image.html`的文件，它负责Hugo对图像的渲染。

我所使用的`render-image.html`代码如下：
```html
<div style="display: flex; justify-content: center; align-items: center; max-width: 720px; aspect-ratio: 16/9; background-color: rgba(0, 0, 0, 0); position: relative;">
    <img loading="lazy" src="{{ .Destination | safeURL }}" alt="{{ .Text }}" {{ with .Title}} title="{{ . }}" {{end}} />
</div>
```
其中，`max-width: 720px; aspect-ratio: 16/9;`是根据我所使用的主题文章内图片大小而设定的值：我所使用的PaperMod主题在文章内图片尺寸为720px*405px。

#### cover.html
接下来以PaperMod为例，因为Hugo各个主题之间的结构可能略有不同，修改前应当自行调整。在`themes/PaperMod/layouts/partials`下复制一份`cover.html`，粘贴到`layouts/partials`下，并对其修改：
```html

```