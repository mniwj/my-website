// Main JavaScript file 

// 导航栏滚动效果
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // 导航栏透明度控制
    if (window.scrollY > 100) {
        nav.classList.add('shadow-md');
        nav.classList.remove('bg-opacity-80');
        nav.classList.add('bg-opacity-95');
    } else {
        nav.classList.remove('shadow-md');
        nav.classList.add('bg-opacity-80');
        nav.classList.remove('bg-opacity-95');
    }

    // 导航栏显示/隐藏
    if (window.scrollY > lastScrollY) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// 移动端菜单控制
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        menuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // 如果移动端菜单是打开的，点击后关闭
            if (isMenuOpen) {
                mobileMenu.classList.add('hidden');
                menuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                isMenuOpen = false;
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 代码编辑器动画效果
const codeElement = document.querySelector('pre code');
if (codeElement) {
    const text = codeElement.textContent;
    codeElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            codeElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // 当代码编辑器进入视口时开始动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(codeElement);
}

// 图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}); 