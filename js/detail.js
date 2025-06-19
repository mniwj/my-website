// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 模拟项目数据
const projects = {
    '1': {
        title: 'Project One',
        description: 'A beautiful web application built with modern technologies.',
        image: 'assets/images/project1.jpg',
        technologies: ['React', 'Node.js', 'MongoDB'],
        content: `
            <h2>Project Overview</h2>
            <p>This project demonstrates the implementation of a modern web application using React and Node.js.</p>
            
            <h2>Key Features</h2>
            <ul>
                <li>Responsive design</li>
                <li>Real-time updates</li>
                <li>User authentication</li>
                <li>Data visualization</li>
            </ul>
            
            <h2>Technical Details</h2>
            <p>The application is built using the following technologies:</p>
            <ul>
                <li>Frontend: React, Redux, Tailwind CSS</li>
                <li>Backend: Node.js, Express</li>
                <li>Database: MongoDB</li>
                <li>Deployment: Docker, AWS</li>
            </ul>
        `
    }
    // 添加更多项目...
};

// 模拟博客数据
const blogPosts = {
    '1': {
        title: 'Getting Started with Web Development',
        date: 'Mar 15, 2024',
        readTime: '5 min read',
        image: 'assets/images/blog1.jpg',
        content: `
            <h2>Introduction</h2>
            <p>Web development is an exciting field that combines creativity with technical skills. In this post, we'll explore the fundamentals of web development and how to get started.</p>
            
            <h2>Essential Skills</h2>
            <p>To become a web developer, you need to master several key technologies:</p>
            <ul>
                <li>HTML for structure</li>
                <li>CSS for styling</li>
                <li>JavaScript for interactivity</li>
            </ul>
            
            <h2>Learning Path</h2>
            <p>Here's a recommended learning path for beginners:</p>
            <ol>
                <li>Start with HTML and CSS basics</li>
                <li>Learn JavaScript fundamentals</li>
                <li>Explore frontend frameworks</li>
                <li>Study backend development</li>
            </ol>
        `
    }
    // 添加更多博客文章...
};

// 加载项目详情
function loadProjectDetail() {
    const projectId = getUrlParameter('id');
    const project = projects[projectId];
    
    if (!project) {
        window.location.href = 'projects.html';
        return;
    }
    
    // 更新页面内容
    document.title = `${project.title} - Project Details`;
    document.querySelector('.project-title').textContent = project.title;
    document.querySelector('.project-description').textContent = project.description;
    document.querySelector('.project-content').innerHTML = project.content;
    
    // 更新图片
    const projectImage = document.querySelector('.project-image');
    projectImage.src = project.image;
    projectImage.alt = project.title;
    
    // 更新技术标签
    const techContainer = document.querySelector('.tech-tags');
    techContainer.innerHTML = project.technologies
        .map(tech => `<span class="tag tag-primary">${tech}</span>`)
        .join('');
}

// 加载博客详情
function loadBlogDetail() {
    const postId = getUrlParameter('id');
    const post = blogPosts[postId];
    
    if (!post) {
        window.location.href = 'blog.html';
        return;
    }
    
    // 更新页面内容
    document.title = `${post.title} - Blog Post`;
    document.querySelector('.post-title').textContent = post.title;
    document.querySelector('.post-meta').innerHTML = `
        <span class="post-date">
            <i class="far fa-calendar"></i>
            ${post.date}
        </span>
        <span class="post-read-time">
            <i class="far fa-clock"></i>
            ${post.readTime}
        </span>
    `;
    document.querySelector('.post-content').innerHTML = post.content;
    
    // 更新图片
    const postImage = document.querySelector('.post-image');
    postImage.src = post.image;
    postImage.alt = post.title;
}

// 根据页面类型加载相应的详情
document.addEventListener('DOMContentLoaded', function() {
    const isProjectPage = document.querySelector('.project-detail');
    const isBlogPage = document.querySelector('.blog-detail');
    
    if (isProjectPage) {
        loadProjectDetail();
    } else if (isBlogPage) {
        loadBlogDetail();
    }
}); 