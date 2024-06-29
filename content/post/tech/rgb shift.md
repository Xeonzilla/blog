---
title: 动画中的Chroma Shift和RGB Shift
slug: chroma_shift_and_rgb_shift_in_anime
date: 2024-05-26T22:27:00+08:00
cover:
  image: 
tags: 
  - 动画
  - 二次元
series: 
  - 动画科学
draft: yes
---
## 色相的偏移
这里直接引用[VCB-Studio 科普教程 6](https://vcb-s.com/archives/4738)的介绍
>色度偏移（chroma shift）  
>色度偏移，指的是色度平面相对亮度平面的错位，通常在极红/蓝/绿/紫处（这四个地方分别是U/V极大值或者极小值），线条多了一些重影（下图自制）：
> ![Chroma Shift](http://img.2222.moe/images/2016/01/03/chromashift.png "Chroma Shift")
>上图是故意将UV左移两个像素。实际蓝光中鲜有这么大尺度的偏移，最多偏移一个像素，效果非常不明显；一般人很难观察到。  
>Chroma shift一般发生在数字图像处理中，不正确处理Chroma placement(Chroma相对Luma的位移)，造成的后果。修复手段通常叫做fix chroma shift。

## Shift之间亦有不同