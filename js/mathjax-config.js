// docs/js/mathjax-config.js 完整配置（新增 \[ \] 支持）
window.MathJax = {
  tex: {
    // 行内公式：保留 [] 和 $
    inlineMath: [
      ['[', ']'],    
      ['$', '$']     
    ],
    // 块级公式：新增 \[ \]，保留 [[]] 和 $$
    displayMath: [
      ['\\[', '\\]'],  // 新增：支持 LaTeX 标准的 \[ \] 块级公式
      ['[[', ']]'],    
      ['$$', '$$']     
    ],
    autoload: {
      color: [],
      colorV2: ['color']
    },
    packages: {'[+]': ['noerrors']}
  },
  svg: {
    fontCache: 'global'
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  }
};