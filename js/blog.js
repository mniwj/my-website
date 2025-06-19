document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const postsContainer = document.getElementById('posts-container');
    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearSearchBtn.classList.toggle('hidden', !this.value);
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterPosts();
        }, 300);
    });

    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        this.classList.add('hidden');
        filterPosts();
    });

    // 标签筛选
    const filterTags = document.querySelectorAll('.filter-tag');
    let activeCategory = 'all';

    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 更新活动标签
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前分类
            activeCategory = this.dataset.category;
            
            // 筛选文章
            filterPosts();
        });
    });

    // 文章筛选函数
    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('article');
        let visibleCount = 0;

        posts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const description = post.querySelector('p').textContent.toLowerCase();
            const category = post.dataset.category;
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            
            if (matchesSearch && matchesCategory) {
                post.style.display = '';
                visibleCount++;
            } else {
                post.style.display = 'none';
            }
        });

        // 显示无结果状态
        const noResults = document.getElementById('no-results');
        if (visibleCount === 0) {
            if (!noResults) {
                const message = document.createElement('div');
                message.id = 'no-results';
                message.className = 'text-center py-12';
                message.innerHTML = `
                    <i class="fas fa-search text-4xl text-secondary-400 mb-4"></i>
                    <p class="text-secondary-600">No articles found matching your criteria.</p>
                `;
                postsContainer.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // 分页功能
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    let currentPage = 1;

    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            if (this.classList.contains('active')) return;
            
            // 更新页码
            if (this.textContent.trim() === '') {
                // 处理箭头按钮
                if (this.querySelector('.fa-chevron-left')) {
                    currentPage = Math.max(1, currentPage - 1);
                } else {
                    currentPage = Math.min(12, currentPage + 1);
                }
            } else {
                currentPage = parseInt(this.textContent);
            }
            
            // 更新分页按钮状态
            updatePagination();
            
            // 加载对应页面的文章
            loadPosts(currentPage);
        });
    });

    function updatePagination() {
        paginationButtons.forEach(button => {
            button.classList.remove('active');
            button.disabled = false;
        });

        // 更新页码按钮
        const pageButtons = Array.from(paginationButtons).filter(btn => 
            !btn.querySelector('i')
        );
        
        pageButtons.forEach((button, index) => {
            const pageNum = index + 1;
            if (pageNum === currentPage) {
                button.classList.add('active');
            }
        });

        // 更新箭头按钮状态
        const prevButton = document.querySelector('.fa-chevron-left').parentElement;
        const nextButton = document.querySelector('.fa-chevron-right').parentElement;
        
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === 12;
    }

    // 文章加载函数
    function loadPosts(page) {
        // 这里可以添加加载动画
        postsContainer.classList.add('opacity-50');
        
        // 模拟API请求
        setTimeout(() => {
            // 更新文章列表
            // 实际项目中这里应该是从服务器获取数据
            postsContainer.classList.remove('opacity-50');
        }, 500);
    }

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

    // 初始化
    filterPosts();
    updatePagination();
}); 