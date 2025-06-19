// 项目筛选功能
document.addEventListener('DOMContentLoaded', () => {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentFilter = 'all';
    let visibleProjects = 6;

    // 筛选标签点击事件
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 更新选中状态
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // 获取筛选类别
            currentFilter = tag.dataset.filter;

            // 筛选项目
            filterProjects(currentFilter);
        });
    });

    // 筛选项目函数
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            // 添加淡出动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    }

    // 项目卡片悬停效果
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1.05)';
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1)';
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // 加载更多功能
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const hiddenProjects = Array.from(projectCards).filter(card => {
                const category = card.dataset.category;
                return (currentFilter === 'all' || category === currentFilter) && 
                       card.style.display === 'none';
            });

            // 显示下一批项目
            const nextBatch = hiddenProjects.slice(0, 3);
            nextBatch.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            });

            // 如果没有更多项目，隐藏按钮
            if (hiddenProjects.length <= 3) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // 图片懒加载
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