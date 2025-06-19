// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级处理：直接加载所有图片
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        });
    }
});

// 资源预加载
function preloadResources() {
    // 预加载关键图片
    const criticalImages = [
        '/assets/images/hero-bg.jpg',
        '/assets/images/profile.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // 预加载字体
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em Montserrat'),
            document.fonts.load('1em Inter')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
}

// 页面加载优化
window.addEventListener('load', function() {
    // 移除加载动画
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }

    // 添加页面过渡效果
    document.body.classList.add('page-loaded');
});

// 性能监控
if ('performance' in window) {
    // 监控页面加载性能
    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
    });

    // 监控资源加载性能
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 1000) { // 超过1秒的资源
                console.warn('Slow resource:', entry.name, entry.duration, 'ms');
            }
        }
    });

    observer.observe({ entryTypes: ['resource'] });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 优化滚动事件
const scrollHandler = throttle(() => {
    // 处理滚动相关的逻辑
    const scrollPosition = window.scrollY;
    const nav = document.querySelector('nav');
    
    if (scrollPosition > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', scrollHandler);

// 优化调整大小事件
const resizeHandler = debounce(() => {
    // 处理调整大小相关的逻辑
    const width = window.innerWidth;
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (width >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}, 250);

window.addEventListener('resize', resizeHandler);

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    preloadResources();
}); 