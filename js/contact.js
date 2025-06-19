document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    // 表单验证函数
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            const errorMessage = input.parentElement.querySelector('.error-message');
            
            // 重置错误状态
            input.classList.remove('border-red-500');
            errorMessage.classList.add('hidden');
            
            // 验证必填字段
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
                errorMessage.textContent = 'This field is required';
                errorMessage.classList.remove('hidden');
            }
            
            // 验证邮箱格式
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.classList.remove('hidden');
                }
            }
        });
        
        return isValid;
    }

    // 显示成功消息
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100';
        successMessage.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>Message sent successfully!</span>
            </div>
        `;
        document.body.appendChild(successMessage);
        
        // 3秒后移除消息
        setTimeout(() => {
            successMessage.style.transform = 'translateY(-100%)';
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    }

    // 显示错误消息
    function showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100';
        errorMessage.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(errorMessage);
        
        // 3秒后移除消息
        setTimeout(() => {
            errorMessage.style.transform = 'translateY(-100%)';
            errorMessage.style.opacity = '0';
            setTimeout(() => errorMessage.remove(), 300);
        }, 3000);
    }

    // 处理表单提交
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // 禁用提交按钮
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span>Sending...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;

        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 清空表单
            form.reset();
            
            // 显示成功消息
            showSuccessMessage();
        } catch (error) {
            showErrorMessage('Failed to send message. Please try again later.');
        } finally {
            // 恢复提交按钮
            submitButton.disabled = false;
            submitButton.innerHTML = `
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            `;
        }
    });

    // 实时验证输入
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('border-red-500');
                this.parentElement.querySelector('.error-message').classList.add('hidden');
            }
        });
    });

    // 添加输入框聚焦效果
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-primary-200');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-primary-200');
        });
    });
}); 