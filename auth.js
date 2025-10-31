// static/users/js/auth.js

const API_BASE_URL = ''; // Use relative path for same domain

class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
    }

    // Check authentication status with Django
    async checkAuthStatus() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/check-auth/`, {
                method: 'GET',
                credentials: 'same-origin'
            });
            
            const data = await response.json();
            
            if (data.is_authenticated) {
                this.updateUIForLoggedInUser(data.user);
                this.saveUserToLocalStorage(data.user);
            } else {
                this.updateUIForLoggedOutUser();
                this.clearUserFromLocalStorage();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            // Fallback to localStorage
            this.checkLocalStorageAuth();
        }
    }

    // Fallback to localStorage check
    checkLocalStorageAuth() {
        const userData = this.getUserFromLocalStorage();
        if (userData && userData.username) {
            this.updateUIForLoggedInUser(userData);
        } else {
            this.updateUIForLoggedOutUser();
        }
    }

    // Register user
    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                credentials: 'same-origin',
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            
            if (result.success) {
                this.saveUserToLocalStorage(result.user);
                this.updateUIForLoggedInUser(result.user);
                this.showSuccessMessage(result.message);
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'حدث خطأ في الاتصال بالخادم' };
        }
    }

    // Login user
    async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                credentials: 'same-origin',
                body: JSON.stringify(credentials)
            });

            const result = await response.json();
            
            if (result.success) {
                this.saveUserToLocalStorage(result.user);
                this.updateUIForLoggedInUser(result.user);
                this.showSuccessMessage(result.message);
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'حدث خطأ في الاتصال بالخادم' };
        }
    }

    // Logout user
    async logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                credentials: 'same-origin'
            });

            const result = await response.json();
            
            if (result.success) {
                this.clearUserFromLocalStorage();
                this.updateUIForLoggedOutUser();
                this.showSuccessMessage(result.message);
                
                // Reload page after logout
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: clear localStorage and update UI
            this.clearUserFromLocalStorage();
            this.updateUIForLoggedOutUser();
            window.location.reload();
        }
    }

    // Update UI when user is logged in
    updateUIForLoggedInUser(user) {
        const registerButton = document.getElementById('registerButton');
        const loginButton = document.getElementById('loginButton');

        if (registerButton) {
            registerButton.style.display = 'none';
        }

        if (loginButton) {
            loginButton.innerHTML = `<i class="fas fa-user"></i> ${user.username}`;
            loginButton.style.background = '#4CAF50';
            loginButton.style.borderColor = '#4CAF50';
            
            // Change to logout behavior
            loginButton.onclick = (e) => {
                e.preventDefault();
                this.showLogoutConfirmation();
            };
        }

        // Update any other user-related UI elements
        this.updateUserWelcomeElements(user.username);
    }

    // Update UI when user is logged out
    updateUIForLoggedOutUser() {
        const registerButton = document.getElementById('registerButton');
        const loginButton = document.getElementById('loginButton');

        if (registerButton) {
            registerButton.style.display = 'flex';
        }

        if (loginButton) {
            loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> دخول';
            loginButton.style.background = '';
            loginButton.style.borderColor = '#9C27B0';
            
            // Reset to login behavior
            loginButton.onclick = (e) => {
                e.preventDefault();
                this.showLoginModal();
            };
        }
    }

    // LocalStorage management
    saveUserToLocalStorage(user) {
        const userData = {
            ...user,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.username);
    }

    getUserFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('userData') || '{}');
        } catch {
            return null;
        }
    }

    clearUserFromLocalStorage() {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    }

    // Utility methods
    getCSRFToken() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    }

    showSuccessMessage(message) {
        alert(message);
    }

    showLogoutConfirmation() {
        const user = this.getUserFromLocalStorage();
        const username = user?.username || 'المستخدم';
        const confirmLogout = confirm(`مرحباً ${username}!\nهل تريد تسجيل الخروج؟`);
        
        if (confirmLogout) {
            this.logout();
        }
    }

    updateUserWelcomeElements(username) {
        const welcomeElements = document.querySelectorAll('.user-welcome');
        welcomeElements.forEach(element => {
            element.textContent = `مرحباً ${username}`;
        });
    }

    setupEventListeners() {
        // Global logout handler
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('global-logout')) {
                e.preventDefault();
                this.logout();
            }
        });
    }

    // Modal methods (you can integrate with your existing modal system)
    showLoginModal() {
        // Your existing login modal code here
        console.log('Show login modal');
    }

    showRegisterModal() {
        // Your existing register modal code here
        console.log('Show register modal');
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
});

// Utility function to check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Utility function to get current user
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('userData') || '{}');
    } catch {
        return null;
    }
}