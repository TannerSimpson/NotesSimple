const hideMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    if (menu) menu.style.display = 'none';
};

const showMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    if (menu) menu.style.display = 'block';
};

const toggleMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    if (menu) {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }
};

const hideMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.style.display = 'none';
};

const showMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.style.display = 'block';
};

const toggleMobileMenuItems = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }
};

const profilePictureButton = document.getElementById('user-menu-button');
if (profilePictureButton) {
    profilePictureButton.onclick = (event) => {
        event.stopPropagation();
        toggleMenuItems();
    };
}

const mobileMenuButton = document.querySelector('button[aria-controls="mobile-menu"]');
if (mobileMenuButton) {
    mobileMenuButton.onclick = (event) => {
        event.stopPropagation();
        toggleMobileMenuItems();
    };
}

const notificationButton = document.getElementById("notification-button");
if (notificationButton) {
    notificationButton.addEventListener("click", (event) => {
        event.stopPropagation();
        alert("We are currently in the Beta release of Notes Simple");
    });
}

const profilePageButton = document.getElementById("profile-page-button");
if (profilePageButton) {
    profilePageButton.addEventListener("click", () => {
        document.getElementById('profile-page').style.display = 'block';
        hideMenuItems();
        hideMobileMenuItems();
    });
}

document.addEventListener('click', () => {
    hideMenuItems();
    hideMobileMenuItems();
});

hideMenuItems();
hideMobileMenuItems();