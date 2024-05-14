const hideMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    menu.style.display = 'none';
    console.log('Menu items hidden');
};

const showMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    menu.style.display = 'block';
    console.log('Menu items shown');
};

const toggleMenuItems = () => {
    const menu = document.querySelector('.relative.ml-3 > div:nth-child(2)');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
    console.log('Menu items toggled');
};

const profilePictureButton = document.getElementById('user-menu-button');
if (profilePictureButton) {
    profilePictureButton.onclick = () => {
        toggleMenuItems();
    };
    console.log('Profile picture button click handler attached');
}

hideMenuItems();
console.log('Menu items hidden on page load');