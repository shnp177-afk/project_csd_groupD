// ===== Cookie Management =====
function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookieString;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// ===== Membership Plans Data =====
const membershipPlans = [
    {
        name: "Basic",
        price: "$999.99",
        period: "/month",
        features: ["5 Courses", "Digital Certificates", "Email Support", "Self-paced Learning"],
        featured: false
    },
    {
        name: "Professional",
        price: "$1999.99",
        period: "/month",
        features: ["Unlimited Courses", "Digital Certificates", "Priority Support", "Project Based Learning", "Job Board Access"],
        featured: true
    },
    {
        name: "Enterprise",
        price: "$2999.99",
        period: "/month",
        features: ["Unlimited Courses", "Live Sessions", "1-on-1 Mentoring", "Career Coaching", "Enterprise Support", "Custom Learning Path"],
        featured: false
    }
];

// ===== Display Membership Plans =====
function displayMembershipPlans() {
    const plansContainer = document.getElementById('membershipPlans');
    if (!plansContainer) return;

    plansContainer.innerHTML = '';
    membershipPlans.forEach(plan => {
        const planCard = document.createElement('div');
        planCard.className = `col-md-4 ${plan.featured ? 'mb-5' : ''}`;
        
        const featuredClass = plan.featured ? 'membership-card featured' : 'membership-card';
        
        let featuresHTML = '';
        plan.features.forEach(feature => {
            featuresHTML += `<li>${feature}</li>`;
        });

        planCard.innerHTML = `
            <div class="${featuredClass}">
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">${plan.price}<span class="plan-price-period">${plan.period}</span></div>
                <ul class="plan-features">
                    ${featuresHTML}
                </ul>
                <button class="btn btn-primary btn-lg w-100" onclick="selectPlan('${plan.name}')">
                    Choose Plan
                </button>
            </div>
        `;
        plansContainer.appendChild(planCard);
    });
}

function selectPlan(planName) {
    alert(`You selected the ${planName} plan! Please fill the form below to complete your registration.`);
}

// ===== Form Validation =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateFullName(name) {
    return name.trim().length >= 3;
}

function showValidationError(input, errorMessage) {
    input.classList.add('is-invalid');
    const errorElement = input.parentElement.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
}

function clearValidationError(input) {
    input.classList.remove('is-invalid');
    const errorElement = input.parentElement.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// ===== Handle Form Submission =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form elements
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const gender = document.getElementById('gender');
    const course = document.getElementById('course');
    const duration = document.getElementById('duration');
    const terms = document.getElementById('terms');

    let isValid = true;

    // Validate Full Name
    if (!validateFullName(fullName.value)) {
        showValidationError(fullName, 'Full name is required and must contain at least 3 characters');
        isValid = false;
    } else {
        clearValidationError(fullName);
    }

    // Validate Email
    if (!validateEmail(email.value)) {
        showValidationError(email, 'Please enter a valid email address (e.g., user@example.com)');
        isValid = false;
    } else {
        clearValidationError(email);
    }

    // Validate Gender
    if (gender.value === '') {
        showValidationError(gender, 'Please select your gender');
        isValid = false;
    } else {
        clearValidationError(gender);
    }

    // Validate Course
    if (course.value === '') {
        showValidationError(course, 'Please select a course');
        isValid = false;
    } else {
        clearValidationError(course);
    }

    // Validate Duration
    if (duration.value === '') {
        showValidationError(duration, 'Please select a duration');
        isValid = false;
    } else {
        clearValidationError(duration);
    }

    // Validate Terms
    if (!terms.checked) {
        const termsGroup = document.getElementById('termsGroup');
        showValidationError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearValidationError(terms);
    }

    // If all validations pass
    if (isValid) {
        // Save to cookie
        const formData = {
            fullName: fullName.value,
            email: email.value,
            gender: gender.value,
            course: course.value,
            duration: duration.value
        };

        setCookie('membershipData', JSON.stringify(formData), 30);

        // Show success message
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorMessage) errorMessage.style.display = 'none';
        if (successMessage) {
            successMessage.classList.add('show');
            successMessage.style.display = 'block';
        }

        // Reset form
        document.getElementById('membershipForm').reset();

        console.log('Form submitted successfully!', formData);

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            document.getElementById('errorText').textContent = 'Please correct the errors above and try again.';
            errorMessage.classList.add('show');
            errorMessage.style.display = 'block';
        }
    }
}

// ===== Load Saved Form Data from Cookie =====
function loadFormDataFromCookie() {
    const formData = getCookie('membershipData');
    if (formData) {
        try {
            const data = JSON.parse(formData);
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('gender').value = data.gender || '';
            document.getElementById('course').value = data.course || '';
            document.getElementById('duration').value = data.duration || '';
        } catch (e) {
            console.error('Error loading form data from cookie:', e);
        }
    }
}

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Display membership plans
    displayMembershipPlans();

    // Load saved form data
    loadFormDataFromCookie();

    // Setup form submission
    const membershipForm = document.getElementById('membershipForm');
    if (membershipForm) {
        membershipForm.addEventListener('submit', handleFormSubmit);
    }

    // Real-time validation
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const gender = document.getElementById('gender');
    const course = document.getElementById('course');
    const duration = document.getElementById('duration');
    const terms = document.getElementById('terms');

    // Full Name validation
    if (fullName) {
        fullName.addEventListener('blur', function() {
            if (this.value === '') {
                showValidationError(this, 'Full name is required');
            } else if (!validateFullName(this.value)) {
                showValidationError(this, 'Full name must contain at least 3 characters');
            } else {
                clearValidationError(this);
            }
        });

        fullName.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && validateFullName(this.value)) {
                clearValidationError(this);
            }
        });
    }

    // Email validation
    if (email) {
        email.addEventListener('blur', function() {
            if (this.value === '') {
                showValidationError(this, 'Email is required');
            } else if (!validateEmail(this.value)) {
                showValidationError(this, 'Please enter a valid email format');
            } else {
                clearValidationError(this);
            }
        });

        email.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && validateEmail(this.value)) {
                clearValidationError(this);
            }
        });
    }

    // Gender validation
    if (gender) {
        gender.addEventListener('change', function() {
            if (this.value !== '') {
                clearValidationError(this);
            }
        });
    }

    // Course validation
    if (course) {
        course.addEventListener('change', function() {
            if (this.value !== '') {
                clearValidationError(this);
            }
        });
    }

    // Duration validation
    if (duration) {
        duration.addEventListener('change', function() {
            if (this.value !== '') {
                clearValidationError(this);
            }
        });
    }

    // Terms validation
    if (terms) {
        terms.addEventListener('change', function() {
            if (this.checked) {
                clearValidationError(this);
            }
        });
    }

    // jQuery effects
    $(document).ready(function() {
        // Fade in membership cards
        $('.membership-card').fadeIn(800);

        // Hover effects on cards
        $('.membership-card').hover(
            function() {
                $(this).css({'box-shadow': '0 10px 30px rgba(0,0,0,0.2)', 'cursor': 'pointer'});
            },
            function() {
                $(this).css('box-shadow', 'var(--shadow)');
            }
        );

        // Form input focus effect
        $('.form-input').focus(function() {
            $(this).parent().find('.form-label').css('color', '#007bff');
        }).blur(function() {
            $(this).parent().find('.form-label').css('color', '#333');
        });
    });
});