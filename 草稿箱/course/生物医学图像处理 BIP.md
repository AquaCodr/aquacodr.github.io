## 绪论
![[../../docs/assets/Pasted image 20260917101944.png]]

![[../../docs/assets/Pasted image 20260917102007.png]]

成绩组成：
![[../../docs/assets/Pasted image 20260917102101.png|540]]

大作业早一点开始，比重增大
==这门课不点名==
课堂表现分：
![[../../docs/assets/Pasted image 20260917102349.png|512]]

![[../../docs/assets/Pasted image 20260917102625.png]]

![[../../docs/assets/Pasted image 20260917102648.png]]

要一点==线性代数==和概率论的基础：
![[../../docs/assets/Pasted image 20260917102947.png]]

![[../../docs/assets/Pasted image 20260917103111.png]]

![[../../docs/assets/Pasted image 20260917103206.png]]

注意声明AI等使用情况：
![[../../docs/assets/Pasted image 20260917104405.png]]

比特图？向量图？
向量图：公式描述，拉伸不影响细节，坏处是没办法显示很多细节
医学成像中都用比特图

![[../../docs/assets/Pasted image 20260917113250.png]]

医学图像和生物图像一般不压缩，害怕信息丢失

阅读作业：
![[../../docs/assets/Pasted image 20260917114731.png|355]]

## BIP基础

### 采样：
![[../../docs/assets/Pasted image 20260917120215.png]]

![[../../docs/assets/Pasted image 20260917120815.png]]

![[../../docs/assets/Pasted image 20260917120925.png]]

line plot——一种很基础的采样方法

quantization量化：
![[../../docs/assets/Pasted image 20260917122242.png]]

### 基本数学工具
加法求平均值（期望）：去噪
减法：看变化；但会放大噪声
乘法：掩膜（覆盖所有不关心的区域，关心取1，不关心取0）
除法：normalize(比如拉平阴影)

与或非操作：形态学操作

transform:==右边没看懂==
好吧，变换这儿都没看懂
![[../../docs/assets/Pasted image 20260924105507.png]]

![[../../docs/assets/Pasted image 20260924110017.png]]

![[../../docs/assets/Pasted image 20260924110327.png]]

![[../../docs/assets/Pasted image 20260924110509.png]]


插值interpolation:
![[../../docs/assets/Pasted image 20260924111430.png|396]]

corp or enlarge：超出边界时保留还是切割
![[../../docs/assets/Pasted image 20260924111507.png|296]]

### 图像增强（单点

![[../../docs/assets/Pasted image 20260924112619.png]]

![[../../docs/assets/Pasted image 20260924112637.png|310]]

![[../../docs/assets/Pasted image 20260924112738.png|319]]

梯函数，可以针对任意像素增强，非常依赖个人经验，缺乏稳定性：
![[../../docs/assets/Pasted image 20260924112928.png]]

![[../../docs/assets/Pasted image 20260924113509.png]]

## lec8

### 1. 为什么要做图像配准？
医学图像经常遇到这些问题：
- 同一病人不同时间拍的（今天 vs 一个月前）
- 病人动了
- 不同模态（CT + PET、MRI + fMRI）
- 要和别人或标准模板比

配准就是把这些图像在空间上对齐，让对应的解剖结构重合。

### 2. 配准的本质定义
**空间变换**，把源图像（Source/Moving）的点映射到目标图像（Target/Fixed）的对应点：

$$x' = f(x; p)$$

目标有两件事：
1. 定义变换函数 \(f\)
2. 优化参数 $p$

然后根据求出的参数对图像做重采样（Resampling）。

### 3. 配准的三大类方法
| 方法 | 核心思路 | 例子 |
|------|----------|------|
| **Point-based** | 用对应点（landmarks） | CT-PET 的标记点 |
| **Surface-based** | 用表面/网格 | 大脑皮层网格 |
| **Intensity-based** | 直接用灰度信息（最常用） | 用 MSE、互信息等 |

课件重点讲的是 **Intensity-based**。

### 4. 配准流水线（最重要的框架）
几乎所有配准算法都按这个流程跑：

1. **定义变换模型**（Transformation）  
   - Rigid（刚体）：平移 + 旋转（3D 有 6 个自由度）  
   - Affine（仿射）：再加缩放 + 剪切（3D 有 12 个自由度）  
   - 非线性：变形场（Deformation Field）

2. **定义相似度度量**（Similarity Metric / Cost Function）  
   告诉优化器“现在对齐得有多好”。

3. **优化器**（Optimizer）  
   不断调整变换参数，让相似度最高（或代价最低）。

4. **图像变形 + 重采样**（Warp + Resampling）  
   因为变换后像素坐标通常不是整数，必须插值（最近邻、双线性、双三次等）。

### 5. 相似度度量（重点中的重点）
课件把度量分成 **模态内（Intra-modality）** 和 **模态间（Inter-modality）**。

**模态内常用：**
- **SSD / MSE**（平方差）  
  假设两张图只差高斯噪声，适合同一模态、强度变化不大的情况（比如连续的 fMRI）。
- **RIU**（Ratio Image Uniformity）  
  适合有增益因子差异的情况（比如多幅 PET）。
- **Correlation Coefficient（相关系数）**  
  适合强度有线性变化的情况。

**模态间最重要：**
- **Mutual Information（互信息，MI）**  
  这是课件后半部分的核心。

互信息来自信息论：
$$
I(X;Y) = H(X) + H(Y) - H(X,Y)
$$
或
$$
I(X;Y) = \sum p(x,y) \log \frac{p(x,y)}{p(x)p(y)}
$$

