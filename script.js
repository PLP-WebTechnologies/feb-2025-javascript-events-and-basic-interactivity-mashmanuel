document.addEventListener('DOMContentLoaded', function() {
    // Event Handling Section
    const clickButton = document.getElementById('click-button');
    const clickCounter = document.getElementById('click-counter');
    const funFact = document.getElementById('fun-fact');
    let clickCount = 0;
    
    const funFacts = [
        "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
        "Octopuses have three hearts and blue blood.",
        "A group of flamingos is called a 'flamboyance'.",
        "Bananas are berries, but strawberries aren't.",
        "The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes."
    ];
    
    clickButton.addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = `Clicked ${clickCount} times`;
        funFact.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
    });
    
    const keypressDisplay = document.getElementById('keypress-display');
    const konamiMessage = document.getElementById('konami-message');
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        keypressDisplay.textContent = `Last key pressed: ${e.key}`;
        
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiMessage.classList.remove('hidden');
                createConfetti();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    const header = document.querySelector('header');
    const secretSection = document.querySelector('#event-handling .card:last-child');
    const secretMessage = document.getElementById('secret-message');
    let pressTimer;
    
    header.addEventListener('dblclick', function() {
        secretMessage.classList.remove('hidden');
        setTimeout(() => secretMessage.classList.add('hidden'), 3000);
    });
    
    secretSection.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            document.body.classList.toggle('dark-mode');
        }, 3000);
    });
    
    secretSection.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretSection.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#4285f4', '#34a853', '#ea4335', '#fbbc05', '#673ab7'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChanger.style.backgroundColor = colors[colorIndex];
        colorChanger.textContent = `Color: ${getColorName(colors[colorIndex])}`;
    });
    
    function getColorName(hex) {
        const colorMap = {
            '#4285f4': 'Blue',
            '#34a853': 'Green',
            '#ea4335': 'Red',
            '#fbbc05': 'Yellow',
            '#673ab7': 'Purple'
        };
        return colorMap[hex] || hex;
    }
    
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const newSrc = this.src.replace(/auto=compress&cs=tinysrgb&w=\d+&h=\d+&fit=crop/g, '') + '?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
            mainImage.src = newSrc;
            
            thumbnails.forEach(t => {
                t.style.borderColor = 'transparent';
                t.style.transform = 'scale(1)';
                t.style.filter = 'grayscale(30%)';
            });
            this.style.borderColor = colors[colorIndex];
            this.style.transform = 'scale(1.15)';
            this.style.filter = 'grayscale(0%)';
            
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
    
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.accordion-content');
            const isActive = content.classList.contains('active');
            
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    const form = document.getElementById('registration-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    const passwordRules = document.querySelectorAll('.password-rules li');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    username.addEventListener('input', validateUsername);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateUsername() && validateEmail() && validatePassword()) {
            createConfetti();
            alert('Registration successful!');
            form.reset();
            document.querySelectorAll('.validation-icon').forEach(icon => icon.style.display = 'none');
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('valid'));
            strengthMeter.style.width = '0';
            strengthText.textContent = 'Password Strength';
            passwordRules.forEach(rule => rule.classList.remove('valid'));
        }
    });
    
    function validateUsername() {
        const isValid = username.value.trim() !== '';
        updateValidation(username, isValid, 'Username is required');
        return isValid;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email.value);
        updateValidation(email, isValid, 'Please enter a valid email');
        return isValid;
    }
    
    function validatePassword() {
        const value = password.value;
        const hasLength = value.length >= 8;
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        updateRule('length', hasLength);
        updateRule('number', hasNumber);
        updateRule('special', hasSpecial);
        
        let strength = 0;
        if (hasLength) strength++;
        if (hasNumber) strength++;
        if (hasSpecial) strength++;
        
        const width = (strength / 3) * 100;
        strengthMeter.style.width = `${width}%`;
        
        let color, text;
        switch(strength) {
            case 1:
                color = '#ea4335';
                text = 'Weak';
                break;
            case 2:
                color = '#fbbc05';
                text = 'Medium';
                break;
            case 3:
                color = '#34a853';
                text = 'Strong';
                break;
            default:
                color = '#ddd';
                text = 'Password Strength';
        }
        
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
        
        const isValid = hasLength && hasNumber && hasSpecial;
        updateValidation(password, isValid, 'Password does not meet requirements');
        return isValid;
    }
    
    function updateValidation(input, isValid, errorMessage) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (isValid) {
            formGroup.classList.remove('invalid');
            formGroup.classList.add('valid');
            errorElement.style.display = 'none';
        } else {
            formGroup.classList.remove('valid');
            formGroup.classList.add('invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
    
    function updateRule(rule, isValid) {
        passwordRules.forEach(item => {
            if (item.dataset.rule === rule) {
                item.classList.toggle('valid', isValid);
            }
        });
    }
    
    function createConfetti() {
        const colors = ['#4285f4', '#34a853', '#ea4335', '#fbbc05', '#673ab7'];
        const container = document.getElementById('confetti-container');
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
});