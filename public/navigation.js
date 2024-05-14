//functions for standard menu
const hideMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    menu.style.display = 'none';
};

const showMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    menu.style.display = 'block';
};

const toggleMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
};

const profilePictureButton = document.getElementById('user-menu-button');
if (profilePictureButton) {
    profilePictureButton.onclick = () => {
        toggleMenuItems();
    };
}

// Functions for mobile menu
const hideMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = 'none';
};

const showMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = 'block';
};

const toggleMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
};

const mobileMenuButton = document.querySelector('button[aria-controls="mobile-menu"]');
if (mobileMenuButton) {
    mobileMenuButton.onclick = () => {
        toggleMobileMenuItems();
    };
}


hideMenuItems();
hideMobileMenuItems();

