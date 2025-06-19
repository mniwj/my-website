document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('bg-white/80');
            nav.classList.add('bg-white');
        } else {
            nav.classList.remove('bg-white');
            nav.classList.add('bg-white/80');
        }
        
        lastScroll = currentScroll;
    });

    // 移动端菜单
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 代码块复制功能
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors duration-200';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        
        // 创建容器
        const container = document.createElement('div');
        container.className = 'relative';
        block.parentNode.insertBefore(container, block);
        container.appendChild(block);
        container.appendChild(copyButton);
        
        // 添加复制功能
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                
                // 更新按钮图标
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.classList.add('text-green-500');
                
                // 2秒后恢复原图标
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="far fa-copy"></i>';
                    copyButton.classList.remove('text-green-500');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // 图片懒加载
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Lightbox 配置
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2'
    });

    // 代码块语法高亮
    Prism.highlightAll();

    // 内容块渐入动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有内容块
    document.querySelectorAll('h2, p, pre').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}); 