实际计算靠 **联合直方图（Joint Histogram）**。配准越好，联合直方图越“紧凑”，互信息越大。

**总结表（课件最后一张）：**

| 度量 | 适用 | 鲁棒性 | 计算代价 | 典型场景 |
|------|------|--------|----------|----------|
| SSD/MSE | 模态内 | 低 | 低 | 同一模态、无强度变化 |
| RIU | 模态内（有缩放） | 中 | 中 | 多幅 PET |
| Correlation | 模态内 | 高 | 中 | 亮度/对比度变化 |
| Mutual Information | **模态间** | **很高** | 高 | CT-MRI、T1-T2 等 |

### 6. 其他关键概念
- **插值为什么必须做**：变换后像素位置不再是整数网格，有些目标像素没被覆盖，有些被多个源像素覆盖。
- **非线性配准**：用变形场（vector field）描述局部扭曲，自由度远高于仿射。
- **空间标准化（Spatial Normalization）**：把不同人的脑图都配准到一个标准模板上，方便群体分析。

## lec9

### 1. 整体框架回顾（和上次一样）
配准流水线还是：
**Moving Image → Optimizer → Transform Parameters → Warp + Resampling → Metric（Cost）**  
不断迭代直到对齐。

这次重点从 **线性** 转到 **非线性**，并补充了优化和评估细节。

### 2. 优化方法（Optimization）
目标是找到让 cost function 最优的参数。

**核心问题**：
- 没有闭式解，必须迭代优化
- 存在**局部最优**（local optima），容易卡住

**常用方法**：
- **Gradient Descent**（梯度下降）：\( p_{t+1} = p_t - \eta \nabla C \)
- 数值近似梯度（用小扰动 \(\Delta p\) 计算）
- **Conjugate Gradient**（共轭梯度）：减少锯齿路径
- **Powell**：不需要算梯度，沿不同方向做一维搜索

**实际技巧**：
- **Multi-resolution**（多分辨率）：先粗分辨率对齐，再细分辨率精修（避免局部最优 + 加速）
- **Initialization** 很重要（不同初始位置结果可能差很多）
- 有时要加 **intensity scaling** 参数

### 3. 非线性配准核心
线性只能做全局变换，无法处理局部解剖差异。非线性用 **变形场（Deformation Field）**：

$$
T(x) = x + u(x)
$$

其中 $u(x)$是每个点的位移向量。

主要方法：

| 方法                              | 核心思想                       | 特点                |
| ------------------------------- | -------------------------- | ----------------- |
| **Free-form Deformation (FFD)** | 用稀疏控制点网格 + B-spline 插值描述变形 | 参数化，平滑，需正则化防止过度变形 |
| **Demons**                      | 非参数，直接估计密集位移场              | 用图像力（类似光流）推动像素对齐  |
| **Diffeomorphic**               | 保证变换可逆、平滑、保拓扑              | 最先进，适合脑影像         |

#### Free-form Deformation (FFD)
- 不直接估计每个像素的位移（太多参数）
- 用**控制点网格**控制变形，其他点用 **B-spline** 插值
- 需要加 **regularization**（惩罚过大变形）

#### Demons 算法（重点理解）
灵感来自光学流（Optical Flow）：
1. 初始化位移场为 0
2. 用当前位移场扭曲 Moving 图像
3. 计算与 Fixed 的强度差 → 产生“力”
4. 用图像梯度方向更新位移
5. 高斯平滑位移场
6. 重复直到收敛

**公式直觉**：强度差驱动移动方向和幅度，梯度决定移动方向。

#### Diffeomorphic 变换（最重要概念）
数学上是**光滑、一对一、可逆**的映射，同时满足：
- **Invertible**：正向和反向都能映射
- **Smooth**：变换和它的逆都连续可微
- **Topology-preserving**：不撕裂、不折叠、不合并

常用实现：
- **Diffeomorphic Demons**：用指数映射 \(\phi = \exp(v)\) 保证可逆
- **LDDMM**：用时间变化的速度场驱动连续变形
- **SyN**（Symmetric Normalization）：同时从两边向中间对齐（更对称、更稳）

### 4. Jacobian 矩阵
衡量局部体积变化：
\[
J(p) = \det\left(\frac{\partial T}{\partial x}\right)
\]
- \(J > 1\)：局部膨胀
- \(J < 1\)：局部收缩
- \(J = 1\)：体积不变

用于 **Tensor-based Morphometry (TBM)**，分析结构变化。

### 5. 评估配准效果
- **有金标准时**：TRE（Target Registration Error）、Dice、Hausdorff Distance
- **无金标准时**：视觉检查（Overlay、Checkerboard）
- 用 landmarks 或手动分割结构验证

### 6. 常用工具箱（实际做实验会用）
| 工具 | 代表功能 |
|------|----------|
| **FSL** | FLIRT（线性）+ FNIRT（非线性） |
| **FreeSurfer** | 皮层表面配准 + 体积配准 |
| **ANTs** | 目前最强之一，支持 SyN、FFD 等 |
| **SPM** | DARTEL（群组模板构建） |

### 总结：这节课真正要抓住的点
1. **为什么要非线性**：线性不够，需要局部变形场。
2. **三大方法对比**：
   - FFD → 控制点 + 插值
   - Demons → 图像力驱动密集场
   - Diffeomorphic → 保证可逆+保拓扑（最推荐用于脑影像）
3. **优化难点**：局部最优 → 用 multi-resolution 解决。
4. **Jacobian** 用来看体积变化。
5. 实际工作用 ANTs / FSL / FreeSurfer。